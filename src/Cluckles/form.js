	/**
	 * Allows modification of the Form component in Bootstrap.
	 * 
	 * @class Form
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} inputBg                       The @input-bg variable which controls the Input Background Color of the Form Component.
	 * @property {object} inputDisabledBg               The @input-bg-disabled variable which controls the Input Disabled Background Color of the Form Component.
	 * @property {object} inputColor                    The @input-color variable which controls the Input Color of the Form Component.
	 * @property {object} inputBorderColor              The @input-border variable which controls the Input Border Color of the Form Component.
	 * @property {object} inputBorderRadius             The @input-border-radius variable which controls the Input Border Radius of the Form Component.
	 * @property {object} inputBorderFocusColor         The @input-border-focus variable which controls the Input Border Focus Color of the Form Component.
	 * @property {object} inputPlaceholderColor         The @input-color-placeholder variable which controls the Input Placeholder Color of the Form Component.
	 * @property {object} legendColor                   The @legend-color variable which controls the Legend Color of the Form Component.
	 * @property {object} legendBorderColor             The @legend-border-color variable which controls the Legend Border Color of the Form Component.
	 * @property {object} inputGroupAddonBgColor        The @input-group-addon-bg variable which controls the Input Group Addon Background Color of the Form Component.
	 * @property {object} inputGroupAddonBorderColor    The @input-group-addon-border-color variable which controls the Input Group Addon Border Color of the Form Component.
	 * 
	 * @returns {Form}
	 */
	var Form = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-form';

        // Configure the Modifiers
		this.inputBg = {
			variable:           '@input-bg',
			subscribeProperty:  'input-bg',
            changeFn:           this.setInputBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.inputDisabledBg = {
			variable:           '@input-bg-disabled',
			subscribeProperty:  'input-disabled-bg',
            changeFn:           this.setInputDisabledBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.inputColor = {
			variable:           '@input-color',
			subscribeProperty:  'input-color',
            changeFn:           this.setInputColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.inputBorderColor = {
			variable:           '@input-border',
			subscribeProperty:  'input-border-color',
            changeFn:           this.setInputBorderColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.inputBorderRadius = {
			variable:           '@input-border-radius',
			subscribeProperty:  'input-border-radius',
            suffixUnit:         true,
            changeFn:           this.setInputBorderRadius.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.inputBorderFocusColor = {
			variable:           '@input-border-focus',
			subscribeProperty:  'input-border-focus-color',
            changeFn:           this.setInputBorderFocusColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.inputPlaceholderColor = {
			variable:           '@input-color-placeholder',
			subscribeProperty:  'input-placeholder-color',
            changeFn:           this.setInputPlaceholderColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.legendColor = {
			variable:           '@legend-color',
			subscribeProperty:  'legend-color',
            changeFn:           this.setLegendColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.legendBorderColor = {
			variable:           '@legend-border-color',
			subscribeProperty:  'legend-border-color',
            changeFn:           this.setLegendBorderColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.inputGroupAddonBgColor = {
			variable:           '@input-group-addon-bg',
			subscribeProperty:  'input-group-addon-bg',
            changeFn:           this.setInputGroupAddonBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.inputGroupAddonBorderColor = {
			variable:           '@input-group-addon-border-color',
			subscribeProperty:  'input-group-addon-border-color',
            changeFn:           this.setInputGroupAddonBorderColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            inputBg:                    this.inputBg,
            inputDisabledBg:            this.inputDisabledBg,
            inputColor:                 this.inputColor,
            inputBorderColor:           this.inputBorderColor,
            inputBorderRadius:          this.inputBorderRadius,
            inputBorderFocusColor:      this.inputBorderFocusColor,
            inputPlaceholderColor:      this.inputPlaceholderColor,
            legendColor:                this.legendColor,
            legendBorderColor:          this.legendBorderColor,
            inputGroupAddonBgColor:     this.inputGroupAddonBgColor,
            inputGroupAddonBorderColor: this.inputGroupAddonBorderColor
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Form.prototype              = Object.create(ThemeModifier.prototype);
	Form.prototype.constructor  = Form;

    /**
	 * Gets the Input Background Color of the Form Component.
	 * 
	 * @returns {String}
	 */
	Form.prototype.getInputBackgroundColor = function () {
		return this.modifiers.inputBg.value;
	};

	/**
	 * Sets the Input Background Color of the Form Component.
	 * 
	 * @param {string} inputBackgroundColor The Form Input Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Form.prototype.setInputBackgroundColor = function (inputBackgroundColor) {
		this.modifiers.inputBg.value = inputBackgroundColor;
	};

    /**
	 * Gets the Disabled Input Background Color of the Form Component.
	 * 
	 * @returns {String}
	 */
	Form.prototype.getInputDisabledBackgroundColor = function () {
		return this.modifiers.inputDisabledBg.value;
	};

	/**
	 * Sets the Disabled Input Background Color of the Form Component.
	 * 
	 * @param {string} disabledInputBackgroundColor The Form Disabled Input Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Form.prototype.setInputDisabledBackgroundColor = function (disabledInputBackgroundColor) {
		this.modifiers.inputDisabledBg.value = disabledInputBackgroundColor;
	};

    /**
	 * Gets the Input Color of the Form Component.
	 * 
	 * @returns {string}
	 */
	Form.prototype.getInputColor = function () {
		return this.modifiers.inputColor.value;
	};

	/**
	 * Sets the Input Color of the Form Component.
	 * 
	 * @param {string} inputColor The Form Input Color to set.
	 * 
	 * @returns {undefined}
	 */
	Form.prototype.setInputColor = function (inputColor) {
		this.modifiers.inputColor.value = inputColor;
	};

    /**
	 * Gets the Input Border Color of the Form Component.
	 * 
	 * @returns {string}
	 */
	Form.prototype.getInputBorderColor = function () {
		return this.modifiers.inputBorderColor.value;
	};

	/**
	 * Sets the Input Border Color of the Form Component.
	 * 
	 * @param {string} inputBorderColor The Form Input Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	Form.prototype.setInputBorderColor = function (inputBorderColor) {
		this.modifiers.inputBorderColor.value = inputBorderColor;
	};

    /**
	 * Gets the Input Border Radius of the Form Component.
	 * 
	 * @returns {string}
	 */
	Form.prototype.getInputBorderRadius = function () {
		return this.modifiers.inputBorderRadius.value;
	};

	/**
	 * Sets the Input Border Radius of the Form Component.
	 * 
	 * @param {string} inputBorderRadius The Form Input Border Radius to set.
     * @param {string} unit              The CSS measurement unit to suffix to the value.
	 * 
	 * @returns {undefined}
	 */
	Form.prototype.setInputBorderRadius = function (inputBorderRadius, unit) {
        if (unit !== undefined) { this.modifiers.inputBorderRadius.unit = unit; }

		this.modifiers.inputBorderRadius.value = inputBorderRadius;
	};

    /**
	 * Gets the Input Border Focus Color of the Form Component.
	 * 
	 * @returns {string}
	 */
	Form.prototype.getInputBorderFocusColor = function () {
		return this.modifiers.inputBorderFocusColor.value;
	};

	/**
	 * Sets the Input Border Focus Color of the Form Component.
	 * 
	 * @param {string} inputBorderFocusColor The Form Input Border Focus Color to set.
	 * 
	 * @returns {undefined}
	 */
	Form.prototype.setInputBorderFocusColor = function (inputBorderFocusColor) {
		this.modifiers.inputBorderFocusColor.value = inputBorderFocusColor;
	};

    /**
     * Gets the Input Placeholder Color of the Form Component.
     * 
     * @returns {string}
     */
    Form.prototype.getInputPlaceholderColor = function () {
        return this.modifiers.inputPlaceholderColor.value;
    };

    /**
     * Sets the Input Placeholder Color of the Form Component.
     * 
     * @param {string} inputPlaceholderColor The Form Input Placeholder Color to set.
     * 
     * @returns {undefined}
     */
    Form.prototype.setInputPlaceholderColor = function (inputPlaceholderColor) {
        this.modifiers.inputPlaceholderColor.value = inputPlaceholderColor;
    };

    /**
     * Gets the Legend Color of the Form Component.
     * 
     * @returns {string}
     */
    Form.prototype.getLegendColor = function () {
        return this.modifiers.legendColor.value;
    };

    /**
     * Sets the Legend Color of the Form Component.
     * 
     * @param {string} legendColor The Form Legend Color to set.
     * 
     * @returns {undefined}
     */
    Form.prototype.setLegendColor = function (legendColor) {
        this.modifiers.legendColor.value = legendColor;
    };

    /**
     * Gets the Legend Border Color of the Form Component.
     * 
     * @returns {string}
     */
    Form.prototype.getLegendBorderColor = function () {
        return this.modifiers.legendBorderColor.value;
    };

    /**
     * Sets the Legend Border Color of the Form Component.
     * 
     * @param {string} legendBorderColor The Form Legend Border Color to set.
     * 
     * @returns {undefined}
     */
    Form.prototype.setLegendBorderColor = function (legendBorderColor) {
        this.modifiers.legendBorderColor.value = legendBorderColor;
    };

    /**
     * Gets the Input Group Addon Background Color of the Form Component.
     * 
     * @returns {string}
     */
    Form.prototype.getInputGroupAddonBackgroundColor = function () {
        return this.modifiers.inputGroupAddonBgColor.value;
    };

    /**
     * Sets the Input Group Addon Background Color of the Form Component.
     * 
     * @param {string} inputGroupAddonBgColor The Form Input Group Addon Background Color to set.
     * 
     * @returns {undefined}
     */
    Form.prototype.setInputGroupAddonBackgroundColor = function (inputGroupAddonBgColor) {
        this.modifiers.inputGroupAddonBgColor.value = inputGroupAddonBgColor;
    };

    /**
     * Gets the Input Group Addon Border Color of the Form Component.
     * 
     * @returns {string}
     */
    Form.prototype.getInputGroupAddonBorderColor = function () {
        return this.modifiers.inputGroupAddonBorderColor.value;
    };

    /**
     * Sets the Input Group Addon Border Color of the Form Component.
     * 
     * @param {string} inputGroupAddonBorderColor The Form Input Group Addon Border Color to set.
     * 
     * @returns {undefined}
     */
    Form.prototype.setInputGroupAddonBorderColor = function (inputGroupAddonBorderColor) {
        this.modifiers.inputGroupAddonBorderColor.value = inputGroupAddonBorderColor;
    };