export default rxCanvas => {
    rxCanvas.createPlatforms({
        fillStyle: "red",
        position: [0, 100],
        size: [100, 20],
    });
    rxCanvas.createPlatforms({
        fillStyle: "green",
        position: [100, 0],
        size: [20, 100],
    });
    rxCanvas.createObjects({
        position: [50, 50],
        spriteOptions: { fill: "red" },
        elasticity: 0,
        controllability: {
            inertia: true,
            speed: [200, 200],
            up: [String.fromCharCode(52)],
            down: [String.fromCharCode(97)],
            left: [String.fromCharCode(10)],
            right: ["RIGHT"],
        },
    });
}