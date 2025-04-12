import { useState, useEffect } from "react";
import axios from "axios";

const useGetAxios = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(1);

  useEffect(() => {
    const requestData = async () => {
      try {
        const response = await axios.get(url);
        // console.log(response.headers);
        const pages = response.headers['x-total-count'];
        // console.log('Total pages:', pages);
        if(response.status === 200){
          setData(response.data);
          setTotalCount(pages); 
          setLoading(false);
        }else{
          throw new Error("Error en el código de estado");
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    requestData();
  },[url])

  return { data, totalCount, loading, error };
}

export default useGetAxios;
