// GlobalState.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the shape of the global state
interface GlobalState {
    currentGame: string;
}

// Define the available actions
type Action = { type: 'SET_CURRENT_GAME'; id: string }; // | { type: 'OTHER_ACTION' };

// Create a context
const GlobalStateContext = createContext<{ state: GlobalState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

// Define initial state
const initialState: GlobalState = {
    currentGame: "",
};

// Define reducer function to handle state updates
const reducer = (state: GlobalState, action: Action): GlobalState => {
    switch (action.type) {
        case 'SET_CURRENT_GAME':
            return { ...state, currentGame: action.id };
        default:
            return state;
    }
};

// Create a provider component
export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GlobalStateContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

// Custom hook to access the global state and dispatch
export const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
};
