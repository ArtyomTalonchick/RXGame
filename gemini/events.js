gemini.suite("events", (suite) => {
    suite.setUrl("/")
        .setCaptureElements("#canvas")
        .capture("objects", (actions, find) => {
            actions.click("#eventObjectsScenario");
            actions.wait(3000);
        })
        .capture("borders", (actions, find) => {
            actions.click("#eventBordersScenario");
            actions.wait(6000);
        })
        .capture("platforms", (actions, find) => {
            actions.click("#eventPlatformsScenario");
            actions.wait(1000);
        })
});