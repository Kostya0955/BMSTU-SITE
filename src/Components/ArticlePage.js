/* global fetch */

import React, { Component, Fragment } from 'react'

class ArticlePage extends Component {
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
        response[0]
          .articles
          .sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)
          .forEach(article => {
            if (article.is_active === true) {
              this.elements.push(
                <Fragment>
                  <div className='ArticleTitle'>
                    <h1 className='title'>{article.title_ru} </h1>
                  </div>
                  <div className='ArticleBody'>
                    {article.body_ru}
                  </div>
                </Fragment>
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
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      rtl: true
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
      <div className=' articles'>
        {this.elements[0]}
      </div>
    )
  }
}
export default ArticlePage
