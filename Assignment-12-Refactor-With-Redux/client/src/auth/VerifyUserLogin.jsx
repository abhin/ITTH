import { useContext } from 'react'
import GlobalContext from '../GlobalContext/GlobalContext';
import { Navigate } from 'react-router-dom';

export default function VerifyUserLogin({children}) {
    const {user} = useContext(GlobalContext);
    
    if (user == null) return <Navigate to="/login"/>
    else return  children;
}
