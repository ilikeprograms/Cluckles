(function (window) {
    "use strict";

    /**
     * Allows modification of the General Label Component Styling.
     * 
     * @class LabelBase
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
     * 
     * @property {string} color The @label-color variable which sets the Color of Label Components.
     * @property {string} linkHoverColor The @label-link-hover-color variable which sets the Link Hover Color of Label Components.
     * @property {string} defaultBg The @label-default-bg variable which affects the Default label Background Color.
	 * @property {string} primaryBg The @label-primary-bg variable which affects the Primary label Background Color.
	 * @property {string} successBg The @label-success-bg variable which affects the Success label Background Color.
	 * @property {string} infoBg The @label-info-bg variable which affects the Info label Background Color.
	 * @property {string} warningBg The @label-warning-bg variable which affects the Warning label Background Color.
	 * @property {string} dangerBg The @label-danger-bg variable which affects the Danger label Background Color.
     * 
     * @returns {LabelBase}
     */
    var LabelBase = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        // Configure the Modifiers
        this.color = {
            variable: '@label-color',
            value: null
        };
        this.linkHoverColor = {
            variable: '@label-link-hover-color',
            value: null
        };
		this.defaultBg = {
			variable: '@label-default-bg',
			value: null
		};
		this.primaryBg = {
			variable: '@label-primary-bg',
			value: null
		};
		this.successBg = {
			variable: '@label-success-bg',
			value: null
		};
		this.infoBg = {
			variable: '@label-info-bg',
			value: null
		};
		this.warningBg = {
			variable: '@label-warning-bg',
			value: null
		};
		this.dangerBg = {
			variable: '@label-danger-bg',
			value: null
		};

        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            color:          this.color,
            linkHoverColor: this.linkHoverColor,
            defaultBg:      this.defaultBg,
            primaryBg:      this.primaryBg,
            successBg:      this.successBg,
            infoBg:         this.infoBg,
            warningBg:      this.warningBg,
            dangerBg:       this.dangerBg
        };
    };

    // Inherit from parent Prototype and preserve constructor
    LabelBase.prototype = Object.create(ThemeModifier.prototype);
    LabelBase.constructor = LabelBase;

    /**
     * Gets the Color of the Label Component.
     * 
     * @returns {string}
     */
    LabelBase.prototype.getColor = function () {
        return this.modifiers.color.value;
    };

    /**
     * Sets the Color of the Label Component.
     * 
     * @param {string} color The Label Color to set.
     * @returns {string}
     */
    LabelBase.prototype.setColor = function (color) {
        this.modifiers.color.value = color;
        this.editor.queueModifications();
    };

    /**
     * Gets the Link Hover Color of the Label Components.
     * 
     * @returns {string}
     */
    LabelBase.prototype.getLinkHoverColor = function () {
        return this.modifiers.linkHoverColor;
    };

    /**
     * Gets the Link Hover Color of the Label Components.
     * 
     * @param {string} linkHoverColor The Label Link Hover Color to set.
     * 
     * @returns {undefined}
     */
    LabelBase.prototype.setLinkHoverColor = function (linkHoverColor) {
        this.modifiers.linkHoverColor = linkHoverColor;
        this.editor.queueModifications();
    };

    /**
	 * Gets the Default Label Background Color.
	 * 
	 * @returns {undefined}
	 */
	LabelBase.prototype.getDefaultBackground = function () {
		return this.modifiers.defaultBg.value;
	};

	/**
	 * Sets the Default Label Background Color.
	 * 
	 * @param {string} color Sets the Default Label Background olor.
	 * 
	 * @returns {undefined}
	 */
	LabelBase.prototype.setDefaultBackground = function (color) {
		this.modifiers.defaultBg.value = color;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Primary Label Background Color.
	 * 
	 * @returns {string}
	 */
	LabelBase.prototype.getPrimaryBackground = function () {
		return this.modifiers.primaryBg.value;
	};

	/**
	 * Sets the Primary Label Background Color.
	 * 
	 * @param {string} color Sets the Primary Label Background Color.
	 * 
	 * @returns {undefined}
	 */
	LabelBase.prototype.setPrimaryBackground = function (color) {
		this.modifiers.primaryBg.value = color;
		this.editor.queueModifications();
	};

	/**
	 * gets the Success Label Background Color.
	 * 
	 * @returns {string}
	 */
	LabelBase.prototype.getSuccessBackground = function () {
		return this.modifiers.successBg.value;
	};

	/**
	 * Sets the Success Label Background Color.
	 * 
	 * @param {string} color Sets the Success Label Background Color.
	 * 
	 * @returns {undefined}
	 */
	LabelBase.prototype.setSuccessBackground = function (color) {
		this.modifiers.successBg.value = color;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Info Label Background Color.
	 * 
	 * @returns {string}
	 */
	LabelBase.prototype.getInfoBackground = function () {
		return this.modifiers.infoBg.value;
	};

	/**
	 * Sets the Info Label Background Color.
	 * 
	 * @param {string} color Sets the Info Label Background Color.
	 * 
	 * @returns {undefined}
	 */
	LabelBase.prototype.setInfoBackground = function (color) {
		this.modifiers.infoBg.value = color;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Warning Label Background Color.
	 * 
	 * @returns {string}
	 */
	LabelBase.prototype.getWarningBackground = function () {
		return this.modifiers.warningBg.value;
	};

	/**
	 * Sets the Warning Label Background Color.
	 * 
	 * @param {type} color Sets the Warning Label Background Color.
	 * 
	 * @returns {undefined}
	 */
	LabelBase.prototype.setWarningBackground = function (color) {
		this.modifiers.warningBg.value = color;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Danger Label Background Color.
	 * 
	 * @returns {string}
	 */
	LabelBase.prototype.getDangerBackground = function () {
		return this.modifiers.dangerBg.value;
	};

	/**
	 * Sets the Danger Label Background Color.
	 * 
	 * @param {string} color Sets the Danger Label Background Color.
	 * 
	 * @returns {undefined}
	 */
	LabelBase.prototype.setDangerBackground = function (color) {
		this.modifiers.dangerBg.value = color;
		this.editor.queueModifications();
	};
	
	window.LabelBase = LabelBase;
})(window);