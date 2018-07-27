const buildSidebarFolderList = (userFolders) => {
    const defaultFolders = [
        {
            uid: 'folder:notes',
            label: 'notes',
            iconClass: 'note',
            classSuffix: '',
            isCollapsed: false,
            isDefault: true,
            children: [],
        },
        {
            uid: 'folder:favorites',
            label: 'favorites',
            iconClass: 'star',
            classSuffix: '',
            isCollapsed: false,
            isDefault: true,
            children: [],
        },
        {
            uid: 'folder:trash',
            label: 'trash',
            iconClass: 'trash',
            classSuffix: '',
            isCollapsed: false,
            isDefault: true,
            children: [],
        },
    ];

    return defaultFolders.concat(userFolders);
};

export { buildSidebarFolderList };
