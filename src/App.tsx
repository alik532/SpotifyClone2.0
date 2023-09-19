import React from 'react';
import {  BrowserRouter, Route, Routes } from 'react-router-dom';
import Main  from './pages/Main'
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Player from './components/Player';
import PlaylistPage from './pages/PlaylistPage';
import SideBar from './components/SideBar';
import QueuePage from './pages/QueuePage';
import Header from './components/Header';
import Search from './pages/Search';
import LibraryPage from './pages/LibraryPage';

function App() {
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='App'>
            <SideBar />
            <div className='content'>
              <Header />
              <Routes>
                  <Route path='/' element={<Main/>}/>
                  <Route path='/search' element={<Search/>}/>
                  <Route path='/playlist/:id' element={<PlaylistPage/>}/>
                  <Route path='/queue' element={<QueuePage />}/>
                  <Route path='/library' element={<LibraryPage />}/>
              </Routes>
            </div>
        </div>
      <div className='player'>
        <Player/>
      </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
