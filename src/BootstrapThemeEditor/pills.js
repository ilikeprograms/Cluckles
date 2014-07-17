(function (window) {
	"use strict";

	/**
	 * Allows modification of a Pills component in Bootstrap.
	 * 
	 * @class Pills
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} borderRadius The @nav-pills-border-radius variable which controls the Border Radius of the Pills component.
	 * @property {object} linkActiveHoverBg The @nav-pills-active-link-hover-bg variable which controls the Link Active Hover Background Color of the Pills component.
	 * @property {object} linkActiveHoverColor The @nav-pills-active-link-hover-color variable which controls the Link Active Hover Color of the Pills component.
	 * 
	 * @returns {Pills}
	 */
	var Pills = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.borderRadius = {
            variable: '@nav-pills-border-radius',
            value: null
        };
        this.linkActiveHoverBg = {
            variable: '@nav-pills-active-link-hover-bg',
            value: null
        };
        this.linkActiveHoverColor = {
            variable: '@nav-pills-active-link-hover-color',
            value: null
        };

        this.modifiers = {
            borderRadius:           this.borderRadius,
            linkActiveHoverBg:      this.linkActiveHoverBg,
            linkActiveHoverColor:   this.linkActiveHoverColor
        };
    };

    // Inherit from parent Prototype and preserve constructor
	Pills.prototype = Object.create(ThemeModifier.prototype);
	Pills.constructor = Pills;

	/**
	 * Gets the Border Radius of the Pills Component.
	 * 
	 * @returns {string}
	 */
	Pills.prototype.getBorderRadius = function () {
		return this.modifiers.borderRadius.value;
	};

	/**
	 * Sets the Border Radius of the Pills Component.
	 * 
	 * @param {string} borderRadius Sets the Pill Border Radius.
	 * 
	 * @returns {undefined}
	 */
	Pills.prototype.setBorderRadius = function (borderRadius) {
		this.modifiers.borderRadius.value = borderRadius + 'px';
		this.editor.queueModifications();
	};

    /**
	 * Gets the Link Active Hover Background Color of the Pills Component.
	 * 
	 * @returns {string}
	 */
	Pills.prototype.getLinkActiveHoverBackgroundColor = function () {
		return this.modifiers.linkActiveHoverBg.value;
	};
	
	/**
	 * Sets the Link Active Hover Background Color of the Pills Component.
	 * 
	 * @param {string} color Sets the Link Active Hover Background Color.
	 * 
	 * @returns {undefined}
	 */
	Pills.prototype.setLinkActiveHoverBackgroundColor = function (linkActiveHoverBg) {
		this.modifiers.linkActiveHoverBg.value = linkActiveHoverBg;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Link Active Hover Color of the Pills Component.
	 * 
	 * @returns {string}
	 */
	Pills.prototype.getLinkActiveHoverColor = function () {
		return this.modifiers.linkActiveHoverColor.value;
	};
	
	/**
	 * Sets the Link Active Hover Color of the Pills Component.
	 * 
	 * @param {string} linkActiveHoverColor Sets the Link Active Hover Color.
	 * 
	 * @returns {undefined}
	 */
	Pills.prototype.setLinkActiveHoverColor = function (linkActiveHoverColor) {
		this.modifiers.linkActiveHoverColor.value = linkActiveHoverColor;
		this.editor.queueModifications();
	};

    window.Pills = Pills;
})(window);