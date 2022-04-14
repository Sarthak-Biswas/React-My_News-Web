import React, { Component } from 'react'

export class NewsItems extends Component {
  static propTypes = {}

  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    return (
      <div className="card">
        <img src={imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a rel="noreferrer" href={newsUrl?newsUrl:"https://static9.depositphotos.com/1011646/1238/i/600/depositphotos_12382530-stock-photo-breaking-news-screen.jpg"} target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    )
  }
}

export default NewsItems