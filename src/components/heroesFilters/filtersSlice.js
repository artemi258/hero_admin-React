import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

// const initialState = {
//     activeFilter: 'Все',
//     filters: [],
//     filtersLoadingStatus: 'idle'
// }

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
    activeFilter: 'Все',
    filtersLoadingStatus: 'idle'
});

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/filters")
    }
)

const filters = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filterActiv: (state, action) => {state.activeFilter = action.payload}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                filtersAdapter.setAll(state, action.payload);
                state.filtersLoadingStatus = 'idle';
            })
            .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
    }
});


const {reducer, actions} = filters;

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters);

export default reducer;

export const {
    filtersFetching,
    filtersFetched,
    filterActiv,
    filtersFetchingError
} = actions;