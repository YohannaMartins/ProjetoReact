const generateId = () => {
    return `${(Math.floor(Math.random() * 100_000)).toString(16)}-${(Math.floor(Math.random() * 100_000)).toString(16)}`
}

const saveFolders = async (folders) => {
    localStorage.setItem('folders', JSON.stringfy(folders));
}

export const getFolders = async () => {
    return JSON.parse(localStorage.getItem('folders')) || []
}

export const saveFolder = async (folderName) => {
    const folders = await getFolders();

    const newFolder ={
        id: generateId(),
        name: folderName,
        pins:[]
    };

    folders.push(newFolder);

    await saveFolders(folders);

    return(newFolder);
}

export const savePinInFolder = async (folderID, pinId) => {

    const folders = await getFolders();
    
    const folderIndex = folders.findIndex(function(folder) {
        return folder.id === folderID;
    });

    if (folderIndex !== -1) {
        folders[folderIndex].pins.push(pinId);
    }

    await saveFolders(folders);

    return {...folders[folderIndex]};
}

export const getPins = async () => {
    return [
        {
            id: '123',
            title: 'Trigonometria',
            image: 'htts://picsum.phtos/200/300?53',
            total: 0
         },
         {
            id: '321',
            title: 'JavaScript',
            image: 'htts://picsum.phtos/200/300?13',
            total: 0
         }
    ]
}