export default rxCanvas => {
    rxCanvas.stop();
    const button = document.createElement("button");
    document.body.appendChild(button);
    button.id = "nextSprite";
    rxCanvas.createObjects({
        position: [100, 100],
        spriteOptions: {
            imageUrl: "./img/megaman.png",
            position: [0, 0],
            size: [31, 28],
            speed: 100,
            frames: [0, 1, 2],
            once: true,
        }
    });
    rxCanvas.createObjects({
        position: [200, 100],
        spriteOptions: {
            imageUrl: "./img/megaman.png",
            position: [0, 0],
            size: [31, 28],
            speed: 100,
            frames: [1, 2, 1],
        }
    });
    rxCanvas.createObjects({
        position: [200, 200],
        spriteOptions: {
            imageUrl: "./img/sprites.png",
            position: [0, 0],
            size: [39, 35],
            speed: 100,
            frames: [0, 1],
        }
    });
    rxCanvas.createObjects({
        position: [100, 200],
        spriteOptions: {
            imageUrl: "./img/sprites.png",
            position: [0, 117],
            size: [39, 39],
            speed: 100,
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            once: true,
        }
    });

    const onClick = () => {
        requestAnimationFrame(() => {
            rxCanvas.start();
            setTimeout(rxCanvas.stop);
        });
    }
    button.addEventListener("click", onClick);

}