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

        // Define the Modifiers
        this.height = {
            variable: '@navbar-height',
            value: null
        };
        this.marginBottom = {
            variable: '@navbar-margin-bottom',
            value: null
        };
        this.borderRadius = {
            variable: '@navbar-border-radius',
            value: null
        };
        this.collapseMaxHeight = {
            variable: '@navbar-collapse-max-height',
            value: null
        };
        
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            height:             this.height,
            marginBottom:       this.marginBottom,
            borderRadius:       this.borderRadius,
            collapseMaxHeight:  this.collapseMaxHeight
        };
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
        this.modifiers.height.value = height + 'px';
        this.editor.queueModifications();
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
        this.modifiers.marginBottom.value = marginBottom + 'px';
        this.editor.queueModifications();
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
        this.editor.queueModifications();
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
        this.modifiers.collapseMaxHeight.value = collapseMaxHeight + 'px';
        this.editor.queueModifications();
    };

    window.NavbarBase = NavbarBase;
})(window);