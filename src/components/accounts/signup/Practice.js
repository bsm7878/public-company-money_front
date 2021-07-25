import React, {  useState } from 'react';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';
const Practice = () => {
    const history = useHistory();

    const [inputs, setInputs] = useState({ email: "", username: "", password:""});
    const [errors, setErrors] = useState({});
    const [formDisabled, setFormDisabled] = useState(false);


    const onSubmit = e => {
        e.preventDefault()

        setErrors({});

        Axios.post("http://localhost:8000/accounts/signup/", inputs)
            .then(response => {
                history.push('/accounts/sign_in')
            })
            .catch(error => {
                if(error.response){
                    setErrors({
                        email: (error.response.data.email || []).join(" "),
                        username: (error.response.data.username || []).join(" "),
                        password: (error.response.data.password || []).join(" ")
                    })
                    console.log("error :", error.response)
                }
            });
    }

    const onChange = e => {
        const {name, value} = e.target;
        setInputs(prev => ({
            ...prev,
            [name] : value,
        }))
    }


    return (
        <div>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <form onSubmit={onSubmit}>
                <input type="text" name="email" onChange={onChange}/>
                {errors.email}
                <input type="text" name="username" onChange={onChange}/>
                {errors.username}
                <input type="password" name="password" id="password" onChange={onChange}/>
                <input type="submit" value="회원가입" disabled={formDisabled}/>
            </form>
        </div>
    );
};

export default Practice;