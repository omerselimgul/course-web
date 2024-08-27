import { createContext, useContext, useEffect, useState } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { FireBaseStorage } from "../../Firebase/firebase";

const FirabaseContext = createContext();

const FirabaseProvider = ({ children }) => {
  //   const storage = localStorage.getItem("user");

  //   const user = JSON.parse(storage);
  //   const token = user?.AccessToken;

  const getFiles = async (params) => {
    const fileListRef = ref(FireBaseStorage, "files/");
    const files = await listAll(fileListRef);
    if (files.items.length > 0 && params) {
      const item = files.items.find((x) => x.fullPath.includes(params));
      const dowlandedItem = await getDownloadURL(item);
      return dowlandedItem;
    } else if (files.items.length > 0) {
      const result = [];
      for (const item of files.items) {
        const dowlandedItem = await getDownloadURL(item);
        result.push({ url: dowlandedItem, uuid: item.fullPath.split("/")[1] });
      }

      return result;
    } else {
      return null;
    }
  };

  const values = { getFiles };
  return (
    <FirabaseContext.Provider value={values}>
      {children}
    </FirabaseContext.Provider>
  );
};

const useFirabase = () => {
  const context = useContext(FirabaseContext);
  return context;
};

export { useFirabase };

export default FirabaseProvider;
