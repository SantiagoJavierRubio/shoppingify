import { useDispatch } from "react-redux";
import { logUser } from '../../../redux/ducks/user';

const LogIn = () => {

    const dispatch = useDispatch();
    
    const logInUser = (e) => {
        e.preventDefault();
        const email = e.target.mail.value;
        const password = e.target.psw.value;
        dispatch(logUser(email, password))
    }


    return(
        <div className="inner-box">
            <h1 className="auth-title">Login</h1>
            <form onSubmit={logInUser} className="user-form">
                <div className='input-div'>
                    <span className="material-icons">email</span>
                    <input type="email" name="mail" placeholder="Email"/>
                </div>
                <div className='input-div'>
                    <span className="material-icons">lock</span>
                    <input type="password" name="psw" placeholder="Password" />
                </div>
                <input type="submit" value="Login" className='submit-btn'/>
            </form>
        </div>
    )
}

export default LogIn;