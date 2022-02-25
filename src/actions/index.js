export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes, filter = 'Все') => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes,
        filter: filter
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}