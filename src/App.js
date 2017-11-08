import React, { Component } from 'react'
import Request from 'superagent'
import formatDate from './formatdate'
import weatherToEmoji from './weather'
import './App.css'

const KEY = window.location.pathname
const ENDPOINT = 'https://gyaon.herokuapp.com'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      src: `${ENDPOINT}/sounds${KEY}`,
      lastmodified: '',
      comment: '',
      lat: '',
      lon: '',
      address: '',
      weatherIcon: '',
      url: ''
    }
  }

  componentWillMount() {
    Request
      .get(`${ENDPOINT}/info${KEY}`)
      .then(res => {
        this.setState({
          lastmodified: res.body.lastmodified,
          comment: res.body.comment,
          lat: res.body.lat,
          lon: res.body.lon,
          address: res.body.address,
          weatherIcon: res.body.weatherIcon,
          url: res.body.url
        })
      })
  }

  render() {
    const mapBackGround = <div
                            style={{
                              width: '100%',
                              height: '300px',
                              backgroundColor: '#E5E3DF',
                              position: 'absolute',
                              zIndex: '-1'
                            }}></div>
    const map = this.state.lat ?
                <iframe
                  title='map'
                  width='100%'
                  height="300px"
                  frameBorder="0"
                  style={{border:'0'}}
                  src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyAZoPhXhjGT96lRSUvNxniWWQKyUbKw44U&zoom=15&center=${this.state.lat},${this.state.lon}`}
                  allowFullScreen >
                </iframe> : ''
    const pin = <div
                  className="Pin"
                  style={{
                    top: '120px',
                    left: '48%',
                    position: 'fixed',
                    zIndex: '10',
                    fontSize: '30px'
                  }} >
                  📍
                </div>
    const comment = <div className='metadata'>
                      <div className="description">コメント</div>
                      {this.state.comment}
                    </div>
    const weather = <div className='metadata'>
                      <div className="description">天気</div>
                      {weatherToEmoji(this.state.weatherIcon)}
                    </div>
    const address = <div className='metadata'>
                      <div className="description">位置</div>
                      {this.state.address}付近
                    </div>
    const lastmodified =  <div className='metadata'>
                            <div className="description">日時</div>
                            {formatDate(this.state.lastmodified)}
                          </div>
    const link =  <div className='metadata'>
                    <div className="description">見ていたページ</div>
                    <a href={this.state.url}>{this.state.url}</a>
                  </div>
    return (
      <div className="App">
        {mapBackGround}
        {map}
        {pin}
        {comment}
        {weather}
        {address}
        {lastmodified}
        {link}
        <audio
          style={{
            bottom: '0',
            width: '100%',
            position: 'absolute'
          }}
          src={this.state.src}
          controls='true'
          autoPlay />
      </div>
    )
  }
}

/*

{
  _id: "5a02d50e3de4df5156b337a5",
  key: "satake/c31bf654d8d1a4dbdbbb4d27838f929d.wav",
  lastmodified: "2017-11-08T09:57:34.653Z",
  name: "c31bf654d8d1a4dbdbbb4d27838f929d.wav",
  size: 204844,
  user: "satake",
  comment: "openweathermapについて",
  lat: 35.3878984,
  lon: 139.4256024,
  weatherIcon: "50n",
  url: "https://scrapbox.io/satake-bookmarks/Weather Conditions - OpenWeatherMap",
  __v: 0
}

*/

export default App
