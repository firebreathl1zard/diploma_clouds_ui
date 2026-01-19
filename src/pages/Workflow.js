import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Board from '../components/Board';
import Menu from '../components/Menu/Menu';
import { MenuProvider } from '../hooks/Menu/MenuContext';
import Profile from '../components/Profile';
import SearchBar from '../components/SearchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { unauthorized } from './authSlice';
import '../styles/HomePages.css'; 

const WorkflowPages = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const handleOnDragEnd = (result) => {    
    if (!result.destination) return;

    const itemsCopy = Array.from(items);           
    const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
    itemsCopy.splice(result.destination.index, 0, reorderedItem);

    itemsCopy.forEach((item, index) => {
      item.zIndex = index + 1;
    });

    setFilteredItems(itemsCopy); 
  };

  const checkTokenExpiration = () => {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (tokenExpiration && Date.now() > tokenExpiration) {
      handleLogout();
    }
  };

  const handleLogout = () => {
    console.log("User  logged out");
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    dispatch(unauthorized());
    window.location.href = '/';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 300000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <SearchBar className='SearchBarWorkflow' setFilteredItems={setFilteredItems}/>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
      <MenuProvider>
      <Menu items={filteredItems} setItems={setFilteredItems}/>
      </MenuProvider>
      </div>
      <div className='profile-container'><Profile></Profile></div>
    </DragDropContext>
  );
};

export { WorkflowPages };