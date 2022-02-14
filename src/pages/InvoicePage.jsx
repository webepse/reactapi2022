import { useState, useEffect} from 'react'
import invoicesAPI from '../services/invoicesAPI'
import Field from '../components/forms/Field'
import Select from '../components/forms/Select'
import customersAPI from '../services/customersAPI'
import { Link, useParams, useNavigate } from 'react-router-dom'

const InvoicePage = (props) => {

    var {id="new"} = useParams()

    const navigate = useNavigate()

    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: "SENT"
    })

    const [customers, setCustomers] = useState([])

    const [errors, setErrors] = useState({
        amount: "",
        customer: "",
        status: ""
    })

    const [editing, setEditing] = useState(false)


    // recupération des clients 
    const fetchCustomers = async () => {
        try{
            const data = await customersAPI.findAll()
            setCustomers(data)
            if(id === "new") setInvoice({...invoice, customer: data[0].id})
        }catch(error){
            navigate("/invoices", {replace: true})
        }
    }

    // recup de la facture
    const fetchInvoice = async id => {
        try{
            const {amount, status, customer} = await invoicesAPI.find(id)
            setInvoice({amount, status, customer: customer.id})
        }catch(error){
            navigate("/invoices", { replace: true })
        }
    } 

    // recup la liste des clients à chaque chargement du composant 
    useEffect(()=>{
        fetchCustomers()
    },[])

    // dépend de la variable id - recup la facture que l'url donne 
    useEffect(()=>{
        if(id !=="new"){
            setEditing(true)
            fetchInvoice(id)
        }
    },[id])

    const handleChange = (event) => {
        const {name, value} = event.currentTarget 
        setInvoice({...invoice, [name]:value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    }


    return ( 
        <>
            {editing ? <h1>Modification d'une facture</h1> : <h1>Création d'une facture</h1>}
            <form onSubmit={handleSubmit}>
                <Field 
                    name="amount"
                    type="number"
                    placeholder='Montant de la facture'
                    label="Montant"
                    onChange={handleChange}
                    value={invoice.amount}
                    error={errors.amount}
                />
                <Select
                    name="customer"
                    label="Client"
                    value={invoice.customer}
                    error={errors.customer}
                    onChange={handleChange}
                >
                    {customers.map(customer => <option key={customer.id} value={customer.id}>{customer.firstName} {customer.lastName}</option>)}
                </Select>
                <Select
                    name="status"
                    label="Statut"
                    value={invoice.status}
                    error={errors.status}
                    onChange={handleChange}
                >
                    <option value="SENT">Envoyée</option>
                    <option value="PAID">Payée</option>
                    <option value="CANCELLED">Annulée</option>
                </Select>
                <div className="my-3">
                    <button type="submit" className='btn btn-success'>Enregistrer</button>
                    <Link to="/invoices" className='btn btn-secondary'>Retour aux factures</Link>
                </div>
            </form>
        </>
     );
}
 
export default InvoicePage;