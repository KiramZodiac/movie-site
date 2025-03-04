'use client'
import { Input } from '@/components/ui/input'

import Image from 'next/image'
import Link from 'next/link'
import React, { ChangeEvent, useEffect, useState } from 'react'

interface MovieTypes {
    Title: string;
    imdbID: string;
    Year: number;
    Poster: string;
}

interface RandomBanner {
    Poster: string;
    Title: string;
    imdbID: string;
}

function Movies() {
const randomTitles = ['comedy','batman','sex','horror','romance','action']
const randomIndex = Math.floor(Math.random()* randomTitles.length)
let randTitle = randomTitles[randomIndex]




    const initialValue = randTitle
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState(initialValue);
    const [noMovies, setNoMovies] = useState('Loading...');
    const [randomBanner, setRandomBanner] = useState<RandomBanner | null>(null);
    const [isLoading,] = useState(false)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(`https://www.omdbapi.com/?apikey=afafbc0e&s=${search}`);
                const data = await res.json()

                if (data.Response === "True") {
                    setMovies(data.Search)
                } else {
                    setMovies([])
                    setNoMovies('No movies found')
                }
            } catch (error) {
                console.log('An error occurred', error)
            }
        }
        fetchMovies()
    }, [search])

    const resetSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setSearch(value === "" ? initialValue : value)
    }

    useEffect(() => {
        const getRandomBanner = async () => {
            const res = await fetch(`https://www.omdbapi.com/?apikey=afafbc0e&s=${search}`);
            const data = await res.json()

            if (data.Response === "True" && data.Search.length > 0) {
                const randomBanner = Math.floor(Math.random() * data.Search.length)
                const banner = data.Search[randomBanner]
                setRandomBanner(banner) // Set the random banner correctly
            }
        }

        const intervalId = setInterval(() => {
            getRandomBanner()
        }, 5000);

        return () => clearInterval(intervalId); 

    }, [search]);



    return (
        <div className='min-h-screen bg-gray-900 text-white p-4 flex flex-col'>
          
            {randomBanner && randomBanner.Poster && (
                <div
                    style={{
                        backgroundImage: `url(${randomBanner.Poster})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '300px',
                        width: '100%',
                        transition: 'background-image 1s ease-in-out', 
                    }}
                    className="random-movie-banner"
                >
                    {isLoading && <p>Loading...</p>} 
                </div>
            )}

            <div className='container mx-auto '>
                <div className='w-full md:w-[50%] flex justify-center items-center mx-auto mt-4 mb-10'>
                    <Input 
                        className='font-bold p-2 text-black bg-white rounded-md'
                        placeholder='Search Movie...' 
                        onChange={resetSearch} 
                    />
                </div>

                {movies.length > 0 ? (
              
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                        {movies.map((movie: MovieTypes) => (
                            <div
                                className='flex flex-col items-center bg-gray-800 rounded-lg shadow-md p-4'
                                key={movie.imdbID}
                            >
                                <Link href={`/singleMovie/${movie.imdbID}`}>
                                    <Image
                                        src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : "/fallback.jpeg"}
                                        width={250}
                                        height={375}
                                        alt={movie.Title}
                                        className="rounded-lg shadow-lg w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80"
                                    />
                                    <div className='text-center mt-4 w-full'>
                                        <h1 className='text-lg font-bold line-clamp-2'>{movie.Title}</h1>
                                        <p className='text-gray-400'>{movie.Year}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                 
                ) : (
                    <p className='text-center text-lg text-gray-400 mt-10'>{noMovies}</p>
                )}
            </div>
        </div>
    )
}

export default Movies
