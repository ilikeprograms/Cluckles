	/**
	 * Allows modifications of the Tooltip component styling in Bootstrap.
	 * 
	 * @class Tooltip
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} maxWidth      The @tooltip-max-width variable which sets the Max Width of the Tooltip Component.
	 * @property {object} bg            The @tooltip-bg variable which sets the Background Color of the Tooltip Component.
	 * @property {object} color         The @tooltip-color variable which sets the Color of the Tooltip Component.
	 * @property {object} opacity       The @tooltip-opacity variable which sets the Opacity of the Tooltip Component.
	 * @property {object} arrowWidth    The @tooltip-arrow-width variable which sets the Arrow Width of the Tooltip Component.
	 * @property {object} arrowColor    The @tooltip-arrow-color variable which sets the Arrow Color of the Tooltip Component.
	 * 
	 * @returns {Tooltip}
	 */
	var Tooltip = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-tooltip';

        // Configure the Modifiers
        this.maxWidth = {
            variable:           '@tooltip-max-width',
            subscribeProperty:  'max-width',
            suffixUnit:         true,
            changeFn:           this.setMaxWidth.bind(this),
            subscribers:        [],
			_value:             null
        };
		this.bg = {
			variable:           '@tooltip-bg',
			subscribeProperty:  'bg',
            changeFn:           this.setBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.color = {
			variable:           '@tooltip-color',
			subscribeProperty:  'color',
            changeFn:           this.setColor.bind(this),
            subscribers:        [],
			_value:             null
		};
        this.opacity = {
            variable:           '@tooltip-opacity',
            subscribeProperty:  'opacity',
            changeFn:           this.setOpacity.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.arrowWidth = {
            variable:           '@tooltip-arrow-width',
            subscribeProperty:  'arrow-width',
            suffixUnit:         true,
            changeFn:           this.setArrowWidth.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.arrowColor = {
            variable:           '@tooltip-arrow-color',
            subscribeProperty:  'arrow-color',
            changeFn:           this.setArrowColor.bind(this),
            subscribers:        [],
			_value:             null
        };
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            maxWidth:   this.maxWidth,
            bg:         this.bg,
            color:      this.color,
            opacity:    this.opacity,
            arrowWidth: this.arrowWidth,
            arrowColor: this.arrowColor
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Tooltip.prototype               = Object.create(ThemeModifier.prototype);
	Tooltip.prototype.constructor   = Tooltip;

    /**
     * Gets the Max Width of the Tooltip Components.
     * 
     * @returns {string}
     */
    Tooltip.prototype.getMaxWidth = function () {
        return this.modifiers.maxWidth.value;
    };

    /**
     * Sets the Max Width of the Tooltip Components.
     * 
     * @param {string} maxWidth The Tooltip Max Width to set.
     * @param {string} unit     The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Tooltip.prototype.setMaxWidth = function (maxWidth, unit) {
        if (unit !== undefined) { this.modifiers.maxWidth.unit = unit; }

        this.modifiers.maxWidth.value = maxWidth;
    };

	/**
	 * Gets the Background Color of the Tooltip Component.
	 * 
	 * @returns {string}
	 */
	Tooltip.prototype.getBackgroundColor = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background Color of the Tooltip Component.
	 * 
	 * @param {string} backgroundColor The Tooltip Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Tooltip.prototype.setBackgroundColor = function (backgroundColor) {
		this.modifiers.bg.value = backgroundColor;
	};

	/**
	 * Gets the Background of the Tooltip Component.
	 * 
	 * @returns {string}
	 */
	Tooltip.prototype.getColor = function () {
		return this.modifiers.color.value;
	};

	/**
	 * Sets the Text color of the Tooltip Component.
	 * 
	 * @param {string} textColor The Tooltip Text Color to set.
	 * 
	 * @returns {undefined}
	 */
	Tooltip.prototype.setColor = function (textColor) {
		this.modifiers.color.value = textColor;
	};

    /**
     * Gets the Opacity of the Tooltip Component.
     * 
     * @returns {string}
     */
    Tooltip.prototype.getOpacity = function () {
        return this.modifiers.opacity.value;
    };

    /**
     * Sets the Opacity of the Tooltip Component.
     * 
     * @param {string} opacity The Tooltip Opacity to set.
     * 
     * @returns {string}
     */
    Tooltip.prototype.setOpacity = function (opacity) {
        this.modifiers.opacity.value = opacity;
    };
    
    /**
     * Gets the Arrow Width of the Tooltip Component.
     * 
     * @returns {string}
     */
    Tooltip.prototype.getArrowWidth = function () {
        return this.modifiers.arrowWidth.value;
    };
    
    /**
     * Sets the Arrow Width of the Tooltip Component.
     * 
     * @param {string} arrow The Tooltip Arrow Width to set.
     * @param {string} unit  The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Tooltip.prototype.setArrowWidth = function (arrowWidth, unit) {
        if (unit !== undefined) { this.modifiers.arrowWidth.unit = unit; }

        this.modifiers.arrowWidth.value = arrowWidth;
    };
    
    /**
     * Gets the Arrow Color of the Tooltip Component.
     * 
     * @returns {string}
     */
    Tooltip.prototype.getArrowColor = function () {
        return this.modifiers.arrowColor.value;
    };
    
    /**
     * Sets the Arrow Color of the Tooltip Component.
     * 
     * @param {string} arrowColor The Tooltip Arrow Color to set.
     * 
     * @returns {undefined}
     */
    Tooltip.prototype.setArrowColor = function (arrowColor) {
        this.modifiers.arrowColor.value = arrowColor;
    };