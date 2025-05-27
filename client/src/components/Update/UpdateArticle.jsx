import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDjango } from '../../context/DjangoContext'

const UpdateArticle = () => {
    const { id } = useParams();
    const { articles, updateArticle } = useDjango();
    const navigate = useNavigate();

    // Find the article by ID (make sure types match)
    const article = Array.isArray(articles)
        ? articles.find((article) => article.id === parseInt(id))
        : null;

    // Initialize state once article is found
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Pre-fill form fields after article is loaded
    useEffect(() => {
        if (article) {
            setTitle(article.title);
            setContent(article.content);
        }
    }, [article]);

    if (!article) return <p>Loading...</p>;

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1>Update Article</h1>
            <h4>Title</h4>
            <input
                
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <h4>Content</h4>
            <textarea
                // type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                cols={50}
            />
            
            <button
                onClick={async () => {
                    await updateArticle(article.id, { title, content });
                    navigate('/');
                }}
                className='btn btn-primary'
            >
                Update
            </button>
        </div>
    );
};

export default UpdateArticle;
