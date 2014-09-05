	/**
	 * Allows modifications of the Thumbnail component styling in Bootstrap.
	 * 
	 * @class Thumbnail
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} padding The @thumbnail-padding variable which sets the Padding of the Thumbnail Component.
	 * @property {object} bg The @thumbnail-bg variable which sets the Background Color of the Thumbnail Component.
	 * @property {object} borderColor The @thumbnail-border-color variable which sets the Border Color of the Thumbnail Component.
	 * @property {object} borderRadius The @thumbnail-border-radius variable which sets the Border Radius of the Thumbnail Component.
	 * @property {object} captionColor The @thumbnail-caption-color variable which sets the Caption Color of the Thumbnail Component.
	 * @property {object} captionPadding The @thumbnail-caption-padding variable which sets the Caption Padding of the Thumbnail Component.
	 * 
	 * @returns {Thumbnail}
	 */
	var Thumbnail = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-thumbnail';

        // Configure the Modifiers
        this.padding = {
            variable: '@thumbnail-padding',
            subscribeProperty:  'padding',
            changeFn:           this.setPadding.bind(this),
            subscribers:        [],
			_value: null
        };
		this.bg = {
			variable: '@thumbnail-bg',
			subscribeProperty:  'bg',
            changeFn:           this.setBackgroundColor.bind(this),
            subscribers:        [],
			_value: null
		};
		this.borderColor = {
			variable: '@thumbnail-border',
			subscribeProperty:  'border-color',
            changeFn:           this.setBorderColor.bind(this),
            subscribers:        [],
			_value: null
		};
		this.borderRadius = {
			variable: '@thumbnail-border-radius',
			subscribeProperty:  'border-radius',
            changeFn:           this.setBorderRadius.bind(this),
            subscribers:        [],
			_value: null
		};
        this.captionColor = {
            variable: '@thumbnail-caption-color',
            subscribeProperty:  'caption-color',
            changeFn:           this.setCaptionColor.bind(this),
            subscribers:        [],
			_value: null
        };
        this.captionPadding = {
            variable: '@thumbnail-caption-padding',
            subscribeProperty:  'caption-padding',
            changeFn:           this.setCaptionPadding.bind(this),
            subscribers:        [],
			_value: null
        };

        Object.defineProperty(this.padding, 'value', {
            get: function () { return this._value; },
            set: function (val) {
                this._value = val + 'px';
                editor.queueModifications();

                this.subscribers.forEach(function (subscriber) {
                    subscriber.value = val;
                });
            }
        });

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

        Object.defineProperty(this.captionPadding, 'value', {
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
	Thumbnail.prototype = Object.create(ThemeModifier.prototype);
	Thumbnail.constructor = Thumbnail;

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
	 * @param {string} color Sets the Thumbnail Padding.
	 * 
	 * @returns {undefined}
	 */
	Thumbnail.prototype.setPadding = function (color) {
		this.modifiers.padding.value = color;
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
	 * @param {string} bgColor Sets the Thumbnail Background Color.
	 * 
	 * @returns {undefined}
	 */
	Thumbnail.prototype.setBackgroundColor = function (bgColor) {
		this.modifiers.bg.value = bgColor;
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
	 * @param {string} borderColor Sets the Thumbnail Border Color.
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
	 * @param {string} borderRadius Sets the Thumbnail Border Radius.
	 * 
	 * @returns {undefined}
	 */
	Thumbnail.prototype.setBorderRadius = function (borderRadius) {
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
     * @param {string} captionColor Sets the Thumbnail Caption Color.
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
     * @param {string} captionPadding Sets the Thumbnail Caption Padding.
     * 
     * @returns {undefined}
     */
    Thumbnail.prototype.setCaptionPadding = function (captionPadding) {
        this.modifiers.captionPadding.value = captionPadding;
    };