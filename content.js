alert("contentjs");
chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    alert("start of content");
	switch(message.type) {
		case "colors-div":
			var divs = document.querySelectorAll("div");
			if(divs.length === 0) {
				alert("There are no any divs in the page.");
			} else {
				for(var i=0; i<divs.length; i++) {
					divs[i].style.backgroundColor = message.color;
				}
			}
		break;
        case "findInputs":
            alert("hello content");
            //return "from content";
        break;
	}
});