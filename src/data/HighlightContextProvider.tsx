import React, {useState} from 'react';
import HighlightContext, {Highlight} from "./highlight-context";

interface HighlightContextProviderProps { 
    children: React.ReactNode; 
   } 
    
const HighlightContextProvider: React.FC<HighlightContextProviderProps> = (props) => {
    const [highlights, setHighlights] = useState<Highlight[]>([
        {
            photo: './images/2.png'
        },
        {
            photo: './images/1.png'
        },
        {
            photo: './images/3.png'
        },
        {
            photo: './images/5.png'
        },
        {
            photo: './images/4.png'
        },
    ]);

    return (
        <HighlightContext.Provider value={{
            highlight: highlights
        }}>
            {props.children}
        </HighlightContext.Provider>
    );
}

export default HighlightContextProvider;