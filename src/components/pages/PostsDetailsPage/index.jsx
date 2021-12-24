import {useParams}from 'react-router-dom'
import {useContext, useEffect, useState} from 'react';
import "./styles.css"
import PostOrderContext from '../../../context/PostOrderContext';

export const PostsDetailsPage = (props)=>{
    const {id}=useParams();
    const [Post, setPost]=useState({});
    const globalState = useContext(PostOrderContext);

    useEffect(()=>{
        const Post = globalState.Posts.find(
            (Post)=>Post.id.stringValue === id
            );
        setPost(Post);
    },[])
    if (Post){
        return (
            <div className="Posts-page">
                <h1 className="Posts-title">{Post.name?.stringValue}</h1>
                <img src={Post.image?.stringValue} alt="image" />
            </div>
        )
    }else {
        return <p>no Posts with this id</p>
    }


}