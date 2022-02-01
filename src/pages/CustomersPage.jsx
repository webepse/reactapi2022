import {useState, useEffect} from 'react';
import Axios from "axios"
import Pagination from '../components/Pagination';
import customersAPI from '../services/customersAPI';

const CustomersPage = (props) => {
    
    const [customers, setCustomers] = useState([])

    //pour la pagination
    const [currentPage, setCurrentPage] = useState(1)
    
    const fetchCustomers = async () => {
        try{
            const data = await customersAPI.findAll()
            setCustomers(data)
        }catch(error)
        {
            // notif à faire
            console.log(error.response)
        }
    }


    useEffect(()=>{
      fetchCustomers()
    },[])

    const handleDelete = (id) => {
        // pessimiste
        const originalCustomers = [...customers]

        // optimiste
        setCustomers(customers.filter(customer => customer.id !== id))

        Axios.delete(`http://127.0.0.1:8000/api/customers/${id}`)
            .then(response => console.log('ok'))
            .catch(error => {
                setCustomers(originalCustomers)
                console.log(error.response)
            })
    }

    // pour la pagination
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const itemsPerPage = 10

    const paginatedCustomers = Pagination.getData(customers, currentPage, itemsPerPage)
    
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
                    {paginatedCustomers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.firstName} {customer.lastName}</td>
                            <td>{customer.email}</td>
                            <td>{customer.company}</td>
                            <td className='text-center'>
                                <span className="badge badge-primary bg-primary">
                                    {customer.invoices.length}
                                </span>
                            </td>
                            <td className="text-center">{customer.totalAmount.toLocaleString()}€</td>
                            <td className="text-center">{customer.unpaidAmount.toLocaleString()}€</td>
                            <td>
                                <button
                                    disabled={customer.invoices.length > 0}
                                    onClick={()=> handleDelete(customer.id)} 
                                    className="btn btn-sm btn-danger">Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>           
            </table>
            <Pagination 
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={customers.length}
                onPageChanged={handlePageChange}
            />    
        
        </>
     );
}
 
export default CustomersPage;