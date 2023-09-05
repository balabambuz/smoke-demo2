import React,{useEffect, useCallback} from 'react'
import {Container ,Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import AnimatedPage from '../components/AnimatedPage'
import { listPosts } from '../actions/mediaActions'
import Loader from '../components/Loader'
import Post from '../components/Post'
import Message from '../components/Message'
import Masonry from 'react-masonry-css'
import AOS from "aos";
import "aos/dist/aos.css";

function Display({keyword}) {

  const dispatch = useDispatch();
  const postList = useSelector(state => state.postList)
  const {error, loading, posts} = postList 

  


  useEffect(() => {
    dispatch(listPosts);
    AOS.init();
    AOS.refresh();
  }, [dispatch])

  const breakpointColumnsObj = {
    default: 3,
    600: 2,
  
  };

  const filteredPosts = posts.filter((post) => post.category === keyword);

  return (
  <AnimatedPage>

     <div>
    {loading ? <Loader/>
          : error ? <Message variant='danger' >{error}</Message>
                    
            :
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {filteredPosts.reverse().map(post => (
                <div data-aos="fade-up" key={post._id}>
                  <Post post={post}/>
                </div>
                ))}
          </Masonry>
          }
    </div> 
  </AnimatedPage>
  )
}

export default Display