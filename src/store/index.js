import { configureStore } from '@reduxjs/toolkit';
import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filtersSlice';


// const store = createStore(combineReducers({heroes, filters}),
//                 compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))


const store = configureStore({
    reducer: {heroes, filters},
    middleware: geetDefaultMiddleware => geetDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
})


export default store;