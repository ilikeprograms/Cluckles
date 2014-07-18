(function (window) {
	"use strict";

	/**
	 * Allows modifications of the Popover component styling in Bootstrap.
	 * 
	 * @class Popover
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
     * @property {object} bg The @popover-bg variable which sets the Background of the Popover component.
	 * @property {object} maxWidth The @popover-max-width variable which sets the Max Width of the Popover component.
	 * @property {object} borderColor The @popover-border-color variable which sets the Border Color of the Popover component.
	 * @property {object} fallbackBorderColor The @popover-fallback-border-color variable which sets the Fallback Border Color of the Popover component.
	 * @property {object} titleBg The @popover-title-bg variable which sets the Title Background Color of the Popover component.
	 * @property {object} arrowWidth The @popover-arrow-width variable which sets the Arrow Width of the Popover component.
	 * @property {object} arrowColor The @popover-arrow-color variable which sets the Arrow Color of the Popover component.
	 * @property {object} arrowOuterWidth The @popover-arrow-outer-width variable which sets the Arrow Outer Width of the Popover component.
	 * @property {object} arrowOuterColor The @popover-arrow-outer-color variable which sets the Arrow Outer Color of the Popover component.
	 * @property {object} arrowOuterFallbackColor The @popover-arrow-outer-fallback-color variable which sets the Arrow Outer Fallback Color of the Popover component.
	 * 
	 * @returns {Popover}
	 */
	var Popover = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor
		
        // Configure the Modifiers
        this.bg = {
			variable: '@popover-bg',
			value: null
		};
        this.maxWidth = {
            variable: '@popover-max-width',
            value: null
        };
        this.borderColor = {
            variable: '@popover-border-color',
            value: null
        };
        this.fallbackBorderColor = {
            variable: '@popover-fallback-border-color',
            value: null
        };
        this.titleBg = {
            variable: '@popover-title-bg',
            value: null
        };
        this.arrowWidth = {
            variable: '@popover-arrow-width',
            value: null
        };
        this.arrowColor = {
            variable: '@popover-arrow-color',
            value: null
        };
        this.arrowOuterWidth = {
            variable: '@popover-arrow-outer-width',
            value: null
        };
        this.arrowOuterColor = {
            variable: '@popover-arrow-outer-color',
            value: null
        };
        this.arrowOuterFallbackColor = {
            variable: '@popover-arrow-outer-fallback-color',
            value: null
        };
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            bg:                         this.bg,
            maxWidth:                   this.maxWidth,
            borderColor:                this.borderColor,
            fallbackBorderColor:        this.fallbackBorderColor,
            titleBg:                    this.titleBg,
            arrowWidth:                 this.arrowWidth,
            arrowColor:                 this.arrowColor,
            arrowOuterWidth:            this.arrowOuterWidth,
            arrowOuterColor:            this.arrowOuterColor,
            arrowOuterFallbackColor:    this.arrowOuterFallbackColor
        };
	};
	
	// Inherit from parent Prototype and preserve constructor
	Popover.prototype = Object.create(ThemeModifier.prototype);
	Popover.constructor = Popover;

	/**
	 * Gets the Background of the Popover Component.
	 * 
	 * @returns {string}
	 */
	Popover.prototype.getBackground = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background of the Popover Component.
	 * 
	 * @param {string} color The color to set the Background.
	 * 
	 * @returns {undefined}
	 */
	Popover.prototype.setBackground = function (color) {
		this.modifiers.bg.value = color;
		this.editor.queueModifications();
	};

/**
     * Gets the Max Width of the Popover Components.
     * 
     * @returns {string}
     */
    Popover.prototype.getMaxWidth = function () {
        return this.modifiers.maxWidth.value;
    };

    /**
     * Sets the Max Width of the Popover Components.
     * 
     * @param {string} maxWidth Sets the Popover Max Width.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setMaxWidth = function (maxWidth) {
        this.modifiers.maxWidth.value = maxWidth + 'px';
        this.editor.queueModifications();
    };
    
    /**
     * Gets the Border Color of the Popover Component.
     * 
     * @returns {string}
     */
    Popover.prototype.getBorderColor = function () {
        return this.modifiers.borderColor.value;
    };

    /**
     * Sets the Border Color of the Popover Component.
     * 
     * @param {string} borderColor Sets the Popover Border Color.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setBorderColor = function (borderColor) {
        this.modifiers.borderColor.value = borderColor;
        this.editor.queueModifications();
    };
    
    /**
     * Gets the Fallback Border Color of the Popover Component.
     * 
     * @returns {string}
     */
    Popover.prototype.getFallbackBorderColor = function () {
        return this.modifiers.fallbackBorderColor.value;
    };

    /**
     * Sets the Fallback Border Color of the Popover Component.
     * 
     * @param {string} fallbackBorderColor Sets the Popover Fallback Border Color.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setFallbackBorderColor = function (fallbackBorderColor) {
        this.modifiers.fallbackBorderColor.value = fallbackBorderColor;
        this.editor.queueModifications();
    };

    /**
     * Gets the Title Background Color of the Popover Component.
     * 
     * @returns {String}
     */
    Popover.prototype.getTitleBackgroundColor = function () {
        return this.modifiers.titleBg.value;
    };
    
    /**
     * Sets the Title Background Color of the Popover Component.
     * 
     * @param {string} titleBg Sets the Popover Title Background Color.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setTitleBackgroundColor = function (titleBg) {
        this.modifiers.titleBg.value = titleBg;
        this.editor.queueModifications();
    };

    /**
     * Gets the Arrow Width of the Popover Component.
     * 
     * @returns {string}
     */
    Popover.prototype.getArrowWidth = function () {
        return this.modifiers.arrowWidth.value;
    };
    
    /**
     * Sets the Arrow Width of the Popover Component.
     * 
     * @param {string} arrow Sets the Popover Arrow Width.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setArrowWidth = function (arrowWidth) {
        this.modifiers.arrowWidth.value = arrowWidth + 'px';
        this.editor.queueModifications();
    };
    
    /**
     * Gets the Arrow Color of the Popover Component.
     * 
     * @returns {string}
     */
    Popover.prototype.getArrowColor = function () {
        return this.modifiers.arrowColor.value;
    };
    
    /**
     * Sets the Arrow Color of the Popover Component.
     * 
     * @param {string} arrowColor Sets the Popover Arrow Color.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setArrowColor = function (arrowColor) {
        this.modifiers.arrowColor.value = arrowColor;
        this.editor.queueModifications();
    };

    /**
     * Gets the Arrow Outer Width of the Popover Component.
     * 
     * @returns {string}
     */
    Popover.prototype.getArrowOuterWidth = function () {
        return this.modifiers.arrowOuterWidth.value;
    };
    
    /**
     * Sets the Arrow Outer Width of the Popover Component.
     * 
     * @param {string} arrow Sets the Popover Arrow Outer Width.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setArrowOuterWidth = function (arrowOuterWidth) {
        this.modifiers.arrowOuterWidth.value = arrowOuterWidth + 'px';
        this.editor.queueModifications();
    };
    
    /**
     * Gets the Arrow Outer Color of the Popover Component.
     * 
     * @returns {string}
     */
    Popover.prototype.getArrowOuterColor = function () {
        return this.modifiers.arrowOuterColor.value;
    };
    
    /**
     * Sets the Arrow Outer Color of the Popover Component.
     * 
     * @param {string} arrowOuterColor Sets the Popover Outer Arrow Color.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setArrowOuterColor = function (arrowOuterColor) {
        this.modifiers.arrowOuterColor.value = arrowOuterColor;
        this.editor.queueModifications();
    };
    
    /**
     * Gets the Arrow Outer Fallback Color of the Popover Component.
     * 
     * @returns {string}
     */
    Popover.prototype.getArrowOuterFallbackColor = function () {
        return this.modifiers.arrowOuterFallbackColor.value;
    };
    
    /**
     * Sets the Arrow Outer Fallback Color of the Popover Component.
     * 
     * @param {string} arrowOuterFallbackColor Sets the Popover Outer Arrow Color.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setArrowOuterFallbackColor = function (arrowOuterFallbackColor) {
        this.modifiers.arrowOuterFallbackColor.value = arrowOuterFallbackColor;
        this.editor.queueModifications();
    };

	window.Popover = Popover;
})(window);