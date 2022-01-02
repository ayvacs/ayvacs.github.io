$.get("data/entries.json", function (data) {
  //console.log(data);


  /*
  <div class="row-entry">
    <div class="row">
      <h3 class="column bullet-point">gba.js.org</h3>
      <p class="column text-right">October 2021 - December 2021</p>
    </div>

    <p>A light-weight online emulator for the GameBoy Advance</p>

    <a href="https://gba.js.org">Web link</a>
    <a href="https://github.com/frogweezer/gba.js.org">GitHub source code</a>
  </div>
  */
  var dataLength = data.length;
  var n = 0; // Counter variable
  for (var i = 0; i < dataLength; i++) {
    n++;
    var dataPoint = data[i];

    
    if (dataPoint.starred == "true") {
      var dataPrefix = "⭐ ";
    } else {
      var dataPrefix = "";
    }

    console.log(dataPrefix)

    console.log("Built element " + n + "/" + dataLength);
    $("body").append(`
      <div class="row-entry">
        <div class="row">
          <h3 class="column bullet-point">` + dataPrefix + dataPoint.name + `</h3>
          <p class="column text-right">` + dataPoint.date + `</p>
        </div>

        <div class="entry-languages"></div>
        <p class="entry-description">` + dataPoint.description + `</p>
      </div>
    `);

    var rowEntry = document.getElementsByClassName("row-entry")[i];

    // Add languages
    var langCount = Object.keys(dataPoint.languages).length;
    if (langCount !== 0) {
      var div = document.getElementsByClassName("entry-languages")[i];
      div.innerHTML += "<b>Languages:</b> ";
      var langN = 0; // Counter variable
      for (var l = 0; l < langCount; l++) {
        langN++;
        var lang = dataPoint.languages[l];
        var div = document.getElementsByClassName("entry-languages")[i];

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
  }
});