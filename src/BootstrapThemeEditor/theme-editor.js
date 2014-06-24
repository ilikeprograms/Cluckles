/* global Jumbotron, GrayScale, BrandModifier, Navbar, FormState, ListGroup, Dropdown */
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
	 * @param {Object} less The Global less object.
	 * 
	 * @property {Object} lessGlobal The Global less object.
	 * @property {string} componentBaseBg The base background color of bootstrap components.
	 * @property {string} wellBg The well components background color.
	 * @property {string} bodyBg The body background color.
	 * @property {string} textColor The body text color.
	 * @property {string} headingsColor The headings color.
	 * @property {Dropdown} dropdown Holds modifications to the Dropdown component.
	 * @property {Jumbotron} jumbotron Hold modifications to the Jumbotron component.
	 * @property {GrayScale} grayScale Holds the modifications to the base gray colors of the Theme.
	 * @property {BrandModifier} branding Holds the changes to the Branding colors of the Theme.
	 * @property {object} navbar Holds Navbar instances which control the styling of Navbar components.
	 * @property {object} formStates Holds FormState instances which control the styling of various components, (Alerts/Panels).
	 * @property {ListGroup} listGroup Holds the changes to the ListGroup component.
	 * @property {object} modifiers Holds all of the Modifications to the whole theme.
	 * 
	 * @returns {ThemeEditor}
	 */
	var ThemeEditor = function (less, options) {
		this.lessGlobal = less;
		
		this.componentBaseBg	= null;
		this.wellBg				= null;
		this.bodyBg				= null;
		this.textColor			= null;
		this.headingsColor		= null;
		
		this.dropdown			= new Dropdown(this);
		this.jumbotron			= new Jumbotron(this);
		this.grayScale			= new GrayScale(this);
		this.branding			= new BrandModifier(this);
		this.navbar = {
			'default':			  new Navbar(this),
			'inverse':			  new Navbar(this, 'inverse')
		};
		this.formStates = {
			'default':			  new FormState(this, 'default'),
			'primary':			  new FormState(this, 'primary'),
			'success':			  new FormState(this, 'success'),
			'info':				  new FormState(this, 'info'),
			'warning':			  new FormState(this, 'warning'),
			'danger':			  new FormState(this, 'danger')
		};
		this.listGroup			= new ListGroup(this);

		this.modifiers = {};

		if (options.hasOwnProperty('download')) {
			if (options.download.hasOwnProperty('append')) {
				this.downloadLink = this.createDownloadLink(options.download.append);
			} else {
				this.downloadLink = this.createDownloadLink();
			}
		}
		

		if (options.hasOwnProperty('theme')) {
			if (options.theme.hasOwnProperty('src')) {
				this.parseThemeFile(options.theme.src);
			}
		}
	};

	/**
	 * Sets the background color of Components, such as Panel body, List Groups.
	 * 
	 * @param {string} bg The background color to set.
	 * 
	 * @returns {undefined}
	 */
	ThemeEditor.prototype.setComponentBaseBackground = function (bg) {
		this.componentBaseBg = bg;
		this.applyModifications();
	};
	
	ThemeEditor.prototype.setWellBackground = function (bg) {
		this.wellBg = bg;
		this.applyModifications();
	};

	/**
	 * Sets the body background color.
	 * 
	 * @param {string} bg The body background color to set.
	 * 
	 * @returns {undefined}
	 */
	ThemeEditor.prototype.setBodyBackground = function (bg) {
		this.bodyBg = bg;
		this.applyModifications();
	};

	/**
	 * Sets the body text color.
	 * 
	 * @param {string} color The body text color to set.
	 * 
	 * @returns {undefined}
	 */
	ThemeEditor.prototype.setTextColor = function (color) {
		this.textColor = color;
		this.applyModifications();
	};

	/**
	 * Sets the headings text color.
	 * 
	 * @param {string} color The headings text color to set.
	 * 
	 * @returns {undefined}
	 */
	ThemeEditor.prototype.setHeadingsColor = function (color) {
		this.headingsColor = color;
		this.applyModifications();
	};

	ThemeEditor.prototype.getModifiers = function () {
		var grayScale =  this.grayScale,
			navbar = this.navbar,
			formStates = this.formStates,
			modifiers = this.modifiers;

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
		Object.keys(navbar).forEach(function (style) {
			var navbarStyle = navbar[style],
				navbarModifications = navbarStyle.getModifications();

			Object.keys(navbarModifications).forEach(function (modifier) {
				var modifierObject = navbarModifications[modifier];
				modifiers[modifierObject.variable] = modifierObject.value;
			});
		});

		// FormStates
		Object.keys(formStates).forEach(function (stateType) {
			var formState = formStates[stateType],
				formModifications = formState.getModifications();
				
			Object.keys(formModifications).forEach(function (modifier) {
				var modifierObject = formModifications[modifier];
				modifiers[modifierObject.variable] = modifierObject.value;
			});
		});

		// Misc
		
		if (this.componentBaseBg !== null) { modifiers['@state-base-bg'] = this.componentBaseBg; }
		if (this.wellBg !== null) { modifiers['@well-base-bg'] = this.wellBg; }
		if (this.bodyBg !== null) { modifiers['@body-bg'] = this.bodyBg; }
		if (this.textColor !== null) { modifiers['@text-color'] = this.textColor; }
		if (this.headingsColor !== null) { modifiers['@headings-color'] = this.headingsColor; }

		// Branding
		var brandingModifiers = this.branding.getModifications();
		Object.keys(brandingModifiers).forEach(function (modifier) {
			var modifierObject = brandingModifiers[modifier];
			modifiers[modifierObject.variable] = modifierObject.value;
		});

		// Dropdown
		
		var dropdownModifiers = this.dropdown.getModifications();
		Object.keys(dropdownModifiers).forEach(function (modifier) {
			var modifierObject = dropdownModifiers[modifier];
			modifiers[modifierObject.variable] = modifierObject.value;
		});
		
		// Jumbotron
		
		var jumbotronModifiers = this.jumbotron.getModifications();
		Object.keys(jumbotronModifiers).forEach(function (modifier) {
			var modifierObject = jumbotronModifiers[modifier];
			modifiers[modifierObject.variable] = modifierObject.value;
		});
		
		// List Group
		
		var listGroupModifiers = this.listGroup.getModifications();
		Object.keys(listGroupModifiers).forEach(function (modifier) {
			var modifierObject = listGroupModifiers[modifier];
			modifiers[modifierObject.variable] = modifierObject.value;
		});

		return modifiers;
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
	 * Applies the Modifications to the Less Theme.
	 * 
	 * @returns {undefined}
	 */
	ThemeEditor.prototype.applyModifications = function () {
		this.generateDownloadBlob();
		this.lessGlobal.modifyVars(this.getModifiers());
	};
	
	ThemeEditor.prototype.parseThemeFile = function (themeFile) {
		var themeXHR;

		if (typeof themeFile !== 'string') {
			throw new TypeError('ThemeEditor.parseThemeFile: The theme file options provided is not a string');
		} else {
			themeXHR = new XMLHttpRequest();
			themeXHR.overrideMimeType('application/json');
			themeXHR.open('GET', themeFile, true);
			themeXHR.onreadystatechange = function () {
				if (themeXHR.readyState === 4 && themeXHR.status === 200) {
					this.modifiers = JSON.parse(themeXHR.responseText);
					this.applyModifications();
				}
			}.bind(this);

			themeXHR.send(null);
		}
	};
	
	ThemeEditor.prototype.createDownloadLink = function (destination) {
		var downloadLink = document.createElement('a'),
			dest = destination === undefined ? 'body' : destination;
		downloadLink.classList.add('btn');
		downloadLink.classList.add('btn-primary');
		downloadLink.textContent = 'Download Theme';
		downloadLink.setAttribute('id', 'download_theme_link');

		downloadLink.setAttribute('download', 'theme.json');

		document.querySelector(dest).appendChild(downloadLink);

		return downloadLink;
	};
	
	ThemeEditor.prototype.generateDownloadBlob = function () {
		var blobData = this.getJSON(),
			blob = new Blob([blobData]),
			downloadLink = this.downloadLink,
			downloadBlob = window.URL.createObjectURL(blob);
	
		downloadLink.setAttribute('href', downloadBlob);
	};

	window.ThemeEditor = ThemeEditor;
})(window);