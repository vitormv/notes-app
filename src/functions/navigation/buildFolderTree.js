import Arboreal from 'arboreal';

export const buildFolderTree = folders => (
    Arboreal.parse({ children: folders }, 'children')
);
