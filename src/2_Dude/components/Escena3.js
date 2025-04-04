import Phaser from "phaser";


class Escena3 extends Phaser.Scene {
  constructor() {
    super("Escena3");
    this.platforms = null;
    this.scoreText = "";
    this.score = 0;
    this.timeLeft = 30;
    this.playerSpeed = 160;
  }

  init(data) {
    this.score = data.score;
  }

  preload() {
    this.load.image('caverna', '/img/DudeImagenes/Caverna.png');
    this.load.image('ground', '/img/DudeImagenes/platf.png');
    this.load.image('star', '/img/DudeImagenes/star.png');
    this.load.image('bomb', '/img/DudeImagenes/bomb.png');
    this.load.spritesheet('dude', '/img/DudeImagenes/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('Trofeo3', '/img/DudeImagenes/Trofeo3.png');
  }

  create() {
    this.timeLeft =30;

    this.add.image(400, 300, 'caverna');
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(150, 568, 'ground').setScale(1).refreshBody();// LOS 
    this.platforms.create(470, 568, 'ground').setScale(1).refreshBody();// TRES SON LAS 
    this.platforms.create(784, 568, 'ground').setScale(1).refreshBody();// PLATAFORMAS DE ABAJO
    this.platforms.create(400, 400, 'ground').setScale(0.5).refreshBody(); //  el cuarto 
    this.platforms.create(120, 150, 'ground') .setScale(0.5).refreshBody(); // el primero
    this.platforms.create(120, 480, 'ground').setScale(0.5).refreshBody(); // el tercero
    this.platforms.create(170, 330, 'ground').setScale(0.5).refreshBody(); // el segundo
    this.platforms.create(455, 298, 'ground').setScale(0.5).refreshBody(); // el quinto 
    this.platforms.create(580, 150, 'ground') .setScale(0.5).refreshBody(); // el primero
    this.platforms.create(765, 400, 'ground').setScale(0.5).refreshBody(); //  el cuarto 

    this.Trofeo3 = this.physics.add.sprite(700, 100, 'Trofeo3');
    this.physics.add.collider(this.Trofeo3, this.platforms);


    // Crea un temporizador para cambiar la posición del Trofeo3 cada 5 segundos (5000 milisegundos)
    this.trofeoTimer = this.time.addEvent({
      delay: 2000,
      callback: this.changeTrofeoPosition,
      callbackScope: this,
      loop: true
    });






    this.player = this.physics.add.sprite(100, 100, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 30,
      repeat: -1
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

    this.physics.add.collider(this.player, this.platforms);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.initTouchControls();

        // Configuración del área de juego táctil

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
                this.player.setVelocityY(-330);
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

    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 6,
      setXY: { x: 12, y: 0, stepX: 110 }
    });
   // EL rebote de las estrellas en las plataformas 
    this.stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.overlap(this.player, this.Trofeo3, this.collectTrofeo3, null, this);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

    this.scoreText = this.add.text(16, 16, 'score: ' + this.score, { fontSize: '32px', fill: '#FFFF' });

    this.bombs = this.physics.add.group();
    this.createBombs(); // Llamamos a la función para crear bombas al inicio
    this.physics.add.collider(this.platforms, this.bombs); // Aseguramos que las bombas colisionen con las plataformas
    //this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

    this.timeText = this.add.text(600, 16, 'Tiempo: 60', { fontSize: '32px', fill: '#FFFF' });
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
    if (this.score > 700) {
      this.physics.pause();
      this.player.anims.play('turn');
      this.scene.stop('Escena3');
      this.scene.start('winner', { score: this.score });
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

    if (this.timeLeft > 0) {
      this.timeLeft -= 1 / 60;
      this.timeText.setText('Tiempo: ' + Math.ceil(this.timeLeft));
    } else {
      this.physics.pause();
      this.player.anims.play('turn');
      this.scene.stop('Escena3');
      this.scene.start('GameO', { score: this.score });
    }
  }

  collectTrofeo3(player, trofeo) {
    trofeo.disableBody(true, true);
    this.score += 100;
    this.scoreText.setText('Score: ' + this.score);
    this.scene.start('winner', { score: this.score });

    // Aquí verificamos si el jugador ha recogido la copa y ganó la partida
    if (this.score > 700) {
      this.physics.pause();
      this.player.anims.play('turn');
      this.scene.stop('Escena3');
      this.scene.start('winner', { score: this.score });
    }
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
      });
      let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      let bomb = this.bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }



  // Función para crear bombas
  createBombs() {
    for (let i = 0; i <5; i++) { // Puedes ajustar el número de bombas según tu preferencia
      let x = Phaser.Math.Between(50, 750);
      let y = Phaser.Math.Between(0, 300);
      let bomb = this.bombs.create(x, y, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }



  hitBomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    this.scene.stop('Escena3');
    this.scene.start('GameO', { score: this.score });
  }



  changeTrofeoPosition() {
    // Cambia la posición del Trofeo3 a una ubicación aleatoria
    this.Trofeo3.setX(Phaser.Math.Between(50, 750));
    this.Trofeo3.setY(Phaser.Math.Between(50, 600));
  }
}

export default Escena3;
