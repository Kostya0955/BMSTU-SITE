import React, { Component } from 'react'
import Slider from 'react-slick'

export default class Rtl2 extends Component {
  render () {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2500,
      rtl: false
    }
    return (
      <div className='Slider-article'>
        <h2>Новости</h2>
        <Slider {...settings}>
          <div className='Article'>
            <img src='https://bulma.io/images/placeholders/128x128.png' />

            <h3>Новость </h3>

          </div>
          <div className='Article' >
            <img src='https://bulma.io/images/placeholders/128x128.png' />
            <h3>Новость 2</h3>
          </div>
          <div className='Article'>
            <img src='https://bulma.io/images/placeholders/128x128.png' />
            <h3>Новость 3</h3>
          </div>
          <div className='Article'>
            <img src='https://bulma.io/images/placeholders/128x128.png' />
            <h3>Новость 4</h3>
          </div>
          <div className='Article'>
            <img src='https://bulma.io/images/placeholders/128x128.png' />
            <h3>Новость 6</h3>
          </div>
          <div className='Article'>
            <img src='https://bulma.io/images/placeholders/128x128.png' />
            <h3>Новость 6</h3>
          </div>
        </Slider>
      </div>
    )
  }
}
