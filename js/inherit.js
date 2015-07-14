(function(scope) {
    
    function superCall() {
        var method = this.superCall.caller;
        // constructor
        if (method.$superClass) {
            return method.$superClass.apply(this, arguments);
        }
        // super method
        if (method.$class) {
            method = method.$class.$superClass.prototype[method.$name];
            return method.apply(this, arguments);
        }
        // TODO error?
        return null;
    }

    function inheritClass(superClass, overrides) {
        // clone superclass prototype!        
        var newClass, classBody = Object.create(superClass.prototype);
        // resolve constructor
        if (overrides.hasOwnProperty('constructor')) {
            newClass = overrides.constructor;
        } else {
            newClass = (function() {
                superClass.apply(this, arguments);
            });
        }
        // override properties and methods.
        for (var name in overrides) {
            if (overrides.hasOwnProperty(name)) {
                var value = overrides[name];
                // for method, add info for superCall!
                if (typeof(value) === 'function') {
                    value.$name = name;
                    value.$class = newClass;
                }
                classBody[name] = value;
            }
        }
        // enable superCall chainfor methods and constructor!
        classBody.superCall = superCall;
        // Helper to extend class
        newClass.extends = function(classBody) {
            return inheritClass(newClass, classBody);
        };
        // Reference to superclass, used in superCall
        newClass.$superClass = superClass;
        // reference inherited class body!
        newClass.prototype = classBody;
        // return created class.
        return newClass;
    }

    function createClass(superClass, classBody) {
        if (arguments.length <= 1) {
            classBody = superClass || {};
            superClass = Object;
        }
        return inheritClass(superClass, classBody);
    }

    // export function as $class!
    scope['$class'] = createClass;

})(window);
