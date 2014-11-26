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
        this.editor     = editor;
        this.options    = options;

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
                    // Allow AlphaNumeric, - > : . \s characters to match (once or more times)
                    "[\\w->:.\\s]+" + 
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

        // Provide less with the postProcessor callback we want to execute
        this.editor.lessGlobal.postProcessor = function (css) {
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
            }
        });
        
        return modifiers;
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