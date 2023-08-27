import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Filter from './pages/Filter';

const App = () => {
    // const accessToken = '51|mcDG2AWWgN7m1oAlH5I4E9wQ0GB82eMvePsNUMnB';
    axios.defaults.baseURL = 'https://phpstack-924353-3259330.cloudwaysapps.com/api/v2';
    // axios.defaults.baseURL = 'http://localhost/checkbox-v2/api/v2/';
    // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    axios.defaults.headers.common['Checkbox-Api-V2-Key'] = '83324867-6668-4c04-bf36-91714ea8b3e3';


  return (
    <div className="">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/filter" element={ <Filter/> } />
      </Routes>
    </div>
  )
}

export default App