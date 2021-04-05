import React from "react";
import { gql, useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from "react-router-dom";
import {Card, Button, Accordion} from 'react-bootstrap';
import NavBar from "../components/NavBar";

const GET_RESTAURANTS = gql`
query{
  restaurants(index: 0, limit: 100, delivery: false){

    minOrderAmount
    name
    open
    restaurantAddressSlugCityName
  
    slugName
    
    uid
  }
}
`;

const ListScreen = () => {

    const { loading, data } = useQuery(GET_RESTAURANTS);
    const history = useHistory();
    if(loading) {
        return(
            <p>Loading...</p>
        )
    }
    console.log(data);
    return(
       <div>
           <NavBar/>
           <Accordion className="restaurantsContainer">
               {data.restaurants.map((restaurant) => (
                   <Card key={restaurant.slugName}>
                       <Card.Body>
                           <Card.Header>
                               <Accordion.Toggle style={{width: '100%', display: 'flex', justifyContent: 'space-between'}} as={Button} variant="link" eventKey={restaurant.slugName}>
                                   {restaurant.name}
                                   <span>{restaurant.open ? 'Open' : 'Closed'}</span>
                               </Accordion.Toggle>
                           </Card.Header>
                           <Accordion.Collapse eventKey={restaurant.slugName}>
                               <Card.Body>
                                   <p>Based in: {restaurant.restaurantAddressSlugCityName}</p>
                                   <p>Min Order: {restaurant.minOrderAmount} $</p>
                               </Card.Body>
                           </Accordion.Collapse>
                       </Card.Body>
                   </Card>
               ))}
           </Accordion>
           <Button onClick={() => {
               history.push({
                   pathname: '/orders',
               })
           }} variant="dark" size="lg" block>
               Orders
           </Button>
       </div>
    )
}

export default ListScreen;