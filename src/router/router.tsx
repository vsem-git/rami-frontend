import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home/Home'
import RootLayout from '../pages/Home/layout'
import Plastic from '../pages/Plastic/Plastic'
import PlasticLayout from '../pages/Plastic/layout'
import { Cosmetology } from '../pages/cosmetology/Cosmetology'
const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
		],
	},
	{
		path: '/plastic',
		element: <PlasticLayout />,
		children: [
			{
				index: true,
				element: <Plastic />,
			},
		],
	},
	{
		path: '/cosmetology',
		element: <Cosmetology />,
		children: [
			{
				index: true,
				element: <Cosmetology />,
			},
		],
	},
])

export default router
