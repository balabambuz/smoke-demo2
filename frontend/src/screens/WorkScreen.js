import {React, useState, useEffect} from 'react'
import Display from '../components/Display'
import Loader from '../components/Loader'
import Message from '../components/Message';
import Masonry from 'react-masonry-css';
import AnimatedPage from '../components/AnimatedPage';
import { useDispatch, useSelector } from 'react-redux'
import { listWorks } from '../actions/mediaActions'
import Post from '../components/Post';
import AOS from "aos";

function WorkScreen({history}) {
    const [lastPartOfUrl, setLastPartOfUrl] = useState('');
    let keyword = history.location.search

    const dispatch = useDispatch();
    const workList = useSelector(state => state.workList)
    const {error, loading, posts} = workList 

    
    const filteredPosts = posts.filter((post) => post.category === keyword);
    const breakpointColumnsObj = {
        default: 3,
        600: 2,
      
      };



    useEffect(() => {
        // Ottieni l'ultima parte dell'URL (dopo l'ultimo /)
        const urlParts = window.location.pathname.split('/');
        const lastPart = urlParts[urlParts.length - 1];

        // Aggiorna lo state con l'ultima parte dell'URL
        setLastPartOfUrl(lastPart);
        dispatch(listWorks);

        
    }, [dispatch]);

  

    

  return (
    <h1>lol</h1>
  )
}
export default WorkScreen