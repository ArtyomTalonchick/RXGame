
export default rxCanvas => {
    let a = rxCanvas.createObjects({
        position: [350, 300],
        speed: [50, 0],
        spriteOptions: { fill: "red" },
    });
    let b = rxCanvas.createObjects({
        position: [400, 300],
        speed: [0, 0],
        spriteOptions: { fill: "green" },
    });
    return rxCanvas.collisions$
        .subscribe(e => {
            if (e.objects.includes(a) && e.objects.includes(b)) {
                rxCanvas.createObjects({
                    position: [370, 250],
                    speed: [0, 50],
                    spriteOptions: { fill: "blue" },
                });
            }
        });
}