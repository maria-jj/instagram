import {Button} from "../Button";
import './styles.css'
import {useContext} from "react";
import PostOrderContext from "../../context/PostOrderContext";
export const OrderItem = (props)=>{
    const {image,caption,username,id}=props;        
    const globalState  = useContext(PostOrderContext);

    const removePost=()=>{
        globalState.removePostFromOrder(id);
        console.log("remove this Post")
    }
    return(
        <div className="order-item">
        <img className="order-photo" src={image} alt="Post-photo"/>
        <div className="order-item-desc">
            <h1 className="order-item-name">{username}</h1>
            <p className="order-item-page">{caption}</p>
        </div>
        <Button text="remove Post" type="secondary" isDisabled={false} action={removePost}/>
        </div>

    )
}