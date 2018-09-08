    /**
     * Allows modifications of the Miscellaneous parts of Bootstrap.
     * 
     * @class Misc
     * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
     * 
     * @property {string} componentActiveBg     The @component-active-bg variable which sets the Global Background Color of bootstrap Components.
     * @property {string} componentActiveColor  The @component-active-color variable which sets the Global Color of bootstrap Components.
     * @property {string} wellBg                The @well-bg variable which sets the Background Color of the Well Component.
     * @property {string} wellBorder            The @well-border variable which sets the Border Color of the Well Component.
     * @property {string} bodyBg                The @body-bg variable which sets the Body Background Color.
     * @property {string} textColor             The @text-color variable which sets the Body Text color.
     * @property {string} pageHeaderBorderColor The @page-header-border-color variable which sets the Page Header Border Color.
     * @property {string} linkColor             The @link-color variable which sets the Link Color.
     * @property {string} linkHoverColor        The @link-hover-color variable which sets the Link Hover Color.
     * @property {string} linkHoverDecoration   The @link-hover-decoration variable which sets the Link Hover Decoration
     * @property {string} hrBorder              The @hr-border variable which sets the Color of the <hr> tag.
     * @property {string} borderRadiusBase      The @border-radius-base variable which sets the Base Border Radius.
     * @property {string} iconFontPath          The @icon-font-path variable which sets Directory to load Glyphicon fonts from.
     * 
     * @returns {Misc}
     */
    var Misc = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-misc';

        // Define the Modifiers
        this.componentActiveBg = {
            variable:           '@component-active-bg',
            subscribeProperty:  'component-active-bg',
            changeFn:           this.setComponentActiveBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.componentActiveColor = {
            variable:           '@component-active-color',
            subscribeProperty:  'component-active-color',
            changeFn:           this.setComponentActiveColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.wellBg = {
            variable:           '@well-bg',
            subscribeProperty:  'well-bg',
            changeFn:           this.setWellBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.wellBorder = {
            variable:           '@well-border',
            subscribeProperty:  'well-border',
            changeFn:           this.setWellBorderColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.bodyBg = {
            variable:           '@body-bg',
            subscribeProperty:  'body-bg',
            changeFn:           this.setBodyBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.textColor = {
            variable:           '@text-color',
            subscribeProperty:  'text-color',
            changeFn:           this.setTextColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.pageHeaderBorderColor = {
            variable:           '@page-header-border-color',
            subscribeProperty:  'page-header-border-color',
            changeFn:           this.setPageHeaderBorderColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.linkColor = {
            variable:           '@link-color',
            subscribeProperty:  'link-color',
            changeFn:           this.setLinkColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.linkHoverColor = {
            variable:           '@link-hover-color',
            subscribeProperty:  'link-hover-color',
            changeFn:           this.setLinkHoverColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.linkHoverDecoration = {
            variable:           '@link-hover-decoration',
            subscribeProperty:  'link-hover-decoration',
            changeFn:           this.setLinkHoverDecoration.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.hrBorder = {
            variable:           '@hr-border',
            subscribeProperty:  'horizontal-rule',
            changeFn:           this.setHrBorder.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.borderRadiusBase = {
            variable:           '@border-radius-base',
            subscribeProperty:  'border-radius-base',
            suffixUnit:         true,
            changeFn:           this.setBorderRadiusBase.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.iconFontPath = {
            variable:           '@icon-font-path',
            subscribeProperty:  'icon-font-path',
            changeFn:           this.setIconFontPath.bind(this),
            subscribers:        [],
			_value:             null
        };

        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            componentActiveBg:      this.componentActiveBg,
            componentActiveColor:   this.componentActiveColor,
            wellBg:                 this.wellBg,
            wellBorder:             this.wellBorder,
            bodyBg:                 this.bodyBg,
            textColor:              this.textColor,
            pageHeaderBorderColor:  this.pageHeaderBorderColor,
            linkColor:              this.linkColor,
            linkHoverColor:         this.linkHoverColor,
            linkHoverDecoration:    this.linkHoverDecoration,
            hrBorder:               this.hrBorder,
            borderRadiusBase:       this.borderRadiusBase,
            iconFontPath:           this.iconFontPath
        };

        this.setupDataBinding();
    };

    // Inherit from parent Prototype and preserve constructor
    Misc.prototype              = Object.create(ThemeModifier.prototype);
    Misc.prototype.constructor  = Misc;

    /**
     * Gets the Global Background Color of Components.
     * 
     * @returns {string}
     */
    Misc.prototype.getComponentActiveBackgroundColor = function () {
        return this.modifiers.componentActiveBg.value;
    };
    
    /**
     * Sets the Global Background Color of Components, such as Panel body, List Groups.
     * 
     * @param {string} backgroundColor The Global Background Color of Components to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setComponentActiveBackgroundColor = function (backgroundColor) {
        this.modifiers.componentActiveBg.value = backgroundColor;
    };

    /**
     * Gets the Global Color of Components.
     * 
     * @returns {string}
     */
    Misc.prototype.getComponentActiveColor = function () {
        return this.modifiers.componentActiveColor.value;
    };

    /**
     * Sets the Global Color of Components, such as Panel body, List Groups.
     * 
     * @param {string} backgroundColor The Global Color of Components to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setComponentActiveColor = function (color) {
        this.modifiers.componentActiveColor.value = color;
    };

    /**
     * Gets the Background Color of the Well Components.
     * 
     * @returns {string}
     */
    Misc.prototype.getWellBackgroundColor = function () {
        return this.modifiers.wellBg.value;
    };

    /**
     * Sets the Background Color of the Well Component.
     * 
     * @param {string} wellBackgroundColor The Well Background Color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setWellBackgroundColor = function (wellBackgroundColor) {
        this.modifiers.wellBg.value = wellBackgroundColor;
    };

    /**
     * Gets the Border Color of the Well Components.
     * 
     * @returns {string}
     */
    Misc.prototype.getWellBorderColor = function () {
        return this.modifiers.wellBorder.value;
    };

    /**
     * Sets the Border Color of the Well Component.
     * 
     * @param {string} wellBorder The Well Border Color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setWellBorderColor = function (wellBorder) {
        this.modifiers.wellBorder.value = wellBorder;
    };

    /**
     * Gets the Body Background Color.
     * 
     * @returns {string}
     */
    Misc.prototype.getBodyBackgroundColor = function () {
        return this.modifiers.bodyBg.value;
    };

    /**
     * Sets the Body Background Color.
     * 
     * @param {string} bodyBackgroundColor The Body Background Color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setBodyBackgroundColor = function (bodyBackgroundColor) {
        this.modifiers.bodyBg.value = bodyBackgroundColor;
    };

    /**
     * Gets the Body Text color.
     * 
     * @returns {String}
     */
    Misc.prototype.getTextColor = function () {
        return this.modifiers.textColor.value;
    };

    /**
     * Sets the Body Text color.
     * 
     * @param {string} bodyTextColor The Body Text Color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setTextColor = function (bodyTextColor) {
        this.modifiers.textColor.value = bodyTextColor;
    };

    /**
     * Gets the Page Header Border Color.
     * 
     * @returns {string}
     */
    Misc.prototype.getPageHeaderColor = function () {
        return this.modifiers.pageHeaderBorderColor.value;
    };

    /**
     * Sets the Page Header Border Color.
     * 
     * @param {string} pageHeaderBorderColor The Page Header Border Color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setPageHeaderBorderColor = function (pageHeaderBorderColor) {
        this.modifiers.pageHeaderBorderColor.value = pageHeaderBorderColor;
    };

    /**
     * Gets the Link Color.
     * 
     * @returns {String}
     */
    Misc.prototype.getLinkColor = function () {
        return this.modifiers.linkColor.value;
    };

    /**
     * Sets the Link Color.
     * 
     * @param {string} linkColor The Link Color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setLinkColor = function (linkColor) {
        this.modifiers.linkColor.value = linkColor;
    };

    /**
     * Gets the Link Hover Color.
     * 
     * @returns {String}
     */
    Misc.prototype.getLinkHoverColor = function () {
        return this.modifiers.linkHoverColor.value;
    };

    /**
     * Sets the Link Hover Color.
     * 
     * @param {string} linkHoverColor The Link Hover Color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setLinkHoverColor = function (linkHoverColor) {
        this.modifiers.linkHoverColor.value = linkHoverColor;
    };

    /**
     * Gets the Link Hover Decoration.
     * 
     * @returns {String}
     */
    Misc.prototype.getLinkHoverDecoration = function () {
        return this.modifiers.linkHoverDecoration.value;
    };

    /**
     * Sets the Link Hover Decoration.
     * 
     * @param {string} linkHoverDecoration The Link Hover Decoration to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setLinkHoverDecoration = function (linkHoverDecoration) {
        this.modifiers.linkHoverDecoration.value = linkHoverDecoration;
    };

    /**
     * Gets the Horizontal Rule Color.
     * 
     * @returns {String}
     */
    Misc.prototype.getHrBorder = function () {
        return this.modifiers.hrBorder.value;
    };
    
    /**
     * Sets the Horizontal Rule Color.
     * 
     * @param {string} hrBorder The Horizontal Rule Color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setHrBorder = function (hrBorder) {
        this.modifiers.hrBorder.value = hrBorder;
    };

    /**
     * Gets the Border Radius Base.
     * 
     * @returns {String}
     */
    Misc.prototype.getBorderRadiusBase = function () {
        return this.modifiers.borderRadiusBase.value;
    };
    
    /**
     * Sets the Border Radius Base.
     * 
     * @param {string} borderRadiusBase The Border Radius Base to set.
     * @param {string} unit             The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setBorderRadiusBase = function (borderRadiusBase, unit) {
        if (unit !== undefined) { this.modifiers.borderRadiusBase.unit = unit; }

        this.modifiers.borderRadiusBase.value = borderRadiusBase;
    };

    /**
     * Gets the Icon Font Path.
     * 
     * @returns {String}
     */
    Misc.prototype.getIconFontPath = function () {
        return this.modifiers.iconFontPath.value;
    };
    
    /**
     * Sets the Icon Font Path.
     * 
     * @param {string} hrBorder The Icon Font Path to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setIconFontPath = function (iconFontPath) {
        this.modifiers.iconFontPath.value = iconFontPath;
    };