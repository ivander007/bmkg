<?php

  $lokasi = $_POST['lokasi'];
  $url    = 'https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-'.$lokasi.'.xml';
  $xml    = @simplexml_load_file($url);
  if ($xml) {
    $result = json_decode(json_encode((array)$xml), TRUE);
    echo json_encode($result);
  } else {
    echo "Error";
  }
  
?>