import "./styles.css";
import {useState, useContext, useEffect} from "react";
import PostOrderContext from "../../../context/PostOrderContext";
import {OrderItem} from "../../OrderItem";
import {Button} from "../../Button";
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {useHistory} from 'react-router-dom';
export const ShoppingCartPage = () => {
  
    const [order,setOrder] = useState([]);
    const globalState = useContext(PostOrderContext);
  const history=useHistory();
    
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
      setOrder(globalState.order);
    }, [globalState]
    )
    return (
    <div className="Post-page">
      <h1 className="Post-title">My Shopping Cart</h1>    
      <div className="order">
        {
          order.map((item)=><OrderItem image={item.image} id={item.id}
          name={item.name}color={item.color} />)
        }
        {
          order.length === 0 && <p>Nothing in your order yet..</p>
        }
      </div>
      <Button text="Checkout" type="primary"/>
    </div>
  );
};
