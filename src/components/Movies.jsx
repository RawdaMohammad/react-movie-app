import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Movie from './Movie';
import axios from "axios"
import AddMovie from './AddMovie';
import {v4 as uuid} from "uuid";
import useTopRated from '../hooks/useTopRated'

const Movies = () => {
    let [movies, setMovies] = useState([]);
    let [loading, setLoading] = useState(true);
    let [topRatedMovies ,topRated] = useTopRated(movies);

    const [activeTab, setActiveTab] = useState("all"); // "all" or "top"
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 6;

    const selectedMovies = activeTab === "all" ? movies : topRatedMovies;

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = selectedMovies.slice(indexOfFirstMovie, indexOfLastMovie);

    const totalPages = Math.ceil(selectedMovies.length / moviesPerPage);
    const pageNumbers = [...Array(totalPages).keys()].map(n => n + 1);

    useEffect(() => {
        axios.get("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9813ce01a72ca1bd2ae25f091898b1c7")
        .then((res) => {
            const moviesWithPosterUrls = res.data.results.map(movie => ({
                ...movie,
                poster_path: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            }));
            
            setMovies(moviesWithPosterUrls);
            setLoading(false);
        })
    }, []);

    let addNewMovie = useCallback((mData)=>{
        console.log("CallBack");
        setMovies([...movies, {...mData, id:uuid()}]);
    }, [movies]);

    // let addNewMovie = (mData)=>{
    //     console.log("CallBack");
    //     setMovies([...movies, {...mData, id:uuid()}]);
    // };

    let nMovies = useMemo(() => movies.length, [movies]);

    if(loading){return <div style={styles.loadingContainer}>Loading Movies.....</div>}
    
    return (
        
        <>
            <h1 style={{color:"white", marginBottom:"20px"}}>🎬 Movies 🍿</h1>
            <AddMovie addNewMovie={addNewMovie}></AddMovie>
            <h2  style={{color:"rgba(184, 184, 184)", margin:"30px"}}>Number of movies in the list: {nMovies}</h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
            <div
                style={{
                    cursor: "pointer",
                    borderBottom: activeTab === "all" ? "3px solid white" : "none",
                    paddingBottom: "5px",
                    color: activeTab === "all" ? "white" : "rgba(184, 184, 184)",
                    fontSize: "20px"
                }}
                onClick={() => {
                    setActiveTab("all");
                    setCurrentPage(1);
                }}
            >
                All Movies
            </div>
            <div
                style={{
                    cursor: "pointer",
                    borderBottom: activeTab === "top" ? "3px solid white" : "none",
                    paddingBottom: "5px",
                    color: activeTab === "top" ? "white" : "rgba(184, 184, 184)",
                    fontSize: "20px"
                }}
                onClick={() => {
                    setActiveTab("top");
                    setCurrentPage(1);
                    topRated();
                }}
            >
                Top Rated
            </div>
            </div>
            <div style={styles.container}>
                <Movie movies={currentMovies}></Movie>
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        style={{
                            margin: "5px",
                            padding: "8px 12px",
                            backgroundColor: currentPage === number ? "white" : "gray",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontWeight: currentPage === number ? "bold" : "normal",
                        }}
                        onClick={() => setCurrentPage(number)}
                    >
                        {number}
                    </button>
                ))}
            </div>

        </>
    );
}

export default Movies;


let styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '50px',
        padding: '20px',
        margin: "20px"
    }, 
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '20px'
    } 
};