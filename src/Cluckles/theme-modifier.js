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

        if (modifierNames.length === 0) { return filteredModifiers; }

        // Filter out modifiers which are still null
        modifierNames.forEach(function (modifierName) {
            var modifier = modifiers[modifierName];

            if (modifier.value !== null) {
                filteredModifiers[modifierName] = modifier;
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
                var componentModifier   = componentModifiers[componentModifierName],
                    importModifier      = importModifiers[modifierName];

                // If this component modifier (e.g. this.bg) variable property (e.g. '@jumbotron-bg')
                // matches the import modifier variable name, then set the value
                // of the component modifier, which will set the value and trigger
                // the data binding and update the data subscribers
                if (componentModifier.variable === modifierName) {
                    componentModifier.value = this.findParentVariableValue(modifierName, importModifiers);
                    
                    if (importModifier[0] === '@') {
                        componentModifier.parentVar = importModifier;
                    }
                }
            }, this);            
        }, this);
    };
    
    /**
     * Cascades a parents value to any Component modifier, whos parentVar is set
     * to the the parent variable.
     * 
     * @param {string} parentVariable The name of the parent variable.
     * @param {string} parentValue The value of the parent variable.
     * 
     * @returns {undefined}
     */
    ThemeModifier.prototype.cascadeModifier = function (parentVariable, parentValue) {
        this.editor.components.forEach(function (component) {
            // Some of the "components" may be object literals containing
            // actual "components" which inherit from ThemeModifier
            if (component instanceof ThemeModifier) {
                // Load the modifiers into the component, triggering the
                // two way data binding and updating the data subscribers
                var componentModifiers = component.modifiers;
                
                Object.keys(componentModifiers).forEach(function (modifierName) {
                    var modifier = componentModifiers[modifierName];

                    if (modifier.parentVar === parentVariable) {
                        modifier.value      = parentValue;
                        modifier.parentVar  = parentVariable;
                    }
                });
            }
        });
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
        var self        = this,
            editor      = this.editor, // ClucklesEditor instance
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
                        var unit        = this.unit || 'px', // Default unit to append (px, em, rem, etc)
                            hasParent   = false;

                        if (val !== null) {
                            // If the value contains the suffix already (such as when loading from file)
                            if (val.slice(-unit.length) === unit) {
                                // Store the val minus the prefix
                                this._rawValue = val.slice(0, -unit.length);
                            } else {
                                // If the val points to a parent variable (when setting using console API etc)
                                if (val[0] === '@') {
                                    // Find the parent variable value, and store it in this._rawValue
                                    this._rawValue = self.findParentVariableValue(val, self.editor.modifiers.vars);
                                    // Store the parent variable name
                                    this.parentVar = val;

                                    // Make sure we dont remove this.parentVar
                                    hasParent = true;
                                } else {
                                    // If we have a short color code #FFF etc, turn into #FFFFFF
                                    if (val[0] === '#' && val.length === 4) {
                                        this._rawValue = '#' + val.slice(1) + val.slice(1);
                                    } else {
                                        // Store the val
                                        this._rawValue = val;
                                    }
                                }
                            }

                            // If this property requires a suffix unit
                            // val !== NULL makes sure we can set _value to null,
                            // but stops _value being set to null + unit
                            // without this the theme breaks after being reset
                            if (this.suffixUnit) {
                                // Combine the value with the unit
                                this._value = this._rawValue + unit;
                            } else {
                                // Store the new value
                                this._value = this._rawValue;
                            }
                        } else {
                            this._rawValue  = null;
                            this._value     = null;
                        }

                        // Queue the modifications to be applied by less
                        editor.queueModifications();

                        // If a value is provided
                        if (val !== null) {
                            // We want to store the current cluckles modifiers 
                            // in the undoStack, so it can be reversed later
                            editor.pushUndoStack();
                        }

                        // Cascade the Modifier value to any component modifier
                        // whos value is set to the parent variable
                        self.cascadeModifier(this.variable, this._rawValue);

                        // Remove the parentVar if we are directly setting the value,
                        // aslong as we arent setting to a parentVar
                        if (!hasParent && this.hasOwnProperty('parentVar')) {
                            delete this.parentVar;
                        }

                        // Notify each of the Subscribers of the value change
                        this.subscribers.forEach(function (subscriber) {
                            subscriber.value = this._rawValue;
                        }, this);
                    } 
                });
            }
        }, this);

        // Store the Subscribers, and setup their 'change' listeners
        subscribers.forEach(function (subscriber) {
            // Get the data attribute which should match the subscribeProperty of a modifier
            // which it wants to bind to
            var subscribeToProperty = subscriber.getAttribute(this.subscriberDataAttribute),
                // Deletable attribute, points to a target to bind a Delete Event
                deletableAttr       = subscriber.getAttribute('data-cluckles-delete'),
                deleteTarget;

            Object.keys(this.modifiers).forEach(function (modifierName) {
                // Get the modifier object
                var modifier = this.modifiers[modifierName];

                // If this modifiers handles the property we want to subscribe to
                if (modifier.subscribeProperty === subscribeToProperty) {
                    // Store the subscriber for this modifier
                    modifier.subscribers.push(subscriber);

                    // Add a Change Event which will call the change function and pass
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
                    
                    // If the subscriber had a Delete target attr
                    if (deletableAttr) {
                        // Find the Delete target
                        deleteTarget = document.querySelector(deletableAttr);
                        
                        if (deleteTarget) {
                            // Add the Delete event
                            deleteTarget.addEventListener('click', function () {
                                // If the editor modifier has this property
                                if (editor.modifiers.vars.hasOwnProperty(modifier.variable)) {
                                    // Delete the modifier from the editor
                                    delete editor.modifiers.vars[modifier.variable];

                                    // Make the modifier value null, so it wont be fetched
                                    // by editor.getModifiers()
                                    modifier.value = null;
                                }
                            }, false);
                        }
                    }
                }
            }, this);
        }, this);
    };