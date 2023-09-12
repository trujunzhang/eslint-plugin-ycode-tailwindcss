const config = {
    verbose: true,
    // "globals": {
    //     "ts-jest": {
    //         "diagnostics": false
    //     }
    // },
    transform: {
        "^.+\\.ts$": ['ts-jest', { /* ts-jest config goes here in Jest */ }],
    },
    // "testRegex": "(src/.*\\.[test|spec])\\.ts$",
    // testRegex: '(src/.*|(\\.|/)(test|spec))\\.ts?$',
    "testPathIgnorePatterns": [
        "/node_modules/",
        "\\.d\\.ts$",
        "lib/.*"
    ],
    "moduleFileExtensions": [
        "js",
        "ts",
        "json"
    ]
};

module.exports = config;