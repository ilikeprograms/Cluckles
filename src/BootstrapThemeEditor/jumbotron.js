(function (window) {
	"use strict";

	/**
	 * Allows modifications of the Jumbotron component styling in Bootstrap.
	 * 
	 * @class Jumbotron
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} bg The @jumbotron-bg variable which sets the Background of the Jumbotron component.
	 * @property {object} headingColor The @jumbotron-heading-color variable which sets the Heading of the Jumbotron.
	 * @property {object} color The @jumbotron-color variable which sets the color of the Jumbotron component.
	 * 
	 * @returns {Jumbotron}
	 */
	var Jumbotron = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor
		
		this.bg = {
			variable: '@jumbotron-bg',
			value: null
		};
		this.headingColor = {
			variable: '@jumbotron-heading-color',
			value: null
		};
		this.color = {
			variable: '@jumbotron-color',
			value: null
		};
		
		this.modifiers.bg			= this.bg;
		this.modifiers.headingColor = this.headingColor;
		this.modifiers.color		= this.color;
	};
	
	// Inherit from parent Prototype and preserve constructor
	Jumbotron.prototype = Object.create(ThemeModifier.prototype);
	Jumbotron.constructor = Jumbotron;

	/**
	 * Gets the Background of the Jumbotron Component.
	 * 
	 * @returns {string}
	 */
	Jumbotron.prototype.getBackground = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background of the Jumbotron Component.
	 * 
	 * @param {string} color The color to set the Background.
	 * 
	 * @returns {undefined}
	 */
	Jumbotron.prototype.setBackground = function (color) {
		this.modifiers.bg.value = color;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Background of the Jumbotron Component.
	 * 
	 * @returns {string}
	 */
	Jumbotron.prototype.getColor = function () {
		return this.modifiers.color.value;
	};

	/**
	 * Sets the Text color of the Jumbotron Component.
	 * 
	 * @param {string} color The color to set the text of the Jumbotron Component.
	 * 
	 * @returns {undefined}
	 */
	Jumbotron.prototype.setColor = function (color) {
		this.modifiers.color.value = color;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Heading color of the Jumbotron Component.
	 * 
	 * @returns {string}
	 */
	Jumbotron.prototype.getHeadingColor = function () {
		return this.modifiers.headingColor.value;
	};

	/**
	 * Sets the Heading color of the Jumbotron Component.
	 * 
	 * @param {string} color The color to set the Headings.
	 * 
	 * @returns {undefined}
	 */
	Jumbotron.prototype.setHeadingColor = function (color) {
		this.modifiers.headingColor.value = color;
		this.editor.queueModifications();
	};

	window.Jumbotron = Jumbotron;
})(window);