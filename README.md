Bootstrap Theme Editor
=====================

Boostrap Theme Editor allows live modification of Boostrap themes so that you can customise them easily.
There is an example page provided (index.html) which makes it easy to see it in action!  

The included files can be distributed and used in other projects to provide live editing functionality.

##What is Supported?

At the moment, the following Components can be styled directly:

- [x] Base Styles
- [x] Drodowns
- [ ] Inputs
- [x] Links/Nav
- [x] Navbars
- [ ] Breadcrumbs?
- [ ] Pagination?
- [ ] Labels?
- [ ] Badges?
- [x] Jumbotron
- [x] Page Header
- [ ] Thumbnails?
- [x] Alerts
- [x] Progress Bars
- [x] List Groups
- [x] Panels
- [x] Wells
- [x] Headings
- [x] Body Text Color/Background

## Getting started

To begin, download the repository from Git either by using the *Clone in Desktop* button, or download from Github:

### Downloading

```shell
git clone https://github.com/ilikeprograms/BootstrapThemeEditor
cd BootstrapThemeEditor
```

### Installing the Dependencies

Now you can start to install the dependencies. `Grunt` is used for build the JS files, and `Bower` for the JS files it depends on.
This means that `Node.js` and `NPM` needs to be installed on your system. To get Grunt/Bower to work, run the following commands

```shell
npm install
bower install
```

### Build Files

There should be a *build* directory which contains the `bsThemeEditor-x.x.x.js` file which is the main distribution file.
This can be taken out from the project and will provide the live editing functionality.
It does however rely on the files in `build/js/lib` and `build/less`. The `build/js/lib` files however could be replaced with newer versions and should work ok.
If you have a dependency on a specific version of `jquery` for instance, just replace the file.

### Changing the Build

The files in `src` and `bower_components` directories are used in the Build process to create the files in the `build` directory.
If you change the source files in the `src` directory, you will need to rebuild. `Grunt` is used for the build.

To build the project files just run the `grunt` command from the main directory. This will then make grunt run the default task which will build the files.

## Contributing

I will happily accept contributions in any form, even if its just suggestions and I will have to work on them! Feel free to fork and submit a pull request.

## Licence

This project is licenced under the GPLv3 Licence. The reason being is that I would prefer for people to contribute upstream so everyone can benefit from improvements