import {Todos} from '../constants/todos';

const initialState = [];

export function TodosReducer(state = initialState, action){
  switch (sction.type) {
    case todos.add_todo:
                return [...state, action.payload];
    case todos.remove_todo:
                return[
                  ...state.slice(0, action.payload),
                  ...state.slice(action.payload + 1)
                ]

    default:
        return state;
  }
}
