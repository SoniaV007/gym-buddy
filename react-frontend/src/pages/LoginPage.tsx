import { useForm } from 'react-hook-form'; 
import './login.css'
import { useNavigate } from 'react-router-dom';
import type { UserCredentials} from '../interfaces/user/user';

function LoginPage() {
  const navigate = useNavigate();
  
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