gemini.suite("events", (suite) => {
    suite.setUrl("/")
        .setCaptureElements("#canvas")
        .capture("objects", (actions, find) => {
            actions.click("#eventObjectsTest");
            actions.wait(3000);
        })
        .capture("borders", (actions, find) => {
            actions.click("#eventBordersTest");
            actions.wait(6000);
        })
        .capture("platforms", (actions, find) => {
            actions.click("#eventPlatformsTest");
            actions.wait(1000);
        })
});