const getOptions = (options) => ({
    elasticity: 1,
    zIndex: 1,
    ...options,
});

export default class RXPlatform {
    constructor(rxCanvas, options) {
        this.rxCanvas = rxCanvas;
        this.options = getOptions(options);
    }

    update = () => {}

    render = () => {
        this.rxCanvas.context.fillStyle = this.options.fillStyle;
        this.rxCanvas.context.fillRect(
            this.options.position[0],
            this.options.position[1],
            this.options.size[0],
            this.options.size[1],
        );
    }
}