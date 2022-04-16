import PropTypes from 'prop-types'
import React, { useEffect,useState } from 'react'
import NewsItems from './NewsItems'
import Loader from './Loader';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(0)

  const goNext = async () => {
    console.log("Next");
    if (page + 1 > Math.ceil(size / props.pageSize) || (page + 1) * (props.pageSize) > 100) {

    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page + 1}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(parsedData.articles);
      setPage(page + 1);
      setLoading(false);
    }
  }

  const goPrevious = async () => {
    console.log("Previous");


    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page - 1}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(parsedData.articles);
    setPage(page - 1);
    setLoading(false);
  }

   const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page + 1}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setPage(page + 1);
    setLoading(false);
  }
  
  
  

  const Loadnews = async ()=> {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&pageSize=${props.pageSize}`;
    setLoading(true);
    console.log(url);
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    setArticles(parsedData.articles);
    setSize(parsedData.totalResults);
    setLoading(false);
  }

  useEffect(() => {
    Loadnews()
  },[])

    return (
      <>
        <h1 className='text-center' style={{marginTop: "73px"}}>Sarthak News - Top Headlines</h1>
        {loading && <Loader />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== size}
          loader={<Loader/>}
        >
          <div className="container my-3">
          <div className="row">
            {articles.map((elements) => {
              return <div className="col-md-4" key={elements.url}>
                <NewsItems title={elements.title ? elements.title : ""} description={elements.description ? elements.description : ""} imageUrl={elements.urlToImage ? elements.urlToImage : ""} newsUrl={elements.url} author={elements.author} time={elements.publishedAt} source={elements.source.name} />
              </div>

            })}
          </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between my-3">
              <button disabled={page<=1} type="button" className="btn btn-dark" onClick={goPrevious}>&#8592; Previous</button>
              <button disabled={(page+1)*(props.pageSize)>100} type="button" className="btn btn-dark" onClick={goNext}>Next &#8594;</button>
            </div> */}

      </ >
    )

}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News