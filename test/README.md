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

Running the tests in PhoneGap
-----------------------------

* create a PhoneGap project in Xcode the way you normally do
* see the installation instructions on the main page to see what to copy
where (plugin files)
* copy all the files in the `test` directory into your `www` folder in Xcode,
after you add the `www` folder to your project.
* build and run
* the tests display nothing in the browser window, only write the same
stuff they write in the Node tests to the console.  Look in the Xcode
console for the messages.

Running the tests in Node
-------------------------

From the `test` directory, run

    node run-in-node.js

Running the tests in a desktop browser
--------------------------------------

You will probably need to access the tests from an `http:` URL, as
opposed to a `file:` URL, due to the totally evil usage of **sync XHR**
(gasp!).  You will want to arrange to open the `test/index.html` file
from the browser to run the tests.  The tests display nothing in the browser
window, only write the same stuff they write in the Node tests to the
debug console.  Open your debugger to see the messages.

Updating index.json
-------------------

The file `index.json` is needed for the browser version of the tests; it
supplies the file names in the module directory that a PhoneGap native
supplies.  To regenerate the guts, run:

    cd test/modules; find . -type f | sed "s/^..\(.*\)/\"\1\": {},/"

and paste the results as the body of the JSON file, remembering to
remove the final `,` from the last entry.

