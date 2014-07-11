/**
 * BootstrapThemeEditor 0.3.3: Bootstrap Theme Editor allows live modification of Bootstrap themes so that you can customise them easily.
 * Copyrite 2014 Thomas Coleman <tom@ilikeprograms.com>
 * Licence: GPL-3.0+
 */
(function (window) {
	var ThemeModifier = function (editor) {
		Object.defineProperties(this, {
			'editor': {
				enumerable: false,
				value: editor
			},
			'modifiers': {
				enumerable: false,
                writable: true,
				value: {}
			}
		});
	};
	
	/**
	 * Finds the modifications to the Component styling.
	 * 
	 * @returns {object}
	 */
	ThemeModifier.prototype.getModifications = function () {
		var modifiers = this.modifiers,
			filteredModifiers = {},
			modifierNames = Object.keys(modifiers);
	
		if (modifierNames.length === 0) { return {}; }

		// Filter out modifiers which are still null
		modifierNames.forEach(function (modifier) {
			if (modifiers[modifier].value !== null) {
				filteredModifiers[modifier] = modifiers[modifier];
			}
		});
		
		return filteredModifiers;
	};
	
	window.ThemeModifier = ThemeModifier;
})(window);

(function (window) {
    "use strict";

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
     * @property {string} headingsColor The @headings-color variable which sets the color of <h1>-<h6> tags.
     * @property {string} linkColor The @link-color variable which sets the link color.
     * @property {string} linkHoverColor The @link-hover-color variable which sets the link hover color.
     * @property {string} hrBorder The @hr-border variable which sets the color of the <hr> tag.
     * @property {string} borderRadiusBase The @border-radius-base variable which sets the base border radius.
     * 
     * @returns {Misc}
     */
    var Misc = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        // Define the Modifiers
        this.componentBaseBg = {
            variable: '@state-base-bg',
            value: null
        };
        this.wellBg = {
            variable: '@well-base-bg',
            value: null
        };
        this.bodyBg = {
            variable: '@body-bg',
            value: null
        };
        this.textColor = {
            variable: '@text-color',
            value: null
        };
        this.headingsColor = {
            variable: '@headings-color',
            value: null
        };
        this.linkColor = {
            variable: '@link-color',
            value: null
        };
        this.linkHoverColor = {
            variable: '@link-hover-color',
            value: null
        };
        this.hrBorder = {
            variable: '@hr-border',
            value: null
        };
        this.borderRadiusBase = {
            variable: '@border-radius-base',
            value: null
        };

        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            componentBaseBg:    this.componentBaseBg,
            wellBg:             this.wellBg,
            bodyBg:             this.bodyBg,
            textColor:          this.textColor,
            headingsColor:      this.headingsColor,
            linkColor:          this.linkColor,
            linkHoverColor:     this.linkHoverColor,
            hrBorder:           this.hrBorder,
            borderRadiusBase:   this.borderRadiusBase
        };
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
        this.editor.queueModifications();
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
        this.editor.queueModifications();
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
        this.editor.queueModifications();
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
        this.editor.queueModifications();
    };

    /**
     * Gets the Headings Text color.
     * 
     * @returns {String}
     */
    Misc.prototype.getHeadingsColor = function () {
        return this.modifiers.headingsColor.value;
    };

    /**
     * Sets the Headings Text color.
     * 
     * @param {string} color The Headings text color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setHeadingsColor = function (color) {
        this.modifiers.headingsColor.value = color;
        this.editor.queueModifications();
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
        this.editor.queueModifications();
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
        this.editor.queueModifications();
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
        this.editor.queueModifications();
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
        this.editor.queueModifications();
    };

    window.Misc = Misc;
})(window);

(function (window) {
    "use strict";

    /**
	 * Allows modification of a Breadcrumb component in Bootstrap.
	 * 
	 * @class Breadcrumb
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} bg The @breadcrumb-bg variable which controls the Background color of the Breadcrumb component.
	 * @property {object} color The @breadcrumb-color variable which controls the Color of the Breadcrumb component.
	 * @property {object} activeColor The @breadcrumb-active-color variable which controls the Active Color of the Breadcrumb component.
	 * @property {object} seperator The @breadcrumb-seperator variable which controls the Seperator Character of the Breadcrumb component.
     * 
     * @returns {undefined}
     */
    var Breadcrumb = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        this.bg = {
            variable: '@breadcrumb-bg',
            value: null
        };
        this.color = {
            variable: '@breadcrumb-color',
            value: null
        };
        this.activeColor = {
            variable: '@breadcrumb-active-color',
            value: null
        };
        this.seperator = {
            variable: '@breadcrumb-seperator',
            value: null
        };

        this.modifiers = {
            bg:             this.bg,
            color:          this.color,
            activeColor:    this.activeColor,
            seperator:      this.seperator
        };
    };

    // Inherit from parent Prototype and preserve constructor
    Breadcrumb.prototype = Object.create(ThemeModifier.prototype);
    Breadcrumb.constructor = Breadcrumb;

    /**
	 * Gets the Breadcrumb Background color.
	 * 
	 * @returns {String}
	 */
	Breadcrumb.prototype.getBackground = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Breadcrumb Background color.
	 * 
	 * @param {string} color Sets the Breadcrumb Background color.
	 * 
	 * @returns {undefined}
	 */
	Breadcrumb.prototype.setBackground = function (color) {
		this.modifiers.bg.value = color;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Breadcrumb Color.
	 * 
	 * @returns {string}
	 */
	Breadcrumb.prototype.getColor = function () {
		return this.modifiers.color.value;
	};

	/**
	 * Sets the Breadcrumb Color.
	 * 
	 * @param {string} color Sets the Breadcrumb Color.
	 * 
	 * @returns {undefined}
	 */
	Breadcrumb.prototype.setColor = function (color) {
		this.modifiers.color.value = color;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Breadcrumb Active Color.
	 * 
	 * @returns {string}
	 */
	Breadcrumb.prototype.getActiveColor = function () {
		return this.modifiers.activeColor.value;
	};

	/**
	 * Sets the Breadcrumb Active Color.
	 * 
	 * @param {string} activeColor Sets the Breadcrumb Active Color.
	 * 
	 * @returns {undefined}
	 */
	Breadcrumb.prototype.setActiveColor = function (activeColor) {
		this.modifiers.activeColor.value = activeColor;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Breadcrumb Seperator Character.
	 * 
	 * @returns {string}
	 */
	Breadcrumb.prototype.getSeperator = function () {
		return this.modifiers.seperator.value;
	};
	
	/**
	 * Sets the Breadcrumb Seperator Character.
	 * 
	 * @param {string} seperator Sets the Breadcrumb Seperator Character.
	 * 
	 * @returns {undefined}
	 */
	Breadcrumb.prototype.setSeperator = function (seperator) {
		this.modifiers.seperator.value = seperator;
		this.editor.queueModifications();
	};

    window.Breadcrumb = Breadcrumb;
})(window);

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

(function (window) {
    "use strict";

    /**
     * Allows modification of the General Navbar Component Styling.
     * 
     * @class NavbarBase
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
     * 
     * @property {string} height The @navbar-height variable which sets the height of Navbar Components.
     * @property {string} marginBottom The @navbar-margin-bottom variable which sets the margin-bottom of Navbar Components.
     * @property {string} borderRadius The @navbar-border-radius variable which sets the border radius of Navbar Components.
     * @property {string} collapseMaxHeight The @navbar-collapse-max-height variable which sets the max height of the Navbar Collapse Components.
     * 
     * @returns {NavbarBase}
     */
    var NavbarBase = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        // Define the Modifiers
        this.height = {
            variable: '@navbar-height',
            value: null
        };
        this.marginBottom = {
            variable: '@navbar-margin-bottom',
            value: null
        };
        this.borderRadius = {
            variable: '@navbar-border-radius',
            value: null
        };
        this.collapseMaxHeight = {
            variable: '@navbar-collapse-max-height',
            value: null
        };
        
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            height:             this.height,
            marginBottom:       this.marginBottom,
            borderRadius:       this.borderRadius,
            collapseMaxHeight:  this.collapseMaxHeight
        };
    };
    
    // Inherit from parent Prototype and preserve constructor
    NavbarBase.prototype = Object.create(ThemeModifier.prototype);
    NavbarBase.constructor = NavbarBase;

    /**
     * Gets the Height of the Navbar Components.
     * 
     * @returns {string}
     */
    NavbarBase.prototype.getHeight = function () {
        return this.modifiers.height.value;
    };

    /**
     * Gets the Height of the Navbar Components.
     * 
     * @param {string} height The Navbar Height to set.
     * 
     * @returns {undefined}
     */
    NavbarBase.prototype.setHeight = function (height) {
        this.modifiers.height.value = height + 'px';
        this.editor.queueModifications();
    };
    
    /**
     * Gets the Margin Bottom of the Navbar Components.
     * 
     * @returns {string}
     */
    NavbarBase.prototype.getMarginBottom = function () {
        return this.modifiers.marginBottom.value;
    };

    /**
     * Gets the Margin Bottom of the Navbar Components.
     * 
     * @param {string} marginBottom The Navbar Margin Bottom to set.
     * 
     * @returns {undefined}
     */
    NavbarBase.prototype.setMarginBottom = function (marginBottom) {
        this.modifiers.marginBottom.value = marginBottom + 'px';
        this.editor.queueModifications();
    };

    /**
     * Gets the Border Radius of the Navbar Components.
     * 
     * @returns {string}
     */
    NavbarBase.prototype.getBorderRadius = function () {
        return this.modifiers.borderRadius.value;
    };

    /**
     * Gets the Border Radius of the Navbar Components.
     * 
     * @param {string} borderRadius The Navbar Border Radius to set.
     * 
     * @returns {undefined}
     */
    NavbarBase.prototype.setBorderRadius = function (borderRadius) {
        this.modifiers.borderRadius.value = borderRadius;
        this.editor.queueModifications();
    };
    
    /**
     * Gets the Collapse Max Height of the Navbar Components.
     * 
     * @returns {string}
     */
    NavbarBase.prototype.getCollapseMaxHeight = function () {
        return this.modifiers.collapseMaxHeight.value;
    };

    /**
     * Gets the Collapse Max Height of the Navbar Components.
     * 
     * @param {string} collapseMaxHeight The Navbar CollapseMaxHeight to set.
     * 
     * @returns {undefined}
     */
    NavbarBase.prototype.setCollapseMaxHeight = function (collapseMaxHeight) {
        this.modifiers.collapseMaxHeight.value = collapseMaxHeight + 'px';
        this.editor.queueModifications();
    };

    window.NavbarBase = NavbarBase;
})(window);

(function (window) {
	"use strict";

	/**
	 * Allows editing of the @brand-{style} variables which affect alerts/panel headers,
	 * the Primary branding, however affects more, such as the ListGroup background, links etc.
	 * 
	 * @class Dropdown
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {string} default The @brand-default variable which affects the default styles.
	 * @property {string} primary The @brand-primary variable which affects the primary styles.
	 * @property {string} success The @brand-success variable which affects the success styles.
	 * @property {string} info The @brand-info variable which affects the info styles.
	 * @property {string} warning The @brand-default variable which affects the warning styles.
	 * @property {string} danger The @brand-danger variable which affects the danger styles.
	 * 
	 * @returns {BrandModifier}
	 */
	var BrandModifier = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        // Configure the Modifiers
		this.default = {
			variable: '@brand-default',
			value: null
		};
		this.primary = {
			variable: '@brand-primary',
			value: null
		};
		this.success = {
			variable: '@brand-success',
			value: null
		};
		this.info = {
			variable: '@brand-info',
			value: null
		};
		this.warning = {
			variable: '@brand-warning',
			value: null
		};
		this.danger	= {
			variable: '@brand-danger',
			value: null
		};
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            default:    this.default,
            primary:    this.primary,
            success:    this.success,
            info:       this.info,
            warning:    this.warning,
            danger:     this.danger
        };
	};
	
	// Inherit from parent Prototype and preserve constructor
	BrandModifier.prototype = Object.create(ThemeModifier.prototype);
	BrandModifier.constructor = BrandModifier;

	/**
	 * Gets the Default branding color.
	 * 
	 * @returns {undefined}
	 */
	BrandModifier.prototype.getDefault = function () {
		return this.modifiers.default.value;
	};

	/**
	 * Sets the Default branding color.
	 * 
	 * @param {string} color Sets the primary color.
	 * 
	 * @returns {undefined}
	 */
	BrandModifier.prototype.setDefault = function (color) {
		this.modifiers.default.value = color;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Primary branding color.
	 * 
	 * @returns {string}
	 */
	BrandModifier.prototype.getPrimary = function () {
		return this.modifiers.primary.value;
	};

	/**
	 * Sets the Primary branding color.
	 * 
	 * @param {string} color Sets the Primary color.
	 * 
	 * @returns {undefined}
	 */
	BrandModifier.prototype.setPrimary = function (color) {
		this.modifiers.primary.value = color;
		this.editor.queueModifications();
	};

	/**
	 * gets the Success branding color.
	 * 
	 * @returns {string}
	 */
	BrandModifier.prototype.getSuccess = function () {
		return this.modifiers.success.value;
	};

	/**
	 * Sets the Success branding color.
	 * 
	 * @param {string} color Sets the Success color.
	 * 
	 * @returns {undefined}
	 */
	BrandModifier.prototype.setSuccess = function (color) {
		this.modifiers.success.value = color;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Info branding color.
	 * 
	 * @returns {string}
	 */
	BrandModifier.prototype.getInfo = function () {
		return this.modifiers.info.value;
	};

	/**
	 * Sets the Info branding color.
	 * 
	 * @param {string} color Sets the Info color.
	 * 
	 * @returns {undefined}
	 */
	BrandModifier.prototype.setInfo = function (color) {
		this.modifiers.info.value = color;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Warning branding color.
	 * 
	 * @returns {string}
	 */
	BrandModifier.prototype.getWarning = function () {
		return this.modifiers.warning.value;
	};

	/**
	 * Sets the Warning branding color.
	 * 
	 * @param {type} color Sets the Warning color.
	 * 
	 * @returns {undefined}
	 */
	BrandModifier.prototype.setWarning = function (color) {
		this.modifiers.warning.value = color;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Danger branding color.
	 * 
	 * @returns {string}
	 */
	BrandModifier.prototype.getDanger = function () {
		return this.modifiers.danger.value;
	};

	/**
	 * Sets the Danger branding color.
	 * 
	 * @param {string} color Sets the Danger color.
	 * 
	 * @returns {undefined}
	 */
	BrandModifier.prototype.setDanger = function (color) {
		this.modifiers.danger.value = color;
		this.editor.queueModifications();
	};
	
	window.BrandModifier = BrandModifier;
})(window);

(function (window) {
	"use strict";

	/**
	 * Allows modification of the Dropdown Component styling.
	 * 
	 * @class Dropdown
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} bg The @dropdown-bg variable which sets the dropdown background color.
	 * @property {object} headerColor The @dropdown-header-color variable which sets the dropdown header color.
	 * @property {object} border The @dropdown-border variable which sets the dropdown border color.
	 * @property {object} divider The @dropdown-divider-bg variable which sets the dropdown divider color.
	 * @property {object} linkColor The @dropdown-link-color variable which sets the link color.
	 * @property {object} linkDisabledColor The @dropdown-link-disabled-color variable which sets the link disabled color.
	 * @property {object} linkHoverBg The @dropdown-link-hover-bg variable which sets the dropdown link hover background color.
	 * @property {object} linkHoverColor The @dropdown-link-hover-color variable which sets the dropdown link hover color.
	 * @property {object} linkActiveBg The @dropdown-link-active-hover-bg variable which sets the dropdown link active background color.
	 * @property {object} linkActiveColor The @dropdown-link-active-hover-color variable which sets the dropdown link active color.
	 * 
	 * @returns {Dropdown}
	 */
	var Dropdown = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor
		
        // Configure the Modifiers
		this.bg = {
			variable: '@dropdown-bg',
			value: null
		};
		this.headerColor = {
			variable: '@dropdown-header-color',
			value: null
		};
		this.border = {
			variable: '@dropdown-border',
			value: null
		};
		this.divider = {
			variable: '@dropdown-divider-bg',
			value: null
		};
		this.linkColor = {
			variable: '@dropdown-link-color',
			value: null
		};
		this.linkDisabledColor = {
			variable: '@dropdown-link-disabled-color',
			value: null
		};
		this.linkHoverBg = {
			variable: '@dropdown-link-hover-bg',
			value: null
		};
		this.linkHoverColor = {
			variable: '@dropdown-link-hover-color',
			value: null
		};
		this.linkActiveBg = {
			variable: '@dropdown-link-active-bg',
			value: null
		};
		this.linkActiveColor = {
			variable: '@dropdown-link-active-color',
			value: null
		};

        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            bg:                 this.bg,
            headerColor:        this.headerColor,
            border:             this.border,
            divider:            this.divider,
            linkColor:          this.linkColor,
            linkDisabledColor:  this.linkDisabledColor,
            linkHoverBg:        this.linkHoverBg,
            linkHoverColor:     this.linkHoverColor,
            linkActiveBg:       this.linkActiveBg,
            linkActiveColor:    this.linkActiveColor
        };
	};
	
	// Inherit from parent Prototype and preserve constructor
	Dropdown.prototype = Object.create(ThemeModifier.prototype);
	Dropdown.constructor = Dropdown;

	/**
	 * Gets the Background color value.
	 * 
	 * @returns {String}
	 */
	Dropdown.prototype.getBackground = function () {
		return this.modifiers.bg;
	};
	
	/**
	 * Sets the Background color value.
	 * 
	 * @param {string} color The Background color to set.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setBackground = function (color) {
		this.modifiers.bg.value = color;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Header color value.
	 * 
	 * @returns {String}
	 */
	Dropdown.prototype.getHeaderColor = function () {
		return this.modifiers.headingColor;
	};
	
	/**
	 * Sets the Header color value.
	 * 
	 * @param {string} color The Header color to set.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setHeaderColor = function (color) {
		this.modifiers.headerColor.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Border color value.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getBorder = function () {
		return this.modifiers.border.value;
	};
	
	/**
	 * Sets the Border color value.
	 * 
	 * @param {string} color Sets the border color value.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setBorder = function (color) {
		this.modifiers.border.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Divider color value.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getDivider = function () {
		return this.modifiers.divider.value;
	};
	
	/**
	 * Sets the Divider color value.
	 * 
	 * @param {string} color Sets the divider color value.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setDivider = function (color) {
		this.modifiers.divider.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Link color value.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkColor = function () {
		return this.modifiers.linkColor.value;
	};
	
	/**
	 * Sets the Link color value.
	 * 
	 * @param {string} color Sets the link color value.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkColor = function (color) {
		this.modifiers.linkColor.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Link Disabled color value.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkDisabledColor = function () {
		return this.modifiers.linkDisabledColor.value;
	};
	
	/**
	 * Sets the Link Disabled color value.
	 * 
	 * @param {string} color Sets the link disabled color value.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkDisabledColor = function (color) {
		this.modifiers.linkDisabledColor.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Link Hover Background color value.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkHoverBackground = function () {
		return this.modifiers.linkHoverBg.value;
	};
	
	/**
	 * Sets the Link Hover Background color value.
	 * 
	 * @param {string} color Sets the link hover background color value.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkHoverBackground = function (color) {
		this.modifiers.linkHoverBg.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Link Hover color value.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkHoverColor = function () {
		return this.modifiers.linkHoverColor.value;
	};
	
	/**
	 * Sets the Link Hover color value.
	 * 
	 * @param {string} color Sets the link hover color value.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkHoverColor = function (color) {
		this.modifiers.linkHoverColor.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Link Active Background color value.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkActiveBackground = function () {
		return this.modifiers.linkActiveBg.value;
	};
	
	/**
	 * Sets the Link Active Background color value.
	 * 
	 * @param {string} color Sets the link active background color value.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkActiveBackground = function (color) {
		this.modifiers.linkActiveBg.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Link Active Hover color value.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkActiveColor = function () {
		return this.modifiers.linkActiveColor.value;
	};
	
	/**
	 * Sets the Link Active color value.
	 * 
	 * @param {string} color Sets the link active color value.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkActiveColor = function (color) {
		this.modifiers.linkActiveColor.value = color;
		this.editor.queueModifications();
	};
	
	window.Dropdown = Dropdown;
})(window);

(function (window) {
	"use strict";

	/**
	 * Allows Alerts/Panels to be styled and affects the @state-{type}-{property} variables.
	 * 
	 * @class FormState
	 * @extends ThemeModifiers
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} headingBg @state-{type}-bg variable which sets the Heading Background color of alerts/panel headers.
	 * @property {object} text @state-{type}-text variable which sets the Text color of alerts/panel headers.
	 * @property {object} border @state-{type}-border variable which sets the Border color of alerts/panel headers.
	 * 
	 * @returns {FormState}
	 */
	var FormState = function (editor, type) {
		ThemeModifier.call(this, editor); // Call parent constructor
		
        // Configure the Modifiers
		this.headingBg = {
			variable: '@state-' + type + '-bg',
			value: null
		};
		this.text = {
			variable: '@state-' + type + '-text',
			value: null
		};
		this.border = {
			variable: '@state-' + type + '-border',
			value: null
		};
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            headingBg:  this.headingBg,
            text:       this.text,
            border:     this.border
        };
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
		this.editor.queueModifications();
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
		this.editor.queueModifications();
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
		this.editor.queueModifications();
	};

	window.FormState = FormState;
})(window);

(function (window) {
	"use strict";

	/**
	 * Allows modification of the base @gray-{shade} variables which affect the
	 * base colors of the bootstrap Theme.
	 * 
	 * @class GrayScale
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {string} base The @gray-base variable which influence all the others
	 * @property {string} darker The @gray-darker variable which is the darkest after base.
	 * @property {string} dark The @gray-dark variable which is 2nd darkest after base.
	 * @property {string} gray The @gray variable which is ~30% gray lighter than base.
	 * @property {string} light The @gray-light variable which is ~60% lighter than base.
	 * @property {string} lighter The @gray-lighter variable which is ~90% lighter than base.
	 * 
	 * @returns {GrayScale}
	 */
	var GrayScale = function (editor) {
		this.editor		= editor; // ThemeEditor

		// Different gray shades which affect the Theme
		this.base		= new GrayShade(this);
		this.darker		= new GrayShade(this);
		this.dark		= new GrayShade(this);
		this.gray		= new GrayShade(this);
		this.light		= new GrayShade(this);
		this.lighter	= new GrayShade(this);

		// Only return these properties
		return {
			'base':		this.base,
			'darker':	this.darker,
			'dark':		this.dark,
			'gray':		this.gray,
			'light':	this.light,
			'lighter':	this.lighter,
		};
	};

	/**
	 * Represents and holds the variable modifications for a @gray-{shade}.
	 * 
	 * @class GrayShade
	 * 
	 * @param {GrayScale} grayScale The GrayScale which created this instance.
	 * 
	 * @property {string} grayScale The parent GrayScale instance.
	 * 
	 * @returns {GrayShade}
	 */
	var GrayShade = function (grayScale) {
		this.grayScale	= grayScale;
		this.color		= null;
	};

	/**
	 * Sets the color of this Shade of Gray.
	 * 
	 * @param {string} color The color to set.
	 * 
	 * @returns {undefined}
	 */
	GrayShade.prototype.setColor = function (color) {
		this.color = color;

		this.grayScale.editor.queueModifications();
	};
	
	window.GrayScale = GrayScale;
})(window);

(function (window) {
	"use strict";

	/**
	 * Allows modifications of the Jumbotron component styling in Bootstrap.
	 * 
	 * @class Jumbotron
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} padding The @jumbotron-padding variable which sets the Padding of the Jumbotron component.
	 * @property {object} bg The @jumbotron-bg variable which sets the Background of the Jumbotron component.
	 * @property {object} headingColor The @jumbotron-heading-color variable which sets the Heading of the Jumbotron.
	 * @property {object} color The @jumbotron-color variable which sets the color of the Jumbotron component.
	 * 
	 * @returns {Jumbotron}
	 */
	var Jumbotron = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor
		
        // Configure the Modifiers
        this.padding = {
            variable: '@jumbotron-padding',
            value: null
        };
		this.bg = {
			variable: '@jumbotron-bg',
			value: null
		};
		this.headingColor = {
			variable: '@jumbotron-heading-color',
			value: null
		};
		this.color = {
			variable: '@jumbotron-color',
			value: null
		};
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            padding:        this.padding,
            bg:             this.bg,
            headingColor:   this.headingColor,
            color:          this.color
        };
	};
	
	// Inherit from parent Prototype and preserve constructor
	Jumbotron.prototype = Object.create(ThemeModifier.prototype);
	Jumbotron.constructor = Jumbotron;

	/**
	 * Gets the Padding of the Jumbotron Component.
	 * 
	 * @returns {string}
	 */
	Jumbotron.prototype.getPadding = function () {
		return this.modifiers.padding.value;
	};

	/**
	 * Sets the Padding of the Jumbotron Component.
	 * 
	 * @param {string} color The color to set the Padding.
	 * 
	 * @returns {undefined}
	 */
	Jumbotron.prototype.setPadding = function (color) {
		this.modifiers.padding.value = color + 'px';
		this.editor.queueModifications();
	};

	/**
	 * Gets the Background of the Jumbotron Component.
	 * 
	 * @returns {string}
	 */
	Jumbotron.prototype.getBackground = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background of the Jumbotron Component.
	 * 
	 * @param {string} color The color to set the Background.
	 * 
	 * @returns {undefined}
	 */
	Jumbotron.prototype.setBackground = function (color) {
		this.modifiers.bg.value = color;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Background of the Jumbotron Component.
	 * 
	 * @returns {string}
	 */
	Jumbotron.prototype.getColor = function () {
		return this.modifiers.color.value;
	};

	/**
	 * Sets the Text color of the Jumbotron Component.
	 * 
	 * @param {string} color The color to set the text of the Jumbotron Component.
	 * 
	 * @returns {undefined}
	 */
	Jumbotron.prototype.setColor = function (color) {
		this.modifiers.color.value = color;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Heading color of the Jumbotron Component.
	 * 
	 * @returns {string}
	 */
	Jumbotron.prototype.getHeadingColor = function () {
		return this.modifiers.headingColor.value;
	};

	/**
	 * Sets the Heading color of the Jumbotron Component.
	 * 
	 * @param {string} color The color to set the Headings.
	 * 
	 * @returns {undefined}
	 */
	Jumbotron.prototype.setHeadingColor = function (color) {
		this.modifiers.headingColor.value = color;
		this.editor.queueModifications();
	};

	window.Jumbotron = Jumbotron;
})(window);

(function (window) {
	"use strict";

	/**
	 * Allows modifications of the ListGroup Component styling.
	 * 
	 * @class ListGroup
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} bg The @list-group-bg variable which sets the background color of list group.
	 * @property {object} border The @list-group-border variable which sets the border of the list group.
	 * @property {object} hoverBg The @list-group-hover-bg variable which sets the hover background of the list group.
	 * @property {object} linkHeadingColor The @list-group-link-heading-color variable which sets the color of <h4> inside list groups.
	 * @property {object} linkColor The @list-group-link-color variable which sets the color of <a> inside list groups.
	 * @property {object} activeBg The @list-group-active-bg variable which sets the background color of <a> inside list groups.
	 * @property {object} activeBorder The @list-group-active-border variable which sets the active border of list groups.
	 * @property {object} activeColor The @list-group-active-color variable which sets the color of <a> inside list groups.
	 * @property {object} activeTextColor The @list-group-active-text-color variable which sets the color of <a> > <p> inside list groups.
	 * 
	 * @returns {ListGroup}
	 */
	var ListGroup = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        // Configure the Modifiers
		this.bg = {
			variable: '@list-group-bg',
			value: null
		};
		this.border = {
			variable: '@list-group-border',
			value: null
		};
		this.hoverBg = {
			variable: '@list-group-hover-bg',
			value: null
		};
		this.linkHeadingColor = {
			variable: '@list-group-link-heading-color',
			value: null
		};
		this.linkColor = {
			variable: '@list-group-link-color',
			value: null
		};
		this.activeBg = {
			variable: '@list-group-active-bg',
			value: null
		};
		this.activeBorder = {
			variable: '@list-group-active-border',
			value: null
		};
		this.activeColor = {
			variable: '@list-group-active-color',
			value: null
		};
		this.activeTextColor = {
			variable: '@list-group-active-text-color',
			value: null
		};
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            bg:                 this.bg,
            border:             this.border,
            hoverBg:            this.hoverBg,
            linkHeadingColor:   this.linkHeadingColor,
            linkColor:          this.linkColor,
            activeBg:           this.activeBg,
            activeBorder:       this.activeBorder,
            activeColor:        this.activeColor,
            activeTextColor:    this.activeTextColor
        };
	};
	
	// Inherit from parent Prototype and preserve constructor
	ListGroup.prototype = Object.create(ThemeModifier.prototype);
	ListGroup.constructor = ListGroup;
	
	/**
	 * Gets the Background color.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getBackground = function () {
		return this.modifiers.bg.value;
	};
	
	/**
	 * Sets the Background color.
	 * 
	 * @param {string} color Sets the Background color.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setBackground = function (color) {
		this.modifiers.bg.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Border color.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getBorder = function () {
		return this.modifiers.border.value;
	};
	
	/**
	 * Sets the Border color.
	 * 
	 * @param {string} color Sets the Border color.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setBorder = function (color) {
		this.modifiers.border.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Hover Background color.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getHoverBackground = function () {
		return this.modifiers.hoverBg.value;
	};
	
	/**
	 * Sets the Hover Background color.
	 * 
	 * @param {string} color Sets the Hover Background color.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setHoverBackground = function (color) {
		this.modifiers.hoverBg.value = color;
		this.editor.queueModifications();
	};
	
 	/**
	 * Gets the linkColor value.
	 * 
	 * @returns {String}
	 */
	ListGroup.prototype.getLinkColor = function () {
		return this.modifiers.linkColor.value;
	};
	
	/**
	 * Sets the Link color of the ListGroup Component.
	 * 
	 * @param {string} color The color to set the Link color.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setLinkColor = function (color) {
		this.modifiers.linkColor.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the linkHeadingColor value.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getLinkHeadingColor = function () {
		return this.modifiers.linkHeadingColor.value;
	};

	/**
	 * Sets the Link Heading color of the ListGroup Component.
	 * 
	 * @param {string} color Sets the Link Heading color.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setLinkHeadingColor = function (color) {
		this.modifiers.linkHeadingColor.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the activeBackground color value.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getActiveBackgound = function () {
		return this.modifiers.activeBg.value;
	};
	
	/**
	 * Sets the activeBackground color value.
	 * 
	 * @param {string} color Sets the Active Background color.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setActiveBackground = function (color) {
		this.modifiers.activeBg.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Active Border color value.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getActiveBorder = function () {
		return this.modifiers.activeBorder.value;
	};
	
	/**
	 * Sets the Active Border color value.
	 * 
	 * @param {string} color Sets the Active Border color.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setActiveBorder = function (color) {
		this.modifiers.activeBorder.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the activeColor value.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getActiveColor = function () {
		return this.modifiers.activeColor.value;
	};
	
	/**
	 * Sets the activeColor value.
	 * 
	 * @param {string} color Sets the Active Color value.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setActiveColor = function (color) {
		this.modifiers.activeColor.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the activeTextColor value.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.getActiveTextColor = function () {
		return this.modifiers.activeTextColor.value;
	};
	
	/**
	 * Sets the activeTextColor value.
	 * 
	 * @param {string} color Sets the Active Text Color value.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setActiveTextColor = function (color) {
		this.modifiers.activeTextColor.value = color;
		this.editor.queueModifications();
	};
	
	window.ListGroup = ListGroup;
})(window);

(function (window) {
	"use strict";

	/**
	 * Allows modification of a Navbar component in Bootstrap.
	 * 
	 * @class Navbar
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} bg The @navbar-{style}-bg variable which controls the background color of the Navbar component.
	 * @property {object} color The @navbar-{style}-color variable which controls the color of the Navbar component.
	 * @property {object} border The @navbar-{style}-border variable which controls the border of the Navbar component.
	 * @property {object} linkColor The @navbar-{style}-link-color variable which controls the link color of the Navbar component.
	 * @property {object} linkHoverColor The @navbar-{style}-link-hover-color variable which controls the link hover color of the Navbar component.
	 * @property {object} linkHoverBg The @navbar-{style}-link-hover-bg variable which controls the link hover background of the Navbar component.
	 * @property {object} linkActiveColor The @navbar-{style}-link-active-color variable which controls the link active color of the Navbar component.
	 * @property {object} linkActiveBg The @navbar-{style}-link-active-bg variable which controls the link active background of the Navbar component.
	 * @property {object} linkDisabledColor The @navbar-{style}-link-disabled-color variable which controls the link disabled color of the Navbar component.
	 * @property {object} linkDisabledBg The @navbar-{style}-link-disabled-bg variable which controls the link disabled background of the Navbar component.
	 * @property {object} brandColor The @navbar-{style}-brand-color variable which controls the brand color of the Navbar component.
	 * @property {object} brandHoverColor The @navbar-{style}-brand-hover-color variable which controls the brand hover color of the Navbar component.
	 * @property {object} brandHoverBg The @navbar-{style}-brand-hover-bg variable which controls the brand hover background of the Navbar component.
	 * 
	 * @returns {Navbar}
	 */
	var Navbar = function (editor, style) {
		ThemeModifier.call(this, editor); // Call parent constructor
		
		var navbarStyle = style === undefined ? 'default' : 'inverse';

        // Configure the Modifiers
		this.bg = {
			variable: 'navbar-' + navbarStyle + '-bg',
			value: null
		};
		this.color = {
			variable: 'navbar-' + navbarStyle + '-color',
			value: null
		};
		this.border = {
			variable: 'navbar-' + navbarStyle + '-border',
			value: null
		};
		this.linkColor = {
			variable: 'navbar-' + navbarStyle + '-link-color',
			value: null
		};
		this.linkHoverColor = {
			variable: 'navbar-' + navbarStyle + '-link-hover-color',
			value: null
		};
		this.linkHoverBg = {
			variable: 'navbar-' + navbarStyle + '-link-hover-bg',
			value: null
		};
		this.linkActiveColor = {
			variable: 'navbar-' + navbarStyle + '-link-active-color',
			value: null
		};
		this.linkActiveBg = {
			variable: 'navbar-' + navbarStyle + '-link-active-bg',
			value: null
		};
		this.linkHoverColor = {
			variable: 'navbar-' + navbarStyle + '-link-hover-color',
			value: null
		};
		this.linkHoverBg = {
			variable: 'navbar-' + navbarStyle + '-link-hover-bg',
			value: null
		};
		this.linkDisabledColor = {
			variable: 'navbar-' + navbarStyle + '-link-disabled-color',
			value: null
		};
		this.linkDisabledBg = {
			variable: 'navbar-' + navbarStyle + '-link-disabled-bg',
			value: null
		};
		this.brandColor = {
			variable: 'navbar-' + navbarStyle + '-brand-color',
			value: null
		};
		this.brandHoverColor = {
			variable: 'navbar-' + navbarStyle + '-brand-hover-color',
			value: null
		};
		this.brandHoverBg = {
			variable: 'navbar-' + navbarStyle + '-brand-hover-bg',
			value: null
		};
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            bg:                 this.bg,
            color:              this.color,
            border:             this.border,
            linkColor:          this.linkColor,
            linkHoverColor:     this.linkHoverColor,
            linkHoverBg:        this.linkHoverBg,
            linkActiveColor:    this.linkActiveColor,
            linkActiveBg:       this.linkActiveBg,
            linkDisabledColor:  this.linkDisabledColor,
            linkDisabledBg:     this.linkDisabledBg,
            brandColor:         this.brandColor,
            brandHoverColor:    this.brandHoverColor,
            brandHoverBg:       this.brandHoverBg
        };
	};
	
	// Inherit from parent Prototype and preserve constructor
	Navbar.prototype = Object.create(ThemeModifier.prototype);
	Navbar.constructor = Navbar;

	/**
	 * Gets the Background color.
	 * 
	 * @returns {String}
	 */
	Navbar.prototype.getBackground = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background color of this Navbar instance.
	 * 
	 * @param {string} color Sets the Background color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setBackground = function (color) {
		this.modifiers.bg.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getColor = function () {
		return this.modifiers.color.value;
	};
	
	/**
	 * Sets the Color of this Navbar instance.
	 * 
	 * @param {string} color Sets the Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setColor = function (color) {
		this.modifiers.color.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Border of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getBorder = function () {
		return this.modifiers.border.value;
	};
	
	/**
	 * Sets the Border of this Navbar instance.
	 * 
	 * @param {string} color Sets the Border.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setBorder = function (color) {
		this.modifiers.border.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Link Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getLinkColor = function () {
		return this.modifiers.linkColor.value;
	};
	
	/**
	 * Sets the Link Color of this Navbar instance.
	 * 
	 * @param {string} color Sets the Link Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkColor = function (color) {
		this.modifiers.linkColor.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Link Hover Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getLinkHoverColor = function () {
		return this.modifiers.linkHoverColor.value;
	};
	
	/**
	 * Sets the Link Hover Color of this Navbar instance.
	 * 
	 * @param {string} color Sets the Link Hover Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkHoverColor = function (color) {
		this.modifiers.linkHoverColor.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Link Hover Background Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getLinkHoverBackgroundColor = function () {
		return this.modifiers.linkHoverBg.value;
	};
	
	/**
	 * Sets the Link Hover Background Color of this Navbar instance.
	 * 
	 * @param {string} color Sets the Link Hover Background Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkHoverBackgroundColor = function (color) {
		this.modifiers.linkHoverBg.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Link Active Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getLinkActiveColor = function () {
		return this.modifiers.linkActiveColor.value;
	};
	
	/**
	 * Sets the Link Active Color of this Navbar instance.
	 * 
	 * @param {string} color Set the Link Active Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkActiveColor = function (color) {
		this.modifiers.linkActiveColor.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Link Active Background Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getLinkActiveBackgroundColor = function () {
		return this.modifiers.linkActiveBg.value;
	};
	
	/**
	 * Sets the Link Active Background Color of this Navbar instance.
	 * 
	 * @param {string} color Sets the Link Active Background Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkActiveBackgroundColor = function (color) {
		this.modifiers.linkActiveBg.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Link Disabled Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getLinkDisabledColor = function () {
		return this.modifiers.linkDisabledColor.value;
	};
	
	/**
	 * Sets the Link Disabled Color of this Navbar instance.
	 * 
	 * @param {string} color Set the Link Disabled Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkDisabledColor = function (color) {
		this.modifiers.linkDisabledColor.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Link Disabled Background Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getLinkDisabledBackgroundColor = function () {
		return this.modifiers.linkDisabledBg.value;
	};
	
	/**
	 * Sets the Link Disabled Background Color of this Navbar instance.
	 * 
	 * @param {string} color Sets the Link Disabled Background Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkDisabledBackgroundColor = function (color) {
		this.modifiers.linkDisabledBg.value = color;
		this.editor.queueModifications();
	};
	
		
	/**
	 * Gets the Brand Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getBrandColor = function () {
		return this.modifiers.brandColor.value;
	};
	
	/**
	 * Sets the Brand Color of this Navbar instance.
	 * 
	 * @param {string} color Sets the Brand Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setBrandColor = function (color) {
		this.modifiers.brandColor.value = color;
		this.editor.queueModifications();
	};
	
		
	/**
	 * Gets the Brand Hover Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getBrandHoverColor = function () {
		return this.modifiers.brandHoverColor.value;
	};
	
	/**
	 * Sets the Brand Hover Color of this Navbar instance.
	 * 
	 * @param {string} color Sets the Brand Hover Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setBrandHoverColor = function (color) {
		this.modifiers.brandHoverColor.value = color;
		this.editor.queueModifications();
	};
	
	/**
	 * Gets the Brand Hover Background Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getBrandHoverBackgroundColor = function () {
		return this.modifiers.brandHoverBg.value;
	};
	
	/**
	 * Sets the Brand Hover Background Color of this Navbar instance.
	 * 
	 * @param {string} color Sets the Brand Hover Background Color.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setBrandHoverBackgroundColor = function (color) {
		this.modifiers.brandHoverBg.value = color;
		this.editor.queueModifications();
	};
	
	window.Navbar = Navbar;
})(window);

/* global Jumbotron, GrayScale, BrandModifier, Navbar, FormState, ListGroup, Dropdown, Misc, PanelBase, NavbarBase, Breadcrumb */
(function (window) {
    "use strict";

    /**
     * ThemeEditor class holds the modifications to the less theme using sub classes
     * which hold information about the modifications, for each different part of the theme.
     * Such as branding, base colors, navbar, etc etc. These modifications can then be
     * retrieved or applied to the current page.
     * 
     * @class ThemeEditor
     * 
     * Generic Options:
     * - delay: {Number} Milliseconds delay between refresh updates (Default: 750)
     * 
     * @param {Object} less The Global less object.
     * 
     * @property {Misc} misc Holds miscellaneous modifications to Bootstrap.
     * @property {Breadcrumbs} breadcrumbs Holds modifications to the Breadcrumbs component.
     * @property {Dropdown} dropdown Holds modifications to the Dropdown component.
     * @property {Jumbotron} jumbotron Hold modifications to the Jumbotron component.
     * @property {GrayScale} grayScale Holds the modifications to the base gray colors of the Theme.
     * @property {BrandModifier} branding Holds the changes to the Branding colors of the Theme.
     * @property {PanelBase} panelBase Holds the changes to the General Panel styling of Panel Components.
     * @property {Navbar} navbarBase Holds the changes to the General Navbar styling of Navbar Components.
     * @property {Object} navbar Holds Navbar instances which control the styling of Navbar Components.
     * @property {Object} formStates Holds FormState instances which control the styling of various components, (Alerts/Panels).
     * @property {ListGroup} listGroup Holds the changes to the ListGroup component.
     * @property {object} modifiers Holds all of the Modifications to the whole theme.
     * 
     * @returns {ThemeEditor}
     */
    var ThemeEditor = function (less, options) {
        this.lessGlobal         = less;
        this.options            = options;
        
        /**
         * Monitors the refreshing of the less files, enables it to be block for x duration between refreshes. To avoid crashing the brower :).
         * 
         * @property readyState {Number} Tracks whether or not another refresh can be performed. (0 = ready, 1 = on delaying).
         * @propery delay {Number} Milliseconds delay between refresh updates (Default: 750).
         */
        this.refreshMonitor      = {
            readyState: 0,
            delay: options.refreshDelay || 750
        };

        this.misc               = new Misc(this);
        // Component vars
        this.breadcrumbs        = new Breadcrumb(this);
        this.dropdown           = new Dropdown(this);
        this.jumbotron          = new Jumbotron(this);
        this.grayScale          = new GrayScale(this);
        this.branding           = new BrandModifier(this);
        this.panelBase          = new PanelBase(this);
        this.navbarBase         = new NavbarBase(this);
        this.navbar = {
            'default':            new Navbar(this),
            'inverse':            new Navbar(this, 'inverse')
        };
        this.formStates = {
            'default':            new FormState(this, 'default'),
            'primary':            new FormState(this, 'primary'),
            'success':            new FormState(this, 'success'),
            'info':               new FormState(this, 'info'),
            'warning':            new FormState(this, 'warning'),
            'danger':             new FormState(this, 'danger')
        };
        this.listGroup          = new ListGroup(this);

        // All modifier vars
        this.modifiers = {};

        // If the download option was provided
        if (options.hasOwnProperty('download')) {

            // If the download.append option was provided
            if (options.download.hasOwnProperty('append')) {
                // Attempt to append to the element selector in append
                this.downloadLink = this.createDownloadLink(options.download.append);
            } else {
                this.downloadLink = this.createDownloadLink();
            }
        }

        // If the Save option was provided
        if (options.hasOwnProperty('save')) {
            
            // If the save.append option was provided
            if (options.save.hasOwnProperty('append')) {
                // Attempt to append to the element selector in append
                this.createSaveLink(options.save.append);
            } else {
                this.createSaveLink();
            }
        }

        // If the theme option was provided
        if (options.hasOwnProperty('theme')) {

            // If the theme.src option was provided
            if (options.theme.hasOwnProperty('src')) {
                // Attempt to load and parse the theme file at the theme.src URL
                this.parseThemeFile(options.theme.src);
            }
        }
    };

    /**
     * Get the Modifications which have been stored.
     * 
     * @returns {Object}
     */
    ThemeEditor.prototype.getModifiers = function () {
        var grayScale   = this.grayScale,
            navbar      = this.navbar,
            formStates  = this.formStates,
            modifiers   = this.modifiers;

        // Gray Base
        Object.keys(grayScale).forEach(function (style) {
            if (grayScale[style].color !== null) {
                if (style === 'gray') {
                    modifiers['@gray'] = grayScale[style].color;
                } else {
                    modifiers['@gray-' + style] = grayScale[style].color;
                }
            }
        });

        // Navbars
        // Itterate over the object to extract modifications for both styles of Navbar's
        Object.keys(navbar).forEach(function (style) {
            var navbarStyle = navbar[style];

            this.extractModifications(modifiers, navbarStyle);
        }, this);

        // FormStates
        // Itterate over the object to extract modifications for each styles of FormState's
        Object.keys(formStates).forEach(function (style) {
            var formStatesStyle = formStates[style];

            this.extractModifications(modifiers, formStatesStyle);
        }, this);
        
        // Panel Base
        this.extractModifications(modifiers, this.panelBase);

        // Navbar Base
        this.extractModifications(modifiers, this.navbarBase);

        // Misc
        this.extractModifications(modifiers, this.misc);

        // Branding
        this.extractModifications(modifiers, this.branding);

        // Breadcrumbs
        this.extractModifications(modifiers, this.breadcrumbs);

        // Dropdown
        this.extractModifications(modifiers, this.dropdown);

        // Jumbotron
        this.extractModifications(modifiers, this.jumbotron);

        // List Group
        this.extractModifications(modifiers, this.listGroup);

        return modifiers;
    };

    /**
     * Extracts the Modifications for the particular style/component by using
     * ThemeModifier.prototype.getModifications() and adds them to ThemeEditor.modifications.
     * 
     * @param {Object} modifiers All of the modifications to the theme.
     * @param {Obejct} modifiersType The object which holds the modifications for a particular style/components.
     * 
     * @returns {undefined}
     */
    ThemeEditor.prototype.extractModifications = function (modifiers, modifiersType) {
        var modifiersOfType = modifiersType.getModifications();
        Object.keys(modifiersOfType).forEach(function (modifier) {
            var modifierObject = modifiersOfType[modifier];
            modifiers[modifierObject.variable] = modifierObject.value;
        });
    };

    /**
     * Turns the Modifications to the Theme into JSON.
     * 
     * @returns {String}
     */
    ThemeEditor.prototype.getJSON = function () {
        return JSON.stringify(this.getModifiers());
    };

    /**
     * Applies the modification, or makes the refreshMonitor queue a single update
     * in x milliseconds from now, controlled by this.refreshMonitor.delay.
     * 
     * @returns {undefined}
     */
    ThemeEditor.prototype.queueModifications = function () {
        // If an update is allowed right now, apply the modifications
        if (this.refreshMonitor.readyState === 0) {
            this.applyModifications();
            
            // Set the state to not ready for more updates yet
            this.refreshMonitor.readyState = 1;
            
            // Set a timeout to allow updated again after x time (refreshMonitor.rate)
            // and apply the modifications that were pending
            setTimeout(function () {
                this.refreshMonitor.readyState = 0;
                this.applyModifications();
            }.bind(this), this.refreshMonitor.delay);
        }
    };
    
    /**
     * Applies the Modifications to the Less Theme.
     * 
     * @returns {undefined}
     */
    ThemeEditor.prototype.applyModifications = function () {
        this.generateDownloadBlob();
        this.lessGlobal.modifyVars(this.getModifiers());
    };

    /**
     * Sends the Theme Data to the URL provided by the "save" option to ThemeEditor(options).
     * 
     * Save options:
     * - method:    {string}    The HTTP method for the save request. Default "POST".
     * - url:       {string}    The URL to send the JSON data.
     * - callback:  {Function}  A callback function to execute on success.
     * 
     * @returns {undefined}
     */
    ThemeEditor.prototype.sendThemeData = function () {
        var options = this.options.save,
            method = options.method || 'POST', // Default to "POST"
            saveXHR;

        // Throw an error if the URL option was not provided or was not a string
        if (typeof options.url !== 'string') {
            throw new TypeError('ThemeEditor.sendThemeData: The save url was not provided, or was not a string');
        }

        // Create an XMLHttpRequest to send the Theme json to the server
        saveXHR = new XMLHttpRequest();
        saveXHR.open(method.toUpperCase(), options.url, true); // Open the URL, call uppercase on 
        saveXHR.setRequestHeader('Content-Type', 'application/json; charset=UTF-8'); // Set the Content-Type header to JSON.

        // If a callback function is provided
        if (options.hasOwnProperty('callback')) {
            if (typeof options.callback === 'function') {
                // Wait for the XHR to finish (4) and be succesfull (200)
                saveXHR.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        // Call the callback function
                        options.callback();
                    }
                };
            }
        }

        // Send the JSON to the server
        saveXHR.send(this.getJSON());
    };

    /**
     * Prases a theme.json file located at the themeURL, by default uses "GET" as the method.
     * 
     * @param {string} themeUrl The url to locate the theme.json file and download the content.
     * 
     * @returns {undefined}
     */
    ThemeEditor.prototype.parseThemeFile = function (themeUrl) {
        var themeXHR;

        // If an url to the theme.json file was not provided, or was not a string
        if (typeof themeUrl !== 'string') {
            throw new TypeError('ThemeEditor.parseThemeFile: The theme file options provided is not a string');
        }

        // Create a new XMLHttpRequest to fetch the theme.json file data
        themeXHR = new XMLHttpRequest();
        themeXHR.overrideMimeType('application/json'); // Make sure were expecting JSON data
        themeXHR.open('GET', themeUrl, true);

        // When the File has loaded succesfully
        themeXHR.onreadystatechange = function () {
            if (themeXHR.readyState === 4 && themeXHR.status === 200) {
                // Parse the json and store it in this.modifiers
                this.modifiers = JSON.parse(themeXHR.responseText);

                // Now apply the modifications to style the page with the theme.json
                this.queueModifications();
            }
        }.bind(this);

        themeXHR.send(null);
    };

    /**
     * Creates and returns a Primary Bootstrap Anchor tag link.
     * 
     * @returns {Element}
     */
    ThemeEditor.prototype.createBsButton = function () {
        var button = document.createElement('a'); // Create link

        // Add Primary BS classes
        button.classList.add('btn');
        button.classList.add('btn-primary');

        return button;
    };

    /**
     * Creates a Save button and appends it to the element provided by the destination.
     * 
     * Save Options:
     * - id:    {string} The id to set for the save button (Default "save_theme_link").
     * - text:  {string} The text content of the button (Default "Save Theme").
     * 
     * @param {string} destination The destination element selector (Default "body").
     * 
     * @returns {undefined}
     */
    ThemeEditor.prototype.createSaveLink = function (destination) {
        var saveOptions = this.options.save,
            saveLink = this.createBsButton(), // Create a button
            dest = destination === undefined ? 'body' : destination; // Body or custom parent

        // Set the text and id of the Save button
        saveLink.textContent = saveOptions.text || 'Save Theme';
        saveLink.setAttribute('id', saveOptions.id || 'save_theme_link');

        // Append the Save button to the document
        document.querySelector(dest).appendChild(saveLink);

        // Add a click handler which calls the sendThemeData function
        saveLink.addEventListener('click', this.sendThemeData.bind(this), false);

        return saveLink;
    };

    /**
     * Creates a Download button and appends it to the element provided by the destination.
     * 
     * Download Options:
     * - id:    {string} The id to set for the download button (Default "download_theme_link").
     * - text:  {string} The text content of the button (Default "Download Theme").
     * 
     * @param {string} destination The destination element selector (Default "body").
     * 
     * @returns {Element}
     */
    ThemeEditor.prototype.createDownloadLink = function (destination) {
        var downloadOptions = this.options.download,
            downloadLink = this.createBsButton(),
            dest = destination === undefined ? 'body' : destination;

        // Set the text, id and download attrubute of the Download button
        downloadLink.textContent = downloadOptions.text || 'Download Theme';
        downloadLink.setAttribute('id', downloadOptions.id || 'download_theme_link');

        // Download attribute allows the button to provided a file to download on click
        // The generateDownloadBlob function provides the file contents
        downloadLink.setAttribute('download', 'theme.json');

        // Append the Download button to the document
        document.querySelector(dest).appendChild(downloadLink);

        return downloadLink;
    };

    /**
     * Generates a download blob and sets the content to the theme JSON modifications,
     * updated the download link with the download blob.
     * 
     * @returns {undefined}
     */
    ThemeEditor.prototype.generateDownloadBlob = function () {
        var blobData = this.getJSON(),
            blob = new Blob([blobData]), // Create a Blog with the JSON data
    
            // Create an Object url, allows the Blob data to be downloaded on click
            downloadBlob = window.URL.createObjectURL(blob);

        // Update the href of the download link, this now points to the blob data
        this.downloadLink.setAttribute('href', downloadBlob);
    };

    window.ThemeEditor = ThemeEditor;
})(window);