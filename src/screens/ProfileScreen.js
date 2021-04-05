import React from "react";
import { gql, useQuery } from '@apollo/client';
import ProfilePic from '../assets/profile.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Image, Container, Col, Row} from "react-bootstrap";
import NavBar from "../components/NavBar";

const GET_PROFILE = gql`
query{
  user{
    addresses{
    addressLine1
    }
    
    email
 

    firstName
    lastName
    mobileNumber

    profilePicture{
    url
    }
    uid
  }
}
`;

const ProfileScreen = () => {

    const { loading, data } = useQuery(GET_PROFILE);

    if(loading) {
        return(
            <p>Loading...</p>
        )
    }

    console.log(data);
    return(
        <div>
            <NavBar/>
            <Container className="profileContainer">
                    <Row>
                       <Col>
                           <Image src={data.user.profilePicture ? data.user.profilePicture : ProfilePic} roundedCircle />
                       </Col>
                        <Col>
                            <h2>{data.user.firstName} {data.user.lastName}</h2>
                            <p>{data.user.email}</p>
                            <p>Phone: {data.user.mobileNumber}</p>
                        </Col>
                        <Col>
                            <p>Addresses:</p>
                            <ul>
                                {data.user.addresses.map((address) => (
                                    <li>{address.addressLine1}</li>
                                ))}
                            </ul>
                        </Col>
                    </Row>
            </Container>
        </div>
    )
}
export default ProfileScreen;