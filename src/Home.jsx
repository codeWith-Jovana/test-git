import React, { useState } from 'react';
import { useMutation } from 'react-query';
import axiosInstance from './axiosInstance';
import './Home.css'; 

const createPost = async (newPost) => {
    const response = await axiosInstance.post('/posts', newPost); 
    return response.data;
};

function Home() {
    const { mutate: addPost, isLoading: isPosting } = useMutation(createPost, {
        onSuccess: () => {
            console.log('Post created successfully');
        },
        onError: (error) => {
            console.error('Error creating post:', error);
        }
    });
    
    const [title, setTitle] = useState('New Post');
    const [content, setContent] = useState('This is a new post.');

    const handleAddPost = () => {
        const newPost = { title, content }; 
        addPost(newPost);
        setTitle('New Post');
        setContent('This is a new post.');
    };

    return (
        <div className="container">
            <h2>Create a New Post</h2>
            <form className="post-form" onSubmit={(e) => { e.preventDefault(); handleAddPost(); }}>
                <div className="form-group">
                    <label>
                        Title:
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            className="input"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Content:
                        <textarea 
                            value={content} 
                            onChange={(e) => setContent(e.target.value)} 
                            className="textarea"
                        />
                    </label>
                </div>
                <button type="submit" className="submit-button" disabled={isPosting}>
                    {isPosting ? 'Creating...' : 'Create Post'}
                </button>
            </form>
        </div>
    );
}

export default Home;
