
Bootstrap Theme Editor allows live modification of Bootstrap themes so that you can customise them easily.
There is an example page provided (`build/example/index.html`) which makes it easy to see it in action!

There is also a Live demo which can be found at:
`http://demo.ilikeprograms.com`

The example demo page has a User Interface which has panels where you can change the different parts
of bootstrap by using color pickers to change the styling. Simple and Easy.

The included files can be distributed and used in other projects to provide live editing functionality for Bootstrap.

## Quick Start

- Download the Project by either `cloning` or `forking`. (Then CD into BootstrapThemeEditor)
- Install dependencies by running `npm install` and `bower install`
- Run `Grunt` to build the files and open the example demo page in the browser
- Take a look at the demo!

## What is Supported?

At the moment, the following Components can be styled directly:

- [x] Base Styles
- [x] Dropdowns
- [ ] Inputs/Forms
- [x] Links/Nav
- [x] Navbars
- [x] Breadcrumbs
- [ ] Pagination
- [ ] Labels
- [ ] Badges
- [x] Jumbotron
- [x] Page Header
- [ ] Thumbnails
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

It will also automatically host a localhost server at http://localhost:9000/example which will host `the build/example/index.html` page
and open a tab in the browser at the address. It will also watch for changes to the source file and automatically rebuild for you,
if any changes are made.

### Changing/Viewing Docs Files

The docs are powered by `jekyll` and `Github pages`. When the project is build, the dist files are copied to the docs folder, that the build files can be used in the Live demo.  

To preview the Live demo to test them, run the following command from the command line:
```
jekyll --serve --base-url=
```

Then go to the browser and go to the url:  
`http://localhost:4000`

## Theme Editor Options

There are options that can be provided when a ThemeEditor instance is created and are as follows:

## Theme Editor Options

There are options that can be provided when a ThemeEditor instance is created and are as follows:

### Misc

Miscellaneous Options

{:.table .table-bordered .table-striped .default}
| Field   | Type     | Default            | Desc                                       |
| -----   |:--------:| ------------------ | ------------------------------------------ |
| delay   | `number` | 750 (milliseconds) | Milliseconds delay between refresh updates |

### Theme

Location to find the theme file to start editing (If editing existing theme).

{:.table .table-bordered .table-striped .default}
| Field | Type     | Default | Desc                         |
| ----- |:--------:| ------- | ---------------------------- |
| url   | `string` |         | URL to locate the theme file |

### Download

The download link provided the ability to download the theme changes as a json file.  
The DOM node to append the download link, the id and the text of the link can be customised.

{:.table .table-bordered .table-striped .default}
| Field  | Type     | Default                | Desc                                                  |
| ------ |:--------:| ---------------------- | ----------------------------------------------------- |
| append | `string` | body                   | Query selector of DOM element to append download link |
| id     | `string` | download_theme_link    | ID attribute to set on the download link              |
| text   | `string` | Download Theme         | Text content for the download link                    |

### Save

The save link provided the ability to send the theme changes to an URL.  
The DOM node to append the save link, the id and the text of the link can be customised.  

The url and method can be provided to alter the HTTP method and the location the changes are send. 

An optional success callback can also be provided to fire when the changes have been successfully received by the remote URL.

{:.table .table-bordered .table-striped .default}
| Field          | Type       | Default         | Desc                                              |
| -------------- |:----------:| --------------- | ------------------------------------------------- |
| append         | `string`   | body            | Query selector of DOM element to append save link |
| url (required) | `string`   |                 | URL to send the modified theme changes            |
| method         | `string`   | `POST`          | HTTP method for the save request                  |
| callback       | `function` |                 | Optional success save callback                    |
| id             | `string`   | save_theme_link | ID attribute to set on the download link          |
| text           | `string`   | Save Theme      | Text content for the download link                |

#### Example

```
<!-- Load our Fancy live editing ThemeEditor -->
<script src="../bsThemeEditor-0.2.0.min.js"></script>
<script>
  var themeEditor = new ThemeEditor(less, {
    delay: 2000,
    theme: {
      src: 'theme.json'
    },
    download: {
      append: '#download-panel-footer'
    },
    save: {
      append: '#download-panel-footer',
      url: "http://localhost:9000/example/",
      callback: function () {
        alert('Theme modifications have been saved');
      }
    }
  });
</script>
```

## Contributing

I will happily accept contributions in any form, even if its just suggestions and I will have to work on them! Feel free to fork and submit a pull request.