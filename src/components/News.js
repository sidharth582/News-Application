import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
// import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
    const [articles, setarticles] = useState([])
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
   
    const updateData = async()=> {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setloading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parseData = await data.json();
        props.setProgress(70);
        setarticles(parseData.articles);
        settotalResults(parseData.totalResults);
        setloading(false)
        
       
        props.setProgress(100);
    }

    useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)}- NewsPortal`;
        updateData();
        // eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {
        setpage(page+1)
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setloading(true)
        let data = await fetch(url);
        let parseData = await data.json();
        setarticles(articles.concat(parseData.articles))
        settotalResults(parseData.totalResults)
    };

        return (
            <>
                <h2 className="text-center" style={{ margin: '35px 0px', marginTop:'90px' }}> NewsPortal - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !==totalResults}
                    loader={<h4 className="text-center my-3">Loading...</h4>}
                    >
                    <div className="container">
                        <div className="row">
                            {articles.map((element) => {
                                return <div className="col md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    
}

    News.defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',

    }
    // News.PropTypes ={
    // country:PropTypes.string,
    // pageSize:PropTypes.number,
    // category:PropTypes.string,
    // }


export default News
