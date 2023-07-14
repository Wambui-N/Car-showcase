"use client"

import { Hero, SearchBar, CustomFilter, CarCard, ShowMore } from "@/components";
import { fetchCars } from "@/utils";
import Image from "next/image";
import { CarProps, FilterProps } from "@/types";
import { fuels, yearsOfProduction } from "@/constants";
import { useEffect, useState } from "react";

interface HomeProps {
  searchParams: FilterProps
}

export default function Home({searchParams}: HomeProps) {
  //cars state
  const [allCars, setAllCars] = useState([])
  const [loading, setLoading] = useState(false)

  //search state
  const [manufacturer, setManufacturer] = useState("")
  const [model, setModel] = useState("")

  //filter state
  const [fuel, setFuel] = useState("")
  const [year, setYear] = useState(2022)

  //pagination state
  const [limit, setLimit] = useState(10)

  //fetch cars
  const getCars = async () => {
    try{
      const result = await fetchCars({
        manufacturer: manufacturer || "",
        year: year || 2019,
        fuel: fuel || "",
        limit: limit || 10,
        model: model || "",}
      );

      setAllCars(result)
    }
    catch(error){
      console.log(error)
    }
    finally{
      setLoading(false)
    }
    
  }


  useEffect(() => {
    getCars()
    console.log(manufacturer, model, fuel, year, limit)

  }, [manufacturer, model, fuel, year, limit])

  

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like.</p>
        </div>
        <div className="home__filters">
          <SearchBar
            setManufacturer={setManufacturer}
            setModel={setModel}
          />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFilter= {setFuel} />
            <CustomFilter title="year" options={yearsOfProduction} setFilter= {setFuel} />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

              {loading && (
                <div className="mt-16 w-full flex-center">
                  <Image
                    src="/loading.svg"
                    alt="loading"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
              )}

            <ShowMore
              pageNumber = { limit / 10}
              isNext={ limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl">Oops, no cars found!</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
