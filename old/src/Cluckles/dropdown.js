	/**
	 * Allows modification of the Dropdown Component styling.
	 * 
	 * @class Dropdown
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} bg                The @dropdown-bg variable which controls the Background Color of the Dropdown Component.
	 * @property {object} headerColor       The @dropdown-header-color variable which controls the Header Color of the Dropdown Component.
	 * @property {object} border            The @dropdown-border variable which controls the Border Color of the Dropdown Component.
	 * @property {object} fallbackBorder    The @dropdown-fallback-border variable which controls the Border Color (IE8) of the Dropdown Component.
	 * @property {object} divider           The @dropdown-divider-bg variable which controls the Divider Color of the Dropdown Component.
	 * @property {object} linkColor         The @dropdown-link-color variable which controls the Link Color of the Dropdown Component.
	 * @property {object} linkDisabledColor The @dropdown-link-disabled-color variable which controls the Link Disabled Color of the Dropdown Component.
	 * @property {object} linkHoverBg       The @dropdown-link-hover-bg variable which controls the Link Hover Background Color of the Dropdown Component.
	 * @property {object} linkHoverColor    The @dropdown-link-hover-color variable which controls the Link Hover Color of the Dropdown Component,
	 * @property {object} linkActiveBg      The @dropdown-link-active-hover-bg variable which controls the Link Active Background Color of the Dropdown Component,
	 * @property {object} linkActiveColor   The @dropdown-link-active-hover-color variable which controls the Link Active Color of the Dropdown Component.
	 * 
	 * @returns {Dropdown}
	 */
	var Dropdown = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-dropdown';

        // Configure the Modifiers
		this.bg = {
			variable:           '@dropdown-bg',
            subscribeProperty:  'bg',
            changeFn:           this.setBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.headerColor = {
			variable:           '@dropdown-header-color',
            subscribeProperty:  'header-color',
            changeFn:           this.setHeaderColor.bind(this),
			subscribers:        [],
			_value:             null
		};
		this.border = {
			variable:           '@dropdown-border',
            subscribeProperty:  'border-color',
            changeFn:           this.setBorderColor.bind(this),
			subscribers:        [],
			_value:             null
		};
		this.fallbackBorder = {
			variable:           '@dropdown-fallback-border',
            subscribeProperty:  'fallback-border-color',
            changeFn:           this.setFallbackBorderColor.bind(this),
			subscribers:        [],
			_value:             null
		};
		this.divider = {
			variable:           '@dropdown-divider-bg',
            subscribeProperty:  'divider',
            changeFn:           this.setDividerColor.bind(this),
			subscribers:        [],
			_value:             null
		};
		this.linkColor = {
			variable:           '@dropdown-link-color',
            subscribeProperty:  'link-color',
            changeFn:           this.setLinkColor.bind(this),
			subscribers:        [],
			_value:             null
		};
		this.linkDisabledColor = {
			variable:           '@dropdown-link-disabled-color',
            subscribeProperty:  'link-disabled-color',
            changeFn:           this.setLinkDisabledColor.bind(this),
			subscribers:        [],
			_value:             null
		};
		this.linkHoverBg = {
			variable:           '@dropdown-link-hover-bg',
            subscribeProperty:  'link-hover-bg',
            changeFn:           this.setLinkHoverBackgroundColor.bind(this),
			subscribers:        [],
			_value:             null
		};
		this.linkHoverColor = {
			variable:           '@dropdown-link-hover-color',
            subscribeProperty:  'link-hover-color',
            changeFn:           this.setLinkHoverColor.bind(this),
			subscribers:        [],
			_value:             null
		};
		this.linkActiveBg = {
			variable:           '@dropdown-link-active-bg',
            subscribeProperty:  'link-active-bg',
            changeFn:           this.setLinkActiveBackgroundColor.bind(this),
			subscribers:        [],
			_value:             null
		};
		this.linkActiveColor = {
			variable:           '@dropdown-link-active-color',
            subscribeProperty:  'link-active-color',
            changeFn:           this.setLinkActiveColor.bind(this),
			subscribers:        [],
			_value:             null
		};

        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            bg:                 this.bg,
            headerColor:        this.headerColor,
            border:             this.border,
            fallbackBorder:     this.fallbackBorder,
            divider:            this.divider,
            linkColor:          this.linkColor,
            linkDisabledColor:  this.linkDisabledColor,
            linkHoverBg:        this.linkHoverBg,
            linkHoverColor:     this.linkHoverColor,
            linkActiveBg:       this.linkActiveBg,
            linkActiveColor:    this.linkActiveColor
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Dropdown.prototype              = Object.create(ThemeModifier.prototype);
	Dropdown.prototype.constructor  = Dropdown;

	/**
	 * Gets the Background Color of the Dropdown Component.
	 * 
	 * @returns {String}
	 */
	Dropdown.prototype.getBackgroundColor = function () {
		return this.modifiers.bg;
	};
	
	/**
	 * Sets the Background Color of the Dropdown Component.
	 * 
	 * @param {string} backgroundColor The Dropdown Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setBackgroundColor = function (backgroundColor) {
		this.modifiers.bg.value = backgroundColor;
	};

	/**
	 * Gets the Header Color of the Dropdown Component.
	 * 
	 * @returns {String}
	 */
	Dropdown.prototype.getHeaderColor = function () {
		return this.modifiers.headingColor;
	};
	
	/**
	 * Sets the Header Color of the Dropdown Component.
	 * 
	 * @param {string} headerColor The Dropdown Header Color to set.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setHeaderColor = function (headerColor) {
		this.modifiers.headerColor.value = headerColor;
	};
	
	/**
	 * Gets the Border Color of the Dropdown Component.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getBorderColor = function () {
		return this.modifiers.border.value;
	};
	
	/**
	 * Sets the Border Color of the Dropdown Component.
	 * 
	 * @param {string} borderColor The Dropdown Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setBorderColor = function (borderColor) {
		this.modifiers.border.value = borderColor;
	};

	/**
	 * Gets the Fallback Border Color of the Dropdown Component.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getFallbackBorderColor = function () {
		return this.modifiers.fallbackBorder.value;
	};
	
	/**
	 * Sets the Fallback Border Color of the Dropdown Component.
	 * 
	 * @param {string} fallbackBorder The Dropdown Fallback Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setFallbackBorderColor = function (fallbackBorder) {
		this.modifiers.fallbackBorder.value = fallbackBorder;
	};
	
	/**
	 * Gets the Divider Color of the Dropdown Component.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getDividerColor = function () {
		return this.modifiers.divider.value;
	};
	
	/**
	 * Sets the Divider Color of the Dropdown Component.
	 * 
	 * @param {string} dividerColor The Dropdown Divider Color to set.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setDividerColor = function (dividerColor) {
		this.modifiers.divider.value = dividerColor;
	};
	
	/**
	 * Gets the Link Color of the Dropdown Component.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkColor = function () {
		return this.modifiers.linkColor.value;
	};
	
	/**
	 * Sets the Link Color of the Dropdown Component.
	 * 
	 * @param {string} linkColor The Dropdown Link Color to set.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkColor = function (linkColor) {
		this.modifiers.linkColor.value = linkColor;
	};
	
	/**
	 * Gets the Link Disabled Color of the Dropdown Component.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkDisabledColor = function () {
		return this.modifiers.linkDisabledColor.value;
	};
	
	/**
	 * Sets the Link Disabled Color of the Dropdown Component.
	 * 
	 * @param {string} linkDisabledColor The Dropdown Link Disabled Color to set.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkDisabledColor = function (linkDisabledColor) {
		this.modifiers.linkDisabledColor.value = linkDisabledColor;
	};
	
	/**
	 * Gets the Link Hover Background Color of the Dropdown Component.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkHoverBackgroundColor = function () {
		return this.modifiers.linkHoverBg.value;
	};
	
	/**
	 * Sets the Link Hover Background color value.
	 * 
	 * @param {string} linkHoverBackgroundColor The Dropdown Link Hover Background Color to set,
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkHoverBackgroundColor = function (linkHoverBackgroundColor) {
		this.modifiers.linkHoverBg.value = linkHoverBackgroundColor;
	};
	
	/**
	 * Gets the Link Hover Color of the Dropdown Component.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkHoverColor = function () {
		return this.modifiers.linkHoverColor.value;
	};
	
	/**
	 * Sets the Link Hover Color of the Dropdown Component.
	 * 
	 * @param {string} linkHoverColor The Dropdown Link Hover Color to set.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkHoverColor = function (linkHoverColor) {
		this.modifiers.linkHoverColor.value = linkHoverColor;
	};
	
	/**
	 * Gets the Link Active Background color of the Dropdown Component.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkActiveBackgroundColor = function () {
		return this.modifiers.linkActiveBg.value;
	};
	
	/**
	 * Sets the Link Active Background Color to set.
	 * 
	 * @param {string} linkActiveBackgroundColor The Dropdown Link Active Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkActiveBackgroundColor = function (linkActiveBackgroundColor) {
		this.modifiers.linkActiveBg.value = linkActiveBackgroundColor;
	};
	
	/**
	 * Gets the Link Active Hover Color of the Dropdown Component.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkActiveColor = function () {
		return this.modifiers.linkActiveColor.value;
	};
	
	/**
	 * Sets the Link Active Color of the Dropdown Component.
	 * 
	 * @param {string} linkActiveColor The Dropdown Link Active Color to set.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkActiveColor = function (linkActiveColor) {
		this.modifiers.linkActiveColor.value = linkActiveColor;
	};