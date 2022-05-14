import React, { useState,useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Button from './Button.jsx'


const HeroSlide = props => {

    const timeOut = props.timeOut ? props.timeOut : 3000;

    const [activeSlide,setActiveSlide] = useState(0);

    const nextSlide = useCallback(
      () => {
        const index = activeSlide + 1 === props.data.length ? 0 : activeSlide +1;
        setActiveSlide(index)
      },
      [activeSlide,props.data],
    )

    // const nextSlide = () =>{
    //     const index = activeSlide + 1 === props.data.length  ? 0 : activeSlide +1;
    //     setActiveSlide(index)
    // }
    
    const preSlide = () =>{
        const index = activeSlide -1 < 0 ? props.data.length -1 : activeSlide -1;
        setActiveSlide(index)
    }


    useEffect(() => {
      if(props.auto){
        const slideAuto = setInterval(()=>{
            nextSlide();
        },timeOut)
        return () => {
            clearInterval(slideAuto)
          }
      }
    }, [nextSlide,timeOut,props])
    
  return (
    <div className='hero-slide'>
        {
            props.data.map((item,index)=>(
                <HeroSlideItem 
                    key={index} item = {item}
                    active = {index===activeSlide}
                />
            ))
        }

        {
            props.control ? (
                <div className="hero-slide__control">
                    <div className="hero-slide__control__item" onClick={preSlide}>
                        <i className="bx bx-chevron-left"></i>
                    </div>

                    <div className="hero-slide__control__item">
                        <div className="index">
                            {activeSlide + 1} / {props.data.length}
                        </div>
                    </div>

                    <div className="hero-slide__control__item" onClick={nextSlide}>
                        <i className="bx bx-chevron-right"></i>
                    </div>
                </div>
            ) : null
        }
    </div>
  )
}

const HeroSlideItem = props => (
    <div className={`hero-slide__item ${props.active ? 'active' : ''}`}>
        <div className="hero-slide__item__info">
            <div className={`hero-slide__item__info-title color-${props.item.color}`}>
                <span>{props.item.title}</span>
            </div>
            <div className="hero-slide__item__info-description">
                <span>{props.item.description}</span>
            </div>
            <div className="hero-slide__item__info-button">
                <Link to={props.item.path}>
                    <Button
                        backgroundColor={props.item.backgroundColor}
                        icon="bx bx-cart"
                        animate={true}
                        // size="sm"
                    >
                        Xem chi tiết
                    </Button>
                </Link>
            </div>
        </div>
        <div className="hero-slide__item__image">
            <div className={`shape bg-${props.item.color}`}></div>
            <img src={props.item.img} alt="" />
        </div>
    </div>
)

HeroSlide.propTypes = {
    data : PropTypes.array.isRequired,
    control : PropTypes.bool,
    auto : PropTypes.bool,
    timeOut : PropTypes.number
}

export default HeroSlide