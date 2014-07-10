(function (window) {
	var ThemeModifier = function (editor) {
		Object.defineProperties(this, {
			'editor': {
				enumerable: false,
				value: editor
			},
			'modifiers': {
				enumerable: false,
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