import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";




const DjangoContext = createContext();


//useDjango is to be used in components
export function useDjango() {
    return useContext(DjangoContext);
}


//DjangoProvider is to be used in App to wrap components
export const DjangoProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);


    const [tokenCookie, setTokenCookie] = useCookies(['tokenCookie']);

    const loginUser = async(data) => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/auth/", data);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.error(err);
        }
    }

    const registerUser = async(data) => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/users/", data);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.error(err);
        }
    }




    const fetchArticles = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/articles/", {
                headers: {
                    'Authorization': `Token ${tokenCookie.tokenCookie}`
                }
            });
            setArticles(res.data);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };



    useEffect(() => {
        fetchArticles();
    },[tokenCookie.tokenCookie]);

    const createArticle = async (data) => {
        try {
            await axios.post("http://127.0.0.1:8000/articles/", data, {
                headers: {
                    'Authorization': `Token ${tokenCookie.tokenCookie}`
                }
            });
            fetchArticles();
        } catch (err) {
            console.error(err);
        }
    };

    const updateArticle = async (id, updatedData) => {
        try {
            await axios.put(`http://127.0.0.1:8000/articles/${id}/`, updatedData, {
                headers: {
                    'Authorization': `Token ${tokenCookie.tokenCookie}`
                }
            });
            fetchArticles();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteArticle = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/articles/${id}/`, {
                headers: {
                    'Authorization': `Token ${tokenCookie.tokenCookie}`
                }
            });
            fetchArticles();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <DjangoContext.Provider value={{ articles,tokenCookie,setTokenCookie, createArticle, updateArticle, deleteArticle, loginUser, registerUser }}>
            {children}
        </DjangoContext.Provider>
    );
};
