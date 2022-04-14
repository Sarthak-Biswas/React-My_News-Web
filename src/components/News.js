import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Loader from './Loader';


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

  constructor(){
    super();
    console.log("This is a constructor")
    this.state ={
      articles : [],
      loading : false,
      page: 1
    }
  }
  goNext = async ()=>{
    console.log("Next");
    if(this.state.page +1 > Math.ceil(this.state.size/20) || (this.state.page+1)*20>100)
    {

    }
    else{
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0a1ae2b1c8cd4ee7b20329c4d63faf61&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
      let data = await fetch(url);
      let parsedData = await data.json();

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })
    }
    
  }
  goPrevious = async ()=>{
    console.log("Previous");


    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0a1ae2b1c8cd4ee7b20329c4d63faf61&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: this.state.page -1 ,
      articles: parsedData.articles,
      loading: false
    })
  }
  async componentDidMount()
  {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0a1ae2b1c8cd4ee7b20329c4d63faf61&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    console.log(url);
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({articles: parsedData.articles, size: parsedData.totalResults, loading: false})
  }
  render() {
    return (
      <div className='container my-3'>
          <h1 className='text-center'>My News - Top Headlines</h1>
          {this.state.loading && <Loader/>}
          <div className="row">
          {!this.state.loading && this.state.articles.map((elements)=>{
            return <div className="col-md-4" key={elements.url}>
              <NewsItems title={elements.title?elements.title:""} description={elements.description?elements.description:""} imageUrl={elements.urlToImage?elements.urlToImage:""} newsUrl={elements.url}/>
            </div>
          })}
            <div className="container d-flex justify-content-between">
              <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.goPrevious}>&#8592; Previous</button>
              <button disabled={this.state.page+1>5} type="button" className="btn btn-dark" onClick={this.goNext}>Next &#8594;</button>
            </div>
          </div>
      </div>
    )
  }
}

export default News