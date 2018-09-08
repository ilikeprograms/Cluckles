/*!
 * Cluckles 1.1.0: Cluckles Live Theme Editor for CSS Frameworks based on Less such as Twitter Bootstrap.
 * http://cluckles.com
 * 
 * Copyright 2016 Thomas Coleman <tom@ilikeprograms.com>
 * Released under the MIT license
 */
(function (window) {
   var docContext = window.parent.document;
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

export Default ThemeModifier;


    /**
     * Processor which allows the CSS/Less which is output by less to be processed.
     * This can allow the output to be prefixed for display in the editor aswell
     * as appending the not:(options.not) on export if the not option is provided.
     * 
     * Aswell as methods to handle calculating modifier values so they can be parsed by less
     * and transforming the modifiers to a list of variables.
     * 
     * @class Processor
     * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
     * @param {object} options Cluckles options.
     * 
     * @returns {Processor}
     */
    var Processor = function (editor, options) {
        this.editor             = editor;
        this.options            = options;
        this.postProcessorCss   = '';

        this.cssSelectorRegex = new RegExp("" +
            "((?:" + 
                // Match CSS selector pattern e.g ".table > thead > tr > td.danger"
                "(?:" + 
                    "(?:" + 
                        // Match (# or .)
                        "(^\\({0}#)|\\.)|" + 
                        // or Match (these other elements/selector)
                        "(?:^\\w{0}a(?!\\w)|ul|li|textarea)" + 
                    ")" + 
                    // Allow AlphaNumeric, - > : . \s [ ] characters to match (once or more times)
                    "[\\w->+.:\\[\\]\\s]+" + 
                ")" + 
            "+)" + // Match selector pattern atleast once, e.g. allows .table to match, then move to > thead etc
            // End matches with , or {
            "(?=[,{])",
            "mg");

            // Type "clucklesEditor.processor.cssSelectorRegex" in console for combined regex literal :)

        this.setupPostProcessor();
    };
    
    /**
     * Sets up a Callback for the Less#postProcessor callback.
     * 
     * @returns {undefined}
     */
    Processor.prototype.setupPostProcessor = function () {
        var processedCss,
            customCss;
    
        if (this.editor.activePreProcessorName === 'less') {
            var preProcessorBridge = this.editor.getActivePreProcessorBridge();

            // Provide less with the postProcessor callback we want to execute
            preProcessorBridge.postProcessor = function (css) {
                // Store the CSS so it can be retrieved elsewhere
                this.postProcessorCss = css;

                // Generate/Regenerate both of the Download button Blob contents
                this.editor.export.generateCssBlob(css);
                this.editor.export.generateJsonBlob(this.editor.import.customCss, this.editor.import.customLess); // Pass both the Custom Css and Less

                // If the Scope option was provided, we want to prefix all the
                // CSS selectors with our scope, so the theme changes are only
                // applied to the DOMElement we choose and its children
                processedCss = this.selectorProcessor(css);
                customCss    = this.prefixCustomStyles(this.editor.import.customCss, 'Css');

                // Return the Processed and Custom Css
                return processedCss.concat(customCss);
            }.bind(this);
        }
    };
    
    /**
     * Removes the Scope Selector from the CSS input. The CSS may have been prefixed,
     * with an ID which was specified with this.options.scope.selector, so we need
     * to remove it so that the CSS isnt scoped to that element.
     * 
     * @param {strning} css The CSS to process.
     * 
     * @returns {string}
     */
    Processor.prototype.removeScopeSelector = function (css) {
        var processedCss = css;

        // If the scope.selector option wasnt provided, we dont need to worry about this
        if (this.options.hasOwnProperty('scope') && this.options.scope.hasOwnProperty('selector')) {
            // This looks for the scope selector, followed by an optional space, and ending with a , or {
            // and will match the scope selector + the optional space
            var replaceRegex = RegExp('(' + this.options.scope.selector + '\\s?)(?=.*[,{])', 'igm');
            
            // Now remove the scope selector and the optional space
            processedCss = processedCss.replace(replaceRegex, '');
        }
        
        return processedCss;
    };
    
    /**
     * If the options.scope.selector was provided, we prefix all the CSS Selectors
     * in the CSS Input with the CSS Selector provided by the option. This limits the
     * scope of the CSS Generated to be contained inside the DOM Element referenced
     * by the scope selector.
     * 
     * @param {string} css CSS to process and prefix with the options.scope.selector.
     * 
     * @returns {string}
     */
    Processor.prototype.selectorProcessor = function (css) {
        var processedCss = css;
        
        // Prefix the css selectors with this.options.scope.selector
        if (this.options.hasOwnProperty('scope') && this.options.scope.hasOwnProperty('selector')) {
            // Remove the space between "selector {" etc, this is so that a :not can be applied
            processedCss = css.replace(/(?:^.)*(\s)(?={)/igm, '');

            // Use the regex above, $& prefixes the CSS selectors with our scope selector
            processedCss = css.replace(this.cssSelectorRegex, this.options.scope.selector + ' $&');

            // Replace body with the scope selector, stops the body background leaking
            processedCss = processedCss.replace(/^body/mg, this.options.scope.selector);
            // Prefixes the h* small, .h* small h* .small etc with the scope selector
            processedCss = processedCss.replace(/\.?h\d{1} \.?small/mg, this.options.scope.selector + ' $&');
            processedCss = processedCss.replace(/^footer/mg, this.options.scope.selector + ' $&');
        }
        
        return processedCss;
    };
    
    /**
     * Prefixes the Custom Styling provided (string or array) with the options.scope.prefix if
     * the options.scope.customCss || option options.scope.customLess is true,
     * or returns the Styling (concatenated if array is provided).
     * 
     * @param {String|Array} style Array of Custom Styles or singular custom style (to prefix/concatenate).
     * 
     * @returns {Array|String}
     */
    Processor.prototype.prefixCustomStyles = function (style, type) {
        // If the options permit the Styling to be prefixed
        if (this.options.hasOwnProperty('scope') &&
                this.options.scope.hasOwnProperty('custom' + type) &&
                this.options.scope['custom' + type] === true) {
            
            // Prefix the Styles
            if (typeof style === 'string') {
                return this.selectorProcessor(style);
            }

            // or Concatenate and Prefix all the Styles
            return style.reduce(function (prev, cur) {
                return prev + this.selectorProcessor(cur);
            }.bind(this), '');
        } else {
            if (typeof style === 'string') { return style; }

            // Concatentate the array into a string
            return style.reduce(function (allStyles, s) {
                return allStyles + s; },
            '');
        }
    };

    /**
     * Calculates the Modifier values for each modifier by checking if it has a parent,
     * variable referenced. If so the variable is replaced with the parent variable value,
     * then we check if there are brackets in the modifier, if so we attempt to combine
     * the values inside the brackets and calculate the result, apparently for some reason,
     * less breaks otherwise.
     * 
     * @param {Object} modifiers The Cluckles Modifiers we need to calculate/process
     * 
     * @returns {Object}
     */
    Processor.prototype.calculateModifierValues = function (modifiers) {
        // Create a Copy of the Modifiers Object
        modifiers = JSON.parse(JSON.stringify(modifiers));

        Object.keys(modifiers).forEach(function (modifierName) {
            var modifier = modifiers[modifierName];

            // Sanity check for String
            if (typeof modifier === 'string') {
                // Match @variable syntax, globally, so multiple matches possible
                // This would be a parent variable, which the value needs to inherit from
                var vars = modifier.match(/@[\w-]+/ig);

                if (vars) {
                    vars.forEach(function (parentVar) {
                        if (modifiers.hasOwnProperty(parentVar)) {
                            // Replace the Parent variable reference, with the parent variable value
                            modifier = modifier.replace(parentVar, modifiers[parentVar]);

                            // Find values inside of brackets e.g. (30px / 2)
                            var replacements = modifier.match(/\([px\s\d+\-*\/]+\)/ig);

                            if (replacements) {
                                replacements.forEach(function (rep) {
                                    var pxRegex     = /px/ig,
                                        hasUnit     = pxRegex.test(rep), // Find if "px" was inside the match
                                        noUnit      = rep.replace(pxRegex, ''), // Remove the "px" from inside the match
                                        // Use eval to perform the calculation inside the match
                                        calculated  = eval(noUnit); /* jshint ignore:line */

                                    // If there originally was a "px" inside the brackers, we add it back on
                                    if (hasUnit) { calculated += 'px'; }

                                    // Now we replace the original match with the calculated value
                                    // e.g. (30px / 2) -> 15px
                                    modifier = modifier.replace(rep, calculated);
                                });
                            }

                            // Now update the original modifier with the calculated modifier
                            modifiers[modifierName] = modifier;
                        }
                    });
                }
                
                // Remove the 'PX' from the end if we have brackets followed by PX,
                // this would be caused by modifiers being imported and suffixed,
                // instead of set manually
                if (modifiers[modifierName].match(/\(.*\)px$/i)) {
                    modifiers[modifierName] = modifiers[modifierName].slice(0, -2);
                }
            }
        });
        
        return modifiers;
    };

    /**
     * Parses the variables text content passed in and returns an array of variable names and values.
     * 
     * @param {string} variables The variables text to process to modifiers.
     * 
     * @returns {unresolved}
     */
    Processor.prototype.parseVariables = function (variables) {
        // Matches @variable: value; and returns a match for each variable found
        var variablesMatches = variables.match(/^@[\w-]+:\s?(?:.)*(?=;)/igm),
            parsedVars = {};

        if (variablesMatches) {
            variablesMatches.forEach(function (variable) {
                // Split the : to get the key/value
                var variableParts = variable.split(':');

                // Now add the keys/values to the parsedVars Object
                parsedVars[variableParts[0]] = variableParts[1].trim();
            }, this);
        }

        return parsedVars;
    };

    /**
     * Transforms the modifiers into a Variables list (string) which is split up
     * between @variable: value; and new lines.
     * 
     * @param {type} modifiers
     * @returns {String}
     */
    Processor.prototype.transformToVariables = function (modifiers) {
        var variables = '';

        // Calculate the modifier values, before we transform to vars
        modifiers = this.calculateModifierValues(modifiers);

        Object.keys(modifiers).forEach(function (modifierName) {
            // Make sure were not adding _extra etc
            if (modifierName[0] !== '_') {
                // Add the variable and value to the list
                variables += modifierName + ':' + this[modifierName] + ';\n';
            }
        }, modifiers);
        
        return variables;
    };

	/**
	 * Allows modification of the Typography component in Bootstrap.
	 * 
	 * @class Typography
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} fontFamilySansSerif   The @font-family-sans-serif variable which controls the Font Family Sans Serif of the Typography Component.
	 * @property {object} fontFamilySerif       The @font-family-serif variable which controls the Font Family Serif of the Typography Component.
	 * @property {object} fontFamilyMonospace   The @font-family-serif variable which controls the Font Family Monospace of the Typography Component.
	 * @property {object} fontSizeBase          The @font-size-base variable which controls the Font Size Base of the Typography Component.
	 * @property {object} fontSizeH1            The @font-size-h1 variable which controls the H1 Font Size of the Typography Component.
	 * @property {object} fontSizeH2            The @font-size-h1 variable which controls the H2 Font Size of the Typography Component.
	 * @property {object} fontSizeH3            The @font-size-h1 variable which controls the H3 Font Size of the Typography Component.
	 * @property {object} fontSizeH4            The @font-size-h1 variable which controls the H4 Font Size of the Typography Component.
	 * @property {object} fontSizeH5            The @font-size-h1 variable which controls the H5 Font Size of the Typography Component.
	 * @property {object} fontSizeH6            The @font-size-h1 variable which controls the H6 Font Size of the Typography Component.
	 * @property {object} headingsFontFamily    The @headings-font-family variable which controls the Headings Font Family of the Typography Component.
	 * @property {object} headingsFontWeight    The @headings-font-weight variable which controls the Headings Font Weight of the Typography Component.
	 * @property {object} headingsLineHeight    The @headings-line-height variable which controls the Headings Line Height of the Typography Component.
	 * @property {object} headingsColor         The @headings-color variable which controls the Headings Color of the Typography Component.
	 * @property {object} headingsSmallColor    The @headings-small-color variable which controls the Headings Small Color of the Typography Component.
	 * @property {object} lineHeightBase        The @line-height-base variable which controls the Line Height Base of the Typography Component.
     * @property {string} textMuted             The @text-muted variable which sets the Text Muted Color.
     * @property {string} abbrBorderColor       The @abbr-border-color variable which sets the Abbreviations and Acronyms Border Color.
	 * 
	 * @returns {Typography}
	 */
	var Typography = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-typography';

        // Configure the Modifiers
		this.fontFamilySansSerif = {
			variable:           '@font-family-sans-serif',
			subscribeProperty:  'font-family-sans-serif',
            changeFn:           this.setFontFamilySansSerif.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.fontFamilySerif = {
			variable:           '@font-family-serif',
			subscribeProperty:  'font-family-serif',
            changeFn:           this.setFontFamilySerif.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.fontFamilyMonospace = {
			variable:           '@font-family-monospace',
			subscribeProperty:  'font-family-monospace',
            changeFn:           this.setFontFamilyMonospace.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.fontSizeBase = {
			variable:           '@font-size-base',
			subscribeProperty:  'font-size-base',
            suffixUnit:         true,
            changeFn:           this.setFontSizeBase.bind(this),
            subscribers:        [],
			_value:             null
		};
        this.fontSizeH1 = {
            variable:           '@font-size-h1',
			subscribeProperty:  'font-size-h1',
            suffixUnit:         true,
            changeFn:           this.setFontSizeH1.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.fontSizeH2 = {
            variable:           '@font-size-h2',
			subscribeProperty:  'font-size-h2',
            suffixUnit:         true,
            changeFn:           this.setFontSizeH2.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.fontSizeH3 = {
            variable:           '@font-size-h3',
			subscribeProperty:  'font-size-h3',
            suffixUnit:         true,
            changeFn:           this.setFontSizeH3.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.fontSizeH4 = {
            variable:           '@font-size-h4',
			subscribeProperty:  'font-size-h4',
            suffixUnit:         true,
            changeFn:           this.setFontSizeH4.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.fontSizeH5 = {
            variable:           '@font-size-h5',
			subscribeProperty:  'font-size-h5',
            suffixUnit:         true,
            changeFn:           this.setFontSizeH5.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.fontSizeH6 = {
            variable:           '@font-size-h6',
			subscribeProperty:  'font-size-h6',
            suffixUnit:         true,
            changeFn:           this.setFontSizeH6.bind(this),
            subscribers:        [],
			_value:             null
        };
		this.headingsFontFamily = {
			variable:           '@headings-font-family',
			subscribeProperty:  'headings-font-family',
            changeFn:           this.setHeadingsFontFamily.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.headingsFontWeight = {
			variable:           '@headings-font-weight',
			subscribeProperty:  'headings-font-weight',
            changeFn:           this.setHeadingsFontWeight.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.headingsLineHeight = {
			variable:           '@headings-line-height',
			subscribeProperty:  'headings-line-height',
            changeFn:           this.setHeadingsLineHeight.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.headingsColor = {
			variable:           '@headings-color',
			subscribeProperty:  'headings-color',
            changeFn:           this.setHeadingsColor.bind(this),
            subscribers:        [],
			_value:             null
		};
        this.headingsSmallColor = {
            variable:           '@headings-small-color',
            subscribeProperty:  'headings-small-color',
            changeFn:           this.setHeadingsSmallColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.lineHeightBase = {
            variable:           '@line-height-base',
            subscribeProperty:  'line-height-base',
            changeFn:           this.setLineHeightBase.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.textMutedColor = {
            variable:           '@text-muted',
            subscribeProperty:  'text-muted-color',
            changeFn:           this.setTextMutedColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.abbrBorderColor = {
            variable:           '@abbr-border-color',
            subscribeProperty:  'abbr-border-color',
            changeFn:           this.setAbbrBorderColor.bind(this),
            subscribers:        [],
			_value:             null
        };
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            fontFamilySansSerif:    this.fontFamilySansSerif,
            fontFamilySerif:        this.fontFamilySerif,
            fontFamilyMonospace:    this.fontFamilyMonospace,
            fontSizeBase:           this.fontSizeBase,
            fontSizeH1:             this.fontSizeH1,
            fontSizeH2:             this.fontSizeH2,
            fontSizeH3:             this.fontSizeH3,
            fontSizeH4:             this.fontSizeH4,
            fontSizeH5:             this.fontSizeH5,
            fontSizeH6:             this.fontSizeH6,
            headingsFontFamily:     this.headingsFontFamily,
            headingsFontWeight:     this.headingsFontWeight,
            headingsLineHeight:     this.headingsLineHeight,
            headingsColor:          this.headingsColor,
            headingsSmallColor:     this.headingsSmallColor,
            lineHeightBase:         this.lineHeightBase,
            textMutedColor:         this.textMutedColor,
            abbrBorderColor:        this.abbrBorderColor
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Typography.prototype                = Object.create(ThemeModifier.prototype);
	Typography.prototype.constructor    = Typography;

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
     * @param {string} fontFamilySansSerif The Typography Font Family Sans Serif to set.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontFamilySansSerif = function (fontFamilySansSerif) {
        this.modifiers.fontFamilySansSerif.value = fontFamilySansSerif;
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
     * @param {string} fontFamilySerif The Typography Font Family Serif to set.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontFamilySerif = function (fontFamilySerif) {
        this.modifiers.fontFamilySerif.value = fontFamilySerif;
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
     * @param {string} fontFamilyMonospace The Typography Font Family Monospace to set.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontFamilyMonospace = function (fontFamilyMonospace) {
        this.modifiers.fontFamilyMonospace.value = fontFamilyMonospace;
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
     * @param {string} fontSizeBase The Typography Font Size Base to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontSizeBase = function (fontSizeBase, unit) {
        if (unit !== undefined) { this.modifiers.fontSizeBase.unit = unit; }

        this.modifiers.fontSizeBase.value = fontSizeBase;
    };
    
    /**
     * Gets the H1 Font Size Base the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getFontSizeH1 = function () {
        return this.modifiers.fontSizeH1.value;
    };

    /**
     * Sets the H1 Font Size of the Typography Component.
     * 
     * @param {string} fontSizeH1   The Typography H1 Font Size to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontSizeH1 = function (fontSizeH1, unit) {
        if (unit !== undefined) { this.modifiers.fontSizeH1.unit = unit; }

        this.modifiers.fontSizeH1.value = fontSizeH1;
    };
    
    /**
     * Gets the H2 Font Size Base the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getFontSizeH2 = function () {
        return this.modifiers.fontSizeH2.value;
    };

    /**
     * Sets the H2 Font Size of the Typography Component.
     * 
     * @param {string} fontSizeH2   The Typography H2 Font Size to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontSizeH2 = function (fontSizeH2, unit) {
        if (unit !== undefined) { this.modifiers.fontSizeH2.unit = unit; }

        this.modifiers.fontSizeH2.value = fontSizeH2;
    };
    
    /**
     * Gets the H3 Font Size Base the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getFontSizeH3 = function () {
        return this.modifiers.fontSizeH3.value;
    };

    /**
     * Sets the H3 Font Size of the Typography Component.
     * 
     * @param {string} fontSizeH3   The Typography H3 Font Size to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontSizeH3 = function (fontSizeH3, unit) {
        if (unit !== undefined) { this.modifiers.fontSizeH3.unit = unit; }

        this.modifiers.fontSizeH3.value = fontSizeH3;
    };
    
    /**
     * Gets the H4 Font Size Base the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getFontSizeH4 = function () {
        return this.modifiers.fontSizeH4.value;
    };

    /**
     * Sets the H4 Font Size of the Typography Component.
     * 
     * @param {string} fontSizeH4   The Typography H4 Font Size to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontSizeH4 = function (fontSizeH4, unit) {
        if (unit !== undefined) { this.modifiers.fontSizeH4.unit = unit; }

        this.modifiers.fontSizeH4.value = fontSizeH4;
    };
    
    /**
     * Gets the H5 Font Size Base the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getFontSizeH5 = function () {
        return this.modifiers.fontSizeH5.value;
    };

    /**
     * Sets the H5 Font Size of the Typography Component.
     * 
     * @param {string} fontSizeH5   The Typography H5 Font Size to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontSizeH5 = function (fontSizeH5, unit) {
        if (unit !== undefined) { this.modifiers.fontSizeH5.unit = unit; }

        this.modifiers.fontSizeH5.value = fontSizeH5;
    };
    
    /**
     * Gets the H6 Font Size Base the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getFontSizeH6 = function () {
        return this.modifiers.fontSizeH6.value;
    };

    /**
     * Sets the H6 Font Size of the Typography Component.
     * 
     * @param {string} fontSizeH6   The Typography H6 Font Size to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontSizeH6 = function (fontSizeH6, unit) {
        if (unit !== undefined) { this.modifiers.fontSizeH6.unit = unit; }

        this.modifiers.fontSizeH6.value = fontSizeH6;
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
     * @param {string} headingsFontFamily The Typography Headings Font Family to set.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setHeadingsFontFamily = function (headingsFontFamily) {
        this.modifiers.headingsFontFamily.value = headingsFontFamily;
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
     * @param {string} headingsFontWeight The Typography Headings Font Weight to set.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setHeadingsFontWeight = function (headingsFontWeight) {
        this.modifiers.headingsFontWeight.value = headingsFontWeight;
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
     * @param {string} headingsLineHeight The Typography Headings Line Height to set.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setHeadingsLineHeight = function (headingsLineHeight) {
        this.modifiers.headingsLineHeight.value = headingsLineHeight;
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
     * @param {string} headingsColor The Typography Headings Color to set.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setHeadingsColor = function (headingsColor) {
        this.modifiers.headingsColor.value = headingsColor;
    };

    /**
     * Gets the Headings Small Color of the Typography Component.
     * 
     * @returns {undefined}
     */
    Typography.prototype.getHeadingsSmallColor = function () {
        return this.modifiers.headingsSmallColor.value;
    };

    /**
     * Sets the Headings Small Color of the Typography Component.
     * 
     * @param {string} headingsSmallColor The Typography Headings Small Color to set.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setHeadingsSmallColor = function (headingsSmallColor) {
        this.modifiers.headingsSmallColor.value = headingsSmallColor;
    };

    /**
     * Gets the Line Height Base of the Typography Component.
     * 
     * @returns {undefined}
     */
    Typography.prototype.getLineHeightBase = function () {
        return this.modifiers.lineHeightBase.value;
    };

    /**
     * Sets the Line Height Base of the Typography Component.
     * 
     * @param {string} lineHeightBase The Typography Line Height Base to set.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setLineHeightBase = function (lineHeightBase) {
        this.modifiers.lineHeightBase.value = lineHeightBase;
    };

    /**
     * Gets the Text Muted color of the Typography Component.
     * 
     * @returns {String}
     */
    Typography.prototype.getTextMutedColor = function () {
        return this.modifiers.textMutedColor.value;
    };

    /**
     * Sets the Text Muted color of the Typography Component.
     * 
     * @param {string} textMutedColor The Typography Text Muted Color to set.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setTextMutedColor = function (textMutedColor) {
        this.modifiers.textMutedColor.value = textMutedColor;
    };

    /**
     * Gets the Abbr Border Color of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getAbbrBorderColor = function () {
        return this.modifiers.abbrBorderColor.value;
    };

    /**
     * Sets the Abbr Border Color of the Typography Component.
     * 
     * @param {string} abbrBorderColor The Typography Abbr Border Color to set.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setAbbrBorderColor = function (abbrBorderColor) {
        this.modifiers.abbrBorderColor.value = abbrBorderColor;
    };

    /**
     * Allows modifications of the Miscellaneous parts of Bootstrap.
     * 
     * @class Misc
     * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
     * 
     * @property {string} componentActiveBg     The @component-active-bg variable which sets the Global Background Color of bootstrap Components.
     * @property {string} componentActiveColor  The @component-active-color variable which sets the Global Color of bootstrap Components.
     * @property {string} wellBg                The @well-bg variable which sets the Background Color of the Well Component.
     * @property {string} wellBorder            The @well-border variable which sets the Border Color of the Well Component.
     * @property {string} bodyBg                The @body-bg variable which sets the Body Background Color.
     * @property {string} textColor             The @text-color variable which sets the Body Text color.
     * @property {string} pageHeaderBorderColor The @page-header-border-color variable which sets the Page Header Border Color.
     * @property {string} linkColor             The @link-color variable which sets the Link Color.
     * @property {string} linkHoverColor        The @link-hover-color variable which sets the Link Hover Color.
     * @property {string} linkHoverDecoration   The @link-hover-decoration variable which sets the Link Hover Decoration
     * @property {string} hrBorder              The @hr-border variable which sets the Color of the <hr> tag.
     * @property {string} borderRadiusBase      The @border-radius-base variable which sets the Base Border Radius.
     * @property {string} iconFontPath          The @icon-font-path variable which sets Directory to load Glyphicon fonts from.
     * 
     * @returns {Misc}
     */
    var Misc = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-misc';

        // Define the Modifiers
        this.componentActiveBg = {
            variable:           '@component-active-bg',
            subscribeProperty:  'component-active-bg',
            changeFn:           this.setComponentActiveBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.componentActiveColor = {
            variable:           '@component-active-color',
            subscribeProperty:  'component-active-color',
            changeFn:           this.setComponentActiveColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.wellBg = {
            variable:           '@well-bg',
            subscribeProperty:  'well-bg',
            changeFn:           this.setWellBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.wellBorder = {
            variable:           '@well-border',
            subscribeProperty:  'well-border',
            changeFn:           this.setWellBorderColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.bodyBg = {
            variable:           '@body-bg',
            subscribeProperty:  'body-bg',
            changeFn:           this.setBodyBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.textColor = {
            variable:           '@text-color',
            subscribeProperty:  'text-color',
            changeFn:           this.setTextColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.pageHeaderBorderColor = {
            variable:           '@page-header-border-color',
            subscribeProperty:  'page-header-border-color',
            changeFn:           this.setPageHeaderBorderColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.linkColor = {
            variable:           '@link-color',
            subscribeProperty:  'link-color',
            changeFn:           this.setLinkColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.linkHoverColor = {
            variable:           '@link-hover-color',
            subscribeProperty:  'link-hover-color',
            changeFn:           this.setLinkHoverColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.linkHoverDecoration = {
            variable:           '@link-hover-decoration',
            subscribeProperty:  'link-hover-decoration',
            changeFn:           this.setLinkHoverDecoration.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.hrBorder = {
            variable:           '@hr-border',
            subscribeProperty:  'horizontal-rule',
            changeFn:           this.setHrBorder.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.borderRadiusBase = {
            variable:           '@border-radius-base',
            subscribeProperty:  'border-radius-base',
            suffixUnit:         true,
            changeFn:           this.setBorderRadiusBase.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.iconFontPath = {
            variable:           '@icon-font-path',
            subscribeProperty:  'icon-font-path',
            changeFn:           this.setIconFontPath.bind(this),
            subscribers:        [],
			_value:             null
        };

        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            componentActiveBg:      this.componentActiveBg,
            componentActiveColor:   this.componentActiveColor,
            wellBg:                 this.wellBg,
            wellBorder:             this.wellBorder,
            bodyBg:                 this.bodyBg,
            textColor:              this.textColor,
            pageHeaderBorderColor:  this.pageHeaderBorderColor,
            linkColor:              this.linkColor,
            linkHoverColor:         this.linkHoverColor,
            linkHoverDecoration:    this.linkHoverDecoration,
            hrBorder:               this.hrBorder,
            borderRadiusBase:       this.borderRadiusBase,
            iconFontPath:           this.iconFontPath
        };

        this.setupDataBinding();
    };

    // Inherit from parent Prototype and preserve constructor
    Misc.prototype              = Object.create(ThemeModifier.prototype);
    Misc.prototype.constructor  = Misc;

    /**
     * Gets the Global Background Color of Components.
     * 
     * @returns {string}
     */
    Misc.prototype.getComponentActiveBackgroundColor = function () {
        return this.modifiers.componentActiveBg.value;
    };
    
    /**
     * Sets the Global Background Color of Components, such as Panel body, List Groups.
     * 
     * @param {string} backgroundColor The Global Background Color of Components to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setComponentActiveBackgroundColor = function (backgroundColor) {
        this.modifiers.componentActiveBg.value = backgroundColor;
    };

    /**
     * Gets the Global Color of Components.
     * 
     * @returns {string}
     */
    Misc.prototype.getComponentActiveColor = function () {
        return this.modifiers.componentActiveColor.value;
    };

    /**
     * Sets the Global Color of Components, such as Panel body, List Groups.
     * 
     * @param {string} backgroundColor The Global Color of Components to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setComponentActiveColor = function (color) {
        this.modifiers.componentActiveColor.value = color;
    };

    /**
     * Gets the Background Color of the Well Components.
     * 
     * @returns {string}
     */
    Misc.prototype.getWellBackgroundColor = function () {
        return this.modifiers.wellBg.value;
    };

    /**
     * Sets the Background Color of the Well Component.
     * 
     * @param {string} wellBackgroundColor The Well Background Color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setWellBackgroundColor = function (wellBackgroundColor) {
        this.modifiers.wellBg.value = wellBackgroundColor;
    };

    /**
     * Gets the Border Color of the Well Components.
     * 
     * @returns {string}
     */
    Misc.prototype.getWellBorderColor = function () {
        return this.modifiers.wellBorder.value;
    };

    /**
     * Sets the Border Color of the Well Component.
     * 
     * @param {string} wellBorder The Well Border Color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setWellBorderColor = function (wellBorder) {
        this.modifiers.wellBorder.value = wellBorder;
    };

    /**
     * Gets the Body Background Color.
     * 
     * @returns {string}
     */
    Misc.prototype.getBodyBackgroundColor = function () {
        return this.modifiers.bodyBg.value;
    };

    /**
     * Sets the Body Background Color.
     * 
     * @param {string} bodyBackgroundColor The Body Background Color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setBodyBackgroundColor = function (bodyBackgroundColor) {
        this.modifiers.bodyBg.value = bodyBackgroundColor;
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
     * @param {string} bodyTextColor The Body Text Color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setTextColor = function (bodyTextColor) {
        this.modifiers.textColor.value = bodyTextColor;
    };

    /**
     * Gets the Page Header Border Color.
     * 
     * @returns {string}
     */
    Misc.prototype.getPageHeaderColor = function () {
        return this.modifiers.pageHeaderBorderColor.value;
    };

    /**
     * Sets the Page Header Border Color.
     * 
     * @param {string} pageHeaderBorderColor The Page Header Border Color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setPageHeaderBorderColor = function (pageHeaderBorderColor) {
        this.modifiers.pageHeaderBorderColor.value = pageHeaderBorderColor;
    };

    /**
     * Gets the Link Color.
     * 
     * @returns {String}
     */
    Misc.prototype.getLinkColor = function () {
        return this.modifiers.linkColor.value;
    };

    /**
     * Sets the Link Color.
     * 
     * @param {string} linkColor The Link Color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setLinkColor = function (linkColor) {
        this.modifiers.linkColor.value = linkColor;
    };

    /**
     * Gets the Link Hover Color.
     * 
     * @returns {String}
     */
    Misc.prototype.getLinkHoverColor = function () {
        return this.modifiers.linkHoverColor.value;
    };

    /**
     * Sets the Link Hover Color.
     * 
     * @param {string} linkHoverColor The Link Hover Color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setLinkHoverColor = function (linkHoverColor) {
        this.modifiers.linkHoverColor.value = linkHoverColor;
    };

    /**
     * Gets the Link Hover Decoration.
     * 
     * @returns {String}
     */
    Misc.prototype.getLinkHoverDecoration = function () {
        return this.modifiers.linkHoverDecoration.value;
    };

    /**
     * Sets the Link Hover Decoration.
     * 
     * @param {string} linkHoverDecoration The Link Hover Decoration to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setLinkHoverDecoration = function (linkHoverDecoration) {
        this.modifiers.linkHoverDecoration.value = linkHoverDecoration;
    };

    /**
     * Gets the Horizontal Rule Color.
     * 
     * @returns {String}
     */
    Misc.prototype.getHrBorder = function () {
        return this.modifiers.hrBorder.value;
    };
    
    /**
     * Sets the Horizontal Rule Color.
     * 
     * @param {string} hrBorder The Horizontal Rule Color to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setHrBorder = function (hrBorder) {
        this.modifiers.hrBorder.value = hrBorder;
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
     * Sets the Border Radius Base.
     * 
     * @param {string} borderRadiusBase The Border Radius Base to set.
     * @param {string} unit             The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setBorderRadiusBase = function (borderRadiusBase, unit) {
        if (unit !== undefined) { this.modifiers.borderRadiusBase.unit = unit; }

        this.modifiers.borderRadiusBase.value = borderRadiusBase;
    };

    /**
     * Gets the Icon Font Path.
     * 
     * @returns {String}
     */
    Misc.prototype.getIconFontPath = function () {
        return this.modifiers.iconFontPath.value;
    };
    
    /**
     * Sets the Icon Font Path.
     * 
     * @param {string} hrBorder The Icon Font Path to set.
     * 
     * @returns {undefined}
     */
    Misc.prototype.setIconFontPath = function (iconFontPath) {
        this.modifiers.iconFontPath.value = iconFontPath;
    };

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

    /**
	 * Allows modification of the Breadcrumb Component in Bootstrap.
	 * 
	 * @class Breadcrumb
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} bg                The @breadcrumb-bg variable which controls the Background Color of the Breadcrumb Component.
	 * @property {object} color             The @breadcrumb-color variable which controls the Color of the Breadcrumb Component.
	 * @property {object} activeColor       The @breadcrumb-active-color variable which controls the Active Color of the Breadcrumb Component.
	 * @property {object} separator         The @breadcrumb-seperator variable which controls the Separator Character of the Breadcrumb Component.
     * @property {string} paddingHorizontal The @breadcrumb-padding-horizontal variable which sets the Horizontal Padding of the Breadcrumb Component.
     * @property {string} paddingVertical   The @breadcrumb-padding-vertical variable which sets the Vertical Padding of the Breadcrumb Component.
     * 
     * @returns {Breadcrumb}
     */
    var Breadcrumb = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-breadcrumb';

        this.bg = {
            variable:           '@breadcrumb-bg',
            subscribeProperty:  'bg',
            changeFn:           this.setBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.color = {
            variable:           '@breadcrumb-color',
            subscribeProperty:  'color',
            changeFn:           this.setColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.activeColor = {
            variable:           '@breadcrumb-active-color',
            subscribeProperty:  'active-color',
            changeFn:           this.setActiveColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.separator = {
            variable:           '@breadcrumb-separator',
            subscribeProperty:  'separator',
            changeFn:           this.setSeparator.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.paddingHorizontal = {
            variable:           '@breadcrumb-padding-horizontal',
            subscribeProperty:  'padding-horizontal',
            suffixUnit:         true,
            changeFn:           this.setPaddingHorizontal.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.paddingVertical = {
            variable:           '@breadcrumb-padding-vertical',
            subscribeProperty:  'padding-vertical',
            suffixUnit:         true,
            changeFn:           this.setPaddingVertical.bind(this),
            subscribers:        [],
			_value:             null
        };

        this.modifiers = {
            bg:                 this.bg,
            color:              this.color,
            activeColor:        this.activeColor,
            separator:          this.separator,
            paddingHorizontal:  this.paddingHorizontal,
            paddingVertical:    this.paddingVertical
        };

        this.setupDataBinding();
    };

    // Inherit from parent Prototype and preserve constructor
    Breadcrumb.prototype                = Object.create(ThemeModifier.prototype);
    Breadcrumb.prototype.constructor    = Breadcrumb;

    /**
	 * Gets the Background Color of the Breadcrumb Component.
	 * 
	 * @returns {String}
	 */
	Breadcrumb.prototype.getBackgroundColor = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background Color of the Breadcrumb Component.
	 * 
	 * @param {string} backgroundColor The Breadcrumb Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Breadcrumb.prototype.setBackgroundColor = function (backgroundColor) {
		this.modifiers.bg.value = backgroundColor;
	};

    /**
	 * Gets the Color of the Breadcrumb Component.
	 * 
	 * @returns {string}
	 */
	Breadcrumb.prototype.getColor = function () {
		return this.modifiers.color.value;
	};

	/**
	 * Sets the Color of the Breadcrumb Component.
	 * 
	 * @param {string} color The Breadcrumb Color to set.
	 * 
	 * @returns {undefined}
	 */
	Breadcrumb.prototype.setColor = function (color) {
		this.modifiers.color.value = color;
	};

    /**
	 * Gets the Active Color of the Breadcrumb Component.
	 * 
	 * @returns {string}
	 */
	Breadcrumb.prototype.getActiveColor = function () {
		return this.modifiers.activeColor.value;
	};

	/**
	 * Sets the Active Color of the Breadcrumb Component.
	 * 
	 * @param {string} activeColor The Breadcrumb Active Color to set.
	 * 
	 * @returns {undefined}
	 */
	Breadcrumb.prototype.setActiveColor = function (activeColor) {
		this.modifiers.activeColor.value = activeColor;
	};

    /**
	 * Gets the Separator Character of the Breadcrumb Component.
	 * 
	 * @returns {string}
	 */
	Breadcrumb.prototype.getSeperator = function () {
		return this.modifiers.separator.value;
	};

	/**
	 * Sets the Separator Character of the Breadcrumb Component.
	 * 
	 * @param {string} separator The Breadcrumb Separator Character to set.
	 * 
	 * @returns {undefined}
	 */
	Breadcrumb.prototype.setSeparator = function (separator) {
		this.modifiers.separator.value = separator;
	};

    /**
     * Sets the Horizontal Padding of the Breadcrumb Components.
     * 
     * @param {string} horizontalPadding The Breadcrumb Horizontal Padding to set.
     * @param {string} unit              The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Breadcrumb.prototype.setPaddingHorizontal = function (paddingHorizontal, unit) {
        if (unit !== undefined) { this.modifiers.paddingHorizontal.unit = unit; }

        this.modifiers.paddingHorizontal.value = paddingHorizontal;
    };

    /**
     * Gets the Vertical Padding of the Breadcrumb Components.
     * 
     * @returns {string}
     */
    Breadcrumb.prototype.getPaddingVertical = function () {
        return this.modifiers.paddingVertical.value;
    };

    /**
     * Sets the Horizontal Padding of the Breadcrumb Components.
     * 
     * @param {string} verticalPadding  The Breadcrumb Horizontal Padding to set.
     * @param {string} unit             The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Breadcrumb.prototype.setPaddingVertical = function (paddingVertical, unit) {
        if (unit !== undefined) { this.modifiers.paddingVertical.unit = unit; }

        this.modifiers.paddingVertical.value = paddingVertical;
    };

    /**
     * Allows modification of the General Panel Component Styling.
     * 
     * @class PanelBase
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
     * 
     * @property {string} panelFooterBg     The @panel-footer-bg variable which sets the Footer Background Color of Panel Components.
     * @property {string} panelBodyPadding  The @panel-body-padding variable which sets the Body Padding of Panel Components.
     * @property {string} panelBorderRadius The @panel-border-radius variable which sets the Border Radius of Panel Components.
     * 
     * @returns {PanelBase}
     */
    var PanelBase = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-panelbase';

        this.panelFooterBg = {
            variable:           '@panel-footer-bg',
            subscribeProperty:  'footer-bg',
            changeFn:           this.setPanelFooterBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.panelBodyPadding = {
            variable:           '@panel-body-padding',
            subscribeProperty:  'body-padding',
            suffixUnit:         true,
            changeFn:           this.setPanelBodyPadding.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.panelBorderRadius = {
            variable:           '@panel-border-radius',
            subscribeProperty:  'border-radius',
            suffixUnit:         true,
            changeFn:           this.setPanelBorderRadius.bind(this),
            subscribers:        [],
			_value:             null
        };
        
        this.modifiers = {
            panelFooterBg:      this.panelFooterBg,
            panelBodyPadding:   this.panelBodyPadding,
            panelBorderRadius:  this.panelBorderRadius
        };

        this.setupDataBinding();
    };
    
    // Inherit from parent Prototype and preserve constructor
    PanelBase.prototype             = Object.create(ThemeModifier.prototype);
    PanelBase.prototype.constructor = PanelBase;

    /**
     * Gets the Footer Background Color of the Panel Components.
     * 
     * @returns {string}
     */
    PanelBase.prototype.getPanelFooterBackgroundColor = function () {
        return this.modifiers.panelFooterBg.value;
    };

    /**
     * Sets the Footer Background Color of the Panel Components.
     * 
     * @param {string} panelFooterBg The Panel Footer Background Color to set.
     * 
     * @returns {undefined}
     */
    PanelBase.prototype.setPanelFooterBackgroundColor = function (panelFooterBg) {
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
     * @param {string} unit             The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    PanelBase.prototype.setPanelBodyPadding = function (panelBodyPadding, unit) {
        if (unit !== undefined) { this.modifiers.panelBodyPadding.unit = unit; }

        this.modifiers.panelBodyPadding.value = panelBodyPadding;
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
     * @param {string} unit              The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    PanelBase.prototype.setPanelBorderRadius = function (panelBorderRadius, unit) {
        if (unit !== undefined) { this.modifiers.panelBorderRadius.unit = unit; }

        this.modifiers.panelBorderRadius.value = panelBorderRadius;
    };

    /**
     * Allows modification of the General Navbar Component Styling.
     * 
     * @class NavbarBase
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
     * 
     * @property {string} height            The @navbar-height variable which sets the Height of Navbar Components.
     * @property {string} marginBottom      The @navbar-margin-bottom variable which sets the Margin Bottom of Navbar Components.
     * @property {string} borderRadius      The @navbar-border-radius variable which sets the Border Radius of Navbar Components.
     * @property {string} collapseMaxHeight The @navbar-collapse-max-height variable which sets the Max Height of the Navbar Collapse Components.
     * @property {string} paddingHorizontal The @navbar-padding-horizontal variable which sets the Horizontal Padding of the Navbar Collapse Components.
     * @property {string} paddingVertical   The @navbar-padding-vertical variable which sets the Vertical Padding of the Navbar Collapse Components.
     * 
     * @returns {NavbarBase}
     */
    var NavbarBase = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-navbar';

        // Define the Modifiers
        this.height = {
            variable:           '@navbar-height',
            subscribeProperty:  'height',
            suffixUnit:         true,
            changeFn:           this.setHeight.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.marginBottom = {
            variable:           '@navbar-margin-bottom',
            subscribeProperty:  'margin-bottom',
            suffixUnit:         true,
            changeFn:           this.setMarginBottom.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.borderRadius = {
            variable:           '@navbar-border-radius',
            subscribeProperty:  'border-radius',
            suffixUnit:         true,
            changeFn:           this.setBorderRadius.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.collapseMaxHeight = {
            variable:           '@navbar-collapse-max-height',
            subscribeProperty:  'collapse-max-height',
            suffixUnit:         true,
            changeFn:           this.setCollapseMaxHeight.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.paddingHorizontal = {
            variable:           '@navbar-padding-horizontal',
            subscribeProperty:  'padding-horizontal',
            suffixUnit:         true,
            changeFn:           this.setPaddingHorizontal.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.paddingVertical = {
            variable:           '@navbar-padding-vertical',
            subscribeProperty:  'padding-vertical',
            suffixUnit:         true,
            changeFn:           this.setPaddingVertical.bind(this),
            subscribers:        [],
			_value:             null
        };
        
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            height:             this.height,
            marginBottom:       this.marginBottom,
            borderRadius:       this.borderRadius,
            collapseMaxHeight:  this.collapseMaxHeight,
            paddingHorizontal:  this.paddingHorizontal,
            paddingVertical:    this.paddingVertical
        };

        this.setupDataBinding();
    };
    
    // Inherit from parent Prototype and preserve constructor
    NavbarBase.prototype                = Object.create(ThemeModifier.prototype);
    NavbarBase.prototype.constructor    = NavbarBase;

    /**
     * Gets the Height of the Navbar Components.
     * 
     * @returns {string}
     */
    NavbarBase.prototype.getHeight = function () {
        return this.modifiers.height.value;
    };

    /**
     * Sets the Height of the Navbar Components.
     * 
     * @param {string} height The Navbar Height to set.
     * @param {string} unit   The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    NavbarBase.prototype.setHeight = function (height, unit) {
        if (unit !== undefined) { this.modifiers.height.unit = unit; }

        this.modifiers.height.value = height;
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
     * Sets the Margin Bottom of the Navbar Components.
     * 
     * @param {string} marginBottom The Navbar Margin Bottom to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    NavbarBase.prototype.setMarginBottom = function (marginBottom, unit) {
        if (unit !== undefined) { this.modifiers.marginBottom.unit = unit; }

        this.modifiers.marginBottom.value = marginBottom;
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
     * Sets the Border Radius of the Navbar Components.
     * 
     * @param {string} borderRadius The Navbar Border Radius to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    NavbarBase.prototype.setBorderRadius = function (borderRadius, unit) {
        if (unit !== undefined) { this.modifiers.borderRadius.unit = unit; }

        this.modifiers.borderRadius.value = borderRadius;
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
     * Sets the Collapse Max Height of the Navbar Components.
     * 
     * @param {string} collapseMaxHeight The Navbar Collapse Max Height to set.
     * @param {string} unit              The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    NavbarBase.prototype.setCollapseMaxHeight = function (collapseMaxHeight, unit) {
        if (unit !== undefined) { this.modifiers.collapseMaxHeight.unit = unit; }

        this.modifiers.collapseMaxHeight.value = collapseMaxHeight;
    };

    /**
     * Gets the Horizontal Padding of the Navbar Components.
     * 
     * @returns {string}
     */
    NavbarBase.prototype.getPaddingHorizontal = function () {
        return this.modifiers.paddingHorizontal.value;
    };

    /**
     * Sets the Horizontal Padding of the Navbar Components.
     * 
     * @param {string} horizontalPadding The Navbar Horizontal Padding to set.
     * @param {string} unit              The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    NavbarBase.prototype.setPaddingHorizontal = function (paddingHorizontal, unit) {
        if (unit !== undefined) { this.modifiers.paddingHorizontal.unit = unit; }

        this.modifiers.paddingHorizontal.value = paddingHorizontal;
    };

    /**
     * Gets the Vertical Padding of the Navbar Components.
     * 
     * @returns {string}
     */
    NavbarBase.prototype.getPaddingVertical = function () {
        return this.modifiers.paddingVertical.value;
    };

    /**
     * Sets the Horizontal Padding of the Navbar Components.
     * 
     * @param {string} verticalPadding  The Navbar Horizontal Padding to set.
     * @param {string} unit             The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    NavbarBase.prototype.setPaddingVertical = function (paddingVertical, unit) {
        if (unit !== undefined) { this.modifiers.paddingVertical.unit = unit; }

        this.modifiers.paddingVertical.value = paddingVertical;
    };

    /**
     * Allows modification of the General Button Component Styling.
     * 
     * @class ButtonBase
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
     * 
     * @property {string} fontWeight        The @btn-font-weight variable which sets the Font weight of Button Components.
     * @property {string} disabledLinkColor The @btn-link-disabled-color variable which sets the Disabled Link color of Button Components.
     * 
     * @returns {ButtonBase}
     */
    var ButtonBase = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-buttonbase';

        // Configure the Modifiers
        this.fontWeight = {
            variable:           '@btn-font-weight',
            subscribeProperty:  'font-weight',
            changeFn:           this.setFontWeight.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.disabledLinkColor = {
            variable:           '@btn-link-disabled-color',
            subscribeProperty:  'disabled-link-color',
            changeFn:           this.setDisabledLinkColor.bind(this),
            subscribers:        [],
			_value:             null
        };

        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            fontWeight:         this.fontWeight,
            disabledLinkColor:  this.disabledLinkColor
        };

        this.setupDataBinding();
    };

    // Inherit from parent Prototype and preserve constructor
    ButtonBase.prototype                = Object.create(ThemeModifier.prototype);
    ButtonBase.prototype.constructor    = ButtonBase;

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
        this.modifiers.fontWeight.value = buttonFontWeight;
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
        this.modifiers.disabledLinkColor.value = disabledLinkColor;
    };

    /**
     * Allows modification of the General Label Component Styling.
     * 
     * @class Label
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
     * 
     * @property {string} color             The @label-color variable which sets the Color of Label Components.
     * @property {string} linkHoverColor    The @label-link-hover-color variable which sets the Link Hover Color of Label Components.
     * @property {string} defaultBg         The @label-default-bg variable which affects the Default Label Background Color.
	 * @property {string} primaryBg         The @label-primary-bg variable which affects the Primary Label Background Color.
	 * @property {string} successBg         The @label-success-bg variable which affects the Success Label Background Color.
	 * @property {string} infoBg            The @label-info-bg variable which affects the Info Label Background Color.
	 * @property {string} warningBg         The @label-warning-bg variable which affects the Warning Label Background Color.
	 * @property {string} dangerBg          The @label-danger-bg variable which affects the Danger Label Background Color.
     * 
     * @returns {Label}
     */
    var Label = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-label';

        // Configure the Modifiers
        this.color = {
            variable:           '@label-color',
            subscribeProperty:  'color',
            changeFn:           this.setColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.linkHoverColor = {
            variable:           '@label-link-hover-color',
            subscribeProperty:  'link-hover-color',
            changeFn:           this.setLinkHoverColor.bind(this),
            subscribers:        [],
			_value:             null
        };
		this.defaultBg = {
			variable:           '@label-default-bg',
			subscribeProperty:  'default-bg',
            changeFn:           this.setDefaultBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.primaryBg = {
			variable:           '@label-primary-bg',
			subscribeProperty:  'primary-bg',
            changeFn:           this.setPrimaryBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.successBg = {
			variable:           '@label-success-bg',
			subscribeProperty:  'success-bg',
            changeFn:           this.setSuccessBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.infoBg = {
			variable:           '@label-info-bg',
			subscribeProperty:  'info-bg',
            changeFn:           this.setInfoBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.warningBg = {
			variable:           '@label-warning-bg',
			subscribeProperty:  'warning-bg',
            changeFn:           this.setWarningBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.dangerBg = {
			variable:           '@label-danger-bg',
			subscribeProperty:  'danger-bg',
            changeFn:           this.setDangerBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
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

        this.setupDataBinding();
    };

    // Inherit from parent Prototype and preserve constructor
    Label.prototype             = Object.create(ThemeModifier.prototype);
    Label.prototype.constructor = Label;

    /**
     * Gets the Color of the Label Component.
     * 
     * @returns {string}
     */
    Label.prototype.getColor = function () {
        return this.modifiers.color.value;
    };

    /**
     * Sets the Color of the Label Component.
     * 
     * @param {string} color The Label Color to set.
     * 
     * @returns {string}
     */
    Label.prototype.setColor = function (color) {
        this.modifiers.color.value = color;
    };

    /**
     * Gets the Link Hover Color of the Label Components.
     * 
     * @returns {string}
     */
    Label.prototype.getLinkHoverColor = function () {
        return this.modifiers.linkHoverColor.value;
    };

    /**
     * Gets the Link Hover Color of the Label Components.
     * 
     * @param {string} linkHoverColor The Label Link Hover Color to set.
     * 
     * @returns {undefined}
     */
    Label.prototype.setLinkHoverColor = function (linkHoverColor) {
        this.modifiers.linkHoverColor.value = linkHoverColor;
    };

    /**
	 * Gets the Default Label Background Color.
	 * 
	 * @returns {undefined}
	 */
	Label.prototype.getDefaultBackgroundColor = function () {
		return this.modifiers.defaultBg.value;
	};

	/**
	 * Sets the Default Label Background Color.
	 * 
	 * @param {string} defaultBackgroundColor The Label Default Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Label.prototype.setDefaultBackgroundColor = function (defaultBackgroundColor) {
		this.modifiers.defaultBg.value = defaultBackgroundColor;
	};

	/**
	 * Gets the Primary Label Background Color.
	 * 
	 * @returns {string}
	 */
	Label.prototype.getPrimaryBackgroundColor = function () {
		return this.modifiers.primaryBg.value;
	};

	/**
	 * Sets the Primary Label Background Color.
	 * 
	 * @param {string} primaryBackgroundColor The Label Primary Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Label.prototype.setPrimaryBackgroundColor = function (primaryBackgroundColor) {
		this.modifiers.primaryBg.value = primaryBackgroundColor;
	};

	/**
	 * Gets the Success Label Background Color.
	 * 
	 * @returns {string}
	 */
	Label.prototype.getSuccessBackgroundColor = function () {
		return this.modifiers.successBg.value;
	};

	/**
	 * Sets the Success Label Background Color.
	 * 
	 * @param {string} successBackgroundColor The Label Success Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Label.prototype.setSuccessBackgroundColor = function (successBackgroundColor) {
		this.modifiers.successBg.value = successBackgroundColor;
	};

	/**
	 * Gets the Info Label Background Color.
	 * 
	 * @returns {string}
	 */
	Label.prototype.getInfoBackgroundColor = function () {
		return this.modifiers.infoBg.value;
	};

	/**
	 * Sets the Info Label Background Color.
	 * 
	 * @param {string} infoBackgroundColor The Label Info Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Label.prototype.setInfoBackgroundColor = function (infoBackgroundColor) {
		this.modifiers.infoBg.value = infoBackgroundColor;
	};

	/**
	 * Gets the Warning Label Background Color.
	 * 
	 * @returns {string}
	 */
	Label.prototype.getWarningBackgroundColor = function () {
		return this.modifiers.warningBg.value;
	};

	/**
	 * Sets the Warning Label Background Color.
	 * 
	 * @param {type} warningBackgroundColor The Label Warning Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Label.prototype.setWarningBackgroundColor = function (warningBackgroundColor) {
		this.modifiers.warningBg.value = warningBackgroundColor;
	};

	/**
	 * Gets the Danger Label Background Color.
	 * 
	 * @returns {string}
	 */
	Label.prototype.getDangerBackgroundColor = function () {
		return this.modifiers.dangerBg.value;
	};

	/**
	 * Sets the Danger Label Background Color.
	 * 
	 * @param {string} dangerBackgroundColor The Label Danger Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Label.prototype.setDangerBackgroundColor = function (dangerBackgroundColor) {
		this.modifiers.dangerBg.value = dangerBackgroundColor;
	};

    /**
     * Allows modifications of the Nav Components in Bootstrap.
     * 
	 * @class Nav
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
     * 
     * @property {object} linkPadding               The @nav-link-padding variable which controls the Link Padding of the Nav Component.
     * @property {object} linkHoverBg               The @nav-link-hover-bg variable which controls the Link Hover Color of the Nav Component.
     * @property {object} linkDisabledColor         The @nav-disabled-link-color variable which controls the Disabled Link Color of the Nav Component.
     * @property {object} linkDisabledHoverColor    The @nav-disabled-link-hover-color variable which controls the Disabled Link Hover Color of the Nav Component.
     * 
     * @returns {Nav}
     */
    var Nav = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-nav';

        // Configure the Modifiers
        this.linkPadding = {
            variable:           '@nav-link-padding',
            subscribeProperty:  'link-padding',
            suffixUnit:         true,
            changeFn:           this.setLinkPadding.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.linkHoverBg = {
            variable:           '@nav-link-hover-bg',
            subscribeProperty:  'link-hover-bg',
            changeFn:           this.setLinkHoverBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.linkDisabledColor = {
            variable:           '@nav-disabled-link-color',
            subscribeProperty:  'link-disabled-color',
            changeFn:           this.setLinkDisabledColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.linkDisabledHoverColor = {
            variable:           '@nav-disabled-link-hover-color',
            subscribeProperty:  'link-disabled-hover-color',
            changeFn:           this.setLinkDisabledHoverColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            linkPadding:            this.linkPadding,
            linkHoverBg:            this.linkHoverBg,
            linkDisabledColor:      this.linkDisabledColor,
            linkDisabledHoverColor: this.linkDisabledHoverColor
        };

        this.setupDataBinding();
    };

    // Inherit from parent Prototype and preserve constructor
    Nav.prototype               = Object.create(ThemeModifier.prototype);
    Nav.prototype.constructor   = Nav;

    /**
     * Gets the Link Padding of the Nav Components.
     * 
     * @returns {String}
     */
    Nav.prototype.getLinkPadding = function () {
        return this.modifiers.linkPadding.value;
    };
    
    /**
     * Sets the Link Padding of the Nav Components.
     * 
     * @param {string} linkPadding The Nav Link Padding to set.
     * @param {string} unit        The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Nav.prototype.setLinkPadding = function (linkPadding, unit) {
        if (unit !== undefined) { this.modifiers.linkPadding.unit = unit; }

        this.modifiers.linkPadding.value = linkPadding;
    };

	/**
	 * Gets the the Link Hover Background of the Nav Components.
	 * 
	 * @returns {string}
	 */
	Nav.prototype.getLinkHoverBackgroundColor = function () {
		return this.modifiers.linkHoverBg.value;
	};
	
	/**
	 * Sets the Link Hover Background of the Nav Components.
	 * 
	 * @param {string} linkHoverBg The Nav Link Hover Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Nav.prototype.setLinkHoverBackgroundColor = function (linkHoverBackgroundColor) {
		this.modifiers.linkHoverBg.value = linkHoverBackgroundColor;
	};

    /**
	 * Gets the Link Disabled Color of the Nav Components.
	 * 
	 * @returns {string}
	 */
	Nav.prototype.getLinkDisabledColor = function () {
		return this.modifiers.linkDisabledColor.value;
	};
	
	/**
	 * Sets the Link Disabled Color of the Nav Components.
	 * 
	 * @param {string} linkDisabledColor The Nav Link Disabled Color to set.
	 * 
	 * @returns {undefined}
	 */
	Nav.prototype.setLinkDisabledColor = function (linkDisabledColor) {
		this.modifiers.linkDisabledColor.value = linkDisabledColor;
	};

	/**
	 * Gets the Link Disabled Hover Color of the Nav Components.
	 * 
	 * @returns {string}
	 */
	Nav.prototype.getLinkDisabledHoverColor = function () {
		return this.modifiers.linkDisabledHoverColor.value;
	};
	
	/**
	 * Sets the Link Disabled Hover Color of the Nav Components.
	 * 
	 * @param {string} linkDisabledHoverColor The Nav Link Disabled Hover Color to set.
	 * 
	 * @returns {undefined}
	 */
	Nav.prototype.setLinkDisabledHoverColor = function (linkDisabledHoverColor) {
		this.modifiers.linkDisabledHoverColor.value = linkDisabledHoverColor;
	};

	/**
	 * Allows modification of the Pagination component in Bootstrap.
	 * 
	 * @class Pagination
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} color                 The @pagination-color variable which controls the Color of the Pagination Component.
	 * @property {object} bg                    The @pagination-bg variable which controls the Background Color of the Pagination Component.
	 * @property {object} borderColor           The @pagination-border variable which controls the Border Color of the Pagination Component.
	 * @property {object} hoverColor            The @pagination-hover-color variable which controls the Hover Color of the Pagination Component.
	 * @property {object} hoverBg               The @pagination-hover-bg variable which controls the Hover Background Color of the Pagination Component.
	 * @property {object} hoverBorderColor      The @pagination-hover-border variable which controls the Hover Border Color of the Pagination Component.
	 * @property {object} activeColor           The @pagination-active-color variable which controls the Active Color of the Pagination Component.
	 * @property {object} activeBg              The @pagination-active-bg variable which controls the Active Background Color of the Pagination Component.
	 * @property {object} activeBorderColor     The @pagination-active-border variable which controls the Active Border Color of the Pagination Component.
	 * @property {object} disabledColor         The @pagination-disabled-color variable which controls the Disabled Color of the Pagination Component.
	 * @property {object} disabledBg            The @pagination-disabled-bg variable which controls the Disabled Background Color of the Pagination Component.
	 * @property {object} disabledBorderColor   The @pagination-disabled-border variable which controls the Disabled Border Color of the Pagination Component.
	 * 
	 * @returns {Pagination}
	 */
	var Pagination = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-pagination';

        this.color = {
            variable:           '@pagination-color',
            subscribeProperty:  'color',
            changeFn:           this.setColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.bg = {
            variable:           '@pagination-bg',
            subscribeProperty:  'bg',
            changeFn:           this.setBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.borderColor = {
            variable:           '@pagination-border',
            subscribeProperty:  'border-color',
            changeFn:           this.setBorderColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.hoverColor = {
            variable:           '@pagination-hover-color',
            subscribeProperty:  'hover-color',
            changeFn:           this.setHoverColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.hoverBg = {
            variable:           '@pagination-hover-bg',
            subscribeProperty:  'hover-bg',
            changeFn:           this.setHoverBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.hoverBorderColor = {
            variable:           '@pagination-hover-border',
            subscribeProperty:  'hover-border-color',
            changeFn:           this.setHoverBorderColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.activeColor = {
            variable:           '@pagination-active-color',
            subscribeProperty:  'active-color',
            changeFn:           this.setActiveColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.activeBg = {
            variable:           '@pagination-active-bg',
            subscribeProperty:  'active-bg',
            changeFn:           this.setActiveBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.activeBorderColor = {
            variable:           '@pagination-active-border',
            subscribeProperty:  'active-border',
            changeFn:           this.setActiveBorderColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.disabledColor = {
            variable:           '@pagination-disabled-color',
            subscribeProperty:  'disabled-color',
            changeFn:           this.setDisabledColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.disabledBg = {
            variable:           '@pagination-disabled-bg',
            subscribeProperty:  'disabled-bg',
            changeFn:           this.setDisabledBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.disabledBorderColor = {
            variable:           '@pagination-disabled-border',
            subscribeProperty:  'disabled-border-color',
            changeFn:           this.setDisabledBorderColor.bind(this),
            subscribers:        [],
			_value:             null
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

        this.setupDataBinding();
    };

    // Inherit from parent Prototype and preserve constructor
	Pagination.prototype                = Object.create(ThemeModifier.prototype);
	Pagination.prototype.constructor    = Pagination;

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
	 * @param {string} color The Pagination Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setColor = function (color) {
		this.modifiers.color.value = color;
	};

    /**
	 * Gets the Background Color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getBackgroundColor = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background Color of the Pagination Component.
	 * 
	 * @param {string} backgroundColor The Pagination Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setBackgroundColor = function (backgroundColor) {
		this.modifiers.bg.value = backgroundColor;
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
	 * @param {string} borderColor The Pagination Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setBorderColor = function (borderColor) {
		this.modifiers.borderColor.value = borderColor;
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
	 * @param {string} hoverColor The Pagination Hover Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setHoverColor = function (hoverColor) {
		this.modifiers.hoverColor.value = hoverColor;
	};

    /**
	 * Gets the Background Hover Color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getHoverBackgroundColor = function () {
		return this.modifiers.hoverBg.value;
	};

	/**
	 * Sets the Background Hover Color of the Pagination Component.
	 * 
	 * @param {string} hoverBackgroundColor The Pagination Background Hover Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setHoverBackgroundColor = function (hoverBackgroundColor) {
		this.modifiers.hoverBg.value = hoverBackgroundColor;
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
	 * @param {string} hoverBorderColor The Pagination Border Hover Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setHoverBorderColor = function (hoverBorderColor) {
		this.modifiers.hoverBorderColor.value = hoverBorderColor;
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
	 * @param {string} activeColor The Pagination Active Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setActiveColor = function (activeColor) {
		this.modifiers.activeColor.value = activeColor;
	};

    /**
	 * Gets the Background Active Color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getActiveBackgroundColor = function () {
		return this.modifiers.activeBg.value;
	};

	/**
	 * Sets the Background Active Color of the Pagination Component.
	 * 
	 * @param {string} activeBackgroundColor The Pagination Background Active Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setActiveBackgroundColor = function (activeBackgroundColor) {
		this.modifiers.activeBg.value = activeBackgroundColor;
	};

	/**
	 * Gets the Active Border Color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getActiveBorderColor = function () {
		return this.modifiers.activeBorderColor.value;
	};

	/**
	 * Sets the Active Border Color of the Pagination Component.
	 * 
	 * @param {string} activeBorderColor The Pagination Border Active Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setActiveBorderColor = function (activeBorderColor) {
		this.modifiers.activeBorderColor.value = activeBorderColor;
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
	 * @param {string} disabledColor The Pagination Disabled Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setDisabledColor = function (disabledColor) {
		this.modifiers.disabledColor.value = disabledColor;
	};

    /**
	 * Gets the Background Disabled Color of the Pagination Component.
	 * 
	 * @returns {string}
	 */
	Pagination.prototype.getDisabledBackgroundColor = function () {
		return this.modifiers.disabledBg.value;
	};

	/**
	 * Sets the Background Disabled Color of the Pagination Component.
	 * 
	 * @param {string} disabledBackgroundColor The Pagination Background Disabled Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setDisabledBackgroundColor = function (disabledBackgroundColor) {
		this.modifiers.disabledBg.value = disabledBackgroundColor;
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
	 * @param {string} disabledBorderColor The Pagination Border Disabled Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pagination.prototype.setDisabledBorderColor = function (disabledBorderColor) {
		this.modifiers.disabledBorderColor.value = disabledBorderColor;
	};

	/**
	 * Allows modification of the Pager component in Bootstrap.
	 * 
	 * @class Pager
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} bg            The @pager-bg variable which controls the Background Color of the Pager Component.
	 * @property {object} borderColor   The @pager-border variable which controls the Border Color of the Pager Component.
	 * @property {object} borderRadius  The @pager-border-radius variable which controls the Border Radius of the Pager Component.
	 * @property {object} hoverBg       The @pager-hover-bg variable which controls the Hover Background Color of the Pager Component.
	 * @property {object} activeColor   The @pager-active-color variable which controls the Active Color of the Pager Component.
	 * @property {object} activeBg      The @pager-active-bg variable which controls the Active Background Color of the Pager Component.
	 * @property {object} disabledColor The @pager-disabled-color variable which controls the Disabled Color of the Pager Component.
	 * 
	 * @returns {Pager}
	 */
	var Pager = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-pager';

        this.bg = {
            variable:           '@pager-bg',
            subscribeProperty:  'bg',
            changeFn:           this.setBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.borderColor = {
            variable:           '@pager-border',
            subscribeProperty:  'border-color',
            changeFn:           this.setBorderColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.borderRadius = {
            variable:           '@pager-border-radius',
            subscribeProperty:  'border-radius',
            suffixUnit:         true,
            changeFn:           this.setBorderRadius.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.hoverBg = {
            variable:           '@pager-hover-bg',
            subscribeProperty:  'hover-bg',
            changeFn:           this.setHoverBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.activeColor = {
            variable:           '@pager-active-color',
            subscribeProperty:  'active-color',
            changeFn:           this.setActiveColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.activeBg = {
            variable:           '@pager-active-bg',
            subscribeProperty:  'active-bg',
            changeFn:           this.setActiveBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.disabledColor = {
            variable:           '@pager-disabled-color',
            subscribeProperty:  'disabled-color',
            changeFn:           this.setDisabledColor.bind(this),
            subscribers:        [],
			_value:             null
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

        this.setupDataBinding();
    };

    // Inherit from parent Prototype and preserve constructor
	Pager.prototype             = Object.create(ThemeModifier.prototype);
	Pager.prototype.constructor = Pager;

    /**
	 * Gets the Background Color of the Pager Component.
	 * 
	 * @returns {string}
	 */
	Pager.prototype.getBackgroundColor = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background Color of the Pager Component.
	 * 
	 * @param {string} backgroundColor The Pager Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pager.prototype.setBackgroundColor = function (backgroundColor) {
		this.modifiers.bg.value = backgroundColor;
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
	 * @param {string} borderColor The Pager Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pager.prototype.setBorderColor = function (borderColor) {
		this.modifiers.borderColor.value = borderColor;
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
	 * @param {string} borderRadius The Pager Border Radius to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
	 * 
	 * @returns {undefined}
	 */
	Pager.prototype.setBorderRadius = function (borderRadius, unit) {
        if (unit !== undefined) { this.modifiers.borderRadius.unit = unit; }

		this.modifiers.borderRadius.value = borderRadius;
	};

    /**
	 * Gets the Background Hover Color of the Pager Component.
	 * 
	 * @returns {string}
	 */
	Pager.prototype.getHoverBackgroundColor = function () {
		return this.modifiers.hoverBg.value;
	};

	/**
	 * Sets the Background Hover Color of the Pager Component.
	 * 
	 * @param {string} hoverBg The Pager Background Hover Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pager.prototype.setHoverBackgroundColor = function (hoverBg) {
		this.modifiers.hoverBg.value = hoverBg;
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
	 * @param {string} color The Pager Active Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pager.prototype.setActiveColor = function (activeColor) {
		this.modifiers.activeColor.value = activeColor;
	};

    /**
	 * Gets the Background Active Color of the Pager Component.
	 * 
	 * @returns {string}
	 */
	Pager.prototype.getActiveBackgroundColor = function () {
		return this.modifiers.activeBg.value;
	};

	/**
	 * Sets the Background Active Color of the Pager Component.
	 * 
	 * @param {string} activeBackgroundColor The Pager Background Active Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pager.prototype.setActiveBackgroundColor = function (activeBackgroundColor) {
		this.modifiers.activeBg.value = activeBackgroundColor;
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
	 * @param {string} color The Pager Disabled Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pager.prototype.setDisabledColor = function (disabledColor) {
		this.modifiers.disabledColor.value = disabledColor;
	};

	/**
	 * Allows modification of the Form component in Bootstrap.
	 * 
	 * @class Form
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} inputBg                       The @input-bg variable which controls the Input Background Color of the Form Component.
	 * @property {object} inputDisabledBg               The @input-bg-disabled variable which controls the Input Disabled Background Color of the Form Component.
	 * @property {object} inputColor                    The @input-color variable which controls the Input Color of the Form Component.
	 * @property {object} inputBorderColor              The @input-border variable which controls the Input Border Color of the Form Component.
	 * @property {object} inputBorderRadius             The @input-border-radius variable which controls the Input Border Radius of the Form Component.
	 * @property {object} inputBorderFocusColor         The @input-border-focus variable which controls the Input Border Focus Color of the Form Component.
	 * @property {object} inputPlaceholderColor         The @input-color-placeholder variable which controls the Input Placeholder Color of the Form Component.
	 * @property {object} legendColor                   The @legend-color variable which controls the Legend Color of the Form Component.
	 * @property {object} legendBorderColor             The @legend-border-color variable which controls the Legend Border Color of the Form Component.
	 * @property {object} inputGroupAddonBgColor        The @input-group-addon-bg variable which controls the Input Group Addon Background Color of the Form Component.
	 * @property {object} inputGroupAddonBorderColor    The @input-group-addon-border-color variable which controls the Input Group Addon Border Color of the Form Component.
	 * @property {object} cursorDisabled                The @input-cursor-disabled variable which controls the Cursor of Disabled Inputs of the Form Component.
	 * 
	 * @returns {Form}
	 */
	var Form = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-form';

        // Configure the Modifiers
		this.inputBg = {
			variable:           '@input-bg',
			subscribeProperty:  'input-bg',
            changeFn:           this.setInputBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.inputDisabledBg = {
			variable:           '@input-bg-disabled',
			subscribeProperty:  'input-disabled-bg',
            changeFn:           this.setInputDisabledBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.inputColor = {
			variable:           '@input-color',
			subscribeProperty:  'input-color',
            changeFn:           this.setInputColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.inputBorderColor = {
			variable:           '@input-border',
			subscribeProperty:  'input-border-color',
            changeFn:           this.setInputBorderColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.inputBorderRadius = {
			variable:           '@input-border-radius',
			subscribeProperty:  'input-border-radius',
            suffixUnit:         true,
            changeFn:           this.setInputBorderRadius.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.inputBorderFocusColor = {
			variable:           '@input-border-focus',
			subscribeProperty:  'input-border-focus-color',
            changeFn:           this.setInputBorderFocusColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.inputPlaceholderColor = {
			variable:           '@input-color-placeholder',
			subscribeProperty:  'input-placeholder-color',
            changeFn:           this.setInputPlaceholderColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.legendColor = {
			variable:           '@legend-color',
			subscribeProperty:  'legend-color',
            changeFn:           this.setLegendColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.legendBorderColor = {
			variable:           '@legend-border-color',
			subscribeProperty:  'legend-border-color',
            changeFn:           this.setLegendBorderColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.inputGroupAddonBgColor = {
			variable:           '@input-group-addon-bg',
			subscribeProperty:  'input-group-addon-bg',
            changeFn:           this.setInputGroupAddonBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.inputGroupAddonBorderColor = {
			variable:           '@input-group-addon-border-color',
			subscribeProperty:  'input-group-addon-border-color',
            changeFn:           this.setInputGroupAddonBorderColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.cursorDisabled = {
			variable:           '@cursor-disabled',
			subscribeProperty:  'cursor-disabled',
            changeFn:           this.setCursorDisabled.bind(this),
            subscribers:        [],
			_value:             null
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
            inputGroupAddonBorderColor: this.inputGroupAddonBorderColor,
            cursorDisabled:             this.cursorDisabled
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Form.prototype              = Object.create(ThemeModifier.prototype);
	Form.prototype.constructor  = Form;

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
	 * @param {string} inputBackgroundColor The Form Input Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Form.prototype.setInputBackgroundColor = function (inputBackgroundColor) {
		this.modifiers.inputBg.value = inputBackgroundColor;
	};

    /**
	 * Gets the Disabled Input Background Color of the Form Component.
	 * 
	 * @returns {String}
	 */
	Form.prototype.getInputDisabledBackgroundColor = function () {
		return this.modifiers.inputDisabledBg.value;
	};

	/**
	 * Sets the Disabled Input Background Color of the Form Component.
	 * 
	 * @param {string} disabledInputBackgroundColor The Form Disabled Input Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Form.prototype.setInputDisabledBackgroundColor = function (disabledInputBackgroundColor) {
		this.modifiers.inputDisabledBg.value = disabledInputBackgroundColor;
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
	 * @param {string} inputColor The Form Input Color to set.
	 * 
	 * @returns {undefined}
	 */
	Form.prototype.setInputColor = function (inputColor) {
		this.modifiers.inputColor.value = inputColor;
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
	 * @param {string} inputBorderColor The Form Input Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	Form.prototype.setInputBorderColor = function (inputBorderColor) {
		this.modifiers.inputBorderColor.value = inputBorderColor;
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
	 * @param {string} inputBorderRadius The Form Input Border Radius to set.
     * @param {string} unit              The CSS measurement unit to suffix to the value.
	 * 
	 * @returns {undefined}
	 */
	Form.prototype.setInputBorderRadius = function (inputBorderRadius, unit) {
        if (unit !== undefined) { this.modifiers.inputBorderRadius.unit = unit; }

		this.modifiers.inputBorderRadius.value = inputBorderRadius;
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
	 * @param {string} inputBorderFocusColor The Form Input Border Focus Color to set.
	 * 
	 * @returns {undefined}
	 */
	Form.prototype.setInputBorderFocusColor = function (inputBorderFocusColor) {
		this.modifiers.inputBorderFocusColor.value = inputBorderFocusColor;
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
     * @param {string} inputPlaceholderColor The Form Input Placeholder Color to set.
     * 
     * @returns {undefined}
     */
    Form.prototype.setInputPlaceholderColor = function (inputPlaceholderColor) {
        this.modifiers.inputPlaceholderColor.value = inputPlaceholderColor;
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
     * @param {string} legendColor The Form Legend Color to set.
     * 
     * @returns {undefined}
     */
    Form.prototype.setLegendColor = function (legendColor) {
        this.modifiers.legendColor.value = legendColor;
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
     * @param {string} legendBorderColor The Form Legend Border Color to set.
     * 
     * @returns {undefined}
     */
    Form.prototype.setLegendBorderColor = function (legendBorderColor) {
        this.modifiers.legendBorderColor.value = legendBorderColor;
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
     * @param {string} inputGroupAddonBgColor The Form Input Group Addon Background Color to set.
     * 
     * @returns {undefined}
     */
    Form.prototype.setInputGroupAddonBackgroundColor = function (inputGroupAddonBgColor) {
        this.modifiers.inputGroupAddonBgColor.value = inputGroupAddonBgColor;
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
     * @param {string} inputGroupAddonBorderColor The Form Input Group Addon Border Color to set.
     * 
     * @returns {undefined}
     */
    Form.prototype.setInputGroupAddonBorderColor = function (inputGroupAddonBorderColor) {
        this.modifiers.inputGroupAddonBorderColor.value = inputGroupAddonBorderColor;
    };

    /**
     * Gets the Cursor Disabled of the Form Component.
     * 
     * @returns {string}
     */
    Form.prototype.getCursorDisabled = function () {
        return this.modifiers.cursorDisabled.value;
    };

    /**
     * Sets the Cursor Disabled of the Form Component.
     * 
     * @param {string} cursorDisabled The Form Cursor Disabled to set.
     * 
     * @returns {undefined}
     */
    Form.prototype.setCursorDisabled = function (cursorDisabled) {
        this.modifiers.cursorDisabled.value = cursorDisabled;
    };

	/**
	 * Allows modification of a Tab component in Bootstrap.
	 * 
	 * @class Tab
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} borderColor                       The @nav-tabs-border-color variable which controls the Border Color of the Tab Component.
	 * @property {object} linkHoverBorderColor              The @nav-tabs-link-hover-border-color variable which controls the Link Hover Border Color of the Tab Component.
	 * @property {object} linkActiveHoverBg                 The @nav-tabs-active-link-hover-bg variable which controls the Link Active Hover Background Color of the Tab Component.
	 * @property {object} linkActiveHoverColor              The @nav-tabs-active-link-hover-color variable which controls the Link Active Hover Color of the Tab Component.
	 * @property {object} linkActiveHoverBorderColor        The @nav-tabs-active-link-hover-color variable which controls the Link Active Hover Border Color of the Tab Component.
	 * @property {object} linkJustifiedBorderColor          The @nav-tabs-justified-link-border-color variable which controls the Link Justified Border Color of the Tab Component.
	 * @property {object} linkJustifiedActiveBorderColor    The @nav-tabs-justified-active-link-border-color variable which controls the Link Justified Active Border Color of the Tab Component.
	 * 
	 * @returns {Tab}
	 */
	var Tab = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-tab';

        this.borderColor = {
            variable:           '@nav-tabs-border-color',
            subscribeProperty:  'border-color',
            changeFn:           this.setBorderColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.linkHoverBorderColor = {
            variable:           '@nav-tabs-link-hover-border-color',
            subscribeProperty:  'link-hover-border-color',
            changeFn:           this.setLinkHoverBorderColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.linkActiveBg = {
            variable:           '@nav-tabs-active-link-hover-bg',
            subscribeProperty:  'link-active-bg',
            changeFn:           this.setLinkActiveBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.linkActiveColor = {
            variable:           '@nav-tabs-active-link-hover-color',
            subscribeProperty:  'link-active-color',
            changeFn:           this.setLinkActiveColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.linkActiveBorderColor = {
            variable:           '@nav-tabs-active-link-hover-border-color',
            subscribeProperty:  'link-active-border-color',
            changeFn:           this.setLinkActiveBorderColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.linkJustifiedBorderColor = {
            variable:           '@nav-tabs-justified-link-border-color',
            subscribeProperty:  'link-justified-border-color',
            changeFn:           this.setLinkJustifiedBorderColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.linkJustifiedActiveBorderColor = {
            variable:           '@nav-tabs-justified-active-link-border-color',
            subscribeProperty:  'link-justified-active-border-color',
            changeFn:           this.setLinkJustifiedActiveBorderColor.bind(this),
            subscribers:        [],
			_value:             null
        };

        this.modifiers = {
            borderColor:                        this.borderColor,
            linkHoverBorderColor:               this.linkHoverBorderColor,
            linkActiveBg:                       this.linkActiveBg,
            linkActiveColor:                    this.linkActiveColor,
            linkActiveBorderColor:              this.linkActiveBorderColor,
            linkJustifiedBorderColor:           this.linkJustifiedBorderColor,
            linkJustifiedActiveBorderColor:     this.linkJustifiedActiveBorderColor
        };

        this.setupDataBinding();
    };

    // Inherit from parent Prototype and preserve constructor
	Tab.prototype               = Object.create(ThemeModifier.prototype);
	Tab.prototype.constructor   = Tab;

	/**
	 * Gets the Border Color of the Tab Component.
	 * 
	 * @returns {string}
	 */
	Tab.prototype.getBorderColor = function () {
		return this.modifiers.borderColor.value;
	};

	/**
	 * Sets the Border Color of the Tab Component.
	 * 
	 * @param {string} borderColor The Tab Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	Tab.prototype.setBorderColor = function (borderColor) {
		this.modifiers.borderColor.value = borderColor;
	};

	/**
	 * Gets the Link Hover Border Color of the Tab Component.
	 * 
	 * @returns {string}
	 */
	Tab.prototype.getLinkHoverBorderColor = function () {
		return this.modifiers.linkHoverBorderColor.value;
	};
	
	/**
	 * Sets the Link Hover Border Color of the Tab Component.
	 * 
	 * @param {string} linkHoverBorderColor The Tab Link Hover Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	Tab.prototype.setLinkHoverBorderColor = function (linkHoverBorderColor) {
		this.modifiers.linkHoverBorderColor.value = linkHoverBorderColor;
	};

    /**
	 * Gets the Link Active Background Color of the Tab Component.
	 * 
	 * @returns {string}
	 */
	Tab.prototype.getLinkActiveBackgroundColor = function () {
		return this.modifiers.linkActiveHoverBg.value;
	};
	
	/**
	 * Sets the Link Active Background Color of the Tab Component.
	 * 
	 * @param {string} linkActiveBackgroundColor The Tab Link Active Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Tab.prototype.setLinkActiveBackgroundColor = function (linkActiveBackgroundColor) {
		this.modifiers.linkActiveBg.value = linkActiveBackgroundColor;
	};

	/**
	 * Gets the Link Active Color of the Tab Component.
	 * 
	 * @returns {string}
	 */
	Tab.prototype.getLinkActiveColor = function () {
		return this.modifiers.linkActiveColor.value;
	};
	
	/**
	 * Sets the Link Active Color of the Tab Component.
	 * 
	 * @param {string} linkActiveColor The Tab Link Active Hover Color to set.
	 * 
	 * @returns {undefined}
	 */
	Tab.prototype.setLinkActiveColor = function (linkActiveColor) {
		this.modifiers.linkActiveColor.value = linkActiveColor;
	};

	/**
	 * Gets the Link Active Border Color of the Tab Component.
	 * 
	 * @returns {string}
	 */
	Tab.prototype.getLinkActiveBorderColor = function () {
		return this.modifiers.linkActiveBorderColor.value;
	};
	
	/**
	 * Sets the Link Active Border Color of the Tab Component.
	 * 
	 * @param {string} linkActiveBorderColor The Tab Link Active Hover Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	Tab.prototype.setLinkActiveBorderColor = function (linkActiveBorderColor) {
		this.modifiers.linkActiveBorderColor.value = linkActiveBorderColor;
	};

    /**
     * Gets the Link Justified Border Color of the Tab Component.
     * 
     * @returns {string}
     */
    Tab.prototype.getLinkJustifiedBorderColor = function () {
        return this.modifiers.linkJustifiedBorderColor.value;
    };

    /**
     * Sets the Link Justified Border Color of the Tab Component.
     * 
     * @param {string} linkJustifiedBorderColor The Tab Link Justified Border Color to set.
     * 
     * @returns {string}
     */
    Tab.prototype.setLinkJustifiedBorderColor = function (linkJustifiedBorderColor) {
        this.modifiers.linkJustifiedBorderColor.value = linkJustifiedBorderColor;
    };

    /**
     * Gets the Link Justified Active Border Color of the Tab Component.
     * 
     * @returns {string}
     */
    Tab.prototype.getLinkJustifiedActiveBorderColor = function () {
        return this.modifiers.linkJustifiedActiveBorderColor.value;
    };

    /**
     * Sets the Link Justified Active Border Color of the Tab Component.
     * 
     * @param {string} linkJustifiedActiveBorderColor The Tab Link Justified Active Border Color to set.
     * 
     * @returns {string}
     */
    Tab.prototype.setLinkJustifiedActiveBorderColor = function (linkJustifiedActiveBorderColor) {
        this.modifiers.linkJustifiedActiveBorderColor.value = linkJustifiedActiveBorderColor;
    };

	/**
	 * Allows modification of a Pill component in Bootstrap.
	 * 
	 * @class Pill
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} borderRadius          The @nav-pills-border-radius variable which controls the Border Radius of the Pill cComponent.
	 * @property {object} linkActiveHoverBg     The @nav-pills-active-link-hover-bg variable which controls the Link Active Hover Background Color of the Pill Component.
	 * @property {object} linkActiveHoverColor  The @nav-pills-active-link-hover-color variable which controls the Link Active Hover Color of the Pill Component.
	 * 
	 * @returns {Pill}
	 */
	var Pill = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-pill';

        this.borderRadius = {
            variable:           '@nav-pills-border-radius',
            subscribeProperty:  'border-radius',
            suffixUnit:         true,
            changeFn:           this.setBorderRadius.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.linkActiveBg = {
            variable:           '@nav-pills-active-link-hover-bg',
            subscribeProperty:  'link-active-bg',
            changeFn:           this.setLinkActiveBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.linkActiveColor = {
            variable:           '@nav-pills-active-link-hover-color',
            subscribeProperty:  'link-active-color',
            changeFn:           this.setLinkActiveColor.bind(this),
            subscribers:        [],
			_value:             null
        };

        this.modifiers = {
            borderRadius:       this.borderRadius,
            linkActiveBg:       this.linkActiveBg,
            linkActiveColor:    this.linkActiveColor
        };

        this.setupDataBinding();
    };

    // Inherit from parent Prototype and preserve constructor
	Pill.prototype              = Object.create(ThemeModifier.prototype);
	Pill.prototype.constructor  = Pill;

	/**
	 * Gets the Border Radius of the Pill Component.
	 * 
	 * @returns {string}
	 */
	Pill.prototype.getBorderRadius = function () {
		return this.modifiers.borderRadius.value;
	};

	/**
	 * Sets the Border Radius of the Pill Component.
	 * 
	 * @param {string} borderRadius The Pill Border Radius to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
	 * 
	 * @returns {undefined}
	 */
	Pill.prototype.setBorderRadius = function (borderRadius, unit) {
        if (unit !== undefined) { this.modifiers.borderRadius.unit = unit; }

		this.modifiers.borderRadius.value = borderRadius;
	};

    /**
	 * Gets the Link Active Background Color of the Pill Component.
	 * 
	 * @returns {string}
	 */
	Pill.prototype.getLinkActiveBackgroundColor = function () {
		return this.modifiers.linkActiveBg.value;
	};
	
	/**
	 * Sets the Link Active Background Color of the Pill Component.
	 * 
	 * @param {string} linkActiveBg The Pill Link Active Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pill.prototype.setLinkActiveBackgroundColor = function (linkActiveBg) {
		this.modifiers.linkActiveBg.value = linkActiveBg;
	};

	/**
	 * Gets the Link Active Color of the Pill Component.
	 * 
	 * @returns {string}
	 */
	Pill.prototype.getLinkActiveColor = function () {
		return this.modifiers.linkActiveColor.value;
	};
	
	/**
	 * Sets the Link Active Color of the Pill Component.
	 * 
	 * @param {string} linkActiveColor The Pill Link Active Hover Color to set.
	 * 
	 * @returns {undefined}
	 */
	Pill.prototype.setLinkActiveColor = function (linkActiveColor) {
		this.modifiers.linkActiveColor.value = linkActiveColor;
	};

import ThemeModifier from 'ThemeModifier';

/**
 * Allows editing of the @brand-{style} variables which affect alerts/panel headers,
 * the Primary branding, however affects more, such as the ListGroup background, links etc.
 *
 * @class BrandModifier
 * @extends ThemeModifier
 *
 * @param {ClucklesEditor} editor instance which manages the less modifications.
 *
 * @property {string} default   The @brand-default variable which affects the Default styles.
 * @property {string} primary   The @brand-primary variable which affects the Primary styles.
 * @property {string} success   The @brand-success variable which affects the Success styles.
 * @property {string} info      The @brand-info variable which affects the Info styles.
 * @property {string} warning   The @brand-warning variable which affects the Warning styles.
 * @property {string} danger    The @brand-danger variable which affects the Danger styles.
 *
 * @returns {BrandModifier}
 */
class BrandModifier extends ThemeModifier {
	constructor(editor) {
		super(editor); // Call parent constructor

		this.subscriberDataAttribute = 'data-cluckles-branding';

    // Configure the Modifiers
		this.default = {
			variable:           '@brand-default',
	          subscribeProperty:  'default',
	          changeFn:           this.setDefaultColor.bind(this),
	          subscribers:        [],
			_value:             null
		};
		this.primary = {
			variable:           '@brand-primary',
			subscribeProperty:  'primary',
	          changeFn:           this.setPrimaryColor.bind(this),
	          subscribers:        [],
			_value:             null
		};
		this.success = {
			variable:           '@brand-success',
			subscribeProperty:  'success',
	          changeFn:           this.setSuccessColor.bind(this),
	          subscribers:        [],
			_value:             null
		};
		this.info = {
	          variable:           '@brand-info',
			subscribeProperty:  'info',
	          changeFn:           this.setInfoColor.bind(this),
	          subscribers:        [],
			_value:             null
		};
		this.warning = {
	          variable:           '@brand-warning',
			subscribeProperty:  'warning',
	          changeFn:           this.setWarningColor.bind(this),
	          subscribers:        [],
			_value:             null
		};
		this.danger	= {
	          variable:           '@brand-danger',
			subscribeProperty:  'danger',
	          changeFn:           this.setDangerColor.bind(this),
	          subscribers:        [],
			_value:             null
		};

    // Configure the modifiers so they can be extracted easier
    this.modifiers = {
      default: this.default,
      primary: this.primary,
      success: this.success,
      info: this.info,
      warning: this.warning,
      danger: this.danger
    };

    this.setupDataBinding();
	}

	getDefaultColor() {
		return this.modifiers.default.value;
	}

	setDefaultColor(color) {
		this.modifier.default.value = color;
	}

	getPrimaryColor() {
		return this.modifiers.default.value;
	}

	setPrimaryColor(color) {
		this.modifier.default.value = color;
	}
};

export Default BrandModifier;

// Inherit from parent Prototype and preserve constructor
// BrandModifier.prototype             = Object.create(ThemeModifier.prototype);
// BrandModifier.prototype.constructor = BrandModifier;
//
// /**
//  * Gets the Default Branding Color.
//  *
//  * @returns {undefined}
//  */
// BrandModifier.prototype.getDefaultColor = function () {
// 	return this.modifiers.default.value;
// };
//
// /**
//  * Sets the Default Branding Color.
//  *
//  * @param {string} color The Default Branding Color to set.
//  *
//  * @returns {undefined}
//  */
// BrandModifier.prototype.setDefaultColor = function (color) {
// 	this.modifiers.default.value = color;
// };
//
// /**
//  * Gets the Primary Branding Color.
//  *
//  * @returns {string}
//  */
// BrandModifier.prototype.getPrimaryColor = function () {
// 	return this.modifiers.primary.value;
// };
//
// /**
//  * Sets the Primary Branding Color.
//  *
//  * @param {string} color The Primary Branding Color to set.
//  *
//  * @returns {undefined}
//  */
// BrandModifier.prototype.setPrimaryColor = function (color) {
// 	this.modifiers.primary.value = color;
// };
//
// /**
//  * Gets the Success Branding Color.
//  *
//  * @returns {string}
//  */
// BrandModifier.prototype.getSuccessColor = function () {
// 	return this.modifiers.success.value;
// };
//
// /**
//  * Sets the Success Branding Color.
//  *
//  * @param {string} color The Success Branding Color to set.
//  *
//  * @returns {undefined}
//  */
// BrandModifier.prototype.setSuccessColor = function (color) {
// 	this.modifiers.success.value = color;
// };
//
// /**
//  * Gets the Info Branding Color.
//  *
//  * @returns {string}
//  */
// BrandModifier.prototype.getInfoColor = function () {
// 	return this.modifiers.info.value;
// };
//
// /**
//  * Sets the Info Branding Color.
//  *
//  * @param {string} color The Info Branding Color to set.
//  *
//  * @returns {undefined}
//  */
// BrandModifier.prototype.setInfoColor = function (color) {
// 	this.modifiers.info.value = color;
// };
//
// /**
//  * Gets the Warning Branding Color.
//  *
//  * @returns {string}
//  */
// BrandModifier.prototype.getWarningColor = function () {
// 	return this.modifiers.warning.value;
// };
//
// /**
//  * Sets the Warning Branding Color.
//  *
//  * @param {type} color The Warning Branding Color to set.
//  *
//  * @returns {undefined}
//  */
// BrandModifier.prototype.setWarningColor = function (color) {
// 	this.modifiers.warning.value = color;
// };
//
// /**
//  * Gets the Danger Branding Color.
//  *
//  * @returns {string}
//  */
// BrandModifier.prototype.getDangerColor = function () {
// 	return this.modifiers.danger.value;
// };
//
// /**
//  * Sets the Danger Branding Color.
//  *
//  * @param {string} color The Danger Branding Color to set.
//  *
//  * @returns {undefined}
//  */
// BrandModifier.prototype.setDangerColor = function (color) {
// 	this.modifiers.danger.value = color;
// };


	/**
	 * Allows modification of the Dropdown Component styling.
	 * 
	 * @class Dropdown
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} bg                The @dropdown-bg variable which controls the Background Color of the Dropdown Component.
	 * @property {object} headerColor       The @dropdown-header-color variable which controls the Header Color of the Dropdown Component.
	 * @property {object} border            The @dropdown-border variable which controls the Border Color of the Dropdown Component.
	 * @property {object} fallbackBorder    The @dropdown-fallback-border variable which controls the Border Color (IE8) of the Dropdown Component.
	 * @property {object} divider           The @dropdown-divider-bg variable which controls the Divider Color of the Dropdown Component.
	 * @property {object} linkColor         The @dropdown-link-color variable which controls the Link Color of the Dropdown Component.
	 * @property {object} linkDisabledColor The @dropdown-link-disabled-color variable which controls the Link Disabled Color of the Dropdown Component.
	 * @property {object} linkHoverBg       The @dropdown-link-hover-bg variable which controls the Link Hover Background Color of the Dropdown Component.
	 * @property {object} linkHoverColor    The @dropdown-link-hover-color variable which controls the Link Hover Color of the Dropdown Component,
	 * @property {object} linkActiveBg      The @dropdown-link-active-hover-bg variable which controls the Link Active Background Color of the Dropdown Component,
	 * @property {object} linkActiveColor   The @dropdown-link-active-hover-color variable which controls the Link Active Color of the Dropdown Component.
	 * 
	 * @returns {Dropdown}
	 */
	var Dropdown = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-dropdown';

        // Configure the Modifiers
		this.bg = {
			variable:           '@dropdown-bg',
            subscribeProperty:  'bg',
            changeFn:           this.setBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.headerColor = {
			variable:           '@dropdown-header-color',
            subscribeProperty:  'header-color',
            changeFn:           this.setHeaderColor.bind(this),
			subscribers:        [],
			_value:             null
		};
		this.border = {
			variable:           '@dropdown-border',
            subscribeProperty:  'border-color',
            changeFn:           this.setBorderColor.bind(this),
			subscribers:        [],
			_value:             null
		};
		this.fallbackBorder = {
			variable:           '@dropdown-fallback-border',
            subscribeProperty:  'fallback-border-color',
            changeFn:           this.setFallbackBorderColor.bind(this),
			subscribers:        [],
			_value:             null
		};
		this.divider = {
			variable:           '@dropdown-divider-bg',
            subscribeProperty:  'divider',
            changeFn:           this.setDividerColor.bind(this),
			subscribers:        [],
			_value:             null
		};
		this.linkColor = {
			variable:           '@dropdown-link-color',
            subscribeProperty:  'link-color',
            changeFn:           this.setLinkColor.bind(this),
			subscribers:        [],
			_value:             null
		};
		this.linkDisabledColor = {
			variable:           '@dropdown-link-disabled-color',
            subscribeProperty:  'link-disabled-color',
            changeFn:           this.setLinkDisabledColor.bind(this),
			subscribers:        [],
			_value:             null
		};
		this.linkHoverBg = {
			variable:           '@dropdown-link-hover-bg',
            subscribeProperty:  'link-hover-bg',
            changeFn:           this.setLinkHoverBackgroundColor.bind(this),
			subscribers:        [],
			_value:             null
		};
		this.linkHoverColor = {
			variable:           '@dropdown-link-hover-color',
            subscribeProperty:  'link-hover-color',
            changeFn:           this.setLinkHoverColor.bind(this),
			subscribers:        [],
			_value:             null
		};
		this.linkActiveBg = {
			variable:           '@dropdown-link-active-bg',
            subscribeProperty:  'link-active-bg',
            changeFn:           this.setLinkActiveBackgroundColor.bind(this),
			subscribers:        [],
			_value:             null
		};
		this.linkActiveColor = {
			variable:           '@dropdown-link-active-color',
            subscribeProperty:  'link-active-color',
            changeFn:           this.setLinkActiveColor.bind(this),
			subscribers:        [],
			_value:             null
		};

        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            bg:                 this.bg,
            headerColor:        this.headerColor,
            border:             this.border,
            fallbackBorder:     this.fallbackBorder,
            divider:            this.divider,
            linkColor:          this.linkColor,
            linkDisabledColor:  this.linkDisabledColor,
            linkHoverBg:        this.linkHoverBg,
            linkHoverColor:     this.linkHoverColor,
            linkActiveBg:       this.linkActiveBg,
            linkActiveColor:    this.linkActiveColor
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Dropdown.prototype              = Object.create(ThemeModifier.prototype);
	Dropdown.prototype.constructor  = Dropdown;

	/**
	 * Gets the Background Color of the Dropdown Component.
	 * 
	 * @returns {String}
	 */
	Dropdown.prototype.getBackgroundColor = function () {
		return this.modifiers.bg;
	};
	
	/**
	 * Sets the Background Color of the Dropdown Component.
	 * 
	 * @param {string} backgroundColor The Dropdown Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setBackgroundColor = function (backgroundColor) {
		this.modifiers.bg.value = backgroundColor;
	};

	/**
	 * Gets the Header Color of the Dropdown Component.
	 * 
	 * @returns {String}
	 */
	Dropdown.prototype.getHeaderColor = function () {
		return this.modifiers.headingColor;
	};
	
	/**
	 * Sets the Header Color of the Dropdown Component.
	 * 
	 * @param {string} headerColor The Dropdown Header Color to set.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setHeaderColor = function (headerColor) {
		this.modifiers.headerColor.value = headerColor;
	};
	
	/**
	 * Gets the Border Color of the Dropdown Component.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getBorderColor = function () {
		return this.modifiers.border.value;
	};
	
	/**
	 * Sets the Border Color of the Dropdown Component.
	 * 
	 * @param {string} borderColor The Dropdown Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setBorderColor = function (borderColor) {
		this.modifiers.border.value = borderColor;
	};

	/**
	 * Gets the Fallback Border Color of the Dropdown Component.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getFallbackBorderColor = function () {
		return this.modifiers.fallbackBorder.value;
	};
	
	/**
	 * Sets the Fallback Border Color of the Dropdown Component.
	 * 
	 * @param {string} fallbackBorder The Dropdown Fallback Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setFallbackBorderColor = function (fallbackBorder) {
		this.modifiers.fallbackBorder.value = fallbackBorder;
	};
	
	/**
	 * Gets the Divider Color of the Dropdown Component.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getDividerColor = function () {
		return this.modifiers.divider.value;
	};
	
	/**
	 * Sets the Divider Color of the Dropdown Component.
	 * 
	 * @param {string} dividerColor The Dropdown Divider Color to set.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setDividerColor = function (dividerColor) {
		this.modifiers.divider.value = dividerColor;
	};
	
	/**
	 * Gets the Link Color of the Dropdown Component.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkColor = function () {
		return this.modifiers.linkColor.value;
	};
	
	/**
	 * Sets the Link Color of the Dropdown Component.
	 * 
	 * @param {string} linkColor The Dropdown Link Color to set.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkColor = function (linkColor) {
		this.modifiers.linkColor.value = linkColor;
	};
	
	/**
	 * Gets the Link Disabled Color of the Dropdown Component.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkDisabledColor = function () {
		return this.modifiers.linkDisabledColor.value;
	};
	
	/**
	 * Sets the Link Disabled Color of the Dropdown Component.
	 * 
	 * @param {string} linkDisabledColor The Dropdown Link Disabled Color to set.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkDisabledColor = function (linkDisabledColor) {
		this.modifiers.linkDisabledColor.value = linkDisabledColor;
	};
	
	/**
	 * Gets the Link Hover Background Color of the Dropdown Component.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkHoverBackgroundColor = function () {
		return this.modifiers.linkHoverBg.value;
	};
	
	/**
	 * Sets the Link Hover Background color value.
	 * 
	 * @param {string} linkHoverBackgroundColor The Dropdown Link Hover Background Color to set,
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkHoverBackgroundColor = function (linkHoverBackgroundColor) {
		this.modifiers.linkHoverBg.value = linkHoverBackgroundColor;
	};
	
	/**
	 * Gets the Link Hover Color of the Dropdown Component.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkHoverColor = function () {
		return this.modifiers.linkHoverColor.value;
	};
	
	/**
	 * Sets the Link Hover Color of the Dropdown Component.
	 * 
	 * @param {string} linkHoverColor The Dropdown Link Hover Color to set.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkHoverColor = function (linkHoverColor) {
		this.modifiers.linkHoverColor.value = linkHoverColor;
	};
	
	/**
	 * Gets the Link Active Background color of the Dropdown Component.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkActiveBackgroundColor = function () {
		return this.modifiers.linkActiveBg.value;
	};
	
	/**
	 * Sets the Link Active Background Color to set.
	 * 
	 * @param {string} linkActiveBackgroundColor The Dropdown Link Active Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkActiveBackgroundColor = function (linkActiveBackgroundColor) {
		this.modifiers.linkActiveBg.value = linkActiveBackgroundColor;
	};
	
	/**
	 * Gets the Link Active Hover Color of the Dropdown Component.
	 * 
	 * @returns {string}
	 */
	Dropdown.prototype.getLinkActiveColor = function () {
		return this.modifiers.linkActiveColor.value;
	};
	
	/**
	 * Sets the Link Active Color of the Dropdown Component.
	 * 
	 * @param {string} linkActiveColor The Dropdown Link Active Color to set.
	 * 
	 * @returns {undefined}
	 */
	Dropdown.prototype.setLinkActiveColor = function (linkActiveColor) {
		this.modifiers.linkActiveColor.value = linkActiveColor;
	};

	/**
	 * Allows modifications of the Tooltip component styling in Bootstrap.
	 * 
	 * @class Tooltip
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} maxWidth      The @tooltip-max-width variable which sets the Max Width of the Tooltip Component.
	 * @property {object} bg            The @tooltip-bg variable which sets the Background Color of the Tooltip Component.
	 * @property {object} color         The @tooltip-color variable which sets the Color of the Tooltip Component.
	 * @property {object} opacity       The @tooltip-opacity variable which sets the Opacity of the Tooltip Component.
	 * @property {object} arrowWidth    The @tooltip-arrow-width variable which sets the Arrow Width of the Tooltip Component.
	 * @property {object} arrowColor    The @tooltip-arrow-color variable which sets the Arrow Color of the Tooltip Component.
	 * 
	 * @returns {Tooltip}
	 */
	var Tooltip = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-tooltip';

        // Configure the Modifiers
        this.maxWidth = {
            variable:           '@tooltip-max-width',
            subscribeProperty:  'max-width',
            suffixUnit:         true,
            changeFn:           this.setMaxWidth.bind(this),
            subscribers:        [],
			_value:             null
        };
		this.bg = {
			variable:           '@tooltip-bg',
			subscribeProperty:  'bg',
            changeFn:           this.setBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.color = {
			variable:           '@tooltip-color',
			subscribeProperty:  'color',
            changeFn:           this.setColor.bind(this),
            subscribers:        [],
			_value:             null
		};
        this.opacity = {
            variable:           '@tooltip-opacity',
            subscribeProperty:  'opacity',
            changeFn:           this.setOpacity.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.arrowWidth = {
            variable:           '@tooltip-arrow-width',
            subscribeProperty:  'arrow-width',
            suffixUnit:         true,
            changeFn:           this.setArrowWidth.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.arrowColor = {
            variable:           '@tooltip-arrow-color',
            subscribeProperty:  'arrow-color',
            changeFn:           this.setArrowColor.bind(this),
            subscribers:        [],
			_value:             null
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

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Tooltip.prototype               = Object.create(ThemeModifier.prototype);
	Tooltip.prototype.constructor   = Tooltip;

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
     * @param {string} maxWidth The Tooltip Max Width to set.
     * @param {string} unit     The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Tooltip.prototype.setMaxWidth = function (maxWidth, unit) {
        if (unit !== undefined) { this.modifiers.maxWidth.unit = unit; }

        this.modifiers.maxWidth.value = maxWidth;
    };

	/**
	 * Gets the Background Color of the Tooltip Component.
	 * 
	 * @returns {string}
	 */
	Tooltip.prototype.getBackgroundColor = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background Color of the Tooltip Component.
	 * 
	 * @param {string} backgroundColor The Tooltip Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Tooltip.prototype.setBackgroundColor = function (backgroundColor) {
		this.modifiers.bg.value = backgroundColor;
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
	 * @param {string} textColor The Tooltip Text Color to set.
	 * 
	 * @returns {undefined}
	 */
	Tooltip.prototype.setColor = function (textColor) {
		this.modifiers.color.value = textColor;
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
     * @param {string} opacity The Tooltip Opacity to set.
     * 
     * @returns {string}
     */
    Tooltip.prototype.setOpacity = function (opacity) {
        this.modifiers.opacity.value = opacity;
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
     * @param {string} arrow The Tooltip Arrow Width to set.
     * @param {string} unit  The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Tooltip.prototype.setArrowWidth = function (arrowWidth, unit) {
        if (unit !== undefined) { this.modifiers.arrowWidth.unit = unit; }

        this.modifiers.arrowWidth.value = arrowWidth;
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
     * @param {string} arrowColor The Tooltip Arrow Color to set.
     * 
     * @returns {undefined}
     */
    Tooltip.prototype.setArrowColor = function (arrowColor) {
        this.modifiers.arrowColor.value = arrowColor;
    };

	/**
	 * Allows modifications of the Popover component styling in Bootstrap.
	 * 
	 * @class Popover
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
     * @property {object} bg                        The @popover-bg variable which sets the Background Color of the Popover Component.
	 * @property {object} maxWidth                  The @popover-max-width variable which sets the Max Width of the Popover Component.
	 * @property {object} borderColor               The @popover-border-color variable which sets the Border Color of the Popover Component.
	 * @property {object} fallbackBorderColor       The @popover-fallback-border-color variable which sets the Fallback Border Color of the Popover Component.
	 * @property {object} titleBg                   The @popover-title-bg variable which sets the Title Background Color of the Popover Component.
	 * @property {object} arrowWidth                The @popover-arrow-width variable which sets the Arrow Width of the Popover Component.
	 * @property {object} arrowColor                The @popover-arrow-color variable which sets the Arrow Color of the Popover Component.
	 * @property {object} arrowOuterWidth           The @popover-arrow-outer-width variable which sets the Arrow Outer Width of the Popover Component.
	 * @property {object} arrowOuterColor           The @popover-arrow-outer-color variable which sets the Arrow Outer Color of the Popover Component.
	 * @property {object} arrowOuterFallbackColor   The @popover-arrow-outer-fallback-color variable which sets the Arrow Outer Fallback Color of the Popover Component.
	 * 
	 * @returns {Popover}
	 */
	var Popover = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-popover';

        // Configure the Modifiers
        this.bg = {
			variable:           '@popover-bg',
			subscribeProperty:  'bg',
            changeFn:           this.setBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
        this.maxWidth = {
            variable:           '@popover-max-width',
            subscribeProperty:  'max-width',
            suffixUnit:         true,
            changeFn:           this.setMaxWidth.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.borderColor = {
            variable:           '@popover-border-color',
            subscribeProperty:  'border-color',
            changeFn:           this.setBorderColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.fallbackBorderColor = {
            variable:           '@popover-fallback-border-color',
            subscribeProperty:  'fallback-border-color',
            changeFn:           this.setFallbackBorderColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.titleBg = {
            variable:           '@popover-title-bg',
            subscribeProperty:  'title-bg',
            changeFn:           this.setTitleBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.arrowWidth = {
            variable:           '@popover-arrow-width',
            subscribeProperty:  'arrow-width',
            suffixUnit:         true,
            changeFn:           this.setArrowWidth.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.arrowColor = {
            variable:           '@popover-arrow-color',
            subscribeProperty:  'arrow-color',
            changeFn:           this.setArrowColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.arrowOuterWidth = {
            variable:           '@popover-arrow-outer-width',
            subscribeProperty:  'arrow-outer-width',
            suffixUnit:         true,
            changeFn:           this.setArrowOuterWidth.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.arrowOuterColor = {
            variable:           '@popover-arrow-outer-color',
            subscribeProperty:  'arrow-outer-color',
            changeFn:           this.setArrowOuterColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.arrowOuterFallbackColor = {
            variable:           '@popover-arrow-outer-fallback-color',
            subscribeProperty:  'arrow-outer-fallback-color-',
            changeFn:           this.setArrowOuterFallbackColor.bind(this),
            subscribers:        [],
			_value:             null
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

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Popover.prototype               = Object.create(ThemeModifier.prototype);
	Popover.prototype.constructor   = Popover;

	/**
	 * Gets the Background Color of the Popover Component.
	 * 
	 * @returns {string}
	 */
	Popover.prototype.getBackgroundColor = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background Color of the Popover Component.
	 * 
	 * @param {string} backgroundColor The Popover Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Popover.prototype.setBackgroundColor = function (backgroundColor) {
		this.modifiers.bg.value = backgroundColor;
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
     * @param {string} maxWidth The Popover Max Width to set.
     * @param {string} unit     The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setMaxWidth = function (maxWidth, unit) {
        if (unit !== undefined) { this.modifiers.maxWidth.unit = unit; }

        this.modifiers.maxWidth.value = maxWidth;
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
     * @param {string} borderColor The Popover Border Color to set.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setBorderColor = function (borderColor) {
        this.modifiers.borderColor.value = borderColor;
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
     * @param {string} fallbackBorderColor The Popover Fallback Border Color to set.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setFallbackBorderColor = function (fallbackBorderColor) {
        this.modifiers.fallbackBorderColor.value = fallbackBorderColor;
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
     * @param {string} titleBackgroundColor The Popover Title Background Color to set.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setTitleBackgroundColor = function (titleBackgroundColor) {
        this.modifiers.titleBg.value = titleBackgroundColor;
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
     * @param {string} arrowWidth The Popover Arrow Width to set.
     * @param {string} unit       The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setArrowWidth = function (arrowWidth, unit) {
        if (unit !== undefined) { this.modifiers.arrowWidth.unit = unit; }

        this.modifiers.arrowWidth.value = arrowWidth;
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
     * @param {string} arrowColor The Popover Arrow Color to set.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setArrowColor = function (arrowColor) {
        this.modifiers.arrowColor.value = arrowColor;
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
     * @param {string} arrowOuterWidth The Popover Arrow Outer Width to set.
     * @param {string} unit            The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setArrowOuterWidth = function (arrowOuterWidth, unit) {
        if (unit !== undefined) { this.modifiers.arrowOuterWidth.unit = unit; }

        this.modifiers.arrowOuterWidth.value = arrowOuterWidth;
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
     * @param {string} arrowOuterColor The Popover Outer Arrow Color to set.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setArrowOuterColor = function (arrowOuterColor) {
        this.modifiers.arrowOuterColor.value = arrowOuterColor;
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
     * @param {string} arrowOuterFallbackColor The Popover Arrow Outer Fallback Color to set.
     * 
     * @returns {undefined}
     */
    Popover.prototype.setArrowOuterFallbackColor = function (arrowOuterFallbackColor) {
        this.modifiers.arrowOuterFallbackColor.value = arrowOuterFallbackColor;
    };

	/**
	 * Allows modifications of the Thumbnail component styling in Bootstrap.
	 * 
	 * @class Thumbnail
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} padding           The @thumbnail-padding variable which sets the Padding of the Thumbnail Component.
	 * @property {object} bg                The @thumbnail-bg variable which sets the Background Color of the Thumbnail Component.
	 * @property {object} borderColor       The @thumbnail-border-color variable which sets the Border Color of the Thumbnail Component.
	 * @property {object} borderRadius      The @thumbnail-border-radius variable which sets the Border Radius of the Thumbnail Component.
	 * @property {object} captionColor      The @thumbnail-caption-color variable which sets the Caption Color of the Thumbnail Component.
	 * @property {object} captionPadding    The @thumbnail-caption-padding variable which sets the Caption Padding of the Thumbnail Component.
	 * 
	 * @returns {Thumbnail}
	 */
	var Thumbnail = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-thumbnail';

        // Configure the Modifiers
        this.padding = {
            variable:           '@thumbnail-padding',
            subscribeProperty:  'padding',
            suffixUnit:         true,
            changeFn:           this.setPadding.bind(this),
            subscribers:        [],
			_value:             null
        };
		this.bg = {
			variable:           '@thumbnail-bg',
			subscribeProperty:  'bg',
            changeFn:           this.setBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.borderColor = {
			variable:           '@thumbnail-border',
			subscribeProperty:  'border-color',
            changeFn:           this.setBorderColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.borderRadius = {
			variable:           '@thumbnail-border-radius',
			subscribeProperty:  'border-radius',
            suffixUnit:         true,
            changeFn:           this.setBorderRadius.bind(this),
            subscribers:        [],
			_value:             null
		};
        this.captionColor = {
            variable:           '@thumbnail-caption-color',
            subscribeProperty:  'caption-color',
            changeFn:           this.setCaptionColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.captionPadding = {
            variable:           '@thumbnail-caption-padding',
            subscribeProperty:  'caption-padding',
            suffixUnit:         true,
            changeFn:           this.setCaptionPadding.bind(this),
            subscribers:        [],
			_value:             null
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

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Thumbnail.prototype             = Object.create(ThemeModifier.prototype);
	Thumbnail.prototype.constructor = Thumbnail;

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
	 * @param {string} padding The Thumbnail Padding to set.
     * @param {string} unit    The CSS measurement unit to suffix to the value.
	 * 
	 * @returns {undefined}
	 */
	Thumbnail.prototype.setPadding = function (padding, unit) {
        if (unit !== undefined) { this.modifiers.padding.unit = unit; }

		this.modifiers.padding.value = padding;
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
	 * @param {string} backgroundColor The Thumbnail Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Thumbnail.prototype.setBackgroundColor = function (backgroundColor) {
		this.modifiers.bg.value = backgroundColor;
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
	 * @param {string} borderColor The Thumbnail Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	Thumbnail.prototype.setBorderColor = function (borderColor) {
		this.modifiers.borderColor.value = borderColor;
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
	 * @param {string} borderRadius The Thumbnail Border Radius to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
	 * 
	 * @returns {undefined}
	 */
	Thumbnail.prototype.setBorderRadius = function (borderRadius, unit) {
        if (unit !== undefined) { this.modifiers.borderRadius.unit = unit; }

		this.modifiers.borderRadius.value = borderRadius;
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
     * @param {string} captionColor The Thumbnail Caption Color to set.
     * 
     * @returns {undefined}
     */
    Thumbnail.prototype.setCaptionColor = function (captionColor) {
        this.modifiers.captionColor.value = captionColor;
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
     * @param {string} captionPadding The Thumbnail Caption Padding to set.
     * @param {string} unit           The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Thumbnail.prototype.setCaptionPadding = function (captionPadding, unit) {
        if (unit !== undefined) { this.modifiers.captionPadding.unit = unit; }

        this.modifiers.captionPadding.value = captionPadding;
    };

	/**
	 * Allows modification of the Badge component in Bootstrap.
	 * 
	 * @class Badge
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} color             The @badge-color variable which controls the Color of the Badge Component.
	 * @property {object} linkHoverColor    The @badge-link-hover-color variable which controls the Link Hover Color of the Badge Component.
	 * @property {object} bg                The @badge-bg variable which controls the Background Color of the Badge Component.
	 * @property {object} activeColor       The @badge-active-color variable which controls the Active Color of the Badge Component.
	 * @property {object} activeBg          The @badge-active-bg variable which controls the Active Background Color of the Badge Component.
	 * @property {object} fontWeight        The @badge-font-weight variable which controls the Font Weight of the Badge Component.
	 * @property {object} lineHeight        The @badge-line-height variable which controls the Line Height of the Badge Component.
	 * @property {object} borderRadius      The @badge-border-radius variable which controls the Border Radius of the Badge Component.
	 * 
	 * @returns {Badge}
	 */
	var Badge = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-badge';

        // Configure the Modifiers
		this.color = {
			variable:           '@badge-color',
            subscribeProperty:  'color',
            changeFn:           this.setColor.bind(this),
            subscribers:        [],
			_value:             null
		};
        this.linkHoverColor = {
			variable:           '@badge-link-hover-color',
            subscribeProperty:  'link-hover-color',
            changeFn:           this.setLinkHoverColor.bind(this),
            subscribers:        [],
			_value:             null
		};
        this.bg = {
			variable:           '@badge-bg',
            subscribeProperty:  'bg',
            changeFn:           this.setBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
		this.activeColor = {
			variable:           '@badge-active-color',
            subscribeProperty:  'active-color',
            changeFn:           this.setActiveColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.activeBg = {
			variable:           '@badge-active-bg',
            subscribeProperty:  'active-bg-color',
            changeFn:           this.setActiveBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.fontWeight = {
			variable:           '@badge-font-weight',
            subscribeProperty:  'font-weight',
            changeFn:           this.setFontWeight.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.lineHeight = {
			variable:           '@badge-line-height',
            subscribeProperty:  'line-height',
            changeFn:           this.setLineHeight.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.borderRadius = {
			variable:           '@badge-border-radius',
            subscribeProperty:  'border-radius',
            suffixUnit:         true,
            changeFn:           this.setBorderRadius.bind(this),
            subscribers:        [],
			_value:             null
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

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Badge.prototype             = Object.create(ThemeModifier.prototype);
	Badge.prototype.constructor = Badge;

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
	 * @param {string} color The Badge Color to set.
	 * 
	 * @returns {undefined}
	 */
	Badge.prototype.setColor = function (color) {
		this.modifiers.color.value = color;
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
	 * @param {string} linkHoverColor The Badge Link Hover Color to set.
	 * 
	 * @returns {undefined}
	 */
	Badge.prototype.setLinkHoverColor = function (linkHoverColor) {
		this.modifiers.linkHoverColor.value = linkHoverColor;
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
	 * @param {string} backgroundColor The Badge Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Badge.prototype.setBackgroundColor = function (backgroundColor) {
		this.modifiers.bg.value = backgroundColor;
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
	 * @param {string} activeColor The Badge Active Color to set.
	 * 
	 * @returns {undefined}
	 */
	Badge.prototype.setActiveColor = function (activeColor) {
		this.modifiers.activeColor.value = activeColor;
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
	 * @param {string} activeBackgroundColor The Badge Active Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Badge.prototype.setActiveBackgroundColor = function (activeBackgroundColor) {
		this.modifiers.activeBg.value = activeBackgroundColor;
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
     * @param {string} fontWeight The Badge Font Weight to set.
     * 
     * @returns {undefined}
     */
    Badge.prototype.setFontWeight = function (fontWeight) {
        this.modifiers.fontWeight.value = fontWeight;
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
     * @param {string} lineHeight The Badge Line Height to set.
     * 
     * @returns {undefined}
     */
    Badge.prototype.setLineHeight = function (lineHeight) {
        this.modifiers.lineHeight.value = lineHeight;
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
     * @param {string} borderRadius The Badge Border Radius to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Badge.prototype.setBorderRadius = function (borderRadius, unit) {
        if (unit !== undefined) { this.modifiers.borderRadius.unit = unit; }

        this.modifiers.borderRadius.value = borderRadius;
    };

	/**
	 * Allows modification of a Carousel component in Bootstrap.
	 * 
	 * @class Carousel
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} controlColor          The @carousel-control-color variable which controls the Control Color of the Carousel Component.
	 * @property {object} controlWidth          The @carousel-control-width variable which controls the Control Width of the Carousel Component.
	 * @property {object} controlOpacity        The @carousel-control-opacity variable which controls the Control Opacity of the Carousel Component.
	 * @property {object} controlFontSize       The @carousel-control-font-size variable which controls the Control Font Size of the Carousel Component.
	 * @property {object} indicatorActiveBg     The @carousel-indicator-active-bg variable which controls the Indicator Active Background Color of the Carousel Component.
	 * @property {object} indicatorBorderColor  The @carousel-indicator-border-color variable which controls the Indicator Border Color of the Carousel Component.
	 * @property {object} captionColor          The @carousel-caption-color variable which controls the Caption Color of the Carousel Component.
	 * 
	 * @returns {Carousel}
	 */
	var Carousel = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-carousel';

        // Configure the Modifiers
		this.controlColor = {
			variable:           '@carousel-control-color',
            subscribeProperty:  'control-color',
            changeFn:           this.setControlColor.bind(this),
			subscribers:        [],
            _value:             null
		};
		this.controlWidth = {
			variable:           '@carousel-control-width',
            subscribeProperty:  'control-width',
            suffixUnit:         true,
            changeFn:           this.setControlWidth.bind(this),
			subscribers:        [],
            _value:             null
		};
		this.controlOpacity = {
			variable:           '@carousel-control-opacity',
			subscribeProperty:  'control-opacity',
            changeFn:           this.setControlOpacity.bind(this),
            subscribers:        [],
            _value:             null
		};
		this.controlFontSize = {
			variable:           '@carousel-control-font-size',
            subscribeProperty:  'control-font-size',
            suffixUnit:         true,
            changeFn:           this.setControlFontSize.bind(this),
			subscribers:        [],
            _value:             null
		};
        this.indicatorActiveBg = {
            variable:           '@carousel-indicator-active-bg',
            subscribeProperty:  'indicator-active-bg-color',
            changeFn:           this.setIndicatorActiveBackgroundColor.bind(this),
            subscribers:        [],
            _value:             null
        };
        this.indicatorBorderColor = {
            variable:           '@carousel-indicator-border-color',
            subscribeProperty:  'indicator-border-color',
            changeFn:           this.setIndicatorBorderColor.bind(this),
            subscribers:        [],
            _value:             null
        };
        this.captionColor = {
            variable:           '@carousel-caption-color',
            subscribeProperty:  'caption-color',
            changeFn:           this.setCaptionColor.bind(this),
            subscribers:        [],
            _value:             null
        };
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            controlColor:           this.controlColor,
            controlWidth:           this.controlWidth,
            controlOpacity:         this.controlOpacity,
            controlFontSize:        this.controlFontSize,
            indicatorActiveBg:      this.indicatorActiveBg,
            indicatorBorderColor:   this.indicatorBorderColor,
            captionColor:           this.captionColor
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Carousel.prototype              = Object.create(ThemeModifier.prototype);
	Carousel.prototype.constructor  = Carousel;

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
	 * @param {string} controlColor The Carousel Control Color to set.
	 * 
	 * @returns {undefined}
	 */
	Carousel.prototype.setControlColor = function (controlColor) {
		this.modifiers.controlColor.value = controlColor;
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
	 * @param {string} controlWidth The Carousel Control Width to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
	 * 
	 * @returns {undefined}
	 */
	Carousel.prototype.setControlWidth = function (controlWidth, unit) {
        if (unit !== undefined) { this.modifiers.controlWidth.unit = unit; }

		this.modifiers.controlWidth.value = controlWidth;
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
	 * @param {string} controlOpacity The Carousel Control Opacity to set.
	 * 
	 * @returns {undefined}
	 */
	Carousel.prototype.setControlOpacity = function (controlOpacity) {
		this.modifiers.controlOpacity.value = controlOpacity;
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
	 * @param {string} controlFontSize The Carousel Control Font Size to set.
     * @param {string} unit            The CSS measurement unit to suffix to the value.
	 * 
	 * @returns {undefined}
	 */
	Carousel.prototype.setControlFontSize = function (controlFontSize, unit) {
        if (unit !== undefined) { this.modifiers.controlFontSize.unit = unit; }

		this.modifiers.controlFontSize.value = controlFontSize;
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
     * @param {string} indicatorActiveBackgroundColor The Carousel Indicator Background Color to set.
     * 
     * @returns {undefined}
     */
    Carousel.prototype.setIndicatorActiveBackgroundColor = function (indicatorActiveBackgroundColor) {
        this.modifiers.indicatorActiveBg.value = indicatorActiveBackgroundColor;
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
     * @param {string} indicatorBorderColor The Carousel Border Color to set.
     * 
     * @returns {undefined}
     */
    Carousel.prototype.setIndicatorBorderColor = function (indicatorBorderColor) {
        this.modifiers.indicatorBorderColor.value = indicatorBorderColor;
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
     * Sets the Caption Color of the Carousel Component.
     * 
     * @param {string} captionColor The Carousel Caption Color to set.
     * 
     * @returns {undefined}
     */
    Carousel.prototype.setCaptionColor = function (captionColor) {
        this.modifiers.captionColor.value = captionColor;
    };

	/**
	 * Allows modification of a Code component in Bootstrap.
	 * 
	 * @class Code
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} codeColor                 The @code-color variable which controls the Code Color of the Code Component.
	 * @property {object} codeBg                    The @code-bg variable which controls the Code Background Color of the Code Component.
	 * @property {object} kbdColor                  The @kbd-color variable which controls the Kbd Color of the Code Component.
	 * @property {object} kbdBg                     The @kbd-bg variable which controls the Kdb Background Color of the Code Component.
	 * @property {object} preColor                  The @pre-color variable which controls the Pre Color of the Code Component.
	 * @property {object} preBg                     The @pre-bg variable which controls the Pre Background Color of the Code Component.
	 * @property {object} preBorderColor            The @pre-border-color variable which controls the Pre Border Color of the Code Component.
	 * @property {object} preScrollableMaxHeight    The @pre-scrollable-max-height variable which controls the Pre Scrollable Max Height of the Code Component.
	 * 
	 * @returns {Code}
	 */
	var Code = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-code';

        // Configure the Modifiers
		this.codeColor = {
			variable:           '@code-color',
            subscribeProperty:  'code-color',
            changeFn:           this.setCodeColor.bind(this),
            subscribers:        [],
			_value:             null
		};
        this.codeBg = {
			variable:           '@code-bg',
            subscribeProperty:  'code-bg-color',
            changeFn:           this.setCodeBackgroundColor.bind(this),
			subscribers:        [],
			_value:             null
        };
		this.kbdColor = {
			variable:           '@kbd-color',
            subscribeProperty:  'kbd-color',
            changeFn:           this.setKbdColor.bind(this),
			subscribers:        [],
			_value:             null
		};
        this.kbdBg = {
			variable:           '@kbd-bg',
            subscribeProperty:  'kbd-bg-color',
            changeFn:           this.setKbdBackgroundColor.bind(this),
			subscribers:        [],
			_value:             null
        };
		this.preColor = {
			variable:           '@pre-color',
            subscribeProperty:  'pre-color',
            changeFn:           this.setPreColor.bind(this),
			subscribers:        [],
			_value:             null
		};
        this.preBg = {
			variable:           '@pre-bg',
            subscribeProperty:  'pre-bg-color',
            changeFn:           this.setPreBackgroundColor.bind(this),
			subscribers:        [],
			_value:             null
        };
        this.preBorderColor = {
			variable:           '@pre-border-color',
            subscribeProperty:  'pre-border-color',
            changeFn:           this.setPreBorderColor.bind(this),
			subscribers:        [],
			_value:             null
        };
        this.preScrollableMaxHeight = {
			variable:           '@pre-scrollable-max-height',
            subscribeProperty:  'pre-scrollable-max-height',
            suffixUnit:         true,
            changeFn:           this.setPreScrollableMaxHeight.bind(this),
			subscribers:        [],
			_value:             null
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

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Code.prototype              = Object.create(ThemeModifier.prototype);
	Code.prototype.constructor  = Code;

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
	 * @param {string} codeColor The Code Color to set.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setCodeColor = function (codeColor) {
		this.modifiers.codeColor.value = codeColor;
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
	 * @param {string} codeBackgroundColor The Code Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setCodeBackgroundColor = function (codeBackgroundColor) {
		this.modifiers.codeBg.value = codeBackgroundColor;
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
	 * @param {string} kbdColor The Code Kbd Color to set.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setKbdColor = function (kbdColor) {
		this.modifiers.kbdColor.value = kbdColor;
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
	 * @param {string} kbdBackgroundColor The Code Kbd Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setKbdBackgroundColor = function (kbdBackgroundColor) {
		this.modifiers.kbdBg.value = kbdBackgroundColor;
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
	 * @param {string} preColor The Code Pre Color to set.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setPreColor = function (preColor) {
		this.modifiers.preColor.value = preColor;
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
	 * @param {string} preBackgroundColor The Code Pre Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setPreBackgroundColor = function (preBackgroundColor) {
		this.modifiers.preBg.value = preBackgroundColor;
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
	 * @param {string} preBorderColor The Code Pre Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setPreBorderColor = function (preBorderColor) {
		this.modifiers.preBorderColor.value = preBorderColor;
	};

	/**
	 * Gets the Pre Scrollable Max Height of the Code Component.
	 * 
	 * @returns {String}
	 */
	Code.prototype.getPreScrollableMaxHeight = function () {
		return this.modifiers.preScrollableMaxHeight.value;
	};

	/**
	 * Sets the Pre Scrollable Max Height of the Code Component.
	 * 
	 * @param {string} preScrollableMaxHeight The Code Pre Scrollable Max Height to set.
     * @param {string} unit                   The CSS measurement unit to suffix to the value.
	 * 
	 * @returns {undefined}
	 */
	Code.prototype.setPreScrollableMaxHeight = function (preScrollableMaxHeight, unit) {
        if (unit !== undefined) { this.modifiers.preScrollableMaxHeight.unit = unit; }

		this.modifiers.preScrollableMaxHeight.value = preScrollableMaxHeight;
	};

	/**
	 * Allows modification of the Blockquote component in Bootstrap.
	 * 
	 * @class Blockquote
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} smallColor    The @blockquote-color variable which controls the Small Color of the Blockquote Component.
	 * @property {object} fontSize      The @blockquote-font-size variable which controls the Font Size of the Blockquote Component.
	 * @property {object} borderColor   The @blockquote-border-color variable which controls the Border Color of the Blockquote Component.
	 * 
	 * @returns {Blockquote}
	 */
	var Blockquote = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-blockquote';

        // Configure the Modifiers
		this.smallColor = {
			variable:           '@blockquote-small-color',
            subscribeProperty:  'small-color',
            changeFn:           this.setSmallColor.bind(this),
            subscribers:        [],
			_value:             null
        };
		this.fontSize = {
			variable:           '@blockquote-font-size',
            subscribeProperty:  'font-size',
            suffixUnit:         true,
            changeFn:           this.setFontSize.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.borderColor = {
			variable:           '@blockquote-border-color',
            subscribeProperty:  'border-color',
            changeFn:           this.setBorderColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            smallColor:     this.smallColor,
            fontSize:       this.fontSize,
            borderColor:    this.borderColor
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Blockquote.prototype                = Object.create(ThemeModifier.prototype);
	Blockquote.prototype.constructor    = Blockquote;

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
	 * @param {string} smallColor The Blockquote Small Color to set.
	 * 
	 * @returns {undefined}
	 */
	Blockquote.prototype.setSmallColor = function (smallColor) {
		this.modifiers.smallColor.value = smallColor;
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
     * @param {string} fontSize The Blockquote Font Size to set.
     * @param {string} unit     The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Blockquote.prototype.setFontSize = function (fontSize, unit) {
        if (unit !== undefined) { this.modifiers.fontSize.unit = unit; }

        this.modifiers.fontSize.value = fontSize;
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
     * @param {string} borderColor The Blockquote Border Color to set.
     * 
     * @returns {undefined}
     */
    Blockquote.prototype.setBorderColor = function (borderColor) {
        this.modifiers.borderColor.value = borderColor;
    };

    /**
	 * Allows modification of the Modal component in Bootstrap.
	 * 
	 * @class Modal
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} innerPadding                  The @modal-inner-padding variable which controls the Inner Padding of the Modal Component.
	 * @property {object} titlePadding                  The @modal-title-padding variable which controls the Title Padding of the Modal Component.
	 * @property {object} titleLineHeight               The @modal-title-line-height variable which controls the Title Line Height of the Modal Component.
	 * @property {object} contentBg                     The @modal-content-bg variable which controls the Content Background Color of the Modal Component.
	 * @property {object} contentBorderColor            The @modal-content-border-color variable which controls the Content Border Color of the Modal Component.
	 * @property {object} contentFallbackBorderColor    The @modal-content-fallback-border-color variable which controls the Content Fallback Border Color of the Modal Component.
     * @property {object} backdropBg                    The @modal-backdrop-bg variable which controls the Backdrop Background Color of the Modal Component.
     * @property {object} backdropOpacity               The @modal-backdrop-opacity variable which controls the Backdrop Opacity of the Modal Component.
     * @property {object} headerBorderColor             The @modal-header-border-color variable which controls the Header Border Color of the Modal Component.
     * @property {object} footerBorderColor             The @modal-footer-border-color variable which controls the Footer Border Color of the Modal Component.
     * 
     * @returns {Modal}
     */
    var Modal = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-modal';

        this.innerPadding = {
            variable:           '@modal-inner-padding',
            subscribeProperty:  'inner-padding',
            suffixUnit:         true,
            changeFn:           this.setInnerPadding.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.titlePadding = {
            variable:           '@modal-title-padding',
            subscribeProperty: 'title-padding',
            suffixUnit:         true,
            changeFn:           this.setTitlePadding.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.titleLineHeight = {
            variable:           '@modal-title-line-height',
            subscribeProperty:  'title-line-height',
            changeFn:           this.setTitleLineHeight.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.contentBg = {
            variable:           '@modal-content-bg',
            subscribeProperty:  'content-bg',
            changeFn:           this.setContentBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.contentBorderColor = {
            variable:           '@modal-content-border-color',
            subscribeProperty:  'content-border-color',
            changeFn:           this.setContentBorderColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.contentFallbackBorderColor = {
            variable:           '@modal-content-fallback-border-color',
            subscribeProperty:  'content-fallback-border-color',
            changeFn:           this.setContentFallbackBorderColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.backdropBg = {
            variable:           '@modal-backdrop-bg',
            subscribeProperty:  'backdrop-bg',
            changeFn:           this.setBackdropBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.backdropOpacity = {
            variable:           '@modal-backdrop-opacity',
            subscribeProperty:  'backdrop-opacity',
            changeFn:           this.setBackdropOpacity.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.headerBorderColor = {
            variable:           '@modal-header-border-color',
            subscribeProperty:  'header-border-color',
            changeFn:           this.setHeaderBorderColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.footerBorderColor = {
            variable:           '@modal-footer-border-color',
            subscribeProperty:  'footer-border-color',
            changeFn:           this.setFooterBorderColor.bind(this),
            subscribers:        [],
			_value:             null
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

        this.setupDataBinding();
    };

    // Inherit from parent Prototype and preserve constructor
    Modal.prototype             = Object.create(ThemeModifier.prototype);
    Modal.prototype.constructor = Modal;

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
     * @param {string} innerPadding The Modal Inner Padding to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
     * 
     * @returns {string}
     */
    Modal.prototype.setInnerPadding = function (innerPadding, unit) {
        if (unit !== undefined) { this.modifiers.innerPadding.unit = unit; }

        this.modifiers.innerPadding.value = innerPadding;
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
     * @param {string} titlePadding The Modal Title Padding to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
     * 
     * @returns {string}
     */
    Modal.prototype.setTitlePadding = function (titlePadding, unit) {
        if (unit !== undefined) { this.modifiers.titlePadding.unit = unit; }

        this.modifiers.titlePadding.value = titlePadding;
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
     * @param {string} titleLineHeight The Modal Title Line Height to set.
     * 
     * @returns {string}
     */
    Modal.prototype.setTitleLineHeight = function (titleLineHeight) {
        this.modifiers.titleLineHeight.value = titleLineHeight;
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
     * @param {string} contentBackgroundColor The Modal Content Background Color to set.
     * 
     * @returns {string}
     */
    Modal.prototype.setContentBackgroundColor = function (contentBackgroundColor) {
        this.modifiers.contentBg.value = contentBackgroundColor;
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
     * @param {string} contentBorderColor The Modal Content Border Color to set.
     * 
     * @returns {string}
     */
    Modal.prototype.setContentBorderColor = function (contentBorderColor) {
        this.modifiers.contentBorderColor.value = contentBorderColor;
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
     * @param {string} contentFallbackBorderColor The Modal Content Fallback Border Color to set.
     * 
     * @returns {string}
     */
    Modal.prototype.setContentFallbackBorderColor = function (contentFallbackBorderColor) {
        this.modifiers.contentFallbackBorderColor.value = contentFallbackBorderColor;
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
     * @param {string} backdropBg The Modal Backdrop Background Color to set.
     * 
     * @returns {string}
     */
    Modal.prototype.setBackdropBackgroundColor = function (backdropBg) {
        this.modifiers.backdropBg.value = backdropBg;
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
     * @param {string} backdropOpacity The Modal Backdrop Opacity to set.
     * 
     * @returns {string}
     */
    Modal.prototype.setBackdropOpacity = function (backdropOpacity) {
        this.modifiers.backdropOpacity.value = backdropOpacity;
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
     * @param {string} headerBorderColor The Modal Header Border Color to set.
     * 
     * @returns {string}
     */
    Modal.prototype.setHeaderBorderColor = function (headerBorderColor) {
        this.modifiers.headerBorderColor.value = headerBorderColor;
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
     * @param {string} footerBorderColor The Modal Footer Border Color to set.
     * 
     * @returns {string}
     */
    Modal.prototype.setFooterBorderColor = function (footerBorderColor) {
        this.modifiers.footerBorderColor.value = footerBorderColor;
    };

    /**
	 * Allows modification of the Button component in Bootstrap.
	 * 
	 * @class Button
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
     * @param {string} string The style of Button Component to modify.
	 * 
	 * @property {object} bg        The @btn-{style}-bg variable which controls the Background Color of the Button Component.
	 * @property {object} color     The @btn-{style}-color variable which controls the Color of the Button Component.
	 * @property {object} border    The @btn-{style}-border variable which controls the Border of the Button Component.
	 * 
	 * @returns {Button}
	 */
	var Button = function (editor, style) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-button-' + style;

        if (style === undefined) {
            throw new TypeError('ClucklesEditor.button.js: style cannot be undefined');
        }

        // Configure the Modifiers
		this.bg = {
			variable:           '@btn-' + style + '-bg',
			subscribeProperty:  'bg',
            changeFn:           this.setBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.color = {
			variable:           '@btn-' + style + '-color',
			subscribeProperty:  'color',
            changeFn:           this.setColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.border = {
			variable:           '@btn-' + style + '-border',
			subscribeProperty:  'hover-border-color',
            changeFn:           this.setBorderColor.bind(this),
            subscribers:        [],
			_value:             null
		};

        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            bg:     this.bg,
            color:  this.color,
            border: this.border
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Button.prototype                = Object.create(ThemeModifier.prototype);
	Button.prototype.constructor    = Button;

	/**
	 * Gets the Background Color of this Button instance.
	 * 
	 * @returns {String}
	 */
	Button.prototype.getBackgroundColor = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background color of this Button instance.
	 * 
	 * @param {string} backgroundColor The Button Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Button.prototype.setBackgroundColor = function (backgroundColor) {
		this.modifiers.bg.value = backgroundColor;
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
	 * @param {string} color The Button Color to set.
	 * 
	 * @returns {undefined}
	 */
	Button.prototype.setColor = function (color) {
		this.modifiers.color.value = color;
	};

	/**
	 * Gets the Border Color of this Button instance.
	 * 
	 * @returns {string}
	 */
	Button.prototype.getBorderColor = function () {
		return this.modifiers.border.value;
	};

	/**
	 * Sets the Border Color of this Button instance.
	 * 
	 * @param {string} borderColor The Button Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	Button.prototype.setBorderColor = function (borderColor) {
		this.modifiers.border.value = borderColor;
	};

	/**
	 * Allows Alerts/Panels to be styled and affects the @state-{type}-{property} variables.
	 * 
	 * @class FormState
	 * @extends ThemeModifiers
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} headingBg The @state-{type}-bg variable which sets the Heading Background color of alerts/panel headers.
	 * @property {object} text      The @state-{type}-text variable which sets the Text color of alerts/panel headers.
	 * @property {object} border    The @state-{type}-border variable which sets the Border color of alerts/panel headers.
	 * 
	 * @returns {FormState}
	 */
	var FormState = function (editor, type) {
		ThemeModifier.call(this, editor); // Call parent constructor
		
        this.subscriberDataAttribute = 'data-cluckles-formstate-' + type;
        
        // Configure the Modifiers
		this.headingBg = {
			variable:           '@state-' + type + '-bg',
			subscribeProperty:  'heading-bg',
            changeFn:           this.setHeadingBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.text = {
			variable:           '@state-' + type + '-text',
			subscribeProperty:  'text',
            changeFn:           this.setTextColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.border = {
			variable:           '@state-' + type + '-border',
			subscribeProperty:  'border-color',
            changeFn:           this.setBorderColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            headingBg:  this.headingBg,
            text:       this.text,
            border:     this.border
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	FormState.prototype             = Object.create(ThemeModifier.prototype);
	FormState.prototype.constructor = FormState;

	/**
	 * Get Heading Background color.
	 * 
	 * @returns {string}
	 */
	FormState.prototype.getHeadingBackgroundColor = function () {
		return this.modifiers.headingBg.value;
	};

	/**
	 * Sets the Heading Background Color of Alerts/Panel headers.
	 * 
	 * @param {string} headingBackgroundColor The Alerts/Panel Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	FormState.prototype.setHeadingBackgroundColor = function (headingBackgroundColor) {
		this.modifiers.headingBg.value = headingBackgroundColor;
	};

	/**
	 * Gets the Text Color of Alerts/Panel headers.
	 * 
	 * @returns {string}
	 */
	FormState.prototype.getTextColor = function () {
		return this.modifiers.text.value;
	};

	/**
	 * Sets the Text Color of Alerts/Panel headers.
	 * 
	 * @param {string} textColor The Alerts/Panel Text Color to set.
	 * 
	 * @returns {undefined}
	 */
	FormState.prototype.setTextColor = function (textColor) {
		this.modifiers.text.value = textColor;
	};

	/**
	 * Gets the Border color of Alerts/Panel headers.
	 * 
	 * @returns {string}
	 */
	FormState.prototype.getBorderColor = function () {
		return this.modifiers.border.value;
	};

	/**
	 * Sets the Border Color of Alerts/Panel headers.
	 * 
	 * @param {string} borderColor The Alerts/Panel Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	FormState.prototype.setBorderColor = function (borderColor) {
		this.modifiers.border.value = borderColor;
	};

	/**
	 * Allows modification of the base @gray-{shade} variables which affect the
	 * base colors of the bootstrap Theme.
	 * 
	 * @class GrayScale
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {string} base      The @gray-base variable which influence all the others
	 * @property {string} darker    The @gray-darker variable which is the darkest after base.
	 * @property {string} dark      The @gray-dark variable which is 2nd darkest after base.
	 * @property {string} gray      The @gray variable which is ~30% gray lighter than base.
	 * @property {string} light     The @gray-light variable which is ~60% lighter than base.
	 * @property {string} lighter   The @gray-lighter variable which is ~90% lighter than base.
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

	/**
	 * Allows modifications of the Jumbotron component styling in Bootstrap.
	 * 
	 * @class Jumbotron
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} padding       The @jumbotron-padding variable which sets the Padding of the Jumbotron Component.
	 * @property {object} bg            The @jumbotron-bg variable which sets the Background of the Jumbotron Component.
	 * @property {object} headingColor  The @jumbotron-heading-color variable which sets the Heading of the Jumbotron Component.
	 * @property {object} color         The @jumbotron-color variable which sets the Color of the Jumbotron Component.
	 * @property {object} fontSize      The @jumbotron-font-size variable which sets the Font Size of the Jumbotron Component.
	 * 
	 * @returns {Jumbotron}
	 */
    var Jumbotron = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-jumbotron';

        // Configure the Modifiers
        this.padding = {
            variable:           '@jumbotron-padding',
            subscribeProperty:  'padding',
            suffixUnit:         true,
            changeFn:           this.setPadding.bind(this),
            subscribers:        [],
            _value:             null
        };
        this.bg = {
            variable:           '@jumbotron-bg',
            subscribeProperty:  'bg',
            changeFn:           this.setBackgroundColor.bind(this),
            subscribers:        [],
            _value:             null
        };
        this.headingColor = {
            variable:           '@jumbotron-heading-color',
            subscribeProperty:  'heading-color',
            changeFn:           this.setHeadingColor.bind(this),
            subscribers:        [],
            _value:             null
        };
        this.color = {
            variable:           '@jumbotron-color',
            subscribeProperty:  'color',
            changeFn:           this.setColor.bind(this),
            subscribers:        [],
            _value:             null
        };
        this.fontSize = {
            variable:           '@jumbotron-font-size',
            subscribeProperty:  'font-size',
            suffixUnit:         true,
            changeFn:           this.setFontSize.bind(this),
            subscribers:        [],
            _value:             null
        };

        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            padding:        this.padding,
            bg:             this.bg,
            headingColor:   this.headingColor,
            color:          this.color,
            fontSize:       this.fontSize
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Jumbotron.prototype             = Object.create(ThemeModifier.prototype);
	Jumbotron.prototype.constructor = Jumbotron;

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
     * @param {string} padding  The Jumbotron Padding to set.
     * @param {string} unit     The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Jumbotron.prototype.setPadding = function (padding, unit) {
        if (unit !== undefined) { this.modifiers.padding.unit = unit; }

        this.modifiers.padding.value = padding;
    };

    /**
     * Gets the Background Color of the Jumbotron Component.
     * 
     * @returns {string}
     */
    Jumbotron.prototype.getBackgroundColor = function () {
        return this.modifiers.bg.value;
    };

    /**
     * Sets the Background Color of the Jumbotron Component.
     * 
     * @param {string} backgroundColor The Jumbotron Background Color to set.
     * 
     * @returns {undefined}
     */
    Jumbotron.prototype.setBackgroundColor = function (backgroundColor) {
        this.modifiers.bg.value = backgroundColor;
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
     * Sets the Text Color of the Jumbotron Component.
     * 
     * @param {string} textColor The Jumbotron Text Color to set,
     * 
     * @returns {undefined}
     */
    Jumbotron.prototype.setColor = function (textColor) {
        this.modifiers.color.value = textColor;
    };

    /**
     * Gets the Heading Color of the Jumbotron Component.
     * 
     * @returns {string}
     */
    Jumbotron.prototype.getHeadingColor = function () {
        return this.modifiers.headingColor.value;
    };

    /**
     * Sets the Heading Color of the Jumbotron Component.
     * 
     * @param {string} headingColor The Jumbotron Heading Color to set.
     * 
     * @returns {undefined}
     */
    Jumbotron.prototype.setHeadingColor = function (headingColor) {
        this.modifiers.headingColor.value = headingColor;
    };

    /**
     * Gets the Font Size of the Jumbotron Component.
     * 
     * @returns {string}
     */
    Jumbotron.prototype.getFontSize = function () {
        return this.modifiers.fontSize.value;
    };

    /**
     * Sets the Font Size of the Jumbotron Component.
     * 
     * @param {string} fontSize The Jumbotron Font Size to set.
     * @param {string} unit     The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Jumbotron.prototype.setFontSize = function (fontSize, unit) {
        if (unit !== undefined) { this.modifiers.fontSize.unit = unit; }

        this.modifiers.fontSize.value = fontSize;
    };

	/**
	 * Allows modifications of the ListGroup Component styling.
	 * 
	 * @class ListGroup
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} bg                The @list-group-bg variable which sets the Background Color of the ListGroup Component.
	 * @property {object} border            The @list-group-border variable which sets the Border Color of the ListGroup Component.
	 * @property {object} borderRadius      The @list-group-border-radius variable which sets the Border Radius of the ListGroup Component.
	 * @property {object} hoverBg           The @list-group-hover-bg variable which sets the Hover Background of the ListGroup Component.
	 * @property {object} activeBg          The @list-group-active-bg variable which sets the Background Color of <a> inside ListGroups.
	 * @property {object} activeBorder      The @list-group-active-border variable which sets the Active Border of the ListGroup Component.
	 * @property {object} activeColor       The @list-group-active-color variable which sets the Color of <a> inside ListGroups.
	 * @property {object} activeTextColor   The @list-group-active-text-color variable which sets the Color of <a> > <p> inside ListGroups.
     * @property {object} linkColor         The @list-group-link-color variable which sets the Color of <a> inside ListGroups.
     * @property {object} linkHeadingColor  The @list-group-link-heading-color variable which sets the Color of <h4> inside ListGroups.
     * @property {object} linkHoverColor    The @list-group-link-heading-color variable which sets the Hover Color of <a> inside ListGroups.
     * @property {object} disabledBg        The @list-group-disabled-bg variable which sets the Background Color of Disabled Items inside ListGroups.
     * @property {object} disabledColor     The @list-group-disabled-color variable which sets the Color of Disabled Items inside ListGroups.
     * @property {object} disabledTextColor The @list-group-disabled-text-color variable which sets the Text Color of Content in Disabled Items inside ListGroups.
	 * 
	 * @returns {ListGroup}
	 */
	var ListGroup = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-listgroup';

        // Configure the Modifiers
		this.bg = {
			variable:           '@list-group-bg',
			subscribeProperty:  'bg',
            changeFn:           this.setBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.border = {
			variable:           '@list-group-border',
			subscribeProperty:  'border',
            changeFn:           this.setBorderColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.borderRadius = {
			variable:           '@list-group-border-radius',
			subscribeProperty:  'border-radius',
            suffixUnit:         true,
            changeFn:           this.setBorderRadius.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.hoverBg = {
			variable:           '@list-group-hover-bg',
			subscribeProperty:  'hover-bg',
            changeFn:           this.setHoverBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.activeBg = {
			variable:           '@list-group-active-bg',
			subscribeProperty:  'active-bg',
            changeFn:           this.setActiveBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.activeBorder = {
			variable:           '@list-group-active-border',
			subscribeProperty:  'active-border',
            changeFn:           this.setActiveBorderColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.activeColor = {
			variable:           '@list-group-active-color',
			subscribeProperty:  'active-color',
            changeFn:           this.setActiveColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.activeTextColor = {
			variable:           '@list-group-active-text-color',
			subscribeProperty:  'active-text-color',
            changeFn:           this.setActiveTextColor.bind(this),
            subscribers:        [],
			_value:             null
		};
        this.linkColor = {
			variable:           '@list-group-link-color',
			subscribeProperty:  'link-color',
            changeFn:           this.setLinkColor.bind(this),
            subscribers:        [],
			_value:             null
		};
        this.linkHeadingColor = {
			variable:           '@list-group-link-heading-color',
			subscribeProperty:  'link-heading-color',
            changeFn:           this.setLinkHeadingColor.bind(this),
            subscribers:        [],
			_value:             null
		};
        this.linkHoverColor = {
			variable:           '@list-group-link-hover-color',
			subscribeProperty:  'link-hover-color',
            changeFn:           this.setLinkHoverColor.bind(this),
            subscribers:        [],
			_value:             null
		};
        this.disabledBg = {
			variable:           '@list-group-disabled-bg',
			subscribeProperty:  'disabled-bg',
            changeFn:           this.setDisabledBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
        this.disabledColor = {
			variable:           '@list-group-disabled-color',
			subscribeProperty:  'disabled-color',
            changeFn:           this.setDisabledColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.disabledTextColor = {
			variable:           '@list-group-disabled-text-color',
			subscribeProperty:  'disabled-text-color',
            changeFn:           this.setDisabledTextColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            bg:                 this.bg,
            border:             this.border,
            hoverBg:            this.hoverBg,
            activeBg:           this.activeBg,
            activeBorder:       this.activeBorder,
            activeColor:        this.activeColor,
            activeTextColor:    this.activeTextColor,
            linkColor:          this.linkColor,
            linkHeadingColor:   this.linkHeadingColor,
            linkHoverColor:     this.linkHoverColor,
            disabledBg:         this.disabledBg,
            disabledColor:      this.disabledColor,
            disabledTextColor:  this.disabledTextColor
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	ListGroup.prototype             = Object.create(ThemeModifier.prototype);
	ListGroup.prototype.constructor = ListGroup;
	
	/**
	 * Gets the Background Color of the ListGroup Component.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getBackgroundColor = function () {
		return this.modifiers.bg.value;
	};
	
	/**
	 * Sets the Background Color of the ListGroup Component.
	 * 
	 * @param {string} backgroundColor The ListGroup Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setBackgroundColor = function (backgroundColor) {
		this.modifiers.bg.value = backgroundColor;
	};
	
	/**
	 * Gets the Border Color of the ListGroup Component.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getBorderColor = function () {
		return this.modifiers.border.value;
	};
	
	/**
	 * Sets the Border Color of the ListGroup Component.
	 * 
	 * @param {string} borderColor The ListGroup the Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setBorderColor = function (borderColor) {
		this.modifiers.border.value = borderColor;
	};
	
	/**
	 * Gets the Border Radius of the ListGroup Component.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getBorderRadius = function () {
		return this.modifiers.borderRadius.value;
	};
	
	/**
	 * Sets the Border Radius of the ListGroup Component.
	 * 
	 * @param {string} borderRadius The ListGroup the Border Radius to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setBorderRadius = function (borderRadius, unit) {
        if (unit !== undefined) { this.modifiers.borderRadius.unit = unit; }

		this.modifiers.borderRadius.value = borderRadius;
	};
	
	/**
	 * Gets the Hover Background Color of the ListGroup Component.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getHoverBackgroundColor = function () {
		return this.modifiers.hoverBg.value;
	};
	
	/**
	 * Sets the Hover Background Color of the ListGroup Component.
	 * 
	 * @param {string} hoverBackgroundColor The ListGroup Hover Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setHoverBackgroundColor = function (hoverBackgroundColor) {
		this.modifiers.hoverBg.value = hoverBackgroundColor;
	};
	
	/**
	 * Gets the Active Background Color of the ListGroup Component.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getActiveBackgoundColor = function () {
		return this.modifiers.activeBg.value;
	};
	
	/**
	 * Sets the Active Background Color of the ListGroup Component.
	 * 
	 * @param {string} activeBackgroundColor The ListGroup Active Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setActiveBackgroundColor = function (activeBackgroundColor) {
		this.modifiers.activeBg.value = activeBackgroundColor;
	};
	
	/**
	 * Gets the Active Border Color of the ListGroup Component.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getActiveBorderColor = function () {
		return this.modifiers.activeBorder.value;
	};
	
	/**
	 * Sets the Active Border Color of the ListGroup Component.
	 * 
	 * @param {string} activeBorderColor The ListGroup Active Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setActiveBorderColor = function (activeBorderColor) {
		this.modifiers.activeBorder.value = activeBorderColor;
	};
	
	/**
	 * Gets the Active Color of the ListGroup Component.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getActiveColor = function () {
		return this.modifiers.activeColor.value;
	};
	
	/**
	 * Sets the Active Color of the ListGroup Component.
	 * 
	 * @param {string} activeColor The ListGroup Active Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setActiveColor = function (activeColor) {
		this.modifiers.activeColor.value = activeColor;
	};
	
	/**
	 * Gets the Active Text Color of the ListGroup Component.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.getActiveTextColor = function () {
		return this.modifiers.activeTextColor.value;
	};
	
	/**
	 * Sets the Active Text Color of the ListGroup Component.
	 * 
	 * @param {string} activeTextColor The ListGroup Active Text Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setActiveTextColor = function (activeTextColor) {
		this.modifiers.activeTextColor.value = activeTextColor;
	};

 	/**
	 * Gets the Link Color of the ListGroup Component.
	 * 
	 * @returns {String}
	 */
	ListGroup.prototype.getLinkColor = function () {
		return this.modifiers.linkColor.value;
	};
	
	/**
	 * Sets the Link Color of the ListGroup Component.
	 * 
	 * @param {string} linkColor The ListGroup Link Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setLinkColor = function (linkColor) {
		this.modifiers.linkColor.value = linkColor;
	};
	
	/**
	 * Gets the Link Heading Color of the ListGroup Component.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getLinkHeadingColor = function () {
		return this.modifiers.linkHeadingColor.value;
	};

	/**
	 * Sets the Link Heading Color of the ListGroup Component.
	 * 
	 * @param {string} linkHeadingColor The ListGroup Link Heading Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setLinkHeadingColor = function (linkHeadingColor) {
		this.modifiers.linkHeadingColor.value = linkHeadingColor;
	};

	/**
	 * Gets the Link Hover Color of the ListGroup Component.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getLinkHoverColor = function () {
		return this.modifiers.linkHoverColor.value;
	};

	/**
	 * Sets the Link Hover Color of the ListGroup Component.
	 * 
	 * @param {string} linkHoverColor The ListGroup Link Hover Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setLinkHoverColor = function (linkHoverColor) {
		this.modifiers.linkHoverColor.value = linkHoverColor;
	};

	/**
	 * Gets the Disabled Background Color of the ListGroup Component.
	 * 
	 * @returns {string}
	 */
	ListGroup.prototype.getDisabledBackgroundColor = function () {
		return this.modifiers.disabledBg.value;
	};
	
	/**
	 * Sets the Disabled Background Color of the ListGroup Component.
	 * 
	 * @param {string} disabledBackgroundColor The ListGroup Disabled Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setDisabledBackgroundColor = function (disabledBackgroundColor) {
		this.modifiers.disabledBg.value = disabledBackgroundColor;
	};

 	/**
	 * Gets the Disabled Color of the ListGroup Component.
	 * 
	 * @returns {String}
	 */
	ListGroup.prototype.getDisabledColor = function () {
		return this.modifiers.disabledColor.value;
	};
	
	/**
	 * Sets the Disabled Color of the ListGroup Component.
	 * 
	 * @param {string} disabledColor The ListGroup Disabled Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setDisabledColor = function (disabledColor) {
		this.modifiers.disabledColor.value = disabledColor;
	};

 	/**
	 * Gets the Disabled Text Color of the ListGroup Component.
	 * 
	 * @returns {String}
	 */
	ListGroup.prototype.getDisabledTextColor = function () {
		return this.modifiers.disabledTextColor.value;
	};

	/**
	 * Sets the Disabled Text Color of the ListGroup Component.
	 * 
	 * @param {string} disabledTextColor The ListGroup Disabled Text Color to set.
	 * 
	 * @returns {undefined}
	 */
	ListGroup.prototype.setDisabledTextColor = function (disabledTextColor) {
		this.modifiers.disabledTextColor.value = disabledTextColor;
	};

	/**
	 * Allows modification of the Navbar Component in Bootstrap.
	 * 
	 * @class Navbar
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
     * @param {string} style The style of Navbar Component to modify.
	 * 
	 * @property {object} bg                The @navbar-{style}-bg variable which controls the Background Color of the Navbar Component.
	 * @property {object} color             The @navbar-{style}-color variable which controls the Color of the Navbar Component.
	 * @property {object} border            The @navbar-{style}-border variable which controls the Border Color of the Navbar Component.
	 * @property {object} linkColor         The @navbar-{style}-link-color variable which controls the Link Color of the Navbar Component.
	 * @property {object} linkHoverColor    The @navbar-{style}-link-hover-color variable which controls the Link Hover Color of the Navbar Component.
	 * @property {object} linkHoverBg       The @navbar-{style}-link-hover-bg variable which controls the Link Hover Background of the Navbar Component.
	 * @property {object} linkActiveColor   The @navbar-{style}-link-active-color variable which controls the Link Active Color of the Navbar Component.
	 * @property {object} linkActiveBg      The @navbar-{style}-link-active-bg variable which controls the Link Active Background of the Navbar Component.
	 * @property {object} linkDisabledColor The @navbar-{style}-link-disabled-color variable which controls the Link Disabled Color of the Navbar Component.
	 * @property {object} linkDisabledBg    The @navbar-{style}-link-disabled-bg variable which controls the Link Disabled Background of the Navbar Component.
	 * @property {object} brandColor        The @navbar-{style}-brand-color variable which controls the Brand Color of the Navbar Component.
	 * @property {object} brandHoverColor   The @navbar-{style}-brand-hover-color variable which controls the Brand Hover Color of the Navbar Component.
	 * @property {object} brandHoverBg      The @navbar-{style}-brand-hover-bg variable which controls the Brand Hover Background of the Navbar Component.
	 * @property {object} toggleHoverBg     The @navbar-{style}-toggle-hover-bg variable which controls the Toggle Hover Background of the Navbar Component.
	 * @property {object} toggleIconBarBg   The @navbar-{style}-toggle-icon-bar-bg variable which controls the Toggle Icon Bar Background of the Navbar Component.
	 * @property {object} toggleBorderColor The @navbar-{style}-toggle-border-color variable which controls the Toggle BorderColor of the Navbar Component.
	 * 
	 * @returns {Navbar}
	 */
	var Navbar = function (editor, style) {
		ThemeModifier.call(this, editor); // Call parent constructor

		var navbarStyle = style === undefined ? 'default' : 'inverse';

        this.subscriberDataAttribute = 'data-cluckles-navbar-' + navbarStyle;

        // Configure the Modifiers
		this.bg = {
			variable:           '@navbar-' + navbarStyle + '-bg',
			subscribeProperty:  'bg',
            changeFn:           this.setBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.color = {
			variable:           '@navbar-' + navbarStyle + '-color',
			subscribeProperty:  'color',
            changeFn:           this.setColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.border = {
			variable:           '@navbar-' + navbarStyle + '-border',
			subscribeProperty:  'border',
            changeFn:           this.setBorderColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.linkColor = {
			variable:           '@navbar-' + navbarStyle + '-link-color',
			subscribeProperty:  'link-color',
            changeFn:           this.setLinkColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.linkHoverColor = {
			variable:           '@navbar-' + navbarStyle + '-link-hover-color',
			subscribeProperty:  'link-hover-color',
            changeFn:           this.setLinkHoverColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.linkHoverBg = {
			variable:           '@navbar-' + navbarStyle + '-link-hover-bg',
			subscribeProperty:  'link-hover-bg',
            changeFn:           this.setLinkHoverBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.linkActiveColor = {
			variable:           '@navbar-' + navbarStyle + '-link-active-color',
			subscribeProperty:  'link-active-color',
            changeFn:           this.setLinkActiveColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.linkActiveBg = {
			variable:           '@navbar-' + navbarStyle + '-link-active-bg',
			subscribeProperty:  'link-active-bg',
            changeFn:           this.setLinkActiveBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.linkDisabledColor = {
			variable:           '@navbar-' + navbarStyle + '-link-disabled-color',
			subscribeProperty:  'link-disabled-color',
            changeFn:           this.setLinkDisabledColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.linkDisabledBg = {
			variable:           '@navbar-' + navbarStyle + '-link-disabled-bg',
			subscribeProperty:  'link-disabled-bg',
            changeFn:           this.setLinkDisabledBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.brandColor = {
			variable:           '@navbar-' + navbarStyle + '-brand-color',
			subscribeProperty:  'brand-color',
            changeFn:           this.setBrandColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.brandHoverColor = {
			variable:           '@navbar-' + navbarStyle + '-brand-hover-color',
			subscribeProperty:  'brand-hover-color',
            changeFn:           this.setBrandHoverColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.brandHoverBg = {
			variable:           '@navbar-' + navbarStyle + '-brand-hover-bg',
			subscribeProperty:  'brand-hover-bg',
            changeFn:           this.setBrandHoverBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.toggleHoverBg = {
			variable:           '@navbar-' + navbarStyle + '-toggle-hover-bg',
			subscribeProperty:  'toggle-hover-bg',
            changeFn:           this.setToggleHoverBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.toggleIconBarBg = {
			variable:           '@navbar-' + navbarStyle + '-toggle-icon-bar-bg',
			subscribeProperty:  'toggle-icon-bar-bg',
            changeFn:           this.setToggleIconBarBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.toggleBorderColor = {
			variable:           '@navbar-' + navbarStyle + '-toggle-border-color',
			subscribeProperty:  'toggle-border-color',
            changeFn:           this.setToggleBorderColor.bind(this),
            subscribers:        [],
			_value:             null
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
            brandHoverBg:       this.brandHoverBg,
            toggleHoverBg:      this.toggleHoverBg,
            toggleIconBarBg:    this.toggleIconBarBg,
            toggleBorderColor:  this.toggleBorderColor
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Navbar.prototype                = Object.create(ThemeModifier.prototype);
	Navbar.prototype.constructor    = Navbar;

	/**
	 * Gets the Background Color of this Navbar instance.
	 * 
	 * @returns {String}
	 */
	Navbar.prototype.getBackgroundColor = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background Color of this Navbar instance.
	 * 
	 * @param {string} backgroundColor The Navbar instance Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setBackgroundColor = function (backgroundColor) {
		this.modifiers.bg.value = backgroundColor;
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
	 * @param {string} color The Navbar instance Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setColor = function (color) {
		this.modifiers.color.value = color;
	};
	
	/**
	 * Gets the Border Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getBorderColor = function () {
		return this.modifiers.border.value;
	};
	
	/**
	 * Sets the Border Color of this Navbar instance.
	 * 
	 * @param {string} borderColor The Navbar instance Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setBorderColor = function (borderColor) {
		this.modifiers.border.value = borderColor;
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
	 * @param {string} linkColor The Navbar instance Link Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkColor = function (linkColor) {
		this.modifiers.linkColor.value = linkColor;
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
	 * @param {string} linkHoverColor The Navbar instance Link Hover Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkHoverColor = function (linkHoverColor) {
		this.modifiers.linkHoverColor.value = linkHoverColor;
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
	 * @param {string} linkHoverBackgroundColor The Navbar instance Link Hover Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkHoverBackgroundColor = function (linkHoverBackgroundColor) {
		this.modifiers.linkHoverBg.value = linkHoverBackgroundColor;
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
	 * @param {string} linkActiveColor The Navbar instance Link Active Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkActiveColor = function (linkActiveColor) {
		this.modifiers.linkActiveColor.value = linkActiveColor;
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
	 * @param {string} linkActiveBackgroundColor The Navbar instance Link Active Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkActiveBackgroundColor = function (linkActiveBackgroundColor) {
		this.modifiers.linkActiveBg.value = linkActiveBackgroundColor;
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
	 * @param {string} linkDisabledColor The Navbar instance Link Disabled Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkDisabledColor = function (linkDisabledColor) {
		this.modifiers.linkDisabledColor.value = linkDisabledColor;
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
	 * @param {string} linkDisabledBackgroundColor The Navbar instance Link Disabled Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setLinkDisabledBackgroundColor = function (linkDisabledBackgroundColor) {
		this.modifiers.linkDisabledBg.value = linkDisabledBackgroundColor;
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
	 * @param {string} brandColor The Navbar instance Brand Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setBrandColor = function (brandColor) {
		this.modifiers.brandColor.value = brandColor;
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
	 * @param {string} brandHoverColor The Navbar instance Brand Hover Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setBrandHoverColor = function (brandHoverColor) {
		this.modifiers.brandHoverColor.value = brandHoverColor;
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
	 * @param {string} brandHoverBackgroundColor The Navbar instance Brand Hover Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setBrandHoverBackgroundColor = function (brandHoverBackgroundColor) {
		this.modifiers.brandHoverBg.value = brandHoverBackgroundColor;
	};

	/**
	 * Gets the Toggle Hover Background Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getToggleHoverBackgroundColor = function () {
		return this.modifiers.toggleHoverBg.value;
	};

	/**
	 * Sets the Toggle Hover Background Color of this Navbar instance.
	 * 
	 * @param {string} toggleHoverBg The Navbar instance Toggle Hover Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setToggleHoverBackgroundColor = function (toggleHoverBg) {
		this.modifiers.toggleHoverBg.value = toggleHoverBg;
	};

	/**
	 * Gets the Toggle Icon Bar Background Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getToggleIconBarBackgroundColor = function () {
		return this.modifiers.toggleIconBarBg.value;
	};
	
	/**
	 * Sets the Toggle Icon Bar Background Color of this Navbar instance.
	 * 
	 * @param {string} toggleIconBarBg The Navbar instance Toggle Icon Bar Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setToggleIconBarBackgroundColor = function (toggleIconBarBg) {
		this.modifiers.toggleIconBarBg.value = toggleIconBarBg;
	};

	/**
	 * Gets the Toggle Border Color of this Navbar instance.
	 * 
	 * @returns {string}
	 */
	Navbar.prototype.getToggleBorderColor = function () {
		return this.modifiers.toggleBorderColor.value;
	};

	/**
	 * Sets the Toggle Border Color of this Navbar instance.
	 * 
	 * @param {string} toggleBorderColor The Navbar instance Toggle Border Color to set.
	 * 
	 * @returns {undefined}
	 */
	Navbar.prototype.setToggleBorderColor = function (toggleBorderColor) {
		this.modifiers.toggleBorderColor.value = toggleBorderColor;
	};

    /**
     * Manages the Exporting of the Theme data, in JSON (modifications only)/Compiled CSS format,
     * aswell as creating the Download Blob's and the Links/Buttons to trigger the download.
     * 
     * @class Export
     * 
     * Export Options:
     * - target:     {string}   Optional General DOM Element target, to append Export links to (Body if undefined).
     * - json: Json Export link options.
     *   - target:   {string}   DOM Element target to append json Export link, (export.target if undefined).
     *   - id:       {string}   ID attribute to set on the json Export link.
     *   - text:     {string}   Text content for the json Export link.
     * - css: Css Export link options.
     *   - target:   {string}   DOM Element target to append css Export link, (export.target if undefined).
     *   - id:       {string}   ID attribute to set on the css Export link.
     *   - text:     {string}   Text content for the css Export link.
     * - save: External JSON save request.
     *   - formats:  {Array}    The formats to include in the export (Default: json).
     *   - target:   {string}   DOM Element target to append save Export link, (export.target if undefined).
     *   - method:   {string}   HTTP method for the save request.
     *   - url:      {string}   (Required) URL to send the modified theme changes (JSON format).
     *   - callback: {Function} Optional success save callback.
     *   - id:       {string}   ID attribute to set on the save Export link.
     *   - text:     {string}   Text content for the save Export link.
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
     * @param {object} options Export options.
     * 
     * @returns {Export}
     */
    var Export = function (editor, options) {        
        this.editor     = editor;
        this.options    = options || {};

        this.jsonLink   = null;
        this.saveLink   = null;
        this.cssLink    = null;

        // If either of the Export formats were provided
        if (this.options.hasOwnProperty('json')) {
            this.jsonLink = this.createExportLink('json', options.json);
        }
        if (this.options.hasOwnProperty('css')) {
            this.cssLink = this.createExportLink('css', options.css);
        }

        // If the Save option was provided
        if (this.options.hasOwnProperty('save')) {
            this.createSaveLink();
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
        var clickCount      = 0,
            downloadBtn     = this.createBsButton(),
            dest            = this.findExportTarget(options), // Find the Append Target
            firstCharUpper  = exportType.slice(0, 1).toUpperCase(),
            camelCaseType   = firstCharUpper + exportType.slice(1);

        downloadBtn.textContent = options.text || 'Download ' + camelCaseType;
        downloadBtn.setAttribute('id', options.id || 'download_' + exportType + '_link');

        // Download attribute allows the button to provided a file to download on click
        // The generateDownloadBlob function provides the file contents
        downloadBtn.setAttribute('download', 'theme.' + exportType);

        // Append the Download button to the document
        docContext.querySelector(dest).appendChild(downloadBtn);

        if (window.parent.hasOwnProperty('ga')) {
            // Send a Google Analytics Click Event specifying this button was clicked
            downloadBtn.addEventListener('click', function () {
                window.parent.ga('send', 'event', 'downloadButtons', 'click', camelCaseType, ++clickCount);
            });
        }

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
     * @param {Array} customCss The Custom CSS to export.
     * @param {Array} customLess The Custom Less to export.
     * 
     * @returns {undefined}
     */
    Export.prototype.generateJsonBlob = function (customCss, customLess) {
        var modifiers = this.editor.modifiers;

        if (!this.jsonLink) { return; }

        // Add the "_extra" JSON,
        // used to export Custom Css and Less
        if (!modifiers.hasOwnProperty('_extra')) {
            modifiers._extra = {};
        }

        // Add the Custom Css/less if any was provided
        if (customCss && customCss.length > 0) {
            modifiers._extra.css =  customCss;
        }

        if (customLess && customLess.length > 0) {
            modifiers._extra.less = customLess;
        }
        
        
        // Update the href of the download link, this now points to the JSON data
        this.jsonLink.setAttribute('href', this.generateBlob(JSON.stringify(modifiers)));
    };

    /**
     * Generates a Download Blob to export the Compiled Theme in Css format (including modifications).
     * 
     * @param {string} css The Compiled Css from Less#postProcess.
     * 
     * @returns {undefined}
     */
    Export.prototype.generateCssBlob = function (css) {
        var customStyleAttribute = 'data-clucklesCustomStyle',
            customCss = "\n";
    
        if (!this.cssLink) { return; }
    
        if (css === undefined) { css = this.editor.processor.postProcessorCss; }

        css = this.editor.processor.removeScopeSelector(css);

        // Find each Custom style tag and process them
        [].slice.call(document.querySelectorAll('*['+ customStyleAttribute +']')).forEach(function (customStyle) {
            // If the Style contains compiled custom Less
            if (customStyle.getAttribute(customStyleAttribute) === 'Less') {
                // Add the :not selector to the CSS, so that the styling generated wont
                // interfere with the styling of the editor "assuming" the CSS
                // exported will be used on the same page as a cluckles editor
                customCss += this.removeScopeSelector(customStyle.innerHTML) + "\n";
            } else {
                // If custom CSS, remove the Scope selector, which was applied to only apply
                // the styling the cluckles section
                customCss += this.removeScopeSelector(customStyle.innerHTML) + "\n";
            }
        }, this.editor.processor);

        // Store the Compiled CSS which will also allow it to be exported on save
        this.compiledCss = css + customCss;

        // Update the href of the download link, this now points to the CSS data
        this.cssLink.setAttribute('href', this.generateBlob(this.compiledCss));
    };

    /**
     * Generates a New Blob and ObjectURL with the given contents.
     * 
     * @param {string} contents The text contents to blobify.
     * 
     * @returns {DOMString}
     */
    Export.prototype.generateBlob = function (contents) {
        var blob = new Blob([contents]); // Create a Blob with the contents

        return window.URL.createObjectURL(blob); // Create an URL with the blob
    };

    /**
     * Sends the Theme Data to the URL provided by the "save" option to ClucklesEditor(options.export).
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
            throw new TypeError('ClucklesEditor.export.sendThemeData: The save url was not provided, or was not a string');
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

    /**
     * Manages the Importing of Theme files (Json) and loading the modifiers into all of
     * the editor components.
     * 
     * @class Import
     * 
     * Import Options:
     * - src: {string} The src path to the Theme file to load and parse.
     * 
	 * @param {ClucklesEditor}  editor instance which manages the less modifications.
     * @param {object}          Import options.
     * 
     * @returns {Import}
     */
    var Import = function (editor, processor, options) {
        this.editor             = editor;
        this.processor          = processor;
        this.options            = options;
        this.themeModifiers     = {};
        this.themeExtra         = {};

        this.metaDataFields = {
            author:     docContext.querySelector('*[data-cluckles-meta="author"]'),
            email:      docContext.querySelector('*[data-cluckles-meta="email"]'),
            url:        docContext.querySelector('*[data-cluckles-meta="url"]'),
            themeName:  docContext.querySelector('*[data-cluckles-meta="themeName"]'),
            version:    docContext.querySelector('*[data-cluckles-meta="version"]'),
            licence:    docContext.querySelector('*[data-cluckles-meta="licence"]')
        };        

        // Import Headers to allow the Custom Less to be able to reference,
        // variables and mixins
        this.customStylesHeader = '@import "/' + editor.lessPath  + 'variables-custom.less";\n@import "/' + editor.lessPath + 'mixins.less";\n';

        // Custom Styles textarea template and Custom styles panel (where the textareas will reside)
        this.customStylesTemplate   = null;
        this.customStylesPanel      = docContext.getElementById('customPanel');

        // Custom Styles
        this.customCss              = [];
        this.customLess             = [];
        this.customStyleInputs      = {
            Css:    [],
            Less:   []
        };

        this.setupMetadata();
        this.setupVariablesOutput();    // Setup the Variables Output, so variables can be displayed/changed directly
        this.setupCustomStyles();       // Setup the ability to handle Custom Css/Less
        this.setupFileImport();         // Setup the File input so themes can be imported

        // Attempt to load and parse the theme file at the theme.src URL
        this.parseThemeFile(this.options);
    };

    /**
     * Parses a theme.json file located at the themeURL, by default uses "GET" as the method.
     * 
     * @returns {undefined}
     */
    Import.prototype.parseThemeFile = function () {
        var themeXHR;

        // If the theme.src option was not provided
        if (!this.options || !this.options.hasOwnProperty('src')) {
            return;
        }
        
        var themeUrl = this.options.src;

        // If an url to the theme.json file was not provided, or was not a string
        if (typeof themeUrl !== 'string') {
            throw new TypeError('ClucklesEditor.parseThemeFile: The theme file options provided is not a string');
        }

        // Create a new XMLHttpRequest to fetch the theme.json file data
        themeXHR = new XMLHttpRequest();
        themeXHR.overrideMimeType('application/json'); // Make sure were expecting JSON data
        themeXHR.open('GET', themeUrl, true);

        // When the File has loaded succesfully
        themeXHR.onreadystatechange = function () {
            if (themeXHR.readyState === 4 && themeXHR.status === 200) {
                // Store the Theme Modifiers
                this.themeModifiers = JSON.parse(themeXHR.responseText);

                // Store the Theme Extra's
                if (this.themeModifiers.hasOwnProperty('_extra')) {
                    this.themeExtra = JSON.parse(JSON.stringify(this.themeModifiers._extra));
                }

                // Dont allow the import to be undo'd
                this.editor.canTrackUndo = false;
                
                // Handle the modifier/custom styles importing
                this.handleThemeImport(this.themeModifiers);

                // Now allow undo's to be tracked
                this.editor.canTrackUndo = true;
            }
        }.bind(this);

        themeXHR.send(null);
    };

    /**
     * Itterates through each editor component, and provided them the parsed modifiers,
     * so they can retrieve the modifiers the component handles.
     * 
     * @param {object} modifiers Parsed JSON (Object Litteral) containing the modifier values for the loaded theme.
     * 
     * @returns {undefined}
     */
    Import.prototype.loadComponentModifiers = function (modifiers) {
        this.editor.components.forEach(function (component) {
            // Some of the "components" may be object literals containing
            // actual "components" which inherit from ThemeModifier
            if (component instanceof ThemeModifier) {
                // Load the modifiers into the component, triggering the
                // two way data binding and updating the data subscribers
                component.loadModifiers(modifiers);
            }
        });
    };

    /**
     * Attempts to find the Theme Metadata fields, and if they exist, bind a change
     * event to them so the Metadata can be changed/set.
     * 
     * @returns {undefined}
     */
    Import.prototype.setupMetadata = function () {        
        Object.keys(this.metaDataFields).forEach(function (fieldName) {
            var metaDataField = this.metaDataFields[fieldName];

            if (metaDataField !== null) {
                metaDataField.addEventListener('change', function (e) {
                    var modifiersMeta;

                    // If the _extra property doesnt exist, create it
                    if (!this.editor.modifiers.hasOwnProperty('_extra')) {
                        this.editor.modifiers._extra = {};
                    }

                    // If the _extra.meta property doesnt exist, create it
                    if (!this.editor.modifiers._extra.hasOwnProperty('meta')) {
                        this.editor.modifiers._extra.meta = {};
                    }

                    // Now store a reference to the meta object
                    modifiersMeta = this.editor.modifiers._extra.meta;

                    // If the field is blank
                    if (e.target.value === '') {
                        // Remove the Field if it exists
                        if (modifiersMeta.hasOwnProperty(fieldName)) {
                            delete modifiersMeta[fieldName];
                        }
                    } else {
                        // Set the Meta with the field value
                        modifiersMeta[fieldName] = e.target.value;
                    }

                    // Update the JSON Blob so the changes Metadata will be exported too!
                    this.editor.export.generateJsonBlob();
                }.bind(this));
            }
        }, this);
    };

    /**
     * Sets up the Variables Ouput change event, so when the variables are changed the modifications will be applied.
     * 
     * @returns {undefined}
     */
    Import.prototype.setupVariablesOutput = function () {
        var variablesOutput = docContext.querySelector('*[data-cluckles="variables"]');

        variablesOutput.addEventListener('change', function (e) {
            var parsedModifiers = this.editor.processor.parseVariables(e.target.value);

            // Disable Refreshing/Applying modifiers
            this.editor.refreshMonitor.disabled = true;

            // Store and Load the modifiers, and refresh Custom Less
            this.editor.modifiers.vars = parsedModifiers;
            this.loadComponentModifiers(parsedModifiers);

            // Allow Refreshing/Applying modifiers
            this.editor.refreshMonitor.disabled = false;

            // Now apply the Custom Styles
            this.editor.refreshCustomStyles(this.editor.modifiers);
        }.bind(this));
    };

    /**
     * Binds the Events to Setup a File import, to import theme modifications from a
     * json file. Will only bind to file inputs, and import json files.
     * 
     * @returns {undefined}
     */
    Import.prototype.setupFileImport = function () {
        var importInput = docContext.querySelector('*[data-cluckles-options="import"]');
        
        // If we can find an <input type="file" />
        if (importInput && importInput.type === 'file') {
            // Bind the change event so we know when a file was selected
            importInput.addEventListener('change', function (e) {
                var file = e.target.files[0],
                    reader = new FileReader();

                // If no file was chosen, dont try to read undefined,
                // or a json file was not selected
                if (!file || (!file.name.match(/\.(less|json)$/i))) {
                    alert('Please Select a JSON or Less file (like one exported from Cluckles)');
                    return;
                }

                // Setup the File reader, so it will import the json file's modifiers
                reader.onload = function (evt) {
                    try {
                        var modifiers = evt.target.result;

                        // Reset to default before importing, so we have a clean import
                        this.editor.resetToDefault();

                        // If the File choosen was a Less file
                        if (file.name.match(/.less/i)) {
                            // Attempt to parse the variables from the file
                            modifiers = this.editor.processor.parseVariables(modifiers);
                        } else {
                            modifiers = JSON.parse(modifiers);
                        }

                        // Handle the modifier/custom styles importing
                        this.handleThemeImport(modifiers);

                        // Reset the file input
                        importInput.value = '';
                    } catch (e) {
                        // Catch invalid JSON errors
                        throw Error('ClucklesEditor.import.setupImport: Could not parse imported File\n' + e.message);
                    }
                }.bind(this);

                // Attempt to read the file's text contents
                reader.readAsText(file);
            }.bind(this), false);
        }
    };

    /**
     * Sets up the HTML template for the Custom Styles textarea and bind's
     * the Add custom styles button.
     * 
     * @returns {undefined}
     */
    Import.prototype.setupCustomStyles = function () {
        var addCustomLessButton = docContext.querySelector('*[data-cluckles="add-custom-less"]'),
            addCustomCssButton  = docContext.querySelector('*[data-cluckles="add-custom-css"]'),
            template            = docContext.createElement('textarea');

        // Setup the Attribute of the text area
        template.setAttribute('rows', 20);
        template.classList.add('form-control');

        template.setAttribute('id', 'clucklesCustomStylesTemplate');

        // Hide it from eyes and screenreaders
        template.classList.add('hidden');
        template.setAttribute('aria-hidden', true);   

        // Append to Custom styles Panel
        this.customStylesTemplate = template;
        this.customStylesPanel.appendChild(template);

        // Setup the Add custom styles buttons
        addCustomLessButton.addEventListener('click', function () {
            this.addCustomStyles(undefined, 'Less');
        }.bind(this), false);

        addCustomCssButton.addEventListener('click', function () {
            this.addCustomStyles(undefined, 'Css');
        }.bind(this), false);
    };

    /**
     * Handles the Creation and Storing of Custom Styles which can be Less or CSS,
     * also binds the Change event so it can change and recompile the Custom Changes.
     * 
     * @param {MouseEvent|String} styles The Custom styling to manage (or mouse event).
     * @param {string} type The type of Custom Style (Less|Css) Case Sensitive.
     * 
     * @returns {StyleElement}
     */
    Import.prototype.addCustomStyles = function (styles, type) {
        var textArea    = this.customStylesTemplate.cloneNode(false),
            customStyle = document.createElement('style'),
            styleInputs = this.customStyleInputs[type],
            // Were either adding/editing Less or Css
            styleArray  = this['custom' + type], // Array which stores styles of this Type
            styleId     = styleArray.length, // Store the index of the style
            styleCollapse = docContext.querySelector('#clucklesCustom' + type + ' .panel-body'),
            // The stylesheet Less outputs when it processes' less browser side
            lessOutputStylesheet = document.getElementById('less:' + this.editor.mainStylesheetHypenated);

        // Store the Textarea in the StyleInput array, so we can avoid DOM Manipulation later
        styleInputs.push(textArea);

        // Set a Data attribute so we can find the style's later
        customStyle.setAttribute('data-clucklesCustomStyle', type);

        // Remove the Template attributes
        textArea.removeAttribute('id');
        textArea.classList.remove('hidden');
        textArea.removeAttribute('aria-hidden');

        if (type === 'Less') {
            // Set the type so Less will compile the extra less
            customStyle.setAttribute('type', 'text/less');
        }

        // If styles are provided (and a string), set the text
        if (styles !== undefined && typeof styles === 'string') {
            // If we are adding/editing less
            if (type === 'Less') {
                // Set the text of the textarea (will be set when importing)
                // Prefix the styles with the less imports if applicable
                styles = this.prefixLessImport(styles);
                textArea.value = styles;
                
                // Append the Header and styling, so it can use vars/mixins
                // Just use styling, it will be prefixed later
                customStyle.innerHTML = this.customStylesHeader.concat(styles);
            } else {
                textArea.value = styles;

                // Append the CSS styling (will be prefixed if the option was set)
                customStyle.innerHTML = this.editor.processor.prefixCustomStyles(styles, type);
            }

            // Store the styling so it can be edited later/exported
            styleArray[styleId] = styles;
        } else {
            styleArray[styleId] = '';
        }

        // Add the Textarea to the Custom Styles Collapse
        styleCollapse.appendChild(textArea);

        // Add the Style tag (which passes the CSS/Less to less) after the main stylesheet in the head
        this.editor.mainStylesheet.parentNode.insertBefore(customStyle, lessOutputStylesheet.nextSibling || this.editor.mainStylesheet.nextSibling);

        // Setup the Change event to update the Style when the textarea changes (and recompile)
        textArea.addEventListener('change', function (e) {
            var editorModifiers         = this.editor.modifiers,
                transformedModifiers    = this.processor.transformToVariables(editorModifiers.vars);

            if (type === 'Less') {
                // Set the Type to 'text/less' so less will recompile it
                customStyle.setAttribute('type', 'text/less');

                // Append the Header and styling, so it can use vars/mixins
                // Just use styling, it will be prefixed later
                customStyle.innerHTML = this.customStylesHeader + transformedModifiers + this.prefixLessImport(e.target.value);
            } else {
                // Append the CSS styling (will be prefixed if the option was set)
                customStyle.innerHTML = this.editor.processor.prefixCustomStyles(e.target.value, type);
            }

            // Update the Stored styling
            styleArray[styleId] = e.target.value;

            // Apply the modifications, and dont use cached styles, this will
            // make sure that it will parse the styling if the type is less
            this.editor.applyModifications(editorModifiers, true);

            if (type === 'Less') {
                // Now that the less should have been compiled, it will be CSS,
                // so we can prefix it now
                customStyle.innerHTML = this.editor.processor.prefixCustomStyles(customStyle.innerHTML, type);

                // Update the CSS blob with the Compiled Custom Less
                this.editor.export.generateCssBlob();
            }
        }.bind(this));

        // Return the CustomStyle, so we can call the prefixCustomStyles method
        // once applyModifcations has been called (will be performed is type is less)
        return customStyle;
    };
    
    /**
     * Prefixes Less import syntax with the path to the Less folder, this allows @import
     * directives to be used in the custom less section, to import less files (such as importing theme.less dynamically).
     * 
     * @param {string} contents The less contents to search in and prefix imports.
     * 
     * @returns {string}
     */
    Import.prototype.prefixLessImport = function (contents) {
        return contents.replace(/(@import ")([\w-]+)(\.less")/gm, "$1/" + this.editor.lessPath + "$2$3");
    };

    /**
     * Resets the Custom style arrays, remove the custom style inputs, and remove
     * the custom style elements from the page header.
     * 
     * @returns {undefined}
     */
    Import.prototype.resetCustomStyles = function () {
        // Reset all the Stored Custom data
        this.customCss              = [];
        this.customLess             = [];
        this.customStyleInputs.Less = [];
        this.customStyleInputs.Css  = [];
        
        // Clear the Custom Css/Less panels
        docContext.querySelector('#clucklesCustomLess .panel-body').innerHTML = '';
        docContext.querySelector('#clucklesCustomCss .panel-body').innerHTML  = '';

        // Remove all Custom `style` elements
        [].slice.call(docContext.querySelectorAll('*[data-clucklesCustomStyle]')).forEach(function (customStyle) {
           customStyle.parentNode.removeChild(customStyle);
        });
    };

    /**
     * Resets the Metadata Fields if they exist.
     * 
     * @returns {undefined}
     */
    Import.prototype.resetMeta = function () {
        Object.keys(this.metaDataFields).forEach(function (fieldName) {
           if (this.metaDataFields[fieldName] !== null) {
               this.metaDataFields[fieldName].value = '';
           } 
        }, this);
    };
    
    /**
     * Stores and loads the Modifiers, then sets up the Custom Styles if
     * any were contained in the themes _extra object.
     * 
     * @param {object} modifiers The modifiers to process.
     * 
     * @returns {undefined}
     */
    Import.prototype.handleThemeImport = function (modifiers) {
        var extra = {};
        
        this.editor.refreshMonitor.disabled = true;
        
        if (modifiers.hasOwnProperty('vars')) {
            this.editor.modifiers = modifiers;
        } else {
            // WARNING: In around 1.2.0 THIS WILL BE DEPRECATED
            // we will be switching to storing modifiers under the
            // vars property

            // Store the Modifiers
            this.editor.modifiers.vars = modifiers;
            
            if (modifiers.hasOwnProperty('_extra')) {
                this.editor.modifiers._extra = JSON.parse(JSON.stringify(modifiers._extra));
            }
        }

        // Now load the modifiers into each component
        this.loadComponentModifiers(this.editor.modifiers.vars);

        this.editor.refreshMonitor.disabled = false;

        // If the JSON has an _extra field
        if (modifiers.hasOwnProperty('_extra')) {
            // Clone the Extra's Object, or after applying the
            // custom less, the custom css disappears
            extra = JSON.parse(JSON.stringify(modifiers._extra));

            this.importThemeExtra(extra);
        }

        this.editor.applyModifications(this.editor.modifiers, true);
    };
    
    /**
     * Handles importing the Theme Extra.
     * 
     * @param {Object} extra The Theme extra object.
     * 
     * @returns {undefined}
     */
    Import.prototype.importThemeExtra = function (extra) {
        var lessStyles = [];
        
        if (extra.hasOwnProperty('meta')) {
            Object.keys(extra.meta).forEach(function (fieldName) {
                if (this.metaDataFields.hasOwnProperty(fieldName)) {
                    if (this.metaDataFields !== null) {
                        this.metaDataFields[fieldName].value = extra.meta[fieldName];
                    }
                }
            }, this);
        }

        // If there is Custom Less
        if (extra.hasOwnProperty('less')) {
            extra.less.forEach(function (lessText) {
                lessStyles.push(this.addCustomStyles(lessText, 'Less'));
            }, this);

            // Apply the less modifications now before it gets prefixed and wont apply correctly
            this.editor.applyModifications(null, true);

            lessStyles.forEach(function (style) {
               // Now the Less should be compiled to CSS, so we can attempt
               // to prefix the CSS
               style.innerHTML = this.processor.prefixCustomStyles(style.innerHTML, 'Less');
            }, this.editor);
        }

        // If there is Custom Css
        if (extra.hasOwnProperty('css')) {
            extra.css.forEach(function (cssText) {
                this.addCustomStyles(cssText, 'Css');
            }, this);
        }
    };

    var SassBridge = function () {
        this.sassLib = require('node-sass');
    };
    
    SassBridge.prototype.apply = function (modifiers) {
        var sassImportStatements = this.getCssFrameworkImports();

        modifiers = this.convertModifiersToRenderFormat(modifiers);

        this.sassLib.render({
            data: modifiers + sassImportStatements,
            includePaths: ['./bower_components/bootstrap-sass/assets/stylesheets/']
        }, function (error, result) {
            var stylesheet = document.createElement('style');
            stylesheet.innerHTML = result.css.toString();
            document.head.appendChild(stylesheet);
        });
    };
    
    SassBridge.prototype.convertModifiersToRenderFormat = function (modifiers) {
        var convertedModifiers = '';

        Object.keys(modifiers).forEach(function (modifierName) {
           convertedModifiers = modifierName + ': ' + modifiers[modifierName] + ';'; 
        });
        
        // Hardcoded to convert between less/sass format while WIP
        convertedModifiers = convertedModifiers.replace('@', '$');
        
        return convertedModifiers;
    };
    
    SassBridge.prototype.getCssFrameworkImports = function () {
        var importStatements = '';
        
        // HARCODED TO WORK WITH SASS VERSION OF BOOTSTRAP WHILE WIP
        var imports =  [
            'variables',
            'mixins',
            'normalize',
            'print',
            'glyphicons',
            'scaffolding',
            'type',
            'code',
            'grid',
            'tables',
            'forms',
            'buttons',
            // Components
            'component-animations',
            'dropdowns',
            'button-groups',
            'input-groups',
            'navs',
            'navbar',
            'breadcrumbs',
            'pagination',
            'pager',
            'labels',
            'badges',
            'jumbotron',
            'thumbnails',
            'alerts',
            'progress-bars',
            'media',
            'list-group',
            'panels',
            'responsive-embed',
            'wells',
            'close',

            // Components w/ JavaScript
            'modals',
            'tooltip',
            'popovers',
            'carousel',

            // Utility classes
            'utilities',
            'responsive-utilities',
        ];

        imports.forEach(function (importName) {
           importStatements += '@import "bootstrap/' + importName + '";';
        });

        return importStatements;
    };

    var LessBridge = function () {
        this.lessLib = window.less;

        // Main Less stylesheet (bootstrap.less)
        this.mainStylesheet             = document.querySelector('link[rel="stylesheet/less"]');
        // The URL path of the href attribute e.g. [0] = assets, [1] = less, [2] = bootstrap.less etc
        this.mainStylesheetPath         = this.mainStylesheet.getAttribute('href').split('/').slice(1);
        this.mainStylesheetHypenated    = this.mainStylesheetPath.slice(0 , -1)
                .concat(
                    this.mainStylesheetPath[this.mainStylesheetPath.length - 1] // Get bootstrap.less etc
                    .slice(0, -5) // Now remove the ".less"
                ).join('-');
                // Join with - to give us "assets-less-bootstrap" for example, which is part of the ID which less
                // assigned to the Stylesheet it outputs after processing client side

        // The path to the less folder e.g. assets/less/
        this.lessPath                   = this.mainStylesheetPath.slice(0, -1).join('/') + '/';
    };

    LessBridge.prototype.apply = function (modifiers, reload) {
        if (reload !== undefined) {
            this.lessLib.refresh(reload, modifiers);
        } else {
            this.lessLib.refresh(false, modifiers);
        }
    };


import SassBridge from './preprocessorbridge.sassbridge';
import LessBridge from './preprocessorbridge.lessbridge';

import { Processor } from './processor';
import { Export } from './export';
import { Import } from './import';

/**
* ClucklesEditor class holds the modifications to the less theme using sub classes
* which hold information about the modifications, for each different part of the theme.
* Such as branding, base colors, navbar, etc etc. These modifications can then be
* retrieved or applied to the current page.
*
* @class ClucklesEditor
*
* Generic Options:
* - scope:         {string} The CSS Selector to prefix the Compiled CSS selectors with.
* - delay:         {Number} Milliseconds delay between refresh updates (Default: 750).
* - undoSize:      {Number} Number of items to keep in the Undo history (Default: 10)
* - embedSelector: {string} Will set this element to the height of the editor, if editor is in an embedded object.
*
* @param {Object} less The Global less object.
*
* @property {Export} export Manages the Theme exporting.
* @property {Typography} typography Holds modifications to the Typography component.
* @property {Misc} misc Holds miscellaneous modifications to Bootstrap.
* @property {Table} table Holds modifications to the Table component.
* @property {Breadcrumb} breadcrumb Holds modifications to the Breadcrumb component.
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
* @property {Nav} navs Holds the modifications to the Nav Components.
* @property {Tab} tab Holds the modifications to the Tab Components.
* @property {Pill} pill Holds the modifications to the Pill Components.
* @property {Pagination} pagination Holds the modifications to the Pagination Components.
* @property {Pager} pager Holds the modifications to the Pager Components.
* @property {Form} form Holds the modifications to the Form Components.
* @property {BrandModifier} branding Holds the changes to the Branding colors of the Theme.
* @property {Label} label Holds the changes to the Label Components.
* @property {PanelBase} panelBase Holds the changes to the General Panel styling of Panel Components.
* @property {NavbarBase} navbarBase Holds the changes to the General Navbar styling of Navbar Components.
* @property {ButtonBase} buttonBase Holds the changes to the General Button styling of Button Components.
* @property {Object} navbar Holds Navbar instances which control the styling of Navbar Components.
* @property {Object} buttons Holds Button instances which control the styling of Button Components.
* @property {Object} formStates Holds FormState instances which control the styling of various components, (Alerts/Panels).
* @property {ListGroup} listGroup Holds the changes to the ListGroup component.
* @property {object} modifiers Holds all of the Modifications to the whole theme.
*
* @returns {ClucklesEditor}
*/
class ClucklesEditor {
  constructor(options) {
    this.options = options;
    this.sassBridge = new SassBridge();
    this.lessBridge = new LessBridge();

    this.preProcessorBridges = {
      'sass': this.sassBridge,
      'less': this.lessBridge
    };

    this.activePreProcessorBridgeName = 'sass';

  /**
   * Monitors the refreshing of the less files, enables it to be blocked for x duration between refreshes. To avoid crashing the brower :).
   *
   * @property disabled   {Boolean} If disabled set to true, not refreshing, delaying, and applying modifications will be disabled.
   * @property canRefresh {Boolean} Tracks whether or not another refresh can be performed. (true = can refresh, false = cant refresh).
   * @property canDelay   {Boolean} Tracks whether or not a refresh can be Delayed (and added to the Queue). (true = can delay, false = cant delay).
   *
   * @property delay {Number} Milliseconds delay between refresh updates (Default: 750).
   */
  this.refreshMonitor     = {
      disabled:   false,
      canRefresh: true,
      canDelay:   true,
      delay:      options.delay || 750
  };

  // this.misc               = new Misc(this);
  // Component vars
  // this.typography         = new Typography(this);
  // this.table              = new Table(this);
  // this.breadcrumb         = new Breadcrumb(this);
  // this.dropdown           = new Dropdown(this);
  // this.tooltip            = new Tooltip(this);
  // this.popover            = new Popover(this);
  // this.thumbnail          = new Thumbnail(this);
  // this.badge              = new Badge(this);
  // this.carousel           = new Carousel(this);
  // this.code               = new Code(this);
  // this.blockquote         = new Blockquote(this);
  // this.modal              = new Modal(this);
  // this.jumbotron          = new Jumbotron(this);
  // this.grayScale          = new GrayScale(this);
  // this.nav                = new Nav(this);
  // this.tab                = new Tab(this);
  // this.pill               = new Pill(this);
  // this.pagination         = new Pagination(this);
  // this.pager              = new Pager(this);
  // this.form               = new Form(this);
  this.branding           = new BrandModifier(this);
  // this.label              = new Label(this);
  // this.panelBase          = new PanelBase(this);
  // this.navbarBase         = new NavbarBase(this);
  // this.buttonBase         = new ButtonBase(this);
  // this.navbar = {
  //     'default':            new Navbar(this),
  //     'inverse':            new Navbar(this, 'inverse')
  // };
  // this.buttons = {
  //     'default':            new Button(this, 'default'),
  //     'primary':            new Button(this, 'primary'),
  //     'success':            new Button(this, 'success'),
  //     'info':               new Button(this, 'info'),
  //     'warning':            new Button(this, 'warning'),
  //     'danger':             new Button(this, 'danger')
  // };
  // this.formStates = {
  //     'default':            new FormState(this, 'default'),
  //     'primary':            new FormState(this, 'primary'),
  //     'success':            new FormState(this, 'success'),
  //     'info':               new FormState(this, 'info'),
  //     'warning':            new FormState(this, 'warning'),
  //     'danger':             new FormState(this, 'danger')
  // };
  // this.listGroup          = new ListGroup(this);

  this.components = [
      // this.misc,
      // this.typography,
      // this.table,
      // this.breadcrumb,
      // this.dropdown,
      // this.tooltip,
      // this.popover,
      // this.thumbnail,
      // this.badge,
      // this.carousel,
      // this.code,
      // this.blockquote,
      // this.modal,
      // this.jumbotron,
      // this.grayScale,
      // this.nav,
      // this.tab,
      // this.pill,
      // this.pagination,
      // this.pager,
      // this.form,
      this.branding,
      // this.label,
      // this.panelBase,
      // this.navbarBase,
      // this.buttonBase,
      // this.navbar.default,
      // this.navbar.inverse,
      // this.buttons.default,
      // this.buttons.primary,
      // this.buttons.success,
      // this.buttons.info,
      // this.buttons.warning,
      // this.buttons.danger,
      // this.formStates.default,
      // this.formStates.primary,
      // this.formStates.success,
      // this.formStates.info,
      // this.formStates.warning,
      // this.formStates.danger,
      // this.listGroup
  ];

  window.addEventListener('ClucklesFrameworkModuleLoaded', function (e) {
      console.log('hrere');
      e.stopPropagation();

      this.components.concat(e.detail.module.components);
      console.log(this.components);
  }, false);

  // All modifier vars
  this.modifiers      = {};

  // Undo/Redo stacks
//        this.undoButton     = docContext.querySelector('*[data-cluckles-options="undo"]');
//        this.redoButton     = docContext.querySelector('*[data-cluckles-options="redo"]');
  this.undoStack      = [];
  this.redoStack      = [];
  this.canTrackUndo   = true;

  this.processor      = new Processor(this, options);

  // Import/Export Management
  this.export         = new Export(this, options.export);
  this.import         = new Import(this, this.processor, options.theme);

  // Configure the Options toolbar
  this.setupToolbar();
  this.setupLocationHashes();

  // Disable the Undo and Redo buttons by default (will re enable when something is changed)
//        if (this.undoButton) {
//            this.undoButton.setAttribute('disabled', 'disabled');
//        }

//        if (this.redoButton) {
//            this.redoButton.setAttribute('disabled', 'disabled');
//        }

//        this.setupEmbed();
  }

/**
* Gets the Currently Active PreProcessor Bridge which can be used to compile the modifiers
* into a theme.
*
* Throws an Exception if the active preprocessor bridge name, is not a configured bridge.
*
* @return object The currently active PreProcessor Bridge.
*/
getActivePreProcessorBridge() {
  if (this.preProcessorBridges.hasOwnProperty(this.activePreProcessorBridgeName)) {
      return this.preProcessorBridges[this.activePreProcessorBridgeName];
  } else {
      throw new Exception('Cluckles could not get non configured PreProcessorBridge "' + this.activePreProcessorBridgeName  + '"');
  }
};

/**
* Refreshes all the Custom styles by triggering change event against each one.
*
* @returns {undefined}
*/
refreshCustomStyles(modifiers) {
  this.applyModifications(modifiers, true);

  var styleInputs = this.import.customStyleInputs.Less;

  styleInputs.forEach((styleInput) => {
    styleInput.dispatchEvent(new Event('change'));
  });
};

/**
* Get the Modifications which have been stored.
*
* @returns {Object}
*/
getModifiers() {
  var grayScale   = this.grayScale,
      navbar      = this.navbar,
      buttons     = this.buttons,
      formStates  = this.formStates,
      modifiers   = this.modifiers;

  // Make sure we always have the vars property as a minimum
  if (!modifiers.hasOwnProperty('vars')) {
      modifiers.vars = {};
  }

  // Gray Base
  Object.keys(grayScale).forEach(function (style) {
      if (grayScale[style].color !== null) {
          if (style === 'gray') {
              modifiers.vars['@gray'] = grayScale[style].color;
          } else {
              modifiers.vars['@gray-' + style] = grayScale[style].color;
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

  // Nav
  this.extractModifications(modifiers, this.nav);

  // Tab
  this.extractModifications(modifiers, this.tab);

  // Pill
  this.extractModifications(modifiers, this.pill);

  // Pagination
  this.extractModifications(modifiers, this.pagination);

  // Pager
  this.extractModifications(modifiers, this.pager);

  // Form
  this.extractModifications(modifiers, this.form);

  // Branding
  this.extractModifications(modifiers, this.branding);

  // Label
  this.extractModifications(modifiers, this.label);

  // Breadcrumb
  this.extractModifications(modifiers, this.breadcrumb);

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
* ThemeModifier.prototype.getModifications() and adds them to ClucklesEditor.modifications.
*
* @param {Object} modifiers All of the modifications to the theme.
* @param {Obejct} modifiersType The object which holds the modifications for a particular style/components.
*
* @returns {undefined}
*/
extractModifications(modifiers, modifiersType) {
  var modifiersOfType = modifiersType.getModifications();

  Object.keys(modifiersOfType).forEach(function (modifier) {
      var modifierObject = modifiersOfType[modifier];

      modifiers.vars[modifierObject.variable] = modifierObject.value;
  });
};

/**
* Turns the Modifications to the Theme into JSON.
*
* @returns {String}
*/
getJSON () {
  return JSON.stringify(this.getModifiers());
};

/**
* Applies the modification, or makes the refreshMonitor queue a single update
* in x milliseconds from now, controlled by this.refreshMonitor.delay.
*
* @returns {undefined}
*/
queueModifications() {
  if (this.refreshMonitor.disabled) { return; }

  var customStylesPresent = this.import.customLess.length > 0;

  // If an update is allowed right now, apply the modifications,
  // and refresh the custom styles, which allows the custom styles to update vars
  if (this.refreshMonitor.canRefresh === true) {
      if (customStylesPresent) {
          this.refreshCustomStyles();
      } else {
          this.applyModifications();
      }

      // Set the state to not ready for more updates yet
      this.refreshMonitor.canRefresh = false;

      if (this.refreshMonitor.canDelay === true) {
          // Set a timeout to allow updates again after x time (refreshMonitor.rate)
          // and apply the modifications that were pending (also refreshes custom styles)
          setTimeout(() => {
              if (customStylesPresent) {
                  this.refreshCustomStyles();
              } else {
                  this.applyModifications();
              }

              // Allow updates again
              this.refreshMonitor.canRefresh = true;
          }, this.refreshMonitor.delay);
      }
  }
};

/**
* Applies the Modifications to the Less Theme.
*
* @returns {undefined}
*/
applyModifications (modifications, reload) {
  if (this.refreshMonitor.disabled) { return; }

  var preProcessorBridge = this.getActivePreProcessorBridge();
  // Allow the function to accept custom modifications
  var modifiers = modifications || this.getModifiers();

  // Set the Variables in the Output
  this.setVariablesOutput(modifiers.vars);

  // Find the Calculated modifier values, will replace @variables with
  // their parent values, and perform any calculations to consolidate,
  // to single values e.g. floor((@grid-gutter-width / 2)) -> floor(15px)
  modifiers = this.processor.calculateModifierValues(modifiers.vars);

  preProcessorBridge.apply(modifiers, reload);
};

/**
* Sets the Variables which are displayed in the Variables Output field to the modifiers passed in.
*
* @param {object} modifiers The modifiers to display in the Variables Output field.
*
* @returns {undefined}
*/
setVariablesOutput(modifiers) {
  // Update the Variables output to display the variables being applied
  docContext.querySelector('*[data-cluckles="variables"]').innerHTML = this.processor.transformToVariables(modifiers);
};

/**
* Stores the Most up to date set of Modifiers in the Undo Stack.
*
* @returns {undefined}
*/
pushUndoStack() {
  // If we cant track the state, such as when undo/redoing
  if (this.canTrackUndo === false) { return; }

  var undo                = this.undoStack,
      clonedModifiers     = {},
      originalModifiers   = this.modifiers;

  // We have performed a new action, so we invalidate the ability to redo previous
  // undo's, so reset the redo stack
  this.redoStack = [];

  // If the Stack has 10 or more items
  if (undo.length > (this.options.undoSize - 1 || 9)) {
      // Remove the first item (oldest) from stack
      undo.shift();
  }

  // Now clone the existing modifiers (this.modifiers)
  clonedModifiers = Object.keys(this.modifiers).reduce(function (clone, variable) {
      clone[variable] = originalModifiers[variable];
      return clone;
  }, clonedModifiers);

  // Now push the clone (newest item) to the Stack (undoStack)
  undo.push(clonedModifiers);

  if (this.undoButton && this.undoButton.hasAttribute('disabled')) {
      this.undoButton.removeAttribute('disabled');
  }
};

/**
* Updates the Cluckles modifiers with the newest item from either
* the undo or redo stacks, depending on direction.
*
* @param {string} direction The direction to pull modifiers from (undo/redo(
*
* @returns {undefined}
*/
applyModificationRevision(direction) {
  var stack           = direction === 'undo' ? this.undoStack     : this.redoStack,
      stackButton     = direction === 'undo' ? this.undoButton    : this.redoButton,
      altStack        = direction === 'undo' ? this.redoStack     : this.undoStack,
      altStackButton  = direction === 'undo' ? this.redoButton    : this.undoButton,
      poppedStack;

  // Disable the Undo button if there is nothing to undo
  if (stackButton && stack.length <= 1) {
      stackButton.setAttribute('disabled', 'disabled');
  }

  // If the undo/redo stacks are empty, dont continue
  if (stack.length === 0) {
      return;
  }

  // Disallow modifications to be tracked/applied automatically
  this.canTrackUndo               = false;
  this.refreshMonitor.disabled    = true;

  // Reset the Modifiers and Components
  this.modifiers = {};
  this.resetComponents();

  // Pop the newest item of the top of the stacj
  poppedStack = stack.pop();

  // If we are undoing, we want to load the second to last item in the stack (last item already popped)
  if (direction === 'undo') {
      this.import.loadComponentModifiers(stack[stack.length - 1]);
  } else {
      // If we are redoing, we want to load the item we popped
      this.import.loadComponentModifiers(poppedStack);
  }

  // Move the newest items from one stack to the other
  altStack.push(poppedStack);

  // Allow modifications to be tracked/applied automatically
  this.canTrackUndo               = true;
  this.refreshMonitor.disabled    = false;

  // Now apply the modifications to update the UI (will also set modifiers again)
  this.applyModifications();

  // Now enable the altStackButton, effectively toggling the Undo/Redo buttons,
  // depending on which one has items in their stack
  if (altStackButton && altStackButton.hasAttribute('disabled')) {
      altStackButton.removeAttribute('disabled');
  }
};

/**
* Undo's modifications which have been applied and moved the newest modifications
* to the redoStack.
*
* @returns {undefined}
*/
undo() {
  this.applyModificationRevision('undo');
};

/**
* Redo modifications that were pushed into the redoStack after applying an undo.
*
* @returns {undefined}
*/
redo() {
  this.applyModificationRevision('redo');
};

/**
* Resets the current Theme to the Bootstrap default (or whatever .less file the browser
* has loaded e.g. <link type="text/css" href="../less/bootstrap.less" rel="stylesheet/less" />)
* including any modifications which have been stored, and resets the editor inputs.
*
* @returns {undefined}
*/
resetToDefault() {
  // Remove all stored modifications
  this.modifiers = {};
  this.undoStack = [];
  this.redoStack = [];

  // Disable the Undo and Redo buttons when resetting to Default
  if (this.undoButton && !this.undoButton.hasAttribute('disabled')) {
      this.undoButton.setAttribute('disabled', 'disabled');
  }

  if (this.redoButton && !this.redoButton.hasAttribute('disabled')) {
      this.redoButton.setAttribute('disabled', 'disabled');
  }

  // Reset the Custom Styles and Theme Metadata
  this.import.resetCustomStyles();
  this.import.resetMeta();

  // Reset all the Components
  this.resetComponents();

  // Now make less modify blank changes, resetting the Theme
  this.applyModifications(null, true);
};

/**
* Resets the Modifiers loaded into Cluckles and loads the modifiers passed
* in.
*
* @param {object} modifiers The modifiers to load.
*
* @returns {undefined}
*/
resetFromModifiers(modifiers) {
  // Copy the current undoStack
  var currentUndoStack = this.undoStack.slice(0);

  // Reset to the Defaults, so we dont get weird hangover between the theme
  // and new modifications
  this.resetToDefault();

  // Disallow modifications to be tracked/applied automatically
  this.canTrackUndo    = false;

  // Now import the theme modifiers (from the theme.json file { theme: 'theme.json' })
  // It will automatically apply this
  this.import.handleThemeImport(modifiers);

  // Restore the undoStack (resetToDefault clears the stacks)
  this.undoStack = currentUndoStack;
  // Push the modifiers from the Theme onto the undo stack
  this.pushUndoStack();

  // Allow modifications to be tracked/applied automatically
  this.canTrackUndo = true;
};

/**
* Resets the current Theme to the Theme which was imported by providing the
* theme.src option (including resetting the components/subscribers).
*
* @returns {undefined}
*/
resetToTheme() {
  this.resetFromModifiers(this.import.themeModifiers);
};

/**
* Reset all of the Components and their Subscribers.
*
* @returns {undefined}
*/
resetComponents() {
  // Disable modification queuing
  this.refreshMonitor.canRefresh = false;

  this.components.forEach((component) => {
      if (component instanceof ThemeModifier) {
          component.resetModifiers();
      }
  });

  // Allow modification queuing
  this.refreshMonitor.canRefresh = true;
};

/**
* Sets up the Location Hashes so that clicking on buttons/links will jump the page content
* to that location on the page.
*
* @returns {undefined}
*/
setupLocationHashes() {
  var locationHashedElements = [].slice.call(docContext.querySelectorAll('*[data-cluckles-location]'));

  locationHashedElements.forEach(function (toHash) {
      toHash.addEventListener('click', function () {
          window.location.hash = null; // Clear the existing hash
          window.location.hash = this.dataset.clucklesLocation; // Now jump to the location defined by the data attribute
      });
  });
};

setupToolbar() {
  var resetButton         = docContext.querySelector('*[data-cluckles-options="reset"]'),
      resetThemeButton    = docContext.querySelector('*[data-cluckles-options="reset-theme"]');

  if (resetButton) {
      resetButton.addEventListener('click', this.resetToDefault.bind(this), false);
  }

  if (resetThemeButton) {
      resetThemeButton.addEventListener('click', this.resetToTheme.bind(this), false);
  }

  if (this.undoButton) {
      this.undoButton.addEventListener('click', this.undo.bind(this), false);
  }

  if (this.redoButton) {
      this.redoButton.addEventListener('click', this.redo.bind(this), false);
  }
};

/**
* Sets up the window onresize event if the `embedSelector` option was provided
* and this cluckles instance is inside of an embedded object.
*
* @returns {undefined}
*/
setupEmbed() {
  // If we have provided an embedSelector, we are assuming that the ClucklesEditor is
  // inside an embeded object, so we need the parent element to be set the same height
  // as the BODY of the embedded document
  // if not in context of an emded, window.parent will be the same as window
  if (this.options && this.options.hasOwnProperty('embedSelector') && window.parent !== window) {
      window.onresize = function () {
          // Window.parent = parent window which contains the embedded document
          // then get the Document (parent document) and find our embeded object
          // Then style the parent node (which ur emdeded object is a direct descendant)
          docContext.querySelector(this.options.embedSelector).parentNode.style.height = window.document.body.clientHeight + 'px';
      }.bind(this);

      // Set timeout hack to make it fire once everything is loaded
      // so we dont get the iframe being slighly too short
      setTimeout(function () {
          // Fire event after setup, to initially set the height
          window.dispatchEvent(new Event('resize'));
      }, 0);

      // Also add a ready event for the current DOM, so that we make sure once everything is loaded
      // we are setting the correct height
      docContext.addEventListener('DOMContentLoaded', function () {
          window.dispatchEvent(new Event('resize'));
      });
  }
};
}

export Default ClucklesEditor;

})(window);