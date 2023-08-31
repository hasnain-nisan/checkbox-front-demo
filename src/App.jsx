import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Filter from './pages/Filter';
import Review from './pages/Review';

const App = () => {
    // const accessToken = '348|YOCslUJR9Gfqjy3Q0hvHT16bAyV7YG27Ax4MOBfC';
    // axios.defaults.baseURL = 'https://phpstack-924353-3259330.cloudwaysapps.com/api/v2';
    const accessToken = '85|WMOUjMRY9LQmr07jpNElj8CDCkyBkKgq7vUPtgLN';
    axios.defaults.baseURL = 'http://localhost/checkbox-v2/api/v2/';
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    axios.defaults.headers.common['Checkbox-Api-V2-Key'] = '83324867-6668-4c04-bf36-91714ea8b3e3';

    axios.defaults.headers["Accept"] = "application/json";
    axios.defaults.headers.post["Content-Type"] = "multipart/form-data; charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";


  return (
    <div className="">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/filter" element={ <Filter/> } />
        <Route path="/review" element={ <Review/> } />
      </Routes>
    </div>
  )
}

export default App