export const buildSidebarFolderList = (userFolders) => {
    const defaultFolders = [
        {
            uid: 'folder:notes',
            label: 'notes',
            iconClass: 'far fa-sm fa-file-alt',
            classSuffix: '',
            isCollapsed: false,
            children: [],
        },
        {
            uid: 'folder:favorites',
            label: 'favorites',
            iconClass: 'far fa-sm fa-star',
            classSuffix: '',
            isCollapsed: false,
            children: [],
        },
        {
            uid: 'folder:trash',
            label: 'trash',
            iconClass: 'far fa-sm fa-trash-alt',
            classSuffix: '',
            isCollapsed: false,
            children: [],
        },
    ];

    return defaultFolders.concat(userFolders);
};
