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

const objOptions = {
    position: [200, 100],
    speed: [300, -500],
};

const init = () => {
    const rxCanvas = new RXCanvas(document.getElementById("canvas"), {
        fullMode: true,
        pattern: "./img/fill.jpg",
        resistance: 30,
        gravity: [0, 100],
        border: true,
    });

    rxCanvas.clear();
    rxCanvas.createObjects(heroOptions);
    rxCanvas.createObjects(megamanOptions);
    rxCanvas.createObjects(objOptions);
    rxCanvas.start();

}

RXResources.load([
    "./img/fill.jpg",
    "./img/sprites.png",
    "./img/megaman.png",
]);

RXResources.onReady(init);