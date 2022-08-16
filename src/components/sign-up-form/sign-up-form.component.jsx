import { useState } from "react"; 
import { createAuthUserWithEmailAndPassword, createUsertDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../../components/form-input/form-input.component';
import './sign-up-form.styles.scss';
import Button from '../../components/button/button.component';

const defaultFormfields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormfields);
  const { displayName, email, password, confirmPassword } = formFields;

  // console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormfields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(password !== confirmPassword) {
      alert('password do not match');
      return;
    }

    try{
      const {user} = await createAuthUserWithEmailAndPassword(email, password);

      await createUsertDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if(error.code === 'auth/email-already-in-use'){
        alert('Cannot create user, email already in use');
      } else {
        console.log('user creation encountrered an error', error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({...formFields, [name]:value })
  };

    return (
        <div className="sign-up-container">
          <h2>Don't have an account?</h2>
          <span>Sign Up with your email and password</span>
          <form onSubmit={handleSubmit}>
            <FormInput label='Display Name' type="type" required onChange={handleChange} name="displayName" value={displayName}></FormInput>

            <FormInput label='Email' type="email" required onChange={handleChange} name="email" value={email}></FormInput>

            <FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password}></FormInput>

            <FormInput label='Confirm Password' type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}></FormInput>
            <Button type="submit">Sign Up</Button>
          </form>
        </div>
    );
}

export default SignUpForm;