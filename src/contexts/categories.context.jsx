import { createContext, useState, useEffect } from 'react';

//-----------------------------------------------------------------------------
// this line is to push de json to fireBase DataBase:
//import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils';
//-----------------------------------------------------------------------------

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';


// import SHOP_DATA from '../shop-data.js';

export const  CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log(categoryMap);
      setCategoriesMap(categoryMap);
    }

    getCategoriesMap();
  }, []);
//-----------------------------------------------------------------------------
  // this is required to push de json to fireBase DataBase:
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // }, [])
//-----------------------------------------------------------------------------
  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
  )
}