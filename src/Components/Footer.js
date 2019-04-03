import React from 'react'
import Navigation from './Navigation.js'
import Collapse from 'react-css-collapse'
import { CSSTransitionGroup } from 'react-transition-group'
class Footer extends React.Component {
  constructor (props) {
    super(props)
    this.state = { show: false }
    this.onShow = this.onShow.bind(this)
    this.state = { animatedClass: '' }
  }
  componentDidMount () {
    setTimeout(() => this.setState({
      animatedClass: 'animated'
    }), 0)
  }

  onShow () {
    this.setState({
      show: !this.state.show
    })
  }
  render () {
    return (
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
    )
  }
}
export default Footer
