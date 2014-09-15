	/**
	 * Allows modification of the Pager component in Bootstrap.
	 * 
	 * @class Pager
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} bg            The @pager-bg variable which controls the Background Color of the Pager Component.
	 * @property {object} borderColor   The @pager-border variable which controls the Border Color of the Pager Component.
	 * @property {object} borderRadius  The @pager-border-radius variable which controls the Border Radius of the Pager Component.
	 * @property {object} hoverBg       The @pager-hover-bg variable which controls the Hover Background Color of the Pager Component.
	 * @property {object} activeColor   The @pager-active-color variable which controls the Active Color of the Pager Component.
	 * @property {object} activeBg      The @pager-active-bg variable which controls the Active Background Color of the Pager Component.
	 * @property {object} disabledColor The @pager-disabled-color variable which controls the Disabled Color of the Pager Component.
	 * 
	 * @returns {Pager}
	 */
	var Pager = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-pager';

        this.bg = {
            variable:           '@pager-bg',
            subscribeProperty:  'bg',
            changeFn:           this.setBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.borderColor = {
            variable:           '@pager-border',
            subscribeProperty:  'border-color',
            changeFn:           this.setBorderColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.borderRadius = {
            variable:           '@pager-border-radius',
            subscribeProperty:  'border-radius',
            suffixUnit:         true,
            changeFn:           this.setBorderRadius.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.hoverBg = {
            variable:           '@pager-hover-bg',
            subscribeProperty:  'hover-bg',
            changeFn:           this.setHoverBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.activeColor = {
            variable:           '@pager-active-color',
            subscribeProperty:  'active-color',
            changeFn:           this.setActiveColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.activeBg = {
            variable:           '@pager-active-bg',
            subscribeProperty:  'active-bg',
            changeFn:           this.setActiveBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.disabledColor = {
            variable:           '@pager-disabled-color',
            subscribeProperty:  'disabled-color',
            changeFn:           this.setDisabledColor.bind(this),
            subscribers:        [],
			_value:             null
        };

        this.modifiers = {
            bg:             this.bg,
            borderColor:    this.borderColor,
            borderRadius:   this.borderRadius,
            hoverBg:        this.hoverBg,
            activeColor:    this.activeColor,
            activeBg:       this.activeBg,
            disabledColor:  this.disabledColor
        };

        this.setupDataBinding();
    };

    // Inherit from parent Prototype and preserve constructor
	Pager.prototype             = Object.create(ThemeModifier.prototype);
	Pager.prototype.constructor = Pager;

    /**
	 * Gets the Background Color of the Pager Component.
	 * 
	 * @returns {string}
	 */
	Pager.prototype.getBackgroundColor = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background Color of the Pager Component.
	 * 
	 * @param {string} backgroundColor The Pager Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pager.prototype.setBackgroundColor = function (backgroundColor) {
		this.modifiers.bg.value = backgroundColor;
	};

    /**
	 * Gets the Border Color of the Pager Component.
	 * 
	 * @returns {string}
	 */
	Pager.prototype.getBorderColor = function () {
		return this.modifiers.borderColor.value;
	};

	/**
	 * Sets the Border Color of the Pager Component.
	 * 
	 * @param {string} borderColor The Pager Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pager.prototype.setBorderColor = function (borderColor) {
		this.modifiers.borderColor.value = borderColor;
	};

    /**
	 * Gets the Border Radius of the Pager Component.
	 * 
	 * @returns {string}
	 */
	Pager.prototype.getBorderRadius = function () {
		return this.modifiers.borderRadius.value;
	};

	/**
	 * Sets the Border Radius of the Pager Component.
	 * 
	 * @param {string} borderRadius The Pager Border Radius to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
	 * 
	 * @returns {undefined}
	 */
	Pager.prototype.setBorderRadius = function (borderRadius, unit) {
        if (unit !== undefined) { this.modifiers.borderRadius.unit = unit; }

		this.modifiers.borderRadius.value = borderRadius;
	};

    /**
	 * Gets the Background Hover Color of the Pager Component.
	 * 
	 * @returns {string}
	 */
	Pager.prototype.getHoverBackgroundColor = function () {
		return this.modifiers.hoverBg.value;
	};

	/**
	 * Sets the Background Hover Color of the Pager Component.
	 * 
	 * @param {string} hoverBg The Pager Background Hover Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pager.prototype.setHoverBackgroundColor = function (hoverBg) {
		this.modifiers.hoverBg.value = hoverBg;
	};

    /**
	 * Gets the Active Color of the Pager Component.
	 * 
	 * @returns {string}
	 */
	Pager.prototype.getActiveColor = function () {
		return this.modifiers.activeColor.value;
	};

	/**
	 * Gets the Active Color of the Pager Component.
	 * 
	 * @param {string} color The Pager Active Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pager.prototype.setActiveColor = function (activeColor) {
		this.modifiers.activeColor.value = activeColor;
	};

    /**
	 * Gets the Background Active Color of the Pager Component.
	 * 
	 * @returns {string}
	 */
	Pager.prototype.getActiveBackgroundColor = function () {
		return this.modifiers.activeBg.value;
	};

	/**
	 * Sets the Background Active Color of the Pager Component.
	 * 
	 * @param {string} activeBackgroundColor The Pager Background Active Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pager.prototype.setActiveBackgroundColor = function (activeBackgroundColor) {
		this.modifiers.activeBg.value = activeBackgroundColor;
	};

    /**
	 * Gets the Disabled Color of the Pager Component.
	 * 
	 * @returns {string}
	 */
	Pager.prototype.getDisabledColor = function () {
		return this.modifiers.disabledColor.value;
	};

	/**
	 * Gets the Disabled Color of the Pager Component.
	 * 
	 * @param {string} color The Pager Disabled Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pager.prototype.setDisabledColor = function (disabledColor) {
		this.modifiers.disabledColor.value = disabledColor;
	};