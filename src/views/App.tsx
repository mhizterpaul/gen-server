//use react dynamic imports
//check if use is logged in if user is logged in displace the home component
//also check if you is what user is authorized as 
//disable all functions that user isn't authorized

import React, {Suspense, lazy} from 'react'


const OtherComponent = React.lazy(() => import('./OtherComponent'));

const App = ()=> {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const checkLogin = async () => {
        try {
          await axios.get('http://localhost:5000/token', { withCredentials: true });
          setIsLoggedIn(true);
        } catch (e) {
          setIsLoggedIn(false);
        }
      };
  
      checkLogin();
    }, []);
  
    if (isLoggedIn) {
      return <div>Welcome back!</div>;
    } else {
      return <div>Please log in.</div>;
    }
}

export default App