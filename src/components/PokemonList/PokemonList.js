import React, { Component } from 'react';
import { v1 as uuid } from "uuid"

import Loader from '../Loader/Loader';
import classes from './PokemonList.module.scss';
import Pokemon from '../Pokemon/Pokemon';

class PokemonList extends Component {

    state = {
        savedPokemons: [],
        pokemonList: [],
        offsetQuantity: 0,
        loading: false,
        showError: false,
        filterByValue: 'all',
        filterBy: ['all']
    }

    componentDidMount() {
        this.getPokemons();
    };

    getPokemons = async () => {
        const { offsetQuantity } = this.state;
        try {
            this.setState({
                loading: true
            });

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offsetQuantity}`);
            const result = await response.json();

            const tempList = [...result.results].map(async (item) => {
                let pokemonInfo = {};
                const pokemonResponse = await fetch(`${item.url}`);
                const pokemonResult = await pokemonResponse.json();
                const { types, name, sprites } = pokemonResult;

                this.formingFilterChanger(types);

                pokemonInfo = {
                    'name': name,
                    'types': types,
                    'image': sprites.front_shiny,
                    'url': item.url
                };
                return pokemonInfo;
            });

            const res = await Promise.all(tempList);
            this.setState(prevState => ({
                pokemonList: [...prevState.pokemonList, ...res],
                savedPokemons: [...prevState.savedPokemons, ...res]
            }));
            this.onFilterPokemonList();
        } catch (error) {
            this.setState({
                showError: true
            });
        } finally {
            this.setState({
                loading: false,
                offsetQuantity: offsetQuantity + 12
            });
        }
    };

    onLoadMoreHandler = () => {
        this.getPokemons();
    };

    formingFilterChanger = (typePokemon) => {
        const { filterBy } = this.state;
        typePokemon.forEach(item => {
            let res = filterBy.some(checkItem => checkItem === item.type.name ? true : false);
            if (!res) filterBy.push(item.type.name);
        });

        this.setState({
            filterBy: filterBy
        });
    };

    onFilterPokemonList = () => {
        const { savedPokemons, filterByValue } = this.state;
        const tempList = [];
        if (filterByValue === 'all') {
            this.setState({
                pokemonList: savedPokemons
            });
            return false;
        };
        savedPokemons.forEach(pokemonItem => {
            pokemonItem.types.forEach(typeItem => {
                if (typeItem.type.name === filterByValue) tempList.push(pokemonItem);
            });
        });

        this.setState({
            pokemonList: tempList
        });
    };

    onChangeFilterValue = (event) => {
        const filterValue = event.target.value;
        this.setState({
            filterByValue: filterValue
        }, () => {
            this.onFilterPokemonList();
        });
    };

    render() {
        const { pokemonList, showError, loading, filterBy, filterByValue } = this.state;
        return (
            <div className={classes.main__list}>
                <div className={classes.main__list_filter}>
                    <select value={filterByValue} onChange={this.onChangeFilterValue}>
                        {filterBy.map(el => {
                            return (
                                <option value={el} key={uuid()}>{el}</option>
                            )
                        })}
                    </select>
                </div>
                {showError && <p className={classes.error}>Something goes wrong</p>}
                {pokemonList.length > 0 && <div className={classes.main__items}>
                    {pokemonList.map(item => <Pokemon
                        pokemonInfo={item}
                        key={uuid()} />)}
                </div>}

                {loading && <div className={classes.main__loader}><Loader /></div>}
                {pokemonList.length > 0 && <button onClick={this.onLoadMoreHandler} className={classes.main__nextPage}>Load More</button>}
            </div>
        );
    };
};

export default PokemonList;