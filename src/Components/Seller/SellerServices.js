import axios from 'axios';
//const AUTH_API_BASE_URL = "http://localhost:8080/Seller";
const AUTH_API_BASE_URL="http://ecommerce-env.eba-vnyfqqcp.us-east-2.elasticbeanstalk.com/Seller";
//const PRODUCT_BASE_URL =  "http://localhost:8081/Product";
const PRODUCT_BASE_URL =  "http://productservices-env.eba-98pbwf84.us-east-2.elasticbeanstalk.com/Product";

class SellerServices{
    registerSeller(Seller){
        return axios.post(AUTH_API_BASE_URL+'/signUp',Seller);
    }

    loginSeller(Seller){
        return axios.post(AUTH_API_BASE_URL+'/login',Seller);
    }

    logoutSeller(headers){
        const authAxios = axios.create({baseURL:AUTH_API_BASE_URL,headers:{id:`${headers.id}`,jwt:`${headers.jwt}`}})
        return authAxios.post('/logout')
    }

    getProduct(){
        const email =localStorage.getItem('email')
        //alert(head.token);
        return axios.get(PRODUCT_BASE_URL+'/byEmail/'+email)
       
    }

    deleteProduct(id)
    {
      return axios.delete(PRODUCT_BASE_URL+'/Delete/'+id)  
    }
}

export default new SellerServices();