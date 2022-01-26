import { useDispatch } from "react-redux";
import { registerUser } from "../../../redux/ducks/user";

const Register = () => {

    const dispatch = useDispatch();

    const createUser = async (e) => {
        e.preventDefault();
        const email = e.target.mail.value;
        const password = e.target.psw.value;
        dispatch(registerUser(email, password))
        e.target.reset();
    }

    return(
        <div className='inner-box'>
            <p className='auth-title'>
                Join the best shopping cart community
            </p>
            <p className='register-description'>
                Take your shopping list wherever you go!
            </p>
            <form onSubmit={createUser} className='user-form'>
                <div className='input-div'>
                    <span className="material-icons">email</span>
                    <input type="email" name="mail" placeholder="Email"/>
                </div>
                <div className='input-div'>
                    <span className="material-icons">lock</span>
                    <input type="password" name="psw" placeholder="Password" />
                </div>
                <input type="submit" value="Start shopping now" className='submit-btn'/>
            </form>
        </div>
    )
}

export default Register;