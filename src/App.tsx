import './App.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import PokemonCollection from './components/PokemonCollection'
import { Pokemon } from './interface'

interface Pokemons {
  name: string,
  url: string
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=20')
      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        console.log('poke.data :>> ', poke.data);
        setPokemons((p) => [...p, poke.data])
      })
    }
    getPokemon()
  }, [])

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <PokemonCollection pokemons={pokemons} />
      </div>
    </div>
  );
}

export default App;
