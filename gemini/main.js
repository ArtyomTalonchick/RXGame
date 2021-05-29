gemini.suite("main", (suite) => {
    suite.setUrl("/")
        .setCaptureElements("#canvas")
        .capture("physical", (actions, find) => {
            actions.click("#physicalScenario");
            actions.wait(5000);
        })
        .capture("hit", (actions, find) => {
            actions.click("#hitScenario");
            actions.wait(5000);
        })
        .capture("platform", (actions, find) => {
            actions.click("#platformScenario");
            actions.wait(5000);
        })
        .capture("zIndex", (actions, find) => {
            actions.click("#zIndexScenario");
            actions.wait(5000);
        })    
});