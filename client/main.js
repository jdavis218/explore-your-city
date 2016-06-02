$(document).ready(function(){


  $('#searchArea').submit(function(e) {

    var searchTerm = $(".searchTerm").val();
    var city = $(".city").val();

    var url = 'https://api.foursquare.com/v2/venues/search?near=' + city + '&query=' + searchTerm + '&oauth_token=WXVYDC13EWN0SCLIAVL4SFWAN1GHA1YSHZNZTI3H0WYAB1XJ&v=20160531'

    $.ajax({
      method: 'GET',
      url: url,
      success: function(data, textStatus, xhr) {
        var unsortedArr = data.response.venues;
        var arr = unsortedArr.sort(function(a, b) {
          return b.stats.checkinsCount - a.stats.checkinsCount;
        });
        console.log(arr);
        $('#places').empty();
        buildDivs(arr);
      },
      error: function(err) {
        console.log(err);
      }
    });
    e.preventDefault();
  });

  function buildDivs(array) {

    $.each(array, function(index, item) {
      var url;
      if (array[index].url) {
        url = "<a href='" + array[index].url + "'>" + array[index].url + "</a>"
      } else {
        url = '';
      }

      $('<ul>').html(
        "<li>Place: " + array[index].name + "</li><p>Address: " + array[index].location.address + "</p><p>Check-In Count: " + array[index].stats.checkinsCount + "</p>" + url + "<br><form action='/favorites' method='POST'><input type='hidden' name='place' value='" + array[index].name + "'><button type='submit'>Save To Favorites</button></form>"
      ).appendTo('#places');

    });
  }

  // $('button').click(function(e) {
  //   e.preventDefault();
  //   return false;
  // });

});
