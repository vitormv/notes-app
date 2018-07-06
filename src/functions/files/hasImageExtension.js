const getListOfImageExtensions = [
    'bmp',
    'exif',
    'gif',
    'jpeg',
    'jpg',
    'jp2',
    'png',
    'webp',
];

export const hasImageExtension = url => !!getListOfImageExtensions.find(url.endsWith);
