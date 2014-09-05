	/**
	 * Allows modifications of the Popover component styling in Bootstrap.
	 * 
	 * @class Popover
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
     * @property {object} bg The @popover-bg variable which sets the Background of the Popover component.
	 * @property {object} maxWidth The @popover-max-width variable which sets the Max Width of the Popover component.
	 * @property {object} borderColor The @popover-border-color variable which sets the Border Color of the Popover component.
	 * @property {object} fallbackBorderColor The @popover-fallback-border-color variable which sets the Fallback Border Color of the Popover component.
	 * @property {object} titleBg The @popover-title-bg variable which sets the Title Background Color of the Popover component.
	 * @property {object} arrowWidth The @popover-arrow-width variable which sets the Arrow Width of the Popover component.
	 * @property {object} arrowColor The @popover-arrow-color variable which sets the Arrow Color of the Popover component.
	 * @property {object} arrowOuterWidth The @popover-arrow-outer-width variable which sets the Arrow Outer Width of the Popover component.
	 * @property {object} arrowOuterColor The @popover-arrow-outer-color variable which sets the Arrow Outer Color of the Popover component.
	 * @property {object} arrowOuterFallbackColor The @popover-arrow-outer-fallback-color variable which sets the Arrow Outer Fallback Color of the Popover component.
	 * 
	 * @returns {Popover}
	 */
	var Popover = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-popover';

        // Configure the Modifiers
        this.bg = {
			variable: '@popover-bg',
			subscribeProperty:  'bg',
            changeFn:           this.setBackground.bind(this),
            subscribers:        [],
			_value: null
		};
        this.maxWidth = {
            variable: '@popover-max-width',
            subscribeProperty:  'max-width',
            changeFn:           this.setMaxWidth.bind(this),
            subscribers:        [],
			_value: null
        };
        this.borderColor = {
            variable: '@popover-border-color',
            subscribeProperty:  'border-color',
            changeFn:           this.setBorderColor.bind(this),
            subscribers:        [],
			_value: null
        };
        this.fallbackBorderColor = {
            variable: '@popover-fallback-border-color',
            subscribeProperty:  'fallback-border-color',
            changeFn:           this.setFallbackBorderColor.bind(this),
            subscribers:        [],
			_value: null
        };
        this.titleBg = {
            variable: '@popover-title-bg',
            subscribeProperty:  'title-bg',
            changeFn:           this.setTitleBackgroundColor.bind(this),
            subscribers:        [],
			_value: null
        };
        this.arrowWidth = {
            variable: '@popover-arrow-width',
            subscribeProperty:  'arrow-width',
            changeFn:           this.setArrowWidth.bind(this),
            subscribers:        [],
			_value: null
        };
        this.arrowColor = {
            variable: '@popover-arrow-color',
            subscribeProperty:  'arrow-color',
            changeFn:           this.setArrowColor.bind(this),
            subscribers:        [],
			_value: null
        };
        this.arrowOuterWidth = {
            variable: '@popover-arrow-outer-width',
            subscribeProperty:  'arrow-outer-width',
            changeFn:           this.setArrowOuterWidth.bind(this),
            subscribers:        [],
			_value: null
        };
        this.arrowOuterColor = {
            variable: '@popover-arrow-outer-color',
            subscribeProperty:  'arrow-outer-color',
            changeFn:           this.setArrowOuterColor.bind(this),
            subscribers:        [],
			_value: null
        };
        this.arrowOuterFallbackColor = {
            variable: '@popover-arrow-outer-fallback-color',
            subscribeProperty:  'arrow-outer-fallback-color-',
            changeFn:           this.setArrowOuterFallbackColor.bind(this),
            subscribers:        [],
			_value: null
        };

        Object.defineProperty(this.maxWidth, 'value', {
            get: function () { return this._value; },
            set: function (val) {
                this._value = val + 'px';
                editor.queueModifications();

                this.subscribers.forEach(function (subscriber) {
                    subscriber.value = val;
                });
            } 
        });

        Object.defineProperty(this.arrowWidth, 'value', {
            get: function () { return this._value; },
            set: function (val) {
                this._value = val + 'px';
                editor.queueModifications();

                this.subscribers.forEach(function (subscriber) {
                    subscriber.value = val;
                });
            } 
        });

        Object.defineProperty(this.arrowOuterWidth, 'value', {
            get: function () { return this._value; },
            set: function (val) {
                this._value = val + 'px';
                editor.queueModifications();

                this.subscribers.forEach(function (subscriber) {
                    subscriber.value = val;
                });
            } 
        });
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            bg:                         this.bg,
            maxWidth:                   this.maxWidth,
            borderColor:                this.borderColor,
            fallbackBorderColor:        this.fallbackBorderColor,
            titleBg:                    this.titleBg,
            arrowWidth:                 this.arrowWidth,
            arrowColor:                 this.arrowColor,
            arrowOuterWidth:            this.arrowOuterWidth,
            arrowOuterColor:            this.arrowOuterColor,
            arrowOuterFallbackColor:    this.arrowOuterFallbackColor
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Popover.prototype = Object.create(ThemeModifier.prototype);
	Popover.constructor = Popover;

	/**
	 * Gets the Background of the Popover Component.
	 * 
	 * @returns {string}
	 */
	Popover.prototype.getBackground = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background of the Popover Component.
	 * 
	 * @param {string} color The color to set the Background.
	 * 
	 * @returns {undefined}
	 */
	Popover.prototype.setBackground = function (color) {
		this.modifiers.bg.value = color;
	};

/**
     * Gets the Max Width of the Popover Components.
     * 
     * @returns {string}
     */
    Popover.prototype.getMaxWidth = function () {
        return this.modifiers.maxWidth.value;
    };

    /**
     * Sets the Max Width of the Popover Components.
     * 
     * @param {string} maxWidth Sets the Popover Max Width.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setMaxWidth = function (maxWidth) {
        this.modifiers.maxWidth.value = maxWidth;
    };
    
    /**
     * Gets the Border Color of the Popover Component.
     * 
     * @returns {string}
     */
    Popover.prototype.getBorderColor = function () {
        return this.modifiers.borderColor.value;
    };

    /**
     * Sets the Border Color of the Popover Component.
     * 
     * @param {string} borderColor Sets the Popover Border Color.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setBorderColor = function (borderColor) {
        this.modifiers.borderColor.value = borderColor;
    };
    
    /**
     * Gets the Fallback Border Color of the Popover Component.
     * 
     * @returns {string}
     */
    Popover.prototype.getFallbackBorderColor = function () {
        return this.modifiers.fallbackBorderColor.value;
    };

    /**
     * Sets the Fallback Border Color of the Popover Component.
     * 
     * @param {string} fallbackBorderColor Sets the Popover Fallback Border Color.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setFallbackBorderColor = function (fallbackBorderColor) {
        this.modifiers.fallbackBorderColor.value = fallbackBorderColor;
    };

    /**
     * Gets the Title Background Color of the Popover Component.
     * 
     * @returns {String}
     */
    Popover.prototype.getTitleBackgroundColor = function () {
        return this.modifiers.titleBg.value;
    };
    
    /**
     * Sets the Title Background Color of the Popover Component.
     * 
     * @param {string} titleBg Sets the Popover Title Background Color.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setTitleBackgroundColor = function (titleBg) {
        this.modifiers.titleBg.value = titleBg;
    };

    /**
     * Gets the Arrow Width of the Popover Component.
     * 
     * @returns {string}
     */
    Popover.prototype.getArrowWidth = function () {
        return this.modifiers.arrowWidth.value;
    };
    
    /**
     * Sets the Arrow Width of the Popover Component.
     * 
     * @param {string} arrow Sets the Popover Arrow Width.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setArrowWidth = function (arrowWidth) {
        this.modifiers.arrowWidth.value = arrowWidth;
    };
    
    /**
     * Gets the Arrow Color of the Popover Component.
     * 
     * @returns {string}
     */
    Popover.prototype.getArrowColor = function () {
        return this.modifiers.arrowColor.value;
    };
    
    /**
     * Sets the Arrow Color of the Popover Component.
     * 
     * @param {string} arrowColor Sets the Popover Arrow Color.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setArrowColor = function (arrowColor) {
        this.modifiers.arrowColor.value = arrowColor;
    };

    /**
     * Gets the Arrow Outer Width of the Popover Component.
     * 
     * @returns {string}
     */
    Popover.prototype.getArrowOuterWidth = function () {
        return this.modifiers.arrowOuterWidth.value;
    };
    
    /**
     * Sets the Arrow Outer Width of the Popover Component.
     * 
     * @param {string} arrow Sets the Popover Arrow Outer Width.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setArrowOuterWidth = function (arrowOuterWidth) {
        this.modifiers.arrowOuterWidth.value = arrowOuterWidth;
    };
    
    /**
     * Gets the Arrow Outer Color of the Popover Component.
     * 
     * @returns {string}
     */
    Popover.prototype.getArrowOuterColor = function () {
        return this.modifiers.arrowOuterColor.value;
    };
    
    /**
     * Sets the Arrow Outer Color of the Popover Component.
     * 
     * @param {string} arrowOuterColor Sets the Popover Outer Arrow Color.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setArrowOuterColor = function (arrowOuterColor) {
        this.modifiers.arrowOuterColor.value = arrowOuterColor;
    };
    
    /**
     * Gets the Arrow Outer Fallback Color of the Popover Component.
     * 
     * @returns {string}
     */
    Popover.prototype.getArrowOuterFallbackColor = function () {
        return this.modifiers.arrowOuterFallbackColor.value;
    };
    
    /**
     * Sets the Arrow Outer Fallback Color of the Popover Component.
     * 
     * @param {string} arrowOuterFallbackColor Sets the Popover Outer Arrow Color.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setArrowOuterFallbackColor = function (arrowOuterFallbackColor) {
        this.modifiers.arrowOuterFallbackColor.value = arrowOuterFallbackColor;
    };