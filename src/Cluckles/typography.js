	/**
	 * Allows modification of the Typography component in Bootstrap.
	 * 
	 * @class Typography
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} fontFamilySansSerif   The @font-family-sans-serif variable which controls the Font Family Sans Serif of the Typography Component.
	 * @property {object} fontFamilySerif       The @font-family-serif variable which controls the Font Family Serif of the Typography Component.
	 * @property {object} fontFamilyMonospace   The @font-family-serif variable which controls the Font Family Monospace of the Typography Component.
	 * @property {object} fontSizeBase          The @font-size-base variable which controls the Font Size Base of the Typography Component.
	 * @property {object} headingsFontFamily    The @headings-font-family variable which controls the Headings Font Family of the Typography Component.
	 * @property {object} headingsFontWeight    The @headings-font-weight variable which controls the Headings Font Weight of the Typography Component.
	 * @property {object} headingsLineHeight    The @headings-line-height variable which controls the Headings Line Height of the Typography Component.
	 * @property {object} headingsColor         The @headings-color variable which controls the Headings Color of the Typography Component.
	 * @property {object} headingsSmallColor    The @headings-small-color variable which controls the Headings Small Color of the Typography Component.
     * @property {string} textMuted             The @text-muted variable which sets the Text Muted Color.
     * @property {string} abbrBorderColor       The @abbr-border-color variable which sets the Abbreviations and Acronyms Border Color.
	 * 
	 * @returns {Typography}
	 */
	var Typography = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-typography';

        // Configure the Modifiers
		this.fontFamilySansSerif = {
			variable:           '@font-family-sans-serif',
			subscribeProperty:  'font-family-sans-serif',
            changeFn:           this.setFontFamilySansSerif.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.fontFamilySerif = {
			variable:           '@font-family-serif',
			subscribeProperty:  'font-family-serif',
            changeFn:           this.setFontFamilySerif.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.fontFamilyMonospace = {
			variable:           '@font-family-monospace',
			subscribeProperty:  'font-family-monospace',
            changeFn:           this.setFontFamilyMonospace.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.fontSizeBase = {
			variable:           '@font-size-base',
			subscribeProperty:  'font-size-base',
            changeFn:           this.setFontSizeBase.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.headingsFontFamily = {
			variable:           '@headings-font-family',
			subscribeProperty:  'headings-font-family',
            changeFn:           this.setHeadingsFontFamily.bind(this),
            subscribers:        [],
			_value: null
		};
		this.headingsFontWeight = {
			variable:           '@headings-font-weight',
			subscribeProperty:  'headings-font-weight',
            changeFn:           this.setHeadingsFontWeight.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.headingsLineHeight = {
			variable:           '@headings-line-height',
			subscribeProperty:  'headings-line-height',
            changeFn:           this.setHeadingsLineHeight.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.headingsColor = {
			variable:           '@headings-color',
			subscribeProperty:  'headings-color',
            changeFn:           this.setHeadingsColor.bind(this),
            subscribers:        [],
			_value:             null
		};
        this.headingsSmallColor = {
            variable:           '@headings-small-color',
            subscribeProperty:  'headings-small-color',
            changeFn:           this.setHeadingsSmallColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.textMutedColor = {
            variable:           '@text-muted',
            subscribeProperty:  'text-muted-color',
            changeFn:           this.setTextMutedColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.abbrBorderColor = {
            variable:           '@abbr-border-color',
            subscribeProperty:  'abbr-border-color',
            changeFn:           this.setAbbrBorderColor.bind(this),
            subscribers:        [],
			_value:             null
        };

        Object.defineProperty(this.fontSizeBase, 'value', {
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
            fontFamilySansSerif:    this.fontFamilySansSerif,
            fontFamilySerif:        this.fontFamilySerif,
            fontFamilyMonospace:    this.fontFamilyMonospace,
            fontSizeBase:           this.fontSizeBase,
            headingsFontFamily:     this.headingsFontFamily,
            headingsFontWeight:     this.headingsFontWeight,
            headingsLineHeight:     this.headingsLineHeight,
            headingsColor:          this.headingsColor,
            headingsSmallColor:     this.headingsSmallColor,
            textMutedColor:         this.textMutedColor,
            abbrBorderColor:        this.abbrBorderColor
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Typography.prototype                = Object.create(ThemeModifier.prototype);
	Typography.prototype.constructor    = Typography;

    /**
     * Gets the Font Family Sans Serif of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getFontFamilySansSerif = function () {
        return this.modifiers.fontFamilySansSerif.value;
    };
    
    /**
     * Sets the Font Family Sans Serif of the Typography Component.
     * 
     * @param {string} fontFamilySansSerif The Typography Font Family Sans Serif to set.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontFamilySansSerif = function (fontFamilySansSerif) {
        this.modifiers.fontFamilySansSerif.value = fontFamilySansSerif;
    };

    /**
     * Gets the Font Family Serif of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getFontFamilySerif = function () {
        return this.modifiers.fontFamilySerif.value;
    };
    
    /**
     * Sets the Font Family Serif of the Typography Component.
     * 
     * @param {string} fontFamilySerif The Typography Font Family Serif to set.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontFamilySerif = function (fontFamilySerif) {
        this.modifiers.fontFamilySerif.value = fontFamilySerif;
    };

    /**
     * Gets the Font Family Monospace of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getFontFamilyMonospace = function () {
        return this.modifiers.fontFamilyMonospace.value;
    };
    
    /**
     * Sets the Font Family Monospace of the Typography Component.
     * 
     * @param {string} fontFamilyMonospace The Typography Font Family Monospace to set.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontFamilyMonospace = function (fontFamilyMonospace) {
        this.modifiers.fontFamilyMonospace.value = fontFamilyMonospace;
    };

    /**
     * Gets the Font Size Base of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getFontSizeBase = function () {
        return this.modifiers.fontSizeBase.value;
    };

    /**
     * Sets the Font Size Base of the Typography Component.
     * 
     * @param {string} fontSizeBase The Typography Font Size Base to set.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontSizeBase = function (fontSizeBase) {
        this.modifiers.fontSizeBase.value = fontSizeBase;
    };

    /**
     * Gets the Headings Font Family of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getHeadingsFontFamily = function () {
        return this.modifiers.headingsFontFamily.value;
    };

    /**
     * Sets the Headings Font Family of the Typography Component.
     * 
     * @param {string} headingsFontFamily The Typography Headings Font Family to set.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setHeadingsFontFamily = function (headingsFontFamily) {
        this.modifiers.headingsFontFamily.value = headingsFontFamily;
    };

    /**
     * Gets the Headings Font Weight of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getHeadingsFontWeight = function () {
        return this.modifiers.headingsFontWeight.value;
    };

    /**
     * Sets the Headings Font Weight of the Typography Component.
     * 
     * @param {string} headingsFontWeight The Typography Headings Font Weight to set.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setHeadingsFontWeight = function (headingsFontWeight) {
        this.modifiers.headingsFontWeight.value = headingsFontWeight;
    };

    /**
     * Gets the Headings Line Height of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getHeadingsLineHeight = function () {
        return this.modifiers.headingsLineHeight.value;
    };

    /**
     * Sets the Headings Line Height of the Typography Component.
     * 
     * @param {string} headingsLineHeight The Typography Headings Line Height to set.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setHeadingsLineHeight = function (headingsLineHeight) {
        this.modifiers.headingsLineHeight.value = headingsLineHeight;
    };

    /**
     * Gets the Headings Color of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getHeadingsColor = function () {
        return this.modifiers.headingsColor.value;
    };

    /**
     * Sets the Headings Color of the Typography Component.
     * 
     * @param {string} headingsColor The Typography Headings Color to set.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setHeadingsColor = function (headingsColor) {
        this.modifiers.headingsColor.value = headingsColor;
    };

    /**
     * Gets the Headings Small Color of the Typography Component.
     * 
     * @returns {undefined}
     */
    Typography.prototype.getHeadingsSmallColor = function () {
        return this.modifiers.headingsSmallColor.value;
    };

    /**
     * Sets the Headings Small Color of the Typography Component.
     * 
     * @param {string} headingsSmallColor The Typography Headings Small Color to set.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setHeadingsSmallColor = function (headingsSmallColor) {
        this.modifiers.headingsSmallColor.value = headingsSmallColor;
    };

    /**
     * Gets the Text Muted color of the Typography Component.
     * 
     * @returns {String}
     */
    Typography.prototype.getTextMutedColor = function () {
        return this.modifiers.textMutedColor.value;
    };

    /**
     * Sets the Text Muted color of the Typography Component.
     * 
     * @param {string} textMutedColor The Typography Text Muted Color to set.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setTextMutedColor = function (textMutedColor) {
        this.modifiers.textMutedColor.value = textMutedColor;
    };

    /**
     * Gets the Abbr Border Color of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getAbbrBorderColor = function () {
        return this.modifiers.abbrBorderColor.value;
    };

    /**
     * Sets the Abbr Border Color of the Typography Component.
     * 
     * @param {string} abbrBorderColor The Typography Abbr Border Color to set.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setAbbrBorderColor = function (abbrBorderColor) {
        this.modifiers.abbrBorderColor.value = abbrBorderColor;
    };