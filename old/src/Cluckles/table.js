    /**
     * Allows modifications of the Table Components in Bootstrap.
     * 
	 * @class Table
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
     * 
     * @property {object} cellPadding           The @table-cell-padding variable which controls the Cell Padding of the Table Component.
     * @property {object} condensedCellPadding  The @table-condensed-cell-padding variable which controls the Condensed Cell Padding of the Table Component.
     * @property {object} bg                    The @table-bg variable which controls the Background Color of the Table Component.
     * @property {object} accentBg              The @table-bg-accent variable which controls the Background Accent Color of the Table Component.
     * @property {object} hoverBg               The @table-bg-hover variable which controls the Background Hover Color of the Table Component.
     * @property {object} activeBg              The @table-bg-active variable which controls the Background Active Color of the Table Component.
     * @property {object} borderColor           The @table-border-color variable which controls the Border Color of the Table Component.
     * 
     * @returns {Table}
     */
    var Table = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-table';

        this.cellPadding = {
            variable:           '@table-cell-padding',
            subscribeProperty:  'cell-padding',
            suffixUnit:         true,
            changeFn:           this.setCellPadding.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.condensedCellPadding = {
            variable:           '@table-condensed-cell-padding',
            subscribeProperty:  'condensed-cell-padding',
            suffixUnit:         true,
            changeFn:           this.setCondensedCellPadding.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.bg = {
            variable:           '@table-bg',
            subscribeProperty:  'bg',
            changeFn:           this.setBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.bgAccent = {
            variable:           '@table-bg-accent',
            subscribeProperty:  'striped-bg',
            changeFn:           this.setAccentBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.bgHover = {
            variable:           '@table-bg-hover',
            subscribeProperty:  'hover-bg',
            changeFn:           this.setHoverBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.bgActive = {
            variable:           '@table-bg-active',
            subscribeProperty:  'active-bg',
            changeFn:           this.setActiveBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.borderColor = {
            variable:           '@table-border-color',
            subscribeProperty:  'border-color',
            changeFn:           this.setBorderColor.bind(this),
            subscribers:        [],
			_value:             null
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

        this.setupDataBinding();
    };

    // Inherit from parent Prototype and preserve constructor
    Table.prototype             = Object.create(ThemeModifier.prototype);
    Table.prototype.constructor = Table;

    /**
     * Gets the Cell Padding of the Table Component.
     * 
     * @returns {string}
     */
    Table.prototype.getCellPadding = function () {
        return this.modifiers.cellPadding.value;
    };

    /**
     * Sets the Cell Padding of the Table Component.
     * 
     * @param {string} cellPadding The Table Cell Padding to set.
     * @param {string} unit        The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Table.prototype.setCellPadding = function (cellPadding, unit) {
        if (unit !== undefined) { this.modifiers.cellPadding.unit = unit; }

        this.modifiers.cellPadding.value = cellPadding;
    };

    /**
     * Gets the Condensed Cell Padding of the Table Component.
     * 
     * @returns {string}
     */
    Table.prototype.getCondensedCellPadding = function () {
        return this.modifiers.condensedCellPadding.value;
    };

    /**
     * Sets the Condensed Cell Padding of the Table Component.
     * 
     * @param {string} condensedCellPadding The Table Condensed Cell Padding to set.
     * @param {string} unit                 The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Table.prototype.setCondensedCellPadding = function (condensedCellPadding, unit) {
        if (unit !== undefined) { this.modifiers.condensedCellPadding.unit = unit; }

        this.modifiers.condensedCellPadding.value = condensedCellPadding;
    };

    /**
	 * Gets the Background Color of the Table Component.
	 * 
	 * @returns {String}
	 */
	Table.prototype.getBackgroundColor = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background Color of the Table Component.
	 * 
	 * @param {string} backgroundColor The Table Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Table.prototype.setBackgroundColor = function (backgroundColor) {
		this.modifiers.bg.value = backgroundColor;
	};

    /**
	 * Gets the Accent Background Color of the Table Component.
	 * 
	 * @returns {String}
	 */
	Table.prototype.getAccentBackgroundColor = function () {
		return this.modifiers.accentBg.value;
	};

	/**
	 * Sets the Accent Background Color of the Table Component.
	 * 
	 * @param {string} accentBackgroundColor The Table Accent Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Table.prototype.setAccentBackgroundColor = function (accentBackgroundColor) {
		this.modifiers.accentBg.value = accentBackgroundColor;
	};

    /**
	 * Gets the Hover Background Color of the Table Component.
	 * 
	 * @returns {String}
	 */
	Table.prototype.getHoverBackgroundColor = function () {
		return this.modifiers.hoverBg.value;
	};

	/**
	 * Sets the Hover Background Color of the Table Component.
	 * 
	 * @param {string} hoverBackgroundColor The Table Hover Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Table.prototype.setHoverBackgroundColor = function (hoverBackgroundColor) {
		this.modifiers.hoverBg.value = hoverBackgroundColor;
	};

    /**
	 * Gets the Active Background Color of the Table Component.
	 * 
	 * @returns {String}
	 */
	Table.prototype.getActiveBackgroundColor = function () {
		return this.modifiers.activeBg.value;
	};

	/**
	 * Sets the Active Background Color of the Table Component.
	 * 
	 * @param {string} activeBackgroundColor The Table Active Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Table.prototype.setActiveBackgroundColor = function (activeBackgroundColor) {
		this.modifiers.activeBg.value = activeBackgroundColor;
	};

    /**
     * Gets the Border Color of the Table Component.
     * 
     * @returns {String}
     */
    Table.prototype.getBorderColor = function () {
        return this.modifiers.borderColor.value;
    };

    /**
     * Sets the Border Color of the Table Component.
     * 
     * @param {string} borderColor The Table Border Color to set.
     * 
     * @returns {undefined}
     */
    Table.prototype.setBorderColor = function (borderColor) {
        this.modifiers.borderColor.value = borderColor;
    };