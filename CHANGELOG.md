Changelog
=========

The Changelog will detail the changes to the project.
Minor commits will probably be included, and groups of changes may be combined
into a general description. So the changelog doesnt become too large.

The intent is so that people can look at the changelog and roughly see whats changed,
without getting into too much detail.

## [0.10.0]

- [Package] Updated Cluckles to v0.10.0
- [Export] Added Google Analytics Tracking for Download Buttons. Close #14
- [Docs] Added Permalinks/Updated pages to use friendly URL's
- [Import] removed `customStylesHeader` as it isn't needed
- [Processor] Allowing matching `[]` in `cssSelectorRegex`
- [Docs] Added UA Events to Index Buttons
- [Example] Added delete buttons to all modifier inputs
- [Example] Changes Navbar component's to use container-fluid, and added navbar-text example
- [ThemeModifier] Added delete support

## [0.9.0]

- [Package] Updated Cluckles to 0.9.0
- [Docs] Added nice hover styles to `#introJumbo .btn-primary`
- [Docs] Added introJumbo ID to homepage  jumbotron
- [Docs] Removed unused CSS from theme, and indented theme.json custom css
- [Processor] Stopped concatenating css with customCss in postProcessor, this was causing duplication of customCss
- [Export] Passing this.compiledCss to generateBlob in generateCssBlob 
- [Docs] Moved navigation github link to end, added options link
- [Docs] Removed `style.css` as its exported by chuckles
- [Docs] Added options page
- [Docs] Improved meta titles/descriptions of pages
- [Docs] Set `embedSelector` for docs site as it is using an embedded iframe (as per Options update)
- [Docs] Renamed readme.md to options.md as it now only contains cluckles options
- [Docs] Moved table classes script to table-striped-script.html
- [Docs] Moved contributing/licence section from ready to index-extra.html
- [Docs] Put About page Jumbotron contents in `container-fluid`
- [ClucklesEditor] Firing window.rezise event on initial setup to set initial height for embedded editor
- [Readme] Documented `embedSelector` option.
- [ClucklesEditor] Added the `setupEmbed` method which sets up the window.onresize event to make the editor responsive if embedded in an object/iframe
- [Docs] Removed #demoJumbotron css and added forkme to theme.json
- [Docs] Changed navbar to fixed, so navbar is always at top when scrolling
- [Docs] Added IE compatibility and viewport metatarsi to demoiframe
- [Docs] Moved Iframe alert to start of demo iframe
- [Docs] Moved forkme ribbon to include file, added forkme class to img
- [Package] Updated Bootstrap less files

## [0.8.0]

- [Import] Fixed theme import bug
- [Docs] Updated Docs theme
- [Cluckles] Fixed Undo/redo not working properly
- [Docs] Fixed font being put into docs/assets/fonts folder
- [Docs] Added alert asking for feedback on iframe
- [Docs] Added demoJumbotron id to Demo header jubotron
- [Docs] Moved Cluckles editor into separate iframe, it now is styled independently of the main page
- [Process] Removed not matching .container* as its not needed
- [Cluckles] Removed `notSelector` in favour of an iframe, replaced method calls with `removeScopeSelector`
- [Processor] Added `removeScopeSelector` method to remove the scope selector from the CSS.
- [Export] Now only applying the :not selector to custom Less output and not custom css aswell
- [Import] Setting `type` for data-clucklesCustomStyle attribute applied to the custom style tags
- [Cluckles] Moved finding Stylesheets/less path to Cluckles from import
- [Docs] Changed `Try the Demo` to `Create a Theme` in main buttons
- [Docs] Added new features info
- [Import] Now supports @import syntax in custom less, will prefix it with less path so imports work
- [Bootstrap.less] Removed theme.less import, in favour of allowing it to be dynamically added later
- [Example] Added Info alerts with info about new features
- [Processor] Added ignoring `.container*` to `cssSelectorRegex`, changed to RegExp object not literal
- [Variables] Updated variables file with the bootstrap variables file
- [Import] Adding transformed vars to (less) style tags so that less will use them while processing custom Less
- [Import] Finding Less output stylesheet and inserting style tags after it, if found
- [Processor] Accommodated JSHint warnings
- [JsHint] Added `Event` to Globals
- [Import] Stop refreshing in `handleThemeImport` when calling loadComponentModifiers as it would process every iteration
- [Import] Added support for importing .less files, and attempts to parse them for variables (assumes importing variables.less)
- [Import] Added `parseVariablesFile` to allow variables.less files to be processed into modifiers
- [Import] Storing `_extra` object of themes on initial theme import (from theme.json when page loads)
- [Cluckles] Removed resetToBootstrap method
- [Export] Using `notSelector` when generating CSS blob
- [Processor] Added processor to handle all style/modifier processing
- [Grunt] Now building the updated bootstrap/less files
- [Deps] Updated bootstrap to ~3.3.0
- [Navbar] Prefixed variables with @
- [ThemeModifier] Improved value setting, and now Tracking/Cascading variables to/from parent variables
- [Import] Resetting to default before File import
- [Cluckles] Added `refreshCustomStyles` method and calling from `queueModifications`
- [Import] Moved check for theme `src` inside `parseThemeFile` method
- [ThemeModifier] Added `findParentVariableValue` method, to find the parent value by passing a variable name and the modifiers object
- [Cluckles] Moved `resetToTheme` to `resetToModifiers`, and passing `resetToTheme` to `resetToModifiers`
- [Import] Moved importing theme extra to `importThemeExtra` method
- [Import] Fixed `this.loadComponentModifiers` line to import correctly.
- [Cluckles] Removing CustomStyles on `reset`

## [0.7.0]

- [Docs] Added `z-index` to Homepage fork me ribbon
- [Docs] Updated Scope and child options to correctly work with custom css/less
- [Docs] Improved the Project Intro in Homepage/About
- [Docs] Removed btn styles from latest dist button on homepage
- [Docs] Stopped external link icon from being added to `.btn`. Thanks time shifter.
- [Docs] Completely redesigned the Docs theme
- [Docs] Added `z-index` to forkme ribbon, makes it appear over the navbar
- [Docs] Added `.navbar-static-top` to navigation
- [Docs] Changed demo-base title seperator to |
- [Editor] Added the Custom Section and updated import.js to insert into the Css/Less collapse panels
- [Readme] Documented the options.scope and scope.customCss and scope.customLess options
- [Grunt] Improved Grunt watch
- [Cluckles] Added Ability to add custom Less/Css to themes

## [0.6.2]

- [ClucklesEditor] Fixed replacing `body` with scope selector

## [0.6.1]

- [ClucklesEditor] Fixed @headings-small-color not being prefix properly

## [0.6.0]

- [Docs] Updated Theme
- [Docs/Readme] Added Bower info
- [Docs] Using CDN for Font Awesome to 4.2.0
- [Example] Added `scope` option to example Cluckles usage
- [Options] Added `undoSize` options to control Undo History size.
- [JShint] Added alert/FileReader globals as they are used.
- [ClucklesEditor] Improved PostProcessor Regex to include a/ul/li/body/h* small
- [Grunt] Split Grunt Tasks into Modular tasks
- [Example] Added Toolbar template, with buttons to perform Reset/ResetToTheme/Undo/Redo
- [ClucklesEditor] Added automatic Undo/Redo functionality
- [ClucklesEditor] Changed readyState to canRefresh and changed to Boolean type
- [import.js] Added File import to import modifiers from json files
- [ThemeModifier] Added `val !== null` check in `setupDataBinding`, this makes sure we don't have a null value with a suffix. Which would cause less compilation issues.
- [ClucklesEditor] Added `resetToTheme` method to reset cluckles with the modifiers in provided by the theme.src option
- [ClucklesEditor] Added `resetToDefault` method to reset cluckles to default bootstrap
- [ClucklesEditor] Added `resetComponents` method to reset all components and subscribers
- [Import.js] Storing theme modifiers in `themeModifiers` on parsing theme from options
- [ClucklesEditor] Allowing `applyModifications` to accept custom modifications as a param
- [ClucklesEditor] Moved generateJsonBlob to postProcessor callback
- [ThemeModifier] Added `resetModifiers` method to reset all the component variables and subscribers
- [Misc] Fixed `@state-base-bg` variable property
- [Grunt] Removed Duplicate copy line
- [Components] Made dropdown/modal use specific ID's, so they fix will apply even when chuckles scope option is used
- [CSS] Removed redundant docs/example.css
- [Example] Changed to navbar-fixed-top, makes example.css redundant
- [CSS] Moved Example fix css to component-example-fix.css, changed classes to IDs for specificity

## [0.5.0]

- [ClucklesEditor] Added Scope option, prefixes CSS with scope selector
- [themeModifier] Handling unit suffix, added unit to API methods, suffixUnit flag to apply suffix to value
- [License] Changed Cluckes to MIT License!
- [Src] Improved Consistency with API and JSDocs
- [ThemeModifier] Added loadModifiers method to load them modifiers into the component
- [Src] Custom theme.less to remove extra btn-default styles
- [ClucklesEditor] Added components array, to contain all the component editor instances.
- [Import.js] Added import.js to handle importing (moved parseThemeFile to import.js)
- [CluckesEditor] Improved JSDocs in export.js
- [Docs] Added docs.css
- [Example] Moved example.css to css dir, copying to docs assets folder
- [Example] Moved Tooltip/popover fix in JS file, using in docs aswell
- [Docs/Example] Added Flattr support, improved donation information
- [Docs] Fixed navbar collapse, no fork ribbon on small/xs screen size
- [Editor] Renamed ThemeEditor to CluckledEditor
- [ThemeEditor] Changed bsThemeEditor.js to cluckles.js
- [Src] Improved concatenation, stopped window polution
- [Example] Non-pluralised Example/Editor files
- [ThemeEditor] Lowercases/non pluralised JS files
- [Example] Improved download panel information
- [Example] Changed some inputs to numbers, and added placeholders and limits
- [Variables] Added @brand-default related vars for consistency
- [ThemeEditor] Added TWDB to the JS editor files.
- [Example] Removed Pager Active Color/Background from editor. Unused by Bootstrap.
- [Example] Added Default Branding/Formstate support
- [Example] Added Button Hover Border Color support
- [Example] Changed Editor templates to use Two way data binding
- [label.js] Renamed label-base.js to label.js
- [theme-modifier] Added Two Way Data binding
- [Docs] Added Page Header and Headings Small color in theme files
- [typography] Added Headings Small, Text muted, abbr border color support
- [misc.js] Added Page Header Border Color support

## [0.4.0]

- [Docs] Configured Google (Universal) Analytics
- [Docs] Updated meta titles/descriptions.
- [Docs] Added gittip, tagversion and licence in _config
- [Docs] Updated title, base url, github in _config
- [Docs] Rm QuickStart and Getting Started from Readme
- [Docs] Added demo-base.html layout for demo page
- [Docs] Rm bootstrap.less and example.css from base
- [Docs] Copying all Less files from Build
- [Docs] Updated Components/Editor in Demo page
- [Docs] Copying Components/Editor to Docs
- [Example] Building Components/Editor files.
- [Docs] Added Description Jumbotron to Demo page
- [Docs] Added Cluckles logo asset
- [Docs] Added theme.json file in sync with docs theme
- [Docs] Fixed themeEditor theme.json filepath
- [Docs] Added About Page
- [Docs] Added common.js asset
- [Docs] Added theme and style.css assets
- [Docs] Added Showcase section
- [Docs] Added Getting started Section
- [Docs] Improved Jumbotron and content
- [Docs] Improved footer/added more useful links
- [Docs] Added fa icons to Navigation items
- [Docs] Added apple touch and favicon
- [Example] Added Default table to Grayscale branding
- [Example] Changed Editor/Example ordering
- [Example] Improved Examples/Editors formating/comments
- [Example] Improved page formatting/comments
- [Readme] Updated Supported Components section
- [Example] Swapped Editor/Examples Columns order
- [Misc] Removed headingsColor from misc.js and editor
- [typography.js] Added Typography editing support
- [form.js] Added Form editing support
- [blockquote.js] Added Blockquote editing support
- [code.js] Added Code editing support
- [carousel.js] Added Carousel editing support
- [badge.js] Added Badges editing support
- [thumbnail.js] Added Thumbnail editing support
- [modal.js] Added Modal editing support
- [popover.js] Added Popovers editing support
- [tooltip.js] Added Tooltip editing support
- [navs.js/pills.js] Added Navs/Pills editing support
- [navs.js] Added Navs editing support
- [label.base.js] Added Label editing support
- [button/button.base] Added Button editing support
- [export.js] Added save.formats options to configure export formats
- [Example] Fixed navbar to top. Fixed left side column with scrolling.
- [Example] Added badges, carousel, labels examples.
- [Example] Added `collapse in` to jumbotron editor. Fixed it not collapsing.
- [Example] Added table editor and component templates
- [ThemeEditor] Added Table support (table.js)
- [Example] Moved example components/example/page elements to example/templates
- [Example] Using htmlbuild to process index.html
- [Grunt] Added examplesrc variable to hold example-src folder location
- [Example] Moved example.css to example-src/css
- [Grunt] Added the htmlbuild task, configured config.
- [Vars] Made `@state-primary-border` consistent with other styles
- [Docs] Styling tables in JS :(
- [Docs] Added syntax.css for Pygments highlighting
- [Config] Using redcarpet markdown, enabled pygments
- [Options] Added export options and updated Docs/Readme.
- [Readme] Added Licence Section.
- [Docs] Improved Proj Desc, added titles for links.
- [Docs] Improved Licence description.
- [Example] Fixed build/js paths.

## [0.3.0]

- [Readme] +features, demo, docs instrucs, Misc Options and Example usage.
- [ThemeEditor] Added Breadcrums support.
- [Example] Added Nab Tabs/Pills example section.
- [misc.js] Added link color/hover and border radius base support.
- [jumbotron.js] Added support for Jumbotron padding.
- [navbar.base.js] Added NavbarBase to change Navbar defaults.
- [panel.base.js] Added PanelBase to a change Panel defaults.
- [ThemeEditor] Improved configuring this.modifiers.
- [ThemeEditor] Improved getModifiers by adding method to extract modifications from ThemeModifier subclasses.
- [ThemeEditor] Added misc.js to hold misc modifications. Added @hr-border modification support.
- [Vars] Added @state-primary-{type} vars, based @panel-primary-{type} vars on them.
- [ThemeEditor] Added delay between refreshed, delay option to control delay duration in milliseconds
- [Grunt] Uglify builds from concatenated files instead of source for ThemeEditor
- [Grunt] Added Contrib task to concatenate files.
- [gh-pages] Added gh pages branch
- [Misc] Other minor changes before hand which I forgot to keep track off

## [0.2.0]

- Minor Readme improvements
- Added Theme Editor Options to Readme file
- Added ability to save themes by providing a URL to send theme changes to.