import React,{useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [detail,setDetail] = useState([]);
  const [viewDetail, setViewDetail] = useState(false);

  useEffect(()=>{
    isCompleted();
  },[]);

  const isCompleted = useCallback(()=>{
    axios.get("https://engineering-task.elancoapps.com/api/resources").then(data=>{
      setData(data.data)
    })
  },[setData]);

  const handleClick = useCallback(item=>{
    axios.get("https://engineering-task.elancoapps.com/api/resources/"+item).then(data=>{
      setDetail(data.data);
      setViewDetail(true);
    })
  },[setViewDetail,setDetail])

  if(viewDetail){
    return (
      detail.map(detail =>(
        <div className="detailBlock">
          <div> <b>Consumed Quantity: </b> {detail.ConsumedQuantity} </div>
          <div> <b>Cost: </b> {detail.Cost} </div>
          <div> <b>Date </b> {detail.Date} </div>
          <div> <b>Instance Id </b> {detail.InstanceId} </div>
          <div> <b>Meter Category: </b> {detail.MeterCategory} </div>
          <div> <b>Resource Group: </b> {detail.ResourceGroup} </div>
          <div> <b>Resource Location </b> {detail.ResourceLocation} </div>
          <div> <b>Unit Of Measure: </b> {detail.UnitOfMeasure} </div>
          <div> <b>Location: </b> {detail.Location} </div>
          <div> <b>Service Name: </b> {detail.ServiceName} </div>
        </div>  
      ))
    )
  }

  return (
    <div className="App">
      <h3> Resources </h3>
      {data.map(item=>(
        <div onClick={()=>handleClick(item)}>
          <a href="#">{item}</a>
          </div>
      ))
      }
    </div>
  );
}

export default App;
