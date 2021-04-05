import React, {useState} from "react";
import { gql, useMutation } from '@apollo/client';
import {Form, Button} from 'react-bootstrap';
import {useHistory} from "react-router-dom";
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/LoginStyle.css';

const cookies = new Cookies();
const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $email: String!
    $password: String!
  ) {
    loginWithEmail(email: $email, password: $password) {
      token
    }
  }
`;

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const [login] = useMutation(LOGIN_MUTATION, {
        variables: {
            email: email,
            password: password
        },
        onCompleted: (login) => {
            cookies.set('token', login.loginWithEmail.token);
            console.log(login);
        }
    });

    return(
        <div className="container">
            <Form className="form">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" onChange={(event) => setEmail(event.target.value)} placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" />
                </Form.Group>
                <Button onClick={(e) => {
                    e.preventDefault();
                    login().then((result) => {
                        history.push({
                            pathname: '/list',
                        })
                    });
                }} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default LoginScreen;