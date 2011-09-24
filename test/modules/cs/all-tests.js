/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2011, IBM Corporation
 */

var tester = require("../tester")

test("./helloworld.coffee")

assert.throws(function() {
    require("./hasAnError.coffee")
})

function test(name) {
    tester.test(name, require(name))
}