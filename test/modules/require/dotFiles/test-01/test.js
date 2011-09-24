/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2011, IBM Corporation
 */

exports.id = module.id

var assert = require("assert")

var foo
var bar

exports.test_foo = function() {
    assert.equal(foo.id, "require/dotFiles/test-01/foo.js")
}

exports.test_bar = function() {
    assert.equal(bar.id, "require/dotFiles/test-01/bar.js")
}

exports.test_a_foo = function() {
    assert.equal(a_foo.id, "require/dotFiles/test-01/a/foo.js")
}

exports.test_a_b_foo = function() {
    assert.equal(a_b_foo.id, "require/dotFiles/test-01/a/b/foo.js")
}

exports.setUp = function() {
    foo     = require('./foo')
    bar     = require('./bar')
    a_foo   = require("./a/foo")
    a_b_foo = require("./a/b/foo")
}
