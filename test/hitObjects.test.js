import test from "ava";
import hitOptions from "./hitObjectsOptions";

import RXObject from "../src/RXObject";
import RXCanvas from "../src/RXCanvas";
import RXObjectHelper from "../src/helpers/RXObjectHelper";

const canvas = document.createElement("canvas");
const rxCanvas = new RXCanvas(canvas, {});

const getObject = (position = [0, 0], speed = [0, 0], options = {}) => 
  new RXObject(rxCanvas, {
    position,
    speed,
    spriteOptions: { size: [10, 10] },
    ...options,
  });

const getNumber = n => (+(n.toFixed(8))).toString();

hitOptions.forEach(options => {  
  test(options[0], t => {
    const obj0 = getObject(...options[1]);
    const obj1 = getObject(...options[2]);

    RXObjectHelper.hitObjects(obj0, obj1);
    t.is(getNumber(obj0.options.speed[0]), getNumber(options[3][0][0]));
    t.is(getNumber(obj0.options.speed[1]), getNumber(options[3][0][1]));
    t.is(getNumber(obj1.options.speed[0]), getNumber(options[3][1][0]));
    t.is(getNumber(obj1.options.speed[1]), getNumber(options[3][1][1]));
  });
});