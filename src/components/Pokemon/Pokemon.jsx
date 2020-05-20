import React from 'react';
import { connect } from 'react-redux';
import { v1 as uuid } from "uuid"
import { bindActionCreators } from 'redux';

import { setPokemonUrl, changeModalStatus } from '../../store/action/action';

import classes from './Pokemon.module.scss';

const defaultColor = {
    'poison': 'mediumslateblue',
    'grass': 'peru',
    'fire': 'gold',
    'flying': 'papayawhip',
    'water': 'blue',
    'bug': 'indianred',
    'normal': 'lightsteelblue',
    'ground': 'olive',
    'electric': 'saddlebrown'
}

const Pokemon = (props) => {
    const { pokemonInfo, actions } = props;
    const onPokemonClick = res => {
        actions.setPokemonUrl(res);
        actions.changeModalStatus(true);
    };

    return (
        <React.Fragment>
            <div className={classes.pokemonItem}>
                <div
                    className={classes.pokemonItem__detail}
                    onClick={() => onPokemonClick(pokemonInfo.url)}
                >
                </div>
                <img
                    className={classes.pokemonItem__img}
                    src={pokemonInfo.image}
                    alt="img" />
                <h3>{pokemonInfo.name}</h3>
                <p className={classes.pokemonItem__character}>
                    {[...pokemonInfo.types].map(el => <span
                        key={uuid()}
                        className={classes.pokemonItem__types}
                        style={{ backgroundImage: `linear-gradient(to bottom, #cfe7fa -15%, ${defaultColor[el.type.name]} 100%)` }}>
                        {el.type.name}</span>)}
                </p>
            </div>
        </React.Fragment>
    );
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        {
            setPokemonUrl,
            changeModalStatus
        },
        dispatch
    )
});

export default connect(null, mapDispatchToProps)(Pokemon);