/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <asl.h>
#import <sys/utsname.h>

#import "RNSplashScreen.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate

- (NSString*) deviceName
{
  struct utsname systemInfo;
  uname(&systemInfo);
  
  return [NSString stringWithCString:systemInfo.machine encoding:NSUTF8StringEncoding];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"SkillsMapMobile"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  //Clear keychain on first run in case of reinstallation
  if (![[NSUserDefaults standardUserDefaults] objectForKey:@"FirstRun"]) {
    [self resetKeychain];
    [[NSUserDefaults standardUserDefaults] setValue:@"1strun" forKey:@"FirstRun"];
    [[NSUserDefaults standardUserDefaults] synchronize];
  }
  
  NSString *platform = [self deviceName];
  NSString *userAgent = [NSString stringWithFormat:@"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36 Portal Time Capture Pro app - ios - %@", platform];
  NSDictionary *dictionary = [NSDictionary dictionaryWithObjectsAndKeys:userAgent, @"UserAgent", nil];
  [[NSUserDefaults standardUserDefaults] registerDefaults:dictionary];
  
  //  [RNSplashScreen show];

  return YES;
}

-(void)resetKeychain {
  [self deleteAllKeysForSecClass:kSecClassGenericPassword];
}

-(void)deleteAllKeysForSecClass:(CFTypeRef)secClass {
  NSMutableDictionary* dict = [NSMutableDictionary dictionary];
  [dict setObject:(__bridge id)secClass forKey:(__bridge id)kSecClass];
  OSStatus result = SecItemDelete((__bridge CFDictionaryRef) dict);
  NSAssert(result == noErr || result == errSecItemNotFound, @"Error deleting keychain data (%ld)", result);
}

@end
