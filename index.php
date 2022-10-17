<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>BMKG</title>
  <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"> -->
  <link rel="stylesheet" type="text/css" href="assets/plugins/bootstrap/css/bootstrap.min.css">
	<!-- <link rel="stylesheet" type="text/css" href="assets/plugins/adminlte3/css/adminlte.min.css"> -->
	<link rel="stylesheet" type="text/css" href="assets/css/custom.css">
	<link rel="stylesheet" type="text/css" href="assets/plugins/fontawesome/css/all.min.css">
  <link rel="stylesheet" type="text/css" href="assets/plugins/fontawesome/css/brands.min.css">
  <link rel="stylesheet" type="text/css" href="assets/plugins/fontawesome/css/regular.min.css">
  <link rel="stylesheet" type="text/css" href="assets/plugins/fontawesome/css/solid.min.css">
</head>

<body class="d-flex flex-column min-vh-100">
  <div class="wrapper">
    <header class="container-fluid blog-header lh-1 py-3 bg-dark text-light">
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div class="container-fluid">
          <div class="col-6 text-left mt-2 mb-2">
            <h5 class="blog-header-logo mb-0"><i class="fas fa-umbrella"></i> Badan Meramal Keadaan Geluduk</h5>
          </div>
          <!-- <div class="col-6 d-flex justify-content-end align-items-center"></div> -->
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse flex-row-reverse collapse" id="navbarCollapse">
            <form class="d-flex" role="search">
              <div class="input-group input-group-sm">
                <select class="form-select" id="cmbPilihLokasi" aria-label="Pilih Provinsi">
                  <option selected value="Indonesia">Kota-kota Besar di Indonesia</option>
                  <option disabled>Pilih Provinsi</option>
                </select>
                <button class="btn btn-outline-light" type="button" onclick="getDataCuaca()"><i class="fas fa-search"></i> Cari</button>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </header>

    <main class="flex-shrink-0 container-fluid ">
      <div class="row mt-2 mb-4 pt-5">
        <div class="col-lg-12" id="divWeatherResult"></div>
      </div>
    </main>
  </div>


  <div class="modal fade" id="loadingModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="loadingModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content p-3 text-center">
        <div class="text-center">
          <div class="spinner-border" role="status"></div>
        </div>
        <span>Sedang memuat....</span>
      </div>
    </div>
  </div>

  <!-- <script src="https://code.jquery.com/jquery-3.6.1.min.js"
    integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script> -->
  <script src="assets/plugins/jquery/jquery-3.6.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
    integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous">
  </script>
  <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.min.js"
    integrity="sha384-IDwe1+LCz02ROU9k972gdyvl+AESN10+x7tBKgc9I5HFtuNz0wWnPclzo6p9vxnk" crossorigin="anonymous">
  </script> -->
  <script src="assets/plugins/bootstrap/js/bootstrap.min.js"></script>
  <!-- <script src="assets/plugins/adminlte3/js/adminlte.min.js"></script> -->
  <!-- Moment -->
  <script src="assets/plugins/moment/moment.min.js"></script>
  <script src="assets/plugins/moment/locale/id.js"></script>
  
  <script src="assets/js/script.js" type="text/javascript"></script>
</body>

</html>