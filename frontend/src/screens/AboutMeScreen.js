import React from 'react'
import Display from '../components/Display'
import { Row, Col } from 'react-bootstrap'

function AboutMeScreen() {
  return (
   <div>
  <Row>
  <Col xs={12} sm={12} md={6} lg={9} xl={9}>
    <Display keyword='aboutme1'/>
  </Col>

    <Col xs={12} sm={12} md={6} lg={10} xl={9}>
        <p>
        Born in Faenza in 2001, he is a digital artist and self-taught designer. in 2017 during his accounting studies he began to carry out various 
        commissions and to take more and more familiar with what is the Adobe suite. Continuing his studies in the branch of computer science, his 
        art becomes more and more focused on digital collage, with the aim of rendering more and more POP the vintage.
        </p>
    </Col>

    <Col xs={12} sm={12} md={6} lg={4} xl={3}>
    <Display keyword='aboutme2'/>
  </Col>

    
   </Row>
   </div>
  )
}

export default AboutMeScreen