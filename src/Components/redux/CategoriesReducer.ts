import { categories } from './../../../../Backend/Models/Category';

//1 reducer state
export class CategoriesState {
  public categories: categories[] = [];
}

//2 action types
export enum CategoriesActionType {
  addCategory = "addCategory",
  updateCategory = "updateCategory",
  deleteCategory = "deleteCategory",
  downloadCategory = "downloadCategory",
}

//3 action data structure
export interface categoriesAction {
  type: CategoriesActionType;
  payload?: any;
}

//4  functions->dispatch
export const addCategoryAction = (newCategory: categories): categoriesAction => {
  return { type: CategoriesActionType.addCategory, payload: newCategory };
};

export const updateCategoryAction = (
  updatedCategory: categories
): categoriesAction => {
  return {
    type: CategoriesActionType.updateCategory,
    payload: updatedCategory,
  };
};

export const deleteCategoryAction = (id: number): categoriesAction => {
  return { type: CategoriesActionType.deleteCategory, payload: id };
};

export const downloadCategoriesAction = (
  categories: categories[]
): categoriesAction => {
  return { type: CategoriesActionType.downloadCategory, payload: categories };
};

//5 reducer
export const CategoriesReducer = (
  currentState: CategoriesState = new CategoriesState(),
  action: categoriesAction
): CategoriesState => {
  const newState = { ...currentState };

  switch (action.type) {
    case CategoriesActionType.addCategory:
      newState.categories = [...newState.categories, action.payload];
      break;
    case CategoriesActionType.deleteCategory:
      newState.categories = [...newState.categories].filter(
        (item) => item.category_id !== action.payload
      );
      break;
    case CategoriesActionType.downloadCategory:
      newState.categories = action.payload;
      break;
      case CategoriesActionType.updateCategory:
        const index = currentState.categories.findIndex(
          (category) => category.category_id === action.payload.category_id
        );
        if (index !== -1) {
          const updatedCategories = [...currentState.categories];
          updatedCategories[index] = action.payload;
          return {
            ...currentState,
            categories: updatedCategories,
          };
        }
        return currentState;
  }

  return newState;
};
