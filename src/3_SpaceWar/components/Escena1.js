import Phaser from "phaser";

class Escena1 extends Phaser.Scene {
  constructor() {
    super("Escena1");
  }

  preload() {
    this.load.image('fondo1', '/img/SpaceWarImages/fond1.jpg'); // esta es la imagen de fondo
    this.load.spritesheet('portal', '/img/SpaceWarImages/portalDefinido.png', { frameWidth: 162.25, frameHeight: 384 });
    this.load.image('bala', '/img/SpaceWarImages/shoot.png');
    this.load.spritesheet('nave', '/img/SpaceWarImages/nave.png', { frameWidth: 70, frameHeight: 62 }); // la nave principal
    this.load.image('red', '/img/SpaceWarImages/red.png');
  }
  create() {
    this.balas = this.physics.add.group(); // Crea un grupo para las balas
    this.barraespacio = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // Configura la tecla espaciadoraaa
    this.add.image(400, 400, 'fondo1');

    this.portal = this.physics.add.sprite(700, 300, 'portal');

    this.player = this.physics.add.sprite(100, 300, 'nave');
    this.player.setCollideWorldBounds(true); //no atravesar bordes del area de juego

    this.vidasText = this.add.text(320, 55, 'PLAYER: \n #Movimiento: Teclas de Desplazamiento \n #Disparar: Tecla SPACE', { fontSize: '20px', fill: '#FFFF' });
    this.enemyText = this.add.text(70, 450, 'JUEGO:\n -Destruye las naves enemigas. \n -Destruye al Jefe Final. \n -Usa el bonus H, para obtener doble disparo. \n -Cuidate de los Meotoritos y las naves! \n  -Colision de meteoritos: Daño en vidas. \n  -Colision de Naves: Derrota Directa.', { fontSize: '20px', fill: '#FFFF00' });
    // son las particulas 
    const particles = this.add.particles(-40, 0, 'red', {
      speed: 100,
      angle: { min: 150, max: 210 },
      scale: { start: 1.0, end: 0 },  // EL TAMAÑO DE LAS PARTICULAS """""""""""""
      blendMode: 'ADD' // este agraga las particulas 

    });

    particles.startFollow(this.player);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: 'animacionPortal',
      frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1
    });
    this.portal.play('animacionPortal');
    this.physics.add.overlap(this.player,this.portal, ()=>{
      this.scene.stop("Escena1");
      this.scene.start('Escena2')
    })


    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('nave', { start: 0, end: 0 }),
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('nave', { start: 2, end: 2 }),
      //frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('nave', { start: 0, end: 0 }),
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('nave', { start: 1, end: 1 }),
    });
  }




  update() {

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.setVelocityX(0);

      this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      this.player.setVelocityX(0);

      this.player.anims.play('down', true);
    }
    else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);

      this.player.anims.play('left', true);
    }

    if (Phaser.Input.Keyboard.JustDown(this.barraespacio)) { // Verifica si la tecla espaciadora se presionó en este fotograma
      const bullet = this.balas.create(this.player.x, this.player.y, 'bala'); // Crea una bala en la posición del jugador
      bullet.setVelocity(300, 0); // Establece la velocidad de la bala (en este caso, hacia arriba)
    }
  }
}

export default Escena1;