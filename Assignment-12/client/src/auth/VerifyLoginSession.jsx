import { useContext } from 'react'
import GlobalContext from '../GlobalContext/GlobalContext';
import { Navigate } from 'react-router-dom';

export default function VerifyUserLogin({children}) {
    const {userToken} = useContext(GlobalContext);

    if (userToken != null) return children
    else return <Navigate to="/" />;
}
