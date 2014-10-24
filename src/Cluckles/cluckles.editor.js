    /**
     * ClucklesEditor class holds the modifications to the less theme using sub classes
     * which hold information about the modifications, for each different part of the theme.
     * Such as branding, base colors, navbar, etc etc. These modifications can then be
     * retrieved or applied to the current page.
     * 
     * @class ClucklesEditor
     * 
     * Generic Options:
     * - scope:     {string} The CSS Selector to prefix the Compiled CSS selectors with.
     * - delay:     {Number} Milliseconds delay between refresh updates (Default: 750).
     * - undoSize:  {Number} Number of items to keep in the Undo history (Default: 10)
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
         * @property canRefresh {Boolean} Tracks whether or not another refresh can be performed. (true = can refresh, false = cant refresh).
         * @property delay {Number} Milliseconds delay between refresh updates (Default: 750).
         */
        this.refreshMonitor     = {
            canRefresh: true,
            delay:      options.delay || 750
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
        this.modifiers      = {};
        
        // Undo/Redo stacks
        this.undoButton     = document.querySelector('*[data-cluckles-options="undo"]');
        this.redoButton     = document.querySelector('*[data-cluckles-options="redo"]');
        this.undoStack      = [];
        this.redoStack      = [];
        this.canTrackUndo  = true;

        // Import/Export Management
        this.export         = new Export(this, options.export);
        this.import         = new Import(this, options.theme);

        // Configure the Post Processor for when Less finished Processing Changes to the Theme
        this.setupPostProcessor(this.lessGlobal);

        // Configure the Options toolbar
        this.setupToolbar();
        
        // Disable the Undo and Redo buttons by default (will re enable when something is changed)
        if (this.undoButton) {
            this.undoButton.setAttribute('disabled', 'disabled');
        }

        if (this.redoButton) {
            this.redoButton.setAttribute('disabled', 'disabled');
        }
    };
    
    /**
     * Sets up a Callback for the Less#postProcessor callback.
     * 
     * @param {Object} less The Global less object.
     * 
     * @returns {undefined}
     */
    ClucklesEditor.prototype.setupPostProcessor = function (less) {
        var cssSelectorRegex = /((?:(?:[#.]|(?:^\w{0}a(?!\w)|ul|li))[\w->:.\s]+)+)(?=[,\{])/mg,
            prefixedCss;

        // Provide less with the postProcessor callback we want to execute
        less.postProcessor = function (css) {
            // Generate/Regenerate both of the Download button Blob contents
            this.export.generateCssBlob(css);
            this.export.generateJsonBlob();
            
            // If the Scope option was provided, we want to prefix all the
            // CSS selectors with our scope, so the theme changes are only
            // applied to the DOMElement we choose and its children
            if (this.options.hasOwnProperty('scope')) {
                // Use the regex above, $& prefixes the CSS selectors with our scope selector
                prefixedCss = css.replace(cssSelectorRegex, this.options.scope + ' $&');

                // Replace body with the scope selector, stops the body background leaking
                prefixedCss = prefixedCss.replace(/^body/, this.options.scope);
                // Prefixes the h* small, .h* small h* .small etc with the scope selector
                prefixedCss = prefixedCss.replace(/\.?h\d{1} \.?small/mg, this.options.scope + ' $&');

                // Store the replaced css, just incase someone needs it
                this.replacedCss = prefixedCss;

                return prefixedCss;
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
        if (this.refreshMonitor.canRefresh === true) {
            this.applyModifications();
            
            // Set the state to not ready for more updates yet
            this.refreshMonitor.canRefresh = false;
            
            // Set a timeout to allow updated again after x time (refreshMonitor.rate)
            // and apply the modifications that were pending
            setTimeout(function () {
                this.applyModifications();

                // Allow updates again
                this.refreshMonitor.canRefresh = true;
            }.bind(this), this.refreshMonitor.delay);
        }
    };
    
    /**
     * Applies the Modifications to the Less Theme.
     * 
     * @returns {undefined}
     */
    ClucklesEditor.prototype.applyModifications = function (modifications) {
        // Allow the function to accept custom modifications
        var modifiers = modifications || this.getModifiers();

        // Now apply the Modifications to the Theme
        this.lessGlobal.modifyVars(modifiers);
    };
    
    /**
     * Stores the Most up to date set of Modifiers in the Undo Stack.
     * 
     * @returns {undefined}
     */
    ClucklesEditor.prototype.pushUndoStack = function () {
        // If we cant track the state, such as when undo/redoing
        if (this.canTrackUndo === false) { return; }

        var undo                = this.undoStack,
            clonedModifiers     = {},
            originalModifiers   = this.modifiers;

        // We have performed a new action, so we invalidate the ability to redo previous
        // undo's, so reset the redo stack
        this.redoStack = [];

        // If the Stack has 10 or more items
        if (undo.length > (this.options.undoSize - 1 || 9)) {
            // Remove the first item (oldest) from stack
            undo.shift();
        }

        // Now clone the existing modifiers (this.modifiers)
        clonedModifiers = Object.keys(this.modifiers).reduce(function (clone, variable) {
            clone[variable] = originalModifiers[variable];
            return clone;
        }, clonedModifiers);

        // Now push the clone (newest item) to the Stack (undoStack)
        undo.push(clonedModifiers);

        if (this.undoButton && this.undoButton.hasAttribute('disabled')) {
            this.undoButton.removeAttribute('disabled');
        }
    };

    /**
     * Updates the Cluckles modifiers with the newest item from either
     * the undo or redo stacks, depending on direction.
     * 
     * @param {string} direction The direction to pull modifiers from (undo/redo(
     * 
     * @returns {undefined}
     */
    ClucklesEditor.prototype.applyModificationRevision = function (direction) {
        var stack           = direction === 'undo' ? this.undoStack     : this.redoStack,
            stackButton     = direction === 'undo' ? this.undoButton    : this.redoButton,
            altStack        = direction === 'undo' ? this.redoStack     : this.undoStack,
            altStackButton  = direction === 'undo' ? this.redoButton    : this.undoButton,
            poppedStack;
    
        // Disable the Undo button if there is nothing to undo
        if (stackButton && stack.length <= 1) {
            stackButton.setAttribute('disabled', 'disabled');
        }

        // If the undo/redo stacks are empty, dont continue
        if (stack.length === 0) {
            return;
        }

        // Disallow modifications to be tracked/applied automatically
        this.canTrackUndo = false;
        this.refreshMonitor.canRefresh = false;

        // Reset the Modifiers and Components
        this.modifiers = [];
        this.resetComponents();
        
        // Pop the newest item of the top of the stacj
        poppedStack = stack.pop();

        // If we are undoing, we want to load the second to last item in the stack (last item already popped)
        if (direction === 'undo') {
            this.import.loadComponentModifiers(stack[stack.length - 1]);
        } else {
            // If we are redoing, we want to load the item we popped
            this.import.loadComponentModifiers(poppedStack);
        }

        // Move the newest items from one stack to the other
        altStack.push(poppedStack);

        // Now apply the modifications to update the UI (will also set modifiers again)
        this.applyModifications();

        // Allow modifications to be tracked/applied automatically
        this.canTrackUndo = true;
        this.refreshMonitor.canRefresh = true;
        
        // Now enable the altStackButton, effectively toggling the Undo/Redo buttons,
        // depending on which one has items in their stack
        if (altStackButton && altStackButton.hasAttribute('disabled')) {
            altStackButton.removeAttribute('disabled');
        }
    };
    
    /**
     * Undo's modifications which have been applied and moved the newest modifications
     * to the redoStack.
     * 
     * @returns {undefined}
     */
    ClucklesEditor.prototype.undo = function () {        
        this.applyModificationRevision('undo');
    };
    
    /**
     * Redo modifications that were pushed into the redoStack after applying an undo.
     * 
     * @returns {undefined}
     */
    ClucklesEditor.prototype.redo = function () {
        this.applyModificationRevision('redo');
    };

    /**
     * Resets the current Theme to the Bootstrap default (or whatever .less file the browser
     * has loaded e.g. <link type="text/css" href="../less/bootstrap.less" rel="stylesheet/less" />)
     * including any modifications which have been stored, and resets the editor inputs.
     * 
     * @returns {undefined}
     */
    ClucklesEditor.prototype.resetToDefault = function () {
        // Remove all stored modifications
        this.modifiers = {};
        this.undoStack = [];
        this.redoStack = [];

        // Disable the Undo and Redo buttons when resetting to Default
        if (this.undoButton && !this.undoButton.hasAttribute('disabled')) {
            this.undoButton.setAttribute('disabled', 'disabled');
        }

        if (this.redoButton && !this.redoButton.hasAttribute('disabled')) {
            this.redoButton.setAttribute('disabled', 'disabled');
        }

        // Reset all the Components
        this.resetComponents(); 

        // Now make less modify blank changes, resetting the Theme
        this.applyModifications({});
    };


    /**
     * Resets the current Theme to the Theme which was imported by providing the
     * theme.src option (including resetting the components/subscribers).
     * 
     * @returns {undefined}
     */
    ClucklesEditor.prototype.resetToTheme = function () {
        // Copy the current undoStack
        var currentUndoStack = this.undoStack.slice(0);

        // Reset to the Defaults, so we dont get weird hangover between the theme
        // and new modifications
        this.resetToDefault();

        // Disallow modifications to be tracked/applied automatically
        this.canTrackUndo    = false;
        this.refreshMonitor.canRefresh  = false;

        // Now import the theme modifiers (from the theme.json file { theme: 'theme.json' })
        this.import.loadComponentModifiers(this.import.themeModifiers);

        // Now apply the theme modifiers which were reset to the theme
        this.applyModifications();
        
        // Restore the undoStack (resetToDefault clears the stacks)
        this.undoStack = currentUndoStack;
        // Push the modifiers from the Theme onto the undo stack
        this.pushUndoStack();

        // Allow modifications to be tracked/applied automatically
        this.canTrackUndo = true;
        this.refreshMonitor.canRefresh = true;
    };
    
    /**
     * Reset all of the Components and their Subscribers.
     * 
     * @returns {undefined}
     */
    ClucklesEditor.prototype.resetComponents = function () {
        // Disable modification queuing
        this.refreshMonitor.canRefresh = false;

        this.components.forEach(function (component) {
            if (component instanceof ThemeModifier) {
                component.resetModifiers();
            }
        });

        // Allow modification queuing
        this.refreshMonitor.canRefresh = true;
    };
    
    ClucklesEditor.prototype.setupToolbar = function () {
        var resetButton         = document.querySelector('*[data-cluckles-options="reset"]'),
            resetThemeButton    = document.querySelector('*[data-cluckles-options="reset-theme"]');

        if (resetButton) {
            resetButton.addEventListener('click', this.resetToDefault.bind(this), false);
        }

        if (resetThemeButton) {
            resetThemeButton.addEventListener('click', this.resetToTheme.bind(this), false);
        }

        if (this.undoButton) {
            this.undoButton.addEventListener('click', this.undo.bind(this), false);
        }

        if (this.redoButton) {
            this.redoButton.addEventListener('click', this.redo.bind(this), false);
        }
    };

    window.ClucklesEditor = ClucklesEditor;