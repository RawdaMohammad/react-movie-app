import React, { useCallback, useState } from 'react';

const UseTopRated = (movies) => {
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    
    let topRated = useCallback(()=>{
        setTopRatedMovies(movies.filter(movie => movie.vote_average >= 7));
    })
    return [topRatedMovies, topRated];
}

export default UseTopRated;
