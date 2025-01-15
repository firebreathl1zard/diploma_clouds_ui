// import React, { useState, useRef, useEffect } from 'react';


// const MenuApi = () => {
  

  
//   const [itemes, setItemes] = useState([]);
  
//     useEffect(() => {
//       const fetchItems = async () => {
//         try {
//           const response = await fetch('http://ivan.firebreathlizard.space:12000/api/v1/projects');
//           const data = await response.json();
          
//           // Преобразуем данные из API в нужный формат
//           const formattedItems = data.projects.map((project, index) => ({
//             id: project.project_id.toString(),
//             content: project.title,
//             x: 0,
//             y: index * 50, // Примерное расположение по оси Y
//             isDragging: false,
//             expanded: false,
//           }));
  
//           setItemes(formattedItems);
//         } catch (error) {
//           console.error('Ошибка при получении данных:', error);
//         }
//       };
  
//       fetchItems();
//     }, []); // Пустой массив зависимостей, чтобы выполнить эффект только один раз при монтировании

  

//   return (
//     <></>
//   );
// };

// export default MenuApi;