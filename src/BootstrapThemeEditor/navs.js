(function (window) {
    "use strict";

    /**
     * Allows modifications of the Navs Components in Bootstrap.
     * 
	 * @class Navs
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
     * 
     * @property {object} linkPadding The @nav-link-padding variable which controls the Link Padd of the Nav component.
     * @property {object} linkHoverBg The @nav-link-hover-bg variable which controls the Link Hover Color of the Navs component.
     * @property {object} linkDisabledColor The @nav-disabled-link-color variable which controls the Disabled Link Color of the Navs component.
     * @property {object} linkDisabledHoverColor The @nav-disabled-link-hover-color variable which controls the Disabled Link Hover Color of the Navs component.
     * @property {object} linkOpenHoverColor The @nav-open-link-hover-color variable which controls the Open Link Hover Color of the Navs component.
     * 
     * @returns {Navs}
     */
    var Navs = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        // Configure the Modifiers
        this.linkPadding = {
            variable: '@nav-link-padding',
            value: null
        };
        this.linkHoverBg = {
            variable: '@nav-link-hover-bg',
            value: null
        };
        this.linkDisabledColor = {
            variable: '@nav-disabled-link-color',
            value: null
        };
        this.linkDisabledHoverColor = {
            variable: '@nav-disabled-link-hover-color',
            value: null
        };
        this.linkOpenHoverColor = {
            variable: '@nav-open-link-hover-color',
            value: null
        };
        
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            linkPadding:            this.linkPadding,
            linkHoverBg:            this.linkHoverBg,
            linkDisabledColor:      this.linkDisabledColor,
            linkDisabledHoverColor: this.linkDisabledHoverColor,
            linkOpenHoverColor:     this.linkOpenHoverColor
        };
    };

    // Inherit from parent Prototype and preserve constructor
    Navs.prototype = Object.create(ThemeModifier.prototype);
    Navs.constructor = Navs;

    /**
     * Gets the Link Padding of the Navs Components.
     * 
     * @returns {String}
     */
    Navs.prototype.getLinkPadding = function () {
        return this.modifiers.linkPadding.value;
    };
    
    /**
     * Sets the Link Padding of the Navs Components.
     * 
     * @param {string} padding The Navs Link Padding to set.
     * 
     * @returns {undefined}
     */
    Navs.prototype.setLinkPadding = function (padding) {
        this.modifiers.linkPadding.value = padding + 'px';
        this.editor.queueModifications();
    };

	/**
	 * Gets the the Link Hover Background of the Navs Components.
	 * 
	 * @returns {string}
	 */
	Navs.prototype.getLinkHoverBackground = function () {
		return this.modifiers.linkHoverBg.value;
	};
	
	/**
	 * Sets the Link Hover Background of the Navs Components.
	 * 
	 * @param {string} color The Navs Link Hover Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navs.prototype.setLinkHoverBackground = function (linkHoverBg) {
		this.modifiers.linkHoverBg.value = linkHoverBg;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Link Disabled Color of the Navs Components.
	 * 
	 * @returns {string}
	 */
	Navs.prototype.getLinkDisabledColor = function () {
		return this.modifiers.linkDisabledColor.value;
	};
	
	/**
	 * Sets the Link Disabled Color of the Navs Components.
	 * 
	 * @param {string} color Set the Navs Link Disabled Color.
	 * 
	 * @returns {undefined}
	 */
	Navs.prototype.setLinkDisabledColor = function (linkDisabledColor) {
		this.modifiers.linkDisabledColor.value = linkDisabledColor;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Link Disabled Hover Color of the Navs Components.
	 * 
	 * @returns {string}
	 */
	Navs.prototype.getLinkDisabledHoverColor = function () {
		return this.modifiers.linkDisabledHoverColor.value;
	};
	
	/**
	 * Sets the Link Disabled Hover Color of the Navs Components.
	 * 
	 * @param {string} color Sets the Navs Link Disabled Hover Color.
	 * 
	 * @returns {undefined}
	 */
	Navs.prototype.setLinkDisabledHoverColor = function (linkDisabledHoverColor) {
		this.modifiers.linkDisabledHoverColor.value = linkDisabledHoverColor;
		this.editor.queueModifications();
	};

    /**
     * Gets the Link Open Hover Color of the Navs Components.
     * 
     * @returns {string}
     */
    Navs.prototype.getLinkOpenHoverColor = function () {
        return this.modifiers.linkOpenHoverColor.value;
    };

    /**
     * Sets the Link Open Hover Color of the Navs Components.
     * 
     * @param {string} linkOpenHoverColor Sets the Navs Link Open Hover Color.
     * @returns {string}
     */
    Navs.prototype.setLinkOpenHoverColor = function (linkOpenHoverColor) {
        this.modifiers.linkOpenHoverColor.value = linkOpenHoverColor;
        this.editor.queueModifications();
    };

    window.Navs = Navs;
})(window);