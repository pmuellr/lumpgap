# PhoneGap is available under *either* the terms of the modified BSD license *or* the
# MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
#
# Copyright (c) 2011, IBM Corporation

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
	curl $(NODE_URL)/$(NODE_VERSION)/lib/_linklist.js > $(NODE_LIB)/_linklist.js
	curl $(NODE_URL)/$(NODE_VERSION)/lib/assert.js > $(NODE_LIB)/assert.js
	curl $(NODE_URL)/$(NODE_VERSION)/lib/events.js > $(NODE_LIB)/events.js
	curl $(NODE_URL)/$(NODE_VERSION)/lib/freelist.js > $(NODE_LIB)/freelist.js
	curl $(NODE_URL)/$(NODE_VERSION)/lib/path.js > $(NODE_LIB)/path.js
	curl $(NODE_URL)/$(NODE_VERSION)/lib/stream.js > $(NODE_LIB)/stream.js
	curl $(NODE_URL)/$(NODE_VERSION)/lib/string_decoder.js > $(NODE_LIB)/string_decoder.js
	curl $(NODE_URL)/$(NODE_VERSION)/lib/url.js > $(NODE_LIB)/url.js
	curl $(NODE_URL)/$(NODE_VERSION)/lib/util.js > $(NODE_LIB)/util.js

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