
const isCollision = (obj1, obj2) => {
    const [x1, y1] = obj1.options.position;
    const [x2, y2] = obj2.options.position;
    const r1 = obj1.sprite.options.size[0] / 4 + obj1.sprite.options.size[1] / 4;
    const r2 = obj2.sprite.options.size[0] / 4 + obj2.sprite.options.size[1] / 4;
    const diff = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2) - (r1 + r2);
    return diff < 0 ? -diff : false;
}

const getAngle = (x, y) => {
    return x === 0 
            ? Math.sign(y) * Math.PI / 2
            : y === 0 && x < 0 
                ? -Math.PI
                : Math.sign(y) * Math.acos(x / (Math.sqrt(x ** 2 + y ** 2)));
}

const hitObjects = (obj1, obj2) => {
    if (!isCollision(obj1, obj2)) return;

    const [x1, y1] = obj1.options.position;
    const [x2, y2] = obj2.options.position;
    const [v1x, v1y] = obj1.options.speed;
    const [v2x, v2y] = obj2.options.speed;
    const m1 = obj1.options.weight;
    const m2 = obj2.options.weight;
    const v1 = Math.sqrt(v1x ** 2 + v1y ** 2);
    const v2 = Math.sqrt(v2x ** 2 + v2y ** 2);
    const a1 = getAngle(v1x, v1y);
    const a2 = getAngle(v2x, v2y);
    const a = getAngle((x2 - x1), (y2 - y1));

    obj1.options.speed = [
        (v1 * Math.cos(a1 - a) * (m1 - m2) + 2 * m2 * v2 * Math.cos(a2 - a)) * Math.cos(a) / (m1 + m2) +
            + v1 * Math.sin(a1 - a) * Math.cos(a + Math.PI / 2),
        (v1 * Math.cos(a1 - a) * (m1 - m2) + 2 * m2 * v2 * Math.cos(a2 - a)) * Math.sin(a) / (m1 + m2) +
            + v1 * Math.sin(a1 - a) * Math.sin(a + Math.PI / 2),
    ];
    obj2.options.speed = [
        (v2 * Math.cos(a2 - a) * (m2 - m1) + 2 * m1 * v1 * Math.cos(a1 - a)) * Math.cos(a) / (m1 + m2) +
            + v2 * Math.sin(a2 - a) * Math.cos(a + Math.PI / 2),
        (v2 * Math.cos(a2 - a) * (m2 - m1) + 2 * m1 * v1 * Math.cos(a1 - a)) * Math.sin(a) / (m1 + m2) +
            + v2 * Math.sin(a2 - a) * Math.sin(a + Math.PI / 2),
    ];
    obj1.options.previousPosition && (obj1.options.position = [...obj1.options.previousPosition]);
    obj2.options.previousPosition && (obj2.options.position = [...obj2.options.previousPosition]);
    
    while (isCollision(obj1, obj2)) {
        obj1.options.position[0] += obj1.options.speed[0] * obj1.rxCanvas.options.updateInterval / 1000.0;
        obj1.options.position[1] += obj1.options.speed[1] * obj1.rxCanvas.options.updateInterval / 1000.0;
        obj2.options.position[0] += obj2.options.speed[0] * obj2.rxCanvas.options.updateInterval / 1000.0;
        obj2.options.position[1] += obj2.options.speed[1] * obj2.rxCanvas.options.updateInterval / 1000.0;
    }
    obj1.options.previousPosition = [...obj1.options.position];
    obj2.options.previousPosition = [...obj2.options.position];
}

export default {
    hitObjects
}