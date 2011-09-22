/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2011, IBM Corporation
 */

#import <Foundation/Foundation.h>

#ifdef PHONEGAP_FRAMEWORK
#import <PhoneGap/PGPlugin.h>
#import <PhoneGap/JSON.h>
#else
#import "PGPlugin.h"
#import "JSON.h"
#endif

//------------------------------------------------------------------------------
// plugin class
//------------------------------------------------------------------------------
@interface PGLumpGap : PGPlugin {}
    @property (nonatomic, retain) NSDictionary* fileMap;

    - (NSDictionary*)buildFileMap;
    - (void)getFileMap:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
    - (void)returnSuccess:(NSDictionary*)fileMap callback:(NSString*)callback;
    - (void)returnError:(NSString*)message callback:(NSString*)callback;
@end

//------------------------------------------------------------------------------
// plugin class
//------------------------------------------------------------------------------
@implementation PGLumpGap
    @synthesize fileMap = _fileMap;

    //--------------------------------------------------------------------------
    - (NSDictionary*)buildFileMap {
        NSFileManager* nsFileManager = [NSFileManager defaultManager];
        NSString*      bundlePath    = [[NSBundle mainBundle] bundlePath];

        // get the root directory of the modules
        NSString* bundleRoot = [NSString stringWithFormat: @"%@/www/modules", bundlePath];

        // get all the files under that root directory
        NSArray* fileNames = [nsFileManager subpathsAtPath:bundleRoot];

        NSMutableDictionary* fileMap = [[[NSMutableDictionary alloc] init] autorelease];
        for (NSString* fileName in fileNames) {
            NSString*     fullFileName = [NSString stringWithFormat: @"%@/%@", bundleRoot, fileName];
            NSDictionary* attrs        = [nsFileManager attributesOfItemAtPath:fullFileName error:nil];
            NSString*     fileType     = [attrs fileType];

            if (![fileType isEqualToString:NSFileTypeRegular]) continue;

            NSDictionary* properties = [[[NSDictionary alloc] init] autorelease];
            [fileMap setObject:properties forKey:fileName];
        }

        return fileMap;
    }

    //--------------------------------------------------------------------------
    - (void)getFileMap:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options {
        NSString* callback = [arguments objectAtIndex:0];

        if (!self.fileMap) {
            self.fileMap = [self buildFileMap];
        }

        [self returnSuccess:self.fileMap callback:callback];
    }

    //--------------------------------------------------------------------------
    - (void)returnSuccess:(NSDictionary*)fileMap callback:(NSString*)callback {

        PluginResult* result = [PluginResult
            resultWithStatus: PGCommandStatus_OK
            messageAsDictionary: fileMap
        ];

        NSString* js = [result toSuccessCallbackString:callback];
//        NSLog(@"writing JS: '%@'", js);

        [self writeJavascript:js];
    }

    //--------------------------------------------------------------------------
    - (void)returnError:(NSString*)message callback:(NSString*)callback {
        PluginResult* result = [PluginResult
            resultWithStatus: PGCommandStatus_OK
            messageAsString: message
        ];

        NSString* js = [result toErrorCallbackString:callback];

        [self writeJavascript:js];
    }

@end

