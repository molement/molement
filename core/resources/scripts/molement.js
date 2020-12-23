(function ($) {
    let originalVal = $.fn.val;
    $.fn.val = function (value) {
        if (arguments.length >= 1) {
            // setter invoked
            return $(this).hasClass('x-molement')
                ? $(this).triggerHandler('val', [value])
                : originalVal.call(this, value);
        } else {
            // getter invoked
            return $(this).hasClass('x-molement')
                ? $(this).triggerHandler('val')
                : originalVal.call(this);
        }
    };
})(jQuery);


$(window).on('scroll resize', function () {
    $('.x-molement-droplist.x-molement-expanded').each(function () {
        $('#' + $(this).prop('data-molement-trigger')).trigger('deactivate').find('input').trigger('blur');
    });
}).on('click', function (event) {
    let clickedElem = event.target;
    $('.x-molement-droplist.x-molement-expanded').each(function () {
        if ($(clickedElem).closest('.x-molement-droplist').attr('id') !== $(this).attr('id') && $(this).prop('data-molement-trigger') !== $(clickedElem).closest('.x-molement.x-molement-active').attr('id')) {
            // deactivate the drop list on body click
            $('#' + $(this).prop('data-molement-trigger')).trigger('deactivate');
        }
    });
});

const MOLEMENT = {
    SET_FLIP: {
        ELEMENT: {
            // TEXT
            INPUT_TEXT: {
                typeName: 'INPUT_TEXT',
                setName: 'FLIP',
                createElement: function (label, defaultValue) {
                    let ELEMENT = MOLEMENT.SET_FLIP.ELEMENT.INPUT_TEXT;
                    let PRIMARY_ID = MOLEMENT.ID_PREFIX + Date.now().toString();
                    let HAS_DEFAULT_VALUE = MOLEMENT.isString(defaultValue) && !MOLEMENT.stringIsEmpty(defaultValue);
                    let INPUT_ID = PRIMARY_ID + '_' + ELEMENT.typeName;

                    // creation
                    let $rootElement = $('<div />').attr('id', PRIMARY_ID).addClass(MOLEMENT.ROOT_ELEMENT_CLASS).attr('data-typename', ELEMENT.typeName).attr('data-setname', ELEMENT.setName)
                        .toggleClass('x-molement-hasvalue', HAS_DEFAULT_VALUE)
                        .append(
                            $('<span />').attr('id', PRIMARY_ID + '_' + ELEMENT.typeName + '_BASE').addClass('x-molement-base'),
                            $('<input type="text" />').attr('id', INPUT_ID).attr('data-moType', ELEMENT.typeName)
                                .val(HAS_DEFAULT_VALUE ? defaultValue : '').on('change keydown', function () {
                                    setTimeout(function ($input) { $input.closest('.' + MOLEMENT.ROOT_ELEMENT_CLASS).toggleClass('x-molement-hasvalue', !MOLEMENT.stringIsEmpty($input.val())); }, 50, $(this));
                                }),
                            $('<label />').attr('id', PRIMARY_ID + '_' + ELEMENT.typeName + '_LABEL').addClass('x-molement-label').attr('for', PRIMARY_ID + '_' + ELEMENT.typeName).text(label),
                            $('<label />').attr('id', PRIMARY_ID + '_' + ELEMENT.typeName + '_LABEL_SHADOW').addClass('x-molement-label-shadow').attr('for', PRIMARY_ID + '_' + ELEMENT.typeName).text(label)
                    )
                    // trigger
                    .on('focusin', function () {
                        $(this).trigger('activate');
                    }).on('focusout', function () {
                        $(this).trigger('deactivate');
                    }).on('activate', function () {
                        $(this).addClass('x-molement-active')
                    }).on('deactivate', function () {
                        $(this).removeClass('x-molement-active')
                    }).on('val', function (sender, value) {
                        let retValue = undefined;
                        let $input = $(this).find('#' + INPUT_ID);
                        if (arguments.length === 2 && MOLEMENT.isString(value)) {
                            // setter
                            $(this).toggleClass('x-molement-hasvalue', !MOLEMENT.stringIsEmpty(value))
                            $input.val(value);
                        } else {
                            // getter
                            retValue = $input.val();
                        }
                        return retValue;
                    });

                    return $rootElement;
                }
            },
            // PASSWORD
            INPUT_PASSWORD: {
                typeName: 'INPUT_PASSWORD',
                setName: 'FLIP',
                createElement: function (label, defaultValue) {
                    let ELEMENT = MOLEMENT.SET_FLIP.ELEMENT.INPUT_PASSWORD;
                    let PRIMARY_ID = MOLEMENT.ID_PREFIX + Date.now().toString();
                    let HAS_DEFAULT_VALUE = MOLEMENT.isString(defaultValue) && !MOLEMENT.stringIsEmpty(defaultValue);
                    let INPUT_ID = PRIMARY_ID + '_' + ELEMENT.typeName;

                    // creation
                    let $rootElement = $('<div />').attr('id', PRIMARY_ID).addClass(MOLEMENT.ROOT_ELEMENT_CLASS).attr('data-typename', ELEMENT.typeName).attr('data-setname', ELEMENT.setName)
                        .toggleClass('x-molement-hasvalue', HAS_DEFAULT_VALUE)
                        .append(
                            $('<span />').attr('id', PRIMARY_ID + '_' + ELEMENT.typeName + '_BASE').addClass('x-molement-base'),
                            $('<input type="password" />').attr('id', INPUT_ID).attr('data-moType', ELEMENT.typeName)
                                .val(HAS_DEFAULT_VALUE ? defaultValue : '').on('change keydown', function () {
                                    setTimeout(function ($input) { $input.closest('.' + MOLEMENT.ROOT_ELEMENT_CLASS).toggleClass('x-molement-hasvalue', !MOLEMENT.stringIsEmpty($input.val())); }, 50, $(this));
                                }),
                            $('<label />').addClass('x-molement-label').attr('for', PRIMARY_ID + '_' + ELEMENT.typeName).text(label),
                            $('<label />').addClass('x-molement-label-shadow').attr('for', PRIMARY_ID + '_' + ELEMENT.typeName).text(label)
                    )
                    // trigger
                    .on('focusin', function () {
                        $(this).trigger('activate');
                    }).on('focusout', function () {
                        $(this).trigger('deactivate');
                    }).on('activate', function () {
                        $(this).addClass('x-molement-active')
                    }).on('deactivate', function () {
                        $(this).removeClass('x-molement-active')
                    }).on('val', function (sender, value) {
                        let retValue = undefined;
                        let $input = $(this).find('#' + INPUT_ID);
                        if (arguments.length === 2 && MOLEMENT.isString(value)) {
                            // setter
                            $(this).toggleClass('x-molement-hasvalue', !MOLEMENT.stringIsEmpty(value))
                            $input.val(value);
                        } else {
                            // getter
                            retValue = $input.val();
                        }
                        return retValue;
                    });

                    return $rootElement;
                }
            },
            // SELECT
            SINGLE_SELECT: {
                typeName: 'SINGLE_SELECT',
                setName: 'FLIP',
                createElement: function (label, lov, defaultValue) {
                    let ELEMENT = MOLEMENT.SET_FLIP.ELEMENT.SINGLE_SELECT;
                    let PRIMARY_ID = MOLEMENT.ID_PREFIX + Date.now().toString();
                    let defaultValueItem = undefined;

                    // creation
                    if (defaultValue) {
                        defaultValueItem = lov.find(function (item) { return item.value === defaultValue });
                    }
                    let $rootElement = $('<div />').attr('id', PRIMARY_ID).addClass(MOLEMENT.ROOT_ELEMENT_CLASS).attr('data-typename', ELEMENT.typeName).attr('data-setname', ELEMENT.setName)
                        .prop('data-lov', lov)
                        .prop('data-defaultValueItem', defaultValueItem)
                        .prop('data-value', defaultValueItem ? defaultValueItem.value : null)
                        .toggleClass('x-molement-hasvalue', defaultValueItem !== undefined)
                        .append(
                            $('<span />').attr('id', PRIMARY_ID + '_' + ELEMENT.typeName + '_BASE').addClass('x-molement-base'),
                            $('<input type="text" />').attr('id', PRIMARY_ID + '_' + ELEMENT.typeName).attr('data-moType', ELEMENT.typeName).prop('readonly', true)
                                .val(defaultValueItem ? defaultValueItem.label : '').on('change keydown', function () {
                                    setTimeout(function ($input) { $input.closest('.' + MOLEMENT.ROOT_ELEMENT_CLASS).toggleClass('x-molement-hasvalue', !MOLEMENT.stringIsEmpty($input.val())); }, 50, $(this));
                                }),
                            $('<label />').addClass('x-molement-label').attr('for', PRIMARY_ID + '_' + ELEMENT.typeName).text(label),
                            $('<label />').addClass('x-molement-label-shadow').attr('for', PRIMARY_ID + '_' + ELEMENT.typeName).text(label)
                    )
                    // trigger
                    .on('focusin', function () {
                        $(this).trigger('activate');
                    }).on('focusout', function () {
                        $(this).trigger('deactivate');
                    }).on('activate', function () {
                        let lovList = $(this).prop('data-lov');
                        if (lovList) {
                            let $dropList = $('<div />').attr('id', PRIMARY_ID + '_list').addClass('x-molement-droplist').css({
                                width: $(this).width(),
                                left: $(this).position().left,
                                top: $(this).position().top + $(this).outerHeight(true)
                            }).prop('data-molement-trigger', $(this).attr('id')).appendTo($('body')).addClass('x-molement-expanded');

                            let selectedItemValue = $rootElement.prop('data-value');
                            lovList.forEach(function (valueLabel, itemindex) {
                                let $item = $('<div />').addClass('x-molement-droplist-item').append(
                                        $('<span />').text(valueLabel.label)
                                    ).prop('data-value', valueLabel.value)
                                    .css({
                                        zIndex: lovList.length - itemindex
                                    })
                                    .toggleClass('x-molement-selected', selectedItemValue === valueLabel.value)
                                    .on('click', MOLEMENT.dropList_item_click)
                                    .appendTo($dropList);

                                setTimeout(function () { $item.addClass('x-molement-shownup'); }, MOLEMENT.LOV_ITEM_SHOWUP_DELAY_MS + MOLEMENT.LOV_ITEM_SHOWUP_TIME_MS * itemindex);
                            });

                            $(this).addClass('x-molement-active');
                            setTimeout(function (input) { input.setSelectionRange(0, 0); }, 50, $(this).find('input')[0]);
                        }
                    }).on('deactivate', function () {
                        let $dropList = $('#' + PRIMARY_ID + '_list');
                        if ($dropList.length > 0) {
                            $dropList.removeClass('x-molement-expanded');
                            setTimeout(function () { $dropList.remove(); }, 400);
                        }

                        $(this).removeClass('x-molement-active');
                    }).on('val', function (sender, value) {
                        var retValue = undefined;
                        if (arguments.length === 2) {
                            // setter
                            if (value === null) {
                                // reset
                                $(this).prop('data-value', null)
                                    .removeClass('x-molement-hasvalue')
                                    .find('input:text').val('');
                            } else {
                                let foundItem = $(this).prop('data-lov').find(function (item) { return item.value === value; });

                                if (foundItem) {
                                    $(this).prop('data-value', foundItem.value)
                                        .addClass('x-molement-hasvalue')
                                        .find('input:text').val(foundItem.label);
                                }
                            }
                        } else {
                            // getter
                            retValue = $(this).prop('data-value');
                        }
                        return retValue;
                    });

                    return $rootElement;
                }
            },
            // MULTI SELECT
            MULTI_SELECT: {
                typeName: 'MULTI_SELECT',
                setName: 'FLIP',
                createElement: function (label, lov, defaultValues) {
                    let ELEMENT = MOLEMENT.SET_FLIP.ELEMENT.MULTI_SELECT;
                    let PRIMARY_ID = MOLEMENT.ID_PREFIX + Date.now().toString();
                    let defaultValueItems = [];

                    defaultValues = defaultValues && !Array.isArray(defaultValues) ? [defaultValues] : defaultValues;   // convert into array in case of single value

                    // creation
                    if (defaultValues) {
                        defaultValueItems = lov.filter(function (item) { return defaultValues.includes(item.value) });
                    }
                    let $rootElement = $('<div />').attr('id', PRIMARY_ID).addClass(MOLEMENT.ROOT_ELEMENT_CLASS).attr('data-typename', ELEMENT.typeName).attr('data-setname', ELEMENT.setName)
                        .prop('data-lov', lov)
                        .prop('data-selectedItems', defaultValueItems)
                        .toggleClass('x-molement-hasvalue', defaultValueItems.length > 0)
                        .append(
                            $('<span />').attr('id', PRIMARY_ID + '_' + ELEMENT.typeName + '_BASE').addClass('x-molement-base'),
                            $('<input type="text" />').attr('id', PRIMARY_ID + '_' + ELEMENT.typeName).attr('data-moType', ELEMENT.typeName).prop('data-label', label).prop('readonly', true)
                                .on('change keydown', function () {
                                    setTimeout(function ($input) { $input.closest('.' + MOLEMENT.ROOT_ELEMENT_CLASS).toggleClass('x-molement-hasvalue', !MOLEMENT.stringIsEmpty($input.val())); }, 50, $(this));
                                }),
                            $('<label />').addClass('x-molement-label').attr('for', PRIMARY_ID + '_' + ELEMENT.typeName).text(label),
                            $('<label />').addClass('x-molement-label-shadow').attr('for', PRIMARY_ID + '_' + ELEMENT.typeName).text(label)
                    )
                    // trigger
                    .on('focusin', function () {
                        $(this).trigger('activate');
                    }).on('focusout', function () {
                        //$(this).trigger('deactivate');    // TODO: OPTIONAL
                    }).on('activate', function () {
                        let dropListId = PRIMARY_ID + '_list';
                        if ($('#' + dropListId).length === 0) {
                            let lovList = $(this).prop('data-lov');
                            if (lovList) {
                                let $dropList = $('<div />').attr('id', dropListId).addClass('x-molement-droplist').addClass('x-molement-multiSelect').css({
                                    width: $(this).width(),
                                    left: $(this).position().left,
                                    top: $(this).position().top + $(this).outerHeight(true)
                                }).prop('data-molement-trigger', $(this).attr('id')).appendTo($('body')).addClass('x-molement-expanded');

                                let selectedItems = $rootElement.prop('data-selectedItems');
                                lovList.forEach(function (valueLabel, itemindex) {
                                    let $item = $('<div />').addClass('x-molement-droplist-item').append(
                                            $('<label />').append(
                                                $('<input type="checkbox" />').prop('checked', selectedItems.find(function (item) { return item.value === valueLabel.value; }) !== undefined)
                                                , $('<span />').addClass('x-molement-droplist-item-check')
                                                , $('<span />').text(valueLabel.label)
                                            )
                                        ).prop('data-value', valueLabel.value)
                                        .css({
                                            zIndex: lovList.length - itemindex
                                        })
                                        .on('click', MOLEMENT.dropListMulti_item_click)
                                        .appendTo($dropList);

                                    // item show-up effects
                                    setTimeout(function () { $item.addClass('x-molement-shownup'); }, MOLEMENT.LOV_ITEM_SHOWUP_DELAY_MS + MOLEMENT.LOV_ITEM_SHOWUP_TIME_MS * itemindex);
                                });

                                $(this).addClass('x-molement-active');
                                setTimeout(function (input) { input.setSelectionRange(0, 0); }, 50, $(this).find('input')[0]);
                            }
                        }
                    }).on('deactivate', function () {
                        let $dropList = $('#' + PRIMARY_ID + '_list');
                        if ($dropList.length > 0) {
                            $dropList.removeClass('x-molement-expanded');
                            setTimeout(function () { $dropList.remove(); }, 400);
                        }

                        $(this).removeClass('x-molement-active');
                    }).on('val', function (sender, values) {
                        var retValue = undefined;
                        if (arguments.length === 2) {
                            // setter
                            values = Array.isArray(values) ? values : (values === null ? [] : [values]);   // convert into array in case of single value
                            defaultValueItems = $(this).prop('data-lov').filter(function (item) { return values.includes(item.value) });
                            $(this).prop('data-selectedItems', defaultValueItems)
                                .trigger('updateLabel')
                                .toggleClass('x-molement-hasvalue', defaultValueItems.length > 0);
                        } else {
                            // getter
                            retValue = $.map($(this).prop('data-selectedItems'), function (item) { return item.value; }) ;
                        }
                        return retValue;
                    }).on('updateLabel', function () {
                        let resultLabel = '';
                        
                        let selectedItems = $(this).prop('data-selectedItems');
                        if (selectedItems.length > 3) {
                            resultLabel = selectedItems.length + ' Items Selected';
                        } else {
                            selectedItems.forEach(function (item) { resultLabel += resultLabel.length > 0 ? MOLEMENT.MULTI_SELECT_LABEL_SEPARATOR + item.label : item.label; });
                        }
                        $rootElement
                            .find('input').val(resultLabel).end()
                            .find('label.x-molement-label-shadow').text(selectedItems.length === 0 ? $rootElement.find('label.x-molement-label').text() : resultLabel);
                    });

                    return $rootElement.trigger('updateLabel');
                }
            },
            // RADIO
            RADIO: {
                typeName: 'RADIO',
                setName: 'FLIP',
                createElement: function (label, lov, defaultValue) {
                    let ELEMENT = MOLEMENT.SET_FLIP.ELEMENT.RADIO;
                    let PRIMARY_ID = MOLEMENT.ID_PREFIX + Date.now().toString();
                    let INPUT_ID = PRIMARY_ID + '_' + ELEMENT.typeName;
                    let defaultValueIndex = -1;

                    // creation
                    if (defaultValue) {
                        defaultValueIndex = lov.findIndex(function (item) { return item.value === defaultValue; });
                    }
                    let $rootElement = $('<div />').attr('id', PRIMARY_ID).addClass(MOLEMENT.ROOT_ELEMENT_CLASS).attr('data-typename', ELEMENT.typeName).attr('data-setname', ELEMENT.setName)
                        .toggleClass('x-molement-hasvalue', defaultValueIndex !== -1)
                        .prop('data-lov', lov)
                        .prop('data-value', defaultValueIndex !== -1 ? defaultValue : null)
                        .attr('data-side', defaultValueIndex !== -1 ? (defaultValueIndex === 0 ? 'FIRST' : 'SECOND') : '')
                        .append(
                            $('<span />').attr('id', PRIMARY_ID + '_' + ELEMENT.typeName + '_BASE').addClass('x-molement-base'),
                            $('<label />').attr('id', PRIMARY_ID + '_' + ELEMENT.typeName + '_LABEL_VALUE_FIRST').addClass('x-molement-label-value x-molement-label-value-first').attr('for', PRIMARY_ID + '_' + ELEMENT.typeName).text(lov[0].label),
                            $('<label />').attr('id', PRIMARY_ID + '_' + ELEMENT.typeName + '_LABEL_VALUE_SECOND').addClass('x-molement-label-value x-molement-label-value-second').attr('for', PRIMARY_ID + '_' + ELEMENT.typeName).text(lov[1].label),
                            $('<label />').attr('id', PRIMARY_ID + '_' + ELEMENT.typeName + '_LABEL_VALUE_FIRST_SHADOW').addClass('x-molement-label-value-shadow x-molement-label-value-first').attr('for', PRIMARY_ID + '_' + ELEMENT.typeName).text(lov[0].label),
                            $('<label />').attr('id', PRIMARY_ID + '_' + ELEMENT.typeName + '_LABEL_VALUE_SECOND_SHADOW').addClass('x-molement-label-value-shadow x-molement-label-value-second').attr('for', PRIMARY_ID + '_' + ELEMENT.typeName).text(lov[1].label),
                            $('<label />').attr('id', PRIMARY_ID + '_' + ELEMENT.typeName + '_LABEL').addClass('x-molement-label').attr('for', PRIMARY_ID + '_' + ELEMENT.typeName).text(label),
                            $('<input type="checkbox" />').attr('id', INPUT_ID).attr('data-moType', ELEMENT.typeName)
                                .prop('checked', defaultValueIndex === 1).on('change keydown', function () {
                                    setTimeout(function ($input) {
                                        $input.closest('.' + MOLEMENT.ROOT_ELEMENT_CLASS)
                                            .prop('data-value', $input.is(':checked') ? lov[1].value : lov[0].value)
                                            .attr('data-side', $input.is(':checked') ? 'SECOND' : 'FIRST').addClass('x-molement-hasvalue');
                                    }, 50, $(this));
                                })
                    )
                    // trigger
                    .on('focusin', function () {
                        $(this).trigger('activate');
                    }).on('focusout', function () {
                        $(this).trigger('deactivate');
                    }).on('activate', function () {
                        $(this).addClass('x-molement-active')
                    }).on('deactivate', function () {
                        $(this).removeClass('x-molement-active')
                    }).on('val', function (sender, value) {
                        var retValue = undefined;
                        $(this).prop('data-lov', lov)
                        var $input = $(this).find('#' + INPUT_ID);
                        if (arguments.length === 2) {
                            // setter
                            if (value === null) {
                                // reset
                                $(this).prop('data-value', null)
                                    .removeClass('x-molement-hasvalue');
                            } else {
                                let foundIndex = $(this).prop('data-lov').findIndex(function (item) { return item.value === value; });
                                if (foundIndex !== -1) {
                                    $input.prop('checked', foundIndex === 1).trigger('change');
                                }
                            }
                        } else {
                            // getter
                            retValue = $(this).prop('data-value');
                        }
                        return retValue;
                    });

                    return $rootElement;
                }
            }
        },
    },
    // property
    LOV_ITEM_SHOWUP_DELAY_MS: 50,
    LOV_ITEM_SHOWUP_TIME_MS: 100,
    MULTI_SELECT_LABEL_SEPARATOR: ',',
    ID_PREFIX: 'x-molement_',
    ROOT_ELEMENT_CLASS: 'x-molement',
    // event
    dropList_item_click: function () {
        $('#' + $(this).closest('.x-molement-droplist').prop('data-molement-trigger')).trigger('val', $(this).prop('data-value'));
    },
    dropListMulti_item_click: function () {
        let $rootElement = $('#' + $(this).closest('.x-molement-droplist').prop('data-molement-trigger'));
        let $inputCheck = $(this).find('input:checkbox');
        let isChecked = $inputCheck.is(':checked');
        let valueList = $rootElement.prop('data-selectedItems');
        if (isChecked) {
            // unchecked
            let unckeckedValue = $(this).prop('data-value');
            valueList = valueList.filter(function (item) { return item.value !== unckeckedValue; });
            if (valueList.length == 0) {
                $rootElement.removeClass('x-molement-hasvalue');
            }
        } else {
            // checked
            valueList.push({ value: $(this).prop('data-value'), label: $(this).find('span').text() });
            $rootElement.addClass('x-molement-hasvalue');
        }
        $rootElement.prop('data-selectedItems', valueList).trigger('updateLabel');
        $inputCheck.prop('checked', !isChecked);
    },
    // function
    stringIsEmpty: function (value) {
        return MOLEMENT.isString(value) && value.trim().length === 0;
    },
    isString: function (value) {
        return typeof value === 'string';
    },
    isBoolean: function (value) {
        return typeof value === 'boolean';
    }
};

