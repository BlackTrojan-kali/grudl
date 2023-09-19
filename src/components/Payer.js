import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContex";
import { URI } from "../hooks/constant";
import { Secret,APPKey,AccesKey } from "../hooks/constant";
import {PaymentOperation, RandomGenerator} from '@hachther/mesomb-browser';
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Spin,
  Typography,
} from "antd";
import '../styles/payer.css'
import { useInitialRender } from "./AuthProvider/initialRender";
import { gql } from "@apollo/client";
import { message } from "antd";
const options = {
  style: {
    base: {
      fontSize: "32px",
      color: "#52a635",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2521",
    },
  },
};



const handleChange = (value) => {
  console.log(`selected ${value}`);
};
export default function Payer({cart,setCart,handleClose}) {
const [total,setTotal] = useState(cart.reduce((total,item)=>total +(item.prod.attributes.price*item.qty),0))
const [isLoading,setIsLoading]=useState(false);
const [error,setError]= useState("");
const navigate = useNavigate();
const {user} = useAuthContext();
console.log(user);
const initialRender = useInitialRender();
const onFinish = async (values)=>{
  setIsLoading(true);
 
  const payment = new PaymentOperation({applicationKey: APPKey, accessKey: AccesKey, secretKey: Secret,});
const res = await payment.makeCollect({amount: 100, service: 'MTN', payer: '400001019', nonce: RandomGenerator.nonce(),currency: "XAF", fees:true, country: "CM",
location:{
  town:values.ville
},
customer:{
  firstname:user.username,
  email:user.email
}
});
message.loading('validating payment');
console.log(res.isOperationSuccess());
console.log(res.isTransactionSuccess());
 
  console.log('received values of form',values);
  const graphqlQuery={
    query:`
    mutation commands( $acheteur: String!, $numero: Int!,$address: String!,$ville:String!,$total:Int!,$cart:JSON!,$email:String! ){
      createCommand( data: { Acheteur: $acheteur, numero: $numero,Address: $address,Ville:$ville,Total:$total,ProductList:$cart,Email:$email }) {
        data {
          attributes{
            Acheteur
            numero
            Address
            Ville
            Total
            ProductList
            Email
          }
          
        }
        }
      }
    `,
    variables: {
      acheteur:user.username,
      email:user.email,
      numero:values.numero,
      address:values.address,
      ville:values.ville,
      total:total,
      cart:cart
    }
  };

try {
  const response = await fetch(`${URI}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(graphqlQuery),
  });
  const data = await response.json();
  if (data?.error) {
    throw data?.error;
  } else {
    // set the token

    message.success('paiement effectue avec success');
    handleClose()
}
}catch (error) {
  console.error(error);
  setError(error?.message ?? "Something went wrong!");
} finally {
  setIsLoading(false);
}

}
  return (
    <div className="checkout">
    <Form
                  name="basic"
                  layout="vertical"
                  onFinish={onFinish}
                  autoComplete="on">
    <div className="infos">
      <h3 className="title">Total: {total} Fcfa</h3>
      <hr className="my-4" />
      <div className="flex mb-6">
        <div className="champ">
        
        <Form.Item
                    label="Adresse"
                    name="address"
                    rules={[
                      {
                        required: true,
                        type: "string",
                      },
                    ]}
                  >
                    <Input placeholder="Votre addresse" />
                  </Form.Item>
        </div>
      </div>
      <div className="flex mb-6">
        <div className="champ mr-6">
         
        <Form.Item
                    label="Ville"
                    name="ville"
                    rules={[
                      {
                        required: true,
                        type: "string",
                      },
                    ]}
                  >
                    <Input placeholder="Ville de residence" />
                  </Form.Item>
        </div>

        <div className="champ mr-6">
         
        <Form.Item
                    label="Numero"
                    name="numero"
                    rules={[
                      {
                        required: true,
                        type: "number",
                      },
                    ]}
                  >
                    <InputNumber  style={{ width: 200 }} />
                  </Form.Item>
        </div> 

                 <Button
                      type="primary"
                      htmlType="submit"
                      className="poursuivre"
                    >
                      Submit {isLoading && <Spin size="small" />}
                    </Button>
      </div>
      <div>
      </div>
    </div>
  </Form>
    </div>
  )
}
