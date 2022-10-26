import { Button } from 'react-bootstrap';
import { useContext, useEffect, useState } from "react";
import Context from "../context/context";

const Carrito = () => {

    const { listadocompra } = useContext(Context);
    const [TotalCarrito, setCarrito] = useState([]);
    const [TotalPagar, setPago] = useState([]);

    const CalcularDetalle = (listadocompra) => {
        let total = 0;
        let products = [];

        for (const product of listadocompra) {
            console.log("productos")
            const productFound = products.filter((p) => p["id"] === product["id"]);

            if (productFound.length === 0) {
                const newProduct = { ...product, cantidad: 1 }
                products.push(newProduct)
            } else {
                productFound[0].cantidad += 1
                productFound[0].precio += product["precio"]
            }
            total += product.precio
            setPago(total)
        }
        setCarrito(products)

        return {
            "products": products,
            "total": total
        }
    }
    useEffect(() => {
        CalcularDetalle(listadocompra);
    }, [])

    return (
        <>
            <div className="contenedorCarrito">
                <h2>Detalles del pedido</h2>
                {TotalCarrito.map((compra) => (
                    <>
                        <div key={compra.id} className="detalleCarrito">
                            <div>
                                <img className="imagenPizza" src={compra.img} alt=""></img>
                                <label className="text-capitalize">{compra.name}</label>
                            </div>
                            <h5 className="totalPizza">${compra.precio} <Button variant="danger" >-</Button> {compra.cantidad} <Button variant="primary" >+</Button></h5>
                        </div>
                    </>
                ))}
                <h4>Total:${TotalPagar}</h4>
                <Button variant="success" >Ir a pagar</Button>
            </div>
        </>
    )
}
export default Carrito;