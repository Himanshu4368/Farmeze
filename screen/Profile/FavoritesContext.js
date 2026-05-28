import React, { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {

  const [favourites,setFavourites]=useState([]);

  const addToFavourites=(item)=>{

    const exists=favourites.find(
      fav=>fav.id===item.id
    );

    if(!exists){
      setFavourites([
        ...favourites,
        item
      ]);
    }
  };

  const removeFromFavourites=(id)=>{

    setFavourites(
      favourites.filter(
        item=>item.id!==id
      )
    );

  };

  const isFavourite=(id)=>{

    return favourites.some(
      item=>item.id===id
    );

  };

  return(

    <FavoritesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        isFavourite
      }}
    >

      {children}

    </FavoritesContext.Provider>

  );

};

export const useFavorites=()=>{

return useContext(
FavoritesContext
);

};