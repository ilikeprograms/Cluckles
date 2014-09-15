    /**
     * Allows modification of the General Panel Component Styling.
     * 
     * @class PanelBase
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
     * 
     * @property {string} panelFooterBg     The @panel-footer-bg variable which sets the Footer Background Color of Panel Components.
     * @property {string} panelBodyPadding  The @panel-body-padding variable which sets the Body Padding of Panel Components.
     * @property {string} panelBorderRadius The @panel-border-radius variable which sets the Border Radius of Panel Components.
     * 
     * @returns {PanelBase}
     */
    var PanelBase = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-panelbase';

        this.panelFooterBg = {
            variable:           '@panel-footer-bg',
            subscribeProperty:  'footer-bg',
            changeFn:           this.setPanelFooterBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.panelBodyPadding = {
            variable:           '@panel-body-padding',
            subscribeProperty:  'body-padding',
            suffixUnit:         true,
            changeFn:           this.setPanelBodyPadding.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.panelBorderRadius = {
            variable:           '@panel-border-radius',
            subscribeProperty:  'border-radius',
            suffixUnit:         true,
            changeFn:           this.setPanelBorderRadius.bind(this),
            subscribers:        [],
			_value:             null
        };
        
        this.modifiers = {
            panelFooterBg:      this.panelFooterBg,
            panelBodyPadding:   this.panelBodyPadding,
            panelBorderRadius:  this.panelBorderRadius
        };

        this.setupDataBinding();
    };
    
    // Inherit from parent Prototype and preserve constructor
    PanelBase.prototype             = Object.create(ThemeModifier.prototype);
    PanelBase.prototype.constructor = PanelBase;

    /**
     * Gets the Footer Background Color of the Panel Components.
     * 
     * @returns {string}
     */
    PanelBase.prototype.getPanelFooterBackgroundColor = function () {
        return this.modifiers.panelFooterBg.value;
    };

    /**
     * Sets the Footer Background Color of the Panel Components.
     * 
     * @param {string} panelFooterBg The Panel Footer Background Color to set.
     * 
     * @returns {undefined}
     */
    PanelBase.prototype.setPanelFooterBackgroundColor = function (panelFooterBg) {
        this.modifiers.panelFooterBg.value = panelFooterBg;
        this.editor.queueModifications();
    };
    
    /**
     * Gets the Body Padding of the Panel Components.
     * 
     * @returns {string}
     */
    PanelBase.prototype.getPanelBodyPadding = function () {
        return this.modifiers.panelBodyPadding.value;
    };

    /**
     * Gets the Body Padding of the Panel Components.
     * 
     * @param {string} panelBodyPadding The Panel Body Padding to set.
     * @param {string} unit             The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    PanelBase.prototype.setPanelBodyPadding = function (panelBodyPadding, unit) {
        if (unit !== undefined) { this.modifiers.panelBodyPadding.unit = unit; }

        this.modifiers.panelBodyPadding.value = panelBodyPadding;
    };
    
    /**
     * Gets the Border Radius of the Panel Components.
     * 
     * @returns {string}
     */
    PanelBase.prototype.getPanelBorderRadius = function () {
        return this.modifiers.panelBorderRadius.value;
    };

    /**
     * Gets the Border Radius of the Panel Components.
     * 
     * @param {string} panelBorderRadius The Panel Border Radius to set.
     * @param {string} unit              The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    PanelBase.prototype.setPanelBorderRadius = function (panelBorderRadius, unit) {
        if (unit !== undefined) { this.modifiers.panelBorderRadius.unit = unit; }

        this.modifiers.panelBorderRadius.value = panelBorderRadius;
    };