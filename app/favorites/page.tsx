'use client'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useToast } from '@/hooks/use-toast';
interface MyMovie {
  Poster: string;
  Title: string;
  Year: string;
  Rated: string;
  Genre: string;
  Runtime: string;
  Plot: string;
  imdbRating: number;
  Writer: string;
  Released: string;
  imdbID:string
}



function Favs() {
  const [favorites,setFavourites] = useState<MyMovie[]>([])

const {toast} = useToast()

useEffect(()=>{
  const savedMovie = JSON.parse(localStorage.getItem('favs')|| "[]")
  console.log(savedMovie);
  setFavourites(savedMovie)
},[])


const removeMovie =(imdbID:string)=>{

const favorites = JSON.parse(localStorage.getItem('favs') || "[]")

if(!Array.isArray(favorites)){
  console.error('Invalid data in localStorage')
  localStorage.removeItem('favs')
  return;
  
}

const updatedList = favorites.filter((movie)=> movie.imdbID !== imdbID)
setFavourites(updatedList)
localStorage.setItem('favs',JSON.stringify(updatedList))

console.log(`${imdbID} removed`);


}



  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4">
    <h1 className="text-3xl font-bold text-center mb-6">My Favorite Movies</h1>

    {favorites.length === 0 ? (
      <p className="text-center text-gray-400">No favorite movies added yet.</p>
    ) : (
      <div className="grid gap-8 md:gap-12 max-w-6xl mx-auto">
        {favorites.map((movie) => (
          <div
            key={movie.imdbID}
            className="flex flex-col md:flex-row items-center gap-6 bg-gray-800 p-6 rounded-lg shadow-lg transition hover:shadow-xl"
          >
            {/* Movie Poster */}
            <Image
              src={movie.Poster || "/fallback.jpeg"}
              width={250}
              height={375}
              alt={`${movie.Title} poster`}
              className="rounded-lg shadow-md w-48 sm:w-56 md:w-64 xl:w-[25%]"
            />

            {/* Movie Details */}
            <div className="flex flex-col flex-1 space-y-4">
              <h2 className="text-2xl font-semibold">{movie.Title}</h2>
              <p className="text-gray-300 text-base md:text-lg">{movie.Plot}</p>

              {/* Movie Info */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm md:text-base text-gray-400">
                <p>
                  <span className="font-semibold text-white">Year:</span> {movie.Year}
                </p>
                <p>
                  <span className="font-semibold text-white">Rated:</span> {movie.Rated}
                </p>
                <p>
                  <span className="font-semibold text-white">Genre:</span> {movie.Genre}
                </p>
                <p>
                  <span className="font-semibold text-white">Runtime:</span> {movie.Runtime}
                </p>
                <p>
                  <span className="font-semibold text-white">Released:</span> {movie.Released}
                </p>
                <p>
                  <span className="font-semibold text-white">Writer:</span> {movie.Writer}
                </p>
              </div>

              {/* Remove Button */}
              <div className="flex justify-start mt-4">
                <Button
onClick={()=> {
  removeMovie(movie.imdbID) 
  toast({
    
    title:'Remove From Favorites',
    description:`${movie.Title} Removed`
  })
}}
 variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-600 hover:text-white"
                >
                  Remove From Favorites
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>



    
  )}




export default Favs
