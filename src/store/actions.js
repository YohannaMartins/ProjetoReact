import * as types from './types';
import * as pinServices from '../services/pinServices';

const sleep = (time) => (
    new Promise((resolve) => {
        setTimeout(resolve, time)
    })
);

export const openModalSavePinAction = (pinId) => (
    {
        type: types.openModalSavePinType,
        payload: pinId
    }
);

export const openModalCreateFolder = () => (
    {
        type: types.openModalCreateFolderType
    }
);

export const closeModalsAction = () => (
    {
        type: types.closeModalsType
    }
);

export const fetchFoldersInitAction = async () => ({
        type: types.fetchFoldersInitType
});

export const fetchFoldersSuccessAction = async (folders) => ({
    type: types.fetchFoldersSuccessType,
    payload: folders
});

export const fetchFoldersAction = async (dispatch) => {
    dispatch(fetchFoldersInitAction());
    const folders = await pinServices.getFolders();
    dispatch(fetchFoldersSuccessAction(folders));
};

export const saveFolderInitAction = async () => ({
    type: types.saveFolderInitType
});

export const saveFolderSuccessAction = async (folder) => ({
    type: types.saveFolderSuccessType,
    payload: folder
});

export const saveFolderAction = async (dispatch, folderName, pinId) => {
    dispatch(saveFolderInitAction());

    await sleep(1000);

    const newFolder = await pinServices.saveFolder(folderName);
    const folder = await pinServices.savePinInFolder(newFolder.id, pinId);
    dispatch(saveFolderSuccessAction(folder));
};

export const savePinInFolderInitAction = async () => ({
    type: types.savePinInFolderInitType,
    payload: folders
});

export const savePinInFolderSuccessAction = async (folders) => ({
    type: types.savePinInFolderSuccessType
});

export const savePinInFolderAction = async (dispatch, pinId, folderId) => {
    dispatch(savePinInFolderInitAction());

    await sleep(1000);

    await pinServices.savePinInFolder(folderId, pinId);
    const folders = await pinServices.getFolders();
    dispatch(savePinInFolderSuccessAction(folders));
};

export const fetchPinsInitAction = async () => ({
    type: types.fetchPinsInitType
});

export const fetchPinsSuccessAction = async (pinsData) => ({
    type: types.fetchPinsSuccessType,
    payload: pinsData
});

export const fetchPinsAction = async (dispatch) => {
    dispatch(fetchPinsInitAction());
    await sleep(1000);
    const pinsData = pinServices.getPins();
    dispatch(fetchPinsSuccessAction(pinsData));
};