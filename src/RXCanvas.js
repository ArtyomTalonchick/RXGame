import RXResources from "./helpers/RXResources";
import RXObject from "./RXObject";
import RXObjectHelper from "./helpers/RXObjectHelper";
// import { hitObjects } from "./helpers/RXObjectHelper";

const getOptions = (context, options) => ({
    fullMode: true,
    fillStyle: options.pattern ? context.createPattern(RXResources.get(options.pattern), "repeat") : "rgb(255, 255, 255)",
    borders: true,
    bordersElasticity: 1,
    gravity: [0, 0],
    resistance: 0,
    updateInterval: .010,
    ...options,
});

export default class RXCanvas {
    constructor(element, options) {
        this.canvas = element;
        this.context = this.canvas.getContext("2d");
        this.objects = [];
        this.lastTime = null;
        this.updateIntervalId = null;
        this.isStarting = false;
        this.options = getOptions(this.context, options);
        
        if (this.options.fullMode) this.onWindowResize();

        this.bindEvents();
    }

    bindEvents = () => {
        this.options.fullMode && window.addEventListener("resize", this.onWindowResize, true);
    }

    onWindowResize = () => {
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
        // this.canvas.width = 500;
        // this.canvas.height = 500;
    }

    start = () => {
        this.isStarting = true;

        this.lastUpdateTime = Date.now();
        this.updateLoop();
        this.renderLoop();
    }

    stop = () => {
        this.isStarting = false;
        this.updateIntervalId = null;
    }

    updateLoop = () => {
        if (!this.isStarting) return;
        this.objects.sort((a, b) => a.options.zIndex - b.options.zIndex);

        const now = Date.now();
        const dt = (now - this.lastUpdateTime) / 1000.0;
        this.update(dt);
        this.lastUpdateTime = now;
        setTimeout(this.updateLoop, this.options.updateInterval * 1000.0);
    }

    renderLoop = () => {
        this.render();
        requestAnimationFrame(this.renderLoop);
    }

    createObjects = options => {
        const object = new RXObject(this, options);
        this.objects.push(object);
        if (this.isStarting) {
            this.objects.sort((a, b) => a.options.zIndex - b.options.zIndex);
        }
        return object;
    }

    update = dt => {
        this.objects.forEach(object => object.update(dt));
        this.checkCollision();
    }

    checkCollision = () => {
        for (let i = 0; i < this.objects.length; i++) {
            for (let j = i + 1; j < this.objects.length; j++) {
                if (this.objects[i].options.zIndex === this.objects[j].options.zIndex) {
                    RXObjectHelper.hitObjects(this.objects[i], this.objects[j]);
                }
            }   
        }
    }

    clear = () => {
        this.context.fillStyle = this.options.fillStyle;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render = () => {
        this.clear();
        this.objects.forEach(object => object.render());
    }
}