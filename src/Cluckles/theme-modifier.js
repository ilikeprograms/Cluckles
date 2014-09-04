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
     * Configured the Two Way Databinding for the modifiers, which includes
     * binding multiple DOM Element subscribers which have the "data-cluckles-{{type}}" attribute,
     * which makes them update when the modifiers change, and changing the modifiers when the DOM
     * Element's values change.
     * 
     * Example of Two Way Databinding:
     * 
     * themeEditor.jumbotron.setBackgroundColor('#000000'); // Will Update the modifier and all Subscribers
     * <input type="color" data-cluckles-jumbotron="bg" /> // Will Update the modifier and all Subscribers
     * 
     * @returns {undefined}
     */
    ThemeModifier.prototype.setupDataBinding = function () {
        var themeEditor = this.editor, // ThemeEditor instance
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
                        // Store the new value
                        this._value = val;
                        
                        // Queue the modifications to be applied by less
                        themeEditor.queueModifications();

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
                        modifier.changeFn(e.target.value);
                    }, false);
                }
            }, this);
        }, this);
    };