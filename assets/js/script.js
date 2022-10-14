
$(function(){
  getDataCuaca();
});

function getDataCuaca() {
  var provinsi  = "Banten";
  $("#divWeatherResult").html("");
  $("#loadingModal").modal("show");
  $.ajax({
    url: "Main.php",
    type: "POST",
    data:{
      lokasi: provinsi
    },
    success: function (result) {
      setTimeout(() => {
        $("#loadingModal").modal("hide");

        if (result == "Error") {
          $("#divWeatherResult").html(`<h1 class="text-center">Data Tidak Ditemukan</h1>`);
        } else {
          var arrData = JSON.parse(result);
          var arrTime = arrData.forecast.issue;
          var year    = arrTime.year;
          var month   = arrTime.month;
          var day     = arrTime.day;
          var hour    = arrTime.hour;
          var minute  = arrTime.minute;
          var second  = arrTime.second;
          var date    = year+"-"+month+"-"+day;
          var time    = hour+":"+minute+":"+second;
          var timeStamp = date+" "+time;
  
          var now     = moment(timeStamp).format("dddd, D MMMM YYYY");
          var twoDays = moment(timeStamp).add(2, 'd').format("dddd, D MMMM YYYY");
  
          $("#divWeatherResult").html(`
            <div class="text-center">
              <h5>Provinsi `+provinsi+` `+now+` - `+twoDays+`</h5>
              <p class="text-muted">Data terakhir : `+timeStamp+`</p><hr>
            </div>
            <div class="accordion" id="accordionArea"></div>
          `);
  
          var arrArea = arrData.forecast.area;

          // perulangan data semua kota / kabupaten
          for (let index = 0; index < arrArea.length; index++) {
            var arrDetail     = arrArea[index];
            var arrDetailAttr = arrArea[index]['@attributes'];
  
            var id        = arrDetailAttr['id'];
            var lokasi    = arrDetail['name'][0]+", "+arrDetail['name'][1];
            var koordinat = arrDetailAttr['latitude']+", "+arrDetailAttr['longitude'];
            var link      = "https://www.google.com/search?q="+arrDetailAttr['latitude']+"%2C+"+arrDetailAttr['longitude'];

            var arrDetailParam    = arrArea[index]['parameter'];
            var arrWeather        = arrDetailParam[6]['timerange'];
            var arrTemperature    = arrDetailParam[5]['timerange'];
            var arrHumidity       = arrDetailParam[0]['timerange'];
            var arrTempMax        = arrDetailParam[2]['timerange'];
            var arrTempMin        = arrDetailParam[4]['timerange'];
            var arrHumdMax        = arrDetailParam[1]['timerange'];
            var arrHumdMin        = arrDetailParam[3]['timerange'];
            var arrWindSpeed      = arrDetailParam[8]['timerange'];
            var arrWindDirection  = arrDetailParam[7]['timerange'];

            var detailWeather   = "";

            // perulangan detail cuaca dalam 3 hari
            for (let index2 = 0; index2 < 3; index2++) {
              var contentWeather      = "";
              var dateWeather       = moment(timeStamp).add(index2, 'd').format("YYYY-MM-DD");
              var timeWeather       = moment().add(index2, 'd').format("HH:mm");
              var dateTimeWeather   = dateWeather+" "+timeWeather;
              var dateTimeWeather1  = moment(timeStamp).add(index2, 'd').format("dddd, D MMMM YYYY");
              var start             = new Date(dateTimeWeather);

              // ambil info cuaca saat ini yang mendekati ramalan antara jam 0, 6, 12, 18
              var arrIntrWeatPositive = [];
              var arrIntrWeatNegative = [];

              for (let index3 = 0; index3 < arrWeather.length; index3++) {
                var endDateWeather  = new Date(convertTime(arrWeather[index3]['@attributes']['datetime'], "TIMESTAMP"));
                var hoursIntrWeat   = Math.floor((endDateWeather - (start)) / 1000 / 60 / 60);

                var arrW  = [hoursIntrWeat, arrWeather[index3]['value']];
                if (hoursIntrWeat >= 0) {
                  arrIntrWeatPositive.push(arrW);
                } else {
                  arrIntrWeatNegative.push(arrW);
                }
              }

              // proses mencari data terdekat dari waktu saat ini dengan data yang tersedia
              var wP = arrIntrWeatPositive[0][0];
              var wN = arrIntrWeatNegative[(arrIntrWeatNegative.length)-1][0];

              if ((0-wN) > (wP-0)) {
                var w = arrIntrWeatPositive[0][1];
              } else if ((0-wN) < (wP-0)) {
                var w = arrIntrWeatNegative[(arrIntrWeatNegative.length)-1][1];
              } else {
                var w = arrIntrWeatPositive[0][1];
              }

              // mencari klasifikasi day / night berdasar parameter jam 12 malam tanggal berikutnya
              var a = new Date(dateTimeWeather);
              var b = new Date(new Date(dateTimeWeather).setHours(24,0,0,0));
              var c = Math.floor((b - (a)) / 1000 / 60 / 60);

              // jam 06:00 - 17:59 termasuk DAY
              if (c >= 7 && c <= 18) {
                var type  = "DAY";
              } else {
                var type  = "NIGHT";
              }

              // ambil data icon dan nama cuaca
              var arrIcon1   = getWeatherIcon(type, w);
              var icon1      = arrIcon1[0];
              var iconName1  = arrIcon1[1];

              // ambil suhu saat ini yang mendekati ramalan antara jam 0, 6, 12, 18
              var arrIntrTempPositive = [];
              var arrIntrTempNegative = [];

              for (let index4 = 0; index4 < arrTemperature.length; index4++) {
                var endDateTemperature  = new Date(convertTime(arrTemperature[index4]['@attributes']['datetime'], "TIMESTAMP"));
                var hoursIntrTemp       = Math.floor((endDateTemperature - (start)) / 1000 / 60 / 60);

                var arrT  = [hoursIntrTemp, arrTemperature[index4]['value']];
                if (hoursIntrTemp >= 0) {
                  arrIntrTempPositive.push(arrT);
                } else {
                  arrIntrTempNegative.push(arrT);
                }
              }

              // proses mencari data terdekat dari waktu saat ini dengan data yang tersedia
              var tP = arrIntrTempPositive[0][0];
              var tN = arrIntrTempNegative[(arrIntrTempNegative.length)-1][0];

              if ((0-tN) > (tP-0)) {
                var t = arrIntrTempPositive[0][1][0]+"&#8451; / "+arrIntrTempPositive[0][1][1]+"&#8457; ";
              } else if ((0-tN) < (tP-0)) {
                var t = arrIntrTempNegative[(arrIntrTempNegative.length)-1][1][0]+"&#8451; /"+arrIntrTempNegative[(arrIntrTempNegative.length)-1][1][1]+"&#8457";
              } else {
                var t = arrIntrTempPositive[0][1][0]+"&#8451; / "+arrIntrTempPositive[0][1][1]+"&#8457; ";
              }

              // ambil kelembapan saat ini yang mendekati ramalan antara jam 0, 6, 12, 18
              var arrIntrHumdPositive = [];
              var arrIntrHumdNegative = [];

              for (let index5 = 0; index5 < arrHumidity.length; index5++) {
                var endDateHumidity  = new Date(convertTime(arrHumidity[index5]['@attributes']['datetime'], "TIMESTAMP"));
                var hoursIntrHumd    = Math.floor((endDateHumidity - (start)) / 1000 / 60 / 60);

                var arrW  = [hoursIntrHumd, arrHumidity[index5]['value']];
                if (hoursIntrHumd >= 0) {
                  arrIntrHumdPositive.push(arrW);
                } else {
                  arrIntrHumdNegative.push(arrW);
                }
              }

              // proses mencari data terdekat dari waktu saat ini dengan data yang tersedia
              var hP = arrIntrHumdPositive[0][0];
              var hN = arrIntrHumdNegative[(arrIntrHumdNegative.length)-1][0];

              if ((0-hN) > (hP-0)) {
                var h = arrIntrHumdPositive[0][1]+" %";
              } else if ((0-hN) < (hP-0)) {
                var h = arrIntrHumdNegative[(arrIntrHumdNegative.length)-1][1]+" %";
              } else {
                var h = arrIntrHumdPositive[0][1]+" %";
              }

              // ambil suhu minimum dan maksimum hari ini
              var tempCMin  = arrTempMin[index2]['value'][0];
              var tempCMax  = arrTempMax[index2]['value'][0];
              var tempFMin  = arrTempMin[index2]['value'][1];
              var tempFMax  = arrTempMax[index2]['value'][1];
              var rangeTemp = tempCMin+"&#8451; &#8212; "+tempCMax+"&#8451; / "+tempFMin+"&#8457; &#8212; "+tempFMax+"&#8457;";

              // ambil kelembapan minimum dan maksimum hari ini
              var humdMin   = arrHumdMin[index2]['value'];
              var humdMax   = arrHumdMax[index2]['value'];
              var rangeHumd = humdMin+" % &#8212; "+humdMax+" %";

              for (let index6 = 0; index6 < arrWeather.length; index6++) {
                if ((convertTime(arrWeather[index6]['@attributes']['datetime'], "DATE")) == dateWeather) {
                  var arrTimeNight  = ['00:00', '18:00'];
                  if (arrTimeNight.includes(convertTime(arrWeather[index6]['@attributes']['datetime'], "TIME"))) {
                    var arrIcon   = getWeatherIcon("NIGHT", arrWeather[index6]['value']);
                  } else {
                    var arrIcon   = getWeatherIcon("DAY", arrWeather[index6]['value']);
                  }
                  var icon      = arrIcon[0];
                  var iconName  = arrIcon[1];

                  boolWeat  = true;
                } else {
                  boolWeat  = false;
                }

                if ((convertTime(arrTemperature[index6]['@attributes']['datetime'], "DATE")) == dateWeather) {
                  var tempInfo  = `
                    <span><i class="fas fa-thermometer-half"></i> `+arrTemperature[index6]['value'][0]+`&#8451; / `+arrTemperature[index6]['value'][1]+`&#8457;</span>
                  `;
                  boolTemp  = true;
                } else {
                  boolTemp  = false;
                }

                if ((convertTime(arrHumidity[index6]['@attributes']['datetime'], "DATE")) == dateWeather) {
                  var humdInfo  = `
                    <span><i class="fas fa-water"></i> `+arrHumidity[index6]['value']+` %</span>
                  `;
                  boolHumd  = true;
                } else {
                  boolHumd  = false;
                }

                if ((convertTime(arrWindSpeed[index6]['@attributes']['datetime'], "DATE")) == dateWeather) {
                  // var kt  = parseFloat(arrWindSpeed[index6]['value'][0]).toFixed(2);
                  // var mph = parseFloat(arrWindSpeed[index6]['value'][1]).toFixed(2);
                  // var kph = parseFloat(arrWindSpeed[index6]['value'][2]).toFixed(2);
                  // var ms  = parseFloat(arrWindSpeed[index6]['value'][3]).toFixed(2);
                  // var windSpeedInfo = kt+' Kt / '+mph+' MPH / '+kph+' KPH / '+ms+' MS';

                  var kph = parseFloat(arrWindSpeed[index6]['value'][2]).toFixed(0);
                  var windSpeedInfo = kph+" km/jam";
                  boolWindSpeed  = true;
                } else {
                  boolWindSpeed  = false;
                }

                if ((convertTime(arrWindDirection[index6]['@attributes']['datetime'], "DATE")) == dateWeather) {
                  var direction = getWindDirection(arrWindDirection[index6]['value'][1]);
                  var windDirectionInfo = arrWindDirection[index6]['value'][0]+"&#176; "+direction;
                  boolWindDirection  = true;
                } else {
                  boolWindDirection  = false;
                }

                if (boolWeat && boolTemp && boolHumd && boolWindSpeed && boolWindDirection) {
                  contentWeather +=
                  `
                  <div class="col-md-3 mt-3">
                    <div class="card text-center">
                      <div class="card-header">
                        <h5 class="text-dark mb-0">`+convertTime(arrWeather[index6]['@attributes']['datetime'], "TIME")+`</h5>
                      </div>
                      <div class="card-body p-2">
                        <i class="`+icon+` fa-2x"></i><br>
                        <h5 class="text-dark mb-0">`+iconName+`</h5>
                        <p class="mb-0">`+tempInfo+` | `+humdInfo+`</p>
                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item pt-2 pb-2 ps-0 pe-0">
                          <span class="text-muted text-small"><i class="fas fa-wind"></i> Kecepatan Angin</span><br>
                          <p class="mb-0">`+windSpeedInfo+`</p>
                        </li>
                        <li class="list-group-item pt-2 pb-2 ps-0 pe-0">
                          <span class="text-muted text-small"><i class="fas fa-location-arrow"></i> Arah Angin</span><br>
                          <p class="mb-0">`+windDirectionInfo+`</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  `;
                }
              }

              detailWeather +=
              `
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingDetail`+index2+`-`+id+`">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#detailCollapse`+index2+`-`+id+`" aria-expanded="false"
                      aria-controls="detailCollapse`+index2+`-`+id+`">
                      `+dateTimeWeather1+`
                    </button>
                  </h2>
                  <div id="detailCollapse`+index2+`-`+id+`" class="accordion-collapse collapse"
                    aria-labelledby="headingDetail`+index2+`-`+id+`">
                    <div class="accordion-body pt-0 pb-3 ps-1 pe-1 bg-off-white">
                      <div class="container-fluid">
                        <div class="row">
                          <div class="col-md-3 mt-3">
                            <div class="card border-dark text-center">
                              <div class="card-body pt-2 pb-2 ps-0 pe-0">
                                <i class="`+icon1+` fa-2x"> <span class="text-dark">`+iconName1+`</span></i><br>
                                <p class="mb-0"><i class="fas fa-thermometer-half"></i> `+t+` | <i class="fas fa-water"> `+h+`</i></p>
                              </div>
                              <ul class="list-group list-group-flush">
                                <li class="list-group-item pt-2 pb-2 ps-0 pe-0">
                                  <span class="text-muted text-small"><i class="fas fa-thermometer-half"></i> Suhu</span><br>`+rangeTemp+`
                                </li>
                                <li class="list-group-item pt-2 pb-2 ps-0 pe-0">
                                  <span class="text-muted text-small"><i class="fas fa-water"></i> Kelembapan</span><br>`+rangeHumd+`
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div class="col-md-9 mt-3">
                            <div class="card border-dark">
                              <div class="card-body pt-0">
                                <div class="container-fluid p-0">
                                  <div class="row">
                                    `+contentWeather+`
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }
            
            $("#accordionArea").append(`
              <div class="accordion-item">
                <h2 class="accordion-header" id="heading`+id+`">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse`+id+`" aria-expanded="false" aria-controls="collapse`+id+`">
                    <b>`+lokasi+`</b>
                  </button>
                </h2>
                <div id="collapse`+id+`" class="accordion-collapse collapse" aria-labelledby="heading`+id+`">
                  <div class="accordion-body bg-dark bg-gradient" style="--bs-bg-opacity: .1;">
                    <p>Koordinat : <a href="`+link+`" target="_BLANK">`+koordinat+`</a></p>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="accordion" id="detailWeather`+id+`">
                          `+detailWeather+`
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `);
          }
        }
      }, 500);
    }
  });
}

function changeNavLinkDetail(param, idNavLink) {
  $(".navLinkDetail"+idNavLink).removeClass("active");
  $("#navLinkDetail"+""+param+""+idNavLink).addClass("active");
}

function getWeatherIcon(type, number) {
  if (type == "DAY") {
    var arrWeatherIconDay = {
      "0": ["fas fa-sun color-yellow", "Cerah"],
      "1": ["fas fa-cloud-sun color-brass", "Cerah Berawan"],
      "2": ["fas fa-cloud-sun color-brass", "Cerah Berawan"],
      "3": ["fas fa-cloud color-smoke", "Berawan"],
      "4": ["fas fa-cloud color-charcoal", "Berawan Tebal"],
      "5": ["fas fa-smog color-gray", "Udara Kabur"],
      "10": ["fas fa-smog color-smoke", "Asap"],
      "45": ["fas fa-wind color-gray", "Kabut"],
      "60": ["fas fa-tint color-blue", "Hujan Ringan"],
      "61": ["fas fa-cloud-rain color-blue", "Hujan Sedang"],
      "63": ["fas fa-cloud-showers-heavy color-charcoal", "Hujan Lebat"],
      "80": ["fas fa-cloud-rain color-denim", "Hujan Lokal"],
      "95": ["fas fa-bolt color-yellow", "Hujan Petir"],
      "97": ["fas fa-bolt color-yellow", "Hujan Petir"],
    }
    
    if (number in arrWeatherIconDay) {
      result  = arrWeatherIconDay[number];
    } else {
      result  = ["fas fa-times", "-"];
    }
  } else if (type == "NIGHT") {
    var arrWeatherIconNight = {
      "0": ["fas fa-moon color-charcoal", "Cerah"],
      "1": ["fas fa-cloud-moon color-denim", "Cerah Berawan"],
      "2": ["fas fa-cloud-moon color-denim", "Cerah Berawan"],
      "3": ["fas fa-cloud color-smoke", "Berawan"],
      "4": ["fas fa-cloud color-charcoal", "Berawan Tebal"],
      "5": ["fas fa-smog color-gray", "Udara Kabur"],
      "10": ["fas fa-smog color-smoke", "Asap"],
      "45": ["fas fa-wind color-gray", "Kabut"],
      "60": ["fas fa-tint color-blue", "Hujan Ringan"],
      "61": ["fas fa-cloud-rain color-blue", "Hujan Sedang"],
      "63": ["fas fa-cloud-showers-heavy color-charcoal", "Hujan Lebat"],
      "80": ["fas fa-cloud-rain color-denim", "Hujan Lokal"],
      "95": ["fas fa-bolt color-yellow", "Hujan Petir"],
      "97": ["fas fa-bolt color-yellow", "Hujan Petir"],
    }

    if (number in arrWeatherIconNight) {
      result  = arrWeatherIconNight[number];
    } else {
      result  = ["fas fa-times", "-"];
    }
  }
  return result;
}

function getWindDirection(code) {
  var arrWindDirectionInfo  = {
    "N": "Utara",
    "NNE": "Utara Timur Laut",
    "NE": "Timur Laut",
    "ENE": "Timur Timur Laut",
    "E": "Timur",
    "ESE": "Timur Tenggara",
    "SE": "Tenggara",
    "SSE": "Tenggara Selatan",
    "S": "Selatan",
    "SSW": "Selatan Barat Daya",
    "SW": "Barat Daya",
    "WSW": "Barat Barat Daya",
    "W": "Barat",
    "WNW": "Barat Barat Laut",
    "NW": "Barat Laut",
    "NNW": "Utara Barat Laut"
  }

  if (code in arrWindDirectionInfo) {
    return arrWindDirectionInfo[code];
  } else {
    return "-";
  }
}

function convertTime(param, type) {
  year    = param.substring(0,4);
  month   = param.substring(4,6);
  day     = param.substring(6,8);
  hour    = param.substring(8,10);
  minute  = param.substring(10,12);

  if (type == "TIMESTAMP") {
    result  = year+"-"+month+"-"+day+" "+hour+":"+minute;
  } else if (type == "DATE") {
    result  = year+"-"+month+"-"+day;
  } else if (type == "TIME") {
    result  = hour+":"+minute;
  }

  return result;
}