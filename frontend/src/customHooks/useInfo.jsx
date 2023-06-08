import { useState } from "react"

// info pop up
export const useInfo = () => {
    const [isInfoOpen, setIsInfoOpen] = useState(false); 
    
    const handleInfo = () => {
        setIsInfoOpen(!isInfoOpen)
    }

    return {isInfoOpen, setIsInfoOpen, handleInfo}
}