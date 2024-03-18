import { useEffect } from 'react';
import './App.css';
import { loadUser } from './action/userAction';
import { AllRoutes } from './components/layout/AllRoutes';
import { Footer } from './components/layout/Footer/Footer';
import { Navbar } from './components/layout/Navbar/Navbar';
import store from './store';

//import { useSelector } from 'react-redux';
//import { UserOptions } from './components/layout/Navbar/UserOptions';

function App() {
  // const {isAuthenticated,user}=useSelector(state=>state.user)
  
  
  useEffect(()=>{
  store.dispatch(loadUser());
  
  },[])
  return (
    <div className="App">
      <Navbar />
      {/* {isAuthenticated && <UserOptions user={user}/>} */}
      <AllRoutes />
      <Footer/>
      
    </div>
  );
}

export default App;
