export default rxCanvas => {
    const o1 = rxCanvas.createObjects({
        position: [350, 250],
        speed: [100, 0],
        spriteOptions: { fill: "red" },
    });
    const p1 = rxCanvas.createPlatforms({
        fillStyle: "green",
        position: [450, 200],
        size: [20, 100],
    });
    let o2, p2, p3, p4;
    return rxCanvas.collisions$
        .subscribe(e => {
            if (e.objects.includes(o1) && e.platforms.includes(p1) && e.side === "right") {
                p2 = rxCanvas.createPlatforms({
                    fillStyle: "blue",
                    position: [350, 200],
                    size: [20, 100],
                })
            }
            if (e.objects.includes(o1) && e.platforms.includes(p1) && e.side === "right" && p1 && !p3) {
                p3 = rxCanvas.createPlatforms({
                    fillStyle: "gray",
                    position: [250, 200],
                    size: [100, 20],
                })
            }
            if (e.objects.includes(o1) && e.platforms.includes(p1) && e.side === "right" && !o2) {
                o2 = rxCanvas.createObjects({
                    position: [270, 300],
                    speed: [0, -100],
                    spriteOptions: { fill: "pink" },
                });
            }
            if (e.objects.includes(o2) && e.platforms.includes(p3) && e.side === "top" && !p4) {
                p4 = rxCanvas.createPlatforms({
                    fillStyle: "yellow",
                    position: [250, 300],
                    size: [100, 20],
                })
            }
        });
}