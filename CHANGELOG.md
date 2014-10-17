Changelog
=========

The Changelog will detail the changes to the project.
Minor commits will probably be included, and groups of changes may be combined
into a general description. So the changelog doesnt become too large.

The intent is so that people can look at the changelog and roughly see whats changed,
without getting into too much detail.

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