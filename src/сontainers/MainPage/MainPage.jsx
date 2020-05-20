import React from 'react';

import PokemonDetail from '../PokemonDetail/PokemonDetail';
import PokemonList from '../../components/PokemonList/PokemonList.js';
import classes from './MainPage.module.scss';


const MainPage = props => {

    return (
        <div className={classes.main}>
            <header>
                <h1 className={classes.main__header}>POKEDEX</h1>
            </header>
            <main className={classes.main__content}>
                <PokemonList />
                <PokemonDetail />
            </main>
        </div>
    );
};

export default MainPage;