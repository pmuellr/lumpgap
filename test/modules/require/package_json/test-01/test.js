/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2011, IBM Corporation
 */

exports.id = module.id

exports.test_foo = function() {
    require("./a/b/foo")
}

exports.test_bar = function() {
    require("./a/bar")
}

