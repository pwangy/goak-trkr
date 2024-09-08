import { createBrowserRouter } from 'react-router-dom'
import App from '../App'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		// errorElement: <Error />,
		// children: [
		// 	{
		// 		path: '/',
		// 		element: <Auth />,
		// 		index: true
		// 	},
		// 	{
		// 		path: '/new',
		// 		element: <NewEntry />
		// 	},
		// 	{
		// 		path: '/view',
		// 		element: <Entries />
		// 	},
		// 	{
		// 		path: '/view/:id',
		// 		element: <Entry />
		// 	},
		// ]
	}
])

export default router
