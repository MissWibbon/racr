import React, {useState} from 'react'
import * as filestack from 'filestack-js';
const client = filestack.init('apikey');

const SignUp = () =>{

    const email = useInput('');
    const password = useInput('');
    const firstName = useInput('');
    const lastName = useInput('');
    const userName = useInput('');
    const city = useInput('');
    const state = useInput('');
    const country = useInput('');
    const age = useInput('');
    const image ='';

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log('this is where i send shit');
        
    }
    
    const fileChange = (event) =>{
        const files = event.target.files;
        const file = files.item(0);
      
        client.upload(file)
          .then(res => {
            console.log('success: ', res)
          })
          .catch(err => {
            console.log(err)
          });
          return image
    }
    return(
        <div>
            <form>
                <label>Email:</label>
                <input {...email} type ='text' name = 'name'></input>
                <label>password:</label>
                <input {...password} type ='password' name = 'name'></input>
                <label>First Name:</label>
                <input {...firstName} type ='text' name = 'name'></input>
                <label>Last Name:</label>
                <input {...lastName} type ='text' name = 'name'></input>
                <label>User Name:</label>
                <input {...userName} type ='text' name = 'name'></input>
                <label>City:</label>
                <input {...city} type ='text' name = 'name'></input>
                <label>State:</label>
                <input {...state} type ='text' name = 'name'></input>
                <label>Country:</label>
                <input {...country} type ='text' name = 'name'></input>
                <label>Age:</label>
                <input {...age} type ='text' name = 'name'></input>
                <label>Image:</label>
                <input type = "file" onChange = {fileChange}name = 'name'></input>
                <button onClick ={handleSubmit} type ='submit'>Submit</button>
            </form>
        </div>
    )
}

const useInput = (initialvalue) => {
    const [inputs, setInputs] = useState(initialvalue);
    const handlevaluechange =(e) =>{
        setInputs(e.target.value)
        console.log(e.target.value)

    }
    return {
        value:inputs,
        onChange: handlevaluechange
    }

  }

export default SignUp