import axios from 'axios';
//const AUTH_API_BASE_URL = "http://localhost:8080/Buyer";
const AUTH_API_BASE_URL="http://ecommerce-env.eba-vnyfqqcp.us-east-2.elasticbeanstalk.com/Buyer";
class SellerServices{
    registerBuyer(Buyer){
        return axios.post(AUTH_API_BASE_URL+'/signUp',Buyer);
    }

    loginBuyer(Buyer){
        return axios.post(AUTH_API_BASE_URL+'/login',Buyer);
    }

    logoutBuyer(headers){
        const authAxios = axios.create({baseURL:AUTH_API_BASE_URL,headers:{id:`${headers.id}`,jwt:`${headers.jwt}`}})
        return authAxios.post('/logout')
    }

    getBuyer(id)
    {
        const Token = localStorage.getItem('userToken');
        const ID = localStorage.getItem('userId')
        const headers = { jwt: Token, id: ID}
        const authAxios = axios.create({baseURL:AUTH_API_BASE_URL,headers:{id:`${headers.id}`,jwt:`${headers.jwt}`}})
        return authAxios.get('/getbuyer/'+id);
    }

    updateBuyer(bid,user)
    {
      
        const Token = localStorage.getItem('userToken');
        const ID = localStorage.getItem('userId')
        const headers = { jwt: Token, id: ID}
        
        const authAxios = axios.create({baseURL:AUTH_API_BASE_URL,headers:{id:`${headers.id}`,jwt:`${headers.jwt}`}})
        return authAxios.put('/Update/'+bid,user);
    }
}

export default new SellerServices();