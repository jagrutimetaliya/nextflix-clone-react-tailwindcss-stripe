import React, {useState, useEffect} from 'react';
import requests from "./Requests";
import axios from "./axios";

function Banner() {
   const [movie,setMovie] = useState([]);
   useEffect(() => {
       async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals)
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
   }, [])
   
    function truncate(string, n){
    return string?.length > n?string.substr(0,n-1) + '...' : string;
  }
    return (
             <header className="" style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundPosition: "center center"}}>
            {/* <div className="">
                <h1 className="">{movie?.title || movie?.name || movie?.original_name }</h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <div className="banner__description">{truncate(movie?.overview,150)}</div>
            </div>
            <div className="banner--fadeButtom"/> */}
        </header>
    )
}

export default Banner
