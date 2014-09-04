    /**
     * Allows modifications of the Miscellaneous parts of Bootstrap.
     * 
     * @class Misc
     * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
     * 
     * @property {string} componentBaseBg The @state-base-bg variable which sets the background color of bootstrap components.
     * @property {string} wellBg The @well-base-bg variable which sets the background color of the Well Component.
     * @property {string} bodyBg The @body-bg variable which sets the body background color.
     * @property {string} textColor The @text-color variable which sets the body text color.
     * @property {string} pageHeaderBorderColor The @page-header-border-color variable which sets the Page Header Border Color.
     * @property {string} linkColor The @link-color variable which sets the link color.
     * @property {string} linkHoverColor The @link-hover-color variable which sets the link hover color.
     * @property {string} hrBorder The @hr-border variable which sets the color of the <hr> tag.
     * @property {string} borderRadiusBase The @border-radius-base variable which sets the base border radius.
     * 
     * @returns {Misc}
     */
    var Misc = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-misc';

        // Define the Modifiers
        this.componentBaseBg = {
            variable: '@state-base-bg',
            subscribeProperty: 'component-base-bg',
            changeFn: this.setComponentBaseBackground.bind(this),
            subscribers: [],
			_value: null
        };
        this.wellBg = {
            variable: '@well-base-bg',
            subscribeProperty: 'well-base-bg',
            changeFn: this.setWellBackground.bind(this),
            subscribers: [],
			_value: null
        };
        this.bodyBg = {
            variable: '@body-bg',
            subscribeProperty: 'body-bg',
            changeFn: this.setBodyBackground.bind(this),
            subscribers: [],
			_value: null
        };
        this.textColor = {
            variable: '@text-color',
            subscribeProperty: 'text-color',
            changeFn: this.setTextColor.bind(this),
            subscribers: [],
			_value: null
        };
        this.pageHeaderBorderColor = {
            variable: '@page-header-border-color',
            subscribeProperty: 'page-header-border-color',
            changeFn: this.setPageHeaderBorderColor.bind(this),
            subscribers: [],
			_value: null
        };
        this.linkColor = {
            variable: '@link-color',
            subscribeProperty: 'link-color',
            changeFn: this.setLinkColor.bind(this),
            subscribers: [],
			_value: null
        };
        this.linkHoverColor = {
            variable: '@link-hover-color',
            subscribeProperty: 'link-hover-color',
            changeFn: this.setLinkHoverColor.bind(this),
            subscribers: [],
			_value: null
        };
        this.hrBorder = {
            variable: '@hr-border',
            subscribeProperty: 'hr-rule-color',
            changeFn: this.setHrBorder.bind(this),
            subscribers: [],
			_value: null
        };
        this.borderRadiusBase = {
            variable: '@border-radius-base',
            subscribeProperty: 'border-radius-base',
            changeFn: this.setBorderRadiusBase.bind(this),
            subscribers: [],
			_value: null
        };

        Object.defineProperty(this.borderRadiusBase, 'value', {
            get: function () { return this._value; },
            set: function (val) {
                this._value = val + 'px';
                editor.queueModifications();

                this.subscribers.forEach(function (subscriber) {
                    subscriber.value = val;
                });
            }
        });

        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            componentBaseBg:        this.componentBaseBg,
            wellBg:                 this.wellBg,
            bodyBg:                 this.bodyBg,
            textColor:              this.textColor,
            pageHeaderBorderColor:  this.pageHeaderBorderColor,
            linkColor:              this.linkColor,
            linkHoverColor:         this.linkHoverColor,
            hrBorder:               this.hrBorder,
            borderRadiusBase:       this.borderRadiusBase
        };

        this.setupDataBinding();
    };

    // Inherit from parent Prototype and preserve constructor
    Misc.prototype = Object.create(ThemeModifier.prototype);
    Misc.constructor = Misc;

    /**
     * Gets the background color of Components.
     * 
     * @returns {string}
     */
    Misc.prototype.getComponentBaseBackground = function () {
        return this.modifiers.componentBaseBg.value;
    };
    
    /**
     * Sets the background color of Components, such as Panel body, List Groups.
     * 
     * @param {string} bg The background color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setComponentBaseBackground = function (bg) {
        this.modifiers.componentBaseBg.value = bg;
    };

    /**
     * Gets the Background color of the Well Components.
     * 
     * @returns {string}
     */
    Misc.prototype.getWellBackground = function () {
        return this.modifiers.wellBg.value;
    };

    /**
     * Sets the Background color of the Well Component.
     * 
     * @param {string} bg The Background color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setWellBackground = function (bg) {
        this.modifiers.wellBg.value = bg;
    };

    /**
     * Gets the Body Background color.
     * 
     * @returns {string}
     */
    Misc.prototype.getBodyBackground = function () {
        return this.modifiers.bodyBg.value;
    };

    /**
     * Sets the Body Background color.
     * 
     * @param {string} bg The body background color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setBodyBackground = function (bg) {
        this.modifiers.bodyBg.value = bg;
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
     * @param {string} color The body text color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setTextColor = function (color) {
        this.modifiers.textColor.value = color;
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
     * @param {string} pageHeaderBorderColor Sets the Page Header Border Color.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setPageHeaderBorderColor = function (pageHeaderBorderColor) {
        this.modifiers.pageHeaderBorderColor.value = pageHeaderBorderColor;
    };

    /**
     * Gets the Link color.
     * 
     * @returns {String}
     */
    Misc.prototype.getLinkColor = function () {
        return this.modifiers.linkColor.value;
    };

    /**
     * Sets the Link color.
     * 
     * @param {string} linkColor The Link color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setLinkColor = function (linkColor) {
        this.modifiers.linkColor.value = linkColor;
    };

    /**
     * Gets the Link Hover color.
     * 
     * @returns {String}
     */
    Misc.prototype.getLinkHoverColor = function () {
        return this.modifiers.linkHoverColor.value;
    };

    /**
     * Sets the Link Hover color.
     * 
     * @param {string} linkHoverColor The Link Hover color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setLinkHoverColor = function (linkHoverColor) {
        this.modifiers.linkHoverColor.value = linkHoverColor;
    };

    /**
     * Gets the Horizontal Rule color.
     * 
     * @returns {String}
     */
    Misc.prototype.getHrBorder = function () {
        return this.modifiers.hrBorder.value;
    };
    
    /**
     * Sets the Horizontal Rule color.
     * 
     * @param {string} hrBorder The Horizontal Rule color to set.
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
     * Sets the Border Radius Base/
     * 
     * @param {string} borderRadiusBase The Border Radius Base to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setBorderRadiusBase = function (borderRadiusBase) {
        this.modifiers.borderRadiusBase.value = borderRadiusBase;
    };