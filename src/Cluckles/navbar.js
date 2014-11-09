	/**
	 * Allows modification of the Navbar Component in Bootstrap.
	 * 
	 * @class Navbar
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
     * @param {string} style The style of Navbar Component to modify.
	 * 
	 * @property {object} bg                The @navbar-{style}-bg variable which controls the Background Color of the Navbar Component.
	 * @property {object} color             The @navbar-{style}-color variable which controls the Color of the Navbar Component.
	 * @property {object} border            The @navbar-{style}-border variable which controls the Border Color of the Navbar Component.
	 * @property {object} linkColor         The @navbar-{style}-link-color variable which controls the Link Color of the Navbar Component.
	 * @property {object} linkHoverColor    The @navbar-{style}-link-hover-color variable which controls the Link Hover Color of the Navbar Component.
	 * @property {object} linkHoverBg       The @navbar-{style}-link-hover-bg variable which controls the Link Hover Background of the Navbar Component.
	 * @property {object} linkActiveColor   The @navbar-{style}-link-active-color variable which controls the Link Active Color of the Navbar Component.
	 * @property {object} linkActiveBg      The @navbar-{style}-link-active-bg variable which controls the Link Active Background of the Navbar Component.
	 * @property {object} linkDisabledColor The @navbar-{style}-link-disabled-color variable which controls the Link Disabled Color of the Navbar Component.
	 * @property {object} linkDisabledBg    The @navbar-{style}-link-disabled-bg variable which controls the Link Disabled Background of the Navbar Component.
	 * @property {object} brandColor        The @navbar-{style}-brand-color variable which controls the Brand Color of the Navbar Component.
	 * @property {object} brandHoverColor   The @navbar-{style}-brand-hover-color variable which controls the Brand Hover Color of the Navbar Component.
	 * @property {object} brandHoverBg      The @navbar-{style}-brand-hover-bg variable which controls the Brand Hover Background of the Navbar Component.
	 * 
	 * @returns {Navbar}
	 */
	var Navbar = function (editor, style) {
		ThemeModifier.call(this, editor); // Call parent constructor

		var navbarStyle = style === undefined ? 'default' : 'inverse';

        this.subscriberDataAttribute = 'data-cluckles-navbar-' + navbarStyle;

        // Configure the Modifiers
		this.bg = {
			variable:           '@navbar-' + navbarStyle + '-bg',
			subscribeProperty:  'bg',
            changeFn:           this.setBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.color = {
			variable:           '@navbar-' + navbarStyle + '-color',
			subscribeProperty:  'color',
            changeFn:           this.setColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.border = {
			variable:           '@navbar-' + navbarStyle + '-border',
			subscribeProperty:  'border',
            changeFn:           this.setBorderColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.linkColor = {
			variable:           '@navbar-' + navbarStyle + '-link-color',
			subscribeProperty:  'link-color',
            changeFn:           this.setLinkColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.linkHoverColor = {
			variable:           '@navbar-' + navbarStyle + '-link-hover-color',
			subscribeProperty:  'link-hover-color',
            changeFn:           this.setLinkHoverColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.linkHoverBg = {
			variable:           '@navbar-' + navbarStyle + '-link-hover-bg',
			subscribeProperty:  'link-hover-bg',
            changeFn:           this.setLinkHoverBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.linkActiveColor = {
			variable:           '@navbar-' + navbarStyle + '-link-active-color',
			subscribeProperty:  'link-active-color',
            changeFn:           this.setLinkActiveColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.linkActiveBg = {
			variable:           '@navbar-' + navbarStyle + '-link-active-bg',
			subscribeProperty:  'link-active-bg',
            changeFn:           this.setLinkActiveBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.linkHoverColor = {
			variable:           '@navbar-' + navbarStyle + '-link-hover-color',
			subscribeProperty:  'link-hover-color',
            changeFn:           this.setLinkHoverColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.linkHoverBg = {
			variable:           '@navbar-' + navbarStyle + '-link-hover-bg',
			subscribeProperty:  'link-hover-bg',
            changeFn:           this.setLinkHoverBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.linkDisabledColor = {
			variable:           '@navbar-' + navbarStyle + '-link-disabled-color',
			subscribeProperty:  'link-disabled-color',
            changeFn:           this.setLinkDisabledColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.linkDisabledBg = {
			variable:           '@navbar-' + navbarStyle + '-link-disabled-bg',
			subscribeProperty:  'link-disabled-bg',
            changeFn:           this.setLinkDisabledBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.brandColor = {
			variable:           '@navbar-' + navbarStyle + '-brand-color',
			subscribeProperty:  'brand-color',
            changeFn:           this.setBrandColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.brandHoverColor = {
			variable:           '@navbar-' + navbarStyle + '-brand-hover-color',
			subscribeProperty:  'brand-hover-color',
            changeFn:           this.setBrandHoverColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.brandHoverBg = {
			variable:           '@navbar-' + navbarStyle + '-brand-hover-bg',
			subscribeProperty:  'brand-hover-bg',
            changeFn:           this.setBrandHoverBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};

        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            bg:                 this.bg,
            color:              this.color,
            border:             this.border,
            linkColor:          this.linkColor,
            linkHoverColor:     this.linkHoverColor,
            linkHoverBg:        this.linkHoverBg,
            linkActiveColor:    this.linkActiveColor,
            linkActiveBg:       this.linkActiveBg,
            linkDisabledColor:  this.linkDisabledColor,
            linkDisabledBg:     this.linkDisabledBg,
            brandColor:         this.brandColor,
            brandHoverColor:    this.brandHoverColor,
            brandHoverBg:       this.brandHoverBg
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Navbar.prototype                = Object.create(ThemeModifier.prototype);
	Navbar.prototype.constructor    = Navbar;

	/**
	 * Gets the Background Color of this Navbar instance.
	 * 
	 * @returns {String}
	 */
	Navbar.prototype.getBackgroundColor = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background Color of this Navbar instance.
	 * 
	 * @param {string} backgroundColor The Navbar instance Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setBackgroundColor = function (backgroundColor) {
		this.modifiers.bg.value = backgroundColor;
	};
	
	/**
	 * Gets the Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getColor = function () {
		return this.modifiers.color.value;
	};
	
	/**
	 * Sets the Color of this Navbar instance.
	 * 
	 * @param {string} color The Navbar instance Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setColor = function (color) {
		this.modifiers.color.value = color;
	};
	
	/**
	 * Gets the Border Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getBorderColor = function () {
		return this.modifiers.border.value;
	};
	
	/**
	 * Sets the Border Color of this Navbar instance.
	 * 
	 * @param {string} borderColor The Navbar instance Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setBorderColor = function (borderColor) {
		this.modifiers.border.value = borderColor;
	};
	
	/**
	 * Gets the Link Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getLinkColor = function () {
		return this.modifiers.linkColor.value;
	};
	
	/**
	 * Sets the Link Color of this Navbar instance.
	 * 
	 * @param {string} linkColor The Navbar instance Link Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkColor = function (linkColor) {
		this.modifiers.linkColor.value = linkColor;
	};
	
	/**
	 * Gets the Link Hover Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getLinkHoverColor = function () {
		return this.modifiers.linkHoverColor.value;
	};
	
	/**
	 * Sets the Link Hover Color of this Navbar instance.
	 * 
	 * @param {string} linkHoverColor The Navbar instance Link Hover Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkHoverColor = function (linkHoverColor) {
		this.modifiers.linkHoverColor.value = linkHoverColor;
	};
	
	/**
	 * Gets the Link Hover Background Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getLinkHoverBackgroundColor = function () {
		return this.modifiers.linkHoverBg.value;
	};
	
	/**
	 * Sets the Link Hover Background Color of this Navbar instance.
	 * 
	 * @param {string} linkHoverBackgroundColor The Navbar instance Link Hover Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkHoverBackgroundColor = function (linkHoverBackgroundColor) {
		this.modifiers.linkHoverBg.value = linkHoverBackgroundColor;
	};
	
	/**
	 * Gets the Link Active Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getLinkActiveColor = function () {
		return this.modifiers.linkActiveColor.value;
	};
	
	/**
	 * Sets the Link Active Color of this Navbar instance.
	 * 
	 * @param {string} linkActiveColor The Navbar instance Link Active Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkActiveColor = function (linkActiveColor) {
		this.modifiers.linkActiveColor.value = linkActiveColor;
	};
	
	/**
	 * Gets the Link Active Background Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getLinkActiveBackgroundColor = function () {
		return this.modifiers.linkActiveBg.value;
	};
	
	/**
	 * Sets the Link Active Background Color of this Navbar instance.
	 * 
	 * @param {string} linkActiveBackgroundColor The Navbar instance Link Active Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkActiveBackgroundColor = function (linkActiveBackgroundColor) {
		this.modifiers.linkActiveBg.value = linkActiveBackgroundColor;
	};
	
	/**
	 * Gets the Link Disabled Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getLinkDisabledColor = function () {
		return this.modifiers.linkDisabledColor.value;
	};
	
	/**
	 * Sets the Link Disabled Color of this Navbar instance.
	 * 
	 * @param {string} linkDisabledColor The Navbar instance Link Disabled Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkDisabledColor = function (linkDisabledColor) {
		this.modifiers.linkDisabledColor.value = linkDisabledColor;
	};
	
	/**
	 * Gets the Link Disabled Background Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getLinkDisabledBackgroundColor = function () {
		return this.modifiers.linkDisabledBg.value;
	};
	
	/**
	 * Sets the Link Disabled Background Color of this Navbar instance.
	 * 
	 * @param {string} linkDisabledBackgroundColor The Navbar instance Link Disabled Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkDisabledBackgroundColor = function (linkDisabledBackgroundColor) {
		this.modifiers.linkDisabledBg.value = linkDisabledBackgroundColor;
	};
	
		
	/**
	 * Gets the Brand Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getBrandColor = function () {
		return this.modifiers.brandColor.value;
	};
	
	/**
	 * Sets the Brand Color of this Navbar instance.
	 * 
	 * @param {string} brandColor The Navbar instance Brand Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setBrandColor = function (brandColor) {
		this.modifiers.brandColor.value = brandColor;
	};
	
		
	/**
	 * Gets the Brand Hover Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getBrandHoverColor = function () {
		return this.modifiers.brandHoverColor.value;
	};
	
	/**
	 * Sets the Brand Hover Color of this Navbar instance.
	 * 
	 * @param {string} brandHoverColor The Navbar instance Brand Hover Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setBrandHoverColor = function (brandHoverColor) {
		this.modifiers.brandHoverColor.value = brandHoverColor;
	};
	
	/**
	 * Gets the Brand Hover Background Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getBrandHoverBackgroundColor = function () {
		return this.modifiers.brandHoverBg.value;
	};
	
	/**
	 * Sets the Brand Hover Background Color of this Navbar instance.
	 * 
	 * @param {string} brandHoverBackgroundColor The Navbar instance Brand Hover Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setBrandHoverBackgroundColor = function (brandHoverBackgroundColor) {
		this.modifiers.brandHoverBg.value = brandHoverBackgroundColor;
	};