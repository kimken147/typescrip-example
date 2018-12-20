import Data from "models/data.json";
import { ActionTypes } from "./actions";
import { Reducer } from "redux";

export type Categories = typeof Data.result.categories;
export type CategoryList = typeof Data.result.categoryList;
export interface StoreState {
    categoryId: number | string,
    categories: Categories,
    categoryList: CategoryList
}

const initialState: StoreState = {
    categoryId: Data.result.categoryList[0].id,
    categories: Data.result.categories,
    categoryList: Data.result.categoryList.filter(item => item.type !== 3 )
};

const reducers: Reducer<StoreState> = (state = initialState, actions) => {
    switch (actions.type) {
        case ActionTypes.SET_CATEOGORY_ID:
            return {
                ...state,
                categoryId: actions.categoryId
            }
        default:
            return state;
    }
}

export default reducers