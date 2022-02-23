import {useState, useEffect} from 'react';
import Pagination from '../components/Pagination';
import customersAPI from '../services/customersAPI';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import TableLoader from '../components/loaders/TableLoader';

const CustomersPage = (props) => {
    
    const [customers, setCustomers] = useState([])

    //pour la pagination
    const [currentPage, setCurrentPage] = useState(1)

    //filtre 
    const [search, setSearch] = useState("")

    //loader
    const [loading, setLoading] = useState(true)
    
    const fetchCustomers = async () => {
        try{
            const data = await customersAPI.findAll()
            setCustomers(data)
            setLoading(false) // j'ai fini de charger
        }catch(error)
        {
           toast.error("Impossible de charger les clients")
        }
    }


    useEffect(()=>{
      fetchCustomers()
    },[])

    const handleDelete = async (id) => {
        // pessimiste
        const originalCustomers = [...customers]

        // optimiste
        setCustomers(customers.filter(customer => customer.id !== id))

        // si cela n'a pas fonctionné, on réintègre la copie avec originalCustomers
        try{
            await customersAPI.delete(id)
            toast.warning("Le client "+id+" a bien été supprimé")
        }catch(error)
        {
            setCustomers(originalCustomers)
            toast.error("La supperession du client n'a pas pu fonctionner")
        }
    }

    // pour les filtres
    const handleSearch = event => {
        const value = event.currentTarget.value 
        setSearch(value)
        setCurrentPage(1)
    }

    const filteredCustomers = customers.filter(c =>
        c.firstName.toLowerCase().includes(search.toLowerCase()) ||
        c.lastName.toLowerCase().includes(search.toLowerCase()) || 
        c.email.toLowerCase().includes(search.toLowerCase()) || 
        (c.company && c.company.toLowerCase().includes(search.toLowerCase()))    
    )

    // pour la pagination
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const itemsPerPage = 10

    const paginatedCustomers = Pagination.getData(filteredCustomers, currentPage, itemsPerPage)
    
    return ( 
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Liste des clients</h1>
                <Link to="/customers/new" className='btn btn-primary mb-3'>Créer un client</Link>
            </div>
            {/* filtre */}
            <div className="form-group">
                <input type="text" className='form-control' placeholder='Rechercher...' onChange={handleSearch} value={search} />
            </div>

          {  (!loading) ? (
          
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
                                    <Link className='btn btn-sm btn-warning m-1' to={`/customers/${customer.id}`}>Editer</Link>
                                    <button
                                        disabled={customer.invoices.length > 0}
                                        onClick={()=> handleDelete(customer.id)} 
                                        className="btn btn-sm btn-danger m-1">Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>           
                </table>
            )
                : (
                    <TableLoader />
                )
        
            }
            {
                itemsPerPage < filteredCustomers.length && 
                <Pagination 
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    length={filteredCustomers.length}
                    onPageChanged={handlePageChange}
                />    

            }
        
        </>
     );
}
 
export default CustomersPage;