    /**
	 * Allows modification of the Modal component in Bootstrap.
	 * 
	 * @class Modal
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} innerPadding                  The @modal-inner-padding variable which controls the Inner Padding of the Modal Component.
	 * @property {object} titlePadding                  The @modal-title-padding variable which controls the Title Padding of the Modal Component.
	 * @property {object} titleLineHeight               The @modal-title-line-height variable which controls the Title Line Height of the Modal Component.
	 * @property {object} contentBg                     The @modal-content-bg variable which controls the Content Background Color of the Modal Component.
	 * @property {object} contentBorderColor            The @modal-content-border-color variable which controls the Content Border Color of the Modal Component.
	 * @property {object} contentFallbackBorderColor    The @modal-content-fallback-border-color variable which controls the Content Fallback Border Color of the Modal Component.
     * @property {object} backdropBg                    The @modal-backdrop-bg variable which controls the Backdrop Background Color of the Modal Component.
     * @property {object} backdropOpacity               The @modal-backdrop-opacity variable which controls the Backdrop Opacity of the Modal Component.
     * @property {object} headerBorderColor             The @modal-header-border-color variable which controls the Header Border Color of the Modal Component.
     * @property {object} footerBorderColor             The @modal-footer-border-color variable which controls the Footer Border Color of the Modal Component.
     * 
     * @returns {Modal}
     */
    var Modal = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-modal';

        this.innerPadding = {
            variable:           '@modal-inner-padding',
            subscribeProperty:  'inner-padding',
            suffixUnit:         true,
            changeFn:           this.setInnerPadding.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.titlePadding = {
            variable:           '@modal-title-padding',
            subscribeProperty: 'title-padding',
            suffixUnit:         true,
            changeFn:           this.setTitlePadding.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.titleLineHeight = {
            variable:           '@modal-title-line-height',
            subscribeProperty:  'title-line-height',
            changeFn:           this.setTitleLineHeight.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.contentBg = {
            variable:           '@modal-content-bg',
            subscribeProperty:  'content-bg',
            changeFn:           this.setContentBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.contentBorderColor = {
            variable:           '@modal-content-border-color',
            subscribeProperty:  'content-border-color',
            changeFn:           this.setContentBorderColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.contentFallbackBorderColor = {
            variable:           '@modal-content-fallback-border-color',
            subscribeProperty:  'content-fallback-border-color',
            changeFn:           this.setContentFallbackBorderColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.backdropBg = {
            variable:           '@modal-backdrop-bg',
            subscribeProperty:  'backdrop-bg',
            changeFn:           this.setBackdropBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.backdropOpacity = {
            variable:           '@modal-backdrop-opacity',
            subscribeProperty:  'backdrop-opacity',
            changeFn:           this.setBackdropOpacity.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.headerBorderColor = {
            variable:           '@modal-header-border-color',
            subscribeProperty:  'header-border-color',
            changeFn:           this.setHeaderBorderColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.footerBorderColor = {
            variable:           '@modal-footer-border-color',
            subscribeProperty:  'footer-border-color',
            changeFn:           this.setFooterBorderColor.bind(this),
            subscribers:        [],
			_value:             null
        };

        this.modifiers = {
            innerPadding:               this.innerPadding,
            titlePadding:               this.titlePadding,
            titleLineHeight:            this.titleLineHeight,
            contentBg:                  this.contentBg,
            contentBorderColor:         this.contentBorderColor,
            contentFallbackBorderColor: this.contentFallbackBorderColor,
            backdropBg:                 this.backdropBg,
            backdropOpacity:            this.backdropOpacity,
            headerBorderColor:          this.headerBorderColor,
            footerBorderColor:          this.footerBorderColor
        };

        this.setupDataBinding();
    };

    // Inherit from parent Prototype and preserve constructor
    Modal.prototype             = Object.create(ThemeModifier.prototype);
    Modal.prototype.constructor = Modal;

    /**
     * Gets the Inner Padding of the Modal Component.
     * 
     * @returns {string}
     */
    Modal.prototype.getInnerPadding = function () {
        return this.modifiers.innerPadding.value;
    };

    /**
     * Sets the Inner Padding of the Modal Component.
     * 
     * @param {string} innerPadding The Modal Inner Padding to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
     * 
     * @returns {string}
     */
    Modal.prototype.setInnerPadding = function (innerPadding, unit) {
        if (unit !== undefined) { this.modifiers.innerPadding.unit = unit; }

        this.modifiers.innerPadding.value = innerPadding;
    };

    /**
     * Gets the Title Padding of the Modal Component.
     * 
     * @returns {string}
     */
    Modal.prototype.getTitlePadding = function () {
        return this.modifiers.titlePadding.value;
    };

    /**
     * Sets the Title Padding of the Modal Component.
     * 
     * @param {string} titlePadding The Modal Title Padding to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
     * 
     * @returns {string}
     */
    Modal.prototype.setTitlePadding = function (titlePadding, unit) {
        if (unit !== undefined) { this.modifiers.titlePadding.unit = unit; }

        this.modifiers.titlePadding.value = titlePadding;
    };

    /**
     * Gets the Title Line Height of the Modal Component.
     * 
     * @returns {string}
     */
    Modal.prototype.getTitleLineHeight = function () {
        return this.modifiers.titleLineHeight.value;
    };

    /**
     * Sets the Title Line Height of the Modal Component.
     * 
     * @param {string} titleLineHeight The Modal Title Line Height to set.
     * 
     * @returns {string}
     */
    Modal.prototype.setTitleLineHeight = function (titleLineHeight) {
        this.modifiers.titleLineHeight.value = titleLineHeight;
    };

    /**
     * Gets the Content Background Color of the Modal Component.
     * 
     * @returns {string}
     */
    Modal.prototype.getContentBackgroundColor = function () {
        return this.modifiers.contentBg.value;
    };

    /**
     * Sets the Content Background Color of the Modal Component.
     * 
     * @param {string} contentBackgroundColor The Modal Content Background Color to set.
     * 
     * @returns {string}
     */
    Modal.prototype.setContentBackgroundColor = function (contentBackgroundColor) {
        this.modifiers.contentBg.value = contentBackgroundColor;
    };

    /**
     * Gets the Content Border Color of the Modal Component.
     * 
     * @returns {string}
     */
    Modal.prototype.getContentBorderColor = function () {
        return this.modifiers.contentBorderColor.value;
    };

    /**
     * Sets the Content Border Color of the Modal Component.
     * 
     * @param {string} contentBorderColor The Modal Content Border Color to set.
     * 
     * @returns {string}
     */
    Modal.prototype.setContentBorderColor = function (contentBorderColor) {
        this.modifiers.contentBorderColor.value = contentBorderColor;
    };

    /**
     * Gets the Content Fallback Border Color of the Modal Component.
     * 
     * @returns {string}
     */
    Modal.prototype.getContentFallbackBorderColor = function () {
        return this.modifiers.contentFallbackBorderColor.value;
    };

    /**
     * Sets the Content Fallback Border Color of the Modal Component.
     * 
     * @param {string} contentFallbackBorderColor The Modal Content Fallback Border Color to set.
     * 
     * @returns {string}
     */
    Modal.prototype.setContentFallbackBorderColor = function (contentFallbackBorderColor) {
        this.modifiers.contentFallbackBorderColor.value = contentFallbackBorderColor;
    };

    /**
     * Gets the Backdrop Background Color of the Modal Component.
     * 
     * @returns {string}
     */
    Modal.prototype.getBackdropBackgroundColor = function () {
        return this.modifiers.backdropBg.value;
    };

    /**
     * Sets the Backdrop Background Color of the Modal Component.
     * 
     * @param {string} backdropBg The Modal Backdrop Background Color to set.
     * 
     * @returns {string}
     */
    Modal.prototype.setBackdropBackgroundColor = function (backdropBg) {
        this.modifiers.backdropBg.value = backdropBg;
    };

    /**
     * Gets the Backdrop Opacity of the Modal Component.
     * 
     * @returns {string}
     */
    Modal.prototype.getBackdropOpacity = function () {
        return this.modifiers.backdropOpacity.value;
    };

    /**
     * Sets the Backdrop Opacity of the Modal Component.
     * 
     * @param {string} backdropOpacity The Modal Backdrop Opacity to set.
     * 
     * @returns {string}
     */
    Modal.prototype.setBackdropOpacity = function (backdropOpacity) {
        this.modifiers.backdropOpacity.value = backdropOpacity;
    };

    /**
     * Gets the Header Border Color of the Modal Component.
     * 
     * @returns {string}
     */
    Modal.prototype.getHeaderBorderColor = function () {
        return this.modifiers.headerBorderColor.value;
    };

    /**
     * Sets the Header Border Color of the Modal Component.
     * 
     * @param {string} headerBorderColor The Modal Header Border Color to set.
     * 
     * @returns {string}
     */
    Modal.prototype.setHeaderBorderColor = function (headerBorderColor) {
        this.modifiers.headerBorderColor.value = headerBorderColor;
    };

    /**
     * Gets the Footer Border Color of the Modal Component.
     * 
     * @returns {string}
     */
    Modal.prototype.getFooterBorderColor = function () {
        return this.modifiers.footerBorderColor.value;
    };

    /**
     * Sets the Footer Border Color of the Modal Component.
     * 
     * @param {string} footerBorderColor The Modal Footer Border Color to set.
     * 
     * @returns {string}
     */
    Modal.prototype.setFooterBorderColor = function (footerBorderColor) {
        this.modifiers.footerBorderColor.value = footerBorderColor;
    };