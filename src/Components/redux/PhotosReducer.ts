import { Photo } from "../Modal/Photo";

//initial state
export class PhotosState {
  public allPhotos: Photo[] = [];
}

//action list
export enum PhotoActionType {
  addPhoto = "addPhoto",
  deletePhoto = "deletePhoto",
  updatePhoto = "updatePhoto",
  downloadPhoto = "downloadPhoto",
}

//action data structure
export interface PhotoAction {
  type: PhotoActionType;
  payload?: any;
}

//function
export const addPhotoAction = (newPhoto: Photo): PhotoAction => {
  return { type: PhotoActionType.addPhoto, payload: newPhoto };
};

export const deletePhotoAction = (id: number): PhotoAction => {
  return { type: PhotoActionType.deletePhoto, payload: id };
};

export const updatePhotoAction = (updatedPhoto: Photo): PhotoAction => {
  return { type: PhotoActionType.updatePhoto, payload: updatedPhoto };
};

export const downloadPhotoAction = (photos: Photo[]): PhotoAction => {
  return { type: PhotoActionType.downloadPhoto, payload: photos };
};

//reducer

export const photoReducer = (
  currentState: PhotosState = new PhotosState(),
  action: PhotoAction
): PhotosState => {
  const newState = { ...currentState };

  switch (action.type) {
    case PhotoActionType.addPhoto:
      newState.allPhotos = [...newState.allPhotos, action.payload];
      break;
    case PhotoActionType.deletePhoto:
      newState.allPhotos = [...newState.allPhotos].filter(
        (item) => item.photo_id !== action.payload
      );
      break;
    case PhotoActionType.downloadPhoto:
      newState.allPhotos = action.payload;
      break;
    case PhotoActionType.updatePhoto:
      //For each item in the allPhotos array, this logic checks if the id of the current item matches
      //the id contained in the action.payload (which is the updated photo). If there's a match,
      // it replaces the current item with the action.payload, which holds the updated photo data.
      //If there's no match, it keeps the item as it is.
      newState.allPhotos = newState.allPhotos.map((item) =>
        item.photo_id === action.payload.id ? action.payload : item
      );
      break;
  }

  return newState;
};
