import React from 'react';
import Classes from '../styles/Movie.module.css'
const Movie = ({movies}) => {
    return (
        <>
            {
                movies.map((mve)=>(
                    <div className={Classes.card} key={mve.id}>
                        <img src={mve.poster_path} alt={mve.title} className={Classes.image}></img>
                        <h2>{mve.title}</h2>
                        <h3>{mve.vote_average} / 10 ⭐</h3>
                    </div>
                ))

            }
        </>

    );
}

export default Movie;
