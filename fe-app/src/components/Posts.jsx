import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    const jwt = localStorage.getItem('jwt')
    const [user, setUser] = useState('')

    useEffect(() => {
        fetch('http://localhost:8080/api/post/get-all')
            .then((response) => response.json())
            .then((data) => {
                setPosts(Array.isArray(data) ? data : []);
            })
            .catch(error => console.error("Fetch error:", error));

        if(jwt) {
            setUser(jwtDecode(jwt))
        }
    }, []);

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/post/delete/${id}`, { method: 'DELETE' })
            .then(() => setPosts(posts.filter(post => post.id !== id)))
            .catch(error => console.error("Error deleting post:", error));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const formData = new FormData();
        formData.append("imageData", file);
        formData.append("mimeType", file.type);
    
        fetch('http://localhost:8080/api/post/new', {
            method: 'POST',
            body: formData // No headers needed for FormData
        })
        .then(response => response.json())
        .then(data => {
            console.log("Uploaded Post:", data);
            setPosts([...posts, data]);
        })
        .catch(error => console.error("Error uploading post:", error));
    };
    
    

    return (
        <div className=" bg-gradient-to-b from-pink-200 via-pink-100 to-white flex justify-center p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                {posts.map((post) => (
                    <div key={post.id} className="relative p-6 rounded-3xl shadow-2xl transition transform hover:scale-105 hover:shadow-pink-300">
                        <img 
                            src={`data:${post.mimeType};base64,${post.imageData}`} 
                            alt="Post" 
                            className="w-full h-72 object-cover rounded-2xl border-4 border-pink-300"
                        />
                        <button 
                            onClick={() => handleDelete(post.id)} 
                            className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-full shadow-md hover:bg-red-700 transition"
                        >
                            <FaTrashAlt />
                        </button>
                    </div>
                ))}
            </div>

            <input 
                type="file" 
                accept="image/*" 
                id="fileInput" 
                className="hidden" 
                onChange={handleFileChange}
            />

        {jwt && user.role === 'ADMIN' ? 
            <button 
                onClick={() => document.getElementById('fileInput').click()}
                className="fixed bottom-8 right-8 bg-pink-500 text-white p-5 rounded-full shadow-lg hover:bg-pink-700 transition transform hover:scale-110"
            >
                <FaPlus size={28} />
            </button> : null
        }
        
        </div>
    );
};

export default Posts;
