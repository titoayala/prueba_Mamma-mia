import { useEffect, useState, useContext} from "react";
import { useParams } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Context from "../context/context";

const DetallePizza = () => {
    const api = "/pizzas.json";
    const [filtroPizza, setfiltroPizza] = useState([]);
    const [ setPizza] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const { listadocompra, setCompra } = useContext(Context);

    const Agregar = (arr) => {
        navigate(`/carrito`);
        const Pizzas = {
            id: arr.id,
            name: arr.name,
            img: arr.img,
            precio: arr.price
        }
        setPizza(Pizzas);
        setCompra([...listadocompra, Pizzas])
    }

    useEffect(() => {
        const datosFiltrados = async () => {
            let filtroUrl = api;
            const respuesta = await fetch(filtroUrl);
            const respuestaDatos = await respuesta.json();
            console.log(respuestaDatos.filter(e => e.id === id));
            setfiltroPizza(respuestaDatos.filter(e => e.id === id));
        }
        datosFiltrados();
    }, [])

    return (
        <>
            <div className="contenedorPizza">
                {filtroPizza.map((pizza) => (
                    <>
                        <div className="foto">
                            <img className="fotoPizza" src={pizza.img} alt="" />
                        </div>
                        <div className="texto">
                            <h2 className="text-capitalize">{pizza.name}</h2>
                            <hr />
                            <h6 className="textoDescripcion">{pizza.desc}</h6>
                            <h5>Ingredientes</h5>
                            {pizza.ingredients.map((ingredients) => (
                                <>
                                    <div className="ingredientes">
                                        <h6> 🍕 {ingredients}</h6>
                                    </div>
                                </>
                            )
                            )}
                            <h4>Precio $ {pizza.price}</h4>
                            <Button variant="danger" onClick={() => Agregar(pizza)}>Añadir</Button>
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}
export default DetallePizza;