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

        this.subscriberDataAttribute = 'data-cluckles-panelbase';

        this.panelFooterBg = {
            variable: '@panel-footer-bg',
            subscribeProperty:  'footer-bg',
            changeFn:           this.setPanelFooterBackground.bind(this),
            subscribers:        [],
			_value: null
        };
        this.panelBodyPadding = {
            variable: '@panel-body-padding',
            subscribeProperty:  'body-padding',
            changeFn:           this.setPanelBodyPadding.bind(this),
            subscribers:        [],
			_value: null
        };
        this.panelBorderRadius = {
            variable: '@panel-border-radius',
            subscribeProperty:  'border-radius',
            changeFn:           this.setPanelBorderRadius.bind(this),
            subscribers:        [],
			_value: null
        };

        Object.defineProperty(this.panelBodyPadding, 'value', {
            get: function () { return this._value; },
            set: function (val) {
                this._value = val + 'px';
                editor.queueModifications();

                this.subscribers.forEach(function (subscriber) {
                    subscriber.value = val;
                });
            } 
        });

        Object.defineProperty(this.panelBorderRadius, 'value', {
            get: function () { return this._value; },
            set: function (val) {
                this._value = val + 'px';
                editor.queueModifications();

                this.subscribers.forEach(function (subscriber) {
                    subscriber.value = val;
                });
            } 
        });
        
        this.modifiers = {
            panelFooterBg: this.panelFooterBg,
            panelBodyPadding: this.panelBodyPadding,
            panelBorderRadius: this.panelBorderRadius
        };

        this.setupDataBinding();
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
    };

    window.PanelBase = PanelBase;
})(window);