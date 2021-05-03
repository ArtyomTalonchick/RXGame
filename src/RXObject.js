import RXInput from "./helpers/RXInput";
import RXSprite from "./RXOSprite";

const getOptions = (options) => ({
    position: [0, 0],
    speed: [0, 0],
    weight: 1,
    elasticity: 1,
    spriteOptions: null,
    zIndex: 1,
    ...options,
    ...(options.controllability && 
        {
            controllability: {
                speed: [200, 200],
                inertia: false,
                ...options.controllability,
        }
    }),
});

const PLATFORM_DELTA = 0;

export default class RXObject {
    constructor(rxCanvas, options) {
        this.rxCanvas = rxCanvas;
        this.options = getOptions(options);
        this.state = {};
        this.collisions = new Set();
        this.setSprite(this.options.spriteOptions);
        delete this.options.spriteOptions;
    }

    setSprite = (spriteOptions = {}) => {
        this.sprite = new RXSprite(this.rxCanvas, spriteOptions);
    }

    update = dt => {
        this.move();
        this.checkBorderForSpeed();
        [0, 1].forEach(i => {
            if (this.rxCanvas.options.gravity) this.options.speed[i] += this.rxCanvas.options.gravity[i] * dt;
            if (this.rxCanvas.options.resistance) {
                const resistance = Math.sign(this.options.speed[i]) * this.rxCanvas.options.resistance * dt;
                this.options.speed[i] = Math.abs(this.options.speed[i]) > Math.abs(resistance) ? this.options.speed[i] - resistance : 0;
            }
        });
        this.options.previousPosition = [...this.options.position];
        [0, 1].forEach(i => {
            this.options.position[i] += this.options.speed[i] * dt;
        });
        this.checkBorderForPosition();
        this.sprite.update(dt);
    }

    move = () => {
        if (!this.options.controllability) return;

        if (this.options.controllability.down?.some(key => RXInput.isPressed(key))) {
            this.options.speed[1] = this.options.controllability.speed[1];
        } else if (this.options.controllability.up?.some(key => RXInput.isPressed(key)) &&
            (!this.options.controllability.floor || this.state.onFloor)) {
            this.options.speed[1] = -this.options.controllability.speed[1];
        } 
        // else if (!this.options.controllability.inertia && this.options.speed[1] < 0 ) {
        //      this.options.speed[1] = 0;
        // }
        
        if (this.options.controllability.left?.some(key => RXInput.isPressed(key))) {
            this.options.speed[0] = -this.options.controllability.speed[0];
        } else if (this.options.controllability.right?.some(key => RXInput.isPressed(key))) {
            this.options.speed[0] = this.options.controllability.speed[0];
        } else if (!this.options.controllability.inertia) {
            this.options.speed[0] = 0;
        }
    }

    checkBorderForSpeed = () => {
        if (!this.rxCanvas.options.border) return;

        const k = Math.sqrt(this.options.elasticity * this.rxCanvas.options.bordersElasticity);
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

        this.rxCanvas.platforms.forEach(platform => {
            if (platform.options.zIndex === this.options.zIndex) {
                const k = Math.sqrt(this.options.elasticity * platform.options.elasticity);

                if (this.options.position[0] + this.sprite.options.size[0]/2 > platform.options.position[0] 
                    && this.options.position[0] - this.sprite.options.size[0]/2 < platform.options.position[0] + platform.options.size[0]) {
                    if (Math.abs(this.options.position[1] + this.sprite.options.size[1]/2 - platform.options.position[1]) < 2) {
                        this.options.speed[1] = - k * Math.abs(this.options.speed[1]);
                    } else if (Math.abs(this.options.position[1] - this.sprite.options.size[1]/2 - platform.options.position[1] - platform.options.size[1]) < 2) {
                        this.options.speed[1] = + k * Math.abs(this.options.speed[1]);
                    }
                }
                if (this.options.position[1] + this.sprite.options.size[1]/2 > platform.options.position[1] 
                    && this.options.position[1] - this.sprite.options.size[1]/2 < platform.options.position[1] + platform.options.size[1]) {
                    if (Math.abs(this.options.position[0] + this.sprite.options.size[0]/2 - platform.options.position[0]) < 2) {
                        this.options.speed[0] = - k * Math.abs(this.options.speed[0]);
                    } else if (Math.abs(this.options.position[0] - this.sprite.options.size[0]/2 - platform.options.position[0] - platform.options.size[0]) < 2) {
                        this.options.speed[0] = + k * Math.abs(this.options.speed[0]);
                    } 
                }
            }
        });
    }

    checkBorderForPosition = () => {
        if (!this.rxCanvas.options.border) return;
        this.state.onFloor = false;

        if (this.options.position[0] - this.sprite.options.size[0] / 2 < 0) {
            this.options.position[0] = this.sprite.options.size[0] / 2;
        } else if (this.options.position[0] + this.sprite.options.size[0] / 2 > this.rxCanvas.canvas.width + 1) {
            this.options.position[0] = this.rxCanvas.canvas.width - this.sprite.options.size[0] / 2;
        }

        if (this.options.position[1] - this.sprite.options.size[1] / 2 < 0) {
            this.options.position[1] = this.sprite.options.size[1] / 2;
        } else if (this.options.position[1] + this.sprite.options.size[1] / 2 > this.rxCanvas.canvas.height) {
            this.options.position[1] = this.rxCanvas.canvas.height - this.sprite.options.size[1] / 2;
            this.state.onFloor = true;
        }

        
        this.rxCanvas.platforms.forEach(platform => {
            if (platform.options.zIndex === this.options.zIndex) {

                if (this.options.position[0] + this.sprite.options.size[0]/2 > platform.options.position[0] 
                    && this.options.position[0] - this.sprite.options.size[0]/2 < platform.options.position[0] + platform.options.size[0]) {

                    if (Math.abs(this.options.position[1] + this.sprite.options.size[1]/2 - platform.options.position[1]) < 2) {
                        this.options.position[1] = platform.options.position[1] - this.sprite.options.size[1]/2;
                        this.state.onFloor = true;
                    } else if (Math.abs(this.options.position[1] - this.sprite.options.size[1]/2 - platform.options.position[1] - platform.options.size[1]) < 2) {
                        this.options.position[1] = platform.options.position[1] + platform.options.size[1] + this.sprite.options.size[1]/2;
                    }
                }
            }
        });
    }

    render = () => {
        this.sprite.render(this.options.position);
        
    }
}