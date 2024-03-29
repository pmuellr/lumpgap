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

window.PhoneGap = {}
PhoneGap.isLumpGapBrowserSimulator = true

//----------------------------------------------------------------------------
var device = {
    platform:   "lumpgap-desktop-simulator",
    name:       "lumpgap-desktop-simulator",
    uuid:       "???uuid???",
    gap:        "1.0.0",
    version:    "1.0.0",
    connection: {"type":"none"},
}

navigator.device = window.device = device

//----------------------------------------------------------------------------
PhoneGap.available = true

//----------------------------------------------------------------------------
PhoneGap.hasResource = function(pluginName) {
    return false
}

//----------------------------------------------------------------------------
PhoneGap.addResource = function(pluginName) {
}

//----------------------------------------------------------------------------
var FileMap = {}
PhoneGap.addLumpGapFileMap = function(fileMap) {
    FileMap = fileMap
}

//----------------------------------------------------------------------------
PhoneGap.exec = function(success, fail, pluginLongName, method, args) {
    method = pluginLongName + "." + method
    fileMapName = "modules/file-map.json"

    if (method == "com.phonegap.lumpgap.getFileMap") {
        setTimeout(function() {success(FileMap)}, 0)
    }

    else {
        var message = "not supported: PhoneGap.exec(" + pluginLongName + "." + method + "(" + args + ")"
        console.log(message)
        throw message
    }
}

//----------------------------------------------------------------------------
PhoneGap.addConstructor = function(func) {
    func()
}

})();
