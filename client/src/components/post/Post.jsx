import React from 'react'
import { useState } from 'react'
import { useDjango } from '../../context/DjangoContext'
import { useNavigate } from 'react-router-dom'

const Post = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const {createArticle} = useDjango()
    const navigate = useNavigate();


  return (
    <div>
        <input type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder='Content' onChange={(e) => setContent(e.target.value)} />
        
        <button onClick={ async() => { await createArticle({title, content}) ; navigate('/')} }>Create</button>
    </div>
  )
}

export default Post