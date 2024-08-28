
import { Button, } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import p2 from "../assets/p2.jpg"
const Welcome = () => {
    const navigate = useNavigate();
    const handleButtonClick = ()=>{
        navigate('/Home');
    }
  return (
   <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${p2})` }}
    >
      <div className="flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-60 p-6">
        <h1 className="text-6xl font-extrabold   text-white mb-6 text-center">
          Welcome to Sindh Museum
        </h1>
        <Button onClick={handleButtonClick} className= "hover:outline outline-teal-300 hover:text-3xl ease-in-out border-2 p-3 rounded-lg text-2xl font-medium text-teal-500 shadow-lg shadow-teal-500 mb-12 text-center">
          Continue with AI Tourist Guider
        </Button>
       
      </div>
    </div>
  )
}
export default Welcome