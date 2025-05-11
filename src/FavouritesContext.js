// // src/context/FavouritesContext.js
// import React, { createContext, useState, useContext } from 'react';

// const FavouritesContext = createContext();

// export const FavouritesProvider = ({ children }) => {
//   const [favourites, setFavourites] = useState([]);

//   const addToFavourites = (item) => {
//     setFavourites((prev) =>
//       prev.find((fav) => fav.id === item.id) ? prev : [...prev, item]
//     );
//   };

//   const removeFromFavourites = (id) => {
//     setFavourites((prev) => prev.filter((item) => item.id !== id));
//   };

//   return (
//     <FavouritesContext.Provider
//       value={{ favourites, addToFavourites, removeFromFavourites }}
//     >
//       {children}
//     </FavouritesContext.Provider>
//   );
// };

// export const useFavourites = () => useContext(FavouritesContext);
