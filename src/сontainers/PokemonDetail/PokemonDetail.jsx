import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v1 as uuid } from "uuid"

import { pokemonGetUrl } from '../../store/reselect/selector';
import classes from './PokemonDetail.module.scss';
import Loader from '../../components/Loader/Loader';

class PokemonDetail extends Component {

    state = {
        pokemonDetail: null,
        loading: false,
        showError: false,
    };

    componentDidUpdate(prevProps) {
        const { fetchPokemonDetail, props } = this;
        if (prevProps.pokemonUrl !== props.pokemonUrl) {
            fetchPokemonDetail(props.pokemonUrl);
        };
    };

    fetchPokemonDetail = async (urlPokemon) => {
        try {
            this.setState({
                loading: true
            });
            const response = await fetch(`${urlPokemon}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const result = await response.json();
            const { name, stats, sprites, id } = result;

            this.setState({
                pokemonDetail: {
                    name: name,
                    img: sprites.front_shiny,
                    stats: [...stats],
                    id: id
                }
            });
        } catch (err) {
            this.setState({
                showError: true,
            });
        } finally {
            this.setState({
                loading: false
            });
        }
    };



    render() {
        const { pokemonDetail, loading, showError } = this.state;

        let showDetail = <p>Choose pokemon to see details</p>;
        if (loading) showDetail = <Loader />
        else if (showError) showDetail = <p>Something goes wrong</p>
        else if (pokemonDetail !== null) {
            showDetail = (
                <React.Fragment>
                    <img src={pokemonDetail.img} alt="pokemonImg" className={classes.pokemonDetail__img} />
                    <h3>{pokemonDetail.name} #{pokemonDetail.id}</h3>
                    {pokemonDetail.stats.map(el => (
                        <p className={classes.pokemonDetail__item} key={uuid()}>
                            <span className={classes.pokemonDetail__item_key}>{el.stat.name}</span>
                            <span className={classes.pokemonDetail__item_value}>{el.base_stat}</span>
                        </p>
                    ))}
                </React.Fragment>
            );
        };

        return (
            <div className={classes.detail__wrapper}>
                <div className={classes.pokemonDetail} >
                    {showDetail}
                </div>
            </div>

        );
    };
};

const mapStateToProps = state => {
    return {
        pokemonUrl: pokemonGetUrl(state)
    };
};

export default connect(mapStateToProps)(PokemonDetail);