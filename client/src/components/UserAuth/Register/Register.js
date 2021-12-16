import axios from '../../../axiosConfig';

const Register = () => {
    
    const createUser = async (e) => {
        e.preventDefault();
        const email = e.target.mail.value;
        const password = e.target.psw.value;
        if(email === '') return errorHandler({field: 'user', code: 'missing'});
        if(password === '') return errorHandler({field: 'password', code: 'missing'});
        try {
            axios.post('users/create', {email, password});
        } catch (error) {
            errorHandler(error);
        }
    }

    const errorHandler = (error) => {
        const code = error.code;
        // if(code === 'auth/weak-password') return setError({type: 'password', message: 'Password should be at least 6 characters'});
        // if(code === 'auth/email-already-in-use') return setError({type: 'user', message: 'This mail is already in use!'});
        // if(code === 'auth/internal-error') return setError({type: 'firebase', message: 'Something went wrong, try again.'});
        // if(code === 'missing') return setError({ type: error.field, message: 'This field is required.'});
        // return setErrorView(error.message);
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
                {/*authError.type === 'user' && <p className="error-msg">*{authError.message}</p>*/}
                <div className='input-div'>
                    <span className="material-icons">email</span>
                    <input type="email" name="mail" placeholder="Email"/>
                </div>
                {/*authError.type === 'password' && <p className="error-msg">*{authError.message}</p>*/}
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