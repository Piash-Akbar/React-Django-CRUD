
// import axios from 'axios'
import { useDjango } from '../../context/DjangoContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const {articles, deleteArticle} = useDjango()
    console.log(articles)

    const navigate = useNavigate();



  return (
    <>
        {articles && articles.map((article) => (
            <div key={article.id}>
                <h1>{article.title}</h1>
                <p>{article.content}</p>
                <p>Created at: {article.created_at}</p>
                {article.updated_at && <p>Updated at: {article.updated_at}</p>}
                <p>Posted by: {article.author}</p>
                <button className='btn btn-primary' onClick={() => navigate(`/update/${article.id}`)}  >Update</button>
                <button className='btn btn-danger' onClick={() => deleteArticle(article.id)}>Delete</button>
                <hr className='my-4'/>
            </div>
        ))}
        
    </>
  )
}

export default Home