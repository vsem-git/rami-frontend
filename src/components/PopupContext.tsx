import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react'

type PopupState = Record<string, boolean>
type PopupData = Record<string, any>

type PopupContextType = {
	popups: PopupState
	popupData: PopupData
	openPopup: (name: string, data?: any) => void 
	closePopup: (name: string) => void
	closeAllPopups: () => void
	togglePopup: (name: string) => void
	isOpen: (name: string) => boolean
	getPopupData: (name: string) => any
	isHeaderVisible: boolean
}

const PopupContext = createContext<PopupContextType>({
	popups: {},
	popupData: {},
	openPopup: () => {},
	closePopup: () => {},
	closeAllPopups: () => {},
	togglePopup: () => {},
	isOpen: () => false,
	getPopupData: () => null,
	isHeaderVisible: true,
})

export const usePopup = () => useContext(PopupContext)

type PopupProviderProps = { children: ReactNode }

export const PopupProvider: React.FC<PopupProviderProps> = ({ children }) => {
	const [popups, setPopups] = useState<PopupState>({})
	const [popupData, setPopupData] = useState<PopupData>({})
	const [isHeaderVisible, setIsHeaderVisible] = useState(true)

	const updateScrollState = useCallback((anyOpen: boolean) => {
		const smoother = (window as any).ScrollSmoother?.get?.()
		if (smoother) {
			smoother.paused(anyOpen)
		}
	}, [])

	useEffect(() => {
		const anyOpen = Object.values(popups).some(Boolean)
		updateScrollState(anyOpen)
	}, [popups, updateScrollState])

	const openPopup = useCallback((name: string, data?: any) => {
		setPopups(prev => ({ ...prev, [name]: true }))
		if (data) {
			setPopupData(prev => ({ ...prev, [name]: data }))
		}
		if (name === 'contact') setIsHeaderVisible(false)
	}, [])

	const closePopup = useCallback((name: string) => {
		setPopups(prev => ({ ...prev, [name]: false }))
		// Очищаем данные после небольшой задержки (чтобы анимация закрытия завершилась)
		setTimeout(() => {
			setPopupData(prev => {
				const newData = { ...prev }
				delete newData[name]
				return newData
			})
		}, 300)
		if (name === 'contact') setIsHeaderVisible(true)
	}, [])

	const closeAllPopups = useCallback(() => {
		setPopups({})
		setPopupData({})
		setIsHeaderVisible(true)
	}, [])

	const togglePopup = useCallback((name: string) => {
		setPopups(prev => ({ ...prev, [name]: !prev[name] }))
		if (name === 'contact') setIsHeaderVisible(prev => !prev)
	}, [])

	const isOpen = useCallback((name: string) => !!popups[name], [popups])

	const getPopupData = useCallback(
		(name: string) => popupData[name],
		[popupData]
	)

	const value = {
		popups,
		popupData,
		openPopup,
		closePopup,
		closeAllPopups,
		togglePopup,
		isOpen,
		getPopupData,
		isHeaderVisible,
	}

	return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
}
