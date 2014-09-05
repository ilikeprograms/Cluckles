    /**
     * Allows modifications of the Table Components in Bootstrap.
     * 
	 * @class Table
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
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

        this.subscriberDataAttribute = 'data-cluckles-table';

        this.cellPadding = {
            variable: '@table-cell-padding',
            subscribeProperty:  'cell-padding',
            changeFn:           this.setCellPadding.bind(this),
            subscribers:        [],
			_value: null
        };
        this.condensedCellPadding = {
            variable: '@table-condensed-cell-padding',
            subscribeProperty:  'condensed-cell-padding',
            changeFn:           this.setCondensedCellPadding.bind(this),
            subscribers:        [],
			_value: null
        };
        this.bg = {
            variable: '@table-bg',
            subscribeProperty:  'bg',
            changeFn:           this.setBackground.bind(this),
            subscribers:        [],
			_value: null
        };
        this.bgAccent = {
            variable: '@table-bg-accent',
            subscribeProperty:  'striped-bg',
            changeFn:           this.setAccentBackground.bind(this),
            subscribers:        [],
			_value: null
        };
        this.bgHover = {
            variable: '@table-bg-hover',
            subscribeProperty:  'hover-bg',
            changeFn:           this.setHoverBackground.bind(this),
            subscribers:        [],
			_value: null
        };
        this.bgActive = {
            variable: '@table-bg-active',
            subscribeProperty:  'active-bg',
            changeFn:           this.setActiveBackground.bind(this),
            subscribers:        [],
			_value: null
        };
        this.borderColor = {
            variable: '@table-border-color',
            subscribeProperty:  'border-color',
            changeFn:           this.setBorderColor.bind(this),
            subscribers:        [],
			_value: null
        };

        Object.defineProperty(this.cellPadding, 'value', {
            get: function () { return this._value; },
            set: function (val) {
                this._value = val + 'px';
                editor.queueModifications();

                this.subscribers.forEach(function (subscriber) {
                    subscriber.value = val;
                });
            }
        });

        Object.defineProperty(this.condensedCellPadding, 'value', {
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
        this.modifiers.cellPadding.value = cellPadding;
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
        this.modifiers.condensedCellPadding.value = condensedCellPadding;
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
    };