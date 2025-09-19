import { useForm } from 'react-hook-form'; 
import './login.css'
import { useNavigate } from 'react-router-dom';
import type { UserCredentials, UserDetails} from '../interfaces/user/user';
import { login} from '../store/authSlice';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import {logIn} from "../api/auth"

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { register, handleSubmit, reset } = useForm<UserCredentials>();

  const onSubmit = async (data: UserCredentials) => {
    const userResponse = await logIn(data);

    if (userResponse.status === "success") {
      localStorage.setItem("userData", JSON.stringify(userResponse.data));
      const userDetails: UserDetails = {
        name: userResponse.data.name,
        email: userResponse.data.email,
        id: userResponse.data.id
      };
      dispatch(login(userDetails));
      alert("Login successful!");
      navigate("/");
    } else if (userResponse.message === "User not found. Please sign up.") {
      alert("No user found! Please sign up");
      navigate("/signup");
    } else if (userResponse.message === "Invalid password.") {
      alert("Wrong password!");
      reset({ password: "" });
    } else {
      alert(userResponse.message || "Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className='signup-form-container'> 
      <h3>Log In</h3>
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