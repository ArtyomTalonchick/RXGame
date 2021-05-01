import RXSprite from "./RXOSprite";

const getOptions = (options) => ({
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

    getLeftTop = () => ([
        this.options.position[0] - this.sprite.options.size[0] / 2,
        this.options.position[1] - this.sprite.options.size[1] / 2,
    ]);

    getRightBottom = () => ([
        this.options.position[0] + this.sprite.options.size[0] / 2,
        this.options.position[1] + this.sprite.options.size[1] / 2,
    ]);

    move = dt => {
        [0, 1].forEach(i => {
            if (this.rxCanvas.options.gravity) this.options.speed[i] += this.rxCanvas.options.gravity[i] * dt;
            if (this.rxCanvas.options.resistance) {
                const resistance = Math.sign(this.options.speed[i]) * this.rxCanvas.options.resistance * dt;
                this.options.speed[i] = Math.abs(this.options.speed[i]) > Math.abs(resistance) ? this.options.speed[i] - resistance : 0;
            }
        });
        this.checkBorder(dt);
        [0, 1].forEach(i => {
            this.options.position[i] += this.options.speed[i] * dt;
        });
    }

    checkBorder = (dt) => {
        if (!this.rxCanvas.options.border) return;

        const [x1, y1] = this.getLeftTop();
        const [x2, y2] = this.getRightBottom();
        if (x1 < 0) {
            this.options.speed[0] = + this.rxCanvas.options.bordersElasticity * Math.abs(this.options.speed[0]);
            if (Math.abs(this.options.speed[0]) <= Math.abs(this.rxCanvas.options.gravity[0] * dt)) this.options.speed[0] = 0;
        } else if (x2 > this.rxCanvas.canvas.width) {
            this.options.speed[0] = - this.rxCanvas.options.bordersElasticity * Math.abs(this.options.speed[0]);
            if (Math.abs(this.options.speed[0]) <= Math.abs(this.rxCanvas.options.gravity[0] * dt)) this.options.speed[0] = 0;
        }

        if (y1 < 0) {
            this.options.speed[1] = + this.rxCanvas.options.bordersElasticity * Math.abs(this.options.speed[1]);
            if (Math.abs(this.options.speed[1]) <= Math.abs(this.rxCanvas.options.gravity[1] * dt)) this.options.speed[1] = 0;
        } else if (y2 > this.rxCanvas.canvas.height) {
            this.options.speed[1] = - this.rxCanvas.options.bordersElasticity * Math.abs(this.options.speed[1]);
            if (Math.abs(this.options.speed[1]) <= Math.abs(this.rxCanvas.options.gravity[1] * dt)) this.options.speed[1] = 0;
        }
    }

    render = () => {
        if (this.sprite) {
            this.sprite.render(this.options.position);
        }
        
    }
}