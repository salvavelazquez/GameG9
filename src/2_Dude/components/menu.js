import Phaser from "phaser";


class Menu extends Phaser.Scene {

  constructor() {
    super("Menu");
  }

  preload() {
    // en priload vamos a cargar nuestras imagenes que vamos a usar 
    // para tenerlo disponibles para que la paguna luego la pueda renderizar
    this.load.audio('Vale', '/sounds/DudeSounds/Vale.mp3');
    this.load.image('menu2', '/img/DudeImagenes/menu.png');
    this.load.image('start', '/img/DudeImagenes/start.png');
    this.load.image('menuDude', '/img/DudeImagenes/menuDude.png');

  }

  create() {
    // Detener el sonido antes de volver al menú
    if (this.sonido) {
      this.sonido.stop();
    }


    this.sonido = this.sound.add('Vale', { volume: 0.6 });
    const soundConfig = {
      volumen: 1,
      loop: true
    }

    // esto no va this.sonido.play(soundConfig);
    // con esto solo carga una unica vez
    if (!this.sound.locked) {
      // already unlocked so play
      this.sonido.play(soundConfig)
    }
    else {
      //wait for 'unloched ' to free and the play 
      this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
        this.sonido.play(soundConfig)
      })
    }

    this.add.image(400, 300, 'menu2');  // imagen del fondo 
    this.add.image(400, 200, 'menuDude');  // imagen del fondo 

    ///////////////////
    this.starbutton = this.add.image(400, 450, 'start').setInteractive();
    this.starbutton.on('pointerdown', () => {
      this.scene.stop('Menu');
      this.scene.start('Escena1');
    });

    // Botón de pantalla completa
    const fullscreenButton = this.add.text(
      650, // Posición X 
      480,  // Posición Y
      '⛶', // Símbolo de pantalla completa
      {
        fontSize: '32px',
        fill: '#fff',
        backgroundColor: '#00000080',
        padding: { x: 10, y: 5 }
      }
    ).setInteractive();

    fullscreenButton.on('pointerdown', () => {
      if (this.scale.isFullscreen) {
        this.scale.exitFullscreen();
      } else {
        this.scale.startFullscreen();
      }
    });

    // Cambiar el estilo al pasar el mouse
    fullscreenButton.on('pointerover', () => {
      fullscreenButton.setStyle({ fill: '#ff0' });
    });

    fullscreenButton.on('pointerout', () => {
      fullscreenButton.setStyle({ fill: '#fff' });
    });

    // Escuchar cambios en el estado de pantalla completa
    this.scale.on('enterfullscreen', () => {
      fullscreenButton.setText('⛶'); 
    });

    this.scale.on('leavefullscreen', () => {
      fullscreenButton.setText('⛶'); 
    });

  }
}

export default Menu;  