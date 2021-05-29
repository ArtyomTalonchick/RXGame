export default () => {
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