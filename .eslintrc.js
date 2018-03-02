module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jquery": true
    },
    "globals": {
        "THREE": true, 
        "Specimen": true, 
        "render": true,
        "scene": true,
        "specimen": true,
        "newSpecimen": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};