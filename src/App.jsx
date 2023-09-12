import { useState, useEffect } from 'react'
import { fetchDatafromAPI } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApplicationConfiuration, getGenre } from './store/homeslice'
import './App.css'

import Header from './components/header/header'
import Footer from './components/footer/footer'
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import Explore from './pages/explore/Explore'
import SearchResults from './pages/searchResults/SearchResults'
import NOTFOUND from './pages/404/404'

import { Route, Routes, BrowserRouter } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home)

  useEffect(() => {
    fetchapiconfig();
    genresCall();
  }, [])

  const fetchapiconfig = () => {
    fetchDatafromAPI('/configuration')
      .then((res) => {
        console.log(res);
        const url={
          backdrop:res.images.secure_base_url +"original",
          profile:res.images.secure_base_url +"original",
          poster:res.images.secure_base_url +"original",
        }
        dispatch(getApplicationConfiuration(url));
      })
  }

  const genresCall=async()=>{
    let promises=[]
    let endpoints=["tv","movie"]
    let allGenres={}

    endpoints.forEach((url)=>{
      promises.push(fetchDatafromAPI(`/genre/${url}/list`))
    })

    const data=await Promise.all(promises);
    console.log(data);
    data.map(({genres})=>{
      return genres.map((item)=>(allGenres[item.id]=item))
    })
    dispatch(getGenre(allGenres));
  }
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/:mediaType/:id' element={<Details />} />
          <Route path='/search/:query' element={<SearchResults />} />
          <Route path='/explore/:mediaType' element={<Explore />} />
          <Route path='*' element={<NOTFOUND />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
