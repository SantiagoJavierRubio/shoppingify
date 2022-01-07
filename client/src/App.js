import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkUser } from './redux/ducks/user';
import { getActiveList } from './redux/ducks/itemList';
import './App.css'

// Components
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import Right from './components/Right/Right';
import UserAuth from './components/UserAuth/UserAuth';
import CancelModal from './components/CancelModal/CancelModal';
import Toast from './components/Toast/Toast';

function App() {

  const user = useSelector((state) => state.user.user);
  const showModal = useSelector((state) => state.views.modal);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(checkUser())
  }, []);

  useEffect(() => {
    dispatch(getActiveList())
  }, [user])
  
  return(
    <>
      <Toast />
      {user ? 
      <div className="App">
        {showModal && <CancelModal />}
        <Sidebar />
        <Main />
        <Right />
      </div>
      :
      <UserAuth />}
    </>
  )
  if(user) return (
    <div className="App">
        {showModal && <CancelModal />}
        <Sidebar />
        <Main />
        <Right />
    </div>
  );
  return <UserAuth />
}

export default App;
