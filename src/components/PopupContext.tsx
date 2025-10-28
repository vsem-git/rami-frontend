import React, {
	createContext,
	useCallback,
	useContext,
	useState,
	type ReactNode,
} from 'react'

type PopupState = Record<string, boolean>

type PopupContextType = {
	popups: PopupState
	openPopup: (name: string) => void
	closePopup: (name: string) => void
	closeAllPopups: () => void
	togglePopup: (name: string) => void
	isOpen: (name: string) => boolean
	isHeaderVisible: boolean
}

const PopupContext = createContext<PopupContextType>({
	popups: {},
	openPopup: () => {},
	closePopup: () => {},
	closeAllPopups: () => {},
	togglePopup: () => {},
	isOpen: () => false,
	isHeaderVisible: true,
})

export const usePopup = () => useContext(PopupContext)

type PopupProviderProps = { children: ReactNode }

export const PopupProvider: React.FC<PopupProviderProps> = ({ children }) => {
	const [popups, setPopups] = useState<PopupState>({})
	const [isHeaderVisible, setIsHeaderVisible] = useState(true)

	const openPopup = useCallback((name: string) => {
		setPopups(prev => ({ ...prev, [name]: true }))

		if (name === 'contact') {
			setIsHeaderVisible(false)
		}
	}, [])

	const closePopup = useCallback((name: string) => {
		setPopups(prev => ({ ...prev, [name]: false }))

		if (name === 'contact') {
			setIsHeaderVisible(true)
		}
	}, [])

	const closeAllPopups = useCallback(() => {
		setPopups({})
		setIsHeaderVisible(true) 
	}, [])

	const togglePopup = useCallback((name: string) => {
		setPopups(prev => ({ ...prev, [name]: !prev[name] }))

		if (name === 'contact') {
			setIsHeaderVisible(prev => !prev)
		}
	}, [])

	const isOpen = useCallback((name: string) => !!popups[name], [popups])

	const value = {
		popups,
		openPopup,
		closePopup,
		closeAllPopups,
		togglePopup,
		isOpen,
		isHeaderVisible,
	}

	return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
}
