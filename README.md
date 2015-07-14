# inherit.js

Simple JavaScript API, to emulate "Class" inheritance.

Usage
-------------

* Create simple class.
```js
$class({ ... });
```

* Create inherited class.
```js
var CustomClass = BaseClass.extends({ ... });
```

* Override constructor, calling superclass constructor.
```js
var CustomClass = BaseClass.extends({
	constructor: function(){
		this.superCall();
	}
});
```

* Override method, calling superclass method.
```js
var CustomClass = BaseClass.extends({
	someMethod: function(){
		return this.superCall();
	}
});
```
