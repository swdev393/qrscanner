
function scan_qrcode() {
    let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
    scanner.scanPeriod = 5
    scanner.addListener('scan', function (content) {
        document.getElementById('qrResSpan').innerHTML = content;
        /** add your mp3 file that should sound after a successful scan 
            to the '/sound' folder and uncomment the two lines below: **/   
        //var audio = new Audio('sound/[your-sound-file.mp3]');
        //audio.play();
        
	if (typeof(Storage) !== "undefined") {
  	    // Code for localStorage/sessionStorage.
            if (localStorage.getItem("scan") === null) {
                localStorage.setItem("scan", content);
	    } else { 
	    	var scan = localStorage.getItem("scan");
                var scanArr = scan.split(',');
                var found = 0; 
                for (var i = 0; i < scanArr.length; i++) {
                    if (scanArr[i] == content) {
                        found = 1;
                        break;
                    }
                }
                if (found == 0) {
                    scan = scan + ',' + content;   
                    localStorage.setItem("scan", scan);
                } else {
                    document.getElementById('qrResSpan').innerHTML = content + ' already scanned!';
                }
	    }
	    
	} else {
  	    // Sorry! No Web Storage support..
	    alert("web storage not supported");	
	}
    }); 
    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 1) {
            scanner.start(cameras[1]);
        } else if (cameras.length > 0) {
            scanner.start(cameras[0]);
        } else {
            console.error('No cameras found.');
        }
        }).catch(function (e) {
        console.error(e);
    });
}


function display_scans() {
    if (typeof(Storage) !== "undefined") {
        if (localStorage.getItem("scan") === null) {
            document.getElementById('qrResSpan').innerHTML = 'scanned list is empty!';
	} else { 
            var scan = localStorage.getItem("scan");
            document.getElementById('qrResSpan').innerHTML = scan;
        }
    } else {  	
        alert("web storage not supported");	
    }
};

function clear_scans() {
    if (typeof(Storage) !== "undefined") {
        if (localStorage.getItem("scan") === null) {
            document.getElementById('qrResSpan').innerHTML = 'scanned list is already empty!';
	} else { 
            localStorage.removeItem("scan");             
        }
    } else {  	
        alert("web storage not supported");	
    }
};

 
function window_resize() {
    var scanPreview = document.getElementById("preview");
    if(scanPreview){
        scanPreview.width = window.innerWidth;
        scanPreview.height = window.innerHeight -300;
    }
};

function window_load() {
    window_resize();
};


///////////// ajax ////////////
function createAjaxRequestObject() {
    var xmlhttp;

    if(window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // Create the object
    return xmlhttp;
}

function AjaxPost(ajaxURL, parameters, onComplete) {
    var ajaxHttp = createAjaxRequestObject();

    ajaxHttp.onreadystatechange = function() {
        if(ajaxHttp.readyState == 4) {
            if(ajaxHttp.status == 200) {
                if(onComplete) {
                    onComplete(ajaxHttp.responseText);
                }
            }
        }
    };

    // Create parameter string
    var parameterString = "";
    var isFirst = true;
    for(var index in parameters) {
        if(!isFirst) {
            parameterString += "&";
        } 
        parameterString += encodeURIComponent(index) + "=" + encodeURIComponent(parameters[index]);
        isFirst = false;
    }

    ajaxHttp.open("POST", ajaxURL, true);
    ajaxHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxHttp.send(parameterString);
}


function AjaxGet(ajaxURL, onComplete) {
    var ajaxHttp = createAjaxRequestObject();

    ajaxHttp.onreadystatechange = function() {
        if(ajaxHttp.readyState == 4) {
            if(ajaxHttp.status == 200) {
                if(onComplete) {
                    onComplete(ajaxHttp.responseText);
                }
            }
        }
    };

    ajaxHttp.open("GET", ajaxURL, true);
    ajaxHttp.send();
}


function completedAJAX(response) {
    alert(response);
}

function completedAJAX_GET(response) {
document.getElementById('scans_from_server').innerHTML = response;	
}

function SendScans() {
    var parameters = {
      "scans" : document.getElementById("qrResSpan").innerHTML 
    };

    AjaxPost("save2file.php", parameters, completedAJAX);
}

function GetScans() {
    AjaxGet("save2file.php", completedAJAX_GET);
}
