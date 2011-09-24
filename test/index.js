/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2011, IBM Corporation
 */

var consoleElement
var oldConsoleLog

LumpGap.onReady(onLumpGapReady)

//------------------------------------------------------------------------------
function newConsoleLog(message) {
    oldConsoleLog.call(console,message)
    consoleElement.innerText += message + "\n"
}

//------------------------------------------------------------------------------
function onLumpGapReady(require) {
    consoleElement = document.getElementById("console")

    oldConsoleLog = console.log
    console.log = newConsoleLog

    setTimeout(function(){
        require("./all-tests")
    }, 1)
}
