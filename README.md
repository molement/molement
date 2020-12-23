# molement.github.io
javascript web form element

## files

[JQuery CDN...](https://code.jquery.com/)
```
./core/resources/styles/molement.css
./core/resources/scripts/molement.js
```

## code sample

### Simple Text Box / Input type text:
```
var $element = MOLEMENT.SET_FLIP.ELEMENT.INPUT_TEXT.createElement('label');      // create element
var $element = MOLEMENT.SET_FLIP.ELEMENT.INPUT_TEXT.createElement('label', 'default value');     // create element with default value

$element.val('value for set');     // set value
$element.val('');     // reset/clear value
$element.val();     // get value; return current value
```

### Password Text Box / Input type Password:
```
var $element = MOLEMENT.SET_FLIP.ELEMENT.INPUT_PASSWORD.createElement('label');    // create element
var $element = MOLEMENT.SET_FLIP.ELEMENT.INPUT_PASSWORD.createElement('label', 'default value');    // create element with default value

$element.val('value for set');     // set value
$element.val('');     // reset/clear value
$element.val();     // get value; return current value
```

### Single Select:
```
var $element = MOLEMENT.SET_FLIP.ELEMENT.SINGLE_SELECT.createElement('label', [{ value: value1, label: 'item1' }, { value: value2, label: 'item2' }, ...]);    // create element
var $element = MOLEMENT.SET_FLIP.ELEMENT.SINGLE_SELECT.createElement('label', [{ value: value1, label: 'item1' }, { value: value2, label: 'item2' }, ...], value2);    // create element with default selected item

$element.val(valueToSet);     // set selected item/value; value must be provided in the initial arrays
$element.val(null);     // reset/deselect/clear value
$element.val();     // get value; return current selected value
```

### Multi Select:
```
var $element = MOLEMENT.SET_FLIP.ELEMENT.MULTI_SELECT.createElement('label', [{ value: value1, label: 'item1' }, { value: value2, label: 'item2' }, ...]);    // create element
var $element = MOLEMENT.SET_FLIP.ELEMENT.MULTI_SELECT.createElement('label', [{ value: value1, label: 'item1' }, { value: value2, label: 'item2' }, ...], value2);    // create element with default selected item
var $element = MOLEMENT.SET_FLIP.ELEMENT.MULTI_SELECT.createElement('label', [{ value: value1, label: 'item1' }, { value: value2, label: 'item2' }, ...], [value1, value2]);    // create element with default multiple selected items

$element.val(valueToSet);     // set selected item/value; value must be provided in the initial arrays
$element.val(['first value to set', 'second value to set']);     // set selected items/values; values must be provided in the initial arrays
$element.val(null);     // reset/deselect/clear all values, also can be called by empty array list -> $element.val([]);
$element.val();     // get value; return current selected values as Array
```

### Radio Button / Toggle Button:
```
var $element = MOLEMENT.SET_FLIP.ELEMENT.RADIO.createElement('label', [{ value: value1, label: 'label1' }, { value: value2, label: 'label2' }]);    // create element
var $element = MOLEMENT.SET_FLIP.ELEMENT.RADIO.createElement('label', [{ value: value1, label: 'label1' }, { value: value2, label: 'label2' }], value2);    // create element with default toggle state

$element.val(valueToSet);     // set selected value; value must be provided in the initial toggle state
$element.val(null);     // reset/deselect/clear value
$element.val();     // get value; return current selected value
```
