export const buildSidebarFolderList = (userFolders) => {
    const defaultFolders = [
        {
            uid: 'folder:notes',
            label: 'notes',
            iconClass: 'note',
            classSuffix: '',
            isCollapsed: false,
            children: [],
        },
        {
            uid: 'folder:favorites',
            label: 'favorites',
            iconClass: 'star',
            classSuffix: '',
            isCollapsed: false,
            children: [],
        },
        {
            uid: 'folder:trash',
            label: 'trash',
            iconClass: 'trash',
            classSuffix: '',
            isCollapsed: false,
            children: [],
        },
    ];

    return defaultFolders.concat(userFolders);
};
