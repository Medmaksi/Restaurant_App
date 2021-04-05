import React from "react";
import { gql, useQuery } from '@apollo/client';
import {ListGroup, Accordion, Button} from "react-bootstrap";
import NavBar from "../components/NavBar";

const GET_ORDERS = gql`

query{
  pastOrders(index: 0, limit: 100){
    address{
    addressLine1
    }
    items {
    name
    }
    orderDate
    total
    uid
  }
}
`;

const OrdersScreen = () => {

    const { loading, data } = useQuery(GET_ORDERS);

    if(loading) {
        return(
            <p>Loading...</p>
        )
    }

    return(
        <div>
            <NavBar/>
            <ListGroup className="ordersContainer">
                {data.pastOrders.map((order) => (
                    <ListGroup.Item key={order.uid}>
                        <Accordion>
                            <Accordion.Toggle style={{width: '100%', display: 'flex', justifyContent: 'space-between'}} as={Button} variant="link" eventKey="0">
                                {order.orderDate.substr(0,10)}
                                <span>
                                    {order.total} $
                                </span>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                               <div>
                                   <p>Address: {order.address.addressLine1}</p>
                                    <ul>
                                        {order.items.map((item) => (
                                            <li>{item.name}</li>
                                        ))}
                                    </ul>
                               </div>
                            </Accordion.Collapse>
                        </Accordion>
                    </ListGroup.Item>
                ))}

            </ListGroup>
        </div>
    )
}

export default OrdersScreen;