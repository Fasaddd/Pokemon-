import * as actionTypes from '../actionTypes';

export const setPokemonUrl = url => {
    return {
        type: actionTypes.SET_POKEMON_URL,
        res: url
    };
};