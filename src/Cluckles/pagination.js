(function (window) {
	"use strict";

	/**
	 * Allows modification of a Pagination component in Bootstrap.
	 * 
	 * @class Pagination
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} color The @pagination-color variable which controls the Color of the Pagination component.
	 * @property {object} bg The @pagination-bg variable which controls the Background Color of the Pagination component.
	 * @property {object} borderColor The @pagination-border variable which controls the Border Color of the Pagination component.
	 * @property {object} hoverColor The @pagination-hover-color variable which controls the Hover Color of the Pagination component.
	 * @property {object} hoverBg The @pagination-hover-bg variable which controls the Hover Background Color of the Pagination component.
	 * @property {object} hoverBorderColor The @pagination-hover-border variable which controls the Hover Border Color of the Pagination component.
	 * @property {object} activeColor The @pagination-active-color variable which controls the Active Color of the Pagination component.
	 * @property {object} activeBg The @pagination-active-bg variable which controls the Active Background Color of the Pagination component.
	 * @property {object} activeBorderColor The @pagination-active-border variable which controls the Active Border Color of the Pagination component.
	 * @property {object} disabledColor The @pagination-disabled-color variable which controls the Disabled Color of the Pagination component.
	 * @property {object} disabledBg The @pagination-disabled-bg variable which controls the Disabled Background Color of the Pagination component.
	 * @property {object} disabledBorderColor The @pagination-disabled-border variable which controls the Disabled Border Color of the Pagination component.
	 * 
	 * @returns {Pagination}
	 */
	var Pagination = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-pagination';

        this.color = {
            variable: '@pagination-color',
            subscribeProperty:  'color',
            changeFn:           this.setColor.bind(this),
            subscribers:        [],
			_value: null
        };
        this.bg = {
            variable: '@pagination-bg',
            subscribeProperty:  'bg',
            changeFn:           this.setBackground.bind(this),
            subscribers:        [],
			_value: null
        };
        this.borderColor = {
            variable: '@pagination-border',
            subscribeProperty:  'border-color',
            changeFn:           this.setBorderColor.bind(this),
            subscribers:        [],
			_value: null
        };
        this.hoverColor = {
            variable: '@pagination-hover-color',
            subscribeProperty:  'hover-color',
            changeFn:           this.setHoverColor.bind(this),
            subscribers:        [],
			_value: null
        };
        this.hoverBg = {
            variable: '@pagination-hover-bg',
            subscribeProperty:  'hover-bg',
            changeFn:           this.setHoverBackground.bind(this),
            subscribers:        [],
			_value: null
        };
        this.hoverBorderColor = {
            variable: '@pagination-hover-border',
            subscribeProperty:  'hover-border-color',
            changeFn:           this.setHoverBorderColor.bind(this),
            subscribers:        [],
			_value: null
        };
        this.activeColor = {
            variable: '@pagination-active-color',
            subscribeProperty:  'active-color',
            changeFn:           this.setActiveColor.bind(this),
            subscribers:        [],
			_value: null
        };
        this.activeBg = {
            variable: '@pagination-active-bg',
            subscribeProperty:  'active-bg',
            changeFn:           this.setActiveBackground.bind(this),
            subscribers:        [],
			_value: null
        };
        this.activeBorderColor = {
            variable: '@pagination-active-border',
            subscribeProperty:  'active-border',
            changeFn:           this.setActiveBorderColor.bind(this),
            subscribers:        [],
			_value: null
        };
        this.disabledColor = {
            variable: '@pagination-disabled-color',
            subscribeProperty:  'disabled-color',
            changeFn:           this.setDisabledColor.bind(this),
            subscribers:        [],
			_value: null
        };
        this.disabledBg = {
            variable: '@pagination-disabled-bg',
            subscribeProperty:  'disabled-bg',
            changeFn:           this.setDisabledBackground.bind(this),
            subscribers:        [],
			_value: null
        };
        this.disabledBorderColor = {
            variable: '@pagination-disabled-border',
            subscribeProperty:  'disabled-border-color',
            changeFn:           this.setDisabledBorderColor.bind(this),
            subscribers:        [],
			_value: null
        };
        
        this.modifiers = {
            color:                  this.color,
            bg:                     this.bg,
            borderColor:            this.borderColor,
            hoverColor:             this.hoverColor,
            hoverBg:                this.hoverBg,
            hoverBorderColor:       this.hoverBorderColor,
            activeColor:            this.activeColor,
            activeBg:               this.activeBg,
            activeBorderColor:      this.activeBorderColor,
            disabledColor:          this.disabledColor,
            disabledBg:             this.disabledBg,
            disabledBorderColor:    this.disabledBorderColor
        };

        this.setupDataBinding();
    };

    // Inherit from parent Prototype and preserve constructor
	Pagination.prototype = Object.create(ThemeModifier.prototype);
	Pagination.constructor = Pagination;

    /**
	 * Gets the Color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getColor = function () {
		return this.modifiers.color.value;
	};

	/**
	 * Gets the Color of the Pagination Component.
	 * 
	 * @param {string} color Sets the Pagination Color.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setColor = function (color) {
		this.modifiers.color.value = color;
	};

    /**
	 * Gets the Background Color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getBackground = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background Color of the Pagination Component.
	 * 
	 * @param {string} bg Sets the Pagination Background Color.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setBackground = function (bg) {
		this.modifiers.bg.value = bg;
	};

	/**
	 * Gets the Border color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getBorderColor = function () {
		return this.modifiers.borderColor.value;
	};

	/**
	 * Sets the Border color of the Pagination Component.
	 * 
	 * @param {string} borderColor Sets the Pagination Border Color.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setBorderColor = function (borderColor) {
		this.modifiers.borderColor.value = borderColor;
	};

    /**
	 * Gets the Hover Color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getHoverColor = function () {
		return this.modifiers.hoverColor.value;
	};

	/**
	 * Gets the Hover Color of the Pagination Component.
	 * 
	 * @param {string} color Sets the Pagination Hover Color.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setHoverColor = function (hoverColor) {
		this.modifiers.hoverColor.value = hoverColor;
	};

    /**
	 * Gets the Background Hover Color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getHoverBackground = function () {
		return this.modifiers.hoverBg.value;
	};

	/**
	 * Sets the Background Hover Color of the Pagination Component.
	 * 
	 * @param {string} hoverBg Sets the Pagination Background Hover Color.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setHoverBackground = function (hoverBg) {
		this.modifiers.hoverBg.value = hoverBg;
	};

	/**
	 * Gets the Hover Border color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getHoverBorderColor = function () {
		return this.modifiers.hoverBorderColor.value;
	};

	/**
	 * Sets the Hover Border color of the Pagination Component.
	 * 
	 * @param {string} hoverBorderColor Sets the Pagination Border Hover Color.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setHoverBorderColor = function (hoverBorderColor) {
		this.modifiers.hoverBorderColor.value = hoverBorderColor;
	};

    /**
	 * Gets the Active Color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getActiveColor = function () {
		return this.modifiers.activeColor.value;
	};

	/**
	 * Gets the Active Color of the Pagination Component.
	 * 
	 * @param {string} color Sets the Pagination Active Color.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setActiveColor = function (activeColor) {
		this.modifiers.activeColor.value = activeColor;
	};

    /**
	 * Gets the Background Active Color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getActiveBackground = function () {
		return this.modifiers.activeBg.value;
	};

	/**
	 * Sets the Background Active Color of the Pagination Component.
	 * 
	 * @param {string} activeBg Sets the Pagination Background Active Color.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setActiveBackground = function (activeBg) {
		this.modifiers.activeBg.value = activeBg;
	};

	/**
	 * Gets the Active Border color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getActiveBorderColor = function () {
		return this.modifiers.activeBorderColor.value;
	};

	/**
	 * Sets the Active Border color of the Pagination Component.
	 * 
	 * @param {string} activeBorderColor Sets the Pagination Border Active Color.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setActiveBorderColor = function (activeBorderColor) {
		this.modifiers.activeBorderColor.value = activeBorderColor;
	};

    /**
	 * Gets the Disabled Color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getDisabledColor = function () {
		return this.modifiers.disabledColor.value;
	};

	/**
	 * Gets the Disabled Color of the Pagination Component.
	 * 
	 * @param {string} color Sets the Pagination Disabled Color.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setDisabledColor = function (disabledColor) {
		this.modifiers.disabledColor.value = disabledColor;
	};

    /**
	 * Gets the Background Disabled Color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getDisabledBackground = function () {
		return this.modifiers.disabledBg.value;
	};

	/**
	 * Sets the Background Disabled Color of the Pagination Component.
	 * 
	 * @param {string} disabledBg Sets the Pagination Background Disabled Color.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setDisabledBackground = function (disabledBg) {
		this.modifiers.disabledBg.value = disabledBg;
	};

	/**
	 * Gets the Disabled Border color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getDisabledBorderColor = function () {
		return this.modifiers.disabledBorderColor.value;
	};

	/**
	 * Sets the Disabled Border color of the Pagination Component.
	 * 
	 * @param {string} disabledBorderColor Sets the Pagination Border Disabled Color.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setDisabledBorderColor = function (disabledBorderColor) {
		this.modifiers.disabledBorderColor.value = disabledBorderColor;
	};

    window.Pagination = Pagination;
})(window);