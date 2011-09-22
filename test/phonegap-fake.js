/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2011, IBM Corporation
 */

// defines just enough PhoneGap goop that you can load an iPhone
// plugin in the browser and even run it a bit

;(function(){

//----------------------------------------------------------------------------
if (window.PhoneGap) return

//----------------------------------------------------------------------------
window.PhoneGap = {}

//----------------------------------------------------------------------------
PhoneGap.Fake = true

//----------------------------------------------------------------------------
PhoneGap.hasResource = function(pluginName) {
    return false
}

//----------------------------------------------------------------------------
PhoneGap.addResource = function(pluginName) {
}

//----------------------------------------------------------------------------
function getFileAsText(fileName) {
    var xhr = new XMLHttpRequest()
    xhr.open("get", fileName, false)
    xhr.send()
    return xhr.responseText
}

//----------------------------------------------------------------------------
PhoneGap.exec = function(success, fail, pluginLongName, method, args) {
    method = pluginLongName + "." + method

    if (method == "com.phonegap.lumpgap.getFileMap") {
        var text = getFileAsText("index.json")
        var obj = JSON.parse(text)
        setTimeout(function() {success(obj)}, 100)
    }
    else {
        console.log("not supported: PhoneGap.exec(" + pluginLongName + "." + method + "(" + args + ")")
    }
}

//----------------------------------------------------------------------------
PhoneGap.addConstructor = function(func) {
    func()
}

})();
