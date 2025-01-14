import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import useUserStore from './store/userStore';
import { useNavigate } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);
  const { name, image, email } = useUserStore();
  const navigate = useNavigate(); // To programmatically navigate the user

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');  // Declare loggedIn inside useEffect
    console.log("This should execute: ", loggedIn);

    if (loggedIn === null || loggedIn === '') {
      navigate('/signup');
      return;
    }
  }, []);  // Empty dependency array because we only need to check on initial render

  return (
    <>
      <Home />
      
    </>
  );
}

export default App;
