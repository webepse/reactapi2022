import { useState, useEffect} from 'react'
import invoicesAPI from '../services/invoicesAPI'
import Field from '../components/forms/Field'
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

    return ( 
        <>
            {editing ? <h1>Modification d'une facture</h1> : <h1>Création d'une facture</h1>}
            <form>

                <div className="my-3">
                    <button type="submit" className='btn btn-success'>Enregistrer</button>
                    <Link to="/invoices" className='btn btn-secondary'>Retour aux factures</Link>
                </div>
            </form>
        </>
     );
}
 
export default InvoicePage;