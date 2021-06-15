# RXGame

RXGame is a game engine that allows you to quickly create 2D games using the JavaScript programming language.

## Quick start

### Installing

```
npm install https://github.com/ArtyomTalonchick/RXGame.git
```

### Gameplay initialization
To initialize the gameplay, you need to create an object of the `RXCanvas` class. You can create gameplay objects using the `createObjects` and `createPlatforms` methods of the `RXCanvas` class. The start method of the `RXCanvas` class is used to start the gameplay.

```
import { RXCanvas } from "rxgame";

const rxCanvas = new RXCanvas(document.getElementById("canvas"), {
    fullMode: true,
    border: true,
});

const rxObject = rxCanvas.createObjects({
    position: [100, 100],
    speed: [100, 0],
});

const rxPlatforms = rxCanvas.createObjects({
    position: [100, 100],
    speed: [100, 0],
});

rxCanvas.start();
```
