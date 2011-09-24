/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2011, IBM Corporation
 */

//------------------------------------------------------------------------------
try {
    require("assert")
}
catch(e) {
    console.log("--> It appears you don't have assert.js handy.")
    console.log("--> There should be a task in the Makefile to get it from node.js")
}

//------------------------------------------------------------------------------
var tester = require("./tester")

require("./require/all-tests")
require("./events/all-tests")

tester.report()
