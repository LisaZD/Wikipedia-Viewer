$('document').ready(function(){
  $("#searchBtn").click(function() {
    //clear #results each time button is clicked
    $('#results').html('');
    
    //store input in search variable
    var search = $('#usersSearch').val();
    
    //retrieve data from wikipedia
    $.ajax({
      url: 'http://en.wikipedia.org/w/api.php',
      data: { action: 'query', list: 'search', srsearch: search, format: 'json', utf8: 1, sroffset: "10" },
      dataType: 'jsonp',
      success: function (x) {
        if (x.query.search.length === 0) {
          $('#results').html('<h2>No search results</h2>');
        } else {
          var searchObjs = x.query.search;
        
          //Build 10 divs
          for (var i = 0; i < x.query.search.length; i++){
            var title = searchObjs[i].title;
            var snippet = searchObjs[i].snippet;
            $('<div/>', {
              id: "resultsDiv" + i,
              class: 'resultDivs'
              }).appendTo('#results');

            //add title, link, and snippet to each div
            $('#resultsDiv' + i).wrap('<a href="http://en.wikipedia.org/wiki/' + title + '" target = "_blank"></a>')
            $('#resultsDiv' + i).html('<h2>' + title + '</h2> <p>' + snippet + '</p>');
            $('#resultsDiv' + i).css("margin-top", "20px");
          };
        }
      }
    });
    //return false so that page doesn't reload when pressing enter in input field
    return false;
  });
});