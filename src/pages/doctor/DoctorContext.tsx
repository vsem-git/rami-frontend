import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchDoctorBySlug } from '../../services/doctors'
import { doctorFromRecord } from '../../shared/utils/doctorFromRecord'
import type { Doctor } from '../../shared/types/doctor'

interface DoctorContextType {
    doctor: Doctor | null | undefined
    loading: boolean
}

const DoctorContext = createContext<DoctorContextType>({
    doctor: undefined,
    loading: true,
})

export const DoctorProvider = ({ children }: { children: ReactNode }) => {
    const [doctor, setDoctor] = useState<Doctor | null | undefined>(undefined)
    const [loading, setLoading] = useState(true)
    const location = useLocation()

    useEffect(() => {
        const pathParts = location.pathname.split('/').filter(Boolean)
        const slug = pathParts[pathParts.length - 1]
        
        if (slug && slug !== 'doctor') {
            setLoading(true)
            fetchDoctorBySlug(slug).then(record => {
                if (record) {
                    setDoctor(doctorFromRecord(record))
                } else {
                    setDoctor(null)
                }
                setLoading(false)
            })
        } else {
            setDoctor(null)
            setLoading(false)
        }
    }, [location.pathname])

    return (
        <DoctorContext.Provider value={{ doctor, loading }}>
            {children}
        </DoctorContext.Provider>
    )
}

export const useDoctor = () => {
    const context = useContext(DoctorContext)
    if (!context) {
        throw new Error('useDoctor must be used within DoctorProvider')
    }
    return context
}
