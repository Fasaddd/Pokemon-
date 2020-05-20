import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v1 as uuid } from "uuid"
import { bindActionCreators } from 'redux';

import { changeModalStatus } from '../../store/action/action';
import { pokemonGetUrl, modalGetStatus } from '../../store/reselect/selector';
import classes from './PokemonDetail.module.scss';
import Loader from '../../components/Loader/Loader';

class PokemonDetail extends Component {

    state = {
        pokemonDetail: null,
        loading: false,
        showError: false,
        visibleDetail: false
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
        const { showDetail } = this.props;
        let displayDetail = 'flex';

        if(!showDetail) displayDetail = 'none'
        else displayDetail = 'flex';

        let outputDetail = <p>Choose pokemon to see details</p>;
        if (loading) outputDetail = <Loader />
        else if (showError) outputDetail = <p>Something goes wrong</p>
        else if (pokemonDetail !== null) {
            outputDetail = (
                <React.Fragment>
                    <span onClick={() => this.props.actions.changeModalStatus(false)} className={classes.close}>X</span>
                    <img src={pokemonDetail.img} alt="poknImg" className={classes.pokemonDetail__img} />
                    <h3>{pokemonDetail.name} #{pokemonDetail.id}</h3>emo
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
                <div className={classes.detail__wrapper} style={{display: displayDetail}}>
                    <div className={classes.pokemonDetail} >
                        {outputDetail}
                    </div>
                </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        pokemonUrl: pokemonGetUrl(state),
        showDetail: modalGetStatus(state)
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        {
            changeModalStatus
        },
        dispatch
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetail);