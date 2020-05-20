import * as actionTypes from '../actionTypes';

export const setPokemonUrl = url => {
    return {
        type: actionTypes.SET_POKEMON_URL,
        res: url
    };
};
export const changeModalStatus = status => {
    return {
        type: actionTypes.CHANGE_MODAL_STATUS,
        res: status
    }
};