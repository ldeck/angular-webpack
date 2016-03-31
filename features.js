#!/usr/bin/env node;

var Executor = require('./features_util').Executor;
var executor = new Executor();

var protractor = 'node_modules/.bin/protractor';
var cucumberConf = 'features/conf/cucumber.conf.js';
var multiConf = 'features/conf/cucumber.multi.js';

testSuccessfulFeatures();
testFailingFeatures();
testFailFastFastOption();
testStrictOption();
testUndefinedWithoutStrictOption();
testMultiCapsOverrideBaseOptsAndCliOpts();

executor.execute();

function cucumber(opts) {
  return ('node ' + protractor + ' ' +
          (opts && opts['conf']? opts['conf'] : cucumberConf) +
          (opts && opts['opts']? ' ' + opts['opts'] : ''));
}

function usingCucumber(options) {
  if (options) {
    return cucumber({opts: options, conf: cucumberConf});
  }
  return cucumber({conf: cucumberConf});
}

function multiCucumber(options) {
  if (options) {
    return cucumber({opts: options, conf: multiConf});
  }
  return cucumber({conf: multiConf});
}


function testSuccessfulFeatures() {
  executor.addCommandlineTest(usingCucumber())
    .alwaysEnableStdio()
    .expectExitCode(0);
}

function testFailingFeatures() {
  executor.addCommandlineTest(usingCucumber('--cucumberOpts.tags @failing'))
    .expectExitCode(1)
    .expectErrors([
      { message:"expected 'My AngularJS App' to equal 'Failing scenario 1'" },
      { message:"expected 'My AngularJS App' to equal 'Failing scenario 2'" }
    ]);
}

function testFailFastFastOption() {
  executor.addCommandlineTest(usingCucumber('--cucumberOpts.tags @failing --cucumberOpts.fail-fast'))
   .expectExitCode(1)
   .expectErrors([{ message: "expected 'My AngularJS App' to equal 'Failing scenario 1'" }]);
}

function testStrictOption() {
  executor.addCommandlineTest(usingCucumber('--cucumberOpts.tags @strict --cucumberOpts.strict'))
   .expectExitCode(1)
   .expectErrors([{ message: "Undefined steps are not allowed in strict mode" }]);
}

function testUndefinedWithoutStrictOption() {
  executor.addCommandlineTest(usingCucumber('--cucumberOpts.tags @strict'))
   .expectExitCode(0)
   .expectErrors([]);
}

function testMultiCapsOverrideBaseOptsAndCliOpts() {
  executor.addCommandlineTest(multiCucumber('--cucumberOpts.tags @failing'))
   .expectExitCode(0)
   .expectErrors([]);
}
