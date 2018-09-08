	/**
	 * Allows modifications of the ListGroup Component styling.
	 * 
	 * @class ListGroup
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} bg                The @list-group-bg variable which sets the Background Color of the ListGroup Component.
	 * @property {object} border            The @list-group-border variable which sets the Border Color of the ListGroup Component.
	 * @property {object} borderRadius      The @list-group-border-radius variable which sets the Border Radius of the ListGroup Component.
	 * @property {object} hoverBg           The @list-group-hover-bg variable which sets the Hover Background of the ListGroup Component.
	 * @property {object} activeBg          The @list-group-active-bg variable which sets the Background Color of <a> inside ListGroups.
	 * @property {object} activeBorder      The @list-group-active-border variable which sets the Active Border of the ListGroup Component.
	 * @property {object} activeColor       The @list-group-active-color variable which sets the Color of <a> inside ListGroups.
	 * @property {object} activeTextColor   The @list-group-active-text-color variable which sets the Color of <a> > <p> inside ListGroups.
     * @property {object} linkColor         The @list-group-link-color variable which sets the Color of <a> inside ListGroups.
     * @property {object} linkHeadingColor  The @list-group-link-heading-color variable which sets the Color of <h4> inside ListGroups.
     * @property {object} linkHoverColor    The @list-group-link-heading-color variable which sets the Hover Color of <a> inside ListGroups.
     * @property {object} disabledBg        The @list-group-disabled-bg variable which sets the Background Color of Disabled Items inside ListGroups.
     * @property {object} disabledColor     The @list-group-disabled-color variable which sets the Color of Disabled Items inside ListGroups.
     * @property {object} disabledTextColor The @list-group-disabled-text-color variable which sets the Text Color of Content in Disabled Items inside ListGroups.
	 * 
	 * @returns {ListGroup}
	 */
	var ListGroup = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-listgroup';

        // Configure the Modifiers
		this.bg = {
			variable:           '@list-group-bg',
			subscribeProperty:  'bg',
            changeFn:           this.setBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.border = {
			variable:           '@list-group-border',
			subscribeProperty:  'border',
            changeFn:           this.setBorderColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.borderRadius = {
			variable:           '@list-group-border-radius',
			subscribeProperty:  'border-radius',
            suffixUnit:         true,
            changeFn:           this.setBorderRadius.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.hoverBg = {
			variable:           '@list-group-hover-bg',
			subscribeProperty:  'hover-bg',
            changeFn:           this.setHoverBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.activeBg = {
			variable:           '@list-group-active-bg',
			subscribeProperty:  'active-bg',
            changeFn:           this.setActiveBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.activeBorder = {
			variable:           '@list-group-active-border',
			subscribeProperty:  'active-border',
            changeFn:           this.setActiveBorderColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.activeColor = {
			variable:           '@list-group-active-color',
			subscribeProperty:  'active-color',
            changeFn:           this.setActiveColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.activeTextColor = {
			variable:           '@list-group-active-text-color',
			subscribeProperty:  'active-text-color',
            changeFn:           this.setActiveTextColor.bind(this),
            subscribers:        [],
			_value:             null
		};
        this.linkColor = {
			variable:           '@list-group-link-color',
			subscribeProperty:  'link-color',
            changeFn:           this.setLinkColor.bind(this),
            subscribers:        [],
			_value:             null
		};
        this.linkHeadingColor = {
			variable:           '@list-group-link-heading-color',
			subscribeProperty:  'link-heading-color',
            changeFn:           this.setLinkHeadingColor.bind(this),
            subscribers:        [],
			_value:             null
		};
        this.linkHoverColor = {
			variable:           '@list-group-link-hover-color',
			subscribeProperty:  'link-hover-color',
            changeFn:           this.setLinkHoverColor.bind(this),
            subscribers:        [],
			_value:             null
		};
        this.disabledBg = {
			variable:           '@list-group-disabled-bg',
			subscribeProperty:  'disabled-bg',
            changeFn:           this.setDisabledBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
        this.disabledColor = {
			variable:           '@list-group-disabled-color',
			subscribeProperty:  'disabled-color',
            changeFn:           this.setDisabledColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.disabledTextColor = {
			variable:           '@list-group-disabled-text-color',
			subscribeProperty:  'disabled-text-color',
            changeFn:           this.setDisabledTextColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            bg:                 this.bg,
            border:             this.border,
            hoverBg:            this.hoverBg,
            activeBg:           this.activeBg,
            activeBorder:       this.activeBorder,
            activeColor:        this.activeColor,
            activeTextColor:    this.activeTextColor,
            linkColor:          this.linkColor,
            linkHeadingColor:   this.linkHeadingColor,
            linkHoverColor:     this.linkHoverColor,
            disabledBg:         this.disabledBg,
            disabledColor:      this.disabledColor,
            disabledTextColor:  this.disabledTextColor
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	ListGroup.prototype             = Object.create(ThemeModifier.prototype);
	ListGroup.prototype.constructor = ListGroup;
	
	/**
	 * Gets the Background Color of the ListGroup Component.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getBackgroundColor = function () {
		return this.modifiers.bg.value;
	};
	
	/**
	 * Sets the Background Color of the ListGroup Component.
	 * 
	 * @param {string} backgroundColor The ListGroup Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setBackgroundColor = function (backgroundColor) {
		this.modifiers.bg.value = backgroundColor;
	};
	
	/**
	 * Gets the Border Color of the ListGroup Component.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getBorderColor = function () {
		return this.modifiers.border.value;
	};
	
	/**
	 * Sets the Border Color of the ListGroup Component.
	 * 
	 * @param {string} borderColor The ListGroup the Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setBorderColor = function (borderColor) {
		this.modifiers.border.value = borderColor;
	};
	
	/**
	 * Gets the Border Radius of the ListGroup Component.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getBorderRadius = function () {
		return this.modifiers.borderRadius.value;
	};
	
	/**
	 * Sets the Border Radius of the ListGroup Component.
	 * 
	 * @param {string} borderRadius The ListGroup the Border Radius to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setBorderRadius = function (borderRadius, unit) {
        if (unit !== undefined) { this.modifiers.borderRadius.unit = unit; }

		this.modifiers.borderRadius.value = borderRadius;
	};
	
	/**
	 * Gets the Hover Background Color of the ListGroup Component.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getHoverBackgroundColor = function () {
		return this.modifiers.hoverBg.value;
	};
	
	/**
	 * Sets the Hover Background Color of the ListGroup Component.
	 * 
	 * @param {string} hoverBackgroundColor The ListGroup Hover Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setHoverBackgroundColor = function (hoverBackgroundColor) {
		this.modifiers.hoverBg.value = hoverBackgroundColor;
	};
	
	/**
	 * Gets the Active Background Color of the ListGroup Component.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getActiveBackgoundColor = function () {
		return this.modifiers.activeBg.value;
	};
	
	/**
	 * Sets the Active Background Color of the ListGroup Component.
	 * 
	 * @param {string} activeBackgroundColor The ListGroup Active Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setActiveBackgroundColor = function (activeBackgroundColor) {
		this.modifiers.activeBg.value = activeBackgroundColor;
	};
	
	/**
	 * Gets the Active Border Color of the ListGroup Component.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getActiveBorderColor = function () {
		return this.modifiers.activeBorder.value;
	};
	
	/**
	 * Sets the Active Border Color of the ListGroup Component.
	 * 
	 * @param {string} activeBorderColor The ListGroup Active Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setActiveBorderColor = function (activeBorderColor) {
		this.modifiers.activeBorder.value = activeBorderColor;
	};
	
	/**
	 * Gets the Active Color of the ListGroup Component.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getActiveColor = function () {
		return this.modifiers.activeColor.value;
	};
	
	/**
	 * Sets the Active Color of the ListGroup Component.
	 * 
	 * @param {string} activeColor The ListGroup Active Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setActiveColor = function (activeColor) {
		this.modifiers.activeColor.value = activeColor;
	};
	
	/**
	 * Gets the Active Text Color of the ListGroup Component.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.getActiveTextColor = function () {
		return this.modifiers.activeTextColor.value;
	};
	
	/**
	 * Sets the Active Text Color of the ListGroup Component.
	 * 
	 * @param {string} activeTextColor The ListGroup Active Text Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setActiveTextColor = function (activeTextColor) {
		this.modifiers.activeTextColor.value = activeTextColor;
	};

 	/**
	 * Gets the Link Color of the ListGroup Component.
	 * 
	 * @returns {String}
	 */
	ListGroup.prototype.getLinkColor = function () {
		return this.modifiers.linkColor.value;
	};
	
	/**
	 * Sets the Link Color of the ListGroup Component.
	 * 
	 * @param {string} linkColor The ListGroup Link Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setLinkColor = function (linkColor) {
		this.modifiers.linkColor.value = linkColor;
	};
	
	/**
	 * Gets the Link Heading Color of the ListGroup Component.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getLinkHeadingColor = function () {
		return this.modifiers.linkHeadingColor.value;
	};

	/**
	 * Sets the Link Heading Color of the ListGroup Component.
	 * 
	 * @param {string} linkHeadingColor The ListGroup Link Heading Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setLinkHeadingColor = function (linkHeadingColor) {
		this.modifiers.linkHeadingColor.value = linkHeadingColor;
	};

	/**
	 * Gets the Link Hover Color of the ListGroup Component.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getLinkHoverColor = function () {
		return this.modifiers.linkHoverColor.value;
	};

	/**
	 * Sets the Link Hover Color of the ListGroup Component.
	 * 
	 * @param {string} linkHoverColor The ListGroup Link Hover Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setLinkHoverColor = function (linkHoverColor) {
		this.modifiers.linkHoverColor.value = linkHoverColor;
	};

	/**
	 * Gets the Disabled Background Color of the ListGroup Component.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getDisabledBackgroundColor = function () {
		return this.modifiers.disabledBg.value;
	};
	
	/**
	 * Sets the Disabled Background Color of the ListGroup Component.
	 * 
	 * @param {string} disabledBackgroundColor The ListGroup Disabled Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setDisabledBackgroundColor = function (disabledBackgroundColor) {
		this.modifiers.disabledBg.value = disabledBackgroundColor;
	};

 	/**
	 * Gets the Disabled Color of the ListGroup Component.
	 * 
	 * @returns {String}
	 */
	ListGroup.prototype.getDisabledColor = function () {
		return this.modifiers.disabledColor.value;
	};
	
	/**
	 * Sets the Disabled Color of the ListGroup Component.
	 * 
	 * @param {string} disabledColor The ListGroup Disabled Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setDisabledColor = function (disabledColor) {
		this.modifiers.disabledColor.value = disabledColor;
	};

 	/**
	 * Gets the Disabled Text Color of the ListGroup Component.
	 * 
	 * @returns {String}
	 */
	ListGroup.prototype.getDisabledTextColor = function () {
		return this.modifiers.disabledTextColor.value;
	};

	/**
	 * Sets the Disabled Text Color of the ListGroup Component.
	 * 
	 * @param {string} disabledTextColor The ListGroup Disabled Text Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setDisabledTextColor = function (disabledTextColor) {
		this.modifiers.disabledTextColor.value = disabledTextColor;
	};