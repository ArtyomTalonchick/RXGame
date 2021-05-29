export default rxCanvas => {
    const speeds = [
        [100, 100],
        [-100, 100],
        [100, -100],
        [-100, -100],
    ];
    let i = 0;
    const objects = [
        rxCanvas.createObjects({
            position: [400, 300],
            speed: speeds[i],
            spriteOptions: { fill: "red" },
        })
    ];
    return rxCanvas.collisions$
        .subscribe(e => {
            console.log(e)
            if (i === 0 && e.objects.includes(objects[0])
                || i === 1 && e.objects.includes(objects[1]) && e.side === "bottom"
                || i === 2 && e.objects.includes(objects[1]) && e.side === "left"
            ) {
                i++;
                if (i < speeds.length) {
                    objects.push(
                        rxCanvas.createObjects({
                            position: [300, 300],
                            speed: speeds[i],
                            spriteOptions: { fill: "red" },
                        })
                    )
                }
            }
        });
}