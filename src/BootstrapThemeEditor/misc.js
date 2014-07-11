(function (window) {
    "use strict";

    /**
     * Allows modifications of the Miscellaneous parts of Bootstrap.
     * 
     * @class Misc
     * @extends ThemeModifier
	 * 
	 * @param {Misc} editor instance which manages the less modifications.
     * 
     * @property {string} componentBaseBg The @state-base-bg variable which sets the background color of bootstrap components.
     * @property {string} wellBg The @well-base-bg variable which sets the background color of the Well Component.
     * @property {string} bodyBg The @body-bg variable which sets the body background color.
     * @property {string} textColor The @text-color variable which sets the body text color.
     * @property {string} headingsColor The @headings-color variable which sets the color of <h1>-<h6> tags.
     * @property {string} hrBorder The @hr-border variable which sets the color of the <hr> tag.
     * 
     * @returns {Misc}
     */
    var Misc = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        // Define the Modifiers
        this.componentBaseBg = {
            variable: '@state-base-bg',
            value: null
        };
        this.wellBg = {
            variable: '@well-base-bg',
            value: null
        };
        this.bodyBg = {
            variable: '@body-bg',
            value: null
        };
        this.textColor = {
            variable: '@text-color',
            value: null
        };
        this.headingsColor = {
            variable: '@headings-color',
            value: null
        };
        this.hrBorder = {
            variable: '@hr-border',
            value: null
        };

        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            componentBaseBg:    this.componentBaseBg,
            wellBg:             this.wellBg,
            bodyBg:             this.bodyBg,
            textColor:          this.textColor,
            headingsColor:      this.headingsColor,
            hrBorder:           this.hrBorder
        };
    };

    // Inherit from parent Prototype and preserve constructor
    Misc.prototype = Object.create(ThemeModifier.prototype);
    Misc.constructor = Misc;

    /**
     * Gets the background color of Components.
     * 
     * @returns {string}
     */
    Misc.prototype.getComponentBaseBackground = function () {
        return this.modifiers.componentBaseBg.value;
    };
    
    /**
     * Sets the background color of Components, such as Panel body, List Groups.
     * 
     * @param {string} bg The background color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setComponentBaseBackground = function (bg) {
        this.modifiers.componentBaseBg.value = bg;
        this.editor.queueModifications();
    };

    /**
     * Gets the Background color of the Well Components.
     * 
     * @returns {string}
     */
    Misc.prototype.getWellBackground = function () {
        return this.modifiers.wellBg.value;
    };

    /**
     * Sets the Background color of the Well Component.
     * 
     * @param {string} bg The Background color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setWellBackground = function (bg) {
        this.modifiers.wellBg.value = bg;
        this.editor.queueModifications();
    };

    /**
     * Gets the Body Background color.
     * 
     * @returns {string}
     */
    Misc.prototype.getBodyBackground = function () {
        return this.modifiers.bodyBg.value;
    };

    /**
     * Sets the Body Background color.
     * 
     * @param {string} bg The body background color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setBodyBackground = function (bg) {
        this.modifiers.bodyBg.value = bg;
        this.editor.queueModifications();
    };

    /**
     * Gets the Body Text color.
     * 
     * @returns {String}
     */
    Misc.prototype.getTextColor = function () {
        return this.modifiers.textColor.value;
    };

    /**
     * Sets the Body Text color.
     * 
     * @param {string} color The body text color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setTextColor = function (color) {
        this.modifiers.textColor.value = color;
        this.editor.queueModifications();
    };

    /**
     * Gets the Headings Text color.
     * 
     * @returns {String}
     */
    Misc.prototype.getHeadingsColor = function () {
        return this.modifiers.headingsColor.value;
    };

    /**
     * Sets the Headings Text color.
     * 
     * @param {string} color The headings text color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setHeadingsColor = function (color) {
        this.modifiers.headingsColor.value = color;
        this.editor.queueModifications();
    };

    /**
     * Gets the Horizontal Rule color.
     * 
     * @returns {String}
     */
    Misc.prototype.getHrBorder = function () {
        return this.modifiers.hrBorder.value;
    };
    
    /**
     * Sets the Horizontal Rule color.
     * 
     * @param {string} hrBorder The Horizontal Rule color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setHrBorder = function (hrBorder) {
        this.modifiers.hrBorder.value = hrBorder;
        this.editor.queueModifications();
    };

    window.Misc = Misc;
})(window);