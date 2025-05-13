import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from 'reactstrap'
import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData = [
   {
      imgUrl: weatherImg,
      title: `Calculate Weather`,
      desc: `This module calculates and displays real-time weather conditions based on geographic coordinates and current meteorological data.`,
   },
   {
      imgUrl: guideImg,
      title: `Best Tour Guide`,
      desc: `An intelligent tour guide system that provides personalized recommendations and detailed information about nearby attractions.`,
   },
   {
      imgUrl: customizationImg,
      title: 'Customization',
      desc: `A fully customizable interface that allows users to tailor features, themes, and functionality to their individual preferences.`,
   },
]

const ServiceList = () => {
   return <>
      {
         servicesData.map((item, index) => (
            <Col lg='3' md='6' sm='12' className='mb-4' key={index}>
               <ServiceCard item={item} />
            </Col>))
      }
   </>

}

export default ServiceList