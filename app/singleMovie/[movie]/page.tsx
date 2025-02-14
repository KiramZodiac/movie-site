'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'


interface MyMovie{
  
  Poster: string;
  Title: string;
  Year: string;
  Rated: string;
  Genre: string;
  Runtime: string;
  Plot: string;
  imdbRating:number;
  Writer:string;
  Released:string;
}


function SingleMovie() {
    const {movie} = useParams()
    const [singleMovie,setSingleMovie] = useState <MyMovie | null>  (null)
    // const [rating,setRating] = useState(singleMovie?.imdbRating)

useEffect(()=>{
    const fetchSingleMovie = async ()=>{
        const res = await fetch(`https://www.omdbapi.com/?i=${movie}&apikey=afafbc0e`)
        const data = await res.json()
        setSingleMovie(data)
        console.log(data);
        
    }
    
    fetchSingleMovie()
},[movie])

if(!singleMovie){
  return <div>Not Found</div>
}
const handleRating=(rate:number ) => {
const validRating = rate ? rate : 0;

const fullStars = Math.floor(validRating /2)
const halfStar = rate % 2 !==0;
const emptyStars = 5 - fullStars - (halfStar ? 1:0)

const stars =[
  
  ...Array(Math.max(0,fullStars)).fill("★"), // full stars
  ...Array(Math.max(0,halfStar ? 1 : 0)  ).fill("☆"), // half star
  ...Array(Math.max(0,emptyStars)).fill("☆"), // empty stars
]
return stars;

}

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
    <div className="max-w-5xl xl:max-w-6xl w-full bg-gray-800 rounded-lg shadow-lg p-6 xl:p-10">
      {/* Movie Poster & Details */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 xl:gap-12">
        <Image
          src={singleMovie.Poster || "/fallback.jpeg"}
          width={250}
          height={375}
          alt="movie poster"
          className="rounded-lg shadow-md w-48 h-auto sm:w-56 md:w-64 lg:w-72 xl:w-[100%]"
        />
        <div className="flex flex-col space-y-4 xl:space-y-6">
          <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold">{singleMovie.Title}</h1>
          <p className="text-gray-300 text-lg xl:text-xl">{singleMovie.Plot}</p>
          <div className="grid grid-cols-2 gap-4 md:gap-6 xl:gap-8 text-sm md:text-base xl:text-lg text-gray-400">
            <p><span className="font-semibold text-white">Year:</span> {singleMovie.Year}</p>
            <p><span className="font-semibold text-white">Rated:</span> {singleMovie.Rated}</p>
            <p><span className="font-semibold text-white">Genre:</span> {singleMovie.Genre}</p>
            <p><span className="font-semibold text-white">Runtime:</span> {singleMovie.Runtime}</p>

            <p><span className="font-semibold text-white">Released:</span> {singleMovie.Released}</p>

            <p><span className="font-semibold text-white">Writer:</span> {singleMovie.Writer}</p>

          
                
            <div className="flex gap-1 ">
            <span className="font-semibold text-white">Rating:</span>
                  {handleRating(singleMovie.imdbRating).map((star, index) => (
                    <span key={index} className="text-yellow-400 text-lg max-sm:pb-7 ">{star}</span>
                  ))}
                </div>
           
          </div>
         
        </div>
        
      </div>
    </div>
  </div>
  )
}

export default SingleMovie
