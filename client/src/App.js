import './App.css';
import{BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './components/home/Home';
import { DjangoProvider } from './context/DjangoContext';
import AuthForm from './components/authForm/AuthForm';
import Post from './components/post/Post';
import UpdateArticle from './components/Update/UpdateArticle';



function App() {
  return (
    <div className="App">
      <DjangoProvider>
      <NavBar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/post" element={<Post />}/>
          <Route path="/register" element={<h1>Register</h1>}/>
          <Route path="/login" element={<AuthForm />}/>
          <Route path="/update/:id" element={<UpdateArticle />}/>
        </Routes>
      </BrowserRouter>
      </DjangoProvider>
    </div>
  );
}

export default App;
