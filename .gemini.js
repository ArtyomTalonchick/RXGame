module.exports = {
    rootUrl: "http://localhost:3000/",
    gridUrl: "http://127.0.0.1:4444/wd/hub",

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: "chrome"
            }
        }
    },
    windowSize: "1200x700",
};