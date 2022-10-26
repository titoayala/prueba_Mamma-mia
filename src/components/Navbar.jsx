import { NavLink } from "react-router-dom";
import pizza from '../assets/imgs/pizza.png';
import carrito from '../assets/imgs/carrito-de-compras.png'


export default function Navbar() {
    const setActiveClass = ({ isActive }) => (isActive ? "active" : "undefined");

    return (
        <div className="navbar">
            <div>
                <NavLink className={setActiveClass} end to="/">
                    <img src={pizza} width="30" alt="" />{" "}Pizzería Mamma Mia!
                </NavLink>
            </div>
            <div>
                <NavLink className={setActiveClass} to="/Carrito">
                    <img src={carrito} width="30" alt="" />Carrito: $ 
                </NavLink>
            </div>
        </div>
    );
}

