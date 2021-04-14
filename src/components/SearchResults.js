import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './css/searchResults.css'
import { loadingSpinner } from './loadingSpinner'
import amazon_logo from '../images/amazon_logo.png'
import walmart_logo from '../images/walmart_logo.png'
import ebay_logo from '../images/ebay_logo.png'
import down_arrow from '../images/down_arrow.png'

export default function SearchResults(props) {

  const { search } = useParams()

  const [divHeight, setDivHeight] = useState(0)

  useEffect(() => {
    document.title = `Marketscrape | ${search}`
  }, [search])

  useEffect(() => {
    setDivHeight(document.querySelector("#search-results").offsetHeight)
  }, [props.amazonJSON, props.walmartJSON, props.ebayJSON])

  return (
    <div id="search-results" className="px-4 md:px-16 py-16">

      {/* Circles, they will be hidden unless the height of the screen can fit them */}
      <div className={`circle7 ${divHeight > 200 ? "" : "hidden"}`} />
      <div className={`circle8 ${divHeight > 100 ? "" : "hidden"}`} />
      <div className={`circle9 ${divHeight > 400 ? "" : "hidden"}`} />
      <div className={`circle10 ${divHeight > 750 ? "" : "hidden"}`} />
      <div className={`circle11 ${divHeight > 700 ? "" : "hidden"}`} />
      <div className={`circle12 ${divHeight > 900 ? "" : "hidden"}`} />
      <div className={`circle13 ${divHeight > 1200 ? "" : "hidden"}`} />
      <div className={`circle14 ${divHeight > 1500 ? "" : "hidden"}`} />
      <div className={`circle15 ${divHeight > 1600 ? "" : "hidden"}`} />
      <div className={`circle16 ${divHeight > 1750 ? "" : "hidden"}`} />
      <div className={`circle17 ${divHeight > 1750 ? "" : "hidden"}`} />
      <div className={`circle18 ${divHeight > 2000 ? "" : "hidden"}`} />


      <h1 className="flex mb-12 text-5xl font-light">Search results for {search} {props.loading && loadingSpinner()}</h1>

      {/* Amazon listings */}
      {(!props.loading || props.amazonJSON !== "") &&
        <>
          <a href={`https://www.amazon.com/s?k=${search}`} target="_blank" rel="noreferrer">
            <img src={amazon_logo} alt="Amazon" className="w-32 mb-4 transform hover:scale-105 duration-500" />
          </a>
          {props.amazonJSON === "Error" ?
            <p className="my-8 text-xl text-center ">We're sorry, no listings for <span className="font-bold">{search}</span> found.</p>
            :
            <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 gap-x-4 gap-y-8 pb-16">
              {Object.values(props.amazonJSON).map(({ name, price, link, image }) => {
                return (
                  <a key={image} href={`https://amazon.com${link}`} target="_blank" rel="noreferrer"
                    className="listings-container relative md:grid md:grid-cols-3 md:gap-4 h-min px-4 py-4 transition duration-300 ease-in-out">
                    <img src={image} alt={name} className="mx-auto my-auto mb-4 md:mb-0 px-2 py-2 bg-white rounded-lg transform hover:scale-105 duration-500"
                      style={{ maxHeight: '6em', maxWidth: '100%' }} />
                    <div className="col-span-2">
                      <p className="text-xs font-semibold">{name}</p>
                      <p className="font-bold">{price || "No price found"}</p>
                    </div>
                  </a>
                )
              })
              }
            </div >
          }
        </>
      }


      {/* Walmart listings */}
      {(!props.loading || props.walmartJSON !== "") &&
        <>
          <a href={`https://www.walmart.com/search/?query=${search}`} target="_blank" rel="noreferrer">
            <img src={walmart_logo} alt="Walmart" className="w-40 mb-4 transform hover:scale-105 duration-500" />
          </a>
          <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 gap-x-4 gap-y-8 pb-16">
            {Object.values(props.walmartJSON).map(({ name, price, link, image }) => {
              return (
                <a key={image} href={`https://walmart.com${link}`} target="_blank" rel="noreferrer"
                  className="listings-container relative md:grid md:grid-cols-3 md:gap-4 h-min px-4 py-4 transition duration-300 ease-in-out">
                  <img src={image} alt={name} className="mx-auto my-auto mb-4 md:mb-0 px-2 py-2 bg-white rounded-lg transform hover:scale-105 duration-500"
                    style={{ maxHeight: '6em', maxWidth: '100%' }} />
                  <div className="col-span-2">
                    <p className="text-xs font-semibold">{name}</p>
                    <p className="font-bold">{price || "No price found"}</p>
                  </div>
                </a>
              )
            })
            }
          </div >
        </>
      }

      {/* Ebay listings */}
      {/* <p>{props.ebayJSON}</p> */}
      {(!props.loading || props.ebayJSON !== "") &&
        <>
          <a href={`https://www.amazon.com/s?k=${search}`} target="_blank" rel="noreferrer">
            <img src={ebay_logo} alt="Ebay" className="w-32 mb-4 transform hover:scale-105 duration-500" />
          </a>
          {props.ebayJSON === "Error" ?
            <p className="my-8 text-xl text-center ">We're sorry, no listings for <span className="font-bold">{search}</span> found.</p>
            :
            <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 gap-x-4 gap-y-8 pb-16">
              {Object.values(props.ebayJSON).map(({ name, price, link, image }) => {
                return (
                  <a key={image} href={`${link}`} target="_blank" rel="noreferrer"
                    className="listings-container relative md:grid md:grid-cols-3 md:gap-4 h-min px-4 py-4 transition duration-300 ease-in-out">
                    <img src={image} alt={name} className="mx-auto my-auto mb-4 md:mb-0 px-2 py-2 bg-white rounded-lg transform hover:scale-105 duration-500"
                      style={{ maxHeight: '6em', maxWidth: '100%' }} />
                    <div className="col-span-2">
                      <p className="text-xs font-semibold">{name}</p>
                      <p className="font-bold">{price || "No price found"}</p>
                    </div>
                  </a>
                )
              })
              }
            </div >
          }
        </>
      }

      {/* Back button top left */}
      <button onClick={() => props.history.push('/')} className="absolute top-4 left-16 text-xl text-semibold focus:outline-none">
        <img src={down_arrow} alt="Back" className="w-10 h-10 transform rotate-90" /></button>
    </div>
  )
}
