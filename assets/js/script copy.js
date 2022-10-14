$("#btnSearchMovie").on("click", function() {
  searchMovie();
});

$("#txtSearchMovie").on("keyup", function(e) {
  if (e.keyCode === 13) {
    searchMovie();
  }
});


function searchMovie() {
  $("#searchResult").html("");
  $.ajax({
    url: "http://www.omdbapi.com",
    type: "GET",
    dataType: "JSON",
    data:{
      "apikey": "d522f780",
      "s": $("#txtSearchMovie").val()
    },
    success: function (result) {
      if (result.Response == "True") {
        $("#txtSearchMovie").val("");
        let arrMoviews  = result.Search;

        // <a href="#" class="card-link moreDetails" data-id="`+data.imdbID+`">More details</a>
        // <a href="#" class="card-link moreDetails" data-bs-toggle="modal" data-bs-target="#showModalMovieDetail" data-id="`+data.imdbID+`">More details</a>
        $.each(arrMoviews, function (index, data) {
          $("#searchResult").append(`
            <div class="col-md-4" id="`+data.imdbID+`">
              <div class="card mb-4">
                <img src="`+data.Poster+`" class="card-img-top" alt="`+data.Title+`">
                <div class="card-body">
                  <h5 class="card-title">`+data.Title+`</h5>
                  <h6 class="card-subtitle mb-2 text-muted">`+data.Year+`</h6>
                  <a href="#" class="card-link moreDetails" data-bs-toggle="modal" data-id="`+data.imdbID+`">More details</a>
                </div>
              </div>
            </div>
          `);
        });
      } else {
        $("#searchResult").html(`
          <div class="col-md-8">
          <h1 class="text-center">`+result.Error+`</h1>
          </div>
        `);
      }
    }
  });
}

$("#searchResult").on("click", ".moreDetails", function () {
  $.ajax({
    url: "http://www.omdbapi.com",
    type: "GET",
    dataType: "JSON",
    data:{
      "apikey": "d522f780",
      "i": $(this).data("id"),
      "plot": "short"
    },
    success: function (movie) {
      $("#showModalMovieDetail").modal("show");
      if (movie.Response == "True") {
        let arrRating     = movie.Ratings;
        let contentRating = "";
        let search  = (movie.Title).replace(/ /g,"+");
        let link    = "https://www.google.com/search?q="+search;

        $.each(arrRating, function (index, data) {
          contentRating += `<tr> <th>`+data.Source+`</th> <td>`+data.Value+`</td> </tr>`;
        });

        $("#showModalMovieDetailTitle").html(movie.Title);
        $("#divMovieDetail").html(`
          <div class="row">
            <div class="col-md-4">
              <div class="row mb-3">
                <div class="col-md-12">
                  <img src="`+movie.Poster+`" class="img-fluid rounded" alt="`+movie.Title+`">
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <p class="text-justify">`+movie.Plot+`</p>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              <table class="table table-striped-columns table-sm">
                <tbody>
                  <tr> <th style="width: 30%;">Title</th> <td style="width: 70%;">`+movie.Title+`</td> </tr>
                  <tr> <th>Year</th> <td>`+movie.Year+`</td> </tr>
                  <tr> <th>Rated</th> <td>`+movie.Rated+`</td> </tr>
                  <tr> <th>Released</th> <td>`+movie.Released+`</td> </tr>
                  <tr> <th>Runtime</th> <td>`+movie.Runtime+`</td> </tr>
                  <tr> <th>Genre</th> <td>`+movie.Genre+`</td> </tr>
                  <tr> <th>Director</th> <td>`+movie.Director+`</td> </tr>
                  <tr> <th>Writer</th> <td>`+movie.Writer+`</td> </tr>
                  <tr> <th>Actors</th> <td>`+movie.Actors+`</td> </tr>
                  <tr> <th>Language</th> <td>`+movie.Language+`</td> </tr>
                  <tr> <th>Country</th> <td>`+movie.Country+`</td> </tr>
                  <tr> <th>Awards</th> <td>`+movie.Awards+`</td> </tr>
                  <tr>
                    <th>Ratings</th>
                    <td>
                      <table class="table table-sm mb-0 table-borderless">
                        <tbody>`+contentRating+`</tbody>
                      </table>
                    </td>
                  </tr>
                  <tr> <th>Metascore</th> <td>`+movie.Metascore+`</td> </tr>
                  <tr> <th>Box Office</th> <td>`+movie.BoxOffice+`</td> </tr>
                  <tr> <th>Production</th> <td>`+movie.Production+`</td> </tr>
                  <tr> <th>Website</th> <td>`+movie.Website+`</td> </tr>
                </tbody>
              </table>
            </div>
          </div>
        `);
        $("#btnSearchOnGoogle").attr("href", link);
      } else {
        $("#divMovieDetail").html(`<h2 class="text-center">`+movie.Error+`</h2>`);
      }
    }
  });
})