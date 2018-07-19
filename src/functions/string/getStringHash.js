import murmurhash from 'murmurhash';

const getStringHash = theString => String(murmurhash.v3(theString));

export { getStringHash };
