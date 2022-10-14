<?php
$xml = simplexml_load_file('https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-Banten.xml') or die("Gagal mengakses!");
$result = json_decode(json_encode((array)$xml), TRUE);

// waktu cuaca
$s  = $result['forecast']['issue']['second'];
$i  = $result['forecast']['issue']['minute'];
$H  = $result['forecast']['issue']['hour'];
$Y  = $result['forecast']['issue']['year'];
$m  = $result['forecast']['issue']['month'];
$d  = $result['forecast']['issue']['day'];
$dateTimeReport = $Y."-".$m."-".$d." ".$H.":".$i.":".$s;

// $test = $result['forecast']['area'][0]['parameter'][0];
// $test1 = $result['forecast']['area'][0]['parameter'][1];
// print_r($test);
// print_r("<br>");
// print_r("<br>");
// print_r($test1);

/* // ambil nama kota & kabupaten
var_dump($result['forecast']['area'][0]['name']);
print_r($result['forecast']['area'][0]['name'][0].", ".$result['forecast']['area'][0]['name'][1]);
print_r("<br>");
print_r("<br>");
var_dump($result['forecast']['area'][0]['parameter'][0]["@attributes"]);
print_r("<br>");
var_dump($result['forecast']['area'][0]['parameter'][0]);
print_r("<br>");
var_dump($result['forecast']['area'][0]['parameter'][0]['timerange']);
print_r("<br>");
print_r("<br>");
// ambil data kota/kabupaten pertama
var_dump($result['forecast']['area'][0]);
print_r("<br>");
print_r("<br>"); */
// var_dump($result['source']);

?>


<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Moview</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
</head>

<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">Ramalan Cuaca Provinsi Banten <?= date("Y-m-d")." sampai ".date('Y-m-d', strtotime(date("Y-m-d"). ' + 2 days')); ?></a>
      <button type="button" class="btn btn-success btn-sm float-right">Refresh</button>
    </div>
  </nav>

  <div class="container-fluid">
  <p class="text-muted text-center mt-3 ">Last updated : <?= $dateTimeReport; ?></p>
    <hr>

    <div class="row mb-4">
      <div class="col-md-12">
        <div class="accordion" id="accordionArea">
    
    <?php
      $arrData = $result['forecast']['area'];
      for ($i=0; $i < count($arrData); $i++) {
        $id = $arrData[$i]['@attributes']['id'];
        $lokasi = $arrData[$i]['name'][0].", ".$arrData[$i]['name'][1];
        $koordinat = $arrData[$i]['@attributes']['latitude'].", ".$arrData[$i]['@attributes']['longitude'];
        $link = "https://www.google.com/search?q=".$arrData[$i]['@attributes']['latitude']."%2C+".$arrData[$i]['@attributes']['longitude'];
        // print_r($arrData[$i]['name']);
    ?>
      <!-- <div class="row mb-2 justify-content-center" id="<?= $id; ?>">
        <div class="col-md-12">
          <div class="card border-dark mb-3">
            <div class="card-header"><b><?= $lokasi; ?></b><span style="float:right;"><a href="<?= $link; ?>" target="_BLANK"><?= $koordinat; ?></a></span></div>
            <div class="card-body text-dark">
              <h5 class="card-title">Dark card title</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>
      </div> -->

        <div class="accordion-item">
          <h2 class="accordion-header" id="heading<?= $id; ?>">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse<?= $id; ?>" aria-expanded="false" aria-controls="collapse<?= $id; ?>">
              <b><?= $lokasi; ?></b>
            </button>
          </h2>
          <div id="collapse<?= $id; ?>" class="accordion-collapse collapse" aria-labelledby="heading<?= $id; ?>">
            <div class="accordion-body bg-dark bg-gradient" style="--bs-bg-opacity: .1;">
              <p>Koordinat : <a href="<?= $link; ?>" target="_BLANK"><?= $koordinat; ?></a></p>
              <div class="row">
                <div class="col-md-12">
                  <div class="accordion" id="accordionPanelsStayOpenExample">
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                          data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                          aria-controls="panelsStayOpen-collapseTwo">
                          Accordion Item #2
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse"
                        aria-labelledby="panelsStayOpen-headingTwo">
                        <div class="accordion-body">
                          <strong>This is the second item's accordion body.</strong> It is hidden by default, until the
                          collapse plugin adds the appropriate classes that we use to style each element. These classes
                          control the overall appearance, as well as the showing and hiding via CSS transitions. You can
                          modify any of this with custom CSS or overriding our default variables. It's also worth noting
                          that just about any HTML can go within the <code>.accordion-body</code>, though the transition
                          does limit overflow.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    <?php
      }
    ?>
        </div>
      </div>
    </div>
    
  </div>

  <!-- <script src="js/script.js"></script> -->

  <script src="https://code.jquery.com/jquery-3.6.1.min.js"
    integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
    integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous">
  </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.min.js"
    integrity="sha384-IDwe1+LCz02ROU9k972gdyvl+AESN10+x7tBKgc9I5HFtuNz0wWnPclzo6p9vxnk" crossorigin="anonymous">
  </script>
</body>

</html>