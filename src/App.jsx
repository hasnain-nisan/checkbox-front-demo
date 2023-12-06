import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Filter from './pages/Filter';
import Review from './pages/Review';
import Charts from './pages/Charts';
import Product from './components/Product';
import Productview from './pages/Product';
import { useEffect } from 'react';
import { fbConfig, loadFacebookSDK } from './fbConfig';
import Collection from './pages/Collection';
import Dashboard from './pages/Dashboard';

const App = () => {
    const accessToken = '467|6UKJoE9yUXrunyxb7G60Hvtos3AqqTxPyTuqSZBG';
    axios.defaults.baseURL = 'https://phpstack-924353-3259330.cloudwaysapps.com/api/v2';
    // const accessToken = '621|VPbkQwLJAnUsuU8nfGSwgKl16C1JLm4eIaF4keDl';
    // axios.defaults.baseURL = 'http://localhost/checkbox-v2/api/v2/';
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    axios.defaults.headers.common['Checkbox-Api-V2-Key'] = '83324867-6668-4c04-bf36-91714ea8b3e3';

    axios.defaults.headers["Accept"] = "application/json";
    axios.defaults.headers.post["Content-Type"] = "multipart/form-data; charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

    useEffect(() => {
      loadFacebookSDK()
        .then((FB) => {
          FB.init({
            appId: fbConfig.appId,
            version: "v17.0",
            status: true,
            cookie: true,
          });
        })
        .catch((error) => {
          console.error("Failed to load Facebook SDK:", error);
        });
    }, []);


  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/review" element={<Review />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/product" element={<Productview />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App