import Phaser from "phaser";

class Menu extends Phaser.Scene {

  constructor() {
    super("menu");

  }

  preload() {
    // en preload vamos a cargar nuestras imagenes que vamos a usar 
    // para tenerlo disponibles para que la paguna luego la pueda renderizar
    this.load.image('start', '/img/SpaceWarImages/start.png');
    this.load.image('menunave', '/img/SpaceWarImages/fondomenunave.jpg');
    this.load.image('titulo', '/img/SpaceWarImages/titulo.png');
  }

  create() {
    ////////////////////////////////////////////////////////
    this.add.image(400, 300, 'menunave');  // imagen del fondo 
    this.add.image(400, 200, 'titulo').setScale(0.4);

    this.starbutton = this.add.image(400, 500, 'start').setScale(0.7).setInteractive();

    this.starbutton.on('pointerdown', () => {
      this.scene.stop("menu");
      this.scene.start('Escena1');

    });

    // Botón de pantalla completa
    const fullscreenButton = this.add.text(
      720, // Posición X 
      520,  // Posición Y
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