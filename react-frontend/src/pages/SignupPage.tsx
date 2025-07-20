import { useForm } from 'react-hook-form'; 
import './signup.css'
import { Link, useNavigate } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<SignUpData>();

  const onSubmit = (data: SignUpData) => {
    localStorage.setItem("userData", JSON.stringify(data));
    navigate("/login");
  };

  return (
    <div className='signup-form-container'> 
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: true, maxLength: 20 })}
          />
        </div>
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
      <Link to="/login"> Already Signed Up? Login!</Link>
    </div>
  );
}

export default SignupPage;