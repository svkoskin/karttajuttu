
var freedomData = {};
var FREEDOM_DATA_URI = "data/freedom.csv";

function initializeFreedomData() {
    var freedomDataCSV;
    var freedomDataArray;

    // freedom.csv:n on oltava muodossa maa;lyhenne;freedomScore;kuvaus

    $.get(FREEDOM_DATA_URI, function(data) { 
	    var freedomDataArray = jQuery.csv(";")(data);

	    for(i in freedomDataArray) {
		freedomData[freedomDataArray[i][1]] = [freedomDataArray[i][0], freedomDataArray[i][2], freedomDataArray[i][3]];
	    }

	    console.log(freedomData);
	});

    console.log(freedomData);
}

// Vaihtaa infoboxin sisällön, mikäli maasta on tietoja freedomDatassa
function changeInfoboxContents(cc) {
    if(freedomData[cc] != null) {
	if(freedomData[cc][3].length > 0) {
	    $("#infobox").html(freedomData[cc][3]);
	}
	
    }
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
		onRegionClick: function(event, cc) { event.preventDefault(); changeInfoboxContents(cc); }
	});
}

$().ready( function() {
	initializeMap();
	initializeFreedomData();
    });
	