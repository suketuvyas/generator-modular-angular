'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var angularUtils = require('../util.js');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var wiredep = require('wiredep');
var chalk = require('chalk');

var Generator = module.exports = function Generator(args, options)
{
    yeoman.generators.Base.apply(this, arguments);
    this.argument('appname', {type: String, required: false});
    this.appname = this.appname || path.basename(process.cwd());
    this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));
    this.slugAppName = this._.slugify(this.appname);
    this.humanizedAppName = this._.humanize(this.appname);
    this.scriptAppName = this.appname;

    args = ['main'];

    if (typeof this.env.options.appPath === 'undefined') {
        this.option('appPath', {
            desc: 'Allow to choose where to write the files'
        });

        this.env.options.appPath = this.options.appPath;

        if (!this.env.options.appPath) {
            try {
                this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
            } catch (e) {
            }
        }
        this.env.options.appPath = this.env.options.appPath || 'app';
        this.options.appPath = this.env.options.appPath;
    }

    this.appPath = this.env.options.appPath;


    this.pkg = require('../package.json');
    this.sourceRoot(path.join(__dirname, '../templates'));
};

util.inherits(Generator, yeoman.generators.Base);


//Generator.prototype.askForCssFramework = function askForCssFramework()
//{
//    var cb = this.async();
//
//    this.prompt([{
//        type: 'confirm',
//        name: 'useCssFramework',
//        message: 'Would you like to include a css-Framework?',
//        default: true
//    }, {
//        when: function (props)
//        {
//            return props.useCssFramework;
//        },
//        type: 'list',
//        name: 'cssFramwork',
//        message: 'Which (s)css-framework would you like to use?',
//        default: 'animateModule',
//        choices: [
//            {
//                value: 'bootstrap',
//                name: 'bootstrap-sass-official'
//            },
//            {
//                value: 'angularUi',
//                name: 'angular-ui-bootstrap'
//            },
//            {
//                value: 'foundation',
//                name: 'foundation'
//            },
//            {
//                value: 'semantic-ui',
//                name: 'bootstrap'
//            },
//            {
//                value: 'ionic',
//                name: 'ionic'
//            }
//        ]
//    }, {
//        when: function (props)
//        {
//            return props.useCssFramework;
//        },
//        type: 'confirm',
//        name: 'useCssFrameworkJs',
//        message: 'Would you like to to add the frameworks js files to the wiredep ignore?',
//        default: true
//    }], function (props)
//    {
//        this.useCssFramework = props.useCssFramework;
//        this.cssFramwork = props.cssFramwork;
//
//        cb();
//    }.bind(this));
//};
//
Generator.prototype.askForModules = function askForModules()
{
    var cb = this.async();

    var prompts = [{
        type: 'checkbox',
        name: 'modules',
        message: 'Which modules would you like to include?',
        choices: [
            {
                value: 'animateModule',
                name: 'angular-animate.js',
                checked: true
            }, {
                value: 'ariaModule',
                name: 'angular-aria.js',
                checked: true
            }, {
                value: 'cookiesModule',
                name: 'angular-cookies.js',
                checked: false
            }, {
                value: 'resourceModule',
                name: 'angular-resource.js',
                checked: true
            }, {
                value: 'sanitizeModule',
                name: 'angular-sanitize.js',
                checked: false
            }, {
                value: 'touchModule',
                name: 'angular-touch.js',
                checked: false
            }, {
                value: 'ngFabFormModule',
                name: 'ng-fab-form.js',
                checked: true
            }, {
                value: 'messagesModule',
                name: 'angular-messages.js (included with ngFabForm)',
                checked: false
            }, {
                value: 'uiRouterModule',
                name: 'ui-router.js',
                checked: true
            }, {
                value: 'routeModule',
                name: 'angular-route.js (standard router dot\'t use with ui-router)',
                checked: false
            }
        ]
    }];

    this.prompt(prompts, function (props)
    {
        var hasMod = function (mod)
        {
            return props.modules.indexOf(mod) !== -1;
        };
        this.animateModule = hasMod('animateModule');
        this.ariaModule = hasMod('ariaModule');
        this.cookiesModule = hasMod('cookiesModule');
        this.messagesModule = hasMod('messagesModule');
        this.resourceModule = hasMod('resourceModule');
        this.routeModule = hasMod('routeModule');
        this.uiRouterModule = hasMod('uiRouterModule');
        this.ngFabFormModule = hasMod('ngFabFormModule');
        this.sanitizeModule = hasMod('sanitizeModule');
        this.touchModule = hasMod('touchModule');

        var angMods = [];

        if (this.animateModule) {
            angMods.push("'ngAnimate'");
        }

        if (this.ariaModule) {
            angMods.push("'ngAria'");
        }

        if (this.cookiesModule) {
            angMods.push("'ngCookies'");
        }

        if (this.messagesModule) {
            angMods.push("'ngMessages'");
        }

        if (this.resourceModule) {
            angMods.push("'ngResource'");
        }

        if (this.routeModule) {
            angMods.push("'ngRoute'");
            this.env.options.ngRoute = true;
        }

        if (this.sanitizeModule) {
            angMods.push("'ngSanitize'");
        }

        if (this.touchModule) {
            angMods.push("'ngTouch'");
        }

        if (this.uiRouterModule) {
            angMods.push("'ui.router'");
            this.env.options.uiRouter = true;
        }

        if (this.ngFabFormModule) {
            angMods.push("'ngFabForm'");
        }

        if (angMods.length) {
            this.env.options.angularDeps = '\n    ' + angMods.join(',\n    ') + '\n  ';
        }

        cb();
    }.bind(this));
};

Generator.prototype.readIndex = function readIndex()
{
    this.ngRoute = this.env.options.ngRoute;
    this.uiRouter = this.env.options.uiRouter;
    this.indexFile = this.engine(this.read('index.html'), this);
};

Generator.prototype.cssFiles = function bootstrapFiles()
{
    this.fs.copy(
        this.templatePath('styles/**/*'),
        this.destinationPath(path.join(this.appPath, 'styles/')
        )
    );

    //var cssFile = 'styles/main.scss';
    //this.copy(
    //    cssFile,
    //    path.join(this.appPath, cssFile)
    //);
};

Generator.prototype.createIndexHtml = function createIndexHtml()
{
    this.indexFile = this.indexFile.replace(/&apos;/g, "'");
    this.write(path.join(this.appPath, 'index.html'), this.indexFile);
};

Generator.prototype.appJs = function appJs()
{
    this.angularModules = this.env.options.angularDeps;

    this.template('app/_app.js', 'app/scripts/_app.js');
    this.template('app/_app.spec.js', 'app/scripts/_app.spec.js');
    if (this.env.options.uiRouter) {
        this.template('app/_routes.js', 'app/scripts/_routes.js');
        this.template('app/_routes.spec.js', 'app/scripts/_routes.spec.js');
    }
};

Generator.prototype.packageFiles = function packageFiles()
{
    this.template('root/_bower.json', 'bower.json');
    this.template('root/_bowerrc', '.bowerrc');
    this.template('root/_package.json', 'package.json');
    this.template('root/_gulpfile.js', 'gulpfile.js');
    this.template('root/_config.xml', 'config.xml');
    this.template('root/_gitignore', '.gitignore');
    this.template('root/_editorconfig', '.editorconfig');
    this.template('root/_jshintrc', '.jshintrc');
    this.template('root/README.md', 'README.md');
    this.template('root/_travis.yml', '.travis.yml');
    this.template('root/_karma.conf.js', 'karma.conf.js');
    this.template('root/_karma-e2e.conf.js', 'karma-e2e.conf.js');
};

Generator.prototype.tasks = function packageFiles()
{
    this.template('tasks/config.js', 'tasks/config.js');
    this.template('tasks/build.js', 'tasks/build.js');
    this.template('tasks/dev.js', 'tasks/dev.js');

    // TODO make cordova optional
    this.template('tasks/cordova.js', 'tasks/cordova.js');
};

Generator.prototype.installDeps = function packageFiles()
{
    this.on('end', function ()
    {
        this.installDependencies({
            callback: function ()
            {
                // Emit a new event - dependencies installed
                this.emit('dependenciesInstalled');
            }.bind(this)
        });
    });

    // Now you can bind to the dependencies installed event
    this.on('dependenciesInstalled', function ()
    {
        this.spawnCommand('gulp', ['serve']);
    });
};