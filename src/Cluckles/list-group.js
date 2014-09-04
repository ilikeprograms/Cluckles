	/**
	 * Allows modifications of the ListGroup Component styling.
	 * 
	 * @class ListGroup
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} bg The @list-group-bg variable which sets the background color of list group.
	 * @property {object} border The @list-group-border variable which sets the border of the list group.
	 * @property {object} hoverBg The @list-group-hover-bg variable which sets the hover background of the list group.
	 * @property {object} linkHeadingColor The @list-group-link-heading-color variable which sets the color of <h4> inside list groups.
	 * @property {object} linkColor The @list-group-link-color variable which sets the color of <a> inside list groups.
	 * @property {object} activeBg The @list-group-active-bg variable which sets the background color of <a> inside list groups.
	 * @property {object} activeBorder The @list-group-active-border variable which sets the active border of list groups.
	 * @property {object} activeColor The @list-group-active-color variable which sets the color of <a> inside list groups.
	 * @property {object} activeTextColor The @list-group-active-text-color variable which sets the color of <a> > <p> inside list groups.
	 * 
	 * @returns {ListGroup}
	 */
	var ListGroup = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-listgroup';

        // Configure the Modifiers
		this.bg = {
			variable: '@list-group-bg',
			subscribeProperty: 'bg',
            changeFn: this.setBackground.bind(this),
            subscribers: [],
			_value: null
		};
		this.border = {
			variable: '@list-group-border',
			subscribeProperty: 'border',
            changeFn: this.setBorder.bind(this),
            subscribers: [],
			_value: null
		};
		this.hoverBg = {
			variable: '@list-group-hover-bg',
			subscribeProperty: 'hover-bg',
            changeFn: this.setHoverBackground.bind(this),
            subscribers: [],
			_value: null
		};
		this.linkHeadingColor = {
			variable: '@list-group-link-heading-color',
			subscribeProperty: 'link-heading-color',
            changeFn: this.setLinkHeadingColor.bind(this),
            subscribers: [],
			_value: null
		};
		this.linkColor = {
			variable: '@list-group-link-color',
			subscribeProperty: 'link-color',
            changeFn: this.setLinkColor.bind(this),
            subscribers: [],
			_value: null
		};
		this.activeBg = {
			variable: '@list-group-active-bg',
			subscribeProperty: 'active-bg',
            changeFn: this.setActiveBackground.bind(this),
            subscribers: [],
			_value: null
		};
		this.activeBorder = {
			variable: '@list-group-active-border',
			subscribeProperty: 'active-border',
            changeFn: this.setActiveBorder.bind(this),
            subscribers: [],
			_value: null
		};
		this.activeColor = {
			variable: '@list-group-active-color',
			subscribeProperty: 'active-color',
            changeFn: this.setActiveColor.bind(this),
            subscribers: [],
			_value: null
		};
		this.activeTextColor = {
			variable: '@list-group-active-text-color',
			subscribeProperty: 'active-text-color',
            changeFn: this.setActiveTextColor.bind(this),
            subscribers: [],
			_value: null
		};
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            bg:                 this.bg,
            border:             this.border,
            hoverBg:            this.hoverBg,
            linkHeadingColor:   this.linkHeadingColor,
            linkColor:          this.linkColor,
            activeBg:           this.activeBg,
            activeBorder:       this.activeBorder,
            activeColor:        this.activeColor,
            activeTextColor:    this.activeTextColor
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	ListGroup.prototype = Object.create(ThemeModifier.prototype);
	ListGroup.constructor = ListGroup;
	
	/**
	 * Gets the Background color.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getBackground = function () {
		return this.modifiers.bg.value;
	};
	
	/**
	 * Sets the Background color.
	 * 
	 * @param {string} color Sets the Background color.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setBackground = function (color) {
		this.modifiers.bg.value = color;
	};
	
	/**
	 * Gets the Border color.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getBorder = function () {
		return this.modifiers.border.value;
	};
	
	/**
	 * Sets the Border color.
	 * 
	 * @param {string} color Sets the Border color.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setBorder = function (color) {
		this.modifiers.border.value = color;
	};
	
	/**
	 * Gets the Hover Background color.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getHoverBackground = function () {
		return this.modifiers.hoverBg.value;
	};
	
	/**
	 * Sets the Hover Background color.
	 * 
	 * @param {string} color Sets the Hover Background color.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setHoverBackground = function (color) {
		this.modifiers.hoverBg.value = color;
	};
	
 	/**
	 * Gets the linkColor value.
	 * 
	 * @returns {String}
	 */
	ListGroup.prototype.getLinkColor = function () {
		return this.modifiers.linkColor.value;
	};
	
	/**
	 * Sets the Link color of the ListGroup Component.
	 * 
	 * @param {string} color The color to set the Link color.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setLinkColor = function (color) {
		this.modifiers.linkColor.value = color;
	};
	
	/**
	 * Gets the linkHeadingColor value.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getLinkHeadingColor = function () {
		return this.modifiers.linkHeadingColor.value;
	};

	/**
	 * Sets the Link Heading color of the ListGroup Component.
	 * 
	 * @param {string} color Sets the Link Heading color.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setLinkHeadingColor = function (color) {
		this.modifiers.linkHeadingColor.value = color;
	};
	
	/**
	 * Gets the activeBackground color value.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getActiveBackgound = function () {
		return this.modifiers.activeBg.value;
	};
	
	/**
	 * Sets the activeBackground color value.
	 * 
	 * @param {string} color Sets the Active Background color.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setActiveBackground = function (color) {
		this.modifiers.activeBg.value = color;
	};
	
	/**
	 * Gets the Active Border color value.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getActiveBorder = function () {
		return this.modifiers.activeBorder.value;
	};
	
	/**
	 * Sets the Active Border color value.
	 * 
	 * @param {string} color Sets the Active Border color.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setActiveBorder = function (color) {
		this.modifiers.activeBorder.value = color;
	};
	
	/**
	 * Gets the activeColor value.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getActiveColor = function () {
		return this.modifiers.activeColor.value;
	};
	
	/**
	 * Sets the activeColor value.
	 * 
	 * @param {string} color Sets the Active Color value.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setActiveColor = function (color) {
		this.modifiers.activeColor.value = color;
	};
	
	/**
	 * Gets the activeTextColor value.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.getActiveTextColor = function () {
		return this.modifiers.activeTextColor.value;
	};
	
	/**
	 * Sets the activeTextColor value.
	 * 
	 * @param {string} color Sets the Active Text Color value.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setActiveTextColor = function (color) {
		this.modifiers.activeTextColor.value = color;
	};