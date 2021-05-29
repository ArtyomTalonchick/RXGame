import test from "ava";
import collisionOtions from "./collisionOtions";

import RXObject from "../src/RXObject";
import RXCanvas from "../src/RXCanvas";
import RXObjectHelper from "../src/helpers/RXObjectHelper";

const canvas = document.createElement("canvas");
const rxCanvas = new RXCanvas(canvas, {});

const getObject = (position, speed) => new RXObject(rxCanvas, { position, speed, spriteOptions: { size: [10, 10] }});

collisionOtions.forEach(options => {  
  test(options[0], t => {
    const obj0 = getObject(...options[1]);
    const obj1 = getObject(...options[2]);

    t.is(RXObjectHelper.isCollision(obj0, obj1), options[3]);
  });
});