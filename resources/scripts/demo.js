const LANGUAGE_LIST = [
    { value: 'CSH', label: 'C#' },
    { value: 'CPP', label: 'C++' },
    { value: 'DEL', label: 'Delphi' },
    { value: 'JAV', label: 'JAVA' },
    { value: 'PAS', label: 'Pascal' },
    { value: 'PER', label: 'PERL' },
    { value: 'PHP', label: 'Php' },
    { value: 'PYT', label: 'Python' },
    { value: 'VBN', label: 'VB.net' },
    { value: 'VB6', label: 'VB6' },
];

const DEVICE_LIST = [
    { value: 1, label: 'TV' },
    { value: 2, label: 'Radio' },
    { value: 3, label: 'Mobile' },
    { value: 4, label: 'Tablet' },
    { value: 5, label: 'PC' },
    { value: 6, label: 'Laptop' },
    { value: 7, label: 'Unknown' }
];

$(document).ready(function () {
    $('#testForm').append(
        MOLEMENT.SET_FLIP.ELEMENT.INPUT_TEXT.createElement('Username'),
        MOLEMENT.SET_FLIP.ELEMENT.INPUT_PASSWORD.createElement('Password'),
        MOLEMENT.SET_FLIP.ELEMENT.SINGLE_SELECT.createElement('Device', DEVICE_LIST),
        MOLEMENT.SET_FLIP.ELEMENT.MULTI_SELECT.createElement('Programming Language', LANGUAGE_LIST),
        MOLEMENT.SET_FLIP.ELEMENT.RADIO.createElement('Gender', [{ value: '0', label: 'Female' }, { value: '1', label: 'Male' }])
    );
});