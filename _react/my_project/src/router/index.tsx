import { BrowserRouter, HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from '@/App';
import Login from '@/views/login';
import SandBox from '@/views/sandBox';
import Home from '@/views/sandBox/home';
import User from '@/views/sandBox/user';
import Rights from '@/views/sandBox/rights';
import Error from '@/views/404';

const router = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/" element={<SandBox />}>
				<Route path="/home" element={<Home />} />
				<Route path="/user" element={<User />} />
				<Route path="/rights" element={<Rights />} />
				<Route path="/" element={<Navigate to={'/home'} />} />
				<Route path="*" element={<Error />} />
			</Route>

			{/* <Route path="/" element={localStorage.getItem('token') ? <SandBox /> : <Navigate to={'/login'} />}></Route> */}
		</Routes>
	</BrowserRouter>
);

export default router;
