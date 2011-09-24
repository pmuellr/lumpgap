/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2011, IBM Corporation
 */

var tester = require("../tester")

test("./fromNode/test-event-emitter-add-listeners.js")
test("./fromNode/test-event-emitter-check-listener-leaks.js")
test("./fromNode/test-event-emitter-modify-in-emit.js")
test("./fromNode/test-event-emitter-num-args.js")
test("./fromNode/test-event-emitter-once.js")
test("./fromNode/test-event-emitter-remove-listeners.js")

function test(name) {
    tester.test(name, require(name))
}