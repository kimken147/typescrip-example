import { CategoryIdType } from "pages/home";

export enum ActionTypes {
    SET_CATEOGORY_ID = "@SET_CATEGORY_ID",
}

export const ActionCreators = {
    setCategoryId: (categoryId: CategoryIdType) => ({ type: ActionTypes.SET_CATEOGORY_ID, categoryId })
}

export type ActionCreatorsType = typeof ActionCreators;

