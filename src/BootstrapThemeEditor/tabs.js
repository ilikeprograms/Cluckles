(function (window) {
	"use strict";

	/**
	 * Allows modification of a Tabs component in Bootstrap.
	 * 
	 * @class Tabs
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} borderColor The @nav-tabs-border-color variable which controls the Border Color of the Tabs component.
	 * @property {object} linkHoverBorderColor The @nav-tabs-link-hover-border-color variable which controls the Link Hover Border Color of the Tabs component.
	 * @property {object} linkActiveHoverBg The @nav-tabs-active-link-hover-bg variable which controls the Link Active Hover Background Color of the Tabs component.
	 * @property {object} linkActiveHoverColor The @nav-tabs-active-link-hover-color variable which controls the Link Active Hover Color of the Tabs component.
	 * @property {object} linkActiveHoverBorderColor The @nav-tabs-active-link-hover-color variable which controls the Link Active Hover Border Color of the Tabs component.
	 * @property {object} linkJustifiedBorderColor The @nav-tabs-justified-link-border-color variable which controls the Link Justified Border Color of the Tabs component.
	 * @property {object} linkJustifiedActiveBorderColor The @nav-tabs-justified-active-link-border-color variable which controls the Link Justified Active Border Color of the Tabs component.
	 * 
	 * @returns {Tabs}
	 */
	var Tabs = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.borderColor = {
            variable: '@nav-tabs-border-color',
            value: null
        };
        this.linkHoverBorderColor = {
            variable: '@nav-tabs-link-hover-border-color',
            value: null
        };
        this.linkActiveHoverBg = {
            variable: '@nav-tabs-active-link-hover-bg',
            value: null
        };
        this.linkActiveHoverColor = {
            variable: '@nav-tabs-active-link-hover-color',
            value: null
        };
        this.linkActiveHoverBorderColor = {
            variable: '@nav-tabs-active-link-hover-border-color',
            value: null
        };
        this.linkJustifiedBorderColor = {
            variable: '@nav-tabs-justified-link-border-color',
            value: null
        };
        this.linkJustifiedActiveBorderColor = {
            variable: '@nav-tabs-justified-active-link-border-color',
            value: null
        };

        this.modifiers = {
            borderColor:                        this.borderColor,
            linkHoverBorderColor:               this.linkHoverBorderColor,
            linkActiveHoverBg:                  this.linkActiveHoverBg,
            linkActiveHoverColor:               this.linkActiveHoverColor,
            linkActiveHoverBorderColor:         this.linkActiveHoverBorderColor,
            linkJustifiedBorderColor:           this.linkJustifiedBorderColor,
            linkJustifiedActiveBorderColor:     this.linkJustifiedActiveBorderColor
        };
    };

    // Inherit from parent Prototype and preserve constructor
	Tabs.prototype = Object.create(ThemeModifier.prototype);
	Tabs.constructor = Tabs;

	/**
	 * Gets the Border Color of the Tabs Component.
	 * 
	 * @returns {string}
	 */
	Tabs.prototype.getBorderColor = function () {
		return this.modifiers.borderColor.value;
	};

	/**
	 * Sets the Border Color of the Tabs Component.
	 * 
	 * @param {string} borderColor Sets the Tab Border Color.
	 * 
	 * @returns {undefined}
	 */
	Tabs.prototype.setBorderColor = function (borderColor) {
		this.modifiers.borderColor.value = borderColor;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Link Hover Border Color of the Tabs Component.
	 * 
	 * @returns {string}
	 */
	Tabs.prototype.getLinkHoverBorderColor = function () {
		return this.modifiers.linkHoverBorderColor.value;
	};
	
	/**
	 * Sets the Link Hover Border Color of the Tabs Component.
	 * 
	 * @param {string} linkHoverBorderColor Sets the Link Hover Border Color.
	 * 
	 * @returns {undefined}
	 */
	Tabs.prototype.setLinkHoverBorderColor = function (linkHoverBorderColor) {
		this.modifiers.linkHoverBorderColor.value = linkHoverBorderColor;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Link Active Hover Background Color of the Tabs Component.
	 * 
	 * @returns {string}
	 */
	Tabs.prototype.getLinkActiveHoverBackgroundColor = function () {
		return this.modifiers.linkActiveHoverBg.value;
	};
	
	/**
	 * Sets the Link Active Hover Background Color of the Tabs Component.
	 * 
	 * @param {string} color Sets the Link Active Hover Background Color.
	 * 
	 * @returns {undefined}
	 */
	Tabs.prototype.setLinkActiveHoverBackgroundColor = function (linkActiveHoverBg) {
		this.modifiers.linkActiveHoverBg.value = linkActiveHoverBg;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Link Active Hover Color of the Tabs Component.
	 * 
	 * @returns {string}
	 */
	Tabs.prototype.getLinkActiveHoverColor = function () {
		return this.modifiers.linkActiveHoverColor.value;
	};
	
	/**
	 * Sets the Link Active Hover Color of the Tabs Component.
	 * 
	 * @param {string} linkActiveHoverColor Sets the Link Active Hover Color.
	 * 
	 * @returns {undefined}
	 */
	Tabs.prototype.setLinkActiveHoverColor = function (linkActiveHoverColor) {
		this.modifiers.linkActiveHoverColor.value = linkActiveHoverColor;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Link Active Hover Border Color of the Tabs Component.
	 * 
	 * @returns {string}
	 */
	Tabs.prototype.getLinkActiveHoverBorderColor = function () {
		return this.modifiers.linkActiveHoverBorderColor.value;
	};
	
	/**
	 * Sets the Link Active Hover Border Color of the Tabs Component.
	 * 
	 * @param {string} linkActiveHoverBorderColor Sets the Link Active Hover Border Color.
	 * 
	 * @returns {undefined}
	 */
	Tabs.prototype.setLinkActiveHoverBorderColor = function (linkActiveHoverBorderColor) {
		this.modifiers.linkActiveHoverBorderColor.value = linkActiveHoverBorderColor;
		this.editor.queueModifications();
	};

    /**
     * Gets the Link Justified Border Color of the Tabs Component.
     * 
     * @returns {string}
     */
    Tabs.prototype.getLinkJustifiedBorderColor = function () {
        return this.modifiers.linkJustifiedBorderColor.value;
    };

    /**
     * Sets the Link Justified Border Color of the Tabs Component.
     * 
     * @param {string} linkJustifiedBorderColor Sets the Link Justified Border Color.
     * 
     * @returns {string}
     */
    Tabs.prototype.setLinkJustifiedBorderColor = function (linkJustifiedBorderColor) {
        this.modifiers.linkJustifiedBorderColor.value = linkJustifiedBorderColor;
        this.editor.queueModifications();
    };

    /**
     * Gets the Link Justified Active Border Color of the Tabs Component.
     * 
     * @returns {string}
     */
    Tabs.prototype.getLinkJustifiedActiveBorderColor = function () {
        return this.modifiers.linkJustifiedActiveBorderColor.value;
    };

    /**
     * Sets the Link Justified Active Border Color of the Tabs Component.
     * 
     * @param {string} linkJustifiedActiveBorderColor Sets the Link Justified Active Border Color.
     * 
     * @returns {string}
     */
    Tabs.prototype.setLinkJustifiedActiveBorderColor = function (linkJustifiedActiveBorderColor) {
        this.modifiers.linkJustifiedActiveBorderColor.value = linkJustifiedActiveBorderColor;
        this.editor.queueModifications();
    };

    window.Tabs = Tabs;
})(window);