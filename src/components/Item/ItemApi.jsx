// import React, { useEffect, useState } from 'react';

// const ItemList = () => {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await fetch('http://ivan.firebreathlizard.space:12000/api/v1/projects');
//         const data = await response.json();
        
//         // Преобразуем данные из API в нужный формат
//         const formattedItems = data.projects.map((project, index) => ({
//           id: project.project_id.toString(),
//           content: project.title,
//           x: 0,
//           y: index * 50, // Примерное расположение по оси Y
//           isDragging: false,
//           expanded: false,
//         }));

//         setItems(formattedItems);
//       } catch (error) {
//         console.error('Ошибка при получении данных:', error);
//       }
//     };

//     fetchItems();
//   }, []); // Пустой массив зависимостей, чтобы выполнить эффект только один раз при монтировании

//   return (
//     <div>
//       {items.map(item => (
//         <div key={item.id} style={{ position: 'absolute', left: item.x, top: item.y }}>
//           {item.content}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ItemList;