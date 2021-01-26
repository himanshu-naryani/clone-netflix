import React, { useEffect, useState } from 'react';
import axios from './axios';
import './Row.css'

import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = 'https://image.tmdb.org/t/p/original/';

function Row(props) {
    const [movies, setMovies] = useState([]);

    const [trailerUrl, setTrailerUrl] = useState('')

    useEffect(() => {

        async function fetchData() {
            const request = await axios.get(props.fetchUrl);
            setMovies(request.data.results)
            return request;
            // fetchUrl is a dependency for useEffect -> as it can make diff axios calls & hence can change 
            // the whole data which we get from api Therefore, whenever it changes -> useEffect should be called again
        }
        fetchData();

    }, [props.fetchUrl])             //calling useEffect again when fetchUrl changes

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        }
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        }
        else {
            movieTrailer(movie?.name || '')         //Gives you the trailer from Youtube of any movie name
                .then(url => {

                    // Example: https://www.youtube.com/watch?v=XtMThy8QKqU
                    // urlParams --> {'v': 'XtMThy8QKqU'}
                    // urlParams.get('v') --> XtMThy8QKqU === TrailerUrl which we want to give in <Youtube />
                    const urlParams = new URLSearchParams(new URL(url).search)
                    setTrailerUrl(urlParams.get('v'));

                })
                .catch(error => console.log(error))
        }
    }

    return (
        <div className="row">
            <h2 style={{ color: 'white' }}>{props.title}</h2>

            <div className='row__posters'>
                {
                    movies.map(movie => (
                        <img
                            key={movie.id}
                            onClick={() => handleClick(movie)}
                            className={`row__poster ${props.isLargeRow && 'row__posterLarge'}`}
                            // Adding extra class -> isLargeRow is true
                            src={`${base_url}${props.isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            // Changing url to fetch poster img if isLargeRow is true
                            alt={movie.name}
                        >

                        </img>
                    ))
                }
            </div>

            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}

        </div>
    );
}

export default Row;