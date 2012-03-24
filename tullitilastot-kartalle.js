var PRODUCT_DATA_PREFIX = "data/";
var PRODUCT_DATA_POSTFIX = "Tuotu.csv";

var freedomData = {};
var FREEDOM_DATA_URI = "data/freedom.csv";

var NUMBER_OF_COUNTRIES_TABLE = 10;
var NUMBER_OF_COUNTRIES_MAP = 10;

// Lataa muistiin vapaustiedot ja maakuvaukset kaikista maista
function initializeFreedomData() {
    $.get(FREEDOM_DATA_URI, function(data) { 
	    var freedomDataArray = jQuery.csv(";")(data);

	    for(i in freedomDataArray) {
		freedomData[freedomDataArray[i][1]] = {
		    "name": freedomDataArray[i][0],		    
		    "total": freedomDataArray[i][2],
		    "pr": freedomDataArray[i][3],
		    "cl": freedomDataArray[i][4],
		    "status": freedomDataArray[i][5] };
	    }
	});
}

// Päivittää tuotedatan
function initializeProductData(productId) {
    console.log("Kutsuttiin tuotedatan päivitystä tuoteryhmälle " + productId);

    var fileURI = PRODUCT_DATA_PREFIX + productId + PRODUCT_DATA_POSTFIX;

    // Globaaliin muuttujaan maat tuontimäärän mukaiseen järjestykseen.
    jQuery.get(fileURI, function(data) { 
	    productDataArray = jQuery.csv(";")(data);

	    for(var i = 0; i < productDataArray.length; i++) {
		productDataArray[i][3] = parseInt(productDataArray[i][3]);
	    }

	    productDataArray.sort( function(a, b) { 
		    if(a[3] < b[3]) {
		        return 1;
		    } else if(a[3] == b[3]) {
			return 0;
		    } else {
			return -1;
		    }
	    });

	updateProductStats(productDataArray.slice(1, 1 + NUMBER_OF_COUNTRIES_TABLE));
	updateMap(productDataArray.slice(1, 1 + NUMBER_OF_COUNTRIES_MAP));
    });
}

// Valitun maan asiat infoboxiin
function showCountryInfo(cc) {

    if(freedomData[cc] != null) {
	$("#infobox").html(freedomData[cc]["name"] + " is a very red country.");
    }
}

// Nykyisen tuotteen tilastot infoboxiin
function updateProductStats(topCountries) {
    $("#infobox").empty();
    
    $.each(topCountries, function(i, val) {
	    $("#infobox").append(val + "<br />");
	});
}

function initializeCategoryLinks() {
    var categoryLinks = $("#categories a");
    categoryLinks.each(function (el, val) { 
	$(val).click(function(event) { 
		var productId = $(val).attr("id");
		event.preventDefault();
		initializeProductData(productId);
	    });
	});
}

function colors(topCountries) {
    var freedomColors = {0:'#ffffff', 1:'#f8f8e4', 2:'#FFEF83', 3:'#FFE400', 4:'#F5A800', 5:'#EC6D05', 6:'#E42817', 7:'#BC0B2C'};

    var countriesColors = {};

    $.each(topCountries, function(i, val) {
	countriesColors[val[0]] = freedomColors[freedomData[val[0]]["total"]];
    });

    return countriesColors;
}

function updateMap(topCountries) {
    console.log(colors(topCountries));
    
    $("#mapdiv").vectorMap("set", "colors", colors(topCountries));
}

function initializeMap() {
    $("#mapdiv").vectorMap({
	color: "#777777",
	hoverColor: "#000000",
	hoverOpacity: "0.3",
	backgroundColor: "#66BBDD",
	onRegionClick: function(e, cc) { showCountryInfo(cc); }
    });
}


$().ready( function() {
	initializeCategoryLinks();
	initializeMap();
	initializeFreedomData();
    });
	