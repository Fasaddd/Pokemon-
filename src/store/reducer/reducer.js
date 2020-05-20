import * as actionTypes from '../actionTypes';

const initialState = {
    pokemonDetailUrl: '',
    modalOpen: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_POKEMON_URL:
            return {
                ...state,
                pokemonDetailUrl: action.res
            };
        case actionTypes.CHANGE_MODAL_STATUS:
            return {
                ...state,
                modalOpen: action.res
            };
        default:
            return state;
    }
};

export default reducer;