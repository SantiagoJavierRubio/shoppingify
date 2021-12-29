import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkUser } from './redux/ducks/user';
import { getActiveList } from './redux/ducks/itemList';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import Right from './components/Right/Right';
import UserAuth from './components/UserAuth/UserAuth';
import './App.css'

function App() {

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(checkUser())
    dispatch(getActiveList())
  }, []);
  
  if(user) return (
    <div className="App">
        <Sidebar />
        <Main />
        <Right />
    </div>
  );
  return <UserAuth />
}

export default App;
