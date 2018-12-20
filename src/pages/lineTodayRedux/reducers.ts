import Data from "models/data.json";
import { ActionTypes } from "./actions";
import { Reducer } from "redux";

export type Categories = typeof Data.result.categories;
export type CategoryList = typeof Data.result.categoryList;
export interface StoreState {
    categories: Categories;
    categoryList: CategoryList;
    isHome: boolean,
    category: {
        name?: string,
        id: number | string
    }
}

const initialState: StoreState = {
    categories: Data.result.categories,
    categoryList: Data.result.categoryList.filter(item => item.type !== 3),
    isHome: true,
    category: {
        id: Data.result.categoryList[0].id,
        name: Data.result.categoryList[0].name
    }
};

const reducers: Reducer<StoreState> = (state = initialState, actions) => {
    switch (actions.type) {
        case ActionTypes.SET_CATEOGORY_ID:
            return {
                ...state,
                categoryId: actions.categoryId,
                isHome: actions.categoryId === 100259,
                category: {
                    id: actions.categoryId,
                    name: (state.categoryList.find(item => item.id === actions.categoryId) as { name: string }).name
                }
            }
        default:
            return state;
    }
}

export default reducers