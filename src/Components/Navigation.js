/* global fetch */

import React, { Component, Fragment } from 'react'

class Navigation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      'showLoading': true,
      'showError': false,
      'showMenuContent': null
    }
    
    this.elements = []
    this.menuContent = new Map([[null, '']])
  }

  componentDidMount () {
    fetch(`http://46.188.118.162:8082/navigations?type=${this.props.type}`)
      .then(response => response.json())
      .then(response => {
        const map = new Map()
        response
          .sort((a, b) => a.position === b.position ? a.subposition - b.subposition : a.position - b.position)
          .forEach(item => {
            const { name_ru, name_en, position, subposition, id } = item
            const articleId = item.hasOwnProperty('article') === true ? item.article.id : null
            if (map.has(position) === false) {
              map.set(position, [])
            }
            map.get(position).push({
              name_ru,
              name_en,
              subposition,
              articleId,
              id
            })
          })
        map.forEach(item => {
          if (item.length === 1) {
            this.elements.push(
              <a className='navbar-item'>{item.pop().name_ru}</a>
            )
          } else {
            if (this.props.type === 'footer') {
              const first = item.shift()
              this.elements.push(
                <a className='navbar-link' onClick={() => this.setState({ 'showMenuContent': this.state.showMenuContent === first.id ? null : first.id })}>{first.name_ru}</a>
              )
              this.menuContent.set(first.id, (
                <div className='footer-column'>
                  {
                    item.map(subItem => <a>{subItem.name_ru}</a>)
                  }
                </div>
              ))
            } else {
              this.elements.push(
                <div className='navbar-item has-dropdown is-hoverable'>

                  <a className='navbar-link'>{item.shift().name_ru}</a>

                  <div className='navbar-dropdown'>
                    {
                      item.map(subItem => <a className='navbar-item'>{subItem.name_ru}</a>)
                    }
                  </div>
                </div>
              )
            }
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
      <Fragment>
        <div className='navbar'>
          <div className='navbar-menu'>
            <div class='footerBar'>
              {this.elements}
          </div>
          </div>
        </div>
        {this.menuContent.get(this.state.showMenuContent)}
      </Fragment>
    )
  }
}

export default Navigation
