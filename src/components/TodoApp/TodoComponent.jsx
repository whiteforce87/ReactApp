import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService"
import {useNavigate, useParams} from 'react-router-dom'
import { useAuth } from "./security/AuthContext"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useState, useEffect } from "react"
import moment from "moment"

export default function ListTodoComponent (){

    const {id} = useParams()
    const authContext = useAuth()
    const username = authContext.username

    const[description, setDescription] = useState('')
    const[targetDate, setTargetDate] = useState('')
    const naigate = useNavigate()


    useEffect(
        () => retrieveTodo(), [id]
    )

    

    
    function retrieveTodo(){

        if(id != -1){
        retrieveTodoApi(username, id)
        .then(response =>{
        setDescription(response.data.description)
        setTargetDate(response.data.targetDate)
    })
        .catch(error => console.log(error))
    }
}

function onSubmit(values){
    const todo ={
        id:id,
        username:username,
        description:values.description,
        targetDate:values.targetDate,
        done:false
    } 

    if(id == -1){
        createTodoApi(username,todo)
        .then(response => {
            console.log(response.data)
            naigate('/todos')
        })
        .catch(error => console.log(error))

    }else{

        updateTodoApi(username,id,todo)
        .then(response => {
            console.log(response.data)
        naigate('/todos')
    })
        .catch(error => console.log(error))

    }

}

function validate(values){
    let errors = {
       // description: 'Enter a valid description',
       // targetDate: 'Enter a valid targetDate'
    }

    if(values.description.length < 5){
        errors.description = 'Enter at least 5 characters'
    }
    if(values.targetDate == null || values.targetDate == '' || !moment(values.targetDate).isValid()){
        errors.targetDate = 'Enter a valid targetDate'
    }
    console.log(values)
    return errors

}



    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div className="retrieveTodo">
                <Formik initialValues={{description, targetDate}}
                enableReinitialize={true}
                onSubmit={onSubmit}
                validate = {validate}
                validateOnChange={false}
                validateOnBlur={false}>{
                
                    (props) => (

                        <Form>
                            <ErrorMessage
                            name="description"
                            component="div"
                            className="alert alert-warning">
                            </ErrorMessage>

                            <ErrorMessage
                            name="targetDate"
                            component="div"
                            className="alert alert-warning">
                            </ErrorMessage>

                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field type="text" className="form-control" name="description"></Field>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field type="date" className="form-control" name="targetDate"></Field>
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-5" type="submit">Save</button>
                            </div>
                        </Form>
                    )}
                </Formik>

            </div>
        </div>
    )
}