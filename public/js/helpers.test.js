import { dateConverter, statusConverter } from "./helpers";

test('Properly converts date in Zulu time to date in GMT', () => {
    const zulu = '2021-07-29T04:28:17Z';
    const GMT = '2021-07-29 at 04:28:17';
    expect (dateConverter(zulu)).toEqual(GMT);
})

test('Returns null if Zulu time is invalid', () => {
    const zulu = '2021';
    expect (dateConverter(zulu)).toBeNull();
})

test('Returns green circle emoji when ticket status is solved', () => {
    const greenCircle = '&#128994';
    expect (statusConverter('solved')).toEqual(greenCircle);
})

test('Returns question mark emoji when ticket status is invalid', () => {
    const questionMark = '&#10067';
    expect (statusConverter('Copenhagen')).toEqual(questionMark);
})