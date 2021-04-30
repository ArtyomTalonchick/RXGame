import _ from "lodash";
import RXResources from "./helpers/RXResources";
import RXCanvas from "./RXCanvas";

const heroOptions = {
    position: [300, 30],

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
        // resistance: 30,
        // gravity: [0, 100],
        border: true,
    });

    // rxCanvas.createObjects(heroOptions);
    // rxCanvas.createObjects(megamanOptions);

    [...Array(100)].forEach((_, i) => {
        rxCanvas.createObjects({
            position: [Math.random() * 1000, Math.random() * 1000],
            speed: [Math.random() * 500, Math.random() * 500 ],
            spriteOptions: {
                fill: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
            },
        });
    })

    rxCanvas.createObjects({position: [1000, 100], speed: [0, 800], spriteOptions: {fill: getColor()}});
    rxCanvas.createObjects({position: [1000, 400], speed: [0, -400], spriteOptions: {fill: getColor()}});
    
    // rxCanvas.createObjects({position: [500, 440], speed: [100, 0], spriteOptions: {fill: getColor()}});
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