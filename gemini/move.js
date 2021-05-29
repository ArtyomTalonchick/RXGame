gemini.suite("move", (suite) => {
    suite.setUrl("/")
        .setCaptureElements("#canvas")
        .capture("moveLeft", (actions, find) => {
            actions.click("#moveScenario");
            actions.wait(500);
            actions.executeJS(window => window.document.dispatchEvent(new KeyboardEvent("keydown", { "keyCode": 10 })));
            actions.wait(500);
            actions.executeJS(window => window.document.dispatchEvent(new KeyboardEvent("keyup", { "keyCode": 10 })));
        })
        .capture("moveUp", (actions, find) => {
            actions.executeJS(window => window.document.dispatchEvent(new KeyboardEvent("keydown", { "keyCode": 52 })));
            actions.wait(500);
            actions.executeJS(window => window.document.dispatchEvent(new KeyboardEvent("keyup", { "keyCode": 52 })));
        })
        .capture("moveRight", (actions, find) => {
            actions.executeJS(window => window.document.dispatchEvent(new KeyboardEvent("keydown", { "keyCode": 39 })));
            actions.wait(500);
            actions.executeJS(window => window.document.dispatchEvent(new KeyboardEvent("keyup", { "keyCode": 39 })));
        })
        .capture("moveDown", (actions, find) => {
            actions.executeJS(window => window.document.dispatchEvent(new KeyboardEvent("keydown", { "keyCode": 97 })));
            actions.wait(500);
            actions.executeJS(window => window.document.dispatchEvent(new KeyboardEvent("keyup", { "keyCode": 97 })));
        })
});