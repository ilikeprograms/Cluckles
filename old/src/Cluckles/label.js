    /**
     * Allows modification of the General Label Component Styling.
     * 
     * @class Label
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
     * 
     * @property {string} color             The @label-color variable which sets the Color of Label Components.
     * @property {string} linkHoverColor    The @label-link-hover-color variable which sets the Link Hover Color of Label Components.
     * @property {string} defaultBg         The @label-default-bg variable which affects the Default Label Background Color.
	 * @property {string} primaryBg         The @label-primary-bg variable which affects the Primary Label Background Color.
	 * @property {string} successBg         The @label-success-bg variable which affects the Success Label Background Color.
	 * @property {string} infoBg            The @label-info-bg variable which affects the Info Label Background Color.
	 * @property {string} warningBg         The @label-warning-bg variable which affects the Warning Label Background Color.
	 * @property {string} dangerBg          The @label-danger-bg variable which affects the Danger Label Background Color.
     * 
     * @returns {Label}
     */
    var Label = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-label';

        // Configure the Modifiers
        this.color = {
            variable:           '@label-color',
            subscribeProperty:  'color',
            changeFn:           this.setColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.linkHoverColor = {
            variable:           '@label-link-hover-color',
            subscribeProperty:  'link-hover-color',
            changeFn:           this.setLinkHoverColor.bind(this),
            subscribers:        [],
			_value:             null
        };
		this.defaultBg = {
			variable:           '@label-default-bg',
			subscribeProperty:  'default-bg',
            changeFn:           this.setDefaultBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.primaryBg = {
			variable:           '@label-primary-bg',
			subscribeProperty:  'primary-bg',
            changeFn:           this.setPrimaryBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.successBg = {
			variable:           '@label-success-bg',
			subscribeProperty:  'success-bg',
            changeFn:           this.setSuccessBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.infoBg = {
			variable:           '@label-info-bg',
			subscribeProperty:  'info-bg',
            changeFn:           this.setInfoBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.warningBg = {
			variable:           '@label-warning-bg',
			subscribeProperty:  'warning-bg',
            changeFn:           this.setWarningBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.dangerBg = {
			variable:           '@label-danger-bg',
			subscribeProperty:  'danger-bg',
            changeFn:           this.setDangerBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};

        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            color:          this.color,
            linkHoverColor: this.linkHoverColor,
            defaultBg:      this.defaultBg,
            primaryBg:      this.primaryBg,
            successBg:      this.successBg,
            infoBg:         this.infoBg,
            warningBg:      this.warningBg,
            dangerBg:       this.dangerBg
        };

        this.setupDataBinding();
    };

    // Inherit from parent Prototype and preserve constructor
    Label.prototype             = Object.create(ThemeModifier.prototype);
    Label.prototype.constructor = Label;

    /**
     * Gets the Color of the Label Component.
     * 
     * @returns {string}
     */
    Label.prototype.getColor = function () {
        return this.modifiers.color.value;
    };

    /**
     * Sets the Color of the Label Component.
     * 
     * @param {string} color The Label Color to set.
     * 
     * @returns {string}
     */
    Label.prototype.setColor = function (color) {
        this.modifiers.color.value = color;
    };

    /**
     * Gets the Link Hover Color of the Label Components.
     * 
     * @returns {string}
     */
    Label.prototype.getLinkHoverColor = function () {
        return this.modifiers.linkHoverColor.value;
    };

    /**
     * Gets the Link Hover Color of the Label Components.
     * 
     * @param {string} linkHoverColor The Label Link Hover Color to set.
     * 
     * @returns {undefined}
     */
    Label.prototype.setLinkHoverColor = function (linkHoverColor) {
        this.modifiers.linkHoverColor.value = linkHoverColor;
    };

    /**
	 * Gets the Default Label Background Color.
	 * 
	 * @returns {undefined}
	 */
	Label.prototype.getDefaultBackgroundColor = function () {
		return this.modifiers.defaultBg.value;
	};

	/**
	 * Sets the Default Label Background Color.
	 * 
	 * @param {string} defaultBackgroundColor The Label Default Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Label.prototype.setDefaultBackgroundColor = function (defaultBackgroundColor) {
		this.modifiers.defaultBg.value = defaultBackgroundColor;
	};

	/**
	 * Gets the Primary Label Background Color.
	 * 
	 * @returns {string}
	 */
	Label.prototype.getPrimaryBackgroundColor = function () {
		return this.modifiers.primaryBg.value;
	};

	/**
	 * Sets the Primary Label Background Color.
	 * 
	 * @param {string} primaryBackgroundColor The Label Primary Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Label.prototype.setPrimaryBackgroundColor = function (primaryBackgroundColor) {
		this.modifiers.primaryBg.value = primaryBackgroundColor;
	};

	/**
	 * Gets the Success Label Background Color.
	 * 
	 * @returns {string}
	 */
	Label.prototype.getSuccessBackgroundColor = function () {
		return this.modifiers.successBg.value;
	};

	/**
	 * Sets the Success Label Background Color.
	 * 
	 * @param {string} successBackgroundColor The Label Success Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Label.prototype.setSuccessBackgroundColor = function (successBackgroundColor) {
		this.modifiers.successBg.value = successBackgroundColor;
	};

	/**
	 * Gets the Info Label Background Color.
	 * 
	 * @returns {string}
	 */
	Label.prototype.getInfoBackgroundColor = function () {
		return this.modifiers.infoBg.value;
	};

	/**
	 * Sets the Info Label Background Color.
	 * 
	 * @param {string} infoBackgroundColor The Label Info Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Label.prototype.setInfoBackgroundColor = function (infoBackgroundColor) {
		this.modifiers.infoBg.value = infoBackgroundColor;
	};

	/**
	 * Gets the Warning Label Background Color.
	 * 
	 * @returns {string}
	 */
	Label.prototype.getWarningBackgroundColor = function () {
		return this.modifiers.warningBg.value;
	};

	/**
	 * Sets the Warning Label Background Color.
	 * 
	 * @param {type} warningBackgroundColor The Label Warning Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Label.prototype.setWarningBackgroundColor = function (warningBackgroundColor) {
		this.modifiers.warningBg.value = warningBackgroundColor;
	};

	/**
	 * Gets the Danger Label Background Color.
	 * 
	 * @returns {string}
	 */
	Label.prototype.getDangerBackgroundColor = function () {
		return this.modifiers.dangerBg.value;
	};

	/**
	 * Sets the Danger Label Background Color.
	 * 
	 * @param {string} dangerBackgroundColor The Label Danger Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Label.prototype.setDangerBackgroundColor = function (dangerBackgroundColor) {
		this.modifiers.dangerBg.value = dangerBackgroundColor;
	};