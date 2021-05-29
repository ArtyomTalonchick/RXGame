export default rxCanvas => {
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