Performance issues with LumpGap
===============================

2011/09/22
----------

The biggest performance issue with LumpGap today is the sync XHR (*gasp*) that's
used to load modules.  Here are some timings:

iOS Simulator:

    sync xhr(modules/basic/program.js?1316727617932): 1ms
    sync xhr(modules/basic/test.js?1316727617933):    1ms
    sync xhr(modules/basic/foo.js?1316727617934):     1ms
    sync xhr(modules/basic/bar.js?1316727617935):     1ms

iPad2:

    sync xhr(modules/basic/program.js?1316727950657): 10ms
    sync xhr(modules/basic/test.js?1316727950671):     5ms
    sync xhr(modules/basic/foo.js?1316727950677):      4ms
    sync xhr(modules/basic/bar.js?1316727950681):      4ms

iPhone 3G:

    sync xhr(modules/basic/program.js?1316727546895): 34ms
    sync xhr(modules/basic/test.js?1316727546941):    29ms
    sync xhr(modules/basic/foo.js?1316727546974):     29ms
    sync xhr(modules/basic/bar.js?1316727547005):     28ms

