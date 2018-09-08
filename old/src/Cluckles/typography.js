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
	 * @property {object} fontSizeH1            The @font-size-h1 variable which controls the H1 Font Size of the Typography Component.
	 * @property {object} fontSizeH2            The @font-size-h1 variable which controls the H2 Font Size of the Typography Component.
	 * @property {object} fontSizeH3            The @font-size-h1 variable which controls the H3 Font Size of the Typography Component.
	 * @property {object} fontSizeH4            The @font-size-h1 variable which controls the H4 Font Size of the Typography Component.
	 * @property {object} fontSizeH5            The @font-size-h1 variable which controls the H5 Font Size of the Typography Component.
	 * @property {object} fontSizeH6            The @font-size-h1 variable which controls the H6 Font Size of the Typography Component.
	 * @property {object} headingsFontFamily    The @headings-font-family variable which controls the Headings Font Family of the Typography Component.
	 * @property {object} headingsFontWeight    The @headings-font-weight variable which controls the Headings Font Weight of the Typography Component.
	 * @property {object} headingsLineHeight    The @headings-line-height variable which controls the Headings Line Height of the Typography Component.
	 * @property {object} headingsColor         The @headings-color variable which controls the Headings Color of the Typography Component.
	 * @property {object} headingsSmallColor    The @headings-small-color variable which controls the Headings Small Color of the Typography Component.
	 * @property {object} lineHeightBase        The @line-height-base variable which controls the Line Height Base of the Typography Component.
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
            suffixUnit:         true,
            changeFn:           this.setFontSizeBase.bind(this),
            subscribers:        [],
			_value:             null
		};
        this.fontSizeH1 = {
            variable:           '@font-size-h1',
			subscribeProperty:  'font-size-h1',
            suffixUnit:         true,
            changeFn:           this.setFontSizeH1.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.fontSizeH2 = {
            variable:           '@font-size-h2',
			subscribeProperty:  'font-size-h2',
            suffixUnit:         true,
            changeFn:           this.setFontSizeH2.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.fontSizeH3 = {
            variable:           '@font-size-h3',
			subscribeProperty:  'font-size-h3',
            suffixUnit:         true,
            changeFn:           this.setFontSizeH3.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.fontSizeH4 = {
            variable:           '@font-size-h4',
			subscribeProperty:  'font-size-h4',
            suffixUnit:         true,
            changeFn:           this.setFontSizeH4.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.fontSizeH5 = {
            variable:           '@font-size-h5',
			subscribeProperty:  'font-size-h5',
            suffixUnit:         true,
            changeFn:           this.setFontSizeH5.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.fontSizeH6 = {
            variable:           '@font-size-h6',
			subscribeProperty:  'font-size-h6',
            suffixUnit:         true,
            changeFn:           this.setFontSizeH6.bind(this),
            subscribers:        [],
			_value:             null
        };
		this.headingsFontFamily = {
			variable:           '@headings-font-family',
			subscribeProperty:  'headings-font-family',
            changeFn:           this.setHeadingsFontFamily.bind(this),
            subscribers:        [],
			_value:             null
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
        this.lineHeightBase = {
            variable:           '@line-height-base',
            subscribeProperty:  'line-height-base',
            changeFn:           this.setLineHeightBase.bind(this),
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
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            fontFamilySansSerif:    this.fontFamilySansSerif,
            fontFamilySerif:        this.fontFamilySerif,
            fontFamilyMonospace:    this.fontFamilyMonospace,
            fontSizeBase:           this.fontSizeBase,
            fontSizeH1:             this.fontSizeH1,
            fontSizeH2:             this.fontSizeH2,
            fontSizeH3:             this.fontSizeH3,
            fontSizeH4:             this.fontSizeH4,
            fontSizeH5:             this.fontSizeH5,
            fontSizeH6:             this.fontSizeH6,
            headingsFontFamily:     this.headingsFontFamily,
            headingsFontWeight:     this.headingsFontWeight,
            headingsLineHeight:     this.headingsLineHeight,
            headingsColor:          this.headingsColor,
            headingsSmallColor:     this.headingsSmallColor,
            lineHeightBase:         this.lineHeightBase,
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
     * @param {string} unit         The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontSizeBase = function (fontSizeBase, unit) {
        if (unit !== undefined) { this.modifiers.fontSizeBase.unit = unit; }

        this.modifiers.fontSizeBase.value = fontSizeBase;
    };
    
    /**
     * Gets the H1 Font Size Base the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getFontSizeH1 = function () {
        return this.modifiers.fontSizeH1.value;
    };

    /**
     * Sets the H1 Font Size of the Typography Component.
     * 
     * @param {string} fontSizeH1   The Typography H1 Font Size to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontSizeH1 = function (fontSizeH1, unit) {
        if (unit !== undefined) { this.modifiers.fontSizeH1.unit = unit; }

        this.modifiers.fontSizeH1.value = fontSizeH1;
    };
    
    /**
     * Gets the H2 Font Size Base the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getFontSizeH2 = function () {
        return this.modifiers.fontSizeH2.value;
    };

    /**
     * Sets the H2 Font Size of the Typography Component.
     * 
     * @param {string} fontSizeH2   The Typography H2 Font Size to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontSizeH2 = function (fontSizeH2, unit) {
        if (unit !== undefined) { this.modifiers.fontSizeH2.unit = unit; }

        this.modifiers.fontSizeH2.value = fontSizeH2;
    };
    
    /**
     * Gets the H3 Font Size Base the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getFontSizeH3 = function () {
        return this.modifiers.fontSizeH3.value;
    };

    /**
     * Sets the H3 Font Size of the Typography Component.
     * 
     * @param {string} fontSizeH3   The Typography H3 Font Size to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontSizeH3 = function (fontSizeH3, unit) {
        if (unit !== undefined) { this.modifiers.fontSizeH3.unit = unit; }

        this.modifiers.fontSizeH3.value = fontSizeH3;
    };
    
    /**
     * Gets the H4 Font Size Base the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getFontSizeH4 = function () {
        return this.modifiers.fontSizeH4.value;
    };

    /**
     * Sets the H4 Font Size of the Typography Component.
     * 
     * @param {string} fontSizeH4   The Typography H4 Font Size to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontSizeH4 = function (fontSizeH4, unit) {
        if (unit !== undefined) { this.modifiers.fontSizeH4.unit = unit; }

        this.modifiers.fontSizeH4.value = fontSizeH4;
    };
    
    /**
     * Gets the H5 Font Size Base the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getFontSizeH5 = function () {
        return this.modifiers.fontSizeH5.value;
    };

    /**
     * Sets the H5 Font Size of the Typography Component.
     * 
     * @param {string} fontSizeH5   The Typography H5 Font Size to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontSizeH5 = function (fontSizeH5, unit) {
        if (unit !== undefined) { this.modifiers.fontSizeH5.unit = unit; }

        this.modifiers.fontSizeH5.value = fontSizeH5;
    };
    
    /**
     * Gets the H6 Font Size Base the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getFontSizeH6 = function () {
        return this.modifiers.fontSizeH6.value;
    };

    /**
     * Sets the H6 Font Size of the Typography Component.
     * 
     * @param {string} fontSizeH6   The Typography H6 Font Size to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontSizeH6 = function (fontSizeH6, unit) {
        if (unit !== undefined) { this.modifiers.fontSizeH6.unit = unit; }

        this.modifiers.fontSizeH6.value = fontSizeH6;
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
     * Gets the Line Height Base of the Typography Component.
     * 
     * @returns {undefined}
     */
    Typography.prototype.getLineHeightBase = function () {
        return this.modifiers.lineHeightBase.value;
    };

    /**
     * Sets the Line Height Base of the Typography Component.
     * 
     * @param {string} lineHeightBase The Typography Line Height Base to set.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setLineHeightBase = function (lineHeightBase) {
        this.modifiers.lineHeightBase.value = lineHeightBase;
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