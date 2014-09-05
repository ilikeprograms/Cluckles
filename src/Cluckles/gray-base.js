	/**
	 * Allows modification of the base @gray-{shade} variables which affect the
	 * base colors of the bootstrap Theme.
	 * 
	 * @class GrayScale
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
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
		this.editor		= editor; // ClucklesEditor

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