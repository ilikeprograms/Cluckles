	/**
	 * Allows modifications of the Jumbotron component styling in Bootstrap.
	 * 
	 * @class Jumbotron
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} padding       The @jumbotron-padding variable which sets the Padding of the Jumbotron Component.
	 * @property {object} bg            The @jumbotron-bg variable which sets the Background of the Jumbotron Component.
	 * @property {object} headingColor  The @jumbotron-heading-color variable which sets the Heading of the Jumbotron Component.
	 * @property {object} color         The @jumbotron-color variable which sets the Color of the Jumbotron Component.
	 * @property {object} fontSize      The @jumbotron-font-size variable which sets the Font Size of the Jumbotron Component.
	 * 
	 * @returns {Jumbotron}
	 */
    var Jumbotron = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-jumbotron';

        // Configure the Modifiers
        this.padding = {
            variable:           '@jumbotron-padding',
            subscribeProperty:  'padding',
            suffixUnit:         true,
            changeFn:           this.setPadding.bind(this),
            subscribers:        [],
            _value:             null
        };
        this.bg = {
            variable:           '@jumbotron-bg',
            subscribeProperty:  'bg',
            changeFn:           this.setBackgroundColor.bind(this),
            subscribers:        [],
            _value:             null
        };
        this.headingColor = {
            variable:           '@jumbotron-heading-color',
            subscribeProperty:  'heading-color',
            changeFn:           this.setHeadingColor.bind(this),
            subscribers:        [],
            _value:             null
        };
        this.color = {
            variable:           '@jumbotron-color',
            subscribeProperty:  'color',
            changeFn:           this.setColor.bind(this),
            subscribers:        [],
            _value:             null
        };
        this.fontSize = {
            variable:           '@jumbotron-font-size',
            subscribeProperty:  'font-size',
            suffixUnit:         true,
            changeFn:           this.setFontSize.bind(this),
            subscribers:        [],
            _value:             null
        };

        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            padding:        this.padding,
            bg:             this.bg,
            headingColor:   this.headingColor,
            color:          this.color,
            fontSize:       this.fontSize
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Jumbotron.prototype             = Object.create(ThemeModifier.prototype);
	Jumbotron.prototype.constructor = Jumbotron;

    /**
     * Gets the Padding of the Jumbotron Component.
     * 
     * @returns {string}
     */
    Jumbotron.prototype.getPadding = function () {
        return this.modifiers.padding.value;
    };

    /**
     * Sets the Padding of the Jumbotron Component.
     * 
     * @param {string} padding  The Jumbotron Padding to set.
     * @param {string} unit     The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Jumbotron.prototype.setPadding = function (padding, unit) {
        if (unit !== undefined) { this.modifiers.padding.unit = unit; }

        this.modifiers.padding.value = padding;
    };

    /**
     * Gets the Background Color of the Jumbotron Component.
     * 
     * @returns {string}
     */
    Jumbotron.prototype.getBackgroundColor = function () {
        return this.modifiers.bg.value;
    };

    /**
     * Sets the Background Color of the Jumbotron Component.
     * 
     * @param {string} backgroundColor The Jumbotron Background Color to set.
     * 
     * @returns {undefined}
     */
    Jumbotron.prototype.setBackgroundColor = function (backgroundColor) {
        this.modifiers.bg.value = backgroundColor;
    };

    /**
     * Gets the Background of the Jumbotron Component.
     * 
     * @returns {string}
     */
    Jumbotron.prototype.getColor = function () {
        return this.modifiers.color.value;
    };

    /**
     * Sets the Text Color of the Jumbotron Component.
     * 
     * @param {string} textColor The Jumbotron Text Color to set,
     * 
     * @returns {undefined}
     */
    Jumbotron.prototype.setColor = function (textColor) {
        this.modifiers.color.value = textColor;
    };

    /**
     * Gets the Heading Color of the Jumbotron Component.
     * 
     * @returns {string}
     */
    Jumbotron.prototype.getHeadingColor = function () {
        return this.modifiers.headingColor.value;
    };

    /**
     * Sets the Heading Color of the Jumbotron Component.
     * 
     * @param {string} headingColor The Jumbotron Heading Color to set.
     * 
     * @returns {undefined}
     */
    Jumbotron.prototype.setHeadingColor = function (headingColor) {
        this.modifiers.headingColor.value = headingColor;
    };

    /**
     * Gets the Font Size of the Jumbotron Component.
     * 
     * @returns {string}
     */
    Jumbotron.prototype.getFontSize = function () {
        return this.modifiers.fontSize.value;
    };

    /**
     * Sets the Font Size of the Jumbotron Component.
     * 
     * @param {string} fontSize The Jumbotron Font Size to set.
     * @param {string} unit     The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Jumbotron.prototype.setFontSize = function (fontSize, unit) {
        if (unit !== undefined) { this.modifiers.fontSize.unit = unit; }

        this.modifiers.fontSize.value = fontSize;
    };