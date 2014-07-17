(function (window) {
	"use strict";

	/**
	 * Allows editing of the @brand-{style} variables which affect alerts/panel headers,
	 * the Primary branding, however affects more, such as the ListGroup background, links etc.
	 * 
	 * @class Dropdown
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {string} default The @brand-default variable which affects the default styles.
	 * @property {string} primary The @brand-primary variable which affects the primary styles.
	 * @property {string} success The @brand-success variable which affects the success styles.
	 * @property {string} info The @brand-info variable which affects the info styles.
	 * @property {string} warning The @brand-warning variable which affects the warning styles.
	 * @property {string} danger The @brand-danger variable which affects the danger styles.
	 * 
	 * @returns {BrandModifier}
	 */
	var BrandModifier = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        // Configure the Modifiers
		this.default = {
			variable: '@brand-default',
			value: null
		};
		this.primary = {
			variable: '@brand-primary',
			value: null
		};
		this.success = {
			variable: '@brand-success',
			value: null
		};
		this.info = {
			variable: '@brand-info',
			value: null
		};
		this.warning = {
			variable: '@brand-warning',
			value: null
		};
		this.danger	= {
			variable: '@brand-danger',
			value: null
		};
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            default:    this.default,
            primary:    this.primary,
            success:    this.success,
            info:       this.info,
            warning:    this.warning,
            danger:     this.danger
        };
	};
	
	// Inherit from parent Prototype and preserve constructor
	BrandModifier.prototype = Object.create(ThemeModifier.prototype);
	BrandModifier.constructor = BrandModifier;

	/**
	 * Gets the Default branding color.
	 * 
	 * @returns {undefined}
	 */
	BrandModifier.prototype.getDefault = function () {
		return this.modifiers.default.value;
	};

	/**
	 * Sets the Default branding color.
	 * 
	 * @param {string} color Sets the Default color.
	 * 
	 * @returns {undefined}
	 */
	BrandModifier.prototype.setDefault = function (color) {
		this.modifiers.default.value = color;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Primary branding color.
	 * 
	 * @returns {string}
	 */
	BrandModifier.prototype.getPrimary = function () {
		return this.modifiers.primary.value;
	};

	/**
	 * Sets the Primary branding color.
	 * 
	 * @param {string} color Sets the Primary color.
	 * 
	 * @returns {undefined}
	 */
	BrandModifier.prototype.setPrimary = function (color) {
		this.modifiers.primary.value = color;
		this.editor.queueModifications();
	};

	/**
	 * gets the Success branding color.
	 * 
	 * @returns {string}
	 */
	BrandModifier.prototype.getSuccess = function () {
		return this.modifiers.success.value;
	};

	/**
	 * Sets the Success branding color.
	 * 
	 * @param {string} color Sets the Success color.
	 * 
	 * @returns {undefined}
	 */
	BrandModifier.prototype.setSuccess = function (color) {
		this.modifiers.success.value = color;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Info branding color.
	 * 
	 * @returns {string}
	 */
	BrandModifier.prototype.getInfo = function () {
		return this.modifiers.info.value;
	};

	/**
	 * Sets the Info branding color.
	 * 
	 * @param {string} color Sets the Info color.
	 * 
	 * @returns {undefined}
	 */
	BrandModifier.prototype.setInfo = function (color) {
		this.modifiers.info.value = color;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Warning branding color.
	 * 
	 * @returns {string}
	 */
	BrandModifier.prototype.getWarning = function () {
		return this.modifiers.warning.value;
	};

	/**
	 * Sets the Warning branding color.
	 * 
	 * @param {type} color Sets the Warning color.
	 * 
	 * @returns {undefined}
	 */
	BrandModifier.prototype.setWarning = function (color) {
		this.modifiers.warning.value = color;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Danger branding color.
	 * 
	 * @returns {string}
	 */
	BrandModifier.prototype.getDanger = function () {
		return this.modifiers.danger.value;
	};

	/**
	 * Sets the Danger branding color.
	 * 
	 * @param {string} color Sets the Danger color.
	 * 
	 * @returns {undefined}
	 */
	BrandModifier.prototype.setDanger = function (color) {
		this.modifiers.danger.value = color;
		this.editor.queueModifications();
	};
	
	window.BrandModifier = BrandModifier;
})(window);