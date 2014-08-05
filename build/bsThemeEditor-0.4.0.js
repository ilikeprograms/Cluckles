/**
 * Cluckles 0.4.0: Cluckles Live Theme Editor for CSS Framework based on Less such as Twitter Bootstrap.
 * Copyrite 2014 Thomas Coleman <tom@ilikeprograms.com>
 * License: GPL-3.0+
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
	 * Allows modification of the Typography component in Bootstrap.
	 * 
	 * @class Typography
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} fontFamilySansSerif The @font-family-sans-serif variable which controls the Font Family Sans Serif of the Typography component.
	 * @property {object} fontFamilySerif The @font-family-serif variable which controls the Font Family Serif of the Typography component.
	 * @property {object} fontFamilyMonospace The @font-family-serif variable which controls the Font Family Monospace of the Typography component.
	 * @property {object} fontSizeBase The @font-size-base variable which controls the Font Size Base of the Typography component.
	 * @property {object} headingsFontFamily The @headings-font-family variable which controls the Headings Font Family of the Typography component.
	 * @property {object} headingsFontWeight The @headings-font-weight variable which controls the Headings Font Weight of the Typography component.
	 * @property {object} headingsLineHeight The @headings-line-height variable which controls the Headings Line Height of the Typography component.
	 * @property {object} headingsColor The @headings-color variable which controls the Headings Color of the Typography component.
	 * 
	 * @returns {Typography}
	 */
	var Typography = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        // Configure the Modifiers
		this.fontFamilySansSerif = {
			variable: '@font-family-sans-serif',
			value: null
		};
		this.fontFamilySerif = {
			variable: '@font-family-serif',
			value: null
		};
		this.fontFamilyMonospace = {
			variable: '@font-family-monospace',
			value: null
		};
		this.fontSizeBase = {
			variable: '@font-size-base',
			value: null
		};
		this.headingsFontFamily = {
			variable: '@headings-font-family',
			value: null
		};
		this.headingsFontWeight = {
			variable: '@headings-font-weight',
			value: null
		};
		this.headingsLineHeight = {
			variable: '@headings-line-height',
			value: null
		};
		this.headingsColor = {
			variable: '@headings-color',
			value: null
		};
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            fontFamilySansSerif:    this.fontFamilySansSerif,
            fontFamilySerif:        this.fontFamilySerif,
            fontFamilyMonospace:    this.fontFamilyMonospace,
            fontSizeBase:           this.fontSizeBase,
            headingsFontFamily:     this.headingsFontFamily,
            headingsFontWeight:     this.headingsFontWeight,
            headingsLineHeight:     this.headingsLineHeight,
            headingsColor:          this.headingsColor
        };
	};
	
	// Inherit from parent Prototype and preserve constructor
	Typography.prototype = Object.create(ThemeModifier.prototype);
	Typography.constructor = Typography;

    /**
     * Gets the Font Family Sans Serif of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getFontFamilySansSerif = function () {
        return this.modifiers.fontFamilySansSerif.value;
    };
    
    /**
     * Sets the Font Family Sans Serif of the Typography Component.
     * 
     * @param {string} fontFamilySansSerif Sets the Typography Font Family Sans Serif.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontFamilySansSerif = function (fontFamilySansSerif) {
        this.modifiers.fontFamilySansSerif.value = fontFamilySansSerif;
        this.editor.queueModifications();
    };

    /**
     * Gets the Font Family Serif of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getFontFamilySerif = function () {
        return this.modifiers.fontFamilySerif.value;
    };
    
    /**
     * Sets the Font Family Serif of the Typography Component.
     * 
     * @param {string} fontFamilySerif Sets the Typography Font Family Serif.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontFamilySerif = function (fontFamilySerif) {
        this.modifiers.fontFamilySerif.value = fontFamilySerif;
        this.editor.queueModifications();
    };

    /**
     * Gets the Font Family Monospace of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getFontFamilyMonospace = function () {
        return this.modifiers.fontFamilyMonospace.value;
    };
    
    /**
     * Sets the Font Family Monospace of the Typography Component.
     * 
     * @param {string} fontFamilyMonospace Sets the Typography Font Family Monospace.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontFamilyMonospace = function (fontFamilyMonospace) {
        this.modifiers.fontFamilyMonospace.value = fontFamilyMonospace;
        this.editor.queueModifications();
    };

    /**
     * Gets the Font Size Base of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getFontSizeBase = function () {
        return this.modifiers.fontSizeBase.value;
    };

    /**
     * Sets the Font Size Base of the Typography Component.
     * 
     * @param {string} fontSizeBase Sets the Typography Font Size Base.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontSizeBase = function (fontSizeBase) {
        this.modifiers.fontSizeBase.value = fontSizeBase + 'px';
        this.editor.queueModifications();
    };

    /**
     * Gets the Headings Font Family of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getHeadingsFontFamily = function () {
        return this.modifiers.headingsFontFamily.value;
    };

    /**
     * Sets the Headings Font Family of the Typography Component.
     * 
     * @param {string} headingsFontFamily Sets the Typography Headings Font Family.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setHeadingsFontFamily = function (headingsFontFamily) {
        this.modifiers.headingsFontFamily.value = headingsFontFamily;
        this.editor.queueModifications();
    };

    /**
     * Gets the Headings Font Weight of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getHeadingsFontWeight = function () {
        return this.modifiers.headingsFontWeight.value;
    };

    /**
     * Sets the Headings Font Weight of the Typography Component.
     * 
     * @param {string} headingsFontWeight Sets the Typography Headings Font Weight.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setHeadingsFontWeight = function (headingsFontWeight) {
        this.modifiers.headingsFontWeight.value = headingsFontWeight;
        this.editor.queueModifications();
    };

    /**
     * Gets the Headings Line Height of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getHeadingsLineHeight = function () {
        return this.modifiers.headingsLineHeight.value;
    };

    /**
     * Sets the Headings Line Height of the Typography Component.
     * 
     * @param {string} headingsLineHeight Sets the Typography Headings Line Height.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setHeadingsLineHeight = function (headingsLineHeight) {
        this.modifiers.headingsLineHeight.value = headingsLineHeight;
        this.editor.queueModifications();
    };

    /**
     * Gets the Headings Color of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getHeadingsColor = function () {
        return this.modifiers.headingsColor.value;
    };

    /**
     * Sets the Headings Color of the Typography Component.
     * 
     * @param {string} headingsColor Sets the Typography Headings Color.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setHeadingsColor = function (headingsColor) {
        this.modifiers.headingsColor.value = headingsColor;
        this.editor.queueModifications();
    };

	window.Typography = Typography;
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
     * Allows modifications of the Table Components in Bootstrap.
     * 
	 * @class Table
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
     * 
     * @property {object} cellPadding The @table-cell-padding variable which controls the Cell Padding of the Table component.
     * @property {object} condensedCellPadding The @table-condensed-cell-padding variable which controls the Condensed Cell Padding of the Table component.
     * @property {object} bg The @table-bg variable which controls the Background Color of the Table component.
     * @property {object} accentBg The @table-bg-accent variable which controls the Background Accent Color of the Table component.
     * @property {object} hoverBg The @table-bg-hover variable which controls the Background Hover Color of the Table component.
     * @property {object} activeBg The @table-bg-active variable which controls the Background Active Color of the Table component.
     * @property {object} borderColor The @table-border-color variable which controls the Border Color of the Table component.
     * 
     * @returns {Table}
     */
    var Table = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        this.cellPadding = {
            variable: '@table-cell-padding',
            value: null
        };
        this.condensedCellPadding = {
            variable: '@table-condensed-cell-padding',
            value: null
        };
        this.bg = {
            variable: '@table-bg',
            value: null
        };
        this.bgAccent = {
            variable: '@table-bg-accent',
            value: null
        };
        this.bgHover = {
            variable: '@table-bg-hover',
            value: null
        };
        this.bgActive = {
            variable: '@table-bg-active',
            value: null
        };
        this.borderColor = {
            variable: '@table-border-color',
            value: null
        };
        
        this.modifiers = {
            cellPadding:            this.cellPadding,
            condensedCellPadding:   this.condensedCellPadding,
            bg:                     this.bg,
            accentBg:               this.bgAccent,
            hoverBg:                this.bgHover,
            activeBg:               this.bgActive,
            borderColor:            this.borderColor
        };
    };

    // Inherit from parent Prototype and preserve constructor
    Table.prototype = Object.create(ThemeModifier.prototype);
    Table.constructor = Table;

    /**
     * Gets the Table Cell Padding.
     * 
     * @returns {string}
     */
    Table.prototype.getCellPadding = function () {
        return this.modifiers.cellPadding.value;
    };

    /**
     * Sets the Table Cell Padding.
     * 
     * @param {string} cellPadding Sets the Table Cell Padding.
     * 
     * @returns {undefined}
     */
    Table.prototype.setCellPadding = function (cellPadding) {
        this.modifiers.cellPadding.value = cellPadding + 'px';
        this.editor.queueModifications();
    };

    /**
     * Gets the Table Condensed Cell Padding.
     * 
     * @returns {string}
     */
    Table.prototype.getCondensedCellPadding = function () {
        return this.modifiers.condensedCellPadding.value;
    };

    /**
     * Sets the Table Condensed Cell Padding.
     * 
     * @param {string} condensedCellPadding Sets the Table Condensed Cell Padding.
     * 
     * @returns {undefined}
     */
    Table.prototype.setCondensedCellPadding = function (condensedCellPadding) {
        this.modifiers.condensedCellPadding.value = condensedCellPadding + 'px';
        this.editor.queueModifications();
    };

    /**
	 * Gets the Table Background color.
	 * 
	 * @returns {String}
	 */
	Table.prototype.getBackground = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Table Background color.
	 * 
	 * @param {string} bg Sets the Table Background color.
	 * 
	 * @returns {undefined}
	 */
	Table.prototype.setBackground = function (bg) {
		this.modifiers.bg.value = bg;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Table Accent Background color.
	 * 
	 * @returns {String}
	 */
	Table.prototype.getAccentBackground = function () {
		return this.modifiers.accentBg.value;
	};

	/**
	 * Sets the Table Accent Background color.
	 * 
	 * @param {string} accentBg Sets the Table Accent Background color.
	 * 
	 * @returns {undefined}
	 */
	Table.prototype.setAccentBackground = function (accentBg) {
		this.modifiers.accentBg.value = accentBg;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Table Hover Background color.
	 * 
	 * @returns {String}
	 */
	Table.prototype.getHoverBackground = function () {
		return this.modifiers.hoverBg.value;
	};

	/**
	 * Sets the Table Hover Background color.
	 * 
	 * @param {string} hoverBg Sets the Table Hover Background color.
	 * 
	 * @returns {undefined}
	 */
	Table.prototype.setHoverBackground = function (hoverBg) {
		this.modifiers.hoverBg.value = hoverBg;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Table Active Background color.
	 * 
	 * @returns {String}
	 */
	Table.prototype.getActiveBackground = function () {
		return this.modifiers.activeBg.value;
	};

	/**
	 * Sets the Table Active Background color.
	 * 
	 * @param {string} activeBg Sets the Table Active Background color.
	 * 
	 * @returns {undefined}
	 */
	Table.prototype.setActiveBackground = function (activeBg) {
		this.modifiers.activeBg.value = activeBg;
		this.editor.queueModifications();
	};

    /**
     * Gets the Table Border Color.
     * 
     * @returns {String}
     */
    Table.prototype.getBorderColor = function () {
        return this.modifiers.borderColor.value;
    };

    /**
     * Sets the Table Border Color.
     * 
     * @param {string} borderColor Sets the Table Border Color.
     * 
     * @returns {undefined}
     */
    Table.prototype.setBorderColor = function (borderColor) {
        this.modifiers.borderColor.value = borderColor;
        this.editor.queueModifications();
    };

    window.Table = Table;
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
     * Allows modification of the General Button Component Styling.
     * 
     * @class ButtonBase
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
     * 
     * @property {string} fontWeight The @btn-font-weight variable which sets the Font weight of Button Components.
     * @property {string} disabledLinkColor The @btn-link-disabled-color variable which sets the Disabled Link color of Button Components.
     * 
     * @returns {ButtonBase}
     */
    var ButtonBase = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        // Configure the Modifiers
        this.fontWeight = {
            variable: '@btn-font-weight',
            value: null
        };
        this.disabledLinkColor = {
            variable: '@btn-link-disabled-color',
            value: null
        };

        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            fontWeight:         this.fontWeight,
            disabledLinkColor:  this.disabledLinkColor
        };
    };

    // Inherit from parent Prototype and preserve constructor
    ButtonBase.prototype = Object.create(ThemeModifier.prototype);
    ButtonBase.constructor = ButtonBase;

    /**
     * Gets the Font Weight of the Button Component.
     * 
     * @returns {string}
     */
    ButtonBase.prototype.getFontWeight = function () {
        return this.modifiers.fontWeight;
    };

    /**
     * Sets the Font Weight of the Button Component.
     * 
     * @param {string} buttonFontWeight The Button Font Weight to set.
     * 
     * @returns {undefined}
     */
    ButtonBase.prototype.setFontWeight = function (buttonFontWeight) {
        this.modifiers.fontWeight = buttonFontWeight;
        this.editor.queueModifications();
    };

    /**
     * Gets the Disabled Link Color of the Button Components.
     * 
     * @returns {string}
     */
    ButtonBase.prototype.getDisabledLinkColor = function () {
        return this.modifiers.disabledLinkColor;
    };

    /**
     * Gets the Disabled Link Color of the Button Components.
     * 
     * @param {string} disabledLinkColor The Button Disabled Link Color to set.
     * 
     * @returns {undefined}
     */
    ButtonBase.prototype.setDisabledLinkColor = function (disabledLinkColor) {
        this.modifiers.disabledLinkColor = disabledLinkColor;
        this.editor.queueModifications();
    };

    window.ButtonBase = ButtonBase;
})(window);


(function (window) {
    "use strict";

    /**
     * Allows modification of the General Label Component Styling.
     * 
     * @class LabelBase
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
     * 
     * @property {string} color The @label-color variable which sets the Color of Label Components.
     * @property {string} linkHoverColor The @label-link-hover-color variable which sets the Link Hover Color of Label Components.
     * @property {string} defaultBg The @label-default-bg variable which affects the Default label Background Color.
	 * @property {string} primaryBg The @label-primary-bg variable which affects the Primary label Background Color.
	 * @property {string} successBg The @label-success-bg variable which affects the Success label Background Color.
	 * @property {string} infoBg The @label-info-bg variable which affects the Info label Background Color.
	 * @property {string} warningBg The @label-warning-bg variable which affects the Warning label Background Color.
	 * @property {string} dangerBg The @label-danger-bg variable which affects the Danger label Background Color.
     * 
     * @returns {LabelBase}
     */
    var LabelBase = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        // Configure the Modifiers
        this.color = {
            variable: '@label-color',
            value: null
        };
        this.linkHoverColor = {
            variable: '@label-link-hover-color',
            value: null
        };
		this.defaultBg = {
			variable: '@label-default-bg',
			value: null
		};
		this.primaryBg = {
			variable: '@label-primary-bg',
			value: null
		};
		this.successBg = {
			variable: '@label-success-bg',
			value: null
		};
		this.infoBg = {
			variable: '@label-info-bg',
			value: null
		};
		this.warningBg = {
			variable: '@label-warning-bg',
			value: null
		};
		this.dangerBg = {
			variable: '@label-danger-bg',
			value: null
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
    };

    // Inherit from parent Prototype and preserve constructor
    LabelBase.prototype = Object.create(ThemeModifier.prototype);
    LabelBase.constructor = LabelBase;

    /**
     * Gets the Color of the Label Component.
     * 
     * @returns {string}
     */
    LabelBase.prototype.getColor = function () {
        return this.modifiers.color.value;
    };

    /**
     * Sets the Color of the Label Component.
     * 
     * @param {string} color The Label Color to set.
     * @returns {string}
     */
    LabelBase.prototype.setColor = function (color) {
        this.modifiers.color.value = color;
        this.editor.queueModifications();
    };

    /**
     * Gets the Link Hover Color of the Label Components.
     * 
     * @returns {string}
     */
    LabelBase.prototype.getLinkHoverColor = function () {
        return this.modifiers.linkHoverColor;
    };

    /**
     * Gets the Link Hover Color of the Label Components.
     * 
     * @param {string} linkHoverColor The Label Link Hover Color to set.
     * 
     * @returns {undefined}
     */
    LabelBase.prototype.setLinkHoverColor = function (linkHoverColor) {
        this.modifiers.linkHoverColor = linkHoverColor;
        this.editor.queueModifications();
    };

    /**
	 * Gets the Default Label Background Color.
	 * 
	 * @returns {undefined}
	 */
	LabelBase.prototype.getDefaultBackground = function () {
		return this.modifiers.defaultBg.value;
	};

	/**
	 * Sets the Default Label Background Color.
	 * 
	 * @param {string} color Sets the Default Label Background olor.
	 * 
	 * @returns {undefined}
	 */
	LabelBase.prototype.setDefaultBackground = function (color) {
		this.modifiers.defaultBg.value = color;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Primary Label Background Color.
	 * 
	 * @returns {string}
	 */
	LabelBase.prototype.getPrimaryBackground = function () {
		return this.modifiers.primaryBg.value;
	};

	/**
	 * Sets the Primary Label Background Color.
	 * 
	 * @param {string} color Sets the Primary Label Background Color.
	 * 
	 * @returns {undefined}
	 */
	LabelBase.prototype.setPrimaryBackground = function (color) {
		this.modifiers.primaryBg.value = color;
		this.editor.queueModifications();
	};

	/**
	 * gets the Success Label Background Color.
	 * 
	 * @returns {string}
	 */
	LabelBase.prototype.getSuccessBackground = function () {
		return this.modifiers.successBg.value;
	};

	/**
	 * Sets the Success Label Background Color.
	 * 
	 * @param {string} color Sets the Success Label Background Color.
	 * 
	 * @returns {undefined}
	 */
	LabelBase.prototype.setSuccessBackground = function (color) {
		this.modifiers.successBg.value = color;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Info Label Background Color.
	 * 
	 * @returns {string}
	 */
	LabelBase.prototype.getInfoBackground = function () {
		return this.modifiers.infoBg.value;
	};

	/**
	 * Sets the Info Label Background Color.
	 * 
	 * @param {string} color Sets the Info Label Background Color.
	 * 
	 * @returns {undefined}
	 */
	LabelBase.prototype.setInfoBackground = function (color) {
		this.modifiers.infoBg.value = color;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Warning Label Background Color.
	 * 
	 * @returns {string}
	 */
	LabelBase.prototype.getWarningBackground = function () {
		return this.modifiers.warningBg.value;
	};

	/**
	 * Sets the Warning Label Background Color.
	 * 
	 * @param {type} color Sets the Warning Label Background Color.
	 * 
	 * @returns {undefined}
	 */
	LabelBase.prototype.setWarningBackground = function (color) {
		this.modifiers.warningBg.value = color;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Danger Label Background Color.
	 * 
	 * @returns {string}
	 */
	LabelBase.prototype.getDangerBackground = function () {
		return this.modifiers.dangerBg.value;
	};

	/**
	 * Sets the Danger Label Background Color.
	 * 
	 * @param {string} color Sets the Danger Label Background Color.
	 * 
	 * @returns {undefined}
	 */
	LabelBase.prototype.setDangerBackground = function (color) {
		this.modifiers.dangerBg.value = color;
		this.editor.queueModifications();
	};
	
	window.LabelBase = LabelBase;
})(window);

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

(function (window) {
	"use strict";

	/**
	 * Allows modification of a Pagination component in Bootstrap.
	 * 
	 * @class Pagination
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} color The @pagination-color variable which controls the Color of the Pagination component.
	 * @property {object} bg The @pagination-bg variable which controls the Background Color of the Pagination component.
	 * @property {object} borderColor The @pagination-border variable which controls the Border Color of the Pagination component.
	 * @property {object} hoverColor The @pagination-hover-color variable which controls the Hover Color of the Pagination component.
	 * @property {object} hoverBg The @pagination-hover-bg variable which controls the Hover Background Color of the Pagination component.
	 * @property {object} hoverBorderColor The @pagination-hover-border variable which controls the Hover Border Color of the Pagination component.
	 * @property {object} activeColor The @pagination-active-color variable which controls the Active Color of the Pagination component.
	 * @property {object} activeBg The @pagination-active-bg variable which controls the Active Background Color of the Pagination component.
	 * @property {object} activeBorderColor The @pagination-active-border variable which controls the Active Border Color of the Pagination component.
	 * @property {object} disabledColor The @pagination-disabled-color variable which controls the Disabled Color of the Pagination component.
	 * @property {object} disabledBg The @pagination-disabled-bg variable which controls the Disabled Background Color of the Pagination component.
	 * @property {object} disabledBorderColor The @pagination-disabled-border variable which controls the Disabled Border Color of the Pagination component.
	 * 
	 * @returns {Pagination}
	 */
	var Pagination = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor
        
        this.color = {
            variable: '@pagination-color',
            value: null
        };
        this.bg = {
            variable: '@pagination-bg',
            value: null
        };
        this.borderColor = {
            variable: '@pagination-border',
            value: null
        };
        this.hoverColor = {
            variable: '@pagination-hover-color',
            value: null
        };
        this.hoverBg = {
            variable: '@pagination-hover-bg',
            value: null
        };
        this.hoverBorderColor = {
            variable: '@pagination-hover-border',
            value: null
        };
        this.activeColor = {
            variable: '@pagination-active-color',
            value: null
        };
        this.activeBg = {
            variable: '@pagination-active-bg',
            value: null
        };
        this.activeBorderColor = {
            variable: '@pagination-active-border',
            value: null
        };
        this.disabledColor = {
            variable: '@pagination-disabled-color',
            value: null
        };
        this.disabledBg = {
            variable: '@pagination-disabled-bg',
            value: null
        };
        this.disabledBorderColor = {
            variable: '@pagination-disabled-border',
            value: null
        };
        
        this.modifiers = {
            color:                  this.color,
            bg:                     this.bg,
            borderColor:            this.borderColor,
            hoverColor:             this.hoverColor,
            hoverBg:                this.hoverBg,
            hoverBorderColor:       this.hoverBorderColor,
            activeColor:            this.activeColor,
            activeBg:               this.activeBg,
            activeBorderColor:      this.activeBorderColor,
            disabledColor:          this.disabledColor,
            disabledBg:             this.disabledBg,
            disabledBorderColor:    this.disabledBorderColor
        };
    };

    // Inherit from parent Prototype and preserve constructor
	Pagination.prototype = Object.create(ThemeModifier.prototype);
	Pagination.constructor = Pagination;

    /**
	 * Gets the Color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getColor = function () {
		return this.modifiers.color.value;
	};

	/**
	 * Gets the Color of the Pagination Component.
	 * 
	 * @param {string} color Sets the Pagination Color.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setColor = function (color) {
		this.modifiers.color.value = color;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Background Color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getBackground = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background Color of the Pagination Component.
	 * 
	 * @param {string} bg Sets the Pagination Background Color.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setBackground = function (bg) {
		this.modifiers.bg.value = bg;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Border color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getBorderColor = function () {
		return this.modifiers.borderColor.value;
	};

	/**
	 * Sets the Border color of the Pagination Component.
	 * 
	 * @param {string} borderColor Sets the Pagination Border Color.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setBorderColor = function (borderColor) {
		this.modifiers.borderColor.value = borderColor;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Hover Color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getHoverColor = function () {
		return this.modifiers.hoverColor.value;
	};

	/**
	 * Gets the Hover Color of the Pagination Component.
	 * 
	 * @param {string} color Sets the Pagination Hover Color.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setHoverColor = function (hoverColor) {
		this.modifiers.hoverColor.value = hoverColor;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Background Hover Color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getHoverBackground = function () {
		return this.modifiers.hoverBg.value;
	};

	/**
	 * Sets the Background Hover Color of the Pagination Component.
	 * 
	 * @param {string} hoverBg Sets the Pagination Background Hover Color.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setHoverBackground = function (hoverBg) {
		this.modifiers.hoverBg.value = hoverBg;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Hover Border color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getHoverBorderColor = function () {
		return this.modifiers.hoverBorderColor.value;
	};

	/**
	 * Sets the Hover Border color of the Pagination Component.
	 * 
	 * @param {string} hoverBorderColor Sets the Pagination Border Hover Color.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setHoverBorderColor = function (hoverBorderColor) {
		this.modifiers.hoverBorderColor.value = hoverBorderColor;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Active Color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getActiveColor = function () {
		return this.modifiers.activeColor.value;
	};

	/**
	 * Gets the Active Color of the Pagination Component.
	 * 
	 * @param {string} color Sets the Pagination Active Color.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setActiveColor = function (activeColor) {
		this.modifiers.activeColor.value = activeColor;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Background Active Color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getActiveBackground = function () {
		return this.modifiers.activeBg.value;
	};

	/**
	 * Sets the Background Active Color of the Pagination Component.
	 * 
	 * @param {string} activeBg Sets the Pagination Background Active Color.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setActiveBackground = function (activeBg) {
		this.modifiers.activeBg.value = activeBg;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Active Border color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getActiveBorderColor = function () {
		return this.modifiers.activeBorderColor.value;
	};

	/**
	 * Sets the Active Border color of the Pagination Component.
	 * 
	 * @param {string} activeBorderColor Sets the Pagination Border Active Color.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setActiveBorderColor = function (activeBorderColor) {
		this.modifiers.activeBorderColor.value = activeBorderColor;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Disabled Color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getDisabledColor = function () {
		return this.modifiers.disabledColor.value;
	};

	/**
	 * Gets the Disabled Color of the Pagination Component.
	 * 
	 * @param {string} color Sets the Pagination Disabled Color.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setDisabledColor = function (disabledColor) {
		this.modifiers.disabledColor.value = disabledColor;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Background Disabled Color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getDisabledBackground = function () {
		return this.modifiers.disabledBg.value;
	};

	/**
	 * Sets the Background Disabled Color of the Pagination Component.
	 * 
	 * @param {string} disabledBg Sets the Pagination Background Disabled Color.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setDisabledBackground = function (disabledBg) {
		this.modifiers.disabledBg.value = disabledBg;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Disabled Border color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getDisabledBorderColor = function () {
		return this.modifiers.disabledBorderColor.value;
	};

	/**
	 * Sets the Disabled Border color of the Pagination Component.
	 * 
	 * @param {string} disabledBorderColor Sets the Pagination Border Disabled Color.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setDisabledBorderColor = function (disabledBorderColor) {
		this.modifiers.disabledBorderColor.value = disabledBorderColor;
		this.editor.queueModifications();
	};

    window.Pagination = Pagination;
})(window);

(function (window) {
	"use strict";

	/**
	 * Allows modification of a Pager component in Bootstrap.
	 * 
	 * @class Pager
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} bg The @pager-bg variable which controls the Background Color of the Pager component.
	 * @property {object} borderColor The @pager-border variable which controls the Border Color of the Pager component.
	 * @property {object} borderRadius The @pager-border-radius variable which controls the Border Radius of the Pager component.
	 * @property {object} hoverBg The @pager-hover-bg variable which controls the Hover Background Color of the Pager component.
	 * @property {object} activeColor The @pager-active-color variable which controls the Active Color of the Pager component.
	 * @property {object} activeBg The @pager-active-bg variable which controls the Active Background Color of the Pager component.
	 * @property {object} disabledColor The @pager-disabled-color variable which controls the Disabled Color of the Pager component.
	 * 
	 * @returns {Pager}
	 */
	var Pager = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor
        
        this.bg = {
            variable: '@pager-bg',
            value: null
        };
        this.borderColor = {
            variable: '@pager-border',
            value: null
        };
        this.borderRadius = {
            variable: '@pager-border-radius',
            value: null
        };
        this.hoverBg = {
            variable: '@pager-hover-bg',
            value: null
        };
        this.activeColor = {
            variable: '@pager-active-color',
            value: null
        };
        this.activeBg = {
            variable: '@pager-active-bg',
            value: null
        };
        this.disabledColor = {
            variable: '@pager-disabled-color',
            value: null
        };
        
        this.modifiers = {
            bg:             this.bg,
            borderColor:    this.borderColor,
            borderRadius:   this.borderRadius,
            hoverBg:        this.hoverBg,
            activeColor:    this.activeColor,
            activeBg:       this.activeBg,
            disabledColor:  this.disabledColor
        };
    };

    // Inherit from parent Prototype and preserve constructor
	Pager.prototype = Object.create(ThemeModifier.prototype);
	Pager.constructor = Pager;

    /**
	 * Gets the Background Color of the Pager Component.
	 * 
	 * @returns {string}
	 */
	Pager.prototype.getBackground = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background Color of the Pager Component.
	 * 
	 * @param {string} bg Sets the Pager Background Color.
	 * 
	 * @returns {undefined}
	 */
	Pager.prototype.setBackground = function (bg) {
		this.modifiers.bg.value = bg;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Border Color of the Pager Component.
	 * 
	 * @returns {string}
	 */
	Pager.prototype.getBorderColor = function () {
		return this.modifiers.borderColor.value;
	};

	/**
	 * Sets the Border Color of the Pager Component.
	 * 
	 * @param {string} borderColor Sets the Pager Border Color.
	 * 
	 * @returns {undefined}
	 */
	Pager.prototype.setBorderColor = function (borderColor) {
		this.modifiers.borderColor.value = borderColor;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Border Radius of the Pager Component.
	 * 
	 * @returns {string}
	 */
	Pager.prototype.getBorderRadius = function () {
		return this.modifiers.borderRadius.value;
	};

	/**
	 * Sets the Border Radius of the Pager Component.
	 * 
	 * @param {string} borderRadius Sets the Pager Border Radius.
	 * 
	 * @returns {undefined}
	 */
	Pager.prototype.setBorderRadius = function (borderRadius) {
		this.modifiers.borderRadius.value = borderRadius + 'px';
		this.editor.queueModifications();
	};

    /**
	 * Gets the Background Hover Color of the Pager Component.
	 * 
	 * @returns {string}
	 */
	Pager.prototype.getHoverBackground = function () {
		return this.modifiers.hoverBg.value;
	};

	/**
	 * Sets the Background Hover Color of the Pager Component.
	 * 
	 * @param {string} hoverBg Sets the Pager Background Hover Color.
	 * 
	 * @returns {undefined}
	 */
	Pager.prototype.setHoverBackground = function (hoverBg) {
		this.modifiers.hoverBg.value = hoverBg;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Active Color of the Pager Component.
	 * 
	 * @returns {string}
	 */
	Pager.prototype.getActiveColor = function () {
		return this.modifiers.activeColor.value;
	};

	/**
	 * Gets the Active Color of the Pager Component.
	 * 
	 * @param {string} color Sets the Pager Active Color.
	 * 
	 * @returns {undefined}
	 */
	Pager.prototype.setActiveColor = function (activeColor) {
		this.modifiers.activeColor.value = activeColor;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Background Active Color of the Pager Component.
	 * 
	 * @returns {string}
	 */
	Pager.prototype.getActiveBackground = function () {
		return this.modifiers.activeBg.value;
	};

	/**
	 * Sets the Background Active Color of the Pager Component.
	 * 
	 * @param {string} activeBg Sets the Pager Background Active Color.
	 * 
	 * @returns {undefined}
	 */
	Pager.prototype.setActiveBackground = function (activeBg) {
		this.modifiers.activeBg.value = activeBg;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Disabled Color of the Pager Component.
	 * 
	 * @returns {string}
	 */
	Pager.prototype.getDisabledColor = function () {
		return this.modifiers.disabledColor.value;
	};

	/**
	 * Gets the Disabled Color of the Pager Component.
	 * 
	 * @param {string} color Sets the Pager Disabled Color.
	 * 
	 * @returns {undefined}
	 */
	Pager.prototype.setDisabledColor = function (disabledColor) {
		this.modifiers.disabledColor.value = disabledColor;
		this.editor.queueModifications();
	};

    window.Pager = Pager;
})(window);

(function (window) {
	"use strict";

	/**
	 * Allows modification of the Form component in Bootstrap.
	 * 
	 * @class Form
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} inputBg The @input-bg variable which controls the Input Background Color of the Form component.
	 * @property {object} inputDisabledBg The @input-bg-disabled variable which controls the Input Disabled Background Color of the Form component.
	 * @property {object} inputColor The @input-color variable which controls the Input Color of the Form component.
	 * @property {object} inputBorderColor The @input-border variable which controls the Input Border Color of the Form component.
	 * @property {object} inputBorderRadius The @input-border-radius variable which controls the Input Border Radius of the Form component.
	 * @property {object} inputBorderFocusColor The @input-border-focus variable which controls the Input Border Focus Color of the Form component.
	 * @property {object} inputPlaceholderColor The @input-color-placeholder variable which controls the Input Placeholder Color of the Form component.
	 * @property {object} legendColor The @legend-color variable which controls the Legend Color of the Form component.
	 * @property {object} legendBorderColor The @legend-border-color variable which controls the Legend Border Color of the Form component.
	 * @property {object} inputGroupAddonBgColor The @input-group-addon-bg variable which controls the Input Group Addon Background Color of the Form component.
	 * @property {object} inputGroupAddonBorderColor The @input-group-addon-border-color variable which controls the Input Group Addon Border Color of the Form component.
	 * 
	 * @returns {Form}
	 */
	var Form = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        // Configure the Modifiers
		this.inputBg = {
			variable: '@input-bg',
			value: null
		};
		this.inputDisabledBg = {
			variable: '@input-bg-disabled',
			value: null
		};
		this.inputColor = {
			variable: '@input-color',
			value: null
		};
		this.inputBorderColor = {
			variable: '@input-border',
			value: null
		};
		this.inputBorderRadius = {
			variable: '@input-border-radius',
			value: null
		};
		this.inputBorderFocusColor = {
			variable: '@input-border-focus',
			value: null
		};
		this.inputPlaceholderColor = {
			variable: '@input-color-placeholder',
			value: null
		};
		this.legendColor = {
			variable: '@legend-color',
			value: null
		};
		this.legendBorderColor = {
			variable: '@legend-border-color',
			value: null
		};
		this.inputGroupAddonBgColor = {
			variable: '@input-group-addon-bg',
			value: null
		};
		this.inputGroupAddonBorderColor = {
			variable: '@input-group-addon-border-color',
			value: null
		};
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            inputBg:                    this.inputBg,
            inputDisabledBg:            this.inputDisabledBg,
            inputColor:                 this.inputColor,
            inputBorderColor:           this.inputBorderColor,
            inputBorderRadius:          this.inputBorderRadius,
            inputBorderFocusColor:      this.inputBorderFocusColor,
            inputPlaceholderColor:      this.inputPlaceholderColor,
            legendColor:                this.legendColor,
            legendBorderColor:          this.legendBorderColor,
            inputGroupAddonBgColor:     this.inputGroupAddonBgColor,
            inputGroupAddonBorderColor: this.inputGroupAddonBorderColor
        };
	};
	
	// Inherit from parent Prototype and preserve constructor
	Form.prototype = Object.create(ThemeModifier.prototype);
	Form.constructor = Form;

    /**
	 * Gets the Input Background Color of the Form Component.
	 * 
	 * @returns {String}
	 */
	Form.prototype.getInputBackgroundColor = function () {
		return this.modifiers.inputBg.value;
	};

	/**
	 * Sets the Input Background Color of the Form Component.
	 * 
	 * @param {string} inputBackgroundColor Sets the Input Background Color of the Form Component.
	 * 
	 * @returns {undefined}
	 */
	Form.prototype.setInputBackgroundColor = function (inputBackgroundColor) {
		this.modifiers.inputBg.value = inputBackgroundColor;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Disabled Background Color of the Form Component.
	 * 
	 * @returns {String}
	 */
	Form.prototype.getInputDisabledBackgroundColor = function () {
		return this.modifiers.inputDisabledBg.value;
	};

	/**
	 * Sets the Input Background Color of the Form Component.
	 * 
	 * @param {string} disabledInputBackgroundColor Sets the Input Background Color of the Form Component.
	 * 
	 * @returns {undefined}
	 */
	Form.prototype.setInputDisabledBackgroundColor = function (disabledInputBackgroundColor) {
		this.modifiers.inputDisabledBg.value = disabledInputBackgroundColor;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Input Color of the Form Component.
	 * 
	 * @returns {string}
	 */
	Form.prototype.getInputColor = function () {
		return this.modifiers.inputColor.value;
	};

	/**
	 * Sets the Input Color of the Form Component.
	 * 
	 * @param {string} inputColor Sets the Form Input Color.
	 * 
	 * @returns {undefined}
	 */
	Form.prototype.setInputColor = function (inputColor) {
		this.modifiers.inputColor.value = inputColor;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Input Border Color of the Form Component.
	 * 
	 * @returns {string}
	 */
	Form.prototype.getInputBorderColor = function () {
		return this.modifiers.inputBorderColor.value;
	};

	/**
	 * Sets the Input Border Color of the Form Component.
	 * 
	 * @param {string} inputBorderColor Sets the Form Input Border Color.
	 * 
	 * @returns {undefined}
	 */
	Form.prototype.setInputBorderColor = function (inputBorderColor) {
		this.modifiers.inputBorderColor.value = inputBorderColor;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Input Border Radius of the Form Component.
	 * 
	 * @returns {string}
	 */
	Form.prototype.getInputBorderRadius = function () {
		return this.modifiers.inputBorderRadius.value;
	};

	/**
	 * Sets the Input Border Radius of the Form Component.
	 * 
	 * @param {string} inputBorderRadius Sets the Form Input Border Radius.
	 * 
	 * @returns {undefined}
	 */
	Form.prototype.setInputBorderRadius = function (inputBorderRadius) {
		this.modifiers.inputBorderRadius.value = inputBorderRadius + 'px';
		this.editor.queueModifications();
	};

    /**
	 * Gets the Input Border Focus Color of the Form Component.
	 * 
	 * @returns {string}
	 */
	Form.prototype.getInputBorderFocusColor = function () {
		return this.modifiers.inputBorderFocusColor.value;
	};

	/**
	 * Sets the Input Border Focus Color of the Form Component.
	 * 
	 * @param {string} inputBorderFocusColor Sets the Form Input Border Focus Color.
	 * 
	 * @returns {undefined}
	 */
	Form.prototype.setInputBorderFocusColor = function (inputBorderFocusColor) {
		this.modifiers.inputBorderFocusColor.value = inputBorderFocusColor;
		this.editor.queueModifications();
	};

    /**
     * Gets the Input Placeholder Color of the Form Component.
     * 
     * @returns {string}
     */
    Form.prototype.getInputPlaceholderColor = function () {
        return this.modifiers.inputPlaceholderColor.value;
    };

    /**
     * Sets the Input Placeholder Color of the Form Component.
     * 
     * @param {string} inputPlaceholderColor Sets the Form Input Placeholder Color.
     * 
     * @returns {undefined}
     */
    Form.prototype.setInputPlaceholderColor = function (inputPlaceholderColor) {
        this.modifiers.inputPlaceholderColor.value = inputPlaceholderColor;
        this.editor.queueModifications();
    };

    /**
     * Gets the Legend Color of the Form Component.
     * 
     * @returns {string}
     */
    Form.prototype.getLegendColor = function () {
        return this.modifiers.legendColor.value;
    };

    /**
     * Sets the Legend Color of the Form Component.
     * 
     * @param {string} legendColor Sets the Form Legend Color.
     * 
     * @returns {undefined}
     */
    Form.prototype.setLegendColor = function (legendColor) {
        this.modifiers.legendColor.value = legendColor;
        this.editor.queueModifications();
    };

    /**
     * Gets the Legend Border Color of the Form Component.
     * 
     * @returns {string}
     */
    Form.prototype.getLegendBorderColor = function () {
        return this.modifiers.legendBorderColor.value;
    };

    /**
     * Sets the Legend Border Color of the Form Component.
     * 
     * @param {string} legendBorderColor Sets the Form Legend Border Color.
     * 
     * @returns {undefined}
     */
    Form.prototype.setLegendBorderColor = function (legendBorderColor) {
        this.modifiers.legendBorderColor.value = legendBorderColor;
        this.editor.queueModifications();
    };

    /**
     * Gets the Input Group Addon Background Color of the Form Component.
     * 
     * @returns {string}
     */
    Form.prototype.getInputGroupAddonBackgroundColor = function () {
        return this.modifiers.inputGroupAddonBgColor.value;
    };

    /**
     * Sets the Input Group Addon Background Color of the Form Component.
     * 
     * @param {string} inputGroupAddonBgColor Sets the Form Input Group Addon Background Color.
     * 
     * @returns {undefined}
     */
    Form.prototype.setInputGroupAddonBackgroundColor = function (inputGroupAddonBgColor) {
        this.modifiers.inputGroupAddonBgColor.value = inputGroupAddonBgColor;
        this.editor.queueModifications();
    };

    /**
     * Gets the Input Group Addon Border Color of the Form Component.
     * 
     * @returns {string}
     */
    Form.prototype.getInputGroupAddonBorderColor = function () {
        return this.modifiers.inputGroupAddonBorderColor.value;
    };

    /**
     * Sets the Input Group Addon Border Color of the Form Component.
     * 
     * @param {string} inputGroupAddonBorderColor Sets the Form Input Group Addon Border Color.
     * 
     * @returns {undefined}
     */
    Form.prototype.setInputGroupAddonBorderColor = function (inputGroupAddonBorderColor) {
        this.modifiers.inputGroupAddonBorderColor.value = inputGroupAddonBorderColor;
        this.editor.queueModifications();
    };

	window.Form = Form;
})(window);

(function (window) {
	"use strict";

	/**
	 * Allows modification of a Tabs component in Bootstrap.
	 * 
	 * @class Tabs
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} borderColor The @nav-tabs-border-color variable which controls the Border Color of the Tabs component.
	 * @property {object} linkHoverBorderColor The @nav-tabs-link-hover-border-color variable which controls the Link Hover Border Color of the Tabs component.
	 * @property {object} linkActiveHoverBg The @nav-tabs-active-link-hover-bg variable which controls the Link Active Hover Background Color of the Tabs component.
	 * @property {object} linkActiveHoverColor The @nav-tabs-active-link-hover-color variable which controls the Link Active Hover Color of the Tabs component.
	 * @property {object} linkActiveHoverBorderColor The @nav-tabs-active-link-hover-color variable which controls the Link Active Hover Border Color of the Tabs component.
	 * @property {object} linkJustifiedBorderColor The @nav-tabs-justified-link-border-color variable which controls the Link Justified Border Color of the Tabs component.
	 * @property {object} linkJustifiedActiveBorderColor The @nav-tabs-justified-active-link-border-color variable which controls the Link Justified Active Border Color of the Tabs component.
	 * 
	 * @returns {Tabs}
	 */
	var Tabs = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.borderColor = {
            variable: '@nav-tabs-border-color',
            value: null
        };
        this.linkHoverBorderColor = {
            variable: '@nav-tabs-link-hover-border-color',
            value: null
        };
        this.linkActiveHoverBg = {
            variable: '@nav-tabs-active-link-hover-bg',
            value: null
        };
        this.linkActiveHoverColor = {
            variable: '@nav-tabs-active-link-hover-color',
            value: null
        };
        this.linkActiveHoverBorderColor = {
            variable: '@nav-tabs-active-link-hover-border-color',
            value: null
        };
        this.linkJustifiedBorderColor = {
            variable: '@nav-tabs-justified-link-border-color',
            value: null
        };
        this.linkJustifiedActiveBorderColor = {
            variable: '@nav-tabs-justified-active-link-border-color',
            value: null
        };

        this.modifiers = {
            borderColor:                        this.borderColor,
            linkHoverBorderColor:               this.linkHoverBorderColor,
            linkActiveHoverBg:                  this.linkActiveHoverBg,
            linkActiveHoverColor:               this.linkActiveHoverColor,
            linkActiveHoverBorderColor:         this.linkActiveHoverBorderColor,
            linkJustifiedBorderColor:           this.linkJustifiedBorderColor,
            linkJustifiedActiveBorderColor:     this.linkJustifiedActiveBorderColor
        };
    };

    // Inherit from parent Prototype and preserve constructor
	Tabs.prototype = Object.create(ThemeModifier.prototype);
	Tabs.constructor = Tabs;

	/**
	 * Gets the Border Color of the Tabs Component.
	 * 
	 * @returns {string}
	 */
	Tabs.prototype.getBorderColor = function () {
		return this.modifiers.borderColor.value;
	};

	/**
	 * Sets the Border Color of the Tabs Component.
	 * 
	 * @param {string} borderColor Sets the Tab Border Color.
	 * 
	 * @returns {undefined}
	 */
	Tabs.prototype.setBorderColor = function (borderColor) {
		this.modifiers.borderColor.value = borderColor;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Link Hover Border Color of the Tabs Component.
	 * 
	 * @returns {string}
	 */
	Tabs.prototype.getLinkHoverBorderColor = function () {
		return this.modifiers.linkHoverBorderColor.value;
	};
	
	/**
	 * Sets the Link Hover Border Color of the Tabs Component.
	 * 
	 * @param {string} linkHoverBorderColor Sets the Link Hover Border Color.
	 * 
	 * @returns {undefined}
	 */
	Tabs.prototype.setLinkHoverBorderColor = function (linkHoverBorderColor) {
		this.modifiers.linkHoverBorderColor.value = linkHoverBorderColor;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Link Active Hover Background Color of the Tabs Component.
	 * 
	 * @returns {string}
	 */
	Tabs.prototype.getLinkActiveHoverBackgroundColor = function () {
		return this.modifiers.linkActiveHoverBg.value;
	};
	
	/**
	 * Sets the Link Active Hover Background Color of the Tabs Component.
	 * 
	 * @param {string} color Sets the Link Active Hover Background Color.
	 * 
	 * @returns {undefined}
	 */
	Tabs.prototype.setLinkActiveHoverBackgroundColor = function (linkActiveHoverBg) {
		this.modifiers.linkActiveHoverBg.value = linkActiveHoverBg;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Link Active Hover Color of the Tabs Component.
	 * 
	 * @returns {string}
	 */
	Tabs.prototype.getLinkActiveHoverColor = function () {
		return this.modifiers.linkActiveHoverColor.value;
	};
	
	/**
	 * Sets the Link Active Hover Color of the Tabs Component.
	 * 
	 * @param {string} linkActiveHoverColor Sets the Link Active Hover Color.
	 * 
	 * @returns {undefined}
	 */
	Tabs.prototype.setLinkActiveHoverColor = function (linkActiveHoverColor) {
		this.modifiers.linkActiveHoverColor.value = linkActiveHoverColor;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Link Active Hover Border Color of the Tabs Component.
	 * 
	 * @returns {string}
	 */
	Tabs.prototype.getLinkActiveHoverBorderColor = function () {
		return this.modifiers.linkActiveHoverBorderColor.value;
	};
	
	/**
	 * Sets the Link Active Hover Border Color of the Tabs Component.
	 * 
	 * @param {string} linkActiveHoverBorderColor Sets the Link Active Hover Border Color.
	 * 
	 * @returns {undefined}
	 */
	Tabs.prototype.setLinkActiveHoverBorderColor = function (linkActiveHoverBorderColor) {
		this.modifiers.linkActiveHoverBorderColor.value = linkActiveHoverBorderColor;
		this.editor.queueModifications();
	};

    /**
     * Gets the Link Justified Border Color of the Tabs Component.
     * 
     * @returns {string}
     */
    Tabs.prototype.getLinkJustifiedBorderColor = function () {
        return this.modifiers.linkJustifiedBorderColor.value;
    };

    /**
     * Sets the Link Justified Border Color of the Tabs Component.
     * 
     * @param {string} linkJustifiedBorderColor Sets the Link Justified Border Color.
     * 
     * @returns {string}
     */
    Tabs.prototype.setLinkJustifiedBorderColor = function (linkJustifiedBorderColor) {
        this.modifiers.linkJustifiedBorderColor.value = linkJustifiedBorderColor;
        this.editor.queueModifications();
    };

    /**
     * Gets the Link Justified Active Border Color of the Tabs Component.
     * 
     * @returns {string}
     */
    Tabs.prototype.getLinkJustifiedActiveBorderColor = function () {
        return this.modifiers.linkJustifiedActiveBorderColor.value;
    };

    /**
     * Sets the Link Justified Active Border Color of the Tabs Component.
     * 
     * @param {string} linkJustifiedActiveBorderColor Sets the Link Justified Active Border Color.
     * 
     * @returns {string}
     */
    Tabs.prototype.setLinkJustifiedActiveBorderColor = function (linkJustifiedActiveBorderColor) {
        this.modifiers.linkJustifiedActiveBorderColor.value = linkJustifiedActiveBorderColor;
        this.editor.queueModifications();
    };

    window.Tabs = Tabs;
})(window);

(function (window) {
	"use strict";

	/**
	 * Allows modification of a Pills component in Bootstrap.
	 * 
	 * @class Pills
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} borderRadius The @nav-pills-border-radius variable which controls the Border Radius of the Pills component.
	 * @property {object} linkActiveHoverBg The @nav-pills-active-link-hover-bg variable which controls the Link Active Hover Background Color of the Pills component.
	 * @property {object} linkActiveHoverColor The @nav-pills-active-link-hover-color variable which controls the Link Active Hover Color of the Pills component.
	 * 
	 * @returns {Pills}
	 */
	var Pills = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.borderRadius = {
            variable: '@nav-pills-border-radius',
            value: null
        };
        this.linkActiveHoverBg = {
            variable: '@nav-pills-active-link-hover-bg',
            value: null
        };
        this.linkActiveHoverColor = {
            variable: '@nav-pills-active-link-hover-color',
            value: null
        };

        this.modifiers = {
            borderRadius:           this.borderRadius,
            linkActiveHoverBg:      this.linkActiveHoverBg,
            linkActiveHoverColor:   this.linkActiveHoverColor
        };
    };

    // Inherit from parent Prototype and preserve constructor
	Pills.prototype = Object.create(ThemeModifier.prototype);
	Pills.constructor = Pills;

	/**
	 * Gets the Border Radius of the Pills Component.
	 * 
	 * @returns {string}
	 */
	Pills.prototype.getBorderRadius = function () {
		return this.modifiers.borderRadius.value;
	};

	/**
	 * Sets the Border Radius of the Pills Component.
	 * 
	 * @param {string} borderRadius Sets the Pill Border Radius.
	 * 
	 * @returns {undefined}
	 */
	Pills.prototype.setBorderRadius = function (borderRadius) {
		this.modifiers.borderRadius.value = borderRadius + 'px';
		this.editor.queueModifications();
	};

    /**
	 * Gets the Link Active Hover Background Color of the Pills Component.
	 * 
	 * @returns {string}
	 */
	Pills.prototype.getLinkActiveHoverBackgroundColor = function () {
		return this.modifiers.linkActiveHoverBg.value;
	};
	
	/**
	 * Sets the Link Active Hover Background Color of the Pills Component.
	 * 
	 * @param {string} color Sets the Link Active Hover Background Color.
	 * 
	 * @returns {undefined}
	 */
	Pills.prototype.setLinkActiveHoverBackgroundColor = function (linkActiveHoverBg) {
		this.modifiers.linkActiveHoverBg.value = linkActiveHoverBg;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Link Active Hover Color of the Pills Component.
	 * 
	 * @returns {string}
	 */
	Pills.prototype.getLinkActiveHoverColor = function () {
		return this.modifiers.linkActiveHoverColor.value;
	};
	
	/**
	 * Sets the Link Active Hover Color of the Pills Component.
	 * 
	 * @param {string} linkActiveHoverColor Sets the Link Active Hover Color.
	 * 
	 * @returns {undefined}
	 */
	Pills.prototype.setLinkActiveHoverColor = function (linkActiveHoverColor) {
		this.modifiers.linkActiveHoverColor.value = linkActiveHoverColor;
		this.editor.queueModifications();
	};

    window.Pills = Pills;
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
	 * @property {string} warning The @brand-warning variable which affects the warning styles.
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
	 * @param {string} color Sets the Default color.
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
	 * Allows modifications of the Tooltip component styling in Bootstrap.
	 * 
	 * @class Tooltip
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} maxWidth The @tooltip-max-width variable which sets the Max Width of the Tooltip component.
	 * @property {object} bg The @tooltip-bg variable which sets the Background of the Tooltip component.
	 * @property {object} color The @tooltip-color variable which sets the Color of the Tooltip component.
	 * @property {object} opacity The @tooltip-opacity variable which sets the Opacity of the Tooltip component.
	 * @property {object} arrowWidth The @tooltip-arrow-width variable which sets the Arrow Width of the Tooltip component.
	 * @property {object} arrowColor The @tooltip-arrow-color variable which sets the Arrow Color of the Tooltip component.
	 * 
	 * @returns {Tooltip}
	 */
	var Tooltip = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor
		
        // Configure the Modifiers
        this.maxWidth = {
            variable: '@tooltip-max-width',
            value: null
        };
		this.bg = {
			variable: '@tooltip-bg',
			value: null
		};
		this.color = {
			variable: '@tooltip-color',
			value: null
		};
        this.opacity = {
            variable: '@tooltip-opacity',
            value: null
        };
        this.arrowWidth = {
            variable: '@tooltip-arrow-width',
            value: null
        };
        this.arrowColor = {
            variable: '@tooltip-arrow-color',
            value: null
        };
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            maxWidth:   this.maxWidth,
            bg:         this.bg,
            color:      this.color,
            opacity:    this.opacity,
            arrowWidth: this.arrowWidth,
            arrowColor: this.arrowColor
        };
	};
	
	// Inherit from parent Prototype and preserve constructor
	Tooltip.prototype = Object.create(ThemeModifier.prototype);
	Tooltip.constructor = Tooltip;

    /**
     * Gets the Max Width of the Tooltip Components.
     * 
     * @returns {string}
     */
    Tooltip.prototype.getMaxWidth = function () {
        return this.modifiers.maxWidth.value;
    };

    /**
     * Sets the Max Width of the Tooltip Components.
     * 
     * @param {string} maxWidth Sets the Tooltip Max Width.
     * @returns {undefined}
     */
    Tooltip.prototype.setMaxWidth = function (maxWidth) {
        this.modifiers.maxWidth.value = maxWidth + 'px';
        this.editor.queueModifications();
    };

	/**
	 * Gets the Background of the Tooltip Component.
	 * 
	 * @returns {string}
	 */
	Tooltip.prototype.getBackground = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background of the Tooltip Component.
	 * 
	 * @param {string} color The color to set the Background.
	 * 
	 * @returns {undefined}
	 */
	Tooltip.prototype.setBackground = function (color) {
		this.modifiers.bg.value = color;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Background of the Tooltip Component.
	 * 
	 * @returns {string}
	 */
	Tooltip.prototype.getColor = function () {
		return this.modifiers.color.value;
	};

	/**
	 * Sets the Text color of the Tooltip Component.
	 * 
	 * @param {string} color The color to set the text of the Tooltip Component.
	 * 
	 * @returns {undefined}
	 */
	Tooltip.prototype.setColor = function (color) {
		this.modifiers.color.value = color;
		this.editor.queueModifications();
	};

    /**
     * Gets the Opacity of the Tooltip Component.
     * 
     * @returns {string}
     */
    Tooltip.prototype.getOpacity = function () {
        return this.modifiers.opacity.value;
    };

    /**
     * Sets the Opacity of the Tooltip Component.
     * 
     * @param {string} opacity Sets the Tooltip Opacity.
     * 
     * @returns {string}
     */
    Tooltip.prototype.setOpacity = function (opacity) {
        this.modifiers.opacity.value = opacity;
        this.editor.queueModifications();
    };
    
    /**
     * Gets the Arrow Width of the Tooltip Component.
     * 
     * @returns {string}
     */
    Tooltip.prototype.getArrowWidth = function () {
        return this.modifiers.arrowWidth.value;
    };
    
    /**
     * Sets the Arrow Width of the Tooltip Component.
     * 
     * @param {string} arrow Sets the Tooltip Arrow.
     * 
     * @returns {undefined}
     */
    Tooltip.prototype.setArrowWidth = function (arrowWidth) {
        this.modifiers.arrowWidth.value = arrowWidth + 'px';
        this.editor.queueModifications();
    };
    
    /**
     * Gets the Arrow Color of the Tooltip Component.
     * 
     * @returns {string}
     */
    Tooltip.prototype.getArrowColor = function () {
        return this.modifiers.arrowColor.value;
    };
    
    /**
     * Sets the Arrow Color of the Tooltip Component.
     * 
     * @param {string} arrowColor Sets the Tooltip Arrow.
     * 
     * @returns {undefined}
     */
    Tooltip.prototype.setArrowColor = function (arrowColor) {
        this.modifiers.arrowColor.value = arrowColor;
        this.editor.queueModifications();
    };

	window.Tooltip = Tooltip;
})(window);

(function (window) {
	"use strict";

	/**
	 * Allows modifications of the Popover component styling in Bootstrap.
	 * 
	 * @class Popover
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
     * @property {object} bg The @popover-bg variable which sets the Background of the Popover component.
	 * @property {object} maxWidth The @popover-max-width variable which sets the Max Width of the Popover component.
	 * @property {object} borderColor The @popover-border-color variable which sets the Border Color of the Popover component.
	 * @property {object} fallbackBorderColor The @popover-fallback-border-color variable which sets the Fallback Border Color of the Popover component.
	 * @property {object} titleBg The @popover-title-bg variable which sets the Title Background Color of the Popover component.
	 * @property {object} arrowWidth The @popover-arrow-width variable which sets the Arrow Width of the Popover component.
	 * @property {object} arrowColor The @popover-arrow-color variable which sets the Arrow Color of the Popover component.
	 * @property {object} arrowOuterWidth The @popover-arrow-outer-width variable which sets the Arrow Outer Width of the Popover component.
	 * @property {object} arrowOuterColor The @popover-arrow-outer-color variable which sets the Arrow Outer Color of the Popover component.
	 * @property {object} arrowOuterFallbackColor The @popover-arrow-outer-fallback-color variable which sets the Arrow Outer Fallback Color of the Popover component.
	 * 
	 * @returns {Popover}
	 */
	var Popover = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor
		
        // Configure the Modifiers
        this.bg = {
			variable: '@popover-bg',
			value: null
		};
        this.maxWidth = {
            variable: '@popover-max-width',
            value: null
        };
        this.borderColor = {
            variable: '@popover-border-color',
            value: null
        };
        this.fallbackBorderColor = {
            variable: '@popover-fallback-border-color',
            value: null
        };
        this.titleBg = {
            variable: '@popover-title-bg',
            value: null
        };
        this.arrowWidth = {
            variable: '@popover-arrow-width',
            value: null
        };
        this.arrowColor = {
            variable: '@popover-arrow-color',
            value: null
        };
        this.arrowOuterWidth = {
            variable: '@popover-arrow-outer-width',
            value: null
        };
        this.arrowOuterColor = {
            variable: '@popover-arrow-outer-color',
            value: null
        };
        this.arrowOuterFallbackColor = {
            variable: '@popover-arrow-outer-fallback-color',
            value: null
        };
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            bg:                         this.bg,
            maxWidth:                   this.maxWidth,
            borderColor:                this.borderColor,
            fallbackBorderColor:        this.fallbackBorderColor,
            titleBg:                    this.titleBg,
            arrowWidth:                 this.arrowWidth,
            arrowColor:                 this.arrowColor,
            arrowOuterWidth:            this.arrowOuterWidth,
            arrowOuterColor:            this.arrowOuterColor,
            arrowOuterFallbackColor:    this.arrowOuterFallbackColor
        };
	};
	
	// Inherit from parent Prototype and preserve constructor
	Popover.prototype = Object.create(ThemeModifier.prototype);
	Popover.constructor = Popover;

	/**
	 * Gets the Background of the Popover Component.
	 * 
	 * @returns {string}
	 */
	Popover.prototype.getBackground = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background of the Popover Component.
	 * 
	 * @param {string} color The color to set the Background.
	 * 
	 * @returns {undefined}
	 */
	Popover.prototype.setBackground = function (color) {
		this.modifiers.bg.value = color;
		this.editor.queueModifications();
	};

/**
     * Gets the Max Width of the Popover Components.
     * 
     * @returns {string}
     */
    Popover.prototype.getMaxWidth = function () {
        return this.modifiers.maxWidth.value;
    };

    /**
     * Sets the Max Width of the Popover Components.
     * 
     * @param {string} maxWidth Sets the Popover Max Width.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setMaxWidth = function (maxWidth) {
        this.modifiers.maxWidth.value = maxWidth + 'px';
        this.editor.queueModifications();
    };
    
    /**
     * Gets the Border Color of the Popover Component.
     * 
     * @returns {string}
     */
    Popover.prototype.getBorderColor = function () {
        return this.modifiers.borderColor.value;
    };

    /**
     * Sets the Border Color of the Popover Component.
     * 
     * @param {string} borderColor Sets the Popover Border Color.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setBorderColor = function (borderColor) {
        this.modifiers.borderColor.value = borderColor;
        this.editor.queueModifications();
    };
    
    /**
     * Gets the Fallback Border Color of the Popover Component.
     * 
     * @returns {string}
     */
    Popover.prototype.getFallbackBorderColor = function () {
        return this.modifiers.fallbackBorderColor.value;
    };

    /**
     * Sets the Fallback Border Color of the Popover Component.
     * 
     * @param {string} fallbackBorderColor Sets the Popover Fallback Border Color.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setFallbackBorderColor = function (fallbackBorderColor) {
        this.modifiers.fallbackBorderColor.value = fallbackBorderColor;
        this.editor.queueModifications();
    };

    /**
     * Gets the Title Background Color of the Popover Component.
     * 
     * @returns {String}
     */
    Popover.prototype.getTitleBackgroundColor = function () {
        return this.modifiers.titleBg.value;
    };
    
    /**
     * Sets the Title Background Color of the Popover Component.
     * 
     * @param {string} titleBg Sets the Popover Title Background Color.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setTitleBackgroundColor = function (titleBg) {
        this.modifiers.titleBg.value = titleBg;
        this.editor.queueModifications();
    };

    /**
     * Gets the Arrow Width of the Popover Component.
     * 
     * @returns {string}
     */
    Popover.prototype.getArrowWidth = function () {
        return this.modifiers.arrowWidth.value;
    };
    
    /**
     * Sets the Arrow Width of the Popover Component.
     * 
     * @param {string} arrow Sets the Popover Arrow Width.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setArrowWidth = function (arrowWidth) {
        this.modifiers.arrowWidth.value = arrowWidth + 'px';
        this.editor.queueModifications();
    };
    
    /**
     * Gets the Arrow Color of the Popover Component.
     * 
     * @returns {string}
     */
    Popover.prototype.getArrowColor = function () {
        return this.modifiers.arrowColor.value;
    };
    
    /**
     * Sets the Arrow Color of the Popover Component.
     * 
     * @param {string} arrowColor Sets the Popover Arrow Color.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setArrowColor = function (arrowColor) {
        this.modifiers.arrowColor.value = arrowColor;
        this.editor.queueModifications();
    };

    /**
     * Gets the Arrow Outer Width of the Popover Component.
     * 
     * @returns {string}
     */
    Popover.prototype.getArrowOuterWidth = function () {
        return this.modifiers.arrowOuterWidth.value;
    };
    
    /**
     * Sets the Arrow Outer Width of the Popover Component.
     * 
     * @param {string} arrow Sets the Popover Arrow Outer Width.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setArrowOuterWidth = function (arrowOuterWidth) {
        this.modifiers.arrowOuterWidth.value = arrowOuterWidth + 'px';
        this.editor.queueModifications();
    };
    
    /**
     * Gets the Arrow Outer Color of the Popover Component.
     * 
     * @returns {string}
     */
    Popover.prototype.getArrowOuterColor = function () {
        return this.modifiers.arrowOuterColor.value;
    };
    
    /**
     * Sets the Arrow Outer Color of the Popover Component.
     * 
     * @param {string} arrowOuterColor Sets the Popover Outer Arrow Color.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setArrowOuterColor = function (arrowOuterColor) {
        this.modifiers.arrowOuterColor.value = arrowOuterColor;
        this.editor.queueModifications();
    };
    
    /**
     * Gets the Arrow Outer Fallback Color of the Popover Component.
     * 
     * @returns {string}
     */
    Popover.prototype.getArrowOuterFallbackColor = function () {
        return this.modifiers.arrowOuterFallbackColor.value;
    };
    
    /**
     * Sets the Arrow Outer Fallback Color of the Popover Component.
     * 
     * @param {string} arrowOuterFallbackColor Sets the Popover Outer Arrow Color.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setArrowOuterFallbackColor = function (arrowOuterFallbackColor) {
        this.modifiers.arrowOuterFallbackColor.value = arrowOuterFallbackColor;
        this.editor.queueModifications();
    };

	window.Popover = Popover;
})(window);

(function (window) {
	"use strict";

	/**
	 * Allows modifications of the Thumbnail component styling in Bootstrap.
	 * 
	 * @class Thumbnail
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} padding The @thumbnail-padding variable which sets the Padding of the Thumbnail Component.
	 * @property {object} bg The @thumbnail-bg variable which sets the Background Color of the Thumbnail Component.
	 * @property {object} borderColor The @thumbnail-border-color variable which sets the Border Color of the Thumbnail Component.
	 * @property {object} borderRadius The @thumbnail-border-radius variable which sets the Border Radius of the Thumbnail Component.
	 * @property {object} captionColor The @thumbnail-caption-color variable which sets the Caption Color of the Thumbnail Component.
	 * @property {object} captionPadding The @thumbnail-caption-padding variable which sets the Caption Padding of the Thumbnail Component.
	 * 
	 * @returns {Thumbnail}
	 */
	var Thumbnail = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor
		
        // Configure the Modifiers
        this.padding = {
            variable: '@thumbnail-padding',
            value: null
        };
		this.bg = {
			variable: '@thumbnail-bg',
			value: null
		};
		this.borderColor = {
			variable: '@thumbnail-border',
			value: null
		};
		this.borderRadius = {
			variable: '@thumbnail-border-radius',
			value: null
		};
        this.captionColor = {
            variable: '@thumbnail-caption-color',
            value: null
        };
        this.captionPadding = {
            variable: '@thumbnail-caption-padding',
            value: null
        };
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            padding:        this.padding,
            bg:             this.bg,
            borderColor:    this.borderColor,
            borderRadius:   this.borderRadius,
            captionColor:   this.captionColor,
            captionPadding: this.captionPadding
        };
	};
	
	// Inherit from parent Prototype and preserve constructor
	Thumbnail.prototype = Object.create(ThemeModifier.prototype);
	Thumbnail.constructor = Thumbnail;

	/**
	 * Gets the Padding of the Thumbnail Component.
	 * 
	 * @returns {string}
	 */
	Thumbnail.prototype.getPadding = function () {
		return this.modifiers.padding.value;
	};

	/**
	 * Sets the Padding of the Thumbnail Component.
	 * 
	 * @param {string} color Sets the Thumbnail Padding.
	 * 
	 * @returns {undefined}
	 */
	Thumbnail.prototype.setPadding = function (color) {
		this.modifiers.padding.value = color + 'px';
		this.editor.queueModifications();
	};

	/**
	 * Gets the Background Color of the Thumbnail Component.
	 * 
	 * @returns {string}
	 */
	Thumbnail.prototype.getBackgroundColor = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background Color of the Thumbnail Component.
	 * 
	 * @param {string} bgColor Sets the Thumbnail Background Color.
	 * 
	 * @returns {undefined}
	 */
	Thumbnail.prototype.setBackgroundColor = function (bgColor) {
		this.modifiers.bg.value = bgColor;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Border Color of the Thumbnail Component.
	 * 
	 * @returns {string}
	 */
	Thumbnail.prototype.getBorderColor = function () {
		return this.modifiers.borderColor.value;
	};

	/**
	 * Sets the Border Color of the Thumbnail Component.
	 * 
	 * @param {string} borderColor Sets the Thumbnail Border Color.
	 * 
	 * @returns {undefined}
	 */
	Thumbnail.prototype.setBorderColor = function (borderColor) {
		this.modifiers.borderColor.value = borderColor;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Border Radius of the Thumbnail Component.
	 * 
	 * @returns {string}
	 */
	Thumbnail.prototype.getBorderRadius = function () {
		return this.modifiers.borderRadius.value;
	};

	/**
	 * Sets the Border Radius of the Thumbnail Component.
	 * 
	 * @param {string} borderRadius Sets the Thumbnail Border Radius.
	 * 
	 * @returns {undefined}
	 */
	Thumbnail.prototype.setBorderRadius = function (borderRadius) {
		this.modifiers.borderRadius.value = borderRadius;
		this.editor.queueModifications();
	};

    /**
     * Gets the Caption Color of the Thumbnail Component.
     * 
     * @returns {string}
     */
    Thumbnail.prototype.getCaptionColor = function () {
        return this.modifiers.captionColor.value;
    };

    /**
     * Sets the Caption Color of the Thumbnail Components.
     * 
     * @param {string} captionColor Sets the Thumbnail Caption Color.
     * 
     * @returns {undefined}
     */
    Thumbnail.prototype.setCaptionColor = function (captionColor) {
        this.modifiers.captionColor.value = captionColor;
        this.editor.queueModifications();
    };

    /**
     * Gets the Caption Padding of the Thumbnail Component.
     * 
     * @returns {string}
     */
    Thumbnail.prototype.getCaptionPadding = function () {
        return this.modifiers.captionPadding.value;
    };

    /**
     * Sets the Caption Padding of the Thumbnail Components.
     * 
     * @param {string} captionPadding Sets the Thumbnail Caption Padding.
     * 
     * @returns {undefined}
     */
    Thumbnail.prototype.setCaptionPadding = function (captionPadding) {
        this.modifiers.captionPadding.value = captionPadding + 'px';
        this.editor.queueModifications();
    };

	window.Thumbnail = Thumbnail;
})(window);

(function (window) {
	"use strict";

	/**
	 * Allows modification of a Badge component in Bootstrap.
	 * 
	 * @class Badge
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} color The @badge-color variable which controls the Color of the Badge component.
	 * @property {object} linkHoverColor The @badge-link-hover-color variable which controls the Link Hover Color of the Badge component.
	 * @property {object} bg The @badge-bg variable which controls the Background Color of the Badge component.
	 * @property {object} activeColor The @badge-active-color variable which controls the Active Color of the Badge component.
	 * @property {object} activeBg The @badge-active-bg variable which controls the Active Background Color of the Badge component.
	 * @property {object} fontWeight The @badge-font-weight variable which controls the Font Weight of the Badge component.
	 * @property {object} lineHeight The @badge-line-height variable which controls the Line Height of the Badge component.
	 * @property {object} borderRadius The @badge-border-radius variable which controls the Border Radius of the Badge component.
	 * 
	 * @returns {Badge}
	 */
	var Badge = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        // Configure the Modifiers
		this.color = {
			variable: '@badge-color',
			value: null
		};
        this.linkHoverColor = {
			variable: '@badge-link-hover-color',
			value: null
		};
        this.bg = {
			variable: '@badge-bg',
			value: null
        };
		this.activeColor = {
			variable: '@badge-active-color',
			value: null
		};
		this.activeBg = {
			variable: '@badge-active-bg',
			value: null
		};
		this.fontWeight = {
			variable: '@badge-font-weight',
			value: null
		};
		this.lineHeight = {
			variable: '@badge-line-height',
			value: null
		};
		this.borderRadius = {
			variable: '@badge-border-radius',
			value: null
		};
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            color:          this.color,
            linkHoverColor: this.linkHoverColor,
            bg:             this.bg,
            activeColor:    this.activeColor,
            activeBg:       this.activeBg,
            fontWeight:     this.fontWeight,
            lineHeight:     this.lineHeight,
            borderRadius:   this.borderRadius
        };
	};
	
	// Inherit from parent Prototype and preserve constructor
	Badge.prototype = Object.create(ThemeModifier.prototype);
	Badge.constructor = Badge;

    /**
	 * Gets the Color of the Badge Component.
	 * 
	 * @returns {string}
	 */
	Badge.prototype.getColor = function () {
		return this.modifiers.color.value;
	};

	/**
	 * Sets the Color of the Badge Component.
	 * 
	 * @param {string} color Sets the Color.
	 * 
	 * @returns {undefined}
	 */
	Badge.prototype.setColor = function (color) {
		this.modifiers.color.value = color;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Link Hover Color of the Badge Component.
	 * 
	 * @returns {string}
	 */
	Badge.prototype.getLinkHoverColor = function () {
		return this.modifiers.linkHoverColor.value;
	};
	
	/**
	 * Sets the Link Hover Color of the Badge Component.
	 * 
	 * @param {string} linkHoverColor Sets the Link Hover Color.
	 * 
	 * @returns {undefined}
	 */
	Badge.prototype.setLinkHoverColor = function (linkHoverColor) {
		this.modifiers.linkHoverColor.value = linkHoverColor;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Background Color of the Badge Component.
	 * 
	 * @returns {String}
	 */
	Badge.prototype.getBackgroundColor = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background Color of the Badge Component.
	 * 
	 * @param {string} backgroundColor Sets the Background Color of the Badge Component.
	 * 
	 * @returns {undefined}
	 */
	Badge.prototype.setBackgroundColor = function (backgroundColor) {
		this.modifiers.bg.value = backgroundColor;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Active Color of the Badge Component.
	 * 
	 * @returns {string}
	 */
	Badge.prototype.getActiveColor = function () {
		return this.modifiers.activeColor.value;
	};

	/**
	 * Sets the Active Color of the Badge Component.
	 * 
	 * @param {string} activeColor Sets the Badge Active Color.
	 * 
	 * @returns {undefined}
	 */
	Badge.prototype.setActiveColor = function (activeColor) {
		this.modifiers.activeColor.value = activeColor;
		this.editor.queueModifications();
    };

	/**
	 * Gets the Active Background Color of the Badge Component.
	 * 
	 * @returns {string}
	 */
	Badge.prototype.getActiveBackgroundColor = function () {
		return this.modifiers.activeBg.value;
	};

	/**
	 * Sets the Active BackgroundColor of the Badge Component.
	 * 
	 * @param {string} activeBg Sets the Badge Active Background Color.
	 * 
	 * @returns {undefined}
	 */
	Badge.prototype.setActiveBackgroundColor = function (activeBg) {
		this.modifiers.activeBg.value = activeBg;
		this.editor.queueModifications();
    };

    /**
     * Gets the Font Weight of the Badge Component.
     * 
     * @returns {string}
     */
    Badge.prototype.getFontWeight = function () {
        return this.modifiers.fontWeight.value;
    };

    /**
     * Sets the Font Weight of the Badge Component.
     * 
     * @param {string} fontWeight Sets the Badge Font Weight.
     * 
     * @returns {undefined}
     */
    Badge.prototype.setFontWeight = function (fontWeight) {
        this.modifiers.fontWeight.value = fontWeight;
        this.editor.queueModifications();
    };

    /**
     * Gets the Line Height of the Badge Component.
     * 
     * @returns {string}
     */
    Badge.prototype.getLineHeight = function () {
        return this.modifiers.lineHeight.value;
    };

    /**
     * Sets the Line Height of the Badge Component.
     * 
     * @param {string} lineHeight Sets the Badge Line Height.
     * 
     * @returns {undefined}
     */
    Badge.prototype.setLineHeight = function (lineHeight) {
        this.modifiers.lineHeight.value = lineHeight;
        this.editor.queueModifications();
    };

    /**
     * Gets the Border Radius of the Badge Component.
     * 
     * @returns {string}
     */
    Badge.prototype.getBorderRadius = function () {
        return this.modifiers.borderRadius.value;
    };

    /**
     * Sets the Border Radius of the Badge Component.
     * 
     * @param {string} borderRadius Sets the Badge Border Radius.
     * 
     * @returns {undefined}
     */
    Badge.prototype.setBorderRadius = function (borderRadius) {
        this.modifiers.borderRadius.value = borderRadius + 'px';
        this.editor.queueModifications();
    };

	window.Badge = Badge;
})(window);

(function (window) {
	"use strict";

	/**
	 * Allows modification of a Carousel component in Bootstrap.
	 * 
	 * @class Carousel
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} controlColor The @carousel-control-color variable which controls the Control Color of the Carousel component.
	 * @property {object} controlWidth The @carousel-control-width variable which controls the Control Width of the Carousel component.
	 * @property {object} controlOpacity The @carousel-control-opacity variable which controls the Control Opacity of the Carousel component.
	 * @property {object} controlFontSize The @carousel-control-font-size variable which controls the Control Font Size of the Carousel component.
	 * @property {object} indicatorActiveBg The @carousel-indicator-active-bg variable which controls the Indicator Active Background Color of the Carousel component.
	 * @property {object} indicatorBorderColor The @carousel-indicator-border-color variable which controls the Indicator Border Color of the Carousel component.
	 * @property {object} captionColor The @carousel-caption-color variable which controls the Caption Color of the Carousel component.
	 * 
	 * @returns {Carousel}
	 */
	var Carousel = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        // Configure the Modifiers
		this.controlColor = {
			variable: '@carousel-control-color',
			value: null
		};
		this.controlWidth = {
			variable: '@carousel-control-width',
			value: null
		};
		this.controlOpacity = {
			variable: '@carousel-control-opacity',
			value: null
		};
		this.controlFontSize = {
			variable: '@carousel-control-font-size',
			value: null
		};
        this.indicatorActiveBg = {
            variable: '@carousel-indicator-active-bg',
            value: null
        };
        this.indicatorBorderColor = {
            variable: '@carousel-indicator-border-color',
            value: null
        };
        this.captionColor = {
            variable: '@carousel-caption-color',
            value: null
        };
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            controlColor:           this.controlColor,
            controlWidth:           this.controlWidth,
            controlOpacity:         this.controlOpacity,
            controlFontSize:        this.controlFontSize,
            indicatorActiveBg:      this.indicatorActiveBg,
            indicatorBorderColor:   this.indicatorBorderColor,
            captionColor:           this.captionColor,
        };
	};
	
	// Inherit from parent Prototype and preserve constructor
	Carousel.prototype = Object.create(ThemeModifier.prototype);
	Carousel.constructor = Carousel;

    /**
	 * Gets the Control Color of the Carousel Component.
	 * 
	 * @returns {string}
	 */
	Carousel.prototype.getControlColor = function () {
		return this.modifiers.controlColor.value;
	};

	/**
	 * Sets the Control Color of the Carousel Component.
	 * 
	 * @param {string} controlColor Sets the Carousel Control Color.
	 * 
	 * @returns {undefined}
	 */
	Carousel.prototype.setControlColor = function (controlColor) {
		this.modifiers.controlColor.value = controlColor;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Control Width of the Carousel Component.
	 * 
	 * @returns {string}
	 */
	Carousel.prototype.getControlWidth = function () {
		return this.modifiers.controlWidth.value;
	};

	/**
	 * Sets the Control Width of the Carousel Component.
	 * 
	 * @param {string} controlWidth Sets the Carousel Control Width.
	 * 
	 * @returns {undefined}
	 */
	Carousel.prototype.setControlWidth = function (controlWidth) {
		this.modifiers.controlWidth.value = controlWidth + '%';
		this.editor.queueModifications();
	};

    /**
	 * Gets the Control Opacity of the Carousel Component.
	 * 
	 * @returns {string}
	 */
	Carousel.prototype.getControlOpacity = function () {
		return this.modifiers.controlOpacity.value;
	};

	/**
	 * Sets the Control Opacity of the Carousel Component.
	 * 
	 * @param {string} controlOpacity Sets the Carousel Control Opacity.
	 * 
	 * @returns {undefined}
	 */
	Carousel.prototype.setControlOpacity = function (controlOpacity) {
		this.modifiers.controlOpacity.value = controlOpacity;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Control Font Size of the Carousel Component.
	 * 
	 * @returns {string}
	 */
	Carousel.prototype.getControlFontSize = function () {
		return this.modifiers.controlFontSize.value;
	};

	/**
	 * Sets the Control Font Size of the Carousel Component.
	 * 
	 * @param {string} controlFontSize Sets the Carousel Control Font Size.
	 * 
	 * @returns {undefined}
	 */
	Carousel.prototype.setControlFontSize = function (controlFontSize) {
		this.modifiers.controlFontSize.value = controlFontSize + 'px';
		this.editor.queueModifications();
	};

    /**
     * Gets the Indicator Background Color of the Carousel Component.
     * 
     * @returns {string}
     */
    Carousel.prototype.getIndicatorActiveBackgroundColor = function () {
        return this.modifiers.indicatorActiveBg.value;
    };

    /**
     * Sets the Indicator Background Color of the Carousel Component.
     * 
     * @param {string} indicatorActiveBg Sets the Carousel Indicator Background Color.
     * 
     * @returns {undefined}
     */
    Carousel.prototype.setIndicatorActiveBackgroundColor = function (indicatorActiveBg) {
        this.modifiers.indicatorActiveBg.value = indicatorActiveBg;
        this.editor.queueModifications();
    };

    /**
     * Gets the Indicator Border Color of the Carousel Component.
     * 
     * @returns {string}
     */
    Carousel.prototype.getIndicatorBorderColor = function () {
        return this.modifiers.indicatorBorderColor.value;
    };

    /**
     * Sets the Indicator Border Color of the Carousel Component.
     * 
     * @param {string} indicatorBorderColor Sets the Carousel Border Color.
     * 
     * @returns {undefined}
     */
    Carousel.prototype.setIndicatorBorderColor = function (indicatorBorderColor) {
        this.modifiers.indicatorBorderColor.value = indicatorBorderColor;
        this.editor.queueModifications();
    };

    /**
     * Gets the Caption Color of the Carousel Component.
     * 
     * @returns {string}
     */
    Carousel.prototype.getCaptionColor = function () {
        return this.modifiers.captionColor.value;
    };

    /**
     * Sets the Caption Color of the Carousef Component.
     * 
     * @param {string} captionColor Sets the Carousel Caption Color.
     * 
     * @returns {undefined}
     */
    Carousel.prototype.setCaptionColor = function (captionColor) {
        this.modifiers.captionColor.value = captionColor;
        this.editor.queueModifications();
    };

	window.Carousel = Carousel;
})(window);

(function (window) {
	"use strict";

	/**
	 * Allows modification of a Code component in Bootstrap.
	 * 
	 * @class Code
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} codeColor The @code-color variable which controls the Code Color of the Code component.
	 * @property {object} codeBg The @code-bg variable which controls the Code Background Color of the Code component.
	 * @property {object} kbdColor The @kbd-color variable which controls the Kbd Color of the Code component.
	 * @property {object} kbdBg The @kbd-bg variable which controls the Kdb Background Color of the Code component.
	 * @property {object} preColor The @pre-color variable which controls the Pre Color of the Code component.
	 * @property {object} preBg The @pre-bg variable which controls the Pre Background Color of the Code component.
	 * @property {object} preBorderColor The @pre-border-color variable which controls the Pre Border Color of the Code component.
	 * @property {object} preScrollableMaxHeight The @pre-scrollable-max-height variable which controls the Pre Scrollable Max Height of the Code component.
	 * 
	 * @returns {Code}
	 */
	var Code = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        // Configure the Modifiers
		this.codeColor = {
			variable: '@code-color',
			value: null
		};
        this.codeBg = {
			variable: '@code-bg',
			value: null
        };
		this.kbdColor = {
			variable: '@kbd-color',
			value: null
		};
        this.kbdBg = {
			variable: '@kbd-bg',
			value: null
        };
		this.preColor = {
			variable: '@pre-color',
			value: null
		};
        this.preBg = {
			variable: '@pre-bg',
			value: null
        };
        this.preBorderColor = {
			variable: '@pre-border-color',
			value: null
        };
        this.preScrollableMaxHeight = {
			variable: '@pre-scrollable-max-height',
			value: null
        };
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            codeColor:              this.codeColor,
            codeBg:                 this.codeBg,
            kbdColor:               this.kbdColor,
            kbdBg:                  this.kbdBg,
            preColor:               this.preColor,
            preBg:                  this.preBg,
            preBorderColor:         this.preBorderColor,
            preScrollableMaxHeight: this.preScrollableMaxHeight
        };
	};
	
	// Inherit from parent Prototype and preserve constructor
	Code.prototype = Object.create(ThemeModifier.prototype);
	Code.constructor = Code;

    /**
	 * Gets the Code Color of the Code Component.
	 * 
	 * @returns {string}
	 */
	Code.prototype.getCodeColor = function () {
		return this.modifiers.codeColor.value;
	};

	/**
	 * Sets the Code Color of the Code Component.
	 * 
	 * @param {string} codeColor Sets the Code Color.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setCodeColor = function (codeColor) {
		this.modifiers.codeColor.value = codeColor;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Code Background Color of the Code Component.
	 * 
	 * @returns {String}
	 */
	Code.prototype.getCodeBackgroundColor = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Code Background Color of the Code Component.
	 * 
	 * @param {string} codeBackgroundColor Sets the Code Background Color.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setCodeBackgroundColor = function (codeBackgroundColor) {
		this.modifiers.codeBg.value = codeBackgroundColor;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Kbd Color of the Code Component.
	 * 
	 * @returns {string}
	 */
	Code.prototype.getKbdColor = function () {
		return this.modifiers.kbdColor.value;
	};

	/**
	 * Sets the Kbd Color of the Code Component.
	 * 
	 * @param {string} kbdColor Sets the Code Kbd Color.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setKbdColor = function (kbdColor) {
		this.modifiers.kbdColor.value = kbdColor;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Kbd Background Color of the Code Component.
	 * 
	 * @returns {String}
	 */
	Code.prototype.getKbdBackgroundColor = function () {
		return this.modifiers.kbdBg.value;
	};

	/**
	 * Sets the Kbd Background Color of the Code Component.
	 * 
	 * @param {string} kbdBackgroundColor Sets the Code Kbd Background Color.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setKbdBackgroundColor = function (kbdBackgroundColor) {
		this.modifiers.kbdBg.value = kbdBackgroundColor;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Pre Color of the Code Component.
	 * 
	 * @returns {string}
	 */
	Code.prototype.getPreColor = function () {
		return this.modifiers.preColor.value;
	};

	/**
	 * Sets the Pre Color of the Code Component.
	 * 
	 * @param {string} preColor Sets the Code Pre Color.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setPreColor = function (preColor) {
		this.modifiers.preColor.value = preColor;
		this.editor.queueModifications();
	};

    /**
	 * Gets the Pre Background Color of the Code Component.
	 * 
	 * @returns {String}
	 */
	Code.prototype.getPreBackgroundColor = function () {
		return this.modifiers.preBg.value;
	};

	/**
	 * Sets the Pre Background Color of the Code Component.
	 * 
	 * @param {string} preBackgroundColor Sets the Code Pre Background Color.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setPreBackgroundColor = function (preBackgroundColor) {
		this.modifiers.preBg.value = preBackgroundColor;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Pre Border Color of the Code Component.
	 * 
	 * @returns {String}
	 */
	Code.prototype.getPreBorderColor = function () {
		return this.modifiers.preBorderColor.value;
	};

	/**
	 * Sets the Pre Border Color of the Code Component.
	 * 
	 * @param {string} preBorderColor Sets the Code Pre Border Color.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setPreBorderColor = function (preBorderColor) {
		this.modifiers.preBorderColor.value = preBorderColor;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Pre Scrollable Max Height of the Code Component.
	 * 
	 * @returns {String}
	 */
	Code.prototype.getPreScrollableMaxHeight = function () {
		return this.modifiers.preScrollableMaxHeightx.value;
	};

	/**
	 * Sets the Pre Scrollable Max Height of the Code Component.
	 * 
	 * @param {string} preScrollableMaxHeight Sets the Code Pre Scrollable Max Height.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setPreScrollableMaxHeight = function (preScrollableMaxHeight) {
		this.modifiers.preScrollableMaxHeight.value = preScrollableMaxHeight + 'px';
		this.editor.queueModifications();
	};

	window.Code = Code;
})(window);

(function (window) {
	"use strict";

	/**
	 * Allows modification of a Blockquote omponent in Bootstrap.
	 * 
	 * @class Blockquote
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} smallColor The @blockquote-color variable which controls the Small Color of the Blockquote component.
	 * @property {object} fontSize The @blockquote-font-size variable which controls the Font Size of the Blockquote component.
	 * @property {object} borderColor The @blockquote-border-color variable which controls the Border Color of the Blockquote component.
	 * 
	 * @returns {Blockquote}
	 */
	var Blockquote = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        // Configure the Modifiers
		this.smallColor = {
			variable: '@blockquote-small-color',
			value: null
        };
		this.fontSize = {
			variable: '@blockquote-font-size',
			value: null
		};
		this.borderColor = {
			variable: '@blockquote-border-color',
			value: null
		};
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            smallColor:     this.smallColor,
            fontSize:       this.fontSize,
            borderColor:    this.borderColor
        };
	};
	
	// Inherit from parent Prototype and preserve constructor
	Blockquote.prototype = Object.create(ThemeModifier.prototype);
	Blockquote.constructor = Blockquote;

    /**
	 * Gets the Small Color of the Blockquote Component.
	 * 
	 * @returns {string}
	 */
	Blockquote.prototype.getSmallColor = function () {
		return this.modifiers.smallColor.value;
	};

	/**
	 * Sets the Small Color of the Blockquote Component.
	 * 
	 * @param {string} smallColor Sets the Blockquote Small Color.
	 * 
	 * @returns {undefined}
	 */
	Blockquote.prototype.setSmallColor = function (smallColor) {
		this.modifiers.smallColor.value = smallColor;
		this.editor.queueModifications();
	};

    /**
     * Gets the Font Size of the Blockquote Component.
     * 
     * @returns {string}
     */
    Blockquote.prototype.getFontSize = function () {
        return this.modifiers.fontSize.value;
    };

    /**
     * Sets the Font Size of the Blockquote Component.
     * 
     * @param {string} fontSize Sets the Blockquote Font Size.
     * 
     * @returns {undefined}
     */
    Blockquote.prototype.setFontSize = function (fontSize) {
        this.modifiers.fontSize.value = fontSize + 'px';
        this.editor.queueModifications();
    };

    /**
     * Gets the Border Color of the Blockquote Component.
     * 
     * @returns {string}
     */
    Blockquote.prototype.getBorderColor = function () {
        return this.modifiers.borderColor.value;
    };

    /**
     * Sets the Border Color of the Blockquote Component.
     * 
     * @param {string} borderColor Sets the Blockquote Border Color.
     * 
     * @returns {undefined}
     */
    Blockquote.prototype.setBorderColor = function (borderColor) {
        this.modifiers.borderColor.value = borderColor;
        this.editor.queueModifications();
    };

	window.Blockquote = Blockquote;
})(window);

(function (window) {
    "use strict";

    /**
	 * Allows modification of a Modal component in Bootstrap.
	 * 
	 * @class Modal
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} innerPadding The @modal-inner-padding variable which controls the Inner Padding of the Modal component.
	 * @property {object} titlePadding The @modal-title-padding variable which controls the Title Padding of the Modal component.
	 * @property {object} titleLineHeight The @modal-title-line-height variable which controls the Title Line Height of the Modal component.
	 * @property {object} contentBg The @modal-content-bg variable which controls the Content Background Color of the Modal component.
	 * @property {object} contentBorderColor The @modal-content-border-color variable which controls the Content Border Color of the Modal component.
	 * @property {object} contentFallbackBorderColor The @modal-content-fallback-border-color variable which controls the Content Fallback Border Color of the Modal component.
     * @property {object} backdropBg The @modal-backdrop-bg variable which controls the Backdrop Background Color of the Modal component.
     * @property {object} backdropOpacity The @modal-backdrop-opacity variable which controls the Backdrop Opacity of the Modal component.
     * @property {object} headerBorderColor The @modal-header-border-color variable which controls the Header Border Color of the Modal component.
     * @property {object} footerBorderColor The @modal-footer-border-color variable which controls the Footer Border Color of the Modal component.
     * 
     * @returns {undefined}
     */
    var Modal = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        this.innerPadding = {
            variable: '@modal-inner-padding',
            value: null
        };
        this.titlePadding = {
            variable: '@modal-title-padding',
            value: null
        };
        this.titleLineHeight = {
            variable: '@modal-title-line-height',
            value: null
        };
        this.contentBg = {
            variable: '@modal-content-bg',
            value: null
        };
        this.contentBorderColor = {
            variable: '@modal-content-border-color',
            value: null
        };
        this.contentFallbackBorderColor = {
            variable: '@modal-content-fallback-border-color',
            value: null
        };
        this.backdropBg = {
            variable: '@modal-backdrop-bg',
            value: null
        };
        this.backdropOpacity = {
            variable: '@modal-backdrop-opacity',
            value: null
        };
        this.headerBorderColor = {
            variable: '@modal-header-border-color',
            value: null
        };
        this.footerBorderColor = {
            variable: '@modal-footer-border-color',
            value: null
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
    };

    // Inherit from parent Prototype and preserve constructor
    Modal.prototype = Object.create(ThemeModifier.prototype);
    Modal.constructor = Modal;

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
     * @param {string} innerPadding Sets the Modal Inner Padding.
     * 
     * @returns {string}
     */
    Modal.prototype.setInnerPadding = function (innerPadding) {
        this.modifiers.innerPadding.value = innerPadding + 'px';
        this.editor.queueModifications();
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
     * @param {string} titlePadding Sets the Modal Title Padding.
     * 
     * @returns {string}
     */
    Modal.prototype.setTitlePadding = function (titlePadding) {
        this.modifiers.titlePadding.value = titlePadding + 'px';
        this.editor.queueModifications();
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
     * @param {string} titleLineHeight Sets the Modal Title Line Height.
     * 
     * @returns {string}
     */
    Modal.prototype.setTitleLineHeight = function (titleLineHeight) {
        this.modifiers.titleLineHeight.value = titleLineHeight + 'px';
        this.editor.queueModifications();
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
     * @param {string} contentBg Sets the Modal Content Background Color.
     * 
     * @returns {string}
     */
    Modal.prototype.setContentBackgroundColor = function (contentBg) {
        this.modifiers.contentBg.value = contentBg;
        this.editor.queueModifications();
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
     * @param {string} contentBorderColor Sets the Modal Content Border Color.
     * 
     * @returns {string}
     */
    Modal.prototype.setContentBorderColor = function (contentBorderColor) {
        this.modifiers.contentBorderColor.value = contentBorderColor;
        this.editor.queueModifications();
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
     * @param {string} contentFallbackBorderColor Sets the Modal Content Fallback Border Color.
     * 
     * @returns {string}
     */
    Modal.prototype.setContentFallbackBorderColor = function (contentFallbackBorderColor) {
        this.modifiers.contentFallbackBorderColor.value = contentFallbackBorderColor;
        this.editor.queueModifications();
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
     * @param {string} backdropBg Sets the Modal Backdrop Background Color.
     * 
     * @returns {string}
     */
    Modal.prototype.setBackdropBackgroundColor = function (backdropBg) {
        this.modifiers.backdropBg.value = backdropBg;
        this.editor.queueModifications();
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
     * @param {string} backdropOpacity Sets the Modal Backdrop Opacity.
     * 
     * @returns {string}
     */
    Modal.prototype.setBackdropOpacity = function (backdropOpacity) {
        this.modifiers.backdropOpacity.value = backdropOpacity;
        this.editor.queueModifications();
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
     * @param {string} headerBorderColor Sets the Modal Header Border Color.
     * 
     * @returns {string}
     */
    Modal.prototype.setHeaderBorderColor = function (headerBorderColor) {
        this.modifiers.headerBorderColor.value = headerBorderColor;
        this.editor.queueModifications();
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
     * @param {string} footerBorderColor Sets the Modal Footer Border Color.
     * 
     * @returns {string}
     */
    Modal.prototype.setFooterBorderColor = function (footerBorderColor) {
        this.modifiers.footerBorderColor.value = footerBorderColor;
        this.editor.queueModifications();
    };

    window.Modal = Modal;
})(window);

(function (window) {
	"use strict";

	/**
	 * Allows modification of a Button component in Bootstrap.
	 * 
	 * @class Button
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
     * @param {string} string The style of Button Component to modify.
	 * 
	 * @property {object} bg The @btn-{style}-bg variable which controls the Background color of the Button component.
	 * @property {object} color The @btn-{style}-color variable which controls the Color of the Button component.
	 * @property {object} border The @btn-{style}-border variable which controls the Border of the Button component.
	 * 
	 * @returns {Button}
	 */
	var Button = function (editor, style) {
		ThemeModifier.call(this, editor); // Call parent constructor
		
        if (style === undefined) {
            throw new TypeError('ThemeEditor.button.js: style cannot be undefined');
        }

        // Configure the Modifiers
		this.bg = {
			variable: '@btn-' + style + '-bg',
			value: null
		};
		this.color = {
			variable: '@btn-' + style + '-color',
			value: null
		};
		this.border = {
			variable: '@btn-' + style + '-border',
			value: null
		};

        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            bg:                 this.bg,
            color:              this.color,
            border:             this.border
        };
	};
	
	// Inherit from parent Prototype and preserve constructor
	Button.prototype = Object.create(ThemeModifier.prototype);
	Button.constructor = Button;

	/**
	 * Gets the Background color.
	 * 
	 * @returns {String}
	 */
	Button.prototype.getBackground = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background color of this Button instance.
	 * 
	 * @param {string} color Sets the Background color.
	 * 
	 * @returns {undefined}
	 */
	Button.prototype.setBackground = function (color) {
		this.modifiers.bg.value = color;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Color of this Button instance.
	 * 
	 * @returns {string}
	 */
	Button.prototype.getColor = function () {
		return this.modifiers.color.value;
	};

	/**
	 * Sets the Color of this Button instance.
	 * 
	 * @param {string} color Sets the Color.
	 * 
	 * @returns {undefined}
	 */
	Button.prototype.setColor = function (color) {
		this.modifiers.color.value = color;
		this.editor.queueModifications();
	};

	/**
	 * Gets the Border of this Button instance.
	 * 
	 * @returns {string}
	 */
	Button.prototype.getBorder = function () {
		return this.modifiers.border.value;
	};

	/**
	 * Sets the Border of this Button instance.
	 * 
	 * @param {string} color Sets the Border.
	 * 
	 * @returns {undefined}
	 */
	Button.prototype.setBorder = function (color) {
		this.modifiers.border.value = color;
		this.editor.queueModifications();
	};

    window.Button = Button;
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
     * @param {string} string The style of Navbar Component to modify.
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

(function(window) {
    "use strict";

    /**
     * Manages the Exporting of the Theme data, in JSON (modifications only)/Compiled CSS format,
     * aswell as creating the Download Blob's and the Links/Buttons to trigger the download.
     * 
     * @class Editor
     * 
     * Export Options:
     * - target: Optional General DOM Element target, to append Export links to (Body if undefined).
     * - json: Json Export link options.
     *   - target: DOM Element target to append json Export link, (export.target if undefined).
     *   - id: ID attribute to set on the json Export link.
     *   - text: Text content for the json Export link.
     * - css: Css Export link options.
     *   - target: DOM Element target to append css Export link, (export.target if undefined).
     *   - id: ID attribute to set on the css Export link.
     *   - text: Text content for the css Export link.
     * - save: External JSON save request.
     *   - formats: The formats to include in the export (Default: json).
     *   - target: DOM Element target to append save Export link, (export.target if undefined).
     *   - method: HTTP method for the save request.
     *   - url: (Required) URL to send the modified theme changes (JSON format).
     *   - callback: Optional success save callback.
     *   - id: ID attribute to set on the save Export link.
     *   - text: Text content for the save Export link.
     * 
	 * @extends ThemeModifiers
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
     * 
     * @returns {Editor}
     */
    var Export = function (editor, options) {
        this.editor     = editor;
        this.options    = options;

        this.jsonLink   = null;
        this.saveLink   = null;
        this.cssLink    = null;
        
        this.compiledCss = null;

        // If the download option was provided
        if (options.hasOwnProperty('json')) {
            this.jsonLink = this.createExportLink('json', options.json);
        }

        // If the Save option was provided
        if (options.hasOwnProperty('save')) {
            this.createSaveLink();
        }

        if (options.hasOwnProperty('css')) {
            this.cssLink = this.createExportLink('css', options.css);
        }
    };
    
    /**
     * Creates and returns a Primary Bootstrap Anchor tag link.
     * 
     * @returns {Element}
     */
    Export.prototype.createBsButton = function () {
        var button = document.createElement('a'); // Create link

        // Add Primary BS classes
        button.classList.add('btn');
        button.classList.add('btn-primary');

        return button;
    };

    /**
     * Finds the Export DOM element target, to append an export button to.
     * 
     * @param {object} linkOptions Specific options for this export button.
     * 
     * @returns {string}
     */
    Export.prototype.findExportTarget = function (linkOptions) {
        if (this.options.hasOwnProperty('target')) {
            // Specific target or General target
            // e.g.
            // export: {
            //  target: '#my-id', // this.options.target
            //  json: {
            //   append: '#specific-target' // linkOptions.target
            //  }
            // }
            return linkOptions.target || this.options.target;
        }

        return linkOptions.target || "body";
    };
    
    /**
     * Creates an Export button (for the current exportType e.g. "css" or "json") and appends it to the element provided by the destination.
     * 
     * Download Options:
     * - id:    {string} The id to set for the download button (E.g. "download_css_link" || "download_json_link").
     * - text:  {string} The text content of the download button (E.g. "Download Json" || "Download Css").
     * 
     * @returns {Element}
     */
    Export.prototype.createExportLink = function (exportType, options) {
        var downloadBtn = this.createBsButton(),
            dest = this.findExportTarget(options), // Find the Append Target
            firstCharUpper = exportType.slice(0, 1).toUpperCase();

        downloadBtn.textContent = options.text || 'Download ' + firstCharUpper + exportType.slice(1);
        downloadBtn.setAttribute('id', options.id || 'download_' + exportType + '_link');

        // Download attribute allows the button to provided a file to download on click
        // The generateDownloadBlob function provides the file contents
        downloadBtn.setAttribute('download', 'theme.' + exportType);

        // Append the Download button to the document
        document.querySelector(dest).appendChild(downloadBtn);

        return downloadBtn;
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
    Export.prototype.createSaveLink = function () {
        var saveOptions = this.options.save,
            saveLink = this.createBsButton(), // Create a button
            dest = this.findExportTarget(saveOptions); // Body or custom parent

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
     * Generates a Download Blob to export the Theme modifications in JSON format.
     * 
     * @returns {undefined}
     */
    Export.prototype.generateJsonBlob = function () {
        // Update the href of the download link, this now points to the JSON data
        this.jsonLink.setAttribute('href', this.generateBlob(this.editor.getJSON()));
    };

    /**
     * Generates a Download Blob to export the Compiled Theme in Css format (including modifications).
     * 
     * @param {string} css The Compiled Css from Less#postProcess.
     * 
     * @returns {undefined}
     */
    Export.prototype.generateCssBlob = function (css) {
        // Store the Compiled Css
        this.compiledCss = css;

        // Update the href of the download link, this now points to the CSS data
        this.cssLink.setAttribute('href', this.generateBlob(this.compiledCss));
    };

    /**
     * Generates a New Blob and ObjectURL with the given contents.
     * 
     * @param {string} contents The text contents to blobify.
     * @returns {unresolved}
     */
    Export.prototype.generateBlob = function (contents) {
        var blob = new Blob([contents]); // Create a Blob with the contents

        return window.URL.createObjectURL(blob); // Create an URL with the blob
    };

    /**
     * Sends the Theme Data to the URL provided by the "save" option to ThemeEditor(options.export).
     * 
     * Save options:
     * - method:    {string}    The HTTP method for the save request. Default "POST".
     * - url:       {string}    The URL to send the JSON data.
     * - callback:  {Function}  A callback function to execute on success.
     * 
     * @returns {undefined}
     */
    Export.prototype.sendThemeData = function () {
        var options = this.options.save,
            method = options.method || 'POST', // Default to "POST"
            saveXHR,
            exportData = {};

        // Throw an error if the URL option was not provided or was not a string
        if (typeof options.url !== 'string') {
            throw new TypeError('ThemeEditor.export.sendThemeData: The save url was not provided, or was not a string');
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

        // By Default only export JSON
        if (!options.hasOwnProperty('formats')) {
            exportData.json = this.editor.getModifiers();
        } else {
            // Export JSON if the format was provided
            if (options.formats.indexOf('json') !== -1) {
                exportData.json = this.editor.getModifiers();
            }

            // Export CSS if the format was provided
            if (options.formats.indexOf('css') !== -1) {
                exportData.css = this.compiledCss;
            }
        }

        // Send the JSON to the server
        saveXHR.send(JSON.stringify(exportData));
    };

    window.Export = Export;
})(window);

/* global Export, Typography, Jumbotron, Table, GrayScale, BrandModifier, Navbar, Navs, Tabs, Pills, Pagination, Pager, Form, Button, FormState, ListGroup, Dropdown, Tooltip, Popover, Thumbnail, Badge, Carousel, Code, Blockquote, Modal, Misc, LabelBase, PanelBase, ButtonBase, NavbarBase, Breadcrumb */
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
     * @property {Export} export Manages the Theme exporting.
     * @property {Typography} typography Holds modifications to the Typography component.
     * @property {Misc} misc Holds miscellaneous modifications to Bootstrap.
     * @property {Table} table Holds modifications to the Table component.
     * @property {Breadcrumbs} breadcrumbs Holds modifications to the Breadcrumbs component.
     * @property {Dropdown} dropdown Holds modifications to the Dropdown component.
     * @property {Tooltip} tooltip Holds modifications to the Tooltip component.
     * @property {Popover} popover Holds modifications to the Popover component.
     * @property {Thumbnail} thumbnail Holds modifications to the Thumbnail component.
     * @property {Badge} badge Holds modifications to the Badge component.
     * @property {Carousel} carousel Holds modifications to the Carousel component.
     * @property {Code} carousel Holds modifications to the Code component.
     * @property {Blockquote} blockquote Holds modifications to the Blockquote component.
     * @property {Modal} modal Holds modifications to the Modal component.
     * @property {Jumbotron} jumbotron Hold modifications to the Jumbotron component.
     * @property {GrayScale} grayScale Holds the modifications to the base gray colors of the Theme.
     * @property {Navs} navs Holds the modifications to the Navs Components.
     * @property {Tabs} tabs Holds the modifications to the Tabs Components.
     * @property {Pills} tabs Holds the modifications to the Pills Components.
     * @property {Pagination} pagination Holds the modifications to the Pagination Components.
     * @property {Pager} pager Holds the modifications to the Pager Components.
     * @property {Form} form Holds the modifications to the Form Components.
     * @property {BrandModifier} branding Holds the changes to the Branding colors of the Theme.
     * @property {LabelBase} labelBase Holds the changes to the Label Components.
     * @property {PanelBase} panelBase Holds the changes to the General Panel styling of Panel Components.
     * @property {NavbarBase} navbarBase Holds the changes to the General Navbar styling of Navbar Components.
     * @property {ButtonBase} buttonBase Holds the changes to the General Button styling of Button Components.
     * @property {Object} navbar Holds Navbar instances which control the styling of Navbar Components.
     * @property {Object} buttons Holds Button instances which control the styling of Button Components.
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
        this.refreshMonitor     = {
            readyState: 0,
            delay: options.refreshDelay || 750
        };
        
        // Export
        this.export             = new Export(this, options.export);

        this.misc               = new Misc(this);
        // Component vars
        this.typography         = new Typography(this);
        this.table              = new Table(this);
        this.breadcrumbs        = new Breadcrumb(this);
        this.dropdown           = new Dropdown(this);
        this.tooltip            = new Tooltip(this);
        this.popover            = new Popover(this);
        this.thumbnail          = new Thumbnail(this);
        this.badge              = new Badge(this);
        this.carousel           = new Carousel(this);
        this.code               = new Code(this);
        this.blockquote         = new Blockquote(this);
        this.modal              = new Modal(this);
        this.jumbotron          = new Jumbotron(this);
        this.grayScale          = new GrayScale(this);
        this.navs               = new Navs(this);
        this.tabs               = new Tabs(this);
        this.pills              = new Pills(this);
        this.pagination         = new Pagination(this);
        this.pager              = new Pager(this);
        this.form               = new Form(this);
        this.branding           = new BrandModifier(this);
        this.labelBase          = new LabelBase(this);
        this.panelBase          = new PanelBase(this);
        this.navbarBase         = new NavbarBase(this);
        this.buttonBase         = new ButtonBase(this);
        this.navbar = {
            'default':            new Navbar(this),
            'inverse':            new Navbar(this, 'inverse')
        };
        this.buttons = {
            'default':            new Button(this, 'default'),
            'primary':            new Button(this, 'primary'),
            'success':            new Button(this, 'success'),
            'info':               new Button(this, 'info'),
            'warning':            new Button(this, 'warning'),
            'danger':             new Button(this, 'danger')
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

        // If the theme option was provided
        if (options.hasOwnProperty('theme')) {

            // If the theme.src option was provided
            if (options.theme.hasOwnProperty('src')) {
                // Attempt to load and parse the theme file at the theme.src URL
                this.parseThemeFile(options.theme.src);
            }
        }

        // Configure the Post Processor for when Less finished Processing Changes to the Theme
        this.setupPostProcessor(this.lessGlobal);
    };
    
    /**
     * Sets up a Callback for the Less#postProcessor callback.
     * 
     * @param {Object} less The Global less object.
     * 
     * @returns {undefined}
     */
    ThemeEditor.prototype.setupPostProcessor = function (less) {
        // Provide less with the postProcessor callback we want to executre
        less.postProcessor = function (css) {
            // Generate a Download blob from the Compiled CSS
            this.export.generateCssBlob(css);
        }.bind(this);
    };

    /**
     * Get the Modifications which have been stored.
     * 
     * @returns {Object}
     */
    ThemeEditor.prototype.getModifiers = function () {
        var grayScale   = this.grayScale,
            navbar      = this.navbar,
            buttons     = this.buttons,
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

        // Buttons
        // Itterate over the object to extract modifications for each styles of Button
        Object.keys(buttons).forEach(function (style) {
            var buttonsStyle = buttons[style];

            this.extractModifications(modifiers, buttonsStyle);
        }, this);

        // Typography
        this.extractModifications(modifiers, this.typography);

        // Panel Base
        this.extractModifications(modifiers, this.panelBase);

        // Table
        this.extractModifications(modifiers, this.table);

        // Navbar Base
        this.extractModifications(modifiers, this.navbarBase);

        // Button Base
        this.extractModifications(modifiers, this.buttonBase);

        // Misc
        this.extractModifications(modifiers, this.misc);

        // Navs
        this.extractModifications(modifiers, this.navs);

        // Tabs
        this.extractModifications(modifiers, this.tabs);

        // Pills
        this.extractModifications(modifiers, this.pills);

        // Pagination
        this.extractModifications(modifiers, this.pagination);

        // Pager
        this.extractModifications(modifiers, this.pager);

        // Form
        this.extractModifications(modifiers, this.form);

        // Branding
        this.extractModifications(modifiers, this.branding);

        // LabelBase
        this.extractModifications(modifiers, this.labelBase);

        // Breadcrumbs
        this.extractModifications(modifiers, this.breadcrumbs);

        // Dropdown
        this.extractModifications(modifiers, this.dropdown);

        // Tooltip
        this.extractModifications(modifiers, this.tooltip);

        // Popover
        this.extractModifications(modifiers, this.popover);

        // Thumbnail
        this.extractModifications(modifiers, this.thumbnail);

        // Badge
        this.extractModifications(modifiers, this.badge);

        // Carousel
        this.extractModifications(modifiers, this.carousel);

        // Code
        this.extractModifications(modifiers, this.code);

        // Blockquote
        this.extractModifications(modifiers, this.blockquote);

        // Modal
        this.extractModifications(modifiers, this.modal);

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
        this.export.generateJsonBlob();
        this.lessGlobal.modifyVars(this.getModifiers());
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

    window.ThemeEditor = ThemeEditor;
})(window);