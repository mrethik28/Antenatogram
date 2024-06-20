import { useNavigate } from "react-router-dom";
 
 
 const useLoginRedirect = () => {
    const navigate = useNavigate();
    navigate('/login');   
    return;
 }
 
 export default useLoginRedirect