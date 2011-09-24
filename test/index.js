/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2011, IBM Corporation
 */

var consoleElement

LumpGap.onReady(onLumpGapReady)

//------------------------------------------------------------------------------
function consoleLog(message) {
    consoleElement.innerText += message + "\n"
}

//------------------------------------------------------------------------------
function onLumpGapReady(require) {
    consoleElement = document.getElementById("console")
    console.log = consoleLog

    setTimeout(function(){
        require("./all-tests")
    }, 1)
}
