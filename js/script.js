
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetValue = $('#street').val();
    var cityValue = $('#city').val();
    var address = streetValue+', '+cityValue;
    var streetViewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    
    $greeting.text("So, you want to live in " + address + '?');
    $body.append('<img class="bgimg" src="'+streetViewUrl+'">');
    //load New York Times' Articles 
    var nyApiKey = "3efc62d1c3f59f3f56ba7f84549ab6c1:4:73883147";
    var NYTapiurl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+cityValue+'&sort=newest&api-key='+nyApiKey;
    $.getJSON(NYTapiurl, function (data){
        var articles = data.response.docs;
        var article;
        $nytHeaderElem.text('New York Times Articles About '+cityValue);
        
        for(var i = 0;i<articles.length; i++){
            article = articles[i];
            $nytElem.append('<li class="article">'+'<a href="'+article.web_url+'">'+article.headline.main+'</a>'+'<p>'+article.snippet+'</p>'+'</li>');
        }
        
        
    }).error(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not Generate');
        
    });
    //create wiki request timeout 
    var wikiRequestTimeout = setTimeout(function() {$wikiElem.text("Failed to Generate Wikipedia Articles");}, 6000);
    //load Wikipedia url
    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+cityValue+'&format=json&callback=wikiCallback'; 
    $.ajax( {
        url: wikiUrl,
        dataType: 'jsonp',
        success: function(response) {
            // do something with response
            var wikiResults = response[1];
            //extractions for faster for-loop below
            var i;
            var wikiResultsLength = wikiResults.length;
            var articleResult; 
            var articleUrl;
            
            for(i=0; i<wikiResultsLength; i++){
                articleResult = wikiResults[i];
                articleUrl = 'http://en.wikipedia.org/wiki/'+articleResult;
                //append to page 
                $wikiElem.append('<li><a href="'+articleUrl+'">'+articleResult+'</a></li>');
            }
            clearTimeout(wikiRequestTimeout);
        }
    } );
    
    

    return false;
};


$('#form-container').submit(loadData);
