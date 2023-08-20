import '../styles/signup.css'
import {
    Alert,
    Button,
    Card,
    Col,
    Form,
    Input,
    message,
    Row,
    Spin,
    Typography,
  } from "antd";
  import React, { Fragment, useState } from "react";
  import { Link } from "react-router-dom";
  import { gql,useQuery } from '@apollo/client';
  import { useNavigate } from "react-router-dom";
  import { useAuthContext } from "../context/authContex";
  import { API } from "../hooks/constant";
  import { setToken } from "../hooks/helper";
 
const Signup = () => {

    const navigate = useNavigate();
    const {setUser}= useAuthContext();
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]= useState("");
   const onFinish =(values)=>{
    console.log('received values of form',values);
    const graphqlQuery={
      query:`
      mutation($username:String!, $email:String!, $password:String!){
        register(input:{username:$username,email:$email,password:$password})
        {
          jwt
          user{
          id
          email
            username
          }
        }
      }
      `,
      variables: {
        email:values.email,
        password: values.password,
        username: values.username
      }
    };

    fetch('http://localhost:1337/graphql',{
      method:'POST',
      headers:{
      'content-type': 'application/json'
      },
      body: JSON.stringify(graphqlQuery)
    })
    .then(res=>{
      return res.json();
    })
    .then(resData=>{
      if(resData.errors && resData.erros[0].status===422){
        throw new Error(
          "Validation failed. make sure the username is correct"
        );
        message.error('user creation failed')
      }if(resData.errors){
        throw new Error(
          "Validation failed"
        );
        message.error('user creation failed')
      }
        console.log(resData)
        throw new Error('userno')
        
        message.success('user inserted successfully')
    })
    .catch(err=>{
      console.log(err)
    })
   }
  return (
    <div className="signup">
        <h1>Grudl</h1>
    <Fragment>
        <Row align="middle">
            <Col span={13}>
                <Card title="SignUp">
                    {error? (
                        <Alert
                        className="alert_error"
                    message={error}
                    type="error"
                    closable
                    afterClose={() => setError("")}
                        
                        />
                    ):null}
                    <Form
                  name="basic"
                  layout="vertical"
                  onFinish={onFinish}
                  autoComplete="on"
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        type: "string",
                      },
                    ]}
                  >
                    <Input placeholder="Username" />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                      },
                    ]}
                  >
                    <Input placeholder="Email address" />
                  </Form.Item>
    
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true }]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>
    
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login_submit_btn"
                    >
                      Submit {isLoading && <Spin size="small" />}
                    </Button>
                  </Form.Item>
                </Form>
                <Typography.Paragraph className="form_help_text">
                  Already have an account? <Link to="/signin">Sign In</Link>
                </Typography.Paragraph>
              
                </Card>
            </Col>
        </Row>
    </Fragment>
    </div>
  )
}

export default Signup