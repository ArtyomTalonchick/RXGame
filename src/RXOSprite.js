import RXResources from "./helpers/RXResources";

const getOptions = (options) => ({
    imageUrl: null,         // путь к изображению
    fill: "rgb(0, 0, 0)",   // цвет прямоугольник, если не задано изображение
    position: [0, 0],       // x и y координаты изображения на спрайт карте
    size: [32, 32],         // размеры (только одного кадры)
    speed: 0,               // скорость анимации в фрейм/с
    frames: [0],            // массив индексов фреймов в порядке анимации
    dir: "horizontal",      // в каком направлении двигаться по спрайт карте: 'horizontal (по-умолчанию) или 'vertical'
    once: false,            // необходимо отобразить только один цикл анимации
    ...options,
});

export default class RXSprite {
    constructor(rxCanvas, options) {
        this.rxCanvas = rxCanvas;
        this.options = getOptions(options);
        this.frameStep = 0;
        this.done = false;
    }

    update = dt => {
        this.frameStep += this.options.speed * dt;
    }

    render = (drowPosition = [0, 0]) => {    
        if (this.options.imageUrl && RXResources.get(this.options.imageUrl)) {
            let frame = 0;
        
            if (this.options.speed > 0) {
                const max = this.options.frames.length;
                const frameIndex = Math.floor(this.frameStep);
                frame = this.options.frames[frameIndex % max];
                if (this.once && frameIndex >= max) return this.done = true;
            }
        
            let [sx, sy] = this.options.position;
        
            if (this.options.dir === "vertical") {
                sy += frame * this.options.size[1];
            } else {
                sx += frame * this.options.size[0];
            }
            this.rxCanvas.context.drawImage(
                RXResources.get(this.options.imageUrl),
                sx, sy,
                ...this.options.size,
                drowPosition[0] - this.options.size[0] / 2,
                drowPosition[1] - this.options.size[1] / 2,
                ...this.options.size
            );
        } else {
            this.rxCanvas.context.fillStyle = this.options.fill;
            this.rxCanvas.context.strokeStyle = this.options.fill;
            this.rxCanvas.context.beginPath();
            this.rxCanvas.context.arc(
                drowPosition[0],
                drowPosition[1],
                this.options.size[0] / 4 + this.options.size[1] / 4,
                0,
                2 * Math.PI,
            );
            this.rxCanvas.context.stroke();
            this.rxCanvas.context.fill();
            // this.rxCanvas.context.fillRect(
            //     drowPosition[0] - this.options.size[0] / 2,
            //     drowPosition[1] - this.options.size[1] / 2,
            //     ...this.options.size
            // );
        }
    }
}