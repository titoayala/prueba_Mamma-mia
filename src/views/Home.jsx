import { useState, useEffect, useContext } from "react";
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Context from "../context/context";

const Home = () => {
    const api = "/pizzas.json";
    const [listadoPizza, setPizza] = useState([]);
    const navigate = useNavigate();

    const { listadocompra, setCompra } = useContext(Context);

    const verDetalle = (lista) => {
        navigate(`/pizza/${lista.id}`);
    };

    const Buscar = (arr) => {
        verDetalle(arr);
    }

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

    const enviarFormulario = (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        const Datos = async () => {
            let urlFiltro = api;
            const resp = await fetch(urlFiltro);
            const respDatos = await resp.json();
            setPizza(respDatos);
        }
        Datos();
    }, [])

    return (
        <>
            <div className="container text-center">
                <div className="row row-cols-4">
                    {listadoPizza.map((pizza) => (
                        <div key={pizza.id}>
                            <form onSubmit={enviarFormulario}>
                                <Card className="mb-3">
                                    <Card.Img variant="top" src={pizza.img} />
                                    <Card.Body>
                                        <Card.Title className="text-capitalize">{pizza.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 pb-2">Ingredientes:</Card.Subtitle>
                                        {pizza.ingredients.map((ingredients) => (
                                            <>
                                                <div className="ingredientes">
                                                    <Card.Text>🍕 {ingredients}</Card.Text>
                                                </div>
                                            </>
                                        )
                                        )}
                                        <Card.Text>${pizza.price}</Card.Text>
                                        <Button variant="primary" onClick={() => Buscar(pizza)}>Ver Más 👀</Button>
                                        <Button variant="danger" onClick={() => Agregar(pizza)}>Agregar 🛒</Button>
                                    </Card.Body>
                                </Card>
                            </form>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Home;