import { useForm } from 'react-hook-form'; 
import './signup.css'

// Define the type for your form's data
export interface SignUpData {
  name: string;
  email: string;
  password: string
}

function SignupPage() {
  const { register, handleSubmit } = useForm<SignUpData>();

  const onSubmit = (data: SignUpData) => {
    localStorage.setItem("userData", JSON.stringify(data));
    alert(`Signup successful!\nName: ${data.name}\nEmail: ${data.email}`);
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
    </div>
  );
}

export default SignupPage;