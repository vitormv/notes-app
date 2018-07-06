export const buildSidebarFolderList = (userFolders) => {
    const defaultFolders = [
        {
            uid: 'folder:notes',
            label: 'notes',
            iconClass: 'icon-note',
            classSuffix: '',
            isCollapsed: false,
            children: [],
        },
        {
            uid: 'folder:favorites',
            label: 'favorites',
            iconClass: 'icon-star',
            classSuffix: '',
            isCollapsed: false,
            children: [],
        },
        {
            uid: 'folder:trash',
            label: 'trash',
            iconClass: 'icon-trash',
            classSuffix: '',
            isCollapsed: false,
            children: [],
        },
    ];

    return defaultFolders.concat(userFolders);
};
