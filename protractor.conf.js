// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {SpecReporter} = require('jasmine-spec-reporter');
const AllureReporter = require('jasmine-allure-reporter');
const beautify_html = require('js-beautify').html;

const html_beautifier_options = {
  indent_size: 2,
  html: {
    wrap_attributes: 'force-aligned'
  }
};

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: false,
  seleniumAddress: "http://localhost:4444/wd/hub",
  baseUrl: 'http://localhost:8080/',
  framework: 'jasmine2',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 50000,
    print: function () {
    }
  },
  beforeLaunch() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  },
  onPrepare() {
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: 'all',      // display stacktrace for each failed assertion, values: (all|specs|summary|none)
        displaySuccessesSummary: true, // display summary of all successes after execution
        displayFailuresSummary: true,   // display summary of all failures after execution
        displayPendingSummary: true,    // display summary of all pending specs after execution
        displaySuccessfulSpec: true,    // display each successful spec
        displayFailedSpec: true,        // display each failed spec
        displayPendingSpec: true,      // display each pending spec
        displaySpecDuration: true,     // display each spec duration
        displaySuiteNumber: true,      // display each suite number (hierarchical)
        colors: {
          success: 'green',
          failure: 'red',
          pending: 'yellow'
        },
        prefixes: {
          success: '✓ ',
          failure: '✗ ',
          pending: '* '
        },
        customProcessors: []
      }
    }));
    jasmine.getEnv().addReporter(new AllureReporter({resultsDir: 'allure-results'}));
    jasmine.getEnv().afterEach(function (done) {
      // Add custom html sources attachment to allure report.
      browser.executeScript("return arguments[0].innerHTML;", element(by.tagName('app-root'))).then(function (sources) {
        allure.createAttachment('app-root sources', function () {
          // TODO: See if these Merge requests solve the wrong appearance:
          // - https://github.com/beautify-web/js-beautify/pull/1354
          // - https://github.com/beautify-web/js-beautify/pull/1329
          return beautify_html(sources, html_beautifier_options);
        }, 'text/plain')();
      });

      // Add custom screenshot attachment to allure report.
      browser.takeScreenshot().then(function (png) {
        allure.createAttachment('Screenshot', function () {
          return new Buffer(png, 'base64')
        }, 'image/png')();
        done();
      });
    });
  }
};
