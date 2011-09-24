#!/usr/bin/env python

# PhoneGap is available under *either* the terms of the modified BSD license *or* the
# MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
#
# Copyright (c) 2011, IBM Corporation

import os
import sys
import json
import time

PROGRAM     = os.path.basename(sys.argv[0])
PROGRAM_DIR = os.path.dirname(sys.argv[0])
ROOT_DIR    = os.path.normpath(os.path.join(PROGRAM_DIR, ".."))
TEST_DIR    = os.path.join(ROOT_DIR,"test")
MODULES_DIR = os.path.join(TEST_DIR,"modules")

#-------------------------------------------------------------------------------
def main():
    fileMap = getFileMap(MODULES_DIR)

    oFileName = os.path.join(TEST_DIR, "lumpgap-file-map.js")
    oFile = open(oFileName, "w")
    oFile.write("PhoneGap.addLumpGapFileMap(")
    json.dump(fileMap, oFile, indent=4)
    oFile.write(")")
    oFile.close()

    log("generated: '" + oFileName + "'")

#-------------------------------------------------------------------------------
def getFileMap(rootDirName):
    walkEntries = os.walk(rootDirName)

    result    = {}
    prefixLen = 1 + len(rootDirName)

    for (dirPath, dirNames, fileNames) in walkEntries:
        for fileName in fileNames:
            fileName = os.path.join(dirPath, fileName)
            fileNameKey = fileName[prefixLen:]
            result[fileNameKey] = getFileInfo(fileName)

    return result

#-------------------------------------------------------------------------------
def getFileInfo(fileName):
    modTime = os.path.getmtime(fileName)
    gmTime  = time.gmtime(modTime)
    isoTime = time.strftime("%Y-%m-%dT%H:%M:%SZ", gmTime)

    size  = os.path.getsize(fileName)

    return {
        "mtime": isoTime,
        "size":  size
    }

#-------------------------------------------------------------------------------
def log(message):
    print "%s: %s" % (PROGRAM, message)

#-------------------------------------------------------------------------------
def error(message):
    log(message)
    sys.exit(1)

#-------------------------------------------------------------------------------
main()