import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    activeFilter: 'Все',
    filters: [],
    filtersLoadingStatus: 'idle'
}

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
        filterActiv: (status, action) => {status.activeFilter = action.payload}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, status => {status.filtersLoadingStatus = 'loading'})
            .addCase(fetchFilters.fulfilled, (status, action) => {
                status.filters = action.payload;
                status.filtersLoadingStatus = 'idle';
            })
            .addCase(fetchFilters.rejected, status => {status.filtersLoadingStatus = 'error'})
    }
});

const {reducer, actions} = filters;

export default reducer;

export const {
    filtersFetching,
    filtersFetched,
    filterActiv,
    filtersFetchingError
} = actions;