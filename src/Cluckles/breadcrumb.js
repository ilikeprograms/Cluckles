    /**
	 * Allows modification of the Breadcrumb Component in Bootstrap.
	 * 
	 * @class Breadcrumb
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} bg                The @breadcrumb-bg variable which controls the Background Color of the Breadcrumb Component.
	 * @property {object} color             The @breadcrumb-color variable which controls the Color of the Breadcrumb Component.
	 * @property {object} activeColor       The @breadcrumb-active-color variable which controls the Active Color of the Breadcrumb Component.
	 * @property {object} separator         The @breadcrumb-seperator variable which controls the Separator Character of the Breadcrumb Component.
     * @property {string} paddingHorizontal The @breadcrumb-padding-horizontal variable which sets the Horizontal Padding of the Breadcrumb Component.
     * @property {string} paddingVertical   The @breadcrumb-padding-vertical variable which sets the Vertical Padding of the Breadcrumb Component.
     * 
     * @returns {Breadcrumb}
     */
    var Breadcrumb = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-breadcrumb';

        this.bg = {
            variable:           '@breadcrumb-bg',
            subscribeProperty:  'bg',
            changeFn:           this.setBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.color = {
            variable:           '@breadcrumb-color',
            subscribeProperty:  'color',
            changeFn:           this.setColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.activeColor = {
            variable:           '@breadcrumb-active-color',
            subscribeProperty:  'active-color',
            changeFn:           this.setActiveColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.separator = {
            variable:           '@breadcrumb-separator',
            subscribeProperty:  'separator',
            changeFn:           this.setSeparator.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.paddingHorizontal = {
            variable:           '@breadcrumb-padding-horizontal',
            subscribeProperty:  'padding-horizontal',
            suffixUnit:         true,
            changeFn:           this.setPaddingHorizontal.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.paddingVertical = {
            variable:           '@breadcrumb-padding-vertical',
            subscribeProperty:  'padding-vertical',
            suffixUnit:         true,
            changeFn:           this.setPaddingVertical.bind(this),
            subscribers:        [],
			_value:             null
        };

        this.modifiers = {
            bg:                 this.bg,
            color:              this.color,
            activeColor:        this.activeColor,
            separator:          this.separator,
            paddingHorizontal:  this.paddingHorizontal,
            paddingVertical:    this.paddingVertical
        };

        this.setupDataBinding();
    };

    // Inherit from parent Prototype and preserve constructor
    Breadcrumb.prototype                = Object.create(ThemeModifier.prototype);
    Breadcrumb.prototype.constructor    = Breadcrumb;

    /**
	 * Gets the Background Color of the Breadcrumb Component.
	 * 
	 * @returns {String}
	 */
	Breadcrumb.prototype.getBackgroundColor = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background Color of the Breadcrumb Component.
	 * 
	 * @param {string} backgroundColor The Breadcrumb Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Breadcrumb.prototype.setBackgroundColor = function (backgroundColor) {
		this.modifiers.bg.value = backgroundColor;
	};

    /**
	 * Gets the Color of the Breadcrumb Component.
	 * 
	 * @returns {string}
	 */
	Breadcrumb.prototype.getColor = function () {
		return this.modifiers.color.value;
	};

	/**
	 * Sets the Color of the Breadcrumb Component.
	 * 
	 * @param {string} color The Breadcrumb Color to set.
	 * 
	 * @returns {undefined}
	 */
	Breadcrumb.prototype.setColor = function (color) {
		this.modifiers.color.value = color;
	};

    /**
	 * Gets the Active Color of the Breadcrumb Component.
	 * 
	 * @returns {string}
	 */
	Breadcrumb.prototype.getActiveColor = function () {
		return this.modifiers.activeColor.value;
	};

	/**
	 * Sets the Active Color of the Breadcrumb Component.
	 * 
	 * @param {string} activeColor The Breadcrumb Active Color to set.
	 * 
	 * @returns {undefined}
	 */
	Breadcrumb.prototype.setActiveColor = function (activeColor) {
		this.modifiers.activeColor.value = activeColor;
	};

    /**
	 * Gets the Separator Character of the Breadcrumb Component.
	 * 
	 * @returns {string}
	 */
	Breadcrumb.prototype.getSeperator = function () {
		return this.modifiers.separator.value;
	};

	/**
	 * Sets the Separator Character of the Breadcrumb Component.
	 * 
	 * @param {string} separator The Breadcrumb Separator Character to set.
	 * 
	 * @returns {undefined}
	 */
	Breadcrumb.prototype.setSeparator = function (separator) {
		this.modifiers.separator.value = separator;
	};

    /**
     * Sets the Horizontal Padding of the Breadcrumb Components.
     * 
     * @param {string} horizontalPadding The Breadcrumb Horizontal Padding to set.
     * @param {string} unit              The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Breadcrumb.prototype.setPaddingHorizontal = function (paddingHorizontal, unit) {
        if (unit !== undefined) { this.modifiers.paddingHorizontal.unit = unit; }

        this.modifiers.paddingHorizontal.value = paddingHorizontal;
    };

    /**
     * Gets the Vertical Padding of the Breadcrumb Components.
     * 
     * @returns {string}
     */
    Breadcrumb.prototype.getPaddingVertical = function () {
        return this.modifiers.paddingVertical.value;
    };

    /**
     * Sets the Horizontal Padding of the Breadcrumb Components.
     * 
     * @param {string} verticalPadding  The Breadcrumb Horizontal Padding to set.
     * @param {string} unit             The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Breadcrumb.prototype.setPaddingVertical = function (paddingVertical, unit) {
        if (unit !== undefined) { this.modifiers.paddingVertical.unit = unit; }

        this.modifiers.paddingVertical.value = paddingVertical;
    };