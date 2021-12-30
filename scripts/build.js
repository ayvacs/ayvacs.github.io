$.getJSON("data/entries.json", function (data) {
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
  var dataLength = data.length
  for (var i = 0; i < dataLength; i++) {
    var dataPoint = data[i];
    console.log(dataPoint);

    $("body").append(`
      <div class="row-entry">
        <div class="row">
          <h3 class="column bullet-point">` + dataPoint.name + `</h3>
          <p class="column text-right">` + dataPoint.date + `</p>
        </div>

        <p>` + dataPoint.description + `</p>
      </div>
    `);
  }
});
