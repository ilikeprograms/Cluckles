// var ThemeModifier = function (editor) {
//     Object.defineProperties(this, {
//         'editor': {
//             enumerable: false,
//             value: editor
//         },
//         'modifiers': {
//             enumerable: false,
//             writable: true,
//             value: {}
//         }
//     });
// };

class ThemeModifier {
  constructor(editor) {
    this.editor = editor;
    this.modifiers = {};
  }

  /**
   * Finds the modifications to the Component styling.
   *
   * @returns {Object}
   */
  getModifications() {
    const modifiers = this.modifiers;
    const filteredModifiers = {};
    const modifierNames = Object.keys(modifiers);

    if (modifierNames.length === 0) { return filteredModifiers; }

    // Filter out modifiers which are still null
    modifierNames.forEach((modifierName) => {
      const modifier = modifiers[modifierName];

      if (modifier.value !== null) {
        filteredModifiers[modifierName] = modifier;
      }
    });

    return filteredModifiers;
  }

  /**
   * Loads the modifiers input (by setting the value) into this components
   * modifiers, if the modifier variable names match.
   *
   * @param {object} importModifiers The parsed theme modifiers to load into this component.
   *
   * @returns {undefined}
   */
  loadModifiers(importModifiers) {
    // Make sure we have Modifiers to import
    if (importModifiers === undefined) { return; }

    const modifierNames = Object.keys(importModifiers);

    // Itterate over each importModifier name
    modifierNames.forEach((modifierName) => {
      // All of the modifiers of the current component
      const componentModifiers = this.modifiers;

      // Itterate over each component modifer name
      Object.keys(componentModifiers).forEach((componentModifierName) => {
        const componentModifier = componentModifiers[componentModifierName];
        const importModifier = importModifiers[modifierName];

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
      });
    });
  }

  /**
   * Cascades a parents value to any Component modifier, whos parentVar is set
   * to the the parent variable.
   *
   * @param {string} parentVariable The name of the parent variable.
   * @param {string} parentValue The value of the parent variable.
   *
   * @returns {undefined}
   */
  cascadeModifier(parentVariable, parentValue) {
    this.editor.components.forEach((component) => {
      // Some of the "components" may be object literals containing
      // actual "components" which inherit from ThemeModifier
      if (component instanceof ThemeModifier) {
        // Load the modifiers into the component, triggering the
        // two way data binding and updating the data subscribers
        const componentModifiers = component.modifiers;

        Object.keys(componentModifiers).forEach((modifierName) => {
          const modifier = componentModifiers[modifierName];

          if (modifier.parentVar === parentVariable) {
            modifier.value = parentValue;
            modifier.parentVar = parentVariable;
          }
        });
      }
    });
  }

  /**
   * Attempts to find the parent value of the @variable passed in as
   * variableName, by searching through the modifiers object, until a parent
   * variable is no longer found, in which case returns's
   * the variable.
   *
   * @param {string} variableName The variable name or variable value (@variable || #000000 etc).
   * @param {object} modifiers The modifiers object to search through.
   *
   * @returns {string}
   */
  findParentVariableValue(variableName, modifiers) {
    let variableValue;

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
  }

  /**
   * Resets all of the Modifiers that this classes stores.
   *
   * @returns {undefined}
   */
  resetModifiers() {
    const componentModifiers = this.modifiers;

    // Itterate over each component modifer name
    Object.keys(componentModifiers).forEach(function inner(componentModifierName) {
      this[componentModifierName].value = null;
    }, componentModifiers);
  }

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
  setupDataBinding() {
    const self = this;
    const editor = this.editor;
    const subscribers = Array.of(docContext.querySelectorAll('*[' + this.subscriberDataAttribute + ']'));

    Object.keys(this.modifiers).forEach((modifierName) => {
      const modifier = this.modifiers[modifierName];

      // If a value property has already been defined, we dont need to attach
      // a generic value accessor methods
      if (!modifier.hasOwnProperty('value')) {
        // Define getters/setters to change the value, apply it, and notify subscribers
        Object.defineProperty(modifier, 'value', {
          /* eslint object-shorthand: off*/
          get: function getter() { return this._value; },
          set: function setter(val) {
            const unit = this.unit || 'px'; // Default unit to append (px, em, rem, etc)
            let hasParent = false;

            if (val !== null) {
              // If the value contains the suffix already (such as when loading from file)
              if (val.slice(-unit.length) === unit) {
                // Store the val minus the prefix
                this._rawValue = val.slice(0, -unit.length);
              } else {
                // If the val points to a parent variable (when setting using console API etc)
                if (val[0] === '@') {
                  // Find the parent variable value, and store it in this._rawValue
                  this._rawValue = self.findParentVariableValue(val, editor.modifiers.vars);
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
              this._rawValue = null;
              this._value = null;
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
            this.subscribers.forEach((subscriber) => {
              subscriber.value = this._rawValue;
            });
          }
        });
      }
    });

    // Store the Subscribers, and setup their 'change' listeners
    subscribers.forEach((subscriber) => {
      // Get the data attribute which should match the subscribeProperty of a modifier
      // which it wants to bind to
      const subscribeToProperty = subscriber.getAttribute(this.subscriberDataAttribute);
      // Deletable attribute, points to a target to bind a Delete Event
      const deletableAttr = subscriber.getAttribute('data-cluckles-delete');

      let deleteTarget;

      Object.keys(this.modifiers).forEach((modifierName) => {
        // Get the modifier object
        const modifier = this.modifiers[modifierName];

        // If this modifiers handles the property we want to subscribe to
        if (modifier.subscribeProperty === subscribeToProperty) {
          // Store the subscriber for this modifier
          modifier.subscribers.push(subscriber);

          // Add a Change Event which will call the change function and pass
          // through the value of the DOM Element
          subscriber.addEventListener('change', (e) => {
            const suffixUnit = e.target.getAttribute('data-cluckles-unit');

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
            deleteTarget = docContext.querySelector(deletableAttr);

            if (deleteTarget) {
              // Add the Delete event
              deleteTarget.addEventListener('click', () => {
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
      });
    });
  }
}

export default ThemeModifier;
