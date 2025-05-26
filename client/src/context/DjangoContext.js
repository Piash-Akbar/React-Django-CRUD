import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";




const DjangoContext = createContext();


//useDjango is to be used in components
export function useDjango() {
    return useContext(DjangoContext);
}


//DjangoProvider is to be used in App to wrap components
export const DjangoProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);


    const [id, setId] = useState(1);

    const fetchArticles = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/articles/", {
                headers: {
                    'Authorization': "Token 6d10a6d2faeb42b5e10ee0e6269262b04d4bcca7"
                }
            });
            setArticles(res.data);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };



    useEffect(() => {
        fetchArticles();
    }, []);

    const createArticle = async (data) => {
        try {
            await axios.post("http://127.0.0.1:8000/articles/", data, {
                headers: {
                    'Authorization': "Token 6d10a6d2faeb42b5e10ee0e6269262b04d4bcca7"
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
                    'Authorization': "Token 6d10a6d2faeb42b5e10ee0e6269262b04d4bcca7"
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
                    'Authorization': "Token 6d10a6d2faeb42b5e10ee0e6269262b04d4bcca7"
                }
            });
            fetchArticles();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <DjangoContext.Provider value={{ articles, id, setId, createArticle, updateArticle, deleteArticle }}>
            {children}
        </DjangoContext.Provider>
    );
};
