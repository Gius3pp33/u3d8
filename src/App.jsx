// App.js

import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MyNavbar from './components/MyNavbar';
import MyFooter from './components/MyFooter';
import TrendingNow from './components/TrendingNow';
import WatchItAgain from './components/WatchItAgain';
import NewReleases from './components/NewReleases';
import Filters from './components/Filters';
import EditProfile from './components/EditProfile';
import TvShows from './components/TvShows';
import MovieDetails from './components/MovieDetails'; 

function App() {
  return (
    <Router>
      <div className="bg-dark text-white">
        <MyNavbar />
        <main className='container-fluid mt-4'>
          <Routes>
            <Route path="/" element={
              <>
                <Filters />
                <TrendingNow />
                <WatchItAgain />
                <NewReleases />
                <MyFooter />
              </>
            } />
            <Route path="/tv-shows" element={<TvShows />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/movie-details/:movieId" element={<MovieDetails />} /> 
          </Routes>
        </main>
        <MyFooter />
      </div>
    </Router>
  );
}

export default App;
