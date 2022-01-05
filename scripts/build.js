$.get("data/entries.json", function (data) {
  // Initialize Projects
  var projects = data.projects;
  var dataLength = projects.length;
  var n = 0; // Counter variable
  for (var i = 0; i < dataLength; i++) {
    n++;
    var dataPoint = projects[i];

    
    if (dataPoint.starred == "true") {
      var dataPrefix = "⭐&nbsp;&nbsp;";
    } else {
      var dataPrefix = "";
    }

    console.log("Built element " + n + "/" + dataLength);
    $("#automagic-elements").append(`
      <div class="row-entry">
        <div class="row">
          <h3 class="column bullet-point">` + dataPrefix + dataPoint.name + `</h3>
          <p class="column text-right">` + dataPoint.date + `</p>
        </div>

        <div class="entry-metadata"></div>
        <p class="entry-description">` + dataPoint.description + `</p>
      </div>
    `);

    var rowEntry = document.getElementsByClassName("row-entry")[i];

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

      rowEntry.append(a);
    }
    var isOpenSourced = dataPoint.isOpenSource;
    if (isOpenSourced == "true") {
      var div = document.getElementsByClassName("entry-metadata")[i];
      div.innerHTML += "<br><b>Open-Sourced</b>"
    }
  }
});