// This is a configuration file for the 11ty command-line tool.


module.exports = function (eleventyConfig) {
    eleventyConfig.addFilter("readableDate", (dateString) => {
        const date = new Date(dateString);

        let month = date.getMonth().toString();
        if (month.length == 1)
            month = "0" + month;

        let day = date.getDate().toString();
        if (day.length == 1)
            day = "0" + day;

        return `${date.getFullYear()}-${month}-${day}`;
    });

    return {
        "dir": {
            "includes": "../includes",
            "input": "docs",
            "output": "dist"
        }
    }
}