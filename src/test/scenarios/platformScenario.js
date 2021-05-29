
export default rxCanvas => {
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