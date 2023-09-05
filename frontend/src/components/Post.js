import {React, useState} from 'react'
import { Row,Col,Card,Modal,Image,Carousel,Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'


function Post({ post }) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let history = useHistory()

  const historyClick = () => {
    history.push(`/work/?keyword=${post.name}`)
  }

  //mostra il MODALE
  return (
    <div>
    <Card>
          <Card.Img src={post.image} onClick={handleShow}/>
    </Card>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{post.name}</Modal.Title>
        </Modal.Header>
        <p className='m-3'>by: {post.username} </p>
        <Modal.Body>
         { post.image2 ? ( 
          <Carousel pause='hover' className='bg-dark' id='post-carousel'>
          <Carousel.Item>
              <Image src={post.image} fluid/>  
          </Carousel.Item>
          <Carousel.Item>
              <Image src={post.image2} fluid/>  
          </Carousel.Item>
          {post.image3 && 
          <Carousel.Item>
              <Image src={post.image3} fluid/>  
          </Carousel.Item>
          }
        </Carousel>
         ):(
          <Image src={post.image} style={{width:'420px', borderRadius:'10px'}}></Image>
         )}
         {post.description && 
         <p id='modal-text' >{post.description}</p>
        }

          
        </Modal.Body>
        <Modal.Footer id='modal-text'>
        {post.category === 'works' && 
        <Button onClick={historyClick}>see more...</Button>
        }
        </Modal.Footer>
      </Modal>
    </div>

  )
}

export default Post
