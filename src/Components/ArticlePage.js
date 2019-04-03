/* global fetch */

import React, { Component, Fragment } from 'react'
import Articles from './Article'

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
    fetch(`http://46.188.118.162:8082/articles?id=${this.props.match.params.id}`)
      .then(response => response.json())
      .then(response => {
        this.elements.push(
          <Fragment>
            <div className='ArticleTitle'>
              <h1 className='title'>{response.title_ru} </h1>
            </div>
            <div className='ArticleBody'>
              {response.body_ru}
            </div>
          </Fragment>
        )
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
        <Articles type="News" />
        {this.elements[0]}
      </div>
    )
  }
}
export default ArticlePage
