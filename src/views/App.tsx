//use react dynamic imports
//check if use is logged in if user is logged in displace the home component
//also check if you is what user is authorized as 
//disable all functions that user isn't authorized

import React, {useEffect, useState} from 'react'
import axios from 'axios'

const App = ()=> {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
      const getStatus = async () => {
        try {
          const status = await axios.get(process.env.ENDPOINT+"/login/isAuthenticated");
          setIsLoggedIn(status)
        } catch (e) {
          //check cause or error
          //try again is necessary;
          //display error widget if error is untractable
        }
      };
  
    }, []);
  
    if (isLoggedIn) {
      return <Dashboard />;
    } else {
      return <LogIn />;
    }
}

export default App