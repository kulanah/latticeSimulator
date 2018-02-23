module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jquery": true
    },
    "globals": {
        "THREE": true, 
        "Specimen": true
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