(function (window) {
	"use strict";

	/**
	 * Allows modification of a Navbar component in Bootstrap.
	 * 
	 * @class Navbar
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} bg The @navbar-{style}-bg variable which controls the background color of the Navbar component.
	 * @property {object} color The @navbar-{style}-color variable which controls the color of the Navbar component.
	 * @property {object} border The @navbar-{style}-border variable which controls the border of the Navbar component.
	 * @property {object} linkColor The @navbar-{style}-link-color variable which controls the link color of the Navbar component.
	 * @property {object} linkHoverColor The @navbar-{style}-link-hover-color variable which controls the link hover color of the Navbar component.
	 * @property {object} linkHoverBg The @navbar-{style}-link-hover-bg variable which controls the link hover background of the Navbar component.
	 * @property {object} linkActiveColor The @navbar-{style}-link-active-color variable which controls the link active color of the Navbar component.
	 * @property {object} linkActiveBg The @navbar-{style}-link-active-bg variable which controls the link active background of the Navbar component.
	 * @property {object} linkDisabledColor The @navbar-{style}-link-disabled-color variable which controls the link disabled color of the Navbar component.
	 * @property {object} linkDisabledBg The @navbar-{style}-link-disabled-bg variable which controls the link disabled background of the Navbar component.
	 * @property {object} brandColor The @navbar-{style}-brand-color variable which controls the brand color of the Navbar component.
	 * @property {object} brandHoverColor The @navbar-{style}-brand-hover-color variable which controls the brand hover color of the Navbar component.
	 * @property {object} brandHoverBg The @navbar-{style}-brand-hover-bg variable which controls the brand hover background of the Navbar component.
	 * 
	 * @returns {Navbar}
	 */
	var Navbar = function (editor, style) {
		ThemeModifier.call(this, editor); // Call parent constructor
		
		var navbarStyle = style === undefined ? 'default' : 'inverse';

		this.bg = {
			variable: 'navbar-' + navbarStyle + '-bg',
			value: null
		};
		this.color = {
			variable: 'navbar-' + navbarStyle + '-color',
			value: null
		};
		this.border = {
			variable: 'navbar-' + navbarStyle + '-border',
			value: null
		};
		this.linkColor = {
			variable: 'navbar-' + navbarStyle + '-link-color',
			value: null
		};
		this.linkHoverColor = {
			variable: 'navbar-' + navbarStyle + '-link-hover-color',
			value: null
		};
		this.linkHoverBg = {
			variable: 'navbar-' + navbarStyle + '-link-hover-bg',
			value: null
		};
		this.linkActiveColor = {
			variable: 'navbar-' + navbarStyle + '-link-active-color',
			value: null
		};
		this.linkActiveBg = {
			variable: 'navbar-' + navbarStyle + '-link-active-bg',
			value: null
		};
		this.linkHoverColor = {
			variable: 'navbar-' + navbarStyle + '-link-hover-color',
			value: null
		};
		this.linkHoverBg = {
			variable: 'navbar-' + navbarStyle + '-link-hover-bg',
			value: null
		};
		this.linkDisabledColor = {
			variable: 'navbar-' + navbarStyle + '-link-disabled-color',
			value: null
		};
		this.linkDisabledBg = {
			variable: 'navbar-' + navbarStyle + '-link-disabled-bg',
			value: null
		};
		this.brandColor = {
			variable: 'navbar-' + navbarStyle + '-brand-color',
			value: null
		};
		this.brandHoverColor = {
			variable: 'navbar-' + navbarStyle + '-brand-hover-color',
			value: null
		};
		this.brandHoverBg = {
			variable: 'navbar-' + navbarStyle + '-brand-hover-bg',
			value: null
		};
		
		this.modifiers.bg					= this.bg;
		this.modifiers.color				= this.color;
		this.modifiers.border				= this.border;
		this.modifiers.linkColor			= this.linkColor;
		this.modifiers.linkHoverColor		= this.linkHoverColor;
		this.modifiers.linkHoverBg			= this.linkHoverBg;
		this.modifiers.linkActiveColor		= this.linkActiveColor;
		this.modifiers.linkActiveBg			= this.linkActiveBg;
		this.modifiers.linkDisabledColor	= this.linkDisabledColor;
		this.modifiers.linkDisabledBg		= this.linkDisabledBg;
		this.modifiers.brandColor			= this.brandColor;
		this.modifiers.brandHoverColor		= this.brandHoverColor;
		this.modifiers.brandHoverBg			= this.brandHoverBg;
	};
	
	// Inherit from parent Prototype and preserve constructor
	Navbar.prototype = Object.create(ThemeModifier.prototype);
	Navbar.constructor = Navbar;

	/**
	 * Gets the Background color.
	 * 
	 * @returns {String}
	 */
	Navbar.prototype.getBackground = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background color of this Navbar instance.
	 * 
	 * @param {string} color Sets the Background color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setBackground = function (color) {
		this.modifiers.bg.value = color;
		this.editor.applyModifications();
	};
	
	/**
	 * Gets the Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getColor = function () {
		return this.modifiers.color.value;
	};
	
	/**
	 * Sets the Color of this Navbar instance.
	 * 
	 * @param {string} color Sets the Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setColor = function (color) {
		this.modifiers.color.value = color;
		this.editor.applyModifications();
	};
	
	/**
	 * Gets the Border of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getBorder = function () {
		return this.modifiers.border.value;
	};
	
	/**
	 * Sets the Border of this Navbar instance.
	 * 
	 * @param {string} color Sets the Border.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setBorder = function (color) {
		this.modifiers.border.value = color;
		this.editor.applyModifications();
	};
	
	/**
	 * Gets the Link Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getLinkColor = function () {
		return this.modifiers.linkColor.value;
	};
	
	/**
	 * Sets the Link Color of this Navbar instance.
	 * 
	 * @param {string} color Sets the Link Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkColor = function (color) {
		this.modifiers.linkColor.value = color;
		this.editor.applyModifications();
	};
	
	/**
	 * Gets the Link Hover Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getLinkHoverColor = function () {
		return this.modifiers.linkHoverColor.value;
	};
	
	/**
	 * Sets the Link Hover Color of this Navbar instance.
	 * 
	 * @param {string} color Sets the Link Hover Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkHoverColor = function (color) {
		this.modifiers.linkHoverColor.value = color;
		this.editor.applyModifications();
	};
	
	/**
	 * Gets the Link Hover Background Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getLinkHoverBackgroundColor = function () {
		return this.modifiers.linkHoverBg.value;
	};
	
	/**
	 * Sets the Link Hover Background Color of this Navbar instance.
	 * 
	 * @param {string} color Sets the Link Hover Background Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkHoverBackgroundColor = function (color) {
		this.modifiers.linkHoverBg.value = color;
		this.editor.applyModifications();
	};
	
	/**
	 * Gets the Link Active Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getLinkActiveColor = function () {
		return this.modifiers.linkActiveColor.value;
	};
	
	/**
	 * Sets the Link Active Color of this Navbar instance.
	 * 
	 * @param {string} color Set the Link Active Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkActiveColor = function (color) {
		this.modifiers.linkActiveColor.value = color;
		this.editor.applyModifications();
	};
	
	/**
	 * Gets the Link Active Background Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getLinkActiveBackgroundColor = function () {
		return this.modifiers.linkActiveBg.value;
	};
	
	/**
	 * Sets the Link Active Background Color of this Navbar instance.
	 * 
	 * @param {string} color Sets the Link Active Background Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkActiveBackgroundColor = function (color) {
		this.modifiers.linkActiveBg.value = color;
		this.editor.applyModifications();
	};
	
	/**
	 * Gets the Link Disabled Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getLinkDisabledColor = function () {
		return this.modifiers.linkDisabledColor.value;
	};
	
	/**
	 * Sets the Link Disabled Color of this Navbar instance.
	 * 
	 * @param {string} color Set the Link Disabled Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkDisabledColor = function (color) {
		this.modifiers.linkDisabledColor.value = color;
		this.editor.applyModifications();
	};
	
	/**
	 * Gets the Link Disabled Background Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getLinkDisabledBackgroundColor = function () {
		return this.modifiers.linkDisabledBg.value;
	};
	
	/**
	 * Sets the Link Disabled Background Color of this Navbar instance.
	 * 
	 * @param {string} color Sets the Link Disabled Background Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkDisabledBackgroundColor = function (color) {
		this.modifiers.linkDisabledBg.value = color;
		this.editor.applyModifications();
	};
	
		
	/**
	 * Gets the Brand Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getBrandColor = function () {
		return this.modifiers.brandColor.value;
	};
	
	/**
	 * Sets the Brand Color of this Navbar instance.
	 * 
	 * @param {string} color Sets the Brand Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setBrandColor = function (color) {
		this.modifiers.brandColor.value = color;
		this.editor.applyModifications();
	};
	
		
	/**
	 * Gets the Brand Hover Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getBrandHoverColor = function () {
		return this.modifiers.brandHoverColor.value;
	};
	
	/**
	 * Sets the Brand Hover Color of this Navbar instance.
	 * 
	 * @param {string} color Sets the Brand Hover Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setBrandHoverColor = function (color) {
		this.modifiers.brandHoverColor.value = color;
		this.editor.applyModifications();
	};
	
	/**
	 * Gets the Brand Hover Background Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getBrandHoverBackgroundColor = function () {
		return this.modifiers.brandHoverBg.value;
	};
	
	/**
	 * Sets the Brand Hover Background Color of this Navbar instance.
	 * 
	 * @param {string} color Sets the Brand Hover Background Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setBrandHoverBackgroundColor = function (color) {
		this.modifiers.brandHoverBg.value = color;
		this.editor.applyModifications();
	};
	
	window.Navbar = Navbar;
})(window);