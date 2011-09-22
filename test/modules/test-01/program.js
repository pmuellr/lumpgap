/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2011, IBM Corporation
 */

console.log("in: " + module.id)
exports.id = module.id

var test = require('./test')

var foo = require('./foo')
var bar = require('./bar')

//------------------------------------------------------------------------------
test.print('DONE', 'info')
