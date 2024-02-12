import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SignupForm.css';
import { signup, clearSessionErrors } from '../../store/session';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [image, setImage] = useState(null);
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    let setState;

    switch (field) {
    case 'email':
      setState = setEmail;
      break;
    case 'username':
      setState = setUsername;
      break;
    case 'password':
      setState = setPassword;
      break;
    case 'password2':
      setState = setPassword2;
      break;
    default:
      throw Error('Unknown field in Signup Form');
    }

    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
      image
    };

    dispatch(signup(user));
  };

  const handleImage = e => {
     if (e.target.files.length > 0) {
       const selectedImage = e.target.files[0];
       setImage(selectedImage);
     }
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2 id="signup-header">Welcome to the Shack!</h2>
      <div className="credential-fields">
        <div className="errors">{errors?.errors}</div>
        <div className="errors">{errors?.email}</div>
        <label>
          <span>Email:</span>
          <input
            id="input-field"
            type="text"
            value={email}
            onChange={update('email')}
            placeholder="Email"
          />
        </label>
        <div className="errors">{errors?.username}</div>
        <label>
          <span>Username:</span>
          <input id='input-field' 
            type="text"
            value={username}
            onChange={update('username')}
            placeholder="Username"
          />
        </label>
        <div className="errors">{errors?.password}</div>
        <label>
          <span>Password:</span>
          <input id='input-field'
            type="password"
            value={password}
            onChange={update('password')}
            placeholder="Password"
          />
        </label>
        <div className="errors">
          {password !== password2 && 'Confirm Password field must match'}
        </div>
        <label>
          <span>Confirm Password:</span>
          <input id='input-field'
            type="password"
            value={password2}
            onChange={update('password2')}
            placeholder="Confirm Password"
          />
        </label>
        <div className="img-button">
        <label className="input-image-container" htmlFor="input-image">Add Profile Picture
          <input 
            type="file"
            className='input-image'
            id='input-image'
            onChange={handleImage}
           />
        </label>

        </div>
        
        <input id='submit-button'
          type="submit"
          value="Sign Up"
          disabled={!email || !username || !password || password !== password2}
        />
      </div>
    </form>
  );
}

export default SignupForm;
