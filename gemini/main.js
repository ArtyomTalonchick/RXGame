gemini.suite("main", (suite) => {
    suite.setUrl("/")
        .setCaptureElements("#canvas")
        .capture("physical", (actions, find) => {
            actions.click("#physicalTest");
            actions.wait(5000);
        })
        .capture("hit", (actions, find) => {
            actions.click("#hitTest");
            actions.wait(5000);
        })
        .capture("platform", (actions, find) => {
            actions.click("#platformTest");
            actions.wait(5000);
        })
        .capture("zIndex", (actions, find) => {
            actions.click("#zIndexTest");
            actions.wait(5000);
        })    
});