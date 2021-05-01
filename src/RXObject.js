import RXSprite from "./RXOSprite";

const getOptions = (options) => ({
    fullMode: true,
    position: [0, 0],
    speed: [0, 0],
    weight: 1,
    elasticity: 1,
    spriteOptions: null,
    zIndex: 1,
    ...options,
});

export default class RXObject {
    constructor(rxCanvas, options) {
        this.rxCanvas = rxCanvas;
        this.options = getOptions(options);
        this.collisions = new Set();
        this.setSprite(this.options.spriteOptions);
        delete this.options.spriteOptions;
    }

    setSprite = (spriteOptions = {}) => {
        this.sprite = new RXSprite(this.rxCanvas, spriteOptions);
    }

    update = dt => {
        this.move(dt);
        if (this.sprite) this.sprite.update(dt);
    }

    move = dt => {
        this.checkBorderForSpeed();
        [0, 1].forEach(i => {
            if (this.rxCanvas.options.gravity) this.options.speed[i] += this.rxCanvas.options.gravity[i] * dt;
            if (this.rxCanvas.options.resistance) {
                const resistance = Math.sign(this.options.speed[i]) * this.rxCanvas.options.resistance * dt;
                this.options.speed[i] = Math.abs(this.options.speed[i]) > Math.abs(resistance) ? this.options.speed[i] - resistance : 0;
            }
        });
        [0, 1].forEach(i => {
            this.options.position[i] += this.options.speed[i] * dt;
        });
        this.checkBorderForPosition();
    }

    checkBorderForSpeed = () => {
        if (!this.rxCanvas.options.border) return;

        const k = Math.sqrt(this.options.elasticity ** 2 / 2 + this.rxCanvas.options.bordersElasticity ** 2 / 2);
        if (this.options.position[0] - this.sprite.options.size[0] / 2 <= 0) {
            this.options.speed[0] = + k * Math.abs(this.options.speed[0]);
        } else if (this.options.position[0] + this.sprite.options.size[0] / 2 >= this.rxCanvas.canvas.width) {
            this.options.speed[0] = - k * Math.abs(this.options.speed[0]);
        }

        if (this.options.position[1] - this.sprite.options.size[1] / 2 <= 0) {
            this.options.speed[1] = + k * Math.abs(this.options.speed[1]);
        } else if (this.options.position[1] + this.sprite.options.size[1] / 2 >= this.rxCanvas.canvas.height) {
            this.options.speed[1] = - k * Math.abs(this.options.speed[1]);
        }
    }

    checkBorderForPosition = () => {
        if (!this.rxCanvas.options.border) return;

        if (this.options.position[0] - this.sprite.options.size[0] / 2 < 0) {
            this.options.position[0] = this.sprite.options.size[0] / 2;
        } else if (this.options.position[0] + this.sprite.options.size[0] / 2 > this.rxCanvas.canvas.width + 1) {
            this.options.position[0] = this.rxCanvas.canvas.width - this.sprite.options.size[0] / 2;
        }

        if (this.options.position[1] - this.sprite.options.size[1] / 2 < 0) {
            this.options.position[1] = this.sprite.options.size[1] / 2;
        } else if (this.options.position[1] + this.sprite.options.size[1] / 2 > this.rxCanvas.canvas.height) {
            this.options.position[1] = this.rxCanvas.canvas.height - this.sprite.options.size[1] / 2;
        }
    }

    render = () => {
        if (this.sprite) {
            this.sprite.render(this.options.position);
        }
        
    }
}