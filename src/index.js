import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './styles.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import logo from './img/logo.png'
import Navigation from './Components/Navigation.js'
import data from './Components/data.js'
import './Carousel.scss'
import MainPage from './Components/MainPage.js'
import ArticlePage from './Components/ArticlePage.js'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
  }
  componentDidMount () {
    fetch('http://46.188.118.134:8082/types?name_en=News')
      .then(response => response.json())
      .then(parsJSON => {
        console.log(parsJSON)
        this.setState({
          items: parsJSON
        })
      })
  }
  render () {
    return (
      <div>
        <section className='hero is-primary'>
          <div className='container'>
            <div className='navbar-brand'>
              
              <figure className='image is-128x128'>
                <img src={logo} />
              </figure>
            
              <h1 className='title'>
              Факультет <br />Международных образовательных<br /> программ <br />МГТУ им. Н.Э.Баумана
              </h1>
              <div className = 'headButtons'> 
              <a class="button">Button</a>
              <a class="button">Button</a>
              <a class="button">Button</a>
              </div>
            </div>
          </div>
          <div className='FootHeader'>
            <Navigation type='header' />
          </div>
        </section>
        {/* <MainPage type='News'  data={data}/> */}
        <ArticlePage type = 'News'/>
        {/* footer */}
        <footer className='footer'>
          <Navigation type='footer' />
          <div className='container'>
            <div className='columns'>
              <div className='column is-3 is-offset-2'>
                <h2>
                  <strong>
                    &copy;2019 Факультет Международных Образовательных Программ <br />
                  </strong>
                  <p>
                    При использовании материалов портала активная ссылка на источник обязательна
                  </p>
                </h2>
              </div>
              <div className='column is-3'>
                <h2>
                  <i className='fas fa-map-marker-alt' />
                  <strong> Контакты  </strong>
                </h2>
                <ul>
                  <li> ул. 2-ая Бауманская 5  </li>
                  <i className='fas fa-envelope' />
                  <a> dekanatfmop.bmstu@gmail.com</a>
                  <li> Контактный телефон: <br /> </li>
                  <i className='fas fa-phone' /> +7 (499) 267-00-82
                </ul>
              </div>
              <div className='column is-4'>
                <h2><strong>Мы в соц. сетях</strong></h2>
                <a href='https://vk.com/public140853361'><i className='fab fa-vk' /></a>
                <a href='https://www.facebook.com/groups/1430811973892911/'><i className='fab fa-facebook-f' /></a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
