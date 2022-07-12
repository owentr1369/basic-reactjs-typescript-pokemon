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
  const [nextUrl, setNextUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)


  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=20')

      setNextUrl(res.data.next)

      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)

        setPokemons((p) => [...p, poke.data])

        setLoading(false)
      })
    }
    getPokemon()
  }, [])

  const loadMore = async () => {
    setLoading(true)

    let res = await axios.get(nextUrl);
    setNextUrl(res.data.next)
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)

      setPokemons((p) => [...p, poke.data])

      setLoading(false)
    })
  }

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <PokemonCollection pokemons={pokemons} />
        <div className="btn">
          <button onClick={loadMore}>{loading ? "Loading..." : "Load More"}</button>
        </div>
      </div>
    </div>
  );
}

export default App;
