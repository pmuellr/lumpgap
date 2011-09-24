/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2011, IBM Corporation
 */

//----------------------------------------------------------------------------
exports.totalTests  = 0
exports.failedTests = 0

//----------------------------------------------------------------------------
exports.report = function report() {
    console.log("")
    console.log("--------------------------------------------------------")

    if (exports.failedTests == 0) {
        console.log("passed all " + exports.totalTests + " tests")
    }
    else {
        console.log("failed " + exports.failedTests + " out of " + exports.totalTests + " tests")
    }

    console.log("--------------------------------------------------------")
}

//----------------------------------------------------------------------------
exports.test = function test(name, exps) {
    if (null == exps) {
        exps = name
        name = exps.id
    }
    if (null == exps) return

    var unnamed = false
    if (!name) {
        name = "<unnamed module>"
        unnamed = true
    }

    console.log("running tests " + name)

    if (typeof(exps.setUp) == "function") {
        exports.totalTests++

        try {
            exps.setUp()
        }
        catch(e) {
            exports.failedTests++
            console.log("   error running setUp(): " + e)
            return
        }
    }

    for (var key in exps) {
        if (typeof(exps[key]) != "function") continue
        if (key == "setUp") continue
        if (key == "tearDown") continue

        exports.totalTests++

        if (unnamed) {
            console.log("running test  " + name + "." + key + "()")
        }

        try {
            exps[key]()
        }
        catch(e) {
            exports.failedTests++
            console.log("   error running " + key + "(): " + e)
        }

    }

    if (typeof(exps.tearDown) == "function") {
        exports.totalTests++

        try {
            exps.tearDown()
        }
        catch(e) {
            exports.failedTests++
            console.log("   error running tearDown(): " + e)
            return
        }
    }

}
