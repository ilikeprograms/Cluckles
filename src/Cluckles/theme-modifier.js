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

    /**
     * Loads the modifiers input (by setting the value) into this components modifiers, if the modifier
     * variable names match.
     * 
     * @param {object} importModifiers The parsed theme modifiers to load into this component.
     * 
     * @returns {undefined}
     */
    ThemeModifier.prototype.loadModifiers = function (importModifiers) {
        // Make sure we have Modifiers to import
        if (importModifiers === undefined) { return; }

        var modifierNames   = Object.keys(importModifiers);

        // Itterate over each importModifier name
        modifierNames.forEach(function (modifierName) {
            // All of the modifiers of the current component
            var componentModifiers = this.modifiers;

            // Itterate over each component modifer name
            Object.keys(componentModifiers).forEach(function (componentModifierName) {
                // If this component modifier (e.g. this.bg) variable property (e.g. '@jumbotron-bg')
                // matches the import modifier variable name, then set the value
                // of the component modifier, which will set the value and trigger
                // the data binding and update the data subscribers
                if (componentModifiers[componentModifierName].variable === modifierName) {
                    componentModifiers[componentModifierName].value = this.findParentVariableValue(modifierName, importModifiers);
                }
            }, componentModifiers);            
            }, this);            
        }, this);
    };

    /**
     * Attempts to find the parent value of the @variable passed in as variableName, by searching
     * through the modifiers object, until a parent variable is no longer found, in which case returns's
     * the variable.
     * 
     * @param {string} variableName The variable name or variable value (@variable || #000000 etc).
     * @param {object} modifiers The modifiers object to search through.
     * 
     * @returns {string}
     */
    ThemeModifier.prototype.findParentVariableValue = function (variableName, modifiers) {
        var variableValue;

        // If the variable exists in the modifiers
        if (modifiers.hasOwnProperty(variableName)) {
            // Find the variable's value
            variableValue = modifiers[variableName];

            // If the first character is a @, it points to a parent variable
            if (variableValue[0] === '@') {
                // Now try to find the parent variable
                return this.findParentVariableValue(variableValue, modifiers);
            }

            return variableValue;
        }

        // If the modifiers doesnt have a value set for this variable
        return null;
    };
    
    /**
     * Resets all of the Modifiers that this classes stores.
     *  
     * @returns {undefined}
     */
    ThemeModifier.prototype.resetModifiers = function() {
        var componentModifiers = this.modifiers;

        // Itterate over each component modifer name
        Object.keys(componentModifiers).forEach(function (componentModifierName) {
           this[componentModifierName].value = null;
        }, componentModifiers);
    };

    /**
     * Configured the Two Way Databinding for the modifiers, which includes
     * binding multiple DOM Element subscribers which have the "data-cluckles-{{type}}" attribute,
     * which makes them update when the modifiers change, and changing the modifiers when the DOM
     * Element's values change.
     * 
     * Example of Two Way Databinding:
     * 
     * editor.jumbotron.setBackgroundColor('#000000'); // Will Update the modifier and all Subscribers
     * <input type="color" data-cluckles-jumbotron="bg" /> // Will Update the modifier and all Subscribers
     * 
     * @returns {undefined}
     */
    ThemeModifier.prototype.setupDataBinding = function () {
        var editor = this.editor, // ClucklesEditor instance
            // DOM Element Subscribers                                       // *[data-cluckles-{{type}}] e.g. *[data-cluckles-jumbotron]
            subscribers = Array.prototype.slice.call(document.querySelectorAll('*[' + this.subscriberDataAttribute + ']'));

        // Setup the value accessors, and configure them to Notify the subscribers of changes
        Object.keys(this.modifiers).forEach(function(modifierName) {
            var modifier = this.modifiers[modifierName];

            // If a value property has already been defined, we dont need to attach
            // a generic value accessor methods
            if (!modifier.hasOwnProperty('value')) {
                // Define getters/setters to change the value, apply it, and notify subscribers
                Object.defineProperty(modifier, 'value', {
                    get: function () { return this._value; },
                    set: function (val) {
                        var unit = 'px'; // Default unit to append (px, em, rem, etc)

                        // If this property requires a suffix unit
                        // val !== NULL makes sure we can set _value to null,
                        // but stops _value being set to null + unit
                        // without this the theme breaks after being reset
                        if (val !== null && this.suffixUnit) {
                            // Store the raw value
                            this._rawValue = val;

                            // If a custom unit is specified
                            if (this.unit) {
                                // Set the unit to append
                                unit = this.unit;
                            }

                            // Combine the value with the unit
                            this._value = val + unit;
                        } else {
                            // Store the new value
                            this._value = val;
                        }

                        // Queue the modifications to be applied by less
                        editor.queueModifications();

                        // If a value is provided
                        if (val !== null) {
                            // We want to store the current cluckles modifiers 
                            // in the undoStack, so it can be reversed later
                            editor.pushUndoStack();
                        }

                        // Notify each of the Subscribers of the value change
                        this.subscribers.forEach(function (subscriber) {
                            subscriber.value = val;
                        });
                    } 
                });
            }
        }, this);

        // Store the Subscribers, and setup their 'change' listeners
        subscribers.forEach(function (subscriber) {
            // Get the data attribute which should match the subscribeProperty of a modifier
            // which it wants to bind to
            var subscribeToProperty = subscriber.getAttribute(this.subscriberDataAttribute);

            Object.keys(this.modifiers).forEach(function (modifierName) {
                // Get the modifier object
                var modifier = this.modifiers[modifierName];

                // If this modifiers handles the property we want to subscribe to
                if (modifier.subscribeProperty === subscribeToProperty) {
                    // Store the subscriber for this modifier
                    modifier.subscribers.push(subscriber);

                    // Add a change event which will call the change function and pass
                    // through the value of the DOM Element
                    subscriber.addEventListener('change', function (e) {
                        var suffixUnit = e.target.getAttribute('data-cluckles-unit');
                        
                        // If the DOM Element has a "unit" data binding
                        if (suffixUnit) {
                            // Call the change function and provide the extra suffix
                            modifier.changeFn(e.target.value, suffixUnit);
                        } else {
                            // else call change function as default
                            modifier.changeFn(e.target.value);
                        }
                    }, false);
                }
            }, this);
        }, this);
    };