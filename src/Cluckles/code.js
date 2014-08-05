(function (window) {
	"use strict";

	/**
	 * Allows modification of a Code component in Bootstrap.
	 * 
	 * @class Code
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} codeColor The @code-color variable which controls the Code Color of the Code component.
	 * @property {object} codeBg The @code-bg variable which controls the Code Background Color of the Code component.
	 * @property {object} kbdColor The @kbd-color variable which controls the Kbd Color of the Code component.
	 * @property {object} kbdBg The @kbd-bg variable which controls the Kdb Background Color of the Code component.
	 * @property {object} preColor The @pre-color variable which controls the Pre Color of the Code component.
	 * @property {object} preBg The @pre-bg variable which controls the Pre Background Color of the Code component.
	 * @property {object} preBorderColor The @pre-border-color variable which controls the Pre Border Color of the Code component.
	 * @property {object} preScrollableMaxHeight The @pre-scrollable-max-height variable which controls the Pre Scrollable Max Height of the Code component.
	 * 
	 * @returns {Code}
	 */
	var Code = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        // Configure the Modifiers
		this.codeColor = {
			variable: '@code-color',
			value: null
		};
        this.codeBg = {
			variable: '@code-bg',
			value: null
        };
		this.kbdColor = {
			variable: '@kbd-color',
			value: null
		};
        this.kbdBg = {
			variable: '@kbd-bg',
			value: null
        };
		this.preColor = {
			variable: '@pre-color',
			value: null
		};
        this.preBg = {
			variable: '@pre-bg',
			value: null
        };
        this.preBorderColor = {
			variable: '@pre-border-color',
			value: null
        };
        this.preScrollableMaxHeight = {
			variable: '@pre-scrollable-max-height',
			value: null
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
	};
	
	// Inherit from parent Prototype and preserve constructor
	Code.prototype = Object.create(ThemeModifier.prototype);
	Code.constructor = Code;

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
	 * @param {string} codeColor Sets the Code Color.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setCodeColor = function (codeColor) {
		this.modifiers.codeColor.value = codeColor;
		this.editor.queueModifications();
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
	 * @param {string} codeBackgroundColor Sets the Code Background Color.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setCodeBackgroundColor = function (codeBackgroundColor) {
		this.modifiers.codeBg.value = codeBackgroundColor;
		this.editor.queueModifications();
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
	 * @param {string} kbdColor Sets the Code Kbd Color.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setKbdColor = function (kbdColor) {
		this.modifiers.kbdColor.value = kbdColor;
		this.editor.queueModifications();
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
	 * @param {string} kbdBackgroundColor Sets the Code Kbd Background Color.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setKbdBackgroundColor = function (kbdBackgroundColor) {
		this.modifiers.kbdBg.value = kbdBackgroundColor;
		this.editor.queueModifications();
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
	 * @param {string} preColor Sets the Code Pre Color.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setPreColor = function (preColor) {
		this.modifiers.preColor.value = preColor;
		this.editor.queueModifications();
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
	 * @param {string} preBackgroundColor Sets the Code Pre Background Color.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setPreBackgroundColor = function (preBackgroundColor) {
		this.modifiers.preBg.value = preBackgroundColor;
		this.editor.queueModifications();
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
	 * @param {string} preBorderColor Sets the Code Pre Border Color.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setPreBorderColor = function (preBorderColor) {
		this.modifiers.preBorderColor.value = preBorderColor;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Pre Scrollable Max Height of the Code Component.
	 * 
	 * @returns {String}
	 */
	Code.prototype.getPreScrollableMaxHeight = function () {
		return this.modifiers.preScrollableMaxHeightx.value;
	};

	/**
	 * Sets the Pre Scrollable Max Height of the Code Component.
	 * 
	 * @param {string} preScrollableMaxHeight Sets the Code Pre Scrollable Max Height.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setPreScrollableMaxHeight = function (preScrollableMaxHeight) {
		this.modifiers.preScrollableMaxHeight.value = preScrollableMaxHeight + 'px';
		this.editor.queueModifications();
	};

	window.Code = Code;
})(window);