import {useEffect, useState} from 'react';
import Field from '../components/forms/Field';
import { Link, useNavigate, useParams } from 'react-router-dom';
import customersAPI from '../services/customersAPI';

const CustomerPage = (props) => {

    var {id = "new"} = useParams()
    const navigate = useNavigate()

    const [editing, setEditing] = useState(false) // pour savoir si on édite ou non

    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    })

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    })

      // récup le customer en question en fonction de l'id si on est en mode édition
      const fetchCustomer = async id => {
        try{
            const {firstName, lastName, email, company} = await customersAPI.find(id)
            setCustomer({firstName, lastName, email, company})
        }catch(error){
            // notif
            navigate("/customers", {replace: true})
        }
    }

    useEffect(()=>{
        if(id !== "new")
        {
            setEditing(true)
            fetchCustomer(id)
        }
    },[id])

    const handleChange = (event) => {
        // const value = event.currentTarget.value 
        // const name = event.currentTarget.name 
        const {name, value} = event.currentTarget
        setCustomer({...customer, [name]:value})
    }

    return ( 
        <>
            {!editing ? <h1>Création d'un client</h1> : <h1>Modification d'un client</h1>}
            <form>
                <Field 
                    name="lastName"
                    label="Nom de famille"
                    placeholder='Nom de famille du client'
                    value={customer.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                />
                <Field 
                    name="firstName"
                    label="Prénom"
                    placeholder='Prénom du client'
                    value={customer.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                />
                <Field 
                    name="email"
                    label="Adresse E-mail"
                    placeholder='Adresse E-mail du client'
                    value={customer.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <Field 
                    name="company"
                    label="Entreprise"
                    placeholder='Entreprise du client'
                    value={customer.company}
                    onChange={handleChange}
                    error={errors.company}
                />
                <div className="my-3">
                    <button type="submit" className='btn btn-success'>Enregistrer</button>
                    <Link to="/customers" className='btn btn-secondary'>Retour aux clients</Link>
                </div>

            </form>
        </>
     );
}
 
export default CustomerPage;