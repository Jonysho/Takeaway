import { useState } from "react"

// info pop up
export const useInfo = () => {
    const [isInfoOpen, setIsInfoOpen] = useState(true); 
    
    const handleInfo = () => {
        setIsInfoOpen(!isInfoOpen)
    }

    return {isInfoOpen, setIsInfoOpen, handleInfo}
}