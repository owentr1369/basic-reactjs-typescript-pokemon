import { Pokemon, PokemonDetail } from "../interface";
import { Detail } from '../App'
import PokemonList from "./PokemonList";
import './pokemon.css'

interface Props {
    pokemons: PokemonDetail[];
    detail: Detail
    setDetail: React.Dispatch<React.SetStateAction<Detail>>
}

const PokemonCollection: React.FC<Props> = (props) => {
    const { pokemons, detail, setDetail } = props;
    const selectPokemon = (id: number) => {
        if (!detail.isOpened) {
            setDetail({
                id: id,
                isOpened: true
            })
        }
    }
    return (
        <div>
            <section className={detail.isOpened ? 'collection-container-active' : 'collection-container'}>
                {detail.isOpened ? (<div className="overlay"></div>) : ""}
                {pokemons.map((pokemon) => {
                    return (
                        <div onClick={() => selectPokemon(pokemon.id)}>
                            <PokemonList key={pokemon.id} name={pokemon.name} id={pokemon.id} image={pokemon.sprites.front_default} abilities={pokemon.abilities} detail={detail} setDetail={setDetail} />
                        </div>
                    );
                })}
            </section>
        </div>
    );
};

export default PokemonCollection;
