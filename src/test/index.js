import RXResources from "../helpers/RXResources";
import RXCanvas from "../RXCanvas";

import physicalScenario from "./scenarios/physicalScenario";
import hitScenario from "./scenarios/hitScenario";
import platformScenario from "./scenarios/platformScenario";
import zIndexScenario from "./scenarios/zIndexScenario";
import moveScenario from "./scenarios/moveScenario";
import eventObjectsScenario from "./scenarios/eventObjectsScenario";
import eventBordersScenario from "./scenarios/eventBordersScenario";
import eventPlatformsScenario from "./scenarios/eventPlatformsScenario";
import spritesScenario from "./scenarios/spritesScenario";

const scenarios = {
    physicalScenario,
    hitScenario,
    platformScenario,
    zIndexScenario,
    moveScenario,
    eventObjectsScenario,
    eventBordersScenario,
    eventPlatformsScenario,
    spritesScenario,
};


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

    let subscription = null;

    const executeScenario = test => {
        rxCanvas.stop();
        subscription?.unsubscribe();
        subscription = null;
        rxCanvas.objects = [];
        rxCanvas.platforms = [];
        rxCanvas.start();
        subscription = test(rxCanvas);
    }
    
    Object.entries(scenarios).forEach(([name, scenario], i) => {
        const button = document.createElement("button");
        button.innerHTML = name;
        button.id = name;
        body.appendChild(button);
        button.addEventListener("click", () => executeScenario(scenario));
        
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



