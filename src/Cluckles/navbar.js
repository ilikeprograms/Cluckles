	/**
	 * Allows modification of a Navbar component in Bootstrap.
	 * 
	 * @class Navbar
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
     * @param {string} string The style of Navbar Component to modify.
	 * 
	 * @property {object} bg The @navbar-{style}-bg variable which controls the background color of the Navbar component.
	 * @property {object} color The @navbar-{style}-color variable which controls the color of the Navbar component.
	 * @property {object} border The @navbar-{style}-border variable which controls the border of the Navbar component.
	 * @property {object} linkColor The @navbar-{style}-link-color variable which controls the link color of the Navbar component.
	 * @property {object} linkHoverColor The @navbar-{style}-link-hover-color variable which controls the link hover color of the Navbar component.
	 * @property {object} linkHoverBg The @navbar-{style}-link-hover-bg variable which controls the link hover background of the Navbar component.
	 * @property {object} linkActiveColor The @navbar-{style}-link-active-color variable which controls the link active color of the Navbar component.
	 * @property {object} linkActiveBg The @navbar-{style}-link-active-bg variable which controls the link active background of the Navbar component.
	 * @property {object} linkDisabledColor The @navbar-{style}-link-disabled-color variable which controls the link disabled color of the Navbar component.
	 * @property {object} linkDisabledBg The @navbar-{style}-link-disabled-bg variable which controls the link disabled background of the Navbar component.
	 * @property {object} brandColor The @navbar-{style}-brand-color variable which controls the brand color of the Navbar component.
	 * @property {object} brandHoverColor The @navbar-{style}-brand-hover-color variable which controls the brand hover color of the Navbar component.
	 * @property {object} brandHoverBg The @navbar-{style}-brand-hover-bg variable which controls the brand hover background of the Navbar component.
	 * 
	 * @returns {Navbar}
	 */
	var Navbar = function (editor, style) {
		ThemeModifier.call(this, editor); // Call parent constructor

		var navbarStyle = style === undefined ? 'default' : 'inverse';

        this.subscriberDataAttribute = 'data-cluckles-navbar-' + navbarStyle;

        // Configure the Modifiers
		this.bg = {
			variable: 'navbar-' + navbarStyle + '-bg',
			subscribeProperty:  'bg',
            changeFn:           this.setBackground.bind(this),
            subscribers:        [],
			_value: null
		};
		this.color = {
			variable: 'navbar-' + navbarStyle + '-color',
			subscribeProperty:  'color',
            changeFn:           this.setColor.bind(this),
            subscribers:        [],
			_value: null
		};
		this.border = {
			variable: 'navbar-' + navbarStyle + '-border',
			subscribeProperty:  'border',
            changeFn:           this.setBorder.bind(this),
            subscribers:        [],
			_value: null
		};
		this.linkColor = {
			variable: 'navbar-' + navbarStyle + '-link-color',
			subscribeProperty:  'link-color',
            changeFn:           this.setLinkColor.bind(this),
            subscribers:        [],
			_value: null
		};
		this.linkHoverColor = {
			variable: 'navbar-' + navbarStyle + '-link-hover-color',
			subscribeProperty:  'link-hover-color',
            changeFn:           this.setLinkHoverColor.bind(this),
            subscribers:        [],
			_value: null
		};
		this.linkHoverBg = {
			variable: 'navbar-' + navbarStyle + '-link-hover-bg',
			subscribeProperty:  'link-hover-bg',
            changeFn:           this.setLinkHoverBackgroundColor.bind(this),
            subscribers:        [],
			_value: null
		};
		this.linkActiveColor = {
			variable: 'navbar-' + navbarStyle + '-link-active-color',
			subscribeProperty:  'link-active-color',
            changeFn:           this.setLinkActiveColor.bind(this),
            subscribers:        [],
			_value: null
		};
		this.linkActiveBg = {
			variable: 'navbar-' + navbarStyle + '-link-active-bg',
			subscribeProperty:  'link-active-bg',
            changeFn:           this.setLinkActiveBackgroundColor.bind(this),
            subscribers:        [],
			_value: null
		};
		this.linkHoverColor = {
			variable: 'navbar-' + navbarStyle + '-link-hover-color',
			subscribeProperty:  'link-hover-color',
            changeFn:           this.setLinkHoverColor.bind(this),
            subscribers:        [],
			_value: null
		};
		this.linkHoverBg = {
			variable: 'navbar-' + navbarStyle + '-link-hover-bg',
			subscribeProperty:  'link-hover-bg',
            changeFn:           this.setLinkHoverBackgroundColor.bind(this),
            subscribers:        [],
			_value: null
		};
		this.linkDisabledColor = {
			variable: 'navbar-' + navbarStyle + '-link-disabled-color',
			subscribeProperty:  'link-disabled-color',
            changeFn:           this.setLinkDisabledColor.bind(this),
            subscribers:        [],
			_value: null
		};
		this.linkDisabledBg = {
			variable: 'navbar-' + navbarStyle + '-link-disabled-bg',
			subscribeProperty:  'link-disabled-bg',
            changeFn:           this.setLinkDisabledBackgroundColor.bind(this),
            subscribers:        [],
			_value: null
		};
		this.brandColor = {
			variable: 'navbar-' + navbarStyle + '-brand-color',
			subscribeProperty:  'brand-color',
            changeFn:           this.setBrandColor.bind(this),
            subscribers:        [],
			_value: null
		};
		this.brandHoverColor = {
			variable: 'navbar-' + navbarStyle + '-brand-hover-color',
			subscribeProperty:  'brand-hover-color',
            changeFn:           this.setBrandHoverColor.bind(this),
            subscribers:        [],
			_value: null
		};
		this.brandHoverBg = {
			variable: 'navbar-' + navbarStyle + '-brand-hover-bg',
			subscribeProperty:  'brand-hover-bg',
            changeFn:           this.setBrandHoverBackgroundColor.bind(this),
            subscribers:        [],
			_value: null
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
	Navbar.prototype = Object.create(ThemeModifier.prototype);
	Navbar.constructor = Navbar;

	/**
	 * Gets the Background color.
	 * 
	 * @returns {String}
	 */
	Navbar.prototype.getBackground = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background color of this Navbar instance.
	 * 
	 * @param {string} color Sets the Background color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setBackground = function (color) {
		this.modifiers.bg.value = color;
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
	 * @param {string} color Sets the Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setColor = function (color) {
		this.modifiers.color.value = color;
	};
	
	/**
	 * Gets the Border of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getBorder = function () {
		return this.modifiers.border.value;
	};
	
	/**
	 * Sets the Border of this Navbar instance.
	 * 
	 * @param {string} color Sets the Border.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setBorder = function (color) {
		this.modifiers.border.value = color;
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
	 * @param {string} color Sets the Link Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkColor = function (color) {
		this.modifiers.linkColor.value = color;
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
	 * @param {string} color Sets the Link Hover Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkHoverColor = function (color) {
		this.modifiers.linkHoverColor.value = color;
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
	 * @param {string} color Sets the Link Hover Background Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkHoverBackgroundColor = function (color) {
		this.modifiers.linkHoverBg.value = color;
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
	 * @param {string} color Set the Link Active Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkActiveColor = function (color) {
		this.modifiers.linkActiveColor.value = color;
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
	 * @param {string} color Sets the Link Active Background Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkActiveBackgroundColor = function (color) {
		this.modifiers.linkActiveBg.value = color;
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
	 * @param {string} color Set the Link Disabled Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkDisabledColor = function (color) {
		this.modifiers.linkDisabledColor.value = color;
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
	 * @param {string} color Sets the Link Disabled Background Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkDisabledBackgroundColor = function (color) {
		this.modifiers.linkDisabledBg.value = color;
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
	 * @param {string} color Sets the Brand Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setBrandColor = function (color) {
		this.modifiers.brandColor.value = color;
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
	 * @param {string} color Sets the Brand Hover Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setBrandHoverColor = function (color) {
		this.modifiers.brandHoverColor.value = color;
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
	 * @param {string} color Sets the Brand Hover Background Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setBrandHoverBackgroundColor = function (color) {
		this.modifiers.brandHoverBg.value = color;
	};