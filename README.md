lumpgap
=======

LumpGap is an experiment bringing some of the sensibilities of Node to PhoneGap.

    > synonym("lump")
    'node'

This project is not directly related to the wonderful
[Node.js project](http://nodejs.org), but is indirectly related
in that there was a desire to see if the programming patterns
for Node would be useful in PhoneGap environments.
The Node.js project has some legalese surrounding their name
[[1]](http://blog.nodejs.org/2011/04/29/trademark/)
[[2]](http://nodejs.org/trademark-policy.pdf),
so it seemed best
to not name the project NodeGap, or something, right now.

why
===

In discussions with PhoneGap developers, a subject that often
comes up is that of using Node's
[modules](http://nodejs.org/docs/v0.4.12/api/modules.html),
[Events](http://nodejs.org/docs/v0.4.12/api/events.html),
and other goodies, within PhoneGap.  Useful?  Not useful?
We don't know.  We talk a lot.  Time to write some code.

what does it do?
===============

require()
---------
See [Node's documentation on Modules](http://nodejs.org/docs/v0.4.12/api/modules.html).

The basic idea here is to put all of your modules in a `modules` directory
under your www folder in your PhoneGap project.  The module files and
directories are mostly the same as what Node supports, which is the same thing
that [npm](http://npmjs.org/) supports.  The differences will hopefully be minor:

* you can't use `/` as a prefix on a module
* won't search paths above the `www/modules` directory
* doesn't handle links

It should eventually handle:

* `node_modules` directories
* `main` properties in `package.json` files
* most of Node's [module resolution algorithm](http://nodejs.org/docs/v0.4.12/api/modules.html#all_Together...)

Most of this is untested right now.  Simple cases appear to work.

EventEmitter
------------

The events.EventEmitter class is passing some of the tests that node ships.

what else
---------

Other bits are limping.  Let it be known what isn't!

running
=======

After installing LumpGap in your project (see below), here's how you use it.

LumpGap installs a new global variable for you to access, named `LumpGap`, which
has one function available as property:

    void onReady(function(require){})

The `onReady` function takes a callback function as a parameter.  When LumpGap
is ready to go, it will run this callback, passing in the `require` function
so you can start `require`ing junk.  This `require` function should be kept
local - once you are inside a real module, the module has it's own version
of `require` that it should use.

You can call the `onReady` function as many times as you like - the callbacks
will be run in the order they were added.  In addition, if you call this
function *after* LumpGap has run the callbacks, it will simply turn around and
call your callback synchronously.

installing
==========

Currently, LumpGap is only available on iOS, using PhoneGap 1.0.

LumpGap provides it's capability via a plugin, which you add to your
PhoneGap projects.

* Copy the `.m` file to the Plugins directory in your project.
* Copy the `.js` file to your www directory and reference it from your html file(s)
via a `<script src=>` element.
* In the `Supporting Files` directory of your project, in the `PhoneGap.plist`
file, add a new plugin entry in the `Plugins` dictionary:
 * key: `com.phonegap.lumpgap`
 * value: `PGLumpGap`
* start dropping modules into `www/modules`

If you'd like to use some of the "core" packages in node, you can see how that
was done for the tests, looking at the `get-node-modules` task in the `Makefile`.

Currently, assert and event seem to be working.

testing
=======

See documentation under the `test` directory.

licence
=======

PhoneGap is available under *either* the terms of the modified BSD license *or* the
MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
