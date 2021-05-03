import _ from "lodash";
import RXResources from "./helpers/RXResources";
import RXCanvas from "./RXCanvas";

const heroOptions = {
    position: [300, 30],
    weight: 5000,
    speed: [100, 100],
    controllability: {
        up: ["w"],
        down: ["s"],
        left: ["a"],
        right: ["d"],
    },

    spriteOptions: {
        imageUrl: "./img/sprites.png",
        position: [0, 0],
        size: [39, 35],
        speed: 16,
        frames: [0, 1],
    }
};

const megamanOptions = {
    position: [100, 100],
    speed: [100, 100],
    weight: 3000,
    controllability: {
        inertia: true,
        speed: [100, 300],
        up: ["up"],
        // down: ["down"],
        left: ["left"],
        right: ["right"],
    },

    spriteOptions: {
        imageUrl: "./img/megaman.png",
        position: [0, 0],
        size: [31, 28],
        speed: 10,
        frames: [0, 1, 2],
    }
};

const getColor = () => `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;


const addBalls = (rxCanvas, count = 10) => {
    [...Array(count)].forEach((_, i) => {
        const size = 30 + Math.random() * 10;
        rxCanvas.createObjects({
            position: [30 + (i % 35 ) * 50, 30 + Math.floor(i / 35 ) * 50],
            speed: [Math.random() * 50, Math.random() * 50 ],
            weight: 1000000,
            // zIndex: Math.random() > .5,
            elasticity: 0.95 + Math.random() / 20,
            spriteOptions: {
                fill: getColor(),
                size: [size, size],
            },
        });
    });
}

const init = () => {
    const rxCanvas = new RXCanvas(document.getElementById("canvas"), {
        fullMode: true,
        pattern: "./img/fill.jpg",
        updateInterval: .005,
        bordersElasticity: .1,
        resistance: 30,
        gravity: [0, 300],
        border: true,
    });

    // rxCanvas.createObjects(heroOptions);
    rxCanvas.createObjects(megamanOptions);
    addBalls(rxCanvas, 1);


    rxCanvas.start();

}

RXResources.load([
    "./img/fill.jpg",
    "./img/sprites.png",
    "./img/megaman.png",
]);

RXResources.onReady(init);



