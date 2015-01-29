tdd:
	NODE_PATH="`pwd`/lib" ./node_modules/mocha/bin/mocha -w

real-tests:
	ROOT_PATH="`pwd`/demo-project" node test.js

.PHONY: tdd real-tests