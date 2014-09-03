(function (window) {
    "use strict";

    /**
     * Allows modification of the General Navbar Component Styling.
     * 
     * @class NavbarBase
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
     * 
     * @property {string} height The @navbar-height variable which sets the height of Navbar Components.
     * @property {string} marginBottom The @navbar-margin-bottom variable which sets the margin-bottom of Navbar Components.
     * @property {string} borderRadius The @navbar-border-radius variable which sets the border radius of Navbar Components.
     * @property {string} collapseMaxHeight The @navbar-collapse-max-height variable which sets the max height of the Navbar Collapse Components.
     * 
     * @returns {NavbarBase}
     */
    var NavbarBase = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-navbar';

        // Define the Modifiers
        this.height = {
            variable: '@navbar-height',
            subscribeProperty:  'height',
            changeFn:           this.setHeight.bind(this),
            subscribers:        [],
			_value: null
        };
        this.marginBottom = {
            variable: '@navbar-margin-bottom',
            subscribeProperty:  'margin-bottom',
            changeFn:           this.setMarginBottom.bind(this),
            subscribers:        [],
			_value: null
        };
        this.borderRadius = {
            variable: '@navbar-border-radius',
            subscribeProperty:  'border-radius',
            changeFn:           this.setBorderRadius.bind(this),
            subscribers:        [],
			_value: null
        };
        this.collapseMaxHeight = {
            variable: '@navbar-collapse-max-height',
            subscribeProperty:  'collapse-max-height',
            changeFn:           this.setCollapseMaxHeight.bind(this),
            subscribers:        [],
			_value: null
        };

        Object.defineProperty(this.height, 'value', {
            get: function () { return this._value; },
            set: function (val) {
                this._value = val + 'px';
                editor.queueModifications();

                this.subscribers.forEach(function (subscriber) {
                    subscriber.value = val;
                });
            } 
        });

        Object.defineProperty(this.marginBottom, 'value', {
            get: function () { return this._value; },
            set: function (val) {
                this._value = val + 'px';
                editor.queueModifications();

                this.subscribers.forEach(function (subscriber) {
                    subscriber.value = val;
                });
            } 
        });

        Object.defineProperty(this.borderRadius, 'value', {
            get: function () { return this._value; },
            set: function (val) {
                this._value = val + 'px';
                editor.queueModifications();

                this.subscribers.forEach(function (subscriber) {
                    subscriber.value = val;
                });
            }
        });

        Object.defineProperty(this.collapseMaxHeight, 'value', {
            get: function () { return this._value; },
            set: function (val) {
                this._value = val + 'px';
                editor.queueModifications();

                this.subscribers.forEach(function (subscriber) {
                    subscriber.value = val;
                });
            } 
        });
        
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
    NavbarBase.prototype = Object.create(ThemeModifier.prototype);
    NavbarBase.constructor = NavbarBase;

    /**
     * Gets the Height of the Navbar Components.
     * 
     * @returns {string}
     */
    NavbarBase.prototype.getHeight = function () {
        return this.modifiers.height.value;
    };

    /**
     * Gets the Height of the Navbar Components.
     * 
     * @param {string} height The Navbar Height to set.
     * 
     * @returns {undefined}
     */
    NavbarBase.prototype.setHeight = function (height) {
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
     * Gets the Margin Bottom of the Navbar Components.
     * 
     * @param {string} marginBottom The Navbar Margin Bottom to set.
     * 
     * @returns {undefined}
     */
    NavbarBase.prototype.setMarginBottom = function (marginBottom) {
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
     * Gets the Border Radius of the Navbar Components.
     * 
     * @param {string} borderRadius The Navbar Border Radius to set.
     * 
     * @returns {undefined}
     */
    NavbarBase.prototype.setBorderRadius = function (borderRadius) {
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
     * Gets the Collapse Max Height of the Navbar Components.
     * 
     * @param {string} collapseMaxHeight The Navbar CollapseMaxHeight to set.
     * 
     * @returns {undefined}
     */
    NavbarBase.prototype.setCollapseMaxHeight = function (collapseMaxHeight) {
        this.modifiers.collapseMaxHeight.value = collapseMaxHeight;
    };

    window.NavbarBase = NavbarBase;
})(window);