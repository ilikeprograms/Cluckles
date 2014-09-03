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

        this.subscriberDataAttribute = 'data-cluckles-pill';

        this.borderRadius = {
            variable: '@nav-pills-border-radius',
            subscribeProperty:  'border-radius',
            changeFn:           this.setBorderRadius.bind(this),
            subscribers:        [],
			_value: null
        };
        this.linkActiveBg = {
            variable: '@nav-pills-active-link-hover-bg',
            subscribeProperty:  'link-active-bg',
            changeFn:           this.setLinkActiveBackgroundColor.bind(this),
            subscribers:        [],
			_value: null
        };
        this.linkActiveColor = {
            variable: '@nav-pills-active-link-hover-color',
            subscribeProperty:  'link-active-color',
            changeFn:           this.setLinkActiveColor.bind(this),
            subscribers:        [],
			_value: null
        };

        Object.defineProperty(this.borderRadius, 'value', {
            get: function () { return this._value; },
            set: function (val) {
                this._value = val + 'px';
                editor.queueModifications();

                this.subscribers.forEach(function (subscriber) {
                    subscriber.value = val;
                });
            } 
        });

        this.modifiers = {
            borderRadius:       this.borderRadius,
            linkActiveBg:       this.linkActiveBg,
            linkActiveColor:    this.linkActiveColor
        };

        this.setupDataBinding();
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
		this.modifiers.borderRadius.value = borderRadius;
	};

    /**
	 * Gets the Link Active Background Color of the Pills Component.
	 * 
	 * @returns {string}
	 */
	Pills.prototype.getLinkActiveBackgroundColor = function () {
		return this.modifiers.linkActiveBg.value;
	};
	
	/**
	 * Sets the Link Active Background Color of the Pills Component.
	 * 
	 * @param {string} linkActiveBg Sets the Link Active Background Color.
	 * 
	 * @returns {undefined}
	 */
	Pills.prototype.setLinkActiveBackgroundColor = function (linkActiveBg) {
		this.modifiers.linkActiveBg.value = linkActiveBg;
	};

	/**
	 * Gets the Link Active Color of the Pills Component.
	 * 
	 * @returns {string}
	 */
	Pills.prototype.getLinkActiveColor = function () {
		return this.modifiers.linkActiveColor.value;
	};
	
	/**
	 * Sets the Link Active Color of the Pills Component.
	 * 
	 * @param {string} linkActiveColor Sets the Link Active Hover Color.
	 * 
	 * @returns {undefined}
	 */
	Pills.prototype.setLinkActiveColor = function (linkActiveColor) {
		this.modifiers.linkActiveColor.value = linkActiveColor;
	};

    window.Pills = Pills;
})(window);