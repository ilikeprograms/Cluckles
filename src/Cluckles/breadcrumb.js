(function (window) {
    "use strict";

    /**
	 * Allows modification of a Breadcrumb component in Bootstrap.
	 * 
	 * @class Breadcrumb
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} bg The @breadcrumb-bg variable which controls the Background color of the Breadcrumb component.
	 * @property {object} color The @breadcrumb-color variable which controls the Color of the Breadcrumb component.
	 * @property {object} activeColor The @breadcrumb-active-color variable which controls the Active Color of the Breadcrumb component.
	 * @property {object} seperator The @breadcrumb-seperator variable which controls the Seperator Character of the Breadcrumb component.
     * 
     * @returns {undefined}
     */
    var Breadcrumb = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-breadcrumb';

        this.bg = {
            variable: '@breadcrumb-bg',
            subscribeProperty: 'bg',
            changeFn: this.setBackground.bind(this),
            subscribers: [],
			_value: null
        };
        this.color = {
            variable: '@breadcrumb-color',
            subscribeProperty: 'color',
            changeFn: this.setColor.bind(this),
            subscribers: [],
			_value: null
        };
        this.activeColor = {
            variable: '@breadcrumb-active-color',
            subscribeProperty: 'active-color',
            changeFn: this.setActiveColor.bind(this),
            subscribers: [],
			_value: null
        };
        this.separator = {
            variable: '@breadcrumb-separator',
            subscribeProperty: 'separator',
            changeFn: this.setSeparator.bind(this),
            subscribers: [],
			_value: null
        };

        this.modifiers = {
            bg:             this.bg,
            color:          this.color,
            activeColor:    this.activeColor,
            separator:      this.separator
        };

        this.setupDataBinding();
    };

    // Inherit from parent Prototype and preserve constructor
    Breadcrumb.prototype = Object.create(ThemeModifier.prototype);
    Breadcrumb.constructor = Breadcrumb;

    /**
	 * Gets the Breadcrumb Background color.
	 * 
	 * @returns {String}
	 */
	Breadcrumb.prototype.getBackground = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Breadcrumb Background color.
	 * 
	 * @param {string} color Sets the Breadcrumb Background color.
	 * 
	 * @returns {undefined}
	 */
	Breadcrumb.prototype.setBackground = function (color) {
		this.modifiers.bg.value = color;
	};

    /**
	 * Gets the Breadcrumb Color.
	 * 
	 * @returns {string}
	 */
	Breadcrumb.prototype.getColor = function () {
		return this.modifiers.color.value;
	};

	/**
	 * Sets the Breadcrumb Color.
	 * 
	 * @param {string} color Sets the Breadcrumb Color.
	 * 
	 * @returns {undefined}
	 */
	Breadcrumb.prototype.setColor = function (color) {
		this.modifiers.color.value = color;
	};

    /**
	 * Gets the Breadcrumb Active Color.
	 * 
	 * @returns {string}
	 */
	Breadcrumb.prototype.getActiveColor = function () {
		return this.modifiers.activeColor.value;
	};

	/**
	 * Sets the Breadcrumb Active Color.
	 * 
	 * @param {string} activeColor Sets the Breadcrumb Active Color.
	 * 
	 * @returns {undefined}
	 */
	Breadcrumb.prototype.setActiveColor = function (activeColor) {
		this.modifiers.activeColor.value = activeColor;
	};

    /**
	 * Gets the Breadcrumb Separator Character.
	 * 
	 * @returns {string}
	 */
	Breadcrumb.prototype.getSeperator = function () {
		return this.modifiers.separator.value;
	};
	
	/**
	 * Sets the Breadcrumb Separator Character.
	 * 
	 * @param {string} separator Sets the Breadcrumb Separator Character.
	 * 
	 * @returns {undefined}
	 */
	Breadcrumb.prototype.setSeparator = function (separator) {
		this.modifiers.separator.value = separator;
	};

    window.Breadcrumb = Breadcrumb;
})(window);