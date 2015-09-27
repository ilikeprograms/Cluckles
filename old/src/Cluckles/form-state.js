	/**
	 * Allows Alerts/Panels to be styled and affects the @state-{type}-{property} variables.
	 * 
	 * @class FormState
	 * @extends ThemeModifiers
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} headingBg The @state-{type}-bg variable which sets the Heading Background color of alerts/panel headers.
	 * @property {object} text      The @state-{type}-text variable which sets the Text color of alerts/panel headers.
	 * @property {object} border    The @state-{type}-border variable which sets the Border color of alerts/panel headers.
	 * 
	 * @returns {FormState}
	 */
	var FormState = function (editor, type) {
		ThemeModifier.call(this, editor); // Call parent constructor
		
        this.subscriberDataAttribute = 'data-cluckles-formstate-' + type;
        
        // Configure the Modifiers
		this.headingBg = {
			variable:           '@state-' + type + '-bg',
			subscribeProperty:  'heading-bg',
            changeFn:           this.setHeadingBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.text = {
			variable:           '@state-' + type + '-text',
			subscribeProperty:  'text',
            changeFn:           this.setTextColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.border = {
			variable:           '@state-' + type + '-border',
			subscribeProperty:  'border-color',
            changeFn:           this.setBorderColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            headingBg:  this.headingBg,
            text:       this.text,
            border:     this.border
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	FormState.prototype             = Object.create(ThemeModifier.prototype);
	FormState.prototype.constructor = FormState;

	/**
	 * Get Heading Background color.
	 * 
	 * @returns {string}
	 */
	FormState.prototype.getHeadingBackgroundColor = function () {
		return this.modifiers.headingBg.value;
	};

	/**
	 * Sets the Heading Background Color of Alerts/Panel headers.
	 * 
	 * @param {string} headingBackgroundColor The Alerts/Panel Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	FormState.prototype.setHeadingBackgroundColor = function (headingBackgroundColor) {
		this.modifiers.headingBg.value = headingBackgroundColor;
	};

	/**
	 * Gets the Text Color of Alerts/Panel headers.
	 * 
	 * @returns {string}
	 */
	FormState.prototype.getTextColor = function () {
		return this.modifiers.text.value;
	};

	/**
	 * Sets the Text Color of Alerts/Panel headers.
	 * 
	 * @param {string} textColor The Alerts/Panel Text Color to set.
	 * 
	 * @returns {undefined}
	 */
	FormState.prototype.setTextColor = function (textColor) {
		this.modifiers.text.value = textColor;
	};

	/**
	 * Gets the Border color of Alerts/Panel headers.
	 * 
	 * @returns {string}
	 */
	FormState.prototype.getBorderColor = function () {
		return this.modifiers.border.value;
	};

	/**
	 * Sets the Border Color of Alerts/Panel headers.
	 * 
	 * @param {string} borderColor The Alerts/Panel Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	FormState.prototype.setBorderColor = function (borderColor) {
		this.modifiers.border.value = borderColor;
	};