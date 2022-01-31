import {useState, useEffect} from 'react';
import Axios from "axios"

const CustomersPage = (props) => {
    
    const [customers, setCustomers] = useState([])
    
    useEffect(()=>{
        Axios.get("http://127.0.0.1:8000/api/customers")
            .then(response => response.data['hydra:member'])
            .then(data => console.log(data))
            .catch(error => console.log(error.response))
    },[])
    
    return ( 
        <>
            <h1>Liste des clients</h1>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Entreprise</th>
                        <th>Factures</th>
                        <th className='text-center'>Montant total</th>
                        <th className='text-center'>Montant restant</th>
                        <th></th>
                    </tr>    
                </thead> 
                <tbody>

                </tbody>           
            </table>    
        
        </>
     );
}
 
export default CustomersPage;