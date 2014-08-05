(function (window) {
    "use strict";

    /**
     * Allows modification of the General Panel Component Styling.
     * 
     * @class PanelBase
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
     * 
     * @property {string} panelFooterBg The @panel-footer-bg variable which sets the footer background color of Panel Components.
     * @property {string} panelBodyPadding The @panel-body-padding variable which sets the body padding of Panel Components.
     * @property {string} panelBorderRadius The @panel-border-radius variable which sets the border radius of Panel Components.
     * 
     * @returns {PanelBase}
     */
    var PanelBase = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        this.panelFooterBg = {
            variable: '@panel-footer-bg',
            value: null
        };
        this.panelBodyPadding = {
            variable: '@panel-body-padding',
            value: null
        };
        this.panelBorderRadius = {
            variable: '@panel-border-radius',
            value: null
        };
        
        this.modifiers = {
            panelFooterBg: this.panelFooterBg,
            panelBodyPadding: this.panelBodyPadding,
            panelBorderRadius: this.panelBorderRadius
        };
    };
    
    // Inherit from parent Prototype and preserve constructor
    PanelBase.prototype = Object.create(ThemeModifier.prototype);
    PanelBase.constructor = PanelBase;

    /**
     * Gets the Footer Background color of the Panel Components.
     * 
     * @returns {string}
     */
    PanelBase.prototype.getPanelFooterBackground = function () {
        return this.modifiers.panelFooterBg.value;
    };

    /**
     * Sets the Footer Background color of the Panel Components.
     * 
     * @param {string} panelFooterBg The Panel Footer Background color to set.
     * 
     * @returns {undefined}
     */
    PanelBase.prototype.setPanelFooterBackground = function (panelFooterBg) {
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
     * 
     * @returns {undefined}
     */
    PanelBase.prototype.setPanelBodyPadding = function (panelBodyPadding) {
        this.modifiers.panelBodyPadding.value = panelBodyPadding;
        this.editor.queueModifications();
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
     * 
     * @returns {undefined}
     */
    PanelBase.prototype.setPanelBorderRadius = function (panelBorderRadius) {
        this.modifiers.panelBorderRadius.value = panelBorderRadius;
        this.editor.queueModifications();
    };

    window.PanelBase = PanelBase;
})(window);