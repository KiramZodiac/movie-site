// 'use client'
// import { Input } from '@/components/ui/input'
// import Image from 'next/image'
// import React, { useEffect, useState } from 'react'

// function Countries() {
//   const [countryData,setCountryData] = useState([])
//   const [serach,setSearch] = useState('')

//     useEffect(()=>{
//         const fetchMovie = async ()=>{
//             const res = await fetch('/api/movies')
//             const data = await res.json();
//             setCountryData(data.data)
            
//         }
//         fetchMovie()
//     },[])



    

//   return (
//     <div className=''>


//   <div className=' container  mx-auto p-4'>
//     <div className=' p-5 mb-5 w-96 items-center flex '>
//     <Input onChange={(e)=>setSearch(e.target.value)} className='justify-center flex items-center' placeholder='Search Country'/>
//     </div>

//     <div className=' grid grid-cols-4 gap-4'>
//       {countryData.map((country)=>(
        
//         <div className=' shadow-2xl gap-4 bg-white flex flex-col justify-center items-center p-4 rounded-lg'>
//           <h1 className=' text-4xl font-bold'>{country.name}</h1>
//         <div>
// <Image src={country.flag.trimStart()|| ""} width={300} height={300} alt='coutry Image'/>
//         </div>
//         </div>
//       ))}
//     </div>
//   </div>
//   </div>
//   )
// }

// export default Countries
