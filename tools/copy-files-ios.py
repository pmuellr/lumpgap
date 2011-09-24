#!/usr/bin/env python

# PhoneGap is available under *either* the terms of the modified BSD license *or* the
# MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
#
# Copyright (c) 2011, IBM Corporation

import os
import sys
import shutil

PROGRAM = os.path.basename(sys.argv[0])

#-------------------------------------------------------------------------------
def main():
    if len(sys.argv) < 3: error("usage: %s source target")

    source  = sys.argv[1]
    target  = sys.argv[2]
    project = os.path.basename(os.path.abspath(target))

    if not os.path.isdir(source): error("source argument is not a directory")
    if not os.path.isdir(target): error("target argument is not a directory")

    log("copying source %s to target %s" % (source, target))

    cpFiles = [
        [ "plugins/ios/lumpgap.js",   "www" ],
        [ "plugins/ios/PGLumpGap.m",  "%s/Plugins" % project],
        [ "test/index-phonegap.html", "www/index.html" ],
        [ "test/index.js",            "www/index.js" ],
    ]

    for cpFile in cpFiles:
        shutil.copy2(
            "%s/%s" % (source, cpFile[0]),
            "%s/%s" % (target, cpFile[1])
        )

    modulesDir = "%s/www/modules" % target

    if os.path.exists(modulesDir):
        shutil.rmtree(modulesDir)

    os.mkdir(modulesDir)

    copyTree(
        "%s/test/modules" % source,
        "%s/www/modules" % target
    )

#-------------------------------------------------------------------------------
def copyTree(source, target):
    entries = os.listdir(source)

    for entry in entries:
        fullNameSource = os.path.join(source, entry)
        fullNameTarget = os.path.join(target, entry)

        if os.path.isfile(fullNameSource):
            shutil.copy2(fullNameSource, fullNameTarget)
#            log("copying %s -> %s" % (fullNameSource, fullNameTarget))

        elif os.path.isdir(fullNameSource):
            if not os.path.isdir(fullNameTarget):
                os.mkdir(fullNameTarget)

            copyTree(fullNameSource, fullNameTarget)


#-------------------------------------------------------------------------------
def log(message):
    print "%s: %s" % (PROGRAM, message)

#-------------------------------------------------------------------------------
def error(message):
    log(message)
    sys.exit(1)

#-------------------------------------------------------------------------------
main()
