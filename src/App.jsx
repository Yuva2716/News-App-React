import { useState } from 'react';
import Navbar from './Components/Navbar';
import NewsArea from './Components/NewsArea';


const App = () => {
  const [category,setCategory] = useState("general");
  return (
    <>
      <Navbar setCategory={setCategory} />
      <NewsArea category={category}/>      
    </>
  )
}

export default App