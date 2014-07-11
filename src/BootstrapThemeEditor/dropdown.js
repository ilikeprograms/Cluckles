(function (window) {
	"use strict";

	/**
	 * Allows modification of the Dropdown Component styling.
	 * 
	 * @class Dropdown
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} bg The @dropdown-bg variable which sets the dropdown background color.
	 * @property {object} headerColor The @dropdown-header-color variable which sets the dropdown header color.
	 * @property {object} border The @dropdown-border variable which sets the dropdown border color.
	 * @property {object} divider The @dropdown-divider-bg variable which sets the dropdown divider color.
	 * @property {object} linkColor The @dropdown-link-color variable which sets the link color.
	 * @property {object} linkDisabledColor The @dropdown-link-disabled-color variable which sets the link disabled color.
	 * @property {object} linkHoverBg The @dropdown-link-hover-bg variable which sets the dropdown link hover background color.
	 * @property {object} linkHoverColor The @dropdown-link-hover-color variable which sets the dropdown link hover color.
	 * @property {object} linkActiveBg The @dropdown-link-active-hover-bg variable which sets the dropdown link active background color.
	 * @property {object} linkActiveColor The @dropdown-link-active-hover-color variable which sets the dropdown link active color.
	 * 
	 * @returns {Dropdown}
	 */
	var Dropdown = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor
		
		this.bg = {
			variable: '@dropdown-bg',
			value: null
		};
		this.headerColor = {
			variable: '@dropdown-header-color',
			value: null
		};
		this.border = {
			variable: '@dropdown-border',
			value: null
		};
		this.divider = {
			variable: '@dropdown-divider-bg',
			value: null
		};
		this.linkColor = {
			variable: '@dropdown-link-color',
			value: null
		};
		this.linkDisabledColor = {
			variable: '@dropdown-link-disabled-color',
			value: null
		};
		this.linkHoverBg = {
			variable: '@dropdown-link-hover-bg',
			value: null
		};
		this.linkHoverColor = {
			variable: '@dropdown-link-hover-color',
			value: null
		};
		this.linkActiveBg = {
			variable: '@dropdown-link-active-bg',
			value: null
		};
		this.linkActiveColor = {
			variable: '@dropdown-link-active-color',
			value: null
		};

		this.modifiers.bg					= this.bg;
		this.modifiers.headerColor			= this.headerColor;
		this.modifiers.border				= this.border;
		this.modifiers.divider				= this.divider;
		this.modifiers.linkColor			= this.linkColor;
		this.modifiers.linkDisabledColor	= this.linkDisabledColor;
		this.modifiers.linkHoverBg			= this.linkHoverBg;
		this.modifiers.linkHoverColor		= this.linkHoverColor;
		this.modifiers.linkActiveBg			= this.linkActiveBg;
		this.modifiers.linkActiveColor		= this.linkActiveColor;
	};
	
	// Inherit from parent Prototype and preserve constructor
	Dropdown.prototype = Object.create(ThemeModifier.prototype);
	Dropdown.constructor = Dropdown;

	/**
	 * Gets the Background color value.
	 * 
	 * @returns {String}
	 */
	Dropdown.prototype.getBackground = function () {
		return this.modifiers.bg;
	};
	
	/**
	 * Sets the Background color value.
	 * 
	 * @param {string} color The Background color to set.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setBackground = function (color) {
		this.modifiers.bg.value = color;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Header color value.
	 * 
	 * @returns {String}
	 */
	Dropdown.prototype.getHeaderColor = function () {
		return this.modifiers.headingColor;
	};
	
	/**
	 * Sets the Header color value.
	 * 
	 * @param {string} color The Header color to set.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setHeaderColor = function (color) {
		this.modifiers.headerColor.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Border color value.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getBorder = function () {
		return this.modifiers.border.value;
	};
	
	/**
	 * Sets the Border color value.
	 * 
	 * @param {string} color Sets the border color value.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setBorder = function (color) {
		this.modifiers.border.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Divider color value.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getDivider = function () {
		return this.modifiers.divider.value;
	};
	
	/**
	 * Sets the Divider color value.
	 * 
	 * @param {string} color Sets the divider color value.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setDivider = function (color) {
		this.modifiers.divider.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Link color value.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkColor = function () {
		return this.modifiers.linkColor.value;
	};
	
	/**
	 * Sets the Link color value.
	 * 
	 * @param {string} color Sets the link color value.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkColor = function (color) {
		this.modifiers.linkColor.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Link Disabled color value.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkDisabledColor = function () {
		return this.modifiers.linkDisabledColor.value;
	};
	
	/**
	 * Sets the Link Disabled color value.
	 * 
	 * @param {string} color Sets the link disabled color value.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkDisabledColor = function (color) {
		this.modifiers.linkDisabledColor.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Link Hover Background color value.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkHoverBackground = function () {
		return this.modifiers.linkHoverBg.value;
	};
	
	/**
	 * Sets the Link Hover Background color value.
	 * 
	 * @param {string} color Sets the link hover background color value.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkHoverBackground = function (color) {
		this.modifiers.linkHoverBg.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Link Hover color value.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkHoverColor = function () {
		return this.modifiers.linkHoverColor.value;
	};
	
	/**
	 * Sets the Link Hover color value.
	 * 
	 * @param {string} color Sets the link hover color value.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkHoverColor = function (color) {
		this.modifiers.linkHoverColor.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Link Active Background color value.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkActiveBackground = function () {
		return this.modifiers.linkActiveBg.value;
	};
	
	/**
	 * Sets the Link Active Background color value.
	 * 
	 * @param {string} color Sets the link active background color value.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkActiveBackground = function (color) {
		this.modifiers.linkActiveBg.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Link Active Hover color value.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkActiveColor = function () {
		return this.modifiers.linkActiveColor.value;
	};
	
	/**
	 * Sets the Link Active color value.
	 * 
	 * @param {string} color Sets the link active color value.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkActiveColor = function (color) {
		this.modifiers.linkActiveColor.value = color;
		this.editor.queueModifications();
	};
	
	window.Dropdown = Dropdown;
})(window);