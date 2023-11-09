import { createStore } from 'redux';

const initialState = {
  count: 1,
  year : new Date().getFullYear(),
  month : new Date().getMonth() + 1,
  day : new Date().getDate(),
  hour : new Date().getHours().toString().padStart(2, '0'),
  minute : new Date().getMinutes().toString().padStart(2, '0'),
};

const reducer = (state = initialState) => {
  return state;
};

const store = createStore(reducer);

export default store;