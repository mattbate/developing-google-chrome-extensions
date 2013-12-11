// omnibox
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
	suggest([
	  {content: "color-divs", description: "Make everything red"}
	]);
});
chrome.omnibox.onInputEntered.addListener(function(text) {
	if(text == "color-divs") colorDivs();
});

// listening for an event / one-time requests
// coming from the popup
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "color-divs":
            colorDivs();
        break;
        case "findInputs":
            alert("inbackground 2");
        break;
    }
    return true;
});

// listening for an event / long-lived connections
// coming from devtools
chrome.extension.onConnect.addListener(function (port) {    
    port.onMessage.addListener(function (message) {
        alert("in listener" + port.name);
       	switch(port.name) {
			case "color-divs-port":
				colorDivs();
                break;
            case "findInputs":
                alert("inbackground");
                findInputs();
			break;
		}
        return "returnhello"
    });
});

// send a message to the content script
var colorDivs = function() {
	chrome.tabs.getSelected(null, function(tab){
        alert("in color getseelcted");
	    chrome.tabs.sendMessage(tab.id, {type: "colors-div", color: "#F00"});
	    // setting a badge
		chrome.browserAction.setBadgeText({text: "red!"});
	});
}
var findInputs = function(){
    alert("in background find inputs");
    chrome.tabs.getSelected(null, function(tab){
        alert("GET SELECTED" + tab.id);
        chrome.tabs.sendMessage(tab.id, {type: "findInputs"});
    });
}