import newsImg from '../assets/LBN.jpg'

const NewsItems = ({title , description ,src ,url}) => {
  return (

    <div className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3" style={{maxWidth:"345px"}}>
        <img src={src?src:newsImg} style={{height:"200px",width:"343px"}} className="card-img-top" alt="..." />
        <div className="card-body">
        <h5 className="card-title">{title.slice(0,50)}</h5>
        <p className="card-text">{description?description.slice(0,90):"This is Breaking NEWS!!! right now"}</p>
        <a href={url} className="btn btn-primary">Read more</a>
        </div>
    </div>
  )
}

export default NewsItems