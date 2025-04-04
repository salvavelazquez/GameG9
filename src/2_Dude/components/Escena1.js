import Phaser from "phaser";

class Escena1 extends Phaser.Scene {

    constructor() {
        super("Escena1");
        this.platforms = null;
        this.scoreText = "";
        this.score = 0;
        this.playerSpeed = 160;
    }



    preload() {
        this.load.image('sky', '/img/DudeImagenes/escenario1.jpg');
        this.load.image('ground', '/img/DudeImagenes/platf.png');
        this.load.image('star', '/img/DudeImagenes/star.png');
        this.load.image('bomb', '/img/DudeImagenes/bomb.png');
        this.load.spritesheet('dude', '/img/DudeImagenes/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        this.score = 0;
        //cielo y barras
        this.add.image(400, 300, 'sky');
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(150, 568, 'ground').setScale(1).refreshBody();
        this.platforms.create(470, 568, 'ground').setScale(1).refreshBody();
        this.platforms.create(784, 568, 'ground').setScale(1).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        //PLAYER
        this.player = this.physics.add.sprite(100, 100, 'dude');
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


        //Se  agregan las estrellas
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 6, //cantidad de estrellas
            setXY: { x: 12, y: 0, stepX: 110 } //empieza en la posicion x e y, se repite cada 70 de espacios
        });

        //Se agrega el rebote entre el grupo de estrellas
        this.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        //habilita las colisiones de las estrellas con las plataformas
        this.physics.add.collider(this.stars, this.platforms);

        //Choque entre las estrellas y el jugador
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        //Para controlar el puntaje
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFFF' });

        //Para agregar las bombas
        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

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

        if (this.score > 120) {
            this.physics.pause();
            this.player.anims.play('turn');
            this.scene.stop('Escena1');
            this.scene.start('Escena2', { score: this.score });
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

    //Colision entre el jugador y las estrellas
    collectStar(player, star) {
        star.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        //Para las bombas
        if (this.stars.countActive(true) == 0) {
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

    hitBomb(player, bomb) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.scene.stop('Escena1');
        this.scene.start('GameO', { score: this.score });
    }
}
export default Escena1;