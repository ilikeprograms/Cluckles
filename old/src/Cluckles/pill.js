	/**
	 * Allows modification of a Pill component in Bootstrap.
	 * 
	 * @class Pill
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} borderRadius          The @nav-pills-border-radius variable which controls the Border Radius of the Pill cComponent.
	 * @property {object} linkActiveHoverBg     The @nav-pills-active-link-hover-bg variable which controls the Link Active Hover Background Color of the Pill Component.
	 * @property {object} linkActiveHoverColor  The @nav-pills-active-link-hover-color variable which controls the Link Active Hover Color of the Pill Component.
	 * 
	 * @returns {Pill}
	 */
	var Pill = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-pill';

        this.borderRadius = {
            variable:           '@nav-pills-border-radius',
            subscribeProperty:  'border-radius',
            suffixUnit:         true,
            changeFn:           this.setBorderRadius.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.linkActiveBg = {
            variable:           '@nav-pills-active-link-hover-bg',
            subscribeProperty:  'link-active-bg',
            changeFn:           this.setLinkActiveBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.linkActiveColor = {
            variable:           '@nav-pills-active-link-hover-color',
            subscribeProperty:  'link-active-color',
            changeFn:           this.setLinkActiveColor.bind(this),
            subscribers:        [],
			_value:             null
        };

        this.modifiers = {
            borderRadius:       this.borderRadius,
            linkActiveBg:       this.linkActiveBg,
            linkActiveColor:    this.linkActiveColor
        };

        this.setupDataBinding();
    };

    // Inherit from parent Prototype and preserve constructor
	Pill.prototype              = Object.create(ThemeModifier.prototype);
	Pill.prototype.constructor  = Pill;

	/**
	 * Gets the Border Radius of the Pill Component.
	 * 
	 * @returns {string}
	 */
	Pill.prototype.getBorderRadius = function () {
		return this.modifiers.borderRadius.value;
	};

	/**
	 * Sets the Border Radius of the Pill Component.
	 * 
	 * @param {string} borderRadius The Pill Border Radius to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
	 * 
	 * @returns {undefined}
	 */
	Pill.prototype.setBorderRadius = function (borderRadius, unit) {
        if (unit !== undefined) { this.modifiers.borderRadius.unit = unit; }

		this.modifiers.borderRadius.value = borderRadius;
	};

    /**
	 * Gets the Link Active Background Color of the Pill Component.
	 * 
	 * @returns {string}
	 */
	Pill.prototype.getLinkActiveBackgroundColor = function () {
		return this.modifiers.linkActiveBg.value;
	};
	
	/**
	 * Sets the Link Active Background Color of the Pill Component.
	 * 
	 * @param {string} linkActiveBg The Pill Link Active Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pill.prototype.setLinkActiveBackgroundColor = function (linkActiveBg) {
		this.modifiers.linkActiveBg.value = linkActiveBg;
	};

	/**
	 * Gets the Link Active Color of the Pill Component.
	 * 
	 * @returns {string}
	 */
	Pill.prototype.getLinkActiveColor = function () {
		return this.modifiers.linkActiveColor.value;
	};
	
	/**
	 * Sets the Link Active Color of the Pill Component.
	 * 
	 * @param {string} linkActiveColor The Pill Link Active Hover Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pill.prototype.setLinkActiveColor = function (linkActiveColor) {
		this.modifiers.linkActiveColor.value = linkActiveColor;
	};