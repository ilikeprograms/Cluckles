	/**
	 * Allows Alerts/Panels to be styled and affects the @state-{type}-{property} variables.
	 * 
	 * @class FormState
	 * @extends ThemeModifiers
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} headingBg @state-{type}-bg variable which sets the Heading Background color of alerts/panel headers.
	 * @property {object} text @state-{type}-text variable which sets the Text color of alerts/panel headers.
	 * @property {object} border @state-{type}-border variable which sets the Border color of alerts/panel headers.
	 * 
	 * @returns {FormState}
	 */
	var FormState = function (editor, type) {
		ThemeModifier.call(this, editor); // Call parent constructor
		
        this.subscriberDataAttribute = 'data-cluckles-formstate-' + type;
        
        // Configure the Modifiers
		this.headingBg = {
			variable: '@state-' + type + '-bg',
			subscribeProperty: 'heading-bg',
            changeFn: this.setHeadingBackground.bind(this),
            subscribers: [],
			_value: null
		};
		this.text = {
			variable: '@state-' + type + '-text',
			subscribeProperty: 'text',
            changeFn: this.setText.bind(this),
            subscribers: [],
			_value: null
		};
		this.border = {
			variable: '@state-' + type + '-border',
			subscribeProperty: 'border-color',
            changeFn: this.setBorder.bind(this),
            subscribers: [],
			_value: null
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
	FormState.prototype = Object.create(ThemeModifier.prototype);
	FormState.constructor = FormState;

	/**
	 * Get Heading Background color.
	 * 
	 * @returns {string}
	 */
	FormState.prototype.getHeadingBackground = function () {
		return this.modifiers.headingBg.value;
	};

	/**
	 * Sets the Heading Background color of Alerts/Panel headers.
	 * 
	 * @param {string} color Sets the Background color
	 * 
	 * @returns {undefined}
	 */
	FormState.prototype.setHeadingBackground = function (color) {
		this.modifiers.headingBg.value = color;
	};

	/**
	 * Gets the Text color.
	 * 
	 * @returns {string}
	 */
	FormState.prototype.getText = function () {
		return this.modifiers.text.value;
	};

	/**
	 * Sets the Text color of Alerts/Panel headers.
	 * 
	 * @param {string} text Sets the Text color.
	 * 
	 * @returns {undefined}
	 */
	FormState.prototype.setText = function (text) {
		this.modifiers.text.value = text;
	};

	/**
	 * Gets the Border color.
	 * 
	 * @returns {string}
	 */
	FormState.prototype.getBorder = function () {
		return this.modifiers.border.value;
	};

	/**
	 * Sets the Border color of Alerts/Panel headers.
	 * 
	 * @param {string} border Sets the Border color.
	 * 
	 * @returns {undefined}
	 */
	FormState.prototype.setBorder = function (border) {
		this.modifiers.border.value = border;
	};