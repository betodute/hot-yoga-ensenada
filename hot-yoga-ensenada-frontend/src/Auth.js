import './Auth.css';

export const Auth = () => {
  return (
    <div className="login-wrapper">
      <h2> Login </h2>
      <div className="login-form-wrapper">
        <form className='form-row'><input type='text' placeholder='First Name'/>
        <input type='text' placeholder='Phone Number' />
        </form>
      </div>
    </div>
  );
};