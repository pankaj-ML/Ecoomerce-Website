import axios from 'axios';
//const AUTH_API_BASE_URL = "http://localhost:8080/Buyer";
const AUTH_API_BASE_URL="http://ecommerce-env.eba-vnyfqqcp.us-east-2.elasticbeanstalk.com/Buyer";

class CartServices{
    
    addtoCart(bid,pid){
        const Token = localStorage.getItem('userToken');
        const ID = localStorage.getItem('userId')
        const headers = { jwt: Token, id: ID}
        const authAxios = axios.create({baseURL:AUTH_API_BASE_URL,headers:{id:`${headers.id}`,jwt:`${headers.jwt}`}})
        return authAxios.post('/addtoCart/'+bid+'/'+pid)
    }

    deleteCart(bid,pid){
        const Token = localStorage.getItem('userToken');
        const ID = localStorage.getItem('userId')
        const headers = { jwt: Token, id: ID}
        const authAxios = axios.create({baseURL:AUTH_API_BASE_URL,headers:{id:`${headers.id}`,jwt:`${headers.jwt}`}})
        return authAxios.post('/deleteCart/'+bid+'/'+pid)
    }

    cart(email){
        const Token = localStorage.getItem('userToken');
        const ID = localStorage.getItem('userId')
        const headers = { jwt: Token, id: ID}
        const authAxios = axios.create({baseURL:AUTH_API_BASE_URL,headers:{id:`${headers.id}`,jwt:`${headers.jwt}`}})
        return authAxios.post('/Cart/'+email)
       
    }

    checkout(bid){
        const Token = localStorage.getItem('userToken');
        const ID = localStorage.getItem('userId')
        const headers = { jwt: Token, id: ID}
        const authAxios = axios.create({baseURL:AUTH_API_BASE_URL,headers:{id:`${headers.id}`,jwt:`${headers.jwt}`}})
        return authAxios.post('/checkout/'+bid)  
    }
    
}

export default new CartServices();