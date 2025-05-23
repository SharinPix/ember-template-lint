import generateRuleTests from '../../helpers/rule-test-harness.js';

generateRuleTests({
  name: 'no-invalid-meta',

  config: true,

  good: [
    '<meta>',
    '<meta charset="UTF-8">',
    '<meta http-equiv="refresh" content="0; url=http://www.example.com">',
    '<meta http-equiv="refresh" content="72001">',
    '<meta http-equiv={{httpEquiv}} content={{content}}>',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable = yes">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable= yes">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    '<meta name={{name}} content={{content}}>',
    '<meta property="og:type" content="website">',
    '<meta itemprop="type" content="website">',

    // doesn't error on unrelated elements
    '<div></div>',
  ],

  bad: [
    {
      template: '<meta http-equiv="refresh" content="1; url=http://www.example.com">',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 0,
              "endColumn": 67,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "a meta redirect should not have a delay value greater than zero",
              "rule": "no-invalid-meta",
              "severity": 2,
              "source": "<meta http-equiv="refresh" content="1; url=http://www.example.com">",
            },
          ]
        `);
      },
    },
    {
      template: '<meta http-equiv="refresh" content="71999">',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 0,
              "endColumn": 43,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "a meta refresh should have a delay greater than 72000 seconds",
              "rule": "no-invalid-meta",
              "severity": 2,
              "source": "<meta http-equiv="refresh" content="71999">",
            },
          ]
        `);
      },
    },
    {
      template: '<meta name="viewport" content="user-scalable=no">',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 0,
              "endColumn": 49,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "a meta viewport should not restrict user-scalable",
              "rule": "no-invalid-meta",
              "severity": 2,
              "source": "<meta name="viewport" content="user-scalable=no">",
            },
          ]
        `);
      },
    },
    {
      template: '<meta name="viewport" content="user-scalable = no">',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 0,
              "endColumn": 51,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "a meta viewport should not restrict user-scalable",
              "rule": "no-invalid-meta",
              "severity": 2,
              "source": "<meta name="viewport" content="user-scalable = no">",
            },
          ]
        `);
      },
    },
    {
      template: '<meta name="viewport" content="user-scalable= no">',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 0,
              "endColumn": 50,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "a meta viewport should not restrict user-scalable",
              "rule": "no-invalid-meta",
              "severity": 2,
              "source": "<meta name="viewport" content="user-scalable= no">",
            },
          ]
        `);
      },
    },
    {
      template:
        '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 0,
              "endColumn": 89,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "a meta viewport should not set a maximum scale on content",
              "rule": "no-invalid-meta",
              "severity": 2,
              "source": "<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">",
            },
          ]
        `);
      },
    },

    {
      template: '<meta name="viewport">',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 0,
              "endColumn": 22,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "a meta content attribute must be defined if the name, property, itemprop or the http-equiv attribute is defined",
              "rule": "no-invalid-meta",
              "severity": 2,
              "source": "<meta name="viewport">",
            },
          ]
        `);
      },
    },
    {
      template: '<meta property="og:type">',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 0,
              "endColumn": 25,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "a meta content attribute must be defined if the name, property, itemprop or the http-equiv attribute is defined",
              "rule": "no-invalid-meta",
              "severity": 2,
              "source": "<meta property="og:type">",
            },
          ]
        `);
      },
    },
    {
      template: '<meta itemprop="type">',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 0,
              "endColumn": 22,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "a meta content attribute must be defined if the name, property, itemprop or the http-equiv attribute is defined",
              "rule": "no-invalid-meta",
              "severity": 2,
              "source": "<meta itemprop="type">",
            },
          ]
        `);
      },
    },
    {
      template: '<meta http-equiv="refresh">',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 0,
              "endColumn": 27,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "a meta content attribute must be defined if the name, property, itemprop or the http-equiv attribute is defined",
              "rule": "no-invalid-meta",
              "severity": 2,
              "source": "<meta http-equiv="refresh">",
            },
          ]
        `);
      },
    },
    {
      template: '<meta content="72001">',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 0,
              "endColumn": 22,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "a meta content attribute cannot be defined if the name, property, itemprop nor the http-equiv attributes are defined",
              "rule": "no-invalid-meta",
              "severity": 2,
              "source": "<meta content="72001">",
            },
          ]
        `);
      },
    },
  ],
});
