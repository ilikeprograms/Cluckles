(function (window) {
	"use strict";

	/**
	 * Allows modification of a Carousel component in Bootstrap.
	 * 
	 * @class Carousel
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} controlColor The @carousel-control-color variable which controls the Control Color of the Carousel component.
	 * @property {object} controlWidth The @carousel-control-width variable which controls the Control Width of the Carousel component.
	 * @property {object} controlOpacity The @carousel-control-opacity variable which controls the Control Opacity of the Carousel component.
	 * @property {object} controlFontSize The @carousel-control-font-size variable which controls the Control Font Size of the Carousel component.
	 * @property {object} indicatorActiveBg The @carousel-indicator-active-bg variable which controls the Indicator Active Background Color of the Carousel component.
	 * @property {object} indicatorBorderColor The @carousel-indicator-border-color variable which controls the Indicator Border Color of the Carousel component.
	 * @property {object} captionColor The @carousel-caption-color variable which controls the Caption Color of the Carousel component.
	 * 
	 * @returns {Carousel}
	 */
	var Carousel = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        // Configure the Modifiers
		this.controlColor = {
			variable: '@carousel-control-color',
			value: null
		};
		this.controlWidth = {
			variable: '@carousel-control-width',
			value: null
		};
		this.controlOpacity = {
			variable: '@carousel-control-opacity',
			value: null
		};
		this.controlFontSize = {
			variable: '@carousel-control-font-size',
			value: null
		};
        this.indicatorActiveBg = {
            variable: '@carousel-indicator-active-bg',
            value: null
        };
        this.indicatorBorderColor = {
            variable: '@carousel-indicator-border-color',
            value: null
        };
        this.captionColor = {
            variable: '@carousel-caption-color',
            value: null
        };
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            controlColor:           this.controlColor,
            controlWidth:           this.controlWidth,
            controlOpacity:         this.controlOpacity,
            controlFontSize:        this.controlFontSize,
            indicatorActiveBg:      this.indicatorActiveBg,
            indicatorBorderColor:   this.indicatorBorderColor,
            captionColor:           this.captionColor,
        };
	};
	
	// Inherit from parent Prototype and preserve constructor
	Carousel.prototype = Object.create(ThemeModifier.prototype);
	Carousel.constructor = Carousel;

    /**
	 * Gets the Control Color of the Carousel Component.
	 * 
	 * @returns {string}
	 */
	Carousel.prototype.getControlColor = function () {
		return this.modifiers.controlColor.value;
	};

	/**
	 * Sets the Control Color of the Carousel Component.
	 * 
	 * @param {string} controlColor Sets the Carousel Control Color.
	 * 
	 * @returns {undefined}
	 */
	Carousel.prototype.setControlColor = function (controlColor) {
		this.modifiers.controlColor.value = controlColor;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Control Width of the Carousel Component.
	 * 
	 * @returns {string}
	 */
	Carousel.prototype.getControlWidth = function () {
		return this.modifiers.controlWidth.value;
	};

	/**
	 * Sets the Control Width of the Carousel Component.
	 * 
	 * @param {string} controlWidth Sets the Carousel Control Width.
	 * 
	 * @returns {undefined}
	 */
	Carousel.prototype.setControlWidth = function (controlWidth) {
		this.modifiers.controlWidth.value = controlWidth + '%';
		this.editor.queueModifications();
	};

    /**
	 * Gets the Control Opacity of the Carousel Component.
	 * 
	 * @returns {string}
	 */
	Carousel.prototype.getControlOpacity = function () {
		return this.modifiers.controlOpacity.value;
	};

	/**
	 * Sets the Control Opacity of the Carousel Component.
	 * 
	 * @param {string} controlOpacity Sets the Carousel Control Opacity.
	 * 
	 * @returns {undefined}
	 */
	Carousel.prototype.setControlOpacity = function (controlOpacity) {
		this.modifiers.controlOpacity.value = controlOpacity;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Control Font Size of the Carousel Component.
	 * 
	 * @returns {string}
	 */
	Carousel.prototype.getControlFontSize = function () {
		return this.modifiers.controlFontSize.value;
	};

	/**
	 * Sets the Control Font Size of the Carousel Component.
	 * 
	 * @param {string} controlFontSize Sets the Carousel Control Font Size.
	 * 
	 * @returns {undefined}
	 */
	Carousel.prototype.setControlFontSize = function (controlFontSize) {
		this.modifiers.controlFontSize.value = controlFontSize + 'px';
		this.editor.queueModifications();
	};

    /**
     * Gets the Indicator Background Color of the Carousel Component.
     * 
     * @returns {string}
     */
    Carousel.prototype.getIndicatorActiveBackgroundColor = function () {
        return this.modifiers.indicatorActiveBg.value;
    };

    /**
     * Sets the Indicator Background Color of the Carousel Component.
     * 
     * @param {string} indicatorActiveBg Sets the Carousel Indicator Background Color.
     * 
     * @returns {undefined}
     */
    Carousel.prototype.setIndicatorActiveBackgroundColor = function (indicatorActiveBg) {
        this.modifiers.indicatorActiveBg.value = indicatorActiveBg;
        this.editor.queueModifications();
    };

    /**
     * Gets the Indicator Border Color of the Carousel Component.
     * 
     * @returns {string}
     */
    Carousel.prototype.getIndicatorBorderColor = function () {
        return this.modifiers.indicatorBorderColor.value;
    };

    /**
     * Sets the Indicator Border Color of the Carousel Component.
     * 
     * @param {string} indicatorBorderColor Sets the Carousel Border Color.
     * 
     * @returns {undefined}
     */
    Carousel.prototype.setIndicatorBorderColor = function (indicatorBorderColor) {
        this.modifiers.indicatorBorderColor.value = indicatorBorderColor;
        this.editor.queueModifications();
    };

    /**
     * Gets the Caption Color of the Carousel Component.
     * 
     * @returns {string}
     */
    Carousel.prototype.getCaptionColor = function () {
        return this.modifiers.captionColor.value;
    };

    /**
     * Sets the Caption Color of the Carousef Component.
     * 
     * @param {string} captionColor Sets the Carousel Caption Color.
     * 
     * @returns {undefined}
     */
    Carousel.prototype.setCaptionColor = function (captionColor) {
        this.modifiers.captionColor.value = captionColor;
        this.editor.queueModifications();
    };

	window.Carousel = Carousel;
})(window);