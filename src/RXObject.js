import RXSprite from "./RXOSprite";

const getOptions = (options) => ({
    fillStyle: "rgb(0, 0, 0)",
    fullMode: true,
    position: [0, 0],
    speed: [0, 0],
    weight: 1,
    spriteOptions: null,
    ...options,
});

export default class RXObject {
    constructor(rxCanvas, options) {
        this.rxCanvas = rxCanvas;
        this.options = getOptions(options);
        if (this.options.spriteOptions) {
            this.setSprite(this.options.spriteOptions);
            delete this.options.spriteOptions;
        }
    }

    setSprite = spriteOptions => {
        this.sprite = new RXSprite(this.rxCanvas, spriteOptions);
    }

    update = dt => {
        this.move(dt);
        if (this.sprite) this.sprite.update(dt);
    }

    getLeftTop = () => ([
        this.options.position[0] - this.sprite.options.size[0] / 2,
        this.options.position[1] - this.sprite.options.size[1] / 2,
    ]);

    getRightBottom = () => ([
        this.options.position[0] + this.sprite.options.size[0] / 2,
        this.options.position[1] + this.sprite.options.size[1] / 2,
    ]);

    move = dt => {
        if (this.rxCanvas.options.gravity) {
            this.options.speed[0] += this.rxCanvas.options.gravity[0] * dt;
            this.options.speed[1] += this.rxCanvas.options.gravity[1] * dt;
        }
        if (this.rxCanvas.options.resistance) {
            this.options.speed[0] -= Math.sign(this.options.speed[0]) * this.rxCanvas.options.resistance * dt;
            this.options.speed[1] -= Math.sign(this.options.speed[1]) * this.rxCanvas.options.resistance * dt;
        }
        this.options.position[0] += this.options.speed[0] * dt;
        this.options.position[1] += this.options.speed[1] * dt;

        if (this.getRightBottom()[1] > this.rxCanvas.canvas.height) {
            this.options.speed[1] = - Math.abs(this.options.speed[1]);
        }
    }

    render = () => {
        if (this.sprite) {
            this.sprite.render(this.options.position);
        }
        
    }
}