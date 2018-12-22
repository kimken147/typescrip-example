import { CategoryIdType } from ".";

export enum ActionTypes {
    SET_CATEOGORY_ID = "@SET_CATEGORY_ID",
    SET_ISMOBILE = "@SET_ISMOBILE"
}

export const ActionCreators = {
    setCategoryId: (categoryId: CategoryIdType) => ({ type: ActionTypes.SET_CATEOGORY_ID, categoryId }),
    setIsMobile: (isMobile: boolean) => ({ type: ActionTypes.SET_ISMOBILE, isMobile })
}

export type ActionCreatorsType = typeof ActionCreators;

