import React, { useState } from 'react'
import Quiz from './Component/Quiz'


const App = () => {
  const[start,setStart]=useState('');
  return (<>{
    start==='start'?( <div>

      <Quiz/>
    </div>)
    :( <div className='body'>
   <div class="app">
    <h1>TestLine Quiz</h1>
    <div className="quiz flex flex-col ">
    <button onClick={()=>setStart('start')} className='text-black bg-green-600 cursor-pointer w-auto m-3 p-3 font-bold text-2xl'>Start</button>
        </div>
       
    </div>
   </div>)
   

   
}</> )
}

export default App