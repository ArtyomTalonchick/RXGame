const KEYS = {
    "32": "SPACE",
    "37": "LEFT",
    "38": "UP",
    "39": "RIGHT",
    "40": "DOWN",
}

class RXInput {
    constructor() {
        if(!RXInput.instance){
            this.setDefault();
            this.bindEvents();
            RXInput.instance = this;
        }
        return RXInput.instance;
    }

    setDefault = () => {
        this.pressedKeys = {};
    }

    bindEvents =() => {
        document.addEventListener("keydown", e => this.setKey(e, true));
        document.addEventListener("keyup", e => this.setKey(e, false));
        window.addEventListener("blur", () => this.pressedKeys = {});
    }

    setKey = (event, status) => {
        const key = KEYS[event.keyCode] || String.fromCharCode(event.keyCode);
        // console.log(`${event.keyCode} -- ${String.fromCharCode(event.keyCode)}`);
        this.pressedKeys[key] = status;
    }

    isPressed = key => this.pressedKeys[key.toUpperCase()];
}

const rxInput = new RXInput();
// Object.freeze(rxInput);
export default {
    isPressed: rxInput.isPressed,
}