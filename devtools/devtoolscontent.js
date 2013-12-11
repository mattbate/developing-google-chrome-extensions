window.onload = function() {
	var port = chrome.extension.connect({ name: "color-divs-port" });
    var port2 = chrome.extension.connect({name: "findInputs"});
	document.getElementById("button").onclick = function() {
    	port.postMessage({ type: "color-divs"});
	}
    document.getElementById("findInputs").addEventListener("click", function(){
        alert("in event liste")
        var portReturn = port2.postMessage({type: "findInputs"});
        //alert(portReturn);
    })
}