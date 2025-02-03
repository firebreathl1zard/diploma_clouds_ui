// import { createStore, applyMiddleware } from 'redux';
// import {thunk} from 'redux-thunk'; // Исправлено

// // Начальное состояние
// const initialState = {
//   boardOccupiedSpace: { xStart: 0, xEnd: 0, yStart: 0, yEnd: 0 },
// };

// // Редьюсер
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'SET_BOARD_OCCUPIED_SPACE':
//       return {
//         ...state,
//         boardOccupiedSpace: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// // Создание хранилища с middleware
// const store = createStore(reducer, applyMiddleware(thunk));

// export default store;