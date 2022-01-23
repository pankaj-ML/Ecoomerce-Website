import axios from 'axios';
//const AUTH_API_BASE_URL = "http://localhost:8081/Product";
const AUTH_API_BASE_URL =  "http://productservices-env.eba-98pbwf84.us-east-2.elasticbeanstalk.com/Product";

class ProductServices{

    getProducts()
    {
        return axios.get(AUTH_API_BASE_URL+'/getAll')
    }
    searchProduct(name)
    {
        return axios.get(AUTH_API_BASE_URL+'/byName/'+name)
    }
}

export default new ProductServices();