$.get("data/entries.json", function (data) {
    // Initialize Projects
    var projects = data.projects;
    var dataLength = projects.length;
    var n = 0; // Counter variable
    for (var i = 0; i < dataLength; i++) {
        n++;
        var dataPoint = projects[i];

        console.log("Built element " + n + "/" + dataLength);
        $("#automagic-elements").append(`
<div class="row-entry">
<div class="row">
<h3 class="column bullet-point dataName">` + dataPoint.name + `</h3>
<p class="column text-right">` + dataPoint.date + `</p>
</div>

<div class="entry-metadata"></div>
<p class="entry-description">` + dataPoint.description + `</p>
</div>
`);

        var rowEntry = document.getElementsByClassName("row-entry")[i];
        var title = rowEntry.getElementsByClassName("column bullet-point dataName")[0];
        var dates = rowEntry.getElementsByClassName("column text-right")[0];
        var metadata = document.getElementsByClassName("entry-metadata")[i];
        var useMetaIcons = false;

        // Ok first we gotta indent it

        if (dataPoint.isSub) {
            rowEntry.style.position = "relative"
            rowEntry.style.left = "2.5%"
            rowEntry.style.width = "45%"
        }

        // Add icons

        if (dataPoint.icon) {
            title.innerHTML = `
        <img style="position:absolute; margin-top:2px;" src="` + dataPoint.icon + `" height=18.72>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        ` + title.innerHTML;
        };

        if (dataPoint.isStarred) {
            title.innerHTML = `
        <img style="position:absolute; margin-top:2px;" src="assets/star.png" height=18.72>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        ` + title.innerHTML;
        };

        // Add headline (has to come before languages)

        if (dataPoint.headline) {
            metadata.innerHTML += `
            <i>` + dataPoint.headline + `</i><br><br>
            `;
        };

        // Add languages

        if (dataPoint.languages) {
            var langCount = Object.keys(dataPoint.languages).length;
            if (langCount !== 0) {
                metadata.innerHTML += "<b>Languages:</b> ";
                var langN = 0; // Counter variable
                for (var l = 0; l < langCount; l++) {
                    langN++;
                    var lang = dataPoint.languages[l];

                    if (langN == langCount) {
                        metadata.innerHTML += lang;
                    } else {
                        metadata.innerHTML += lang + ", ";
                    }
                }
            };
        };

        // Add platforms

        if (dataPoint.platforms) {
            if (dataPoint.languages) {metadata.innerHTML += "<br>"}
            var platformCount = Object.keys(dataPoint.platforms).length;
            if (platformCount !== 0) {
                metadata.innerHTML += "<b>Platforms:</b> ";
                var platN = 0; // Counter variable
                for (var p = 0; p < platformCount; p++) {
                    platN++;
                    var plat = dataPoint.platforms[p];

                    if (platN == platformCount) {
                        metadata.innerHTML += plat;
                    } else {
                        metadata.innerHTML += plat + ", ";
                    }
                }
            };
        };

        // Add links

        if (dataPoint.links) {
            for (var key in dataPoint.links) {
                var linkName = key;
                var link = dataPoint.links[linkName];

                var a = document.createElement("a");
                a.innerHTML = linkName;
                a.href = link;
                a.target = "_blank"

                rowEntry.append(a);
            };
        };

        // Generic metadata

        if (useMetaIcons && dataPoint.isOpenSource) {
            metadata.innerHTML += `
            <br>
            &nbsp;
            <img style="position:absolute; margin-top:1px;" src="assets/github.png" height=17>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <b>Open-sourced</b>
            `;
        } else {
            metadata.innerHTML += "<br><b>Closed-sourced</b>";
        };

        if (useMetaIcons && dataPoint.latestUpdate) {
            metadata.innerHTML += `
            <br>
            &nbsp;
            <img style="position:absolute; margin-top:1px;" src="assets/update.png" height=17>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <b>Latest update: </b>` + dataPoint.latestUpdate + `
            `;
        };
    }
});