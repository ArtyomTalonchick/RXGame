gemini.suite("sprites", (suite) => {
    suite.setUrl("/")
        .setCaptureElements("#canvas")
        .capture("1", (actions, find) => {
            actions.click("#spritesScenario");
        })
        .capture("2", (actions, find) => {
            actions.click("#nextSprite");
        })
        .capture("3", (actions, find) => {
            actions.click("#nextSprite");
        })
        .capture("4", (actions, find) => {
            actions.click("#nextSprite");
        })
        .capture("5", (actions, find) => {
            actions.click("#nextSprite");
        })
        .capture("6", (actions, find) => {
            actions.click("#nextSprite");
        })
        .capture("7", (actions, find) => {
            actions.click("#nextSprite");
        })
        .capture("8", (actions, find) => {
            actions.click("#nextSprite");
        })
        .capture("9", (actions, find) => {
            actions.click("#nextSprite");
        })
        .capture("10", (actions, find) => {
            actions.click("#nextSprite");
        })
        .capture("11", (actions, find) => {
            actions.click("#nextSprite");
        })
        .capture("12", (actions, find) => {
            actions.click("#nextSprite");
        })
});