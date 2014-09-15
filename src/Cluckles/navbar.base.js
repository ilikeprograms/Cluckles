    /**
     * Allows modification of the General Navbar Component Styling.
     * 
     * @class NavbarBase
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
     * 
     * @property {string} height            The @navbar-height variable which sets the Height of Navbar Components.
     * @property {string} marginBottom      The @navbar-margin-bottom variable which sets the Margin Bottom of Navbar Components.
     * @property {string} borderRadius      The @navbar-border-radius variable which sets the Border Radius of Navbar Components.
     * @property {string} collapseMaxHeight The @navbar-collapse-max-height variable which sets the Max Height of the Navbar Collapse Components.
     * 
     * @returns {NavbarBase}
     */
    var NavbarBase = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-navbar';

        // Define the Modifiers
        this.height = {
            variable:           '@navbar-height',
            subscribeProperty:  'height',
            suffixUnit:         true,
            changeFn:           this.setHeight.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.marginBottom = {
            variable:           '@navbar-margin-bottom',
            subscribeProperty:  'margin-bottom',
            suffixUnit:         true,
            changeFn:           this.setMarginBottom.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.borderRadius = {
            variable:           '@navbar-border-radius',
            subscribeProperty:  'border-radius',
            suffixUnit:         true,
            changeFn:           this.setBorderRadius.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.collapseMaxHeight = {
            variable:           '@navbar-collapse-max-height',
            subscribeProperty:  'collapse-max-height',
            suffixUnit:         true,
            changeFn:           this.setCollapseMaxHeight.bind(this),
            subscribers:        [],
			_value:             null
        };
        
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            height:             this.height,
            marginBottom:       this.marginBottom,
            borderRadius:       this.borderRadius,
            collapseMaxHeight:  this.collapseMaxHeight
        };

        this.setupDataBinding();
    };
    
    // Inherit from parent Prototype and preserve constructor
    NavbarBase.prototype                = Object.create(ThemeModifier.prototype);
    NavbarBase.prototype.constructor    = NavbarBase;

    /**
     * Gets the Height of the Navbar Components.
     * 
     * @returns {string}
     */
    NavbarBase.prototype.getHeight = function () {
        return this.modifiers.height.value;
    };

    /**
     * Sets the Height of the Navbar Components.
     * 
     * @param {string} height The Navbar Height to set.
     * @param {string} unit   The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    NavbarBase.prototype.setHeight = function (height, unit) {
        if (unit !== undefined) { this.modifiers.height.unit = unit; }

        this.modifiers.height.value = height;
    };
    
    /**
     * Gets the Margin Bottom of the Navbar Components.
     * 
     * @returns {string}
     */
    NavbarBase.prototype.getMarginBottom = function () {
        return this.modifiers.marginBottom.value;
    };

    /**
     * Sets the Margin Bottom of the Navbar Components.
     * 
     * @param {string} marginBottom The Navbar Margin Bottom to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    NavbarBase.prototype.setMarginBottom = function (marginBottom, unit) {
        if (unit !== undefined) { this.modifiers.marginBottom.unit = unit; }

        this.modifiers.marginBottom.value = marginBottom;
    };

    /**
     * Gets the Border Radius of the Navbar Components.
     * 
     * @returns {string}
     */
    NavbarBase.prototype.getBorderRadius = function () {
        return this.modifiers.borderRadius.value;
    };

    /**
     * Sets the Border Radius of the Navbar Components.
     * 
     * @param {string} borderRadius The Navbar Border Radius to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    NavbarBase.prototype.setBorderRadius = function (borderRadius, unit) {
        if (unit !== undefined) { this.modifiers.borderRadius.unit = unit; }

        this.modifiers.borderRadius.value = borderRadius;
    };
    
    /**
     * Gets the Collapse Max Height of the Navbar Components.
     * 
     * @returns {string}
     */
    NavbarBase.prototype.getCollapseMaxHeight = function () {
        return this.modifiers.collapseMaxHeight.value;
    };

    /**
     * Sets the Collapse Max Height of the Navbar Components.
     * 
     * @param {string} collapseMaxHeight The Navbar Collapse Max Height to set.
     * @param {string} unit              The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    NavbarBase.prototype.setCollapseMaxHeight = function (collapseMaxHeight, unit) {
        if (unit !== undefined) { this.modifiers.collapseMaxHeight.unit = unit; }

        this.modifiers.collapseMaxHeight.value = collapseMaxHeight;
    };