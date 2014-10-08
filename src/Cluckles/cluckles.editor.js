    /**
     * ClucklesEditor class holds the modifications to the less theme using sub classes
     * which hold information about the modifications, for each different part of the theme.
     * Such as branding, base colors, navbar, etc etc. These modifications can then be
     * retrieved or applied to the current page.
     * 
     * @class ClucklesEditor
     * 
     * Generic Options:
     * - scope: {string} The CSS Selector to prefix the Compiled CSS selectors with.
     * - delay: {Number} Milliseconds delay between refresh updates (Default: 750).
     * 
     * @param {Object} less The Global less object.
     * 
     * @property {Export} export Manages the Theme exporting.
     * @property {Typography} typography Holds modifications to the Typography component.
     * @property {Misc} misc Holds miscellaneous modifications to Bootstrap.
     * @property {Table} table Holds modifications to the Table component.
     * @property {Breadcrumb} breadcrumb Holds modifications to the Breadcrumb component.
     * @property {Dropdown} dropdown Holds modifications to the Dropdown component.
     * @property {Tooltip} tooltip Holds modifications to the Tooltip component.
     * @property {Popover} popover Holds modifications to the Popover component.
     * @property {Thumbnail} thumbnail Holds modifications to the Thumbnail component.
     * @property {Badge} badge Holds modifications to the Badge component.
     * @property {Carousel} carousel Holds modifications to the Carousel component.
     * @property {Code} carousel Holds modifications to the Code component.
     * @property {Blockquote} blockquote Holds modifications to the Blockquote component.
     * @property {Modal} modal Holds modifications to the Modal component.
     * @property {Jumbotron} jumbotron Hold modifications to the Jumbotron component.
     * @property {GrayScale} grayScale Holds the modifications to the base gray colors of the Theme.
     * @property {Nav} navs Holds the modifications to the Nav Components.
     * @property {Tab} tab Holds the modifications to the Tab Components.
     * @property {Pill} pill Holds the modifications to the Pill Components.
     * @property {Pagination} pagination Holds the modifications to the Pagination Components.
     * @property {Pager} pager Holds the modifications to the Pager Components.
     * @property {Form} form Holds the modifications to the Form Components.
     * @property {BrandModifier} branding Holds the changes to the Branding colors of the Theme.
     * @property {Label} label Holds the changes to the Label Components.
     * @property {PanelBase} panelBase Holds the changes to the General Panel styling of Panel Components.
     * @property {NavbarBase} navbarBase Holds the changes to the General Navbar styling of Navbar Components.
     * @property {ButtonBase} buttonBase Holds the changes to the General Button styling of Button Components.
     * @property {Object} navbar Holds Navbar instances which control the styling of Navbar Components.
     * @property {Object} buttons Holds Button instances which control the styling of Button Components.
     * @property {Object} formStates Holds FormState instances which control the styling of various components, (Alerts/Panels).
     * @property {ListGroup} listGroup Holds the changes to the ListGroup component.
     * @property {object} modifiers Holds all of the Modifications to the whole theme.
     * 
     * @returns {ClucklesEditor}
     */
    var ClucklesEditor = function (less, options) {
        this.lessGlobal         = less;
        this.options            = options;
        
        /**
         * Monitors the refreshing of the less files, enables it to be blocked for x duration between refreshes. To avoid crashing the brower :).
         * 
         * @property readyState {Number} Tracks whether or not another refresh can be performed. (0 = ready, 1 = on delaying).
         * @property delay {Number} Milliseconds delay between refresh updates (Default: 750).
         */
        this.refreshMonitor     = {
            readyState: 0,
            delay: options.delay || 750
        };

        this.misc               = new Misc(this);
        // Component vars
        this.typography         = new Typography(this);
        this.table              = new Table(this);
        this.breadcrumb         = new Breadcrumb(this);
        this.dropdown           = new Dropdown(this);
        this.tooltip            = new Tooltip(this);
        this.popover            = new Popover(this);
        this.thumbnail          = new Thumbnail(this);
        this.badge              = new Badge(this);
        this.carousel           = new Carousel(this);
        this.code               = new Code(this);
        this.blockquote         = new Blockquote(this);
        this.modal              = new Modal(this);
        this.jumbotron          = new Jumbotron(this);
        this.grayScale          = new GrayScale(this);
        this.nav                = new Nav(this);
        this.tab                = new Tab(this);
        this.pill               = new Pill(this);
        this.pagination         = new Pagination(this);
        this.pager              = new Pager(this);
        this.form               = new Form(this);
        this.branding           = new BrandModifier(this);
        this.label              = new Label(this);
        this.panelBase          = new PanelBase(this);
        this.navbarBase         = new NavbarBase(this);
        this.buttonBase         = new ButtonBase(this);
        this.navbar = {
            'default':            new Navbar(this),
            'inverse':            new Navbar(this, 'inverse')
        };
        this.buttons = {
            'default':            new Button(this, 'default'),
            'primary':            new Button(this, 'primary'),
            'success':            new Button(this, 'success'),
            'info':               new Button(this, 'info'),
            'warning':            new Button(this, 'warning'),
            'danger':             new Button(this, 'danger')
        };
        this.formStates = {
            'default':            new FormState(this, 'default'),
            'primary':            new FormState(this, 'primary'),
            'success':            new FormState(this, 'success'),
            'info':               new FormState(this, 'info'),
            'warning':            new FormState(this, 'warning'),
            'danger':             new FormState(this, 'danger')
        };
        this.listGroup          = new ListGroup(this);

        this.components = [
            this.misc,
            this.typography,
            this.table,
            this.breadcrumb,
            this.dropdown,
            this.tooltip,
            this.popover,
            this.thumbnail,
            this.badge,
            this.carousel,
            this.code,
            this.blockquote,
            this.modal,
            this.jumbotron,
            this.grayScale,
            this.nav,
            this.tab,
            this.pill,
            this.pagination,
            this.pager,
            this.form,
            this.branding,
            this.label,
            this.panelBase,
            this.navbarBase,
            this.buttonBase,
            this.navbar.default,
            this.navbar.inverse,
            this.buttons.default,
            this.buttons.primary,
            this.buttons.success,
            this.buttons.info,
            this.buttons.warning,
            this.buttons.danger,
            this.formStates.default,
            this.formStates.primary,
            this.formStates.success,
            this.formStates.info,
            this.formStates.warning,
            this.formStates.danger,
            this.listGroup
        ];

        // All modifier vars
        this.modifiers = {};

        this.export             = new Export(this, options.export);
        this.import             = new Import(this, options.theme);

        // Configure the Post Processor for when Less finished Processing Changes to the Theme
        this.setupPostProcessor(this.lessGlobal);
    };
    
    /**
     * Sets up a Callback for the Less#postProcessor callback.
     * 
     * @param {Object} less The Global less object.
     * 
     * @returns {undefined}
     */
    ClucklesEditor.prototype.setupPostProcessor = function (less) {
        var cssSelectorRegex = /((?:[#.][\w->:.\s]+)+)(?=[,\{])/mg;

        // Provide less with the postProcessor callback we want to executre
        less.postProcessor = function (css) {
            // Generate/Regenerate both of the Download button Blob contents
            this.export.generateCssBlob(css);
            this.export.generateJsonBlob();
            
            // If the Scope option was provided, we want to prefix all the
            // CSS selectors with our scope, so the theme changes are only
            // applied to the DOMElement we choose and its children
            if (this.options.hasOwnProperty('scope')) {
                // Use the regex above, $& prefixes the CSS selectors with our scope selector
                return css.replace(cssSelectorRegex, this.options.scope + ' $&');
            }
        }.bind(this);
    };

    /**
     * Get the Modifications which have been stored.
     * 
     * @returns {Object}
     */
    ClucklesEditor.prototype.getModifiers = function () {
        var grayScale   = this.grayScale,
            navbar      = this.navbar,
            buttons     = this.buttons,
            formStates  = this.formStates,
            modifiers   = this.modifiers;

        // Gray Base
        Object.keys(grayScale).forEach(function (style) {
            if (grayScale[style].color !== null) {
                if (style === 'gray') {
                    modifiers['@gray'] = grayScale[style].color;
                } else {
                    modifiers['@gray-' + style] = grayScale[style].color;
                }
            }
        });

        // Navbars
        // Itterate over the object to extract modifications for both styles of Navbar's
        Object.keys(navbar).forEach(function (style) {
            var navbarStyle = navbar[style];

            this.extractModifications(modifiers, navbarStyle);
        }, this);

        // FormStates
        // Itterate over the object to extract modifications for each styles of FormState's
        Object.keys(formStates).forEach(function (style) {
            var formStatesStyle = formStates[style];

            this.extractModifications(modifiers, formStatesStyle);
        }, this);

        // Buttons
        // Itterate over the object to extract modifications for each styles of Button
        Object.keys(buttons).forEach(function (style) {
            var buttonsStyle = buttons[style];

            this.extractModifications(modifiers, buttonsStyle);
        }, this);

        // Typography
        this.extractModifications(modifiers, this.typography);

        // Panel Base
        this.extractModifications(modifiers, this.panelBase);

        // Table
        this.extractModifications(modifiers, this.table);

        // Navbar Base
        this.extractModifications(modifiers, this.navbarBase);

        // Button Base
        this.extractModifications(modifiers, this.buttonBase);

        // Misc
        this.extractModifications(modifiers, this.misc);

        // Nav
        this.extractModifications(modifiers, this.nav);

        // Tab
        this.extractModifications(modifiers, this.tab);

        // Pill
        this.extractModifications(modifiers, this.pill);

        // Pagination
        this.extractModifications(modifiers, this.pagination);

        // Pager
        this.extractModifications(modifiers, this.pager);

        // Form
        this.extractModifications(modifiers, this.form);

        // Branding
        this.extractModifications(modifiers, this.branding);

        // Label
        this.extractModifications(modifiers, this.label);

        // Breadcrumb
        this.extractModifications(modifiers, this.breadcrumb);

        // Dropdown
        this.extractModifications(modifiers, this.dropdown);

        // Tooltip
        this.extractModifications(modifiers, this.tooltip);

        // Popover
        this.extractModifications(modifiers, this.popover);

        // Thumbnail
        this.extractModifications(modifiers, this.thumbnail);

        // Badge
        this.extractModifications(modifiers, this.badge);

        // Carousel
        this.extractModifications(modifiers, this.carousel);

        // Code
        this.extractModifications(modifiers, this.code);

        // Blockquote
        this.extractModifications(modifiers, this.blockquote);

        // Modal
        this.extractModifications(modifiers, this.modal);

        // Jumbotron
        this.extractModifications(modifiers, this.jumbotron);

        // List Group
        this.extractModifications(modifiers, this.listGroup);

        return modifiers;
    };

    /**
     * Extracts the Modifications for the particular style/component by using
     * ThemeModifier.prototype.getModifications() and adds them to ClucklesEditor.modifications.
     * 
     * @param {Object} modifiers All of the modifications to the theme.
     * @param {Obejct} modifiersType The object which holds the modifications for a particular style/components.
     * 
     * @returns {undefined}
     */
    ClucklesEditor.prototype.extractModifications = function (modifiers, modifiersType) {
        var modifiersOfType = modifiersType.getModifications();
        Object.keys(modifiersOfType).forEach(function (modifier) {
            var modifierObject = modifiersOfType[modifier];
            modifiers[modifierObject.variable] = modifierObject.value;
        });
    };

    /**
     * Turns the Modifications to the Theme into JSON.
     * 
     * @returns {String}
     */
    ClucklesEditor.prototype.getJSON = function () {
        return JSON.stringify(this.getModifiers());
    };

    /**
     * Applies the modification, or makes the refreshMonitor queue a single update
     * in x milliseconds from now, controlled by this.refreshMonitor.delay.
     * 
     * @returns {undefined}
     */
    ClucklesEditor.prototype.queueModifications = function () {
        // If an update is allowed right now, apply the modifications
        if (this.refreshMonitor.readyState === 0) {
            this.applyModifications();
            
            // Set the state to not ready for more updates yet
            this.refreshMonitor.readyState = 1;
            
            // Set a timeout to allow updated again after x time (refreshMonitor.rate)
            // and apply the modifications that were pending
            setTimeout(function () {
                this.refreshMonitor.readyState = 0;
                this.applyModifications();
            }.bind(this), this.refreshMonitor.delay);
        }
    };
    
    /**
     * Applies the Modifications to the Less Theme.
     * 
     * @returns {undefined}
     */
    ClucklesEditor.prototype.applyModifications = function () {
        this.lessGlobal.modifyVars(this.getModifiers());
    };

    window.ClucklesEditor = ClucklesEditor;