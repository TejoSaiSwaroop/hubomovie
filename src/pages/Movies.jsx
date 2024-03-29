import React, {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getGenres } from '../store';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import NotAvailable from '../components/NotAvailable';
import SelectGenre from '../components/SelectGenre';


export default function Movies() {
    const [ isScrolled, setisScrolled] = useState(false);
    const navigate = useNavigate();
    const genresLoaded = useSelector((state)=> state.hubomovie.genresLoaded);
    const movies = useSelector((state) => state.hubomovie.movies);
    const genres = useSelector((state) => state.hubomovie.genres);
    const  dispatch = useDispatch();

  
  useEffect(()=>{
  dispatch(getGenres())
  },[]);
  
  useEffect(()=>{
    if(genresLoaded) dispatch(fetchMovies({type:"movies"}));
  },[dispatch, genresLoaded])
  
    window.onscroll = () => {
      setisScrolled(window.scrollY === 0 ? false : true);
      return () => (window.onscroll = null);
    };

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        //if (currentUser) navigate("/");
      })

  return (
    <Container>
        <div className="navbar">
            <Navbar isScrolled = {isScrolled} />
        </div>
       
                <div className="data">
                <SelectGenre genres={genres} type="movie" />
            {
                movies && movies.length ? <Slider movies={movies} /> : <NotAvailable />
            }
        </div>
    </Container>
  )
}

const Container = styled.div`
.data{
    margin-top: 8rem;
    .not-available{
        text-align: center;
        color:white;
        margin-top: 4rem;
    }
}
`;
