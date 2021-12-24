import React, {useState} from 'react';

const PostOrderContext = React.createContext({
    Post:[],
    order: [],
    addPostToOrder: () => {},
    removePostFromOrder: () => {},
    intializePost: ()=>{},
});

export const PostOrderContextProvider = (props) => {
    const [order, setOrder] = useState([]);
    const [Post, setPost] = useState([]);


    const intializePost = (PostFromApi)=>{
    setPost(PostFromApi);
    }
    const addPostToOrder = (Post) => {
        let newOrder = order; 
        newOrder.push (Post);
        setOrder(order);
    }

    const removePostFromOrder = (PostId) => {
        let prevOrder = order;
        const found = order.findIndex( (Post ) => {
            return (Post.id === PostId); 
        })
        if (found !== -1) {
            prevOrder.splice(found, 1); // delete one
            setOrder([...prevOrder]);
        } else {
            console.log ("error delete");
        }
    }
    
    return (<PostOrderContext.Provider
     value={{order: order, addPostToOrder: addPostToOrder, removePostFromOrder: removePostFromOrder, Post: Post, intializePost:  intializePost}}
    >
        {props.children}
    </PostOrderContext.Provider>)

} 

export default PostOrderContext;