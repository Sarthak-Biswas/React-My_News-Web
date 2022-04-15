import React, { Component } from 'react'

export class NewsItems extends Component {
  static propTypes = {}

  render() {
    let { title, description, imageUrl, newsUrl, author, time, source } = this.props;
    return (
      <div className="card">
        <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex: 1, left: '89%'}}>
          {source}
          <span class="visually-hidden">unread messages</span>
        </span>
        <img src={imageUrl?imageUrl:"https://static9.depositphotos.com/1011646/1238/i/600/depositphotos_12382530-stock-photo-breaking-news-screen.jpg"} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(time).toGMTString()}</small></p>
          <a rel="noreferrer" href={newsUrl ? newsUrl : "/"} target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    )
  }
}

export default NewsItems