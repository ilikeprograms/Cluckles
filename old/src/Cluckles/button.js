    /**
	 * Allows modification of the Button component in Bootstrap.
	 * 
	 * @class Button
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
     * @param {string} string The style of Button Component to modify.
	 * 
	 * @property {object} bg        The @btn-{style}-bg variable which controls the Background Color of the Button Component.
	 * @property {object} color     The @btn-{style}-color variable which controls the Color of the Button Component.
	 * @property {object} border    The @btn-{style}-border variable which controls the Border of the Button Component.
	 * 
	 * @returns {Button}
	 */
	var Button = function (editor, style) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-button-' + style;

        if (style === undefined) {
            throw new TypeError('ClucklesEditor.button.js: style cannot be undefined');
        }

        // Configure the Modifiers
		this.bg = {
			variable:           '@btn-' + style + '-bg',
			subscribeProperty:  'bg',
            changeFn:           this.setBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.color = {
			variable:           '@btn-' + style + '-color',
			subscribeProperty:  'color',
            changeFn:           this.setColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.border = {
			variable:           '@btn-' + style + '-border',
			subscribeProperty:  'hover-border-color',
            changeFn:           this.setBorderColor.bind(this),
            subscribers:        [],
			_value:             null
		};

        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            bg:     this.bg,
            color:  this.color,
            border: this.border
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Button.prototype                = Object.create(ThemeModifier.prototype);
	Button.prototype.constructor    = Button;

	/**
	 * Gets the Background Color of this Button instance.
	 * 
	 * @returns {String}
	 */
	Button.prototype.getBackgroundColor = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background color of this Button instance.
	 * 
	 * @param {string} backgroundColor The Button Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Button.prototype.setBackgroundColor = function (backgroundColor) {
		this.modifiers.bg.value = backgroundColor;
	};

	/**
	 * Gets the Color of this Button instance.
	 * 
	 * @returns {string}
	 */
	Button.prototype.getColor = function () {
		return this.modifiers.color.value;
	};

	/**
	 * Sets the Color of this Button instance.
	 * 
	 * @param {string} color The Button Color to set.
	 * 
	 * @returns {undefined}
	 */
	Button.prototype.setColor = function (color) {
		this.modifiers.color.value = color;
	};

	/**
	 * Gets the Border Color of this Button instance.
	 * 
	 * @returns {string}
	 */
	Button.prototype.getBorderColor = function () {
		return this.modifiers.border.value;
	};

	/**
	 * Sets the Border Color of this Button instance.
	 * 
	 * @param {string} borderColor The Button Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	Button.prototype.setBorderColor = function (borderColor) {
		this.modifiers.border.value = borderColor;
	};