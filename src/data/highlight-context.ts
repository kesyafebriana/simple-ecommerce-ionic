import React from 'react';

export interface Highlight {
    photo: string
}

interface Context {
    highlight: Highlight[];
}

const HighlightContext = React.createContext<Context>({
    highlight: []
});

export default HighlightContext;