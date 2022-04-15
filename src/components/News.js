import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Loader from './Loader';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor() {
    super();
    console.log("This is a constructor")
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      api: "26d4e654458d4963bfe97214c0ad6b06",
      size: 0
    }
  }

  goNext = async () => {
    console.log("Next");
    if (this.state.page + 1 > Math.ceil(this.state.size / this.props.pageSize) || (this.state.page + 1) * (this.props.pageSize) > 100) {

    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true })
      let data = await fetch(url);
      let parsedData = await data.json();

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      })
    }
  }

  goPrevious = async () => {
    console.log("Previous");


    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
      size: 0
    })
  }

  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true })
      let data = await fetch(url);
      let parsedData = await data.json();

      this.setState({
        page: this.state.page + 1,
      articles: this.state.articles.concat(parsedData.articles),
        loading: false,
      })
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    console.log(url);
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({ articles: parsedData.articles, size: parsedData.totalResults, loading: false })
    console.log(this.state.size)
  }

  render() {
    return (
      <>
        <h1 className='text-center my-3'>Sarthak News - Top Headlines</h1>
        {this.state.loading && <Loader />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.size}
          loader={<Loader/>}
        >
          <div className="container my-3">
          <div className="row">
            {this.state.articles.map((elements) => {
              return <div className="col-md-4" key={elements.url}>
                <NewsItems title={elements.title ? elements.title : ""} description={elements.description ? elements.description : ""} imageUrl={elements.urlToImage ? elements.urlToImage : ""} newsUrl={elements.url} author={elements.author} time={elements.publishedAt} source={elements.source.name} />
              </div>

            })}
          </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between my-3">
              <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.goPrevious}>&#8592; Previous</button>
              <button disabled={(this.state.page+1)*(this.props.pageSize)>100} type="button" className="btn btn-dark" onClick={this.goNext}>Next &#8594;</button>
            </div> */}

      </ >
    )
  }
}

export default News