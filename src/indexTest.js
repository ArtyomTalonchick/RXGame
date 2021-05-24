import _ from "lodash";
import RXResources from "./helpers/RXResources";
import RXCanvas from "./RXCanvas";


const physicalTest = rxCanvas => {
    [...Array(10)].forEach((_, i) => {
        const x = i * 50 + 50;
        rxCanvas.createObjects({
            position: [x, 100],
            speed: [0, 80],
            spriteOptions: { fill: `rgb(${x % 255}, 20, 80)` },
        });
        rxCanvas.createObjects({
            position: [x, 150],
            speed: [0, 10],
            weight: 10 + i,
            elasticity: .8 + i/10,
            spriteOptions: { fill: `rgb(20, ${x % 255}, 80)` },
        });
    });
}

const hitTest = rxCanvas => {
    [...Array(10)].forEach((_, i) => {
        const x = i * 50 + 50;
        rxCanvas.createObjects({
            position: [x, 100],
            speed: [x % 100, 80],
            spriteOptions: { fill: `rgb(${x % 255}, 20, 80)` },
        });
        rxCanvas.createObjects({
            position: [x, 150],
            speed: [(x + 23 ) % 100, -10],
            spriteOptions: { fill: `rgb(20, ${x % 255}, 80)` },
        });
    });
}

const platformTest = rxCanvas => {
    rxCanvas.createPlatforms({
        fillStyle: "red",
        position: [0, 200],
        size: [300, 30],
        elasticity: .5,
    });
    rxCanvas.createPlatforms({
        fillStyle: "green",
        position: [300, 100],
        size: [30, 1000],
        elasticity: .8,
    });
    rxCanvas.createObjects({
        position: [30, 100],
        speed: [100, 80],
        spriteOptions: { fill: `rgb(${10 % 255}, 20, 80)` },
    });
}

const zIndexTest = rxCanvas => {
    [...Array(10)].forEach((_, i) => {
        const color = `rgb(${23 * i % 255}, 10, 70)`;
        rxCanvas.createPlatforms({
            fillStyle: color,
            position: [i * 100 + 90, 0],
            size: [20, 1000],
            elasticity: .8,
            zIndex: i % 3
        });
        rxCanvas.createObjects({
            position: [100 * i + 50, i * 50 + 50],
            speed: [90, 0],
            spriteOptions: { fill: color },
            zIndex: i % 3
        });
    });
}

const moveTest = rxCanvas => {
    rxCanvas.createPlatforms({
        fillStyle: "red",
        position: [0, 100],
        size: [100, 20],
    });
    rxCanvas.createPlatforms({
        fillStyle: "green",
        position: [100, 0],
        size: [20, 100],
    });
    rxCanvas.createObjects({
        position: [50, 50],
        spriteOptions: { fill: "red" },
        elasticity: 0,
        controllability: {
            inertia: true,
            speed: [200, 200],
            up: [String.fromCharCode(52)],
            down: [String.fromCharCode(97)],
            left: [String.fromCharCode(10)],
            right: ["RIGHT"],
        },
    });
}

let subscription;

const eventObjectsTest = rxCanvas => {
    let a = rxCanvas.createObjects({
        position: [350, 300],
        speed: [50, 0],
        spriteOptions: { fill: "red" },
    });
    let b = rxCanvas.createObjects({
        position: [400, 300],
        speed: [0, 0],
        spriteOptions: { fill: "green" },
    });
    subscription = rxCanvas.collisions$
        .subscribe(e => {
            if (e.objects.includes(a) && e.objects.includes(b)) {
                rxCanvas.createObjects({
                    position: [370, 250],
                    speed: [0, 50],
                    spriteOptions: { fill: "blue" },
                });
            }
        });
}

const eventBordersTest = rxCanvas => {
    const speeds = [
        [100, 100],
        [-100, 100],
        [100, -100],
        [-100, -100],
    ];
    let i = 0;
    const objects = [
        rxCanvas.createObjects({
            position: [400, 300],
            speed: speeds[i],
            spriteOptions: { fill: "red" },
        })
    ];
    subscription = rxCanvas.collisions$
        .subscribe(e => {
            console.log(e)
            if (i === 0 && e.objects.includes(objects[0])
                || i === 1 && e.objects.includes(objects[1]) && e.side === "bottom"
                || i === 2 && e.objects.includes(objects[1]) && e.side === "left"
            ) {
                i++;
                if (i < speeds.length) {
                    objects.push(
                        rxCanvas.createObjects({
                            position: [300, 300],
                            speed: speeds[i],
                            spriteOptions: { fill: "red" },
                        })
                    )
                }
            }
        });
}

const eventPlatformsTest = rxCanvas => {
    const o1 = rxCanvas.createObjects({
        position: [350, 250],
        speed: [100, 0],
        spriteOptions: { fill: "red" },
    });
    const p1 = rxCanvas.createPlatforms({
        fillStyle: "green",
        position: [450, 200],
        size: [20, 100],
    });
    let o2, p2, p3, p4;
    subscription = rxCanvas.collisions$
        .subscribe(e => {
            if (e.objects.includes(o1) && e.platforms.includes(p1) && e.side === "right") {
                p2 = rxCanvas.createPlatforms({
                    fillStyle: "blue",
                    position: [350, 200],
                    size: [20, 100],
                })
            }
            if (e.objects.includes(o1) && e.platforms.includes(p1) && e.side === "right" && p1 && !p3) {
                p3 = rxCanvas.createPlatforms({
                    fillStyle: "gray",
                    position: [250, 200],
                    size: [100, 20],
                })
            }
            if (e.objects.includes(o1) && e.platforms.includes(p1) && e.side === "right" && !o2) {
                o2 = rxCanvas.createObjects({
                    position: [270, 300],
                    speed: [0, -100],
                    spriteOptions: { fill: "pink" },
                });
            }
            if (e.objects.includes(o2) && e.platforms.includes(p3) && e.side === "top" && !p4) {
                p4 = rxCanvas.createPlatforms({
                    fillStyle: "yellow",
                    position: [250, 300],
                    size: [100, 20],
                })
            }
        });
}

const spritesTest = rxCanvas => {
    rxCanvas.stop();
    const button = document.createElement("button");
    document.body.appendChild(button);
    button.id = "nextSprite";
    rxCanvas.createObjects({
        position: [100, 100],
        spriteOptions: {
            imageUrl: "./img/megaman.png",
            position: [0, 0],
            size: [31, 28],
            speed: 100,
            frames: [0, 1, 2],
            once: true,
        }
    });
    rxCanvas.createObjects({
        position: [200, 100],
        spriteOptions: {
            imageUrl: "./img/megaman.png",
            position: [0, 0],
            size: [31, 28],
            speed: 100,
            frames: [1, 2, 1],
        }
    });
    rxCanvas.createObjects({
        position: [200, 200],
        spriteOptions: {
            imageUrl: "./img/sprites.png",
            position: [0, 0],
            size: [39, 35],
            speed: 100,
            frames: [0, 1],
        }
    });
    rxCanvas.createObjects({
        position: [100, 200],
        spriteOptions: {
            imageUrl: "./img/sprites.png",
            position: [0, 117],
            size: [39, 39],
            speed: 100,
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            once: true,
        }
    });

    const onClick = () => {
        requestAnimationFrame(() => {
            rxCanvas.start();
            setTimeout(rxCanvas.stop);
        });
    }
    button.addEventListener("click", onClick);

}

const init = () => {
    const body = document.getElementsByTagName("body")[0];
    body.style.overflow = "hidden"
    const rxCanvas = new RXCanvas(document.getElementById("canvas"), {
        fullMode: false,
        pattern: "./img/fill.jpg",
        updateInterval: .01,
        bordersElasticity: 0.5,
        resistance: 10,
        border: true,
        size: [1000, 540],
        test: true,
    });
    window.rxCanvas = rxCanvas;

    const executeTest = test => {
        rxCanvas.stop();
        subscription?.unsubscribe();
        subscription = null;
        rxCanvas.objects = [];
        rxCanvas.platforms = [];
        rxCanvas.start();
        test(rxCanvas);
    }

    // executeTest(spritesTest);
    
    [physicalTest, hitTest, platformTest, zIndexTest, moveTest, eventObjectsTest, eventBordersTest, eventPlatformsTest, spritesTest].forEach((test, i) => {
        const button = document.createElement("button");
        button.innerHTML = test.name;
        button.id = test.name;
        body.appendChild(button);
        button.addEventListener("click", () => executeTest(test));
        
    });    
}

RXResources.load([
    "./img/fill.jpg",
    "./img/sprites.png",
    "./img/megaman.png",
]);

RXResources.onReady(() => {
    init();
});



