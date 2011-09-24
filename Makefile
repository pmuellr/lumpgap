# PhoneGap is available under *either* the terms of the modified BSD license *or* the
# MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
#
# Copyright (c) 2011, IBM Corporation

# also update process.version in lumpgap.js
NODE_VERSION = v0.4.12
NODE_URL     = https://raw.github.com/joyent/node
NODE_LIB     = test/modules/node_modules

#-------------------------------------------------------------------------------
all: help

#-------------------------------------------------------------------------------
update-file-map:
	python tools/update-file-map.py

#-------------------------------------------------------------------------------
write-makefile-ios: get-tools
	@echo "all: help"
	@echo ""
	@echo "copy:"
	@echo "	@python `pwd`/tools/copy-files-ios.py `pwd` ."
	@echo ""
	@echo "watch:"
	@echo "	@python `pwd`/tools/run-when-changed.py \"make copy\" `pwd` "
	@echo ""
	@echo "help:"
	@echo '	@echo "make targets available:"'
	@echo '	@echo "   help   print this help"'
	@echo '	@echo "   watch  run make build when a file changes"'
	@echo '	@echo "   copy   copy plugin files to phonegap-plugins"'

#-------------------------------------------------------------------------------
get-node-modules:
	curl $(NODE_URL)/$(NODE_VERSION)/lib/_linklist.js      > test/modules/node_modules/_linklist.js
	curl $(NODE_URL)/$(NODE_VERSION)/lib/assert.js         > test/modules/node_modules/assert.js
	curl $(NODE_URL)/$(NODE_VERSION)/lib/buffer.js         > test/modules/node_modules/buffer.js
	curl $(NODE_URL)/$(NODE_VERSION)/lib/events.js         > test/modules/node_modules/events.js
	curl $(NODE_URL)/$(NODE_VERSION)/lib/freelist.js       > test/modules/node_modules/freelist.js
	curl $(NODE_URL)/$(NODE_VERSION)/lib/path.js           > test/modules/node_modules/path.js
	curl $(NODE_URL)/$(NODE_VERSION)/lib/stream.js         > test/modules/node_modules/stream.js
	curl $(NODE_URL)/$(NODE_VERSION)/lib/string_decoder.js > test/modules/node_modules/string_decoder.js
	curl $(NODE_URL)/$(NODE_VERSION)/lib/url.js            > test/modules/node_modules/url.js
	curl $(NODE_URL)/$(NODE_VERSION)/lib/util.js           > test/modules/node_modules/util.js

	curl $(NODE_URL)/$(NODE_VERSION)/test/simple/test-event-emitter-add-listeners.js        > test/modules/events/fromNode/test-event-emitter-add-listeners.js
	curl $(NODE_URL)/$(NODE_VERSION)/test/simple/test-event-emitter-check-listener-leaks.js > test/modules/events/fromNode/test-event-emitter-check-listener-leaks.js
	curl $(NODE_URL)/$(NODE_VERSION)/test/simple/test-event-emitter-modify-in-emit.js       > test/modules/events/fromNode/test-event-emitter-modify-in-emit.js
	curl $(NODE_URL)/$(NODE_VERSION)/test/simple/test-event-emitter-num-args.js             > test/modules/events/fromNode/test-event-emitter-num-args.js
	curl $(NODE_URL)/$(NODE_VERSION)/test/simple/test-event-emitter-once.js                 > test/modules/events/fromNode/test-event-emitter-once.js
	curl $(NODE_URL)/$(NODE_VERSION)/test/simple/test-event-emitter-remove-listeners.js     > test/modules/events/fromNode/test-event-emitter-remove-listeners.js

	cd test/modules; npm install coffee-script

#-------------------------------------------------------------------------------
get-tools: \
	tools/run-when-changed.py

#-------------------------------------------------------------------------------
tools/run-when-changed.py:
	curl https://raw.github.com/gist/240922/0f5bedfc42b3422d0dee81fb794afde9f58ed1a6/run-when-changed.py > $@

#-------------------------------------------------------------------------------
help:
	@echo make targets available:
	@echo "  help               print this help"
	@echo "  get-node-modules   download compatible modules from node"
	@echo "  update-file-map    update test/lumpgap-file-map.js"
	@echo "  write-makefile-ios write a makefile for your iOS Xcode test project"