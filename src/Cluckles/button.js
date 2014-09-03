(function (window) {
	"use strict";

	/**
	 * Allows modification of a Button component in Bootstrap.
	 * 
	 * @class Button
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
     * @param {string} string The style of Button Component to modify.
	 * 
	 * @property {object} bg The @btn-{style}-bg variable which controls the Background color of the Button component.
	 * @property {object} color The @btn-{style}-color variable which controls the Color of the Button component.
	 * @property {object} border The @btn-{style}-border variable which controls the Border of the Button component.
	 * 
	 * @returns {Button}
	 */
	var Button = function (editor, style) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-button-' + style;

        if (style === undefined) {
            throw new TypeError('ThemeEditor.button.js: style cannot be undefined');
        }

        // Configure the Modifiers
		this.bg = {
			variable: '@btn-' + style + '-bg',
			subscribeProperty: 'bg',
            changeFn: this.setBackground.bind(this),
            subscribers: [],
			_value: null
		};
		this.color = {
			variable: '@btn-' + style + '-color',
			subscribeProperty: 'color',
            changeFn: this.setColor.bind(this),
            subscribers: [],
			_value: null
		};
		this.border = {
			variable: '@btn-' + style + '-border',
			subscribeProperty: 'hover-border-color',
            changeFn: this.setBorder.bind(this),
            subscribers: [],
			_value: null
		};

        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            bg:                 this.bg,
            color:              this.color,
            border:             this.border
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Button.prototype = Object.create(ThemeModifier.prototype);
	Button.constructor = Button;

	/**
	 * Gets the Background color.
	 * 
	 * @returns {String}
	 */
	Button.prototype.getBackground = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background color of this Button instance.
	 * 
	 * @param {string} color Sets the Background color.
	 * 
	 * @returns {undefined}
	 */
	Button.prototype.setBackground = function (color) {
		this.modifiers.bg.value = color;
	};

	/**
	 * Gets the Color of this Button instance.
	 * 
	 * @returns {string}
	 */
	Button.prototype.getColor = function () {
		return this.modifiers.color.value;
	};

	/**
	 * Sets the Color of this Button instance.
	 * 
	 * @param {string} color Sets the Color.
	 * 
	 * @returns {undefined}
	 */
	Button.prototype.setColor = function (color) {
		this.modifiers.color.value = color;
	};

	/**
	 * Gets the Border of this Button instance.
	 * 
	 * @returns {string}
	 */
	Button.prototype.getBorder = function () {
		return this.modifiers.border.value;
	};

	/**
	 * Sets the Border of this Button instance.
	 * 
	 * @param {string} color Sets the Border.
	 * 
	 * @returns {undefined}
	 */
	Button.prototype.setBorder = function (color) {
		this.modifiers.border.value = color;
	};

    window.Button = Button;
})(window);