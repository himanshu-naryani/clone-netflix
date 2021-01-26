import axios from './axios';
import React, { useEffect, useState } from 'react';
import requests from './requests';
import './Banner.css'

function Banner(props) {
    console.log('INSIDE BANNER')
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals)
            //console.log(request.data.results[0])
            //console.log(request.data.results[Math.floor(Math.random() * (request.data.results.length - 1))])
            setMovie(
                request.data.results[Math.floor(Math.random() * (request.data.results.length - 1))]
            )
        }
        fetchData();
    }, [])

    console.log(movie);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;            //Truncate the description if its too long by --> '...'
    }

    return (

        <header className='banner'          //<<< Background Image 
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url(
                    'https://image.tmdb.org/t/p/original/${movie.backdrop_path}'
                )`,
                backgroundPosition: 'center center'
            }}>
            <div className='banner__contents'>
                <h1 className='banner__title'>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className='banner__buttons'>
                    <button className='banner__button'>Play</button>
                    <button className='banner__button'>My List</button>
                </div>

                <h1 className='banner__description'>
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>

            <div className='banner__fadeBottom'></div>

            {/* Title */}
            {/* Div > 2 Buttons */}
            {/* Description */}
            {/* Fade at bottom of banner */}
        </header>
    );
}

export default Banner;