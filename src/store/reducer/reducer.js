import * as actionTypes from '../actionTypes';

const initialState = {
    pokemonDetailUrl: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_POKEMON_URL:
            return {
                ...state,
                pokemonDetailUrl: action.res
            };
        default:
            return state;
    }
};

export default reducer;