// This is a configuration file for the 11ty command-line tool.


module.exports = function (eleventyConfig) {
    eleventyConfig.addFilter("readableDate", (dateString) => {
        var d = new Date(dateString),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    });

    eleventyConfig.addFilter("sentenceDate", (dateString) => {
        return new Date(dateString).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    });

    return {
        "dir": {
            "includes": "../includes",
            "input": "docs",
            "output": "dist"
        }
    }
}