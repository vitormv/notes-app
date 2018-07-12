import { getWordBoundariesAtOffset } from '../getWordBoundariesAtOffset';

const testData = [
    {
        input: { string: 'This is a test', offset: 0 },
        expected: 'This',
    },
    {
        input: { string: 'This is a test', offset: 3 },
        expected: 'This',
    },
    {
        input: { string: 'This is a test', offset: 4 },
        expected: 'This',
    },
    {
        input: { string: 'This is a test', offset: 5 },
        expected: 'is',
    },
    {
        input: { string: 'This is a test', offset: 6 },
        expected: 'is',
    },
    {
        input: { string: 'This is a test', offset: 7 },
        expected: 'is',
    },
    {
        input: { string: 'This is a test', offset: 8 },
        expected: 'a',
    },
    {
        input: { string: 'This is a test', offset: 9 },
        expected: 'a',
    },
];

describe.each(testData)('getWordBoundariesAtOffset() returns correct offsets', ({ input, expected }) => {
    test(`("${input.string}", ${input.offset}) returns "${expected}"`, () => {
        const indexes = getWordBoundariesAtOffset(input.string, input.offset);

        expect(input.string.slice(indexes[0], indexes[1] + 1)).toBe(expected);
    });
});
