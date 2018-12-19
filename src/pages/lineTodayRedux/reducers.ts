import Data from "models/data.json";
import { ActionTypes } from "./actions";
import { Reducer } from "redux";

export interface StoreState {
    categoryId: number | string
}

const initialState: StoreState = {
    categoryId: Data.result.categoryList[0].id
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

// export function reducers(state = initialState, actions: IAction) {
//     switch (actions.type) {
//         case ActionTypes.SET_CATEOGORY_ID:
//             return {
//                 ...state,
//                 categoryId: actions.categoryId
//             }
//         default:
//             return state;
//     }
// }

export { reducers }