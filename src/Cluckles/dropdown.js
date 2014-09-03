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

        this.subscriberDataAttribute = 'data-cluckles-dropdown';

        // Configure the Modifiers
		this.bg = {
			variable: '@dropdown-bg',
            subscribeProperty: 'bg',
            changeFn: this.setBackground.bind(this),
            subscribers: [],
			_value: null
		};
		this.headerColor = {
			variable: '@dropdown-header-color',
            subscribeProperty: 'header-color',
            changeFn: this.setHeaderColor.bind(this),
			subscribers: [],
			_value: null
		};
		this.border = {
			variable: '@dropdown-border',
            subscribeProperty: 'border-color',
            changeFn: this.setBorder.bind(this),
			subscribers: [],
			_value: null
		};
		this.divider = {
			variable: '@dropdown-divider-bg',
            subscribeProperty: 'divider',
            changeFn: this.setDivider.bind(this),
			subscribers: [],
			_value: null
		};
		this.linkColor = {
			variable: '@dropdown-link-color',
            subscribeProperty: 'link-color',
            changeFn: this.setLinkColor.bind(this),
			subscribers: [],
			_value: null
		};
		this.linkDisabledColor = {
			variable: '@dropdown-link-disabled-color',
            subscribeProperty: 'link-disabled-color',
            changeFn: this.setLinkDisabledColor.bind(this),
			subscribers: [],
			_value: null
		};
		this.linkHoverBg = {
			variable: '@dropdown-link-hover-bg',
            subscribeProperty: 'link-hover-bg',
            changeFn: this.setLinkHoverBackgroundColor.bind(this),
			subscribers: [],
			_value: null
		};
		this.linkHoverColor = {
			variable: '@dropdown-link-hover-color',
            subscribeProperty: 'link-hover-color',
            changeFn: this.setLinkHoverColor.bind(this),
			subscribers: [],
			_value: null
		};
		this.linkActiveBg = {
			variable: '@dropdown-link-active-bg',
            subscribeProperty: 'link-active-bg',
            changeFn: this.setLinkActiveBackgroundColor.bind(this),
			subscribers: [],
			_value: null
		};
		this.linkActiveColor = {
			variable: '@dropdown-link-active-color',
            subscribeProperty: 'link-active-color',
            changeFn: this.setLinkActiveColor.bind(this),
			subscribers: [],
			_value: null
		};

        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            bg:                 this.bg,
            headerColor:        this.headerColor,
            border:             this.border,
            divider:            this.divider,
            linkColor:          this.linkColor,
            linkDisabledColor:  this.linkDisabledColor,
            linkHoverBg:        this.linkHoverBg,
            linkHoverColor:     this.linkHoverColor,
            linkActiveBg:       this.linkActiveBg,
            linkActiveColor:    this.linkActiveColor
        };

        this.setupDataBinding();
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
	};
	
	/**
	 * Gets the Link Hover Background color value.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkHoverBackgroundColor = function () {
		return this.modifiers.linkHoverBg.value;
	};
	
	/**
	 * Sets the Link Hover Background color value.
	 * 
	 * @param {string} color Sets the link hover background color value.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkHoverBackgroundColor = function (color) {
		this.modifiers.linkHoverBg.value = color;
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
	};
	
	/**
	 * Gets the Link Active Background color value.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkActiveBackgroundColor = function () {
		return this.modifiers.linkActiveBg.value;
	};
	
	/**
	 * Sets the Link Active Background color value.
	 * 
	 * @param {string} color Sets the link active background color value.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkActiveBackgroundColor = function (color) {
		this.modifiers.linkActiveBg.value = color;
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
	};
	
	window.Dropdown = Dropdown;
})(window);