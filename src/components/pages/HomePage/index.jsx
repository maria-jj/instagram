import "./styles.css";
import { useEffect, useState, useContext } from "react";
import{PostItem} from '../../PostItem'
import PostOrderContext from "../../../context/PostOrderContext";
import {Search} from "../../Search";
import {getAuth,onAuthStateChanged} from 'firebase/auth';
import {useHistory} from 'react-router-dom';

export const HomePage = () => {
  const [Posts, setPosts] = useState([]);
  const[filteredPosts, setFilteredPosts]=useState([]);
  const [loading, setLoading]=useState(true);
  const globalState = useContext(PostOrderContext);
  const [searchString, setSearchString] = useState('');

const history = useHistory();

useEffect(
  ()=>{
    const auth=getAuth();
    onAuthStateChanged(auth, (user)=>{
      if(!user){
        history.push('/login');
      }
    })
  }, []
);

useEffect(
    ()=>{
      getPosts();
    }, []
  );
  useEffect(
    ()=>{
      handleSearchByBrand();
    }, [searchString]
  );
const handleSearchByBrand = ()=>{
  //if search string empty dont filter
  if(searchString ===''){
    setFilteredPosts(Posts);
    return;
  }
  //filter
  const PostsFiltered = Posts.filter(
      
    (Post) =>{
      const email = Post.email.stringValue.indexOf(searchString.trim().toLowerCase())
      const isMatch = email.indexOf(searchString.trim().toLowerCase());
      return isMatch !==-1;
    }

  )    
  setFilteredPosts(PostsFiltered);

}
const getPosts = async()=>{
  try{
    const response = await fetch('https://firestore.googleapis.com/v1/projects/instagram-ae65b/databases/(default)/documents/posts/');
    const data = await response.json();
    console.log(data);
    const formatData = data.documents.map( (item)=>{
      return item.fields
    });
    setPosts(formatData);      
    setFilteredPosts(formatData);
    globalState.intializePost(formatData);
    setLoading(false);
  }catch(err){
    console.log(err);
    setLoading(false);

  }
}
  const handleSearchUpdate = (event) => {
    setSearchString(event.target.value);
  }
    

  return (
    <div className="Post-page">
        <h1 className="Post-title"> </h1>    
        <div className="Post-container">
        <Search handleSearchUpdate={handleSearchUpdate}/>
        {
          filteredPosts.map((Post)=>(
            <PostItem image={Post.image.stringValue} email={Post.email.stringValue} caption={Post.caption.stringValue} id={Post.id.stringValue} />
            )
          )
        }
        {
          filteredPosts.length ===0&&<p>Nothing found for {searchString}!</p>
        }
        {
          loading && <p>Loading data..</p>
        }
    </div>
    </div>
  );
};
