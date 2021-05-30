import RXResources from "./helpers/RXResources";
import RXCanvas from "./RXCanvas";
import { pipe } from "rxjs";
import { debounceTime, filter } from 'rxjs/operators';


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
    position: [1000, 100],
    speed: [100, 100],
    weight: 3000,
    elasticity: .9,
    weightlessness: true,
    controllability: {
        inertia: false,
        // floor: true,
        speed: [200, 200],
        up: ["up"],
        down: ["down"],
        left: ["left"],
        right: ["right"],
    },

    spriteOptions: {
        imageUrl: "./img/megaman.png",
        position: [0, 0],
        size: [31, 28],
        speed: 10,
        // frames: [0, 1, 2],
    }
};

const getColor = () => `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;


const addBalls = (rxCanvas, count = 10) => {
    [...Array(count)].forEach((_, i) => {
        const size = 30;// + Math.random() * 10;
        rxCanvas.createObjects({
            position: [30 + (i % 35 ) * 50, 30 + Math.floor(i / 35 ) * 50],
            // speed: [210, Math.random() * 500 ],
            weight: 1000000,
            zIndex: 1,
            elasticity: 1,
            spriteOptions: {
                fill: "red",//getColor(),
                size: [size, size],
            },
        });
    });
}
const addStatic = (rxCanvas) => {
    rxCanvas.createPlatforms({
        fillStyle: 'red',
        position: [300, 300],
        size: [300, 30],
        elasticity: 1,
    });
    rxCanvas.createPlatforms({
        fillStyle: 'green',
        position: [500, 300],
        size: [30, 1000],
        elasticity: 1,
    });
}

const initGame = () => {
    let resolveResult, rejectResult;
    const resultPromise = new Promise((resolve, reject) => {resolveResult = resolve; rejectResult = reject});
    const rxCanvas = new RXCanvas(document.getElementById("canvas"), {
        fullMode: true,
        pattern: "./img/fill.jpg",
        updateInterval: .005,
        bordersElasticity: 1,
        resistance: 10,
        // gravity: [0, 300],
        border: true,
    });
    const megaman = rxCanvas.createObjects(megamanOptions);
    const subscription = rxCanvas.collisions$
        .pipe(
            // debounceTime(100),
            filter(e => e?.objects?.length > 1),
            filter(e => e.objects.some(obj => obj === megaman))
        ).subscribe(e => {
            subscription.unsubscribe();
            rxCanvas.stop();
            rejectResult();           
        });
    
    setTimeout(() => {
        subscription.unsubscribe();
        rxCanvas.stop();
        resolveResult();  
    }, 1000000);

    // rxCanvas.createObjects(heroOptions);
    addBalls(rxCanvas, 15);
    addStatic(rxCanvas);

    rxCanvas.start();
    
    return resultPromise;
}

RXResources.load([
    "./img/fill.jpg",
    "./img/sprites.png",
    "./img/megaman.png",
]);

const start = () => {
    // const startTime = Date.now();
    initGame()
        .then(() => {
            alert("YOU ARE WIN!!!");
        })
        .catch(() => {
            alert("Game over(");
        })
        .finally(() => {
            start()
        });
}

RXResources.onReady(() => {
    start();
});



