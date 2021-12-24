import {
    NavLink
} from "react-router-dom";
import {AiOutlineHeart,AiOutlineCompass,AiFillHome,AiOutlineMessage,AiOutlinePlusSquare} from "react-icons/ai";
import logo from '../../assets/icons/ig_logo.png';
import {Logout}from "../Logout"
import "./styles.css"
export const Navbar = () => {
    return (
        <nav className="navbar">
            <img src={logo} alt=""></img>
            <ul className="navbar-list">
                <li>
                    <NavLink exact={true} activeClassName="nav-selected" to="/"><AiFillHome/></NavLink>
                </li>
                <li>
                    <NavLink exact={true} activeClassName="nav-selected" to="/Messages"><AiOutlineMessage/></NavLink>
                </li>
                <li>
                    <NavLink activeClassName="nav-selected" to="/NewPost"><AiOutlinePlusSquare/></NavLink>
                </li>
                <li>
                    <NavLink activeClassName="nav-selected" to="/Explore"> <AiOutlineCompass/></NavLink>
                </li>
                <li>
                    <NavLink activeClassName="nav-selected" to="/Notifications"> <AiOutlineHeart/></NavLink>
                </li>
                <li>
                    <NavLink activeClassName="nav-selected" to="/Profile"><img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" class="pp"/></NavLink>
                </li>
                
                <li>
                    <Logout/>
                </li>
               
            </ul>
        </nav>
    )
}