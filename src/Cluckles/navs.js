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

        this.subscriberDataAttribute = 'data-cluckles-nav';

        // Configure the Modifiers
        this.linkPadding = {
            variable: '@nav-link-padding',
            subscribeProperty:  'link-padding',
            changeFn:           this.setLinkPadding.bind(this),
            subscribers:        [],
			_value: null
        };
        this.linkHoverBg = {
            variable: '@nav-link-hover-bg',
            subscribeProperty:  'link-hover-bg',
            changeFn:           this.setLinkHoverBackground.bind(this),
            subscribers:        [],
			_value: null
        };
        this.linkDisabledColor = {
            variable: '@nav-disabled-link-color',
            subscribeProperty:  'link-disabled-color',
            changeFn:           this.setLinkDisabledColor.bind(this),
            subscribers:        [],
			_value: null
        };
        this.linkDisabledHoverColor = {
            variable: '@nav-disabled-link-hover-color',
            subscribeProperty:  'link-disabled-hover-color',
            changeFn:           this.setLinkDisabledHoverColor.bind(this),
            subscribers:        [],
			_value: null
        };
        this.linkOpenHoverColor = {
            variable: '@nav-open-link-hover-color',
            subscribeProperty:  'link-open-hover-color',
            changeFn:           this.setLinkOpenHoverColor.bind(this),
            subscribers:        [],
			_value: null
        };

        Object.defineProperty(this.linkPadding, 'value', {
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
            linkPadding:            this.linkPadding,
            linkHoverBg:            this.linkHoverBg,
            linkDisabledColor:      this.linkDisabledColor,
            linkDisabledHoverColor: this.linkDisabledHoverColor,
            linkOpenHoverColor:     this.linkOpenHoverColor
        };

        this.setupDataBinding();
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
        this.modifiers.linkPadding.value = padding;
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
    };

    window.Navs = Navs;
})(window);