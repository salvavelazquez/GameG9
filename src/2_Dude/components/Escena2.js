import Phaser from "phaser";


class Escena2 extends Phaser.Scene {

  constructor() {
    super("Escena2");
    this.platforms = null;
    this.scoreText = "";
    this.numPlat = 3;
    // Variables globales encapsuladas en el constructor
    this.platformSpeed = 50;
    this.platformGroup = null;
    this.playerSpeed = 160;
  }

  init(data) {
    this.score = data.score;
  }

  preload() {

    this.load.image('sky2', '/img/DudeImagenes/fondo1.jpeg');
    this.load.image('ground', '/img/DudeImagenes/platf.png');
    this.load.image('lava', '/img/DudeImagenes/lavaa.png');
    this.load.image('star', '/img/DudeImagenes/star.png');
    this.load.image('bomb', '/img/DudeImagenes/bomb.png');
    this.load.image('trofeo', '/img/DudeImagenes/trofeo.png');
    this.load.spritesheet('dude', '/img/DudeImagenes/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    this.numPlat = 3;
    //cielo y barras
    this.add.image(400, 300, 'sky2').setScale(1.7).setTint(0x980B54);

    // Crear un grupo de plataformas
    this.platformGroup = this.physics.add.group();

    this.trofeo = this.physics.add.group();

    this.piso = this.physics.add.staticGroup();

    //Evento de actualizacion
    this.time.addEvent({
      delay: 5500,
      callback: this.crearPlataformas,
      callbackScope: this,
      repeat: 5
    });

    let p1 = this.platformGroup.create(50, 60, 'ground');
    let p2 = this.platformGroup.create(480, -140, 'ground');
    let p3 = this.platformGroup.create(750, 45, 'ground');

    this.piso.create(150, 577, 'lava').setScale(1).refreshBody();
    this.piso.create(400, 577, 'lava').setScale(1).refreshBody();
    this.piso.create(700, 577, 'lava').setScale(1).refreshBody();

    this.physics.world.setBounds(0, 0, 800, 600);

    //Jugador
    this.player = this.physics.add.sprite(100, -50, 'dude');

    //physics del player
    this.player.setBounce(0.2); //rebote entre 0 o 1
    this.player.setCollideWorldBounds(true); //no atravesar bordes del area de juego


    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 30,
      repeat: -1 // valor negativo para repeticion infinita, 0 para una sola
      //reproduccion, 1 para dos repeticiones, y asi sucesivamente
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    //Colision de jugador y plataformas
    this.physics.add.collider(this.player, this.platformGroup);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.initTouchControls();



    // Configuración del joystick virtual
    this.joystick = {
      base: this.add.circle(100, 500, 60, 0xffffff, 0.2).setVisible(false),
      thumb: this.add.circle(100, 500, 30, 0xffffff, 0.5).setVisible(false),
      active: false,
      pointer: null,
      radius: 60
    };

    // Botón de salto
    this.jumpButton = this.add.circle(
      this.cameras.main.width - 80,
      this.cameras.main.height - 100,
      50,
      0x00ff00,
      0.5
    ).setInteractive();

    this.jumpText = this.add.text(
      this.jumpButton.x,
      this.jumpButton.y,
      'SALTO',
      { fontSize: '18px', fill: '#ffffff' }
    ).setOrigin(0.5);

    // Eventos táctiles mejorados
    this.input.on('pointerdown', (pointer) => {
      // Solo activar en la zona izquierda de la pantalla
      if (pointer.x < this.cameras.main.width / 2) {
        this.joystick.active = true;
        this.joystick.pointer = pointer;
        this.joystick.base.setPosition(pointer.x, pointer.y).setVisible(true);
        this.joystick.thumb.setPosition(pointer.x, pointer.y).setVisible(true);
      }
    });

    this.input.on('pointermove', (pointer) => {
      if (!this.joystick.active || this.joystick.pointer !== pointer) return;

      // Calcular distancia y ángulo del toque
      const dx = pointer.x - this.joystick.base.x;
      const dy = pointer.y - this.joystick.base.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      // Limitar el thumb al radio del joystick
      const radius = Math.min(distance, this.joystick.radius);
      this.joystick.thumb.setPosition(
        this.joystick.base.x + Math.cos(angle) * radius,
        this.joystick.base.y + Math.sin(angle) * radius
      );

      // Mover al jugador basado en la posición del joystick
      if (distance > 10) { // Zona muerta pequeña
        const direction = dx > 0 ? 1 : -1;
        this.player.setVelocityX(direction * this.playerSpeed);

        // Animaciones
        if (dx > 0) {
          this.player.anims.play('right', true);
        } else {
          this.player.anims.play('left', true);
        }
      } else {
        this.player.setVelocityX(0);
        this.player.anims.play('turn', true);
      }
    });

    this.input.on('pointerup', (pointer) => {
      if (this.joystick.pointer === pointer) {
        this.joystick.active = false;
        this.joystick.pointer = null;
        this.player.setVelocityX(0);
        this.player.anims.play('turn', true);
        this.joystick.base.setVisible(false);
        this.joystick.thumb.setVisible(false);
      }
    });

    // Configurar el botón de salto
    this.jumpButton.on('pointerdown', () => {
      if (this.player.body.touching.down) {
        this.player.setVelocityY(-360);
        // Pequeña vibración para feedback táctil
        if (this.sys.game.device.input.touch) {
          navigator.vibrate && navigator.vibrate(50);
        }
      }
    });

    // Ajustar controles al tamaño de pantalla
    this.scale.on('resize', (gameSize) => {
      const scale = Math.min(gameSize.width / 800, gameSize.height / 600);
      this.jumpButton.setPosition(
        gameSize.width - 80 * scale,
        gameSize.height - 100 * scale
      );
      // this.jumpButton.setRadius(50 * scale);
      this.jumpText.setPosition(this.jumpButton.x, this.jumpButton.y);
      this.jumpText.setScale(scale);
    });

    //Se  agregan las estrellas
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 6, //cantidad de estrellas
      setXY: { x: 12, y: -230, stepX: 155 } //empieza en la posicion x e y, se repite cada 70 de espacios
    });

    //Se agrega el rebote entre el grupo de estrellas
    this.stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    //habilita las colisiones de las estrellas con las plataformas
    this.physics.add.collider(this.stars, this.platformGroup);

    //Choque entre las estrellas y el jugador
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

    //Choque entre el trofeo y el jugador
    this.physics.add.overlap(this.player, this.trofeo, this.reaccionTrofeo, null, this);

    //Para controlar el puntaje
    this.scoreText = this.add.text(16, 16, 'score: ' + this.score, { fontSize: '32px', fill: '#00FFFF' });
    this.scoreText.setText('Score: ' + this.score);

    //Para agregar las bombas
    this.bombs = this.physics.add.group();
    this.physics.add.collider(this.bombs, this.platformGroup);
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

    ///////////////////////////////////////////////////
    //Colision de jugador y LAVA
    this.physics.add.collider(this.player, this.piso, this.fire, null, this);
    //Colision de estrella y LAVA
    this.physics.add.collider(this.stars, this.piso, this.fireStar, null, this);
    //Colision de bomba y LAVA
    //if(this.bombs.countActive(true)  >0){
    this.physics.add.collider(this.bombs, this.piso, this.fireBombs, null, this);
    //}

    /////////////////////////////////////////////////////////   
  }

  initTouchControls() {
    // Destruir controles anteriores si existen
    if (this.joystick) {
      this.joystick.base.destroy();
      this.joystick.thumb.destroy();
    }
    if (this.jumpButton) this.jumpButton.destroy();
    if (this.jumpText) this.jumpText.destroy();

    // Crear nuevos controles
    this.joystick = {
      base: this.add.circle(100, 500, 60, 0xffffff, 0.2).setVisible(false),
      thumb: this.add.circle(100, 500, 30, 0xffffff, 0.5).setVisible(false),
      active: false,
      pointer: null,
      radius: 60
    };

    this.jumpButton = this.add.circle(
      this.cameras.main.width - 80,
      this.cameras.main.height - 100,
      50,
      0x00ff00,
      0.5
    ).setInteractive();

    this.jumpText = this.add.text(
      this.jumpButton.x,
      this.jumpButton.y,
      'SALTO',
      { fontSize: '18px', fill: '#ffffff' }
    ).setOrigin(0.5);

    // ... resto de la configuración de controles ...
  }

  handleJump() {
    if (this.player.body.touching.down && !this.jumpCooldown) {
      this.player.setVelocityY(-330);
      this.jumpCooldown = true;
      this.time.delayedCall(500, () => {
        this.jumpCooldown = false;
      });
    }
  }

  update() {

    // Mueve las plataformas hacia abajo y recrearlas si es necesario
    if (this.platformGroup.getChildren().length > 0) {
      this.platformGroup.children.iterate(function (platform) {
        platform.setVelocityY(this.platformSpeed);
        // Establece immovable en true para que las plataformas no se muevan lateralmente
        platform.body.immovable = true;
        if (platform.y > 600) {
          console.log("Estoy aqui al finnn!!");
          platform.destroy();
          let p1 = this.platformGroup.create(0, 700, '');
        }

      }, this);
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-this.playerSpeed);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(this.playerSpeed);
      this.player.anims.play('right', true);
    } else if (!this.joystick.active) {
      this.player.setVelocityX(0);
      this.player.anims.play('turn', true);
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }

  }

  //Creacion de plataformas
  crearPlataformas() {
    let p1 = this.platformGroup.create(50, -40, 'ground');
    let p2 = this.platformGroup.create(480, -220, 'ground');
    let p3 = this.platformGroup.create(750, -45, 'ground');
    this.numPlat += 3;

    if (this.numPlat == 21) {
      let p1 = this.trofeo.create(400, 0, 'trofeo');
      this.physics.add.collider(this.trofeo, this.platformGroup);
    }

    // Calcula la posición X inicial
    let startX = 12;
    this.stars.children.iterate(function (child) {
      const randomX = Phaser.Math.Between(0, 800);
      child.enableBody(true, startX, 10, true, true);
      startX += 155;
    });

    this.stars.children.iterate(function (child) {
      child.enableBody(true, child.x, 0, true, true);
    });

    let x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    let bomb = this.bombs.create(x, 16, 'bomb').setScale(1.7).setTint(0x00FF00);
    bomb.setBounce(1.1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

  }



  reaccionTrofeo(player, trofeo) {
    // Deten la escena actual
    this.scene.stop('Escena2');

    // Inicia la siguiente escena (Escena3 en este caso) y pasa el puntaje actual

    this.scene.start('Escena3', { score: this.score });
  }

  //Colision entre el jugador y las estrellas
  collectStar(player, star) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
  }

  hitBomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    this.scene.stop('Escena2');
    this.scene.start('GameO', { score: this.score });
  }

  fire(player, piso) {
    player.setTint(0xff0000);
    this.time.addEvent({
      delay: 500,
      callbackScope: this,
      callback: function () {
        if (this.scoreText) {
          console.log(this.score);
          this.scene.stop('Escena2');
          this.scene.start('GameO', { score: this.score });
        }
      }
    })
  }

  fireStar(star, piso) {
    star.disableBody(true, true);
  }
  fireBombs(bomb, piso) {
    bomb.disableBody(true, true);
  }
}
export default Escena2;