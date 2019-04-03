/* global fetch */

import React, { Component, Fragment } from 'react'

class MainPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      'showLoading': true,
      'showError': false,
      activeID: 0,
      wrapperStyle: {
        backgroundImage: `url('${this.props.data[0].img}')`
      },
      panelStyle: {
        background: this.props.data[0].colour
      },
      buttonHover: false,
      buttonStyle: {
        color: '#ffffff'
      }
    }
    this.elements = []
  }

  componentDidMount () {
    fetch(`http://46.188.118.162:8082/types?name_en=${this.props.type}`)
      .then(response => response.json())
      .then(response => {
        console.log(response[0])
        response[0]
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

  _changeActive (id) {
    this.setState({
      activeID: id,
      wrapperStyle: {
        backgroundImage: `url('${this.props.data[id].img}')`
      },
      panelStyle: {
        backgroundColor: this.props.data[id].colour
      }
    })
  }
  _buttonColour () {
    if (!this.state.buttonHover) {
      this.setState({
        buttonHover: true,
        buttonStyle: {
          color: this.props.data[this.state.activeID].colour
        }
      })
    } else {
      this.setState({
        buttonHover: false,
        buttonStyle: {
          color: '#ffffff'
        }
      })
    }
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
    if (this.props.type === 'null') {
      return (
        <footer className='article'>
          <div className='container'>
            <h1> НОВОСТЕЙ НЕТ </h1>
            <div className='Nothing-news' />
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
      <Fragment>
        <div className='classs'>
          <section className='wrapper' style={this.state.wrapperStyle}>
            <Selectors
              data={this.props.data}
              activeID={this.state.activeID}
              _changeActive={this._changeActive.bind(this)}
            />
            <Panel
              data={this.props.data[this.state.activeID]}
              panelStyle={this.state.panelStyle}
              buttonStyle={this.state.buttonStyle}
              _buttonColour={this._buttonColour.bind(this)}
            />
          </section>

        </div>
        <div className='columns articles'>
          {this.elements}
        </div>
      </Fragment>
    )
  }
}

class Panel extends React.Component {
  render () {
    return (
      <aside className='panel' style={this.props.panelStyle}>
        <h2 className='panel-header'>{this.props.data.header}</h2>
        <p className='panel-info'>{this.props.data.body}</p>
        <button className='panel-button'
          style={this.props.buttonStyle}
          onMouseEnter={this.props._buttonColour}
          onMouseLeave={this.props._buttonColour}>
          Читать далее
        </button>
      </aside>
    )
  }
}
class Selectors extends React.Component {
  _handleClick (e) {
    if (this.props.id !== this.props.activeID) {
      this.props._changeActive(this.props.id)
    } else {

    }
  }
  render () {
    return (
      <div className='selectors'>
        {this.props.data.map((item) =>
          <Selector
            key={item.id}
            id={item.id}
            _handleClick={this._handleClick}
            _changeActive={this.props._changeActive}
            activeID={this.props.activeID}
          />
        )}
      </div>
    )
  }
}
class Selector extends React.Component {
  render () {
    let componentClass = 'selector'
    if (this.props.activeID === this.props.id) {
      componentClass = 'selector active'
    }
    return (
      <div className={componentClass} onClick={this.props._handleClick.bind(this)} />
    )
  }
}

export default MainPage
