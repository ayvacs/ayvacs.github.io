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

        // Add icon image

        if (dataPoint.icon) {
            title.innerHTML = `
        <img style="position:absolute; margin-top:2px;" src="` + dataPoint.icon + `" height=18.72>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        ` + title.innerHTML;
        };

        // Add star icon

        if (dataPoint.isStarred == true) {
            title.innerHTML = `
        <img style="position:absolute; margin-top:2px;" src="assets/star.png" height=18.72>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        ` + title.innerHTML;
        };

        var headline = dataPoint.headline;
        if (headline) {
            document.getElementsByClassName("entry-metadata")[i].innerHTML += `
            <br>
            <i>` + headline + `</i><br><br>
            `;
        };

        // Add languages

        var langCount = Object.keys(dataPoint.languages).length;
        if (langCount !== 0) {
            var div = document.getElementsByClassName("entry-metadata")[i];
            div.innerHTML += "<b>Languages:</b> ";
            var langN = 0; // Counter variable
            for (var l = 0; l < langCount; l++) {
                langN++;
                var lang = dataPoint.languages[l];
                var div = document.getElementsByClassName("entry-metadata")[i];

                if (langN == langCount) {
                    div.innerHTML += lang;
                } else {
                    div.innerHTML += lang + ", ";
                }
            }
        }

        // Add links

        var linkCount = Object.keys(dataPoint.links).length;
        for (var key in dataPoint.links) {
            var linkName = key;
            var link = dataPoint.links[linkName];

            var a = document.createElement("a");
            a.innerHTML = linkName;
            a.href = link;
            a.target = "_blank"

            rowEntry.append(a);
        };

        // Add metadata

        var div = document.getElementsByClassName("entry-metadata")[i];

        var isOpenSourced = dataPoint.isOpenSource;
        if (isOpenSourced == true) {
            div.innerHTML += `
            <br>
            &nbsp;
            <img style="position:absolute; margin-top:1px;" src="assets/github.png" height=17>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <b>Open-sourced</b>
            `;
        } else if (isOpenSourced == false) {
            div.innerHTML += "<br><b>Closed-sourced</b>";
        };

        var latestUpdate = dataPoint.latestUpdate;
        if (latestUpdate) {
            div.innerHTML += `
            <br>
            &nbsp;
            <img style="position:absolute; margin-top:1px;" src="assets/update.png" height=17>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <b>Latest update: </b>` + latestUpdate + `
            `;
        };
    }
});