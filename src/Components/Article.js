/* global fetch */

import React, { Component } from 'react'
import Slider from 'react-slick'

class Articles extends Component {
  constructor (props) {
    super(props)
    this.state = {
      'showLoading': true,
      'showError': false
    }
    this.elements = []
  }

  componentDidMount () {
    fetch(`http://46.188.118.162:8082/types?name_en=${this.props.type}`)
      .then(response => response.json())
      .then(response => {
        response
          .pop()
          .articles
          .sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)
          .forEach(article => {
            if (article.is_active === true) {
              this.elements.push(
                <div className='column is-3'>
                  <div className='card'>
                    <div className='card-image'>
                      <figure className='image is-4by3'>
                        <img src={`http://46.188.118.162:8082/${article.poster.url}`} />
                      </figure>
                    </div>
                    <div className='card-content'>
                      {article.title_ru}
                    </div>
                  </div>
                </div>
              )
            }
          })
        this.setState({
          'showLoading': false,
          'showError': false
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({
          'showLoading': false,
          'showError': true
        })
      })
  }

  render () {
    if (this.props.type === 'null') {
      return (
        <footer className='article'>
          <div className='container'>
            <h1> НОВОСТЕЙ НЕТ </h1>
            <div className = 'Nothing-news'>

            </div>
          </div>
        </footer>
      )
    }
    if (this.state.showLoading === true) {
      return (
        <p>Loading</p>
      )
    }
    if (this.state.showError === true) {
      return (
        <p>Error</p>
      )
    }
    return (
      <div className='columns articles'>
        {this.elements}
      </div>
    )
  }
}

export default Articles
