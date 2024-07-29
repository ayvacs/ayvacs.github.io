// This is a configuration file for the 11ty command-line tool.


module.exports = function(eleventyConfig) {
    return {
        "dir": {
            "includes": "../includes",
            "input": "docs",
            "output": "dist"
        }
    }
}