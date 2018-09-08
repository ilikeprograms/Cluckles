	/**
	 * Allows modification of a Code component in Bootstrap.
	 * 
	 * @class Code
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} codeColor                 The @code-color variable which controls the Code Color of the Code Component.
	 * @property {object} codeBg                    The @code-bg variable which controls the Code Background Color of the Code Component.
	 * @property {object} kbdColor                  The @kbd-color variable which controls the Kbd Color of the Code Component.
	 * @property {object} kbdBg                     The @kbd-bg variable which controls the Kdb Background Color of the Code Component.
	 * @property {object} preColor                  The @pre-color variable which controls the Pre Color of the Code Component.
	 * @property {object} preBg                     The @pre-bg variable which controls the Pre Background Color of the Code Component.
	 * @property {object} preBorderColor            The @pre-border-color variable which controls the Pre Border Color of the Code Component.
	 * @property {object} preScrollableMaxHeight    The @pre-scrollable-max-height variable which controls the Pre Scrollable Max Height of the Code Component.
	 * 
	 * @returns {Code}
	 */
	var Code = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-code';

        // Configure the Modifiers
		this.codeColor = {
			variable:           '@code-color',
            subscribeProperty:  'code-color',
            changeFn:           this.setCodeColor.bind(this),
            subscribers:        [],
			_value:             null
		};
        this.codeBg = {
			variable:           '@code-bg',
            subscribeProperty:  'code-bg-color',
            changeFn:           this.setCodeBackgroundColor.bind(this),
			subscribers:        [],
			_value:             null
        };
		this.kbdColor = {
			variable:           '@kbd-color',
            subscribeProperty:  'kbd-color',
            changeFn:           this.setKbdColor.bind(this),
			subscribers:        [],
			_value:             null
		};
        this.kbdBg = {
			variable:           '@kbd-bg',
            subscribeProperty:  'kbd-bg-color',
            changeFn:           this.setKbdBackgroundColor.bind(this),
			subscribers:        [],
			_value:             null
        };
		this.preColor = {
			variable:           '@pre-color',
            subscribeProperty:  'pre-color',
            changeFn:           this.setPreColor.bind(this),
			subscribers:        [],
			_value:             null
		};
        this.preBg = {
			variable:           '@pre-bg',
            subscribeProperty:  'pre-bg-color',
            changeFn:           this.setPreBackgroundColor.bind(this),
			subscribers:        [],
			_value:             null
        };
        this.preBorderColor = {
			variable:           '@pre-border-color',
            subscribeProperty:  'pre-border-color',
            changeFn:           this.setPreBorderColor.bind(this),
			subscribers:        [],
			_value:             null
        };
        this.preScrollableMaxHeight = {
			variable:           '@pre-scrollable-max-height',
            subscribeProperty:  'pre-scrollable-max-height',
            suffixUnit:         true,
            changeFn:           this.setPreScrollableMaxHeight.bind(this),
			subscribers:        [],
			_value:             null
        };

        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            codeColor:              this.codeColor,
            codeBg:                 this.codeBg,
            kbdColor:               this.kbdColor,
            kbdBg:                  this.kbdBg,
            preColor:               this.preColor,
            preBg:                  this.preBg,
            preBorderColor:         this.preBorderColor,
            preScrollableMaxHeight: this.preScrollableMaxHeight
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Code.prototype              = Object.create(ThemeModifier.prototype);
	Code.prototype.constructor  = Code;

    /**
	 * Gets the Code Color of the Code Component.
	 * 
	 * @returns {string}
	 */
	Code.prototype.getCodeColor = function () {
		return this.modifiers.codeColor.value;
	};

	/**
	 * Sets the Code Color of the Code Component.
	 * 
	 * @param {string} codeColor The Code Color to set.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setCodeColor = function (codeColor) {
		this.modifiers.codeColor.value = codeColor;
	};

	/**
	 * Gets the Code Background Color of the Code Component.
	 * 
	 * @returns {String}
	 */
	Code.prototype.getCodeBackgroundColor = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Code Background Color of the Code Component.
	 * 
	 * @param {string} codeBackgroundColor The Code Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setCodeBackgroundColor = function (codeBackgroundColor) {
		this.modifiers.codeBg.value = codeBackgroundColor;
	};

    /**
	 * Gets the Kbd Color of the Code Component.
	 * 
	 * @returns {string}
	 */
	Code.prototype.getKbdColor = function () {
		return this.modifiers.kbdColor.value;
	};

	/**
	 * Sets the Kbd Color of the Code Component.
	 * 
	 * @param {string} kbdColor The Code Kbd Color to set.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setKbdColor = function (kbdColor) {
		this.modifiers.kbdColor.value = kbdColor;
	};

	/**
	 * Gets the Kbd Background Color of the Code Component.
	 * 
	 * @returns {String}
	 */
	Code.prototype.getKbdBackgroundColor = function () {
		return this.modifiers.kbdBg.value;
	};

	/**
	 * Sets the Kbd Background Color of the Code Component.
	 * 
	 * @param {string} kbdBackgroundColor The Code Kbd Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setKbdBackgroundColor = function (kbdBackgroundColor) {
		this.modifiers.kbdBg.value = kbdBackgroundColor;
	};

    /**
	 * Gets the Pre Color of the Code Component.
	 * 
	 * @returns {string}
	 */
	Code.prototype.getPreColor = function () {
		return this.modifiers.preColor.value;
	};

	/**
	 * Sets the Pre Color of the Code Component.
	 * 
	 * @param {string} preColor The Code Pre Color to set.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setPreColor = function (preColor) {
		this.modifiers.preColor.value = preColor;
	};

    /**
	 * Gets the Pre Background Color of the Code Component.
	 * 
	 * @returns {String}
	 */
	Code.prototype.getPreBackgroundColor = function () {
		return this.modifiers.preBg.value;
	};

	/**
	 * Sets the Pre Background Color of the Code Component.
	 * 
	 * @param {string} preBackgroundColor The Code Pre Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setPreBackgroundColor = function (preBackgroundColor) {
		this.modifiers.preBg.value = preBackgroundColor;
	};

	/**
	 * Gets the Pre Border Color of the Code Component.
	 * 
	 * @returns {String}
	 */
	Code.prototype.getPreBorderColor = function () {
		return this.modifiers.preBorderColor.value;
	};

	/**
	 * Sets the Pre Border Color of the Code Component.
	 * 
	 * @param {string} preBorderColor The Code Pre Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setPreBorderColor = function (preBorderColor) {
		this.modifiers.preBorderColor.value = preBorderColor;
	};

	/**
	 * Gets the Pre Scrollable Max Height of the Code Component.
	 * 
	 * @returns {String}
	 */
	Code.prototype.getPreScrollableMaxHeight = function () {
		return this.modifiers.preScrollableMaxHeight.value;
	};

	/**
	 * Sets the Pre Scrollable Max Height of the Code Component.
	 * 
	 * @param {string} preScrollableMaxHeight The Code Pre Scrollable Max Height to set.
     * @param {string} unit                   The CSS measurement unit to suffix to the value.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setPreScrollableMaxHeight = function (preScrollableMaxHeight, unit) {
        if (unit !== undefined) { this.modifiers.preScrollableMaxHeight.unit = unit; }

		this.modifiers.preScrollableMaxHeight.value = preScrollableMaxHeight;
	};