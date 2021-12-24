import "./styles.css";
import { useEffect, useState, useContext } from "react";
import{PostItem} from '../../PostItem'
import PostOrderContext from "../../../context/PostOrderContext";
import {Search} from "../../Search";
import {getAuth,onAuthStateChanged} from 'firebase/auth';
import {useHistory} from 'react-router-dom';
import { AiTwotoneHtml5 } from "react-icons/ai";

export const Profile = () => {
  const [Posts, setPosts] = useState([]);
  const[filteredPosts, setFilteredPosts]=useState([]);
  const [loading, setLoading]=useState(true);
  const globalState = useContext(PostOrderContext);
  const [searchString, setSearchString] = useState('');
  const auth=getAuth();
const history = useHistory();

useEffect(
  ()=>{
    //const auth=getAuth();
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

  
    const formatData = data.documents.map( (item)=>{
      return item.fields
    });

    let myPosts = [];
    

    for (let i = 0; i < formatData.length; i++) {
      if (formatData[i].email.stringValue === auth.currentUser.email) {
        myPosts.push(formatData[i]);
      }
    }

  
    
    setPosts(myPosts);      
    setFilteredPosts(myPosts);
    globalState.intializePost(myPosts);
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
