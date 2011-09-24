/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2011, IBM Corporation
 */

var tester = require("./tester")

try {
    require("assert")
}
catch(e) {
    console.log("--> It appears you don't have assert.js handy.")
    console.log("--> There should be a task in the Makefile to get it from node.js")
}
require("./require/all-tests")

tester.report()
