LumpGap tests
=============

This directory contains a set of tests for LumpGap.

The tests should be a set of modules which test the LumpGap functionality
in three environments:

* in PhoneGap (duh)
* in a desktop browser
* in Node

The tests running in Node only test the modules.  The tests running in a
desktop browser runs much of the same machinery as the PhoneGap version
of the code, so running these tests with a good browser debugger is
good way to debug issues in the guts of LumpGap.

**Important:**

Before running the tests, run `make get-node-modules`.

Running the tests in PhoneGap
-----------------------------

* create a PhoneGap project in Xcode the way you normally do
* see the installation instructions on the main page to see what to copy
where (plugin files)
* copy all the files in the `test` directory into your `www` folder in Xcode,
after you add the `www` folder to your project.
* rename `index-phonegap.html` to `index.html`
* build and run
* the tests display results in the browser window
* ignore all the goop in the text display; the only important thing is to see
that all the tests passed, which is noted in the final lines of the text display.

If you are planning on running the tests all the time, and you can live with
the project structure I set up for my personal test project, you can use the
`write-makefile-ios` task in the `Makefile` to write a Makefile to use in your
Xcode project.  This generates a `Makefile` that you should put in your Xcode
project, then run `make watch` to have the files copied from this project
into your Xcode project, as they are changed.

Running the tests in Node
-------------------------

From the `test` directory, run

    node run-in-node.js

Running the tests in a desktop browser
--------------------------------------

You will probably need to access the tests from an `http:` URL, as
opposed to a `file:` URL, due to the totally evil usage of **sync XHR**
(gasp!).  You will want to arrange to open the `test/index-desktop.html` file
from the browser to run the tests.  The the tests display results in the browser window


Updating `test/lumpgap-file-map.js`
--------------------------------

The file `test/lumpgap/file-map.js` is needed for the browser version of the tests; it
supplies the file names in the module directory that a PhoneGap native
supplies.  To regenerate it, run `make update-file-map`.
