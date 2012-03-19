var productData;
var PRODUCT_DATA_PREFIX = "data/products/";
var PRODUCT_DATA_POSTFIX = ".csv";

var freedomData = {};
var FREEDOM_DATA_URI = "data/freedom.csv";

// Lataa muistiin vapaustiedot ja maakuvaukset kaikista maista
function initializeFreedomData() {

    // freedom.csv:n on oltava muodossa maa;lyhenne;freedomScore;kuvaus

    $.get(FREEDOM_DATA_URI, function(data) { 
	    var freedomDataArray = jQuery.csv(";")(data);

	    for(i in freedomDataArray) {
		freedomData[freedomDataArray[i][1]] = [freedomDataArray[i][0], freedomDataArray[i][2], freedomDataArray[i][3]];
	    }
	});
}

// Päivittää tuotedatan (TODO: kutsuuko myös kartan päivitystä?)
function initializeProductData(productId) {
    console.log("Kutsuttiin tuotedatan päivitystä tuoteryhmälle " + productId);

    var fileURI = PRODUCT_DATA_PREFIX + productId + PRODUCT_DATA_POSTFIX;

    //    jQuery.get(fileURI, function(data) { productDataArray = jQuery.csv(";")(data); });
    
}

// Vaihtaa infoboxin sisällön, mikäli maasta on tietoja freedomDatassa
function showCountryInfo(cc) {

    if(freedomData[cc] != null) {
	$("#infobox").html(freedomData[cc][2]);
    }
}

// Nykyisen tuotteen tilastot infoboxiin
function showProductStats() {
    $("#infobox").html("Tuotteen " + productId + " tiedot.");
}

function initializeCategoryLinks() {
    var categoryLinks = $("#categories a");
    categoryLinks.each(function (el, val) { 
	$(val).click(function(event) { 
		event.preventDefault();
		initializeProductData($(val).attr("id")); 
	    });
	});
}

function initializeMap() {
    var color = {0:'#ffffff', 1:'#f8f8e4', 2:'#FFEF83', 3:'#FFE400', 4:'#F5A800', 5:'#EC6D05', 6:'#E42817', 7:'#BC0B2C'};
    var freedomData = {"fi":0,"be":1,"br":2,"cn":6,"de":1,"es":1,"fr":1,"id":3,"il":2,"in":3,"it":1,"ma":4,"nl":1,"pl":1,"pt":1,"se":1,"sk":1,"sn":3,"th":4,"tn":4,"tr":3};
    var cc, colors = {};
    for (countryCode in freedomData) {
	if (countryCode >= 0) {
	    colors[countryCode] = color[freedomData[countryCode][2]];
	}
    }
      
    $('#mapdiv').vectorMap({
	    color: '#00aa00',
		colors: colors,
		hoverOpacity: 0.7,
		hoverColor: false,
		backgroundColor: '#a8a8a8',
		onRegionClick: function(event, cc) { event.preventDefault(); showCountryInfo(cc); }
	});
}

$().ready( function() {
	initializeCategoryLinks();
	initializeMap();
	initializeFreedomData();
    });
	