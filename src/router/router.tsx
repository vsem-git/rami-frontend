import { createBrowserRouter } from 'react-router-dom'
import Doctors from '../pages/Doctors/Doctors'
import DoctorsLayout from '../pages/Doctors/layout'
import Home from '../pages/Home/Home'
import RootLayout from '../pages/Home/layout'
import Plastic from '../pages/Plastic/Plastic'
import PlasticLayout from '../pages/Plastic/layout'
import Reabilitation from '../pages/Reabilitation/Reabilitation'
import ReabilitationLayout from '../pages/Reabilitation/layout'
import { Antiage } from '../pages/antiage/Antiage'
import AntiageLayout from '../pages/antiage/layout'
import { Apartments } from '../pages/apartments/Apartments'
import ApartmentsLayout from '../pages/apartments/layout'
import { Contact } from '../pages/contact/Contact'
import ContactLayout from '../pages/contact/layout'
import { Cosmetology } from '../pages/cosmetology/Cosmetology'
import CosmetologyLayout from '../pages/cosmetology/layout'
import { Doctor } from '../pages/doctor/Doctor'
import DoctorLayout from '../pages/doctor/layout'
import { OperationRooms } from '../pages/operation-rooms/OperationRooms'
import OperationRoomsLayout from '../pages/operation-rooms/layout'
import { PrivacyPolicy } from '../pages/privacy-policy/PrivacyPolicy'
import PrivacyPolicyLayout from '../pages/privacy-policy/layout'
import { Safety } from '../pages/safety/Safety'
import SafetyLayout from '../pages/safety/layout'
import GettingReady from '../pages/getting-ready/GettingReady'
import GettingReadyLayout from '../pages/getting-ready/layout'

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
		element: <CosmetologyLayout />,
		children: [
			{
				index: true,
				element: <Cosmetology />,
			},
		],
	},
	{
		path: '/anti-age',
		element: <AntiageLayout />,
		children: [
			{
				index: true,
				element: <Antiage />,
			},
		],
	},
	{
		path: '/doctor',
		element: <DoctorLayout />,
		children: [
			{
				index: true,
				element: <Doctor />,
			},
		],
	},
	{
		path: '/reabilitation',
		element: <ReabilitationLayout />,
		children: [
			{
				index: true,
				element: <Reabilitation />,
			},
		],
	},
	{
		path: '/doctors',
		element: <DoctorsLayout />,
		children: [
			{
				index: true,
				element: <Doctors />,
			},
		],
	},
	{
		path: '/safety',
		element: <SafetyLayout />,
		children: [
			{
				index: true,
				element: <Safety />,
			},
		],
	},
	{
		path: '/apartments',
		element: <ApartmentsLayout />,
		children: [
			{
				index: true,
				element: <Apartments />,
			},
		],
	},
	{
		path: '/operation-rooms',
		element: <OperationRoomsLayout />,
		children: [
			{
				index: true,
				element: <OperationRooms />,
			},
		],
	},
	{
		path: '/contact',
		element: <ContactLayout />,
		children: [
			{
				index: true,
				element: <Contact />,
			},
		],
	},
	{
		path: '/privacy-policy',
		element: <PrivacyPolicyLayout />,
		children: [
			{
				index: true,
				element: <PrivacyPolicy />,
			},
		],
	},
	{
		path: '/getting-ready',
		element: <GettingReadyLayout />,
		children: [
			{
				index: true,
				element: <GettingReady />,
			},
		],
	},
])

export default router
