import axios from 'axios';
//const AUTH_API_BASE_URL = "http://localhost:8080/Admin";
// const SELLER_API_BASE_URL = "http://localhost:8080/Seller";
const AUTH_API_BASE_URL="http://ecommerce-env.eba-vnyfqqcp.us-east-2.elasticbeanstalk.com/Admin";
class AdminServices{
    registerAdmin(admin){
        return axios.post(AUTH_API_BASE_URL+'/signUp',admin);
    }

    loginAdmin(admin){
        return axios.post(AUTH_API_BASE_URL+'/login',admin);
    }

    logoutAdmin(headers){
        const authAxios = axios.create({baseURL:AUTH_API_BASE_URL,headers:{id:`${headers.id}`,jwt:`${headers.jwt}`}})
        return authAxios.post('/logout')
       
    }
    
    getSeller(headers){
        const authAxios = axios.create({baseURL:AUTH_API_BASE_URL,headers:{id:`${headers.id}`,jwt:`${headers.jwt}`}})
        return authAxios.get('/sellers')
       
    }

    updateStatus(headers,sid,status)
    {
        const authAxios = axios.create({baseURL:AUTH_API_BASE_URL,headers:{id:`${headers.id}`,jwt:`${headers.jwt}`}})
        return authAxios.put('/SellerStatus/'+sid,status)
    }

    deletSeller(headers,sid)
    {
        const authAxios = axios.create({baseURL:AUTH_API_BASE_URL,headers:{id:`${headers.id}`,jwt:`${headers.jwt}`}})
        return authAxios.delete('/SellerDelete/'+sid)
    }
}

export default new AdminServices();