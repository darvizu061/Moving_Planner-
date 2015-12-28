
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
    var NYTapiurl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+cityValue+'&sort=newest&api-key=3efc62d1c3f59f3f56ba7f84549ab6c1:4:73883147';
    
    $.getJSON(NYTapiurl, function (data){
        console.log(data);
    });

    return false;
};


$('#form-container').submit(loadData);
