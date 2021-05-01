let x1, y1, x2, y2, r1, r2, d1, d2, k, v1x, v1y, v2x, v2y, m1, m2, v1, v2, a1, a2, a;

const isCollision = (obj1, obj2) => {
    x1 = obj1.options.position[0];
    y1 = obj1.options.position[1];
    x2 = obj2.options.position[0];
    y2 = obj2.options.position[1];
    // [x1, y1] = obj1.options.position;
    // [x2, y2] = obj2.options.position;
    r1 = obj1.sprite.options.size[0] / 4 + obj1.sprite.options.size[1] / 4;
    r2 = obj2.sprite.options.size[0] / 4 + obj2.sprite.options.size[1] / 4;
    d1 = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

    if (d1 > (r1 + r2)) return false;

    k = obj1.rxCanvas.options.updateInterval / 1000.0;
    x1 = obj1.options.position[0] + obj1.options.speed[0] * k;
    y1 = obj1.options.position[1] + obj1.options.speed[1] * k;
    x2 = obj2.options.position[0] + obj2.options.speed[0] * k;
    y2 = obj2.options.position[1] + obj2.options.speed[1] * k;
    d2 = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    
    return d2 < d1;
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


    x1 = obj1.options.position[0];
    y1 = obj1.options.position[1];
    x2 = obj2.options.position[0];
    y2 = obj2.options.position[1];
    v1x = obj1.options.speed[0];
    v1y = obj1.options.speed[1];
    v2x = obj2.options.speed[0];
    v2y = obj2.options.speed[1];
    // [v1x, v1y] = obj1.options.speed;
    // [v2x, v2y] = obj2.options.speed;
    // [x1, y1] = obj1.options.position;
    // [x2, y2] = obj2.options.position;
    m1 = obj1.options.weight;
    m2 = obj2.options.weight;
    v1 = Math.sqrt(v1x ** 2 + v1y ** 2);
    v2 = Math.sqrt(v2x ** 2 + v2y ** 2);
    a1 = getAngle(v1x, v1y);
    a2 = getAngle(v2x, v2y);
    a = getAngle((x2 - x1), (y2 - y1));

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
    k = Math.sqrt(obj1.options.elasticity ** 2 / 2 + obj2.options.elasticity ** 2 / 2);
    obj1.options.speed[0] *= k;
    obj1.options.speed[1] *= k;
    obj2.options.speed[0] *= k;
    obj2.options.speed[1] *= k;


}

export default {
    hitObjects
}