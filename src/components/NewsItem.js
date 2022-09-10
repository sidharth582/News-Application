import React from 'react'

const NewsItem = (props)=> {
        let { title, description, imageUrl, newsUrl, author, date, source } = props;
        return (
            <div className="my-3">
                <div className="card" style={{ width: "18rem" }} >
                    <img src={!imageUrl ? "https://cartrustindia.com/application/modules/themes/views/default/assets/images/image-placeholder.png" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}<span className="badge bg-secondary">{source}</span></h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "unKnown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more </a>
                    </div>
                </div>
            </div>
        )
}

export default NewsItem
