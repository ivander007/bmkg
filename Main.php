<?php

  // $lokasi = $_POST['lokasi'];
  // $url    = 'https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-'.$lokasi.'.xml';
  // $xml    = @simplexml_load_file($url);
  // if ($xml) {
  //   $result = json_decode(json_encode((array)$xml), TRUE);
  //   echo json_encode($result);
  // } else {
  //   echo "Error";
  // }

  session_start();
  $method = @$_GET['method'];

  if ($method == "getDataCuaca") {
    $lokasi = $_GET['lokasi'];
    getDataCuaca($lokasi);
  } else if ($method == "getDataSession") {
    getDataSession();
  } else {
    echo "Error";
  }

  function getDataSession()
  {
    if (isset($_SESSION)) {
      $lokasi = $_SESSION["lokasi"];
    } else {
      $lokasi = "Indonesia";
    }
    $sessionData  = array(
      'Lokasi' => $lokasi, 
    );
    echo json_encode($sessionData);
  }
  
  function getDataCuaca($lokasi)
  {
    $url    = 'https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-'.$lokasi.'.xml';
    $xml    = @simplexml_load_file($url);
    if ($xml) {
      // tambah / update data session
      $_SESSION["lokasi"] = $lokasi;

      $result = json_decode(json_encode((array)$xml), TRUE);
      echo json_encode($result);
    } else {
      echo "Error";
    }
  }
  
?>