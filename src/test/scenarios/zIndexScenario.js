export default rxCanvas => {
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