import React, {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getGenres } from '../store';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import SelectGenre from '../components/SelectGenre';


export default function TVShows() {
    const [ isScrolled, setisScrolled] = useState(false);
    const genresLoaded = useSelector((state)=> state.hubomovie.genresLoaded);
    const movies = useSelector((state) => state.hubomovie.movies);
    const genres = useSelector((state) => state.hubomovie.genres);

    const  navigate = useNavigate();
    const  dispatch = useDispatch();

  
  useEffect(()=>{
    if(!genres?.length)  dispatch(getGenres()); 
  },[dispatch, genres?.length]);
  
  useEffect(()=>{
    if(genresLoaded)
     { 
      dispatch(fetchMovies({ genres, type:"tv" }))
    };
    },[dispatch, genres, genresLoaded])
  
// eslint-disable-next-line no-unused-vars
const [user,setUser]  = useState(undefined);

    onAuthStateChanged(firebaseAuth, (currentUser) => {
       if (currentUser) setUser(currentUser.uid);
        else navigate("/login");
      })

      window.onscroll = () => {
        setisScrolled(window.scrollY === 0 ? false : true);
        return () => (window.onscroll = null);
      };

      return (
        <Container>
          <Navbar isScrolled={isScrolled} />
          <div className="data">
            <SelectGenre genres={genres} type="tv" />
            {movies.length ? (
              <>
                <Slider movies={movies} />
              </>
            ) : (
              <h1 className="not-available">
                No TV Shows available for the selected genre. Try another
                 genre.
              </h1>
            )}
          </div>
        </Container>
      );
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
