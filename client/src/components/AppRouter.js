import {Routes, Route, Navigate} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes';
import { SHOP_ROUTE } from '../utils/consts';
import { useContext, useEffect } from 'react';
import { Context } from '../index';
import { check } from '../http/userAPI';




const AppRouter = () => {
    const {user} = useContext(Context)

    console.log(user)
    return(
        <Routes>
        {user.isAuth && authRoutes.map(({ path, Component }) =>
           <Route key={path} path={path} element={<Component/>} exact />
        )}
        {publicRoutes.map(({ path, Component }) =>
           <Route key={path} path={path} element={<Component/>} exact />
        )}
            <Route path="*" element={<Navigate to={SHOP_ROUTE} />}/>
     </Routes>
    );
    
};

export default AppRouter;