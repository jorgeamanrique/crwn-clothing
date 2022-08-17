import { useState } from "react"; 
import FormInput from '../../components/form-input/form-input.component';
import Button from '../../components/button/button.component';
import { 
  signInWithGooglePopup, 
  createUsertDocumentFromAuth, 
  signInAuthWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import './sign-in-form.styles.scss';

const defaultFormfields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormfields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormfields);
  };

  const SignInWithGoogle = async () => {
    await signInWithGooglePopup();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try{
      await signInAuthWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch(error.code){
        case 'auth/wrong-password':
          alert('Incorrect password for email');
          break;

        case 'auth/user-not-found':
          alert('No user associated with this email');
          break;
        
        default:
          console.log('user authentication encountrered an error', error);
          break
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({...formFields, [name]:value })
  };

    return (
      <div className="sign-up-container">
        <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput label='Email' type="email" required onChange={handleChange} name="email" value={email}></FormInput>
          <FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password}></FormInput>
          <div className="buttons-container">
            <Button type="submit">Sign In</Button>
            <Button type='button' buttonType='google' onClick={SignInWithGoogle}>Google Sign In</Button>
          </div>
        </form>
      </div>
    );
}

export default SignInForm;