import { useForm } from 'react-hook-form'; 
import './login.css'
import { useNavigate } from 'react-router-dom';
import type { UserCredentials, UserDetails} from '../interfaces/user/user';
import { login} from '../store/authSlice';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { register, handleSubmit, reset } = useForm<UserCredentials>();

  const onSubmit = (data: UserCredentials) => {
    const Data = localStorage.getItem("userData");
    if(!Data) {
      alert(`No user found! Please sign up`);
      navigate("/signup");
      return;
    }
    else {
      const userData = JSON.parse(Data);
      if(data.password === userData.password) {
        alert(`Login successful!`);
        const userDetails : UserDetails = {
          name: userData.name,
          email: userData.email
        };
        dispatch(login(userDetails));
        navigate("/");
      }
      else alert(`Wrong Password! Try again.`);
      reset({password : '' })

    }
  };

  return (
    <div className='signup-form-container'> 
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: 'password is required'})}
          />
        </div>
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginPage;