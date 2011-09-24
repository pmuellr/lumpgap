/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2011, IBM Corporation
 */

;(function(){

//----------------------------------------------------------------------------
// some constants
//----------------------------------------------------------------------------
var PROGRAM = "LumpGap"
var VERSION = "0.1.0"

//-------------------------------------------------------------------
// node globals
//-------------------------------------------------------------------


//-------------------------------------------------------------------
if (PhoneGap.hasResource(PROGRAM)) return
PhoneGap.addResource(PROGRAM)

//----------------------------------------------------------------------------
// "globals" (local to this function scope though)
//----------------------------------------------------------------------------
var FileMap  = null
var Modules  = {}
var Packages = {}

//----------------------------------------------------------------------------
//var fileExists = debugWrapper(fileExists)
function fileExists(fileName) {
    if (!FileMap) error("trying to access require() before onModulesReady")

    if (!FileMap.hasOwnProperty(fileName)) return null
    return FileMap[fileName]
}

//----------------------------------------------------------------------------
//var packageExists = debugWrapper(packageExists)
function packageExists(fileName) {
    if (!Packages.hasOwnProperty(fileName)) return null
    return Packages[fileName]
}

//----------------------------------------------------------------------------
//var moduleExists = debugWrapper(moduleExists)
function moduleExists(moduleId) {
    if (!Modules.hasOwnProperty(moduleId)) return null
    return Modules[moduleId]
}

//----------------------------------------------------------------------------
function getFileAsText(fileName) {
    var timeStart = Date.now()

    var urlBase = "modules/" + fileName
    var url     = urlBase + "?" + timeStart

    var xhr = new XMLHttpRequest()
    xhr.open("get", url, false)
    xhr.send()

    if ((xhr.status != 0) && (xhr.status != 200)) {
        console.log("XHR error getting '" + urlBase + "': " + xhr.status + ": " + xhr.statusText)
        return null
    }

    var result = xhr.responseText

//    var timeElapsed = Date.now() - timeStart
//    console.log("sync xhr(" + url + "): " + timeElapsed + "ms")

    return result
}

//----------------------------------------------------------------------------
// node.js's module resolution process, as doc'd in:
//     http://nodejs.org/docs/v0.4.12/api/modules.html#all_Together...
//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
// var loadAsFile = debugWrapper(loadAsFile)
function loadAsFile(fileName) {
    if (fileExists(fileName)) return fileName

    var origFileName = fileName

    fileName = origFileName + ".js"
    if (fileExists(fileName)) return fileName

    fileName = origFileName + ".coffee"
    if (fileExists(fileName)) return fileName

    return null
}

//----------------------------------------------------------------------------
// var loadAsDirectory = debugWrapper(loadAsDirectory)
function loadAsDirectory(dirName) {
    var jsonFile = dirName + "/package.json"
    var pkg
    var moduleId

    if (fileExists(jsonFile)) {
        if (packageExists(fileName)) {
            pkg = Packages[fileName]
        }
        else {
            try {
                var pkgSource = getFileAsText(jsonFile)
                pkg = JSON.parse(pkgSource)
                Packages[jsonFile] = pkg
            }
            catch(e) {
                error("error loading '" + jsonFile + "': " + e)
            }
        }

        if (!pkg.main) error("no main entry in '" + jsonFile + "'")

        var fileName = normalize(dirName, pkg.main)
        moduleId = loadAsFile(fileName)
        if (moduleId) return moduleId
    }

    var moduleId = loadAsFile(dirName + "/index")
    if (moduleId) return moduleId

    return null
}

//----------------------------------------------------------------------------
// var loadNodeModules = debugWrapper(loadNodeModules)
function loadNodeModules(fileName, start) {
    var dirs = nodeModulesPaths(start)

    for (var i=0; i<dirs.length; i++) {
        var dir = dirs[i]
        var moduleId
        var moduleName = normalize("", dir + "/" + fileName)

        moduleId = loadAsFile(moduleName)
        if (moduleId) return moduleId

        moduleId = loadAsDirectory(moduleName)
        if (moduleId) return moduleId
    }

    return null
}

//----------------------------------------------------------------------------
// var nodeModulesPaths = debugWrapper(nodeModulesPaths)
function nodeModulesPaths(start) {
    var result = []
    var parts  = start.split("/")

    for (var i=parts.length; i>=0; i--) {
        if (parts[i-1] == "node_modules") continue

        var dir = parts.slice(0,i)
        dir.push("node_modules")
        dir = dir.join("/")

        result.push(dir)
    }

    return result
}

//----------------------------------------------------------------------------
// resolve the actual fileName
//----------------------------------------------------------------------------
// var resolve = debugWrapper(resolve)
function resolve(moduleName, path) {
    var moduleId

    if (moduleName.match(/^\//)) {
        error("absolute module names not supported: " + moduleName)
    }

    if (moduleName.match(/^\.{1,2}\//)) {
        moduleId = loadAsFile(normalize(path, moduleName))
        if (moduleId) return moduleId

        moduleId = loadAsDirectory(normalize(path, moduleName))
        if (moduleId) return moduleId
     }

     moduleName = normalize("", moduleName)

     moduleId = loadNodeModules(moduleName, path)
     if (moduleId) return moduleId

     return null
}

//----------------------------------------------------------------------------
// the require function
//----------------------------------------------------------------------------
function getRequire(currentModule) {
    var result = function require(moduleName) {

        var moduleId = resolve(moduleName, currentModule.dirName)
        if (null == moduleId) error("unable to resolve module '" + moduleName + "' from module: '" + currentModule.id + "'")

        var module = moduleExists(moduleId)
        if (module) return module.exports

        var factorySource = getFileAsText(moduleId)
        if (null == factorySource) {
            error("source unavailable for module " + moduleId)
        }

        if (moduleId.match(/\.coffee$/)) {
            var cs = require("coffee-script")
            factorySource = cs.compile(factorySource)
        }

        factorySource = "(function(require,exports,module) {\n" + factorySource + "\n})"
        factorySource += "\n//@ sourceURL=" + moduleId

        var factoryFunc
        try {
            factoryFunc = eval(factorySource)
        }
        catch(e) {
            error("error building module " + moduleName + ": " + e)
        }

        var module     = createModule(moduleId)
        var newRequire = getRequire(module)

        try {
            factoryFunc.call(null, newRequire, module.exports, module)
        }
        catch(e) {
            delete Modules[moduleName]
            error("error running module " + moduleName + ": " + e)
        }

        return module.exports
    }

    result.implementation = PROGRAM
    result.version        = VERSION

    return result
}

//----------------------------------------------------------------------------
// create a new module
//----------------------------------------------------------------------------
//var createModule = debugWrapper(createModule)
function createModule(id, dirName) {
    if (!dirName) dirName = getDirName(id)

    var module = {
        id:      id,
        exports: {},
        dirName: dirName
    }

    Modules[id] = module

    return module
}

//----------------------------------------------------------------------------
// get the path of a file
//----------------------------------------------------------------------------
//var getDirName = debugWrapper(getDirName)
function getDirName(fileName) {
    if (!fileName) return ""

    var parts = fileName.split("/")

    return parts.slice(0, parts.length-1).join("/")
}

//----------------------------------------------------------------------------
// normalize a 'file name' with . and .. with a 'directory name'
//----------------------------------------------------------------------------
//var normalize = debugWrapper(normalize)
function normalize(dirName, file) {
    var dirParts   = ("" == dirName) ? [] : dirName.split("/")
    var fileParts  = file.split("/")

    for (var i=0; i<fileParts.length; i++) {
        var filePart = fileParts[i]

        if (filePart == ".") {
        }

        else if (filePart == "..") {
            if (dirParts.length > 0) {
                dirParts.pop()
            }
            else {
                error("too many ..'s in file name '" + file + "'")
            }
        }

        else {
            dirParts.push(filePart)
        }
    }

    return dirParts.join("/")
}

//----------------------------------------------------------------------------
// throw an error
//----------------------------------------------------------------------------
function error(message) {
    log(message)
    throw new Error(PROGRAM + ": " + message)
}

//----------------------------------------------------------------------------
// log a message
//----------------------------------------------------------------------------
function log(message) {
    console.log(PROGRAM + ": " + message)
}

//----------------------------------------------------------------------------
// handle onReady callbacks
//----------------------------------------------------------------------------
var onReadyCalled    = false
var onReadyCallbacks = []

var globalRequire = getRequire(createModule("."))

//-------------------------------------------------------------------
function onReady(callback) {
    if (onReadyCalled) {
        try { callback.call(null, globalRequire) }
        catch(e) { log("error calling onReady callback '" + callback.name + "': " + e) }
        return
    }
    onReadyCallbacks.push(callback)
}

//-------------------------------------------------------------------
// getting the filemap from the native
//-------------------------------------------------------------------
function getFileMapSuccess(fileMap) {
    FileMap  = fileMap

    fixUpsNodeLate()

    onReadyCalled = true
    var callbacks = onReadyCallbacks.slice()
    for (var i=0; i<callbacks.length; i++) {
        var callback = callbacks[i]
        try { callback.call(null, globalRequire) }
        catch(e) { log("error calling onReady callback '" + callback.name + "': " + e) }
    }
}

//-------------------------------------------------------------------
function getFileMapFailure(message) {
    error("error loading file map: " + message)
}

//-------------------------------------------------------------------
// onReady handler
//-------------------------------------------------------------------
function onDeviceReady() {
    PhoneGap.exec(
        getFileMapSuccess,
        getFileMapFailure,
        "com.phonegap.lumpgap", "getFileMap", [])
}

if (PhoneGap.isLumpGapBrowserSimulator) {
    setTimeout(onDeviceReady,100)
}
else {
    document.addEventListener("deviceready", onDeviceReady, false);
}

//-------------------------------------------------------------------
// the LumpGap global
//-------------------------------------------------------------------
window.LumpGap = {
    VERSION: VERSION,
    onReady: onReady
}

fixUpsNodeEarly()

//-------------------------------------------------------------------
// node fixups 1
//-------------------------------------------------------------------
function fixUpsNodeEarly() {

    var process = {}

    // globals
    window.global = window
    global.process = process

    process.argv          = []
    process.execPath      = location.href
    process.chdir         = function() {throw "process.chdir() not supported"}
    process.cwd           = function() {return process.execPath}
    process.env           = {}
    process.exit          = function() {throw "process.exit()"}
    process.version       = "v0.4.12"
    process.versionimpl   = VERSION
    process.installPrefix = ""
    process.pid           = function() {return 0}
    process.title         = location.href
    process.memoryUsage   = function() {return 0}
    process.nextTick      = function(fun) {setTimeout(fun, 0)}
    process.umask         = function() { return 0644 }

    // needed for assert.js _deepEqual()
    global.Buffer = {}
    Buffer.isBuffer = function() { return false }

    // needed for events.js
    process.EventEmitter = function() {}
    process.__proto__ = process.EventEmitter.prototype

    // needed for events.js
    if (typeof(Array.isArray) != "function") {
        Array.isArray = function() {
            if (typeof(this.length) == "number") {
                return true
            }
            return false
        }
    }

    // hack the process binding stuff
    process.binding = function process_binding(key, val) {
        if (!process.__binding) process.__binding = {}

        if (val) {
            process.__binding[key] = val
            return
        }

        if (!process.__binding[key]) {
            console.log("someone looking up process.binding('" + key + "')")
        }

        return process.__binding[key]
    }
}

//-------------------------------------------------------------------
// node fixups 2
//-------------------------------------------------------------------
function fixUpsNodeLate() {
    var process = global.process

    // set the process.platform
    process.platform = navigator.device.platform

    // any missing console stuff; assumes console.log() exists
    if (!console.info)  console.info  = function() {console.log.apply(console,arguments)}
    if (!console.warn)  console.warn  = function() {console.log.apply(console,arguments)}
    if (!console.error) console.error = function() {console.log.apply(console,arguments)}
    if (!console.dir)   console.dir   = function() {console.log.apply(console,arguments)}

    if (!console.trace) console.trace   = function() {
        console.log("console.trace() not yet supported")
    }

    if (!console.assert) console.assert = function(val, message) {
        if (val) return
        if (!message) message = "assertion failed: " + val + " != true"
        console.log(message)
        throw message
    }

    var consoleTimers = {}

    if (!console.time) console.time = function(label) {
        var time = new Date().valueOf()
        consoleTimers[label] = time
    }

    if (!console.timeEnd) console.timeEnd = function(label) {
        var time = consoleTimers[label]
        if (!time) {
            console.log(label + ": NaNms") // heh
            return
        }

        time = new Date().valueOf() - time
        console.log(label + ": " + time + "ms")
    }
}

//-------------------------------------------------------------------
// debug goodies
//-------------------------------------------------------------------
var debugWrapperIndent = ""
function debugWrapper(func) {
    return function() {
        if (debugWrapperIndent == null) debugWrapperIndent = ""

        var args = [].slice.call(arguments)
        console.log(debugWrapperIndent + func.name + "(" + JSON.stringify(args) + ")")

        var oldIndent = debugWrapperIndent
        debugWrapperIndent += "   "

        var result = func.apply(this, args)

        debugWrapperIndent = oldIndent

        console.log(debugWrapperIndent + func.name + "(" + JSON.stringify(args) + "): " + JSON.stringify(result))

        return result
    }
}

})();
