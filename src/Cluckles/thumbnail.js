	/**
	 * Allows modifications of the Thumbnail component styling in Bootstrap.
	 * 
	 * @class Thumbnail
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} padding           The @thumbnail-padding variable which sets the Padding of the Thumbnail Component.
	 * @property {object} bg                The @thumbnail-bg variable which sets the Background Color of the Thumbnail Component.
	 * @property {object} borderColor       The @thumbnail-border-color variable which sets the Border Color of the Thumbnail Component.
	 * @property {object} borderRadius      The @thumbnail-border-radius variable which sets the Border Radius of the Thumbnail Component.
	 * @property {object} captionColor      The @thumbnail-caption-color variable which sets the Caption Color of the Thumbnail Component.
	 * @property {object} captionPadding    The @thumbnail-caption-padding variable which sets the Caption Padding of the Thumbnail Component.
	 * 
	 * @returns {Thumbnail}
	 */
	var Thumbnail = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-thumbnail';

        // Configure the Modifiers
        this.padding = {
            variable:           '@thumbnail-padding',
            subscribeProperty:  'padding',
            suffixUnit:         true,
            changeFn:           this.setPadding.bind(this),
            subscribers:        [],
			_value:             null
        };
		this.bg = {
			variable:           '@thumbnail-bg',
			subscribeProperty:  'bg',
            changeFn:           this.setBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.borderColor = {
			variable:           '@thumbnail-border',
			subscribeProperty:  'border-color',
            changeFn:           this.setBorderColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.borderRadius = {
			variable:           '@thumbnail-border-radius',
			subscribeProperty:  'border-radius',
            suffixUnit:         true,
            changeFn:           this.setBorderRadius.bind(this),
            subscribers:        [],
			_value:             null
		};
        this.captionColor = {
            variable:           '@thumbnail-caption-color',
            subscribeProperty:  'caption-color',
            changeFn:           this.setCaptionColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.captionPadding = {
            variable:           '@thumbnail-caption-padding',
            subscribeProperty:  'caption-padding',
            suffixUnit:         true,
            changeFn:           this.setCaptionPadding.bind(this),
            subscribers:        [],
			_value:             null
        };
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            padding:        this.padding,
            bg:             this.bg,
            borderColor:    this.borderColor,
            borderRadius:   this.borderRadius,
            captionColor:   this.captionColor,
            captionPadding: this.captionPadding
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Thumbnail.prototype             = Object.create(ThemeModifier.prototype);
	Thumbnail.prototype.constructor = Thumbnail;

	/**
	 * Gets the Padding of the Thumbnail Component.
	 * 
	 * @returns {string}
	 */
	Thumbnail.prototype.getPadding = function () {
		return this.modifiers.padding.value;
	};

	/**
	 * Sets the Padding of the Thumbnail Component.
	 * 
	 * @param {string} padding The Thumbnail Padding to set.
     * @param {string} unit    The CSS measurement unit to suffix to the value.
	 * 
	 * @returns {undefined}
	 */
	Thumbnail.prototype.setPadding = function (padding, unit) {
        if (unit !== undefined) { this.modifiers.padding.unit = unit; }

		this.modifiers.padding.value = padding;
	};

	/**
	 * Gets the Background Color of the Thumbnail Component.
	 * 
	 * @returns {string}
	 */
	Thumbnail.prototype.getBackgroundColor = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background Color of the Thumbnail Component.
	 * 
	 * @param {string} backgroundColor The Thumbnail Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Thumbnail.prototype.setBackgroundColor = function (backgroundColor) {
		this.modifiers.bg.value = backgroundColor;
	};

	/**
	 * Gets the Border Color of the Thumbnail Component.
	 * 
	 * @returns {string}
	 */
	Thumbnail.prototype.getBorderColor = function () {
		return this.modifiers.borderColor.value;
	};

	/**
	 * Sets the Border Color of the Thumbnail Component.
	 * 
	 * @param {string} borderColor The Thumbnail Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	Thumbnail.prototype.setBorderColor = function (borderColor) {
		this.modifiers.borderColor.value = borderColor;
	};

	/**
	 * Gets the Border Radius of the Thumbnail Component.
	 * 
	 * @returns {string}
	 */
	Thumbnail.prototype.getBorderRadius = function () {
		return this.modifiers.borderRadius.value;
	};

	/**
	 * Sets the Border Radius of the Thumbnail Component.
	 * 
	 * @param {string} borderRadius The Thumbnail Border Radius to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
	 * 
	 * @returns {undefined}
	 */
	Thumbnail.prototype.setBorderRadius = function (borderRadius, unit) {
        if (unit !== undefined) { this.modifiers.borderRadius.unit = unit; }

		this.modifiers.borderRadius.value = borderRadius;
	};

    /**
     * Gets the Caption Color of the Thumbnail Component.
     * 
     * @returns {string}
     */
    Thumbnail.prototype.getCaptionColor = function () {
        return this.modifiers.captionColor.value;
    };

    /**
     * Sets the Caption Color of the Thumbnail Components.
     * 
     * @param {string} captionColor The Thumbnail Caption Color to set.
     * 
     * @returns {undefined}
     */
    Thumbnail.prototype.setCaptionColor = function (captionColor) {
        this.modifiers.captionColor.value = captionColor;
    };

    /**
     * Gets the Caption Padding of the Thumbnail Component.
     * 
     * @returns {string}
     */
    Thumbnail.prototype.getCaptionPadding = function () {
        return this.modifiers.captionPadding.value;
    };

    /**
     * Sets the Caption Padding of the Thumbnail Components.
     * 
     * @param {string} captionPadding The Thumbnail Caption Padding to set.
     * @param {string} unit           The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Thumbnail.prototype.setCaptionPadding = function (captionPadding, unit) {
        if (unit !== undefined) { this.modifiers.captionPadding.unit = unit; }

        this.modifiers.captionPadding.value = captionPadding;
    };