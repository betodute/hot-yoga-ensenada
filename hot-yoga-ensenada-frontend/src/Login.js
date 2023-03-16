import './Login.css';

export const Login = (props) => {
  console.log(props);

  return (
    <div className="profile-wrapper">
      <h2> Login or Sign Up </h2>
      <div className="profile-form-wrapper">
        <form className='form-row'>
          <label className='col-12'> Full Name:
            <input type='text' placeholder='first'/>
            <input type='text' placeholder='last' />
          </label>
          <label className='col-12'> Contact:
            <input type='text' placeholder='e-mail' />
            <input type='text' placeholder='phone number' />
          </label>
        </form>
      </div>
    </div>
  );
};