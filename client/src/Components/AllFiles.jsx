import { useEffect, useState } from "react";

export const AllFiles=()=>{

    const [files,setFiles]=useState([]);
    const getFile = async () => {
        const response = await fetch(`http://localhost:3001/getfile`, {
          method: "GET"
        });
        const data = await response.json();
       
        setFiles(data);
      };

      useEffect(()=>{
        getFile();
      },[]);


      return(
        <div>
            {files && files.map((item)=>{
                return <p key={Math.random()}>{JSON.stringify(item)}</p>
            })}
        </div>
      )
}