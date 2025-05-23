import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
type Item={
    id:number,
    name:string
};

const initalItems =[{id:1, name:"Apple"},{id:2,name:"Banana"},{id:3,name:"Graps"},{id:4,name:"Papaya"},{id:5,name:"Watermelon"}]
const Task :React.FC = ()=>{
const [items,setItems] = useState<Item[]>(initalItems);
const [res, setRes] = useState<Item[]>([]);
const navigate = useNavigate();
const handleMove =(items:Item)=>{
    setItems((prev)=>prev.filter((i)=>i.id !==items.id));
    setRes((prev)=>[...prev,items])
}
    return(
        <div style={{display:"flex",justifyContent:"center", gap:"40px",padding:"20px"}}>
  <button
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          backgroundColor: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        ← Back
      </button>          
            <div>
                <h3>Listing Task</h3>
                <ul style={{listStyle:"none",padding:0, width:"150px", border: "1px solid #ccc", borderRadius:"4px",paddingInline:"10px"}}>
                    {
                        items.map((item)=>(
                    <li key={item.id} style={{margin:"10px 0"}}><button style={{width:"100%"}} onClick={()=>handleMove(item)}>{item.name}</button></li>
                        ))}
                    
                </ul>

            </div>
            <div>
                <h3>Selected Items</h3>
                <ul style={{listStyle:"none",padding:0,width:"150px", border:"1px solid #ccc",borderRadius:"4px", paddingInline:"10px"}}>
                    {res.map((item)=>(
                        <li key={item.id} style={{margin:"10px 0"}}>{item.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default Task;