import _ from "lodash";
import RXResources from "./helpers/RXResources";
import RXCanvas from "./RXCanvas";

const heroOptions = {
    position: [300, 30],
    weight: 300,

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

    spriteOptions: {
        imageUrl: "./img/megaman.png",
        position: [0, 0],
        size: [31, 28],
        speed: 10,
        frames: [0, 1, 2],
    }
};

const getColor = () =>
    `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;


const init = () => {
    const rxCanvas = new RXCanvas(document.getElementById("canvas"), {
        fullMode: true,
        pattern: "./img/fill.jpg",
        updateInterval: .005,
        bordersElasticity: .9,
        resistance: 30,
        gravity: [0, 300],
        border: true,
    });

    // rxCanvas.createObjects(heroOptions);
    // rxCanvas.createObjects(megamanOptions);

    [...Array(100)].forEach((_, i) => {
        const size = 30 + Math.random() * 10;
        rxCanvas.createObjects({
            position: [30 + (i % 35 ) * 50, 30 + Math.floor(i / 35 ) * 50],
            speed: [Math.random() * 50, Math.random() * 50 ],
            weight: size ** 2,
            elasticity: 0.95 + Math.random() / 20,
            spriteOptions: {
                fill: getColor(),
                size: [size, size],
            },
        });
    })

    // rxCanvas.createObjects({position: [1000, 100], speed: [0, 800], spriteOptions: {fill: getColor()}});
    // rxCanvas.createObjects({position: [1000, 400], speed: [0, -400], spriteOptions: {fill: getColor()}});
    
    // rxCanvas.createObjects({position: [500, 40], speed: [100, 0], weight: 100, spriteOptions: {fill: getColor()}});
    // rxCanvas.createObjects({position: [800, 440], speed: [-100, 0], spriteOptions: {fill: getColor()}});

    // rxCanvas.createObjects({position: [500, 100], speed: [100, 100], spriteOptions: {fill: getColor()}});
    // rxCanvas.createObjects({position: [800, 400], speed: [-100, -100], spriteOptions: {fill: getColor()}});


    rxCanvas.start();

}

RXResources.load([
    "./img/fill.jpg",
    "./img/sprites.png",
    "./img/megaman.png",
]);

RXResources.onReady(init);