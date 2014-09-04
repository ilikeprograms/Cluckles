(function (window) {
	"use strict";

	/**
	 * Allows modification of a Tab component in Bootstrap.
	 * 
	 * @class Tab
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} borderColor The @nav-tabs-border-color variable which controls the Border Color of the Tab component.
	 * @property {object} linkHoverBorderColor The @nav-tabs-link-hover-border-color variable which controls the Link Hover Border Color of the Tab component.
	 * @property {object} linkActiveHoverBg The @nav-tabs-active-link-hover-bg variable which controls the Link Active Hover Background Color of the Tab component.
	 * @property {object} linkActiveHoverColor The @nav-tabs-active-link-hover-color variable which controls the Link Active Hover Color of the Tab component.
	 * @property {object} linkActiveHoverBorderColor The @nav-tabs-active-link-hover-color variable which controls the Link Active Hover Border Color of the Tab component.
	 * @property {object} linkJustifiedBorderColor The @nav-tabs-justified-link-border-color variable which controls the Link Justified Border Color of the Tab component.
	 * @property {object} linkJustifiedActiveBorderColor The @nav-tabs-justified-active-link-border-color variable which controls the Link Justified Active Border Color of the Tab component.
	 * 
	 * @returns {Tab}
	 */
	var Tab = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-tab';

        this.borderColor = {
            variable: '@nav-tabs-border-color',
            subscribeProperty:  'border-color',
            changeFn:           this.setBorderColor.bind(this),
            subscribers:        [],
			_value: null
        };
        this.linkHoverBorderColor = {
            variable: '@nav-tabs-link-hover-border-color',
            subscribeProperty:  'link-hover-border-color',
            changeFn:           this.setLinkHoverBorderColor.bind(this),
            subscribers:        [],
			_value: null
        };
        this.linkActiveBg = {
            variable: '@nav-tabs-active-link-hover-bg',
            subscribeProperty:  'link-active-bg',
            changeFn:           this.setLinkActiveBackgroundColor.bind(this),
            subscribers:        [],
			_value: null
        };
        this.linkActiveColor = {
            variable: '@nav-tabs-active-link-hover-color',
            subscribeProperty:  'link-active-color',
            changeFn:           this.setLinkActiveColor.bind(this),
            subscribers:        [],
			_value: null
        };
        this.linkActiveBorderColor = {
            variable: '@nav-tabs-active-link-hover-border-color',
            subscribeProperty:  'link-active-border-color',
            changeFn:           this.setLinkActiveBorderColor.bind(this),
            subscribers:        [],
			_value: null
        };
        this.linkJustifiedBorderColor = {
            variable: '@nav-tabs-justified-link-border-color',
            subscribeProperty:  'link-justified-border-color',
            changeFn:           this.setLinkJustifiedBorderColor.bind(this),
            subscribers:        [],
			_value: null
        };
        this.linkJustifiedActiveBorderColor = {
            variable: '@nav-tabs-justified-active-link-border-color',
            subscribeProperty:  'link-justified-active-border-color',
            changeFn:           this.setLinkJustifiedActiveBorderColor.bind(this),
            subscribers:        [],
			_value: null
        };

        this.modifiers = {
            borderColor:                        this.borderColor,
            linkHoverBorderColor:               this.linkHoverBorderColor,
            linkActiveBg:                       this.linkActiveBg,
            linkActiveColor:                    this.linkActiveColor,
            linkActiveBorderColor:              this.linkActiveBorderColor,
            linkJustifiedBorderColor:           this.linkJustifiedBorderColor,
            linkJustifiedActiveBorderColor:     this.linkJustifiedActiveBorderColor
        };

        this.setupDataBinding();
    };

    // Inherit from parent Prototype and preserve constructor
	Tab.prototype = Object.create(ThemeModifier.prototype);
	Tab.constructor = Tab;

	/**
	 * Gets the Border Color of the Tab Component.
	 * 
	 * @returns {string}
	 */
	Tab.prototype.getBorderColor = function () {
		return this.modifiers.borderColor.value;
	};

	/**
	 * Sets the Border Color of the Tab Component.
	 * 
	 * @param {string} borderColor Sets the Tab Border Color.
	 * 
	 * @returns {undefined}
	 */
	Tab.prototype.setBorderColor = function (borderColor) {
		this.modifiers.borderColor.value = borderColor;
	};

	/**
	 * Gets the Link Hover Border Color of the Tab Component.
	 * 
	 * @returns {string}
	 */
	Tab.prototype.getLinkHoverBorderColor = function () {
		return this.modifiers.linkHoverBorderColor.value;
	};
	
	/**
	 * Sets the Link Hover Border Color of the Tab Component.
	 * 
	 * @param {string} linkHoverBorderColor Sets the Link Hover Border Color.
	 * 
	 * @returns {undefined}
	 */
	Tab.prototype.setLinkHoverBorderColor = function (linkHoverBorderColor) {
		this.modifiers.linkHoverBorderColor.value = linkHoverBorderColor;
	};

    /**
	 * Gets the Link Active Background Color of the Tab Component.
	 * 
	 * @returns {string}
	 */
	Tab.prototype.getLinkActiveBackgroundColor = function () {
		return this.modifiers.linkActiveHoverBg.value;
	};
	
	/**
	 * Sets the Link Active Background Color of the Tab Component.
	 * 
	 * @param {string} linkActiveBg Sets the Link Active Background Color.
	 * 
	 * @returns {undefined}
	 */
	Tab.prototype.setLinkActiveBackgroundColor = function (linkActiveBg) {
		this.modifiers.linkActiveBg.value = linkActiveBg;
	};

	/**
	 * Gets the Link Active Color of the Tab Component.
	 * 
	 * @returns {string}
	 */
	Tab.prototype.getLinkActiveColor = function () {
		return this.modifiers.linkActiveColor.value;
	};
	
	/**
	 * Sets the Link Active Color of the Tab Component.
	 * 
	 * @param {string} linkActiveColor Sets the Link Active Hover Color.
	 * 
	 * @returns {undefined}
	 */
	Tab.prototype.setLinkActiveColor = function (linkActiveColor) {
		this.modifiers.linkActiveColor.value = linkActiveColor;
	};

	/**
	 * Gets the Link Active Border Color of the Tab Component.
	 * 
	 * @returns {string}
	 */
	Tab.prototype.getLinkActiveBorderColor = function () {
		return this.modifiers.linkActiveBorderColor.value;
	};
	
	/**
	 * Sets the Link Active Border Color of the Tab Component.
	 * 
	 * @param {string} linkActiveBorderColor Sets the Link Active Hover Border Color.
	 * 
	 * @returns {undefined}
	 */
	Tab.prototype.setLinkActiveBorderColor = function (linkActiveBorderColor) {
		this.modifiers.linkActiveBorderColor.value = linkActiveBorderColor;
	};

    /**
     * Gets the Link Justified Border Color of the Tab Component.
     * 
     * @returns {string}
     */
    Tab.prototype.getLinkJustifiedBorderColor = function () {
        return this.modifiers.linkJustifiedBorderColor.value;
    };

    /**
     * Sets the Link Justified Border Color of the Tab Component.
     * 
     * @param {string} linkJustifiedBorderColor Sets the Link Justified Border Color.
     * 
     * @returns {string}
     */
    Tab.prototype.setLinkJustifiedBorderColor = function (linkJustifiedBorderColor) {
        this.modifiers.linkJustifiedBorderColor.value = linkJustifiedBorderColor;
    };

    /**
     * Gets the Link Justified Active Border Color of the Tab Component.
     * 
     * @returns {string}
     */
    Tab.prototype.getLinkJustifiedActiveBorderColor = function () {
        return this.modifiers.linkJustifiedActiveBorderColor.value;
    };

    /**
     * Sets the Link Justified Active Border Color of the Tab Component.
     * 
     * @param {string} linkJustifiedActiveBorderColor Sets the Link Justified Active Border Color.
     * 
     * @returns {string}
     */
    Tab.prototype.setLinkJustifiedActiveBorderColor = function (linkJustifiedActiveBorderColor) {
        this.modifiers.linkJustifiedActiveBorderColor.value = linkJustifiedActiveBorderColor;
    };

    window.Tab = Tab;
})(window);