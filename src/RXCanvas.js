import RXResources from "./helpers/RXResources";
import RXObject from "./RXObject";

const getOptions = (context, options) => ({
    fullMode: true,
    fillStyle: options.pattern ? context.createPattern(RXResources.get(options.pattern), "repeat") : "rgb(255, 255, 255)",
    gravity: [0, 100],
    resistance: 10,
    updateInterval: 10,

});

export default class RXCanvas {
    constructor(element, options) {
        this.canvas = element;
        this.context = this.canvas.getContext("2d");
        this.objects = [];
        this.lastTime = null;
        this.updateIntervalId = null;
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
    }

    start = () => {
        this.lastUpdateTime = Date.now();
        this.updateIntervalId = setInterval(() => this.updateLoop(), this.options.updateInterval);
        this.renderLoop();
    }

    stop = () => {
        clearInterval(this.updateIntervalId);
        this.updateIntervalId = null;
    }

    updateLoop = () => {
        const now = Date.now();
        const dt = (now - this.lastUpdateTime) / 1000.0;
        this.update(dt);
        this.lastUpdateTime = now;
    }

    renderLoop = () => {
        this.render();
        requestAnimationFrame(this.renderLoop);
    }

    createObjects = (options) => {
        const object = new RXObject(this, options);
        this.objects.push(object);
        return object;
    }

    update = (dt) => {
        this.objects.forEach(object => object.update(dt));
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