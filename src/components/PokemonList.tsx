import './pokemon.css'
import { Detail } from '../App'
import { useState, useEffect } from 'react';

interface Props {
    detail: Detail;
    setDetail: React.Dispatch<React.SetStateAction<Detail>>;
    abilities:
    | {
        name: string;
        ability: string;
    }[]
    | undefined;
    name: string,
    id: number,
    image: string
}

const PokemonList: React.FC<Props> = (props) => {
    const { name, id, image, abilities, detail, setDetail } = props

    const [selected, setSelected] = useState(false);

    const closeDetail = () => {
        setDetail({
            id: 0,
            isOpened: false
        })
    }
    useEffect(() => {
        setSelected(id === detail?.id)
    }, [detail])


    return (
        <div>
            {selected ? (
                <section className="pokemon-list-detailed">
                    <div className="detail-container">
                        <p className="detail-close" onClick={closeDetail}>
                            X
                        </p>
                        <div className="detail-info">
                            <img src={image} alt="pokemon" className="detail-img" />
                            <p className="detail-name"> {name}</p>
                        </div>
                        <div className="detail-skill">
                            <p className="detail-ability"> Ablities: </p>
                            {abilities?.map((ab: any) => {
                                return <div className=""> {ab.ability.name}</div>;
                            })}
                        </div>
                    </div>
                </section>
            ) : (<section className="pokemon-list-container">
                <p className="pokemon-name">
                    {name}
                </p>
                <img src={image} alt="" />
            </section>)}

        </div>
    )
}

export default PokemonList