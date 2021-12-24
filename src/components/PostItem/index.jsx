import './styles.css';
import {Button} from '../Button';
import {Link} from 'react-router-dom';
import PostOrderContext from '../../context/PostOrderContext';
import {useContext} from 'react';

export const PostItem = (props)=>{
    const{image, caption, id, username} = props;
    const globalState = useContext(PostOrderContext);
    const addPostToCart = () =>{
        const Post ={
            id, 
            username, 
            image, 
            caption
        }
        globalState.addPostToOrder(Post);
        alert("Post was added");
    }
    return(
        <div className="Post">
            <img className="Post-photo" src={image} alt={caption+"photo"}/>
            <Link to ={`/Post/${id}`}>
                <h1 className="Post-name">{username}</h1>
            </Link>
     
            <p className="Post-caption">{caption}</p>
        </div>
    )
}