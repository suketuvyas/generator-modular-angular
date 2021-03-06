[![Build Status](https://travis-ci.org/johannesjo/generator-modular-angular.svg?branch=master)](https://travis-ci.org/johannesjo/generator-modular-angular)
[![NPM version](http://img.shields.io/npm/v/generator-moda.svg?style=flat-square)](https://npmjs.org/package/generator-moda)
[![Coverage Status](https://coveralls.io/repos/johannesjo/generator-modular-angular/badge.svg?branch=master)](https://coveralls.io/r/johannesjo/generator-modular-angular?branch=master)
[![Dependency Status](https://david-dm.org/johannesjo/generator-modular-angular.svg)](https://david-dm.org/johannesjo/generator-modular-angular)
[![devDependency Status](https://david-dm.org/johannesjo/generator-modular-angular/dev-status.svg)](https://david-dm.org/johannesjo/generator-modular-angular#info=devDependencies)

# generator-moda (modular angular)
*A truly modular yeoman generator for AngularJS all device apps.*

[![Yeoman](assets/yeoman.png)](http://yeoman.io/) [![Angular](assets/angular.png)](https://angularjs.org) [![Gulp](assets/gulp.png)](http://gulpjs.com/) [![libSass](assets/libsass.png)](http://libsass.org/) [![Bower](assets/bower.png)](http://bower.io/) [![Cordova](assets/cordova.png)](https://cordova.apache.org/)

This generator originated in the pure hate towards repetition and because all the ones I've used so far didn't fit my taste. `generator-modular-angular` is intended to encourage and ease a modular workflow for your AngularJS apps. It generates a front-end-build that uses all the tools I love (namely gulp, libsass and of course angular) and offers an **easy adaption towards multi-platform web-app hybrid-apps** (in shot muplawehy-apps, if you didn't know). Although its great, you don't need ionic and sometimes you don't want to need it.

Creating a generator is much about best practise and much about ones personal taste and preferences for development. At the moment `generator-modular-angular` does fit mostly my own, but I would be really happy to discuss and adjust it to a broader public. So if you don't like something or miss anything always feel free to submit a feature request.

Credits to the [generator-angular](https://github.com/yeoman/generator-angular) team. Their code helped me to get started and some of the file-templates are very similiar.

I want this to be really good, so I would be excited to [hear about your thoughts and what possible features you might be missing](https://github.com/johannesjo/generator-modular-angular/issues). Any other kind of help is also highly appreciated :)

## Getting started
I'm assuming that you have [node](https://github.com/joyent/node) already installed in a proper way. 

Install [bower](https://github.com/bower/bower) and [yeoman](http://yeoman.io/) if not done already:
```
npm install -g bower yo
```
Install the generator:
```
npm install -g generator-moda
```
Then make a new directory and cd into it
```
mkdir my-super-modular-project && cd $_
```
Run it!
```
yo moda [app-name]
```
Then wait........  finally run:
```
gulp serve
```
for development.


## Features
* **total injection**: Basically everything you create is automatically injected where it needs to be and removed when its gone. Creating a new scss-file? No problem it's in your main.scss! Deleting an unused component? It's gone from your index.html.
* **gulp and libsass speedified**: It's amazing how much faster both are compared to their counterparts.
* **super modular**: No more controller madness by design. 
* fully **configurable** and **extendable** - use [your own configuration](#yo-rc) and [your own templates](#custom-templates)
*  **cordova-prepared**: [Your cordova-build](#setup-hybrid-build) is just on step away. Building multiplatform mobile apps has never been so easy.
* and of course all the basics:
  * livereload, sass-compilation, jshint (optional), jscs, and testing on runtime
  * minification via `ng-annotate`, `imagemin`, `htmlmin`, `cssmin`
  * unit-testing and end-to-end testing via karma runner
  * pick your modules on creation (`ui.router`, `ngMaterial` or one of the base components, you name it)

## Why choose this generator over another?
While offering the most common features of popular angularjs-generators there are three unique selling points: 

The first one is the feature of  **auto-injection**. As I said: I hate repition. And while other generators offer you also some kind of auto-injection they usually require you to use their generators for that, which also means you still need to manually change those when a file changes or is deleted. Not with `moda` you not. This feature works for bower-components, your javascript-files, your tests and also your scss-components.

The second one is the **configurability**. It's super easy to adjust everything to your liking. Don't like the templates? No problem, use your own! Don't like the the file-names produced? Just make some simple changes in the .yo-rc.json. Best of all: The changes you make can be stored on a project level, so all developers in your team (can) use the same generator output.

The third one is **the cordova integration**. While technically not stunningly complicated to do, I know many developers who shy away before building hybrid apps, as they don't know how easy it is to do. And while I like ionic and while I'm thankful for what they did for hybrid-app development, I don't like that you that your kind of limted to mobile only and that you kind of have to use their components. The latter produces comparably fat apps and leaves you a little bit lost, if something doesn't work as expected. But it's just JavaScript and CSS run in a container wrapped by cordova after all, so using bootrap or your own components should work just as fine.

Finally it is safe to say that I'm really dedicated to this project. I'm an Angular and node developer for years know and I want this to be really good. I plan to spend lots of hours of my free time to improve it as the time goes on. So if you miss anything, don't like something chances are very good that I'm going to change that.

## Basic concepts behind this Generator
* What belongs together should be reflected in the file-structure. Grouping files by module is generally preferable to grouping files by type.
* Directives are the way to go. Build components all the way. They're sexy enclosed logic and expressive. Chances are you'll reuse them and it is no problem if it is only in your current app.
* Use controllers economically. They will be gone in Angular 2.0 and honestly - I'm not too sad about it. Use them on a page-level (if your app has something like that) to get data for your views or for very minor and very specific logic.

## The gulp tasks
As per default the following tasks are available at your convenience:

* `gulp`: The development task. Runs all the injectors on file-change, file-creation or file-deletion. Unit-tests are run in parallel, as well as the sass-compilation. 
* `gulp injectAll`: Runs all the injectors once.
* `gulp build`: Minifies your JavaScript via ng-annotate, your css, your images and your html files and copies everything to the www-folder.  
* `gulp test`: Runs your unit tests with the keep-alive option. 
* `gulp testSingle`: Runs your unit tests once. 
* `gulp e2e`: Runs your end to end tests once. 

The mobile tasks require a little preparation described in the next section.

* `gulp cordovaDev`: Symlinks your app-folder to www and runs the emulator for easy live development. 
* `gulp cordovaRun`: Symlinks your app-folder to www and runs it on your device if connected. 

Of course there are also all the [standard cordova commands](https://cordova.apache.org/docs/en/4.0.0/guide_cli_index.md.html) available as well. If you want to build a release run:
 ```
 gulp build
 cordova build android --release
 ```

For all cordova related commands there is an optional platform parameter you can use to specify the platform for the cordova task. E.g. `gulp cordovaDev --platform=android` to run the android emulator. Alternatively you can edit the config.js to change the default platform.

All tasks can be edited freely and can be found in the /tasks folder.

## Sub-Generators
* [moda](#moda) (aka [moda:app](#app))
* [directive](#directive)
* [service](#service)
* [factory](#factory)
* [controller](#controller)
* [provider](#provider)
* [decorator](#decorator)
* [route](#route)
* [e2e-test](#e2e-test)
* [page-object](#page-object)

For configuring the generators on a project-level [edit the .yo-rc.json](#yo-rc).

### moda
The main generator. Sets up the basic boilerplate. Provides an interactive prompt to install the most common modules.

### directive
Interactively generates a directive, a test file and if you choose so a scss and html-template files.

**usage:**
```
yo moda:d my-directive
```
**output:**
```
app/scripts/my-directive/my-directive-d.js
app/scripts/my-directive/my-directive-d.spec.js

// If you choose the template option (default:true)
app/scripts/my-directive/my-directive-d.html
app/scripts/my-directive/_my-directive-d.scss
// If you choose service for the service or factory option (default:false)
app/scripts/my-directive/my-directive-s.js
// If you choose factory
app/scripts/my-directive/my-directive-f.js
```

You can also specify a path or a parent module:
```
yo moda:d my-directive my-path
```
**output:**
```
app/scripts/my-path/my-directive/my-directive-d.js
app/scripts/my-path/my-directive/my-directive-d.spec.js
```
By default directives are wrapped into their own folder. If you don't want that you can [edit the .yo-rc.json](#yo-rc) or specify the `--noParentFolder` flag:

```
yo moda:d my-directive my-path --noParentFolder
```

### controller
Creates a controller and a test-file and template and service-files if you choose so. Although it works just fine, most of the time you probably would want to use [route](#route) or [directive](#directive) instead.

**usage:**
```
yo moda:c my-ctrl
```
**output:**
```
app/scripts/my-ctrl/my-ctrl-c.js
app/scripts/my-ctrl/my-ctrl-c.spec.js

// If you choose the template option (default:true)
app/scripts/my-ctrl/my-ctrl-c.html
app/scripts/my-ctrl/_my-ctrl-c.scss
// If you choose service for the service or factory option (default:false)
app/scripts/my-ctrl/my-ctrl-s.js
// If you choose factory
app/scripts/my-ctrl/my-ctrl-f.js
```

You can also specify a path or a parent module:
```
yo moda:c my-ctrl my-path
```
**output:**
```
app/scripts/my-path/my-ctrl/my-ctrl-d.js
app/scripts/my-path/my-ctrl/my-ctrl-d.spec.js
```
By default controllers are wrapped into their own folder. If you don't want that you can [edit the .yo-rc.json](#yo-rc) or specify the `--noParentFolder` flag:

```
yo moda:c my-ctrl my-path --noParentFolder
```

### service
Creates a service.

**usage:**
```
yo moda:s my-service
```
**output:**
```
app/scripts/my-global-service-dir/my-service-s.js
app/scripts/my-global-service-dir/my-service-s.spec.js
```
Setting the default global-service (and factory) directory can be done by editing the .yo-rc.json

You can specify a path or a parent module:
```
yo moda:s my-service my-path
```
**output:**
```
app/scripts/my-path/my-service-s.js
app/scripts/my-path/my-service-s.spec.js
```



### factory
Creates a factory.

**usage:**
```
yo moda:f my-factory
```
**output:**
```
app/scripts/my-global-service-dir/my-factory-f.js
app/scripts/my-global-service-dir/my-factory-f.spec.js
```
Setting the default global-service (and factory) directory can be done by editing the .yo-rc.json

You can specify a path or a parent module:
```
yo moda:s my-factory my-path
```
**output:**
```
app/scripts/my-path/my-factory-f.js
app/scripts/my-path/my-factory-f.spec.js
```

### filter
Creates a filter.

**usage:**
```
yo moda:filter my-filter
```
**output:**
```
app/scripts/my-global-filter-dir/my-filter-filter.js
app/scripts/my-global-filter-dir/my-filter-filter.spec.js
```
Setting the default global-filter directory can be done by editing the .yo-rc.json

You can specify a path or a parent module:
```
yo moda:s my-filter my-path
```
**output:**
```
app/scripts/my-path/my-filter-filter.js
app/scripts/my-path/my-filter-filter.spec.js
```

### provider
Creates a provider.

**usage:**

```
yo moda:p my-provider
```

**output:**

```
app/scripts/my-global-service-dir/my-provider-p.js
app/scripts/my-global-service-dir/my-provider-p.spec.js
```
Setting the default global-service (and factory) directory can be done by editing the .yo-rc.json

You can specify a path or a parent module:
```
yo moda:p my-provider my-path
```

**output:**

```
app/scripts/my-path/my-provider-p.js
app/scripts/my-path/my-provider-p.spec.js
```

### decorator
Creates a decorator.


**usage:**

```
yo moda:decorator my-decorator
```

**output:**

```
app/scripts/my-global-service-dir/my-decorator-decorator.js
app/scripts/my-global-service-dir/my-decorator-decorator.spec.js
```
Setting the default global-service directory can be done by editing the .yo-rc.json

You can specify a path or a parent module:
```
yo moda:decorator my-decorator my-path
```

**output:**

```
app/scripts/my-path/my-decorator-decorator.js
app/scripts/my-path/my-decorator-decorator.spec.js
```

### route
Interactively creates a route (state) from a state-name. Requires `ui.router` to be installed during app-creation.
**usage:**

```
yo moda:r my-state
```

**output:**

```
// if you choose to create a controller for the route (default:true)
app/scripts/_routes/my-state/my-state-c.js
app/scripts/_routes/my-state/my-state-c.spec.js
// If you choose the template option (default:true)
app/scripts/_routes/my-state/my-state-c.html
app/scripts/_routes/my-state/_my-state-c.scss
// If you choose service for the service or factory option (default:false)
app/scripts/_routes/my-state/my-state-s.js
app/scripts/_routes/my-state/my-state-s.spec.js
// If you choose factory
app/scripts/_routes/my-state/my-state-f.js
app/scripts/_routes/my-state/my-state-f.spec.js
```
Furthermore the state is injected into the `routes.js` if present:
```
.state('my-state', {
    url: '/my-state',
    // if you choose the controller option
    controller: 'MyStateCtrl',
    // if you choose the template option
    templateUrl: 'scripts/_routes/my-state/my-state-c.html'
})
/* STATES-NEEDLE - DO NOT REMOVE THIS */;
```

Setting the default routes directory can be done by editing the .yo-rc.json

You can also create sub-states like this:
```
yo moda:r my-par-state.my-state
```

**output:**

```
// if you choose to create a controller for the route (default:true)
app/scripts/_routes/my-par-state/my-state/my-state-c.js
app/scripts/_routes/my-par-state/my-state/my-state-c.spec.js
// If you choose the template option (default:true)
app/scripts/_routes/my-par-state/my-state/my-state-c.html
app/scripts/_routes/my-par-state/my-state/_my-state-c.scss
// If you choose service for the service or factory option (default:false)
app/scripts/_routes/my-par-state/my-state/my-state-s.js
app/scripts/_routes/my-par-state/my-state/my-state-s.spec.js
// If you choose factory
app/scripts/_routes/my-par-state/my-state/my-state-f.js
app/scripts/_routes/my-par-state/my-state/my-state-f.spec.js
```
Furthermore the state is injected into the `routes.js` if present:
```
.state('my-par-state.my-state', {
    url: '/my-state',
    // if you choose the controller option
    controller: 'MyStateCtrl',
    // if you choose the template option
    templateUrl: 'scripts/_routes/my-par-state/my-state/my-state-c.html'
})
/* STATES-NEEDLE - DO NOT REMOVE THIS */;
```

### e2e-test 
not implemented yet

### page-object
not implemented yet


## Sub-Generator Options and Parameters
**Parameters**

* `--openInEditor`  opens the created files automatically in your favorite editor (specified via .yo-rc.json)
* `--useDefaults`     skips the dialogs and uses the defaults
* `--skipInject`      skips running grunt inject after file creation
* `--noParentFolder`  does prevent the creation of a wrapper directory with the component name for directives and controllers

## <a name="yo-rc"></a>Using the .yo-rc.json for configuration
Chances are that the default settings do not match your taste. Chances are you totally dislike some of the ideas behind this generator. In those cases you always can edit the .yo-rc.json with settings more to your taste.
 
The default configuration looks like this:
```
// .yo-rc.json

// appended suffix for test files
testSuffix: '.spec',

// if your specs should succeed after creation or not
testPassOnDefault: true,

// always use defaults, never open prompts
alwaysSkipDialog: false,

// you can set this to '' if you prefer loading your styles dynamically
stylePrefix: '_', 

// command launched when using the --openInEditor flag. The command 
// looks like this <%= editorCommand %> file-created1.ext file-created2.ext etc.
editorCommand: 'idea', 

// default style of path names, e.g. for dasherize:
// yo moda:c MyRoute
// => my-route-c.js
pathOutputStyle: 'dasherize',

// if ui router is enabled or not. If you want to enable this option,
// make sure you also have dirs.routes and routesFile defined
uiRouter: false,

// the file where the states get injected
routesFile: './app/scripts/_routes.js',

// file extensions used. At the moment there are only templates 
// available for those specified per default. So don't change them
fileExt: {
    script: '.js',
    tpl: '.html',
    style: '.scss'
},

// some folders used in the creation process
dirs: {
    app: 'app',
    appModules: 'scripts',
    globalComponents: '_main',
    routes: '_routes'
},

// here it gets interesting...
subGenerators: {
    directive: {
        suffix: '-d',
        
        // directory used when no file-path is specified
        globalDir: '',
                
        // create a parent directory with the same name, e.g.:
        // yo moda:d bla 
        // => bla/bla-d.js for true
        // => bla-d.js for false
        createDirectory: true
    },
    controller: {
        suffix: '-c',
        
        // extensions for the name of the component, e.g:
        // yo moda:c bla 
        // => Controller-name = 'BlaCtrl'
        nameSuffix: 'Ctrl',
        globalDir: '',
        createDirectory: true,
    },
    service: {
        suffix: '-s',
        globalDir: '_main/global-services'
    },
    factory: {
        suffix: '-f',
        globalDir: '_main/global-services'
    },
    filter: {
        suffix: '-filter',
        globalDir: '_main/global-filters'
    },
    provider: {
        suffix: '-p',
        globalDir: '_main/global-services'
    },
    decorator: {
        suffix: '-decorator',
        globalDir: '_main/global-services'
    },
    mod: {
        // there are also prefixes available
        prefix: '_',
        createDirectory: true
    }
}
```

You can also [use your own templates](#custom-templates)!

## default file pre- and suffixes
To distinguish files (e.g. in your awesome file searcher) they're su- and prefixed by the following rules:
```
_*/             : main app directories main and route
are prefixed to be shown on top
_*.js           : angular module, prefixed like this to be
loaded first by file-injection
*.spec.js       : unit tests of all kind
*.e2e.js        : end to end tests
*-c.js          : controller
*-c.html        : controller-template
_*-c.scss        : route-specfic (usually page-level) styles
*-d.js          : directive
*-d.html        : directive-template
_*-d.scss        : directive-specific (usually component-level) styles
*-f.js          : factory
*-s.js          : service
*-p.js          : provider
*-filter.js     : filter
*-decorator.js  : decorator
```

## ./ structure
This is a list of files which get create by `moda:app` at the root level
```
.bowerrc
.editorconfig
.gitignore
.jshintrc
.travis.yml
bower.json
config.xml
gulpfile.js
karma.conf.js
karma-e2e.conf.js
package.json
README.md
app/
    index.html
    bower_components/  // ignored
    fonts/
    images/
    styles/
        _variables.scss
        main.scss // should not be edited manually as
                     it is used for importing all files
        mixins/
        functions/
        placeholders/
        base/
            _buttons.scss
            _fonts.scss
            _forms.scss
            _icons.scss
            _lists.scss
            _page.scss
            _tables.scss
            _typography.scss
    scripts/
      _app.js
      _app.spec.js
      routes.js // if using ui.router
      routes.spec.js // if using ui.router
      _routes/ // if using ui.router
e2e-tests/
    po/         // page-objects
    example.e2e.js
node_modules/ // ignored
tasks/
    build.js
    config.js
    cordova.js
    deploy.js
    dev.js
www/          // dist folder - ignored
```
 
## <a name="setup-hybrid-build">Setting up the hybrid build
Compiling your app to a hybrid app requires a little bit of configuration and you need to have cordova installed. Fortunately [that is quite easy](http://cordova.apache.org/docs/en/4.0.0/guide_cli_index.md.html#The%20Command-Line%20Interface).

If everything is in place, you need to add the platforms you want to build your app on. For Android you would run:
```
cordova platform add android
```
If you get the message  `Current working directory is not a Cordova-based project` you need to create the www-folder first (e.g.: `mkdir www` from your projects root directory). 

After that you should build your current state via `gulp build` then you can run `gulp run` or `gulp emulate` to check out your app on your device or in the emulator.

## how to set up your generator to run with intellij, webstorm, phpstorm, etc
Yap, its possible. I wrote a [wiki-article](https://github.com/johannesjo/generator-modular-angular/wiki/How-to-integrate-the-generator-with-Jetbrains-products-on-Ubuntu) on how I did it on Ubuntu with IntelliJ. And for those who didn't know: There is a [video by John Lindquist](https://www.youtube.com/watch?v=KBueufmUgdw) for those of you lucky enough having no path issues with node on your machine.


## <a name="custom-templates">using your own templates

### overwrite templates via .yo-rc.json
Using a simple syntax templates can be overwritten inside the .yo-rc.json:
```
// .yo-rc.json
"subGenerators": {
    "directive": {
        "tpl": {
            // the html file, if any for that sub-generatr
            "tpl": "<div>I love divs</div>"     
            // the test file            
            "spec": "console.log('empty tests are the best');"
            // the main script file
            // notice that all common variables are also 
            // available here
            "script": "angular.module(<%= scriptAppName %>).directive('<%= cameledName %><%= nameSuffix %>',
            "style": ".<%=sluggedName %>{color:green}
        }
    }
}
```
### overwrite templates via `customTemplatesPath`
If you want to make more than some small adjustments, than you might prefer setting a custom template path.
The `customTemplatesPath` can be specified from the project root directory (which is determined by where the .yo-rc.json is)
```
"customTemplatesPath": "yo-rc-templates"
```
or even use a absolute path, e.g.:
```
"customTemplatesPath": "/home/user/barney/templates-that-not-suck"
```

If you place a service.js and a service.spec.js in the `your-app/yo-rc-templates/`-folder. Those templates would be used, instead of default ones. If you do this make sure that [all the files](https://github.com/johannesjo/generator-modular-angular/tree/master/templates/app) of the sub-generators you want to use are present there.


### variables available in templates
The templates are compiled via [underscore templates](http://underscorejs.org/#template). There are some additional variables available which might be useful to you:

*  `<%= cameledName %>`: cameled name, e.g.: `yo moda:s test-name` would return `testName` 
*  `<%= classedName %>`: classed name, e.g.: `yo moda:s test-name` would return `TestName` 
*  `<%= sluggedName %>`: slugged name, e.g.: `yo moda:s test-name` would return `test-name` 
*  `<%= dashedName %>`: dashed name, e.g.: `yo moda:s test-name` would return `test-name` 
*  `<%= nameSuffix %>`: the suffix defined for the current template in the .yo-rc.json, e.g.: `yo moda:c test-name` would return `Ctrl` with the default config
*  `<%= svcName %>`: the full name of a service created with `yo moda:c` or `yo moda:d`, e.g.: `yo moda:d test-name` would return `TestName` with the default settings. 
*  `<%= scriptAppName %>`: name of the app as used in the module declaration of the _app.js
*  `<%= createdFiles %>`: an array with objects with the created files and the used templates by the current sub-generator

In addition you can use basically all variables set in the .yo-rc.json. If you want to define your own ones it is smart to use a specific property for that, e.g.
```
// .yo-rc.json
{
    // basic config vars
    // ...
    "yourVariables": {
        "someVar": "someVal",
        "someOtherVar": "someVal",
    }
}
```
