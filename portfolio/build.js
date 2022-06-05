// Functions
function users(i) {
    // Replaces i with the current Umbra user count.
    return i.replace("{bUsers}", "30,000")
        .replace("{bDkUsers}", "4,500");
};


$.get("entries.json", function(data) {
    // Initialize Projects
    var projects = data.projects;
    var dataLength = projects.length;

    var n = 0; // Counter variable
    var m = -1; // Metadata Counter variable
    for (var i = 0; i < dataLength; i++) {
        n++;
        m++;
        var dataPoint = projects[i];

        console.log("Built element " + n + "/" + dataLength);

        var name = dataPoint.name;
        var desc = dataPoint.description;

        if (dataPoint.date) {
            var date = dataPoint.date;
        } else {
            var date = "";
        };

        // Add nameDetails
        if (dataPoint.nameDetails) {
            name += "&nbsp;<span style=\"font-weight:normal;font-style:italic;font-size:0.8em\">" + dataPoint.nameDetails + "</span>"
        };

        $("#proj").append(`
            <div class="row-entry">
                <div class="row">
                <h3 class="column bullet-point dataName">` + name + `</h3>
                <p class="column text-right" style="position:relative;top:5px;">` + date + `</p>
            </div>

            <div class="entry-metadata"></div>
                <p class="entry-description">` + users(desc) + `</p>
            </div>
        `);

        var rowEntry = document.getElementsByClassName("row-entry")[i];
        var title = rowEntry.getElementsByClassName("column bullet-point dataName")[0];
        var metadata = document.getElementsByClassName("entry-metadata")[m];

        // Indent
        if (dataPoint.isIndented) {
            rowEntry.style.position = "relative";
            rowEntry.style.left = "25px";
            rowEntry.style.width = "calc(50% - 50px)";
        };

        // Add stars
        if (dataPoint.isStarred) {
            title.innerHTML = `
        <img style="position:relative;top:1.5px;right:2px;" src="/assets/star.png" height=18.72>
        &nbsp;
        ` + title.innerHTML;
        };

        // Add position
        if (dataPoint.position) {
            metadata.innerHTML += `<b>Position:</b> ${dataPoint.position}<br>`;
        };

        // Add skills
        if (dataPoint.skills) {
            var skillCount = Object.keys(dataPoint.skills).length;
            if (skillCount !== 0) {
                metadata.innerHTML += "<b>Skills:</b> ";
                var skilN = 0; // Counter variable
                for (var s = 0; s < skillCount; s++) {
                    skilN++;
                    var skil = dataPoint.skills[s];

                    if (skilN == skillCount) {
                        metadata.innerHTML += skil;
                    } else {
                        metadata.innerHTML += skil + ", ";
                    };
                };
            };
        };

        // Add languages
        if (dataPoint.languages) {
            if (dataPoint.skills) { metadata.innerHTML += "<br>"; };

            var langCount = Object.keys(dataPoint.languages).length;
            if (langCount !== 0) {
                if (langCount == 1) {
                    metadata.innerHTML += "<b>Language:</b> ";
                } else {
                    metadata.innerHTML += "<b>Languages:</b> ";
                };
                
                var langN = 0; // Counter variable
                for (var l = 0; l < langCount; l++) {
                    langN++;
                    var lang = dataPoint.languages[l];

                    if (langN == langCount) {
                        metadata.innerHTML += lang;
                    } else {
                        metadata.innerHTML += lang + ", ";
                    };
                };
            };
        };

        // Add platforms
        if (dataPoint.platforms) {
            if (dataPoint.skills || dataPoint.languages) { metadata.innerHTML += "<br>"; };
            
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
                    };
                };
            };
        };

        // Add links
        if (dataPoint.links) {
            rowEntry.append(document.createElement("br"));

            for (var key in dataPoint.links) {
                var linkName = key;
                var link = dataPoint.links[linkName];

                var a = document.createElement("a");
                a.innerHTML = users(linkName);
                a.href = link;
                a.target = "_blank";

                rowEntry.append(a);
            };
        };

        // Generic metadata
        if (dataPoint.isOpenSource) {
            metadata.innerHTML += `
            <br><b>Open source</b>
            `;
        } else if (dataPoint.isOpenSource == false) {
            metadata.innerHTML += "<br><b>Closed source</b>";
        };

        // remove metadata div if it wasn't used
        if (metadata.childNodes.length == 0) {
            metadata.remove();
            metadata = null;
            m -= 1;
        };
    };
});