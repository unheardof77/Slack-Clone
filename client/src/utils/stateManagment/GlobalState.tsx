import { createContext, useContext } from 'react';
import { useStateReducer } from './reducer';

interface StateContextInterface {

}

const StateContext = createContext<StateContextInterface | null>(null);
const { Provider } = StateContext;

const StateProvider = ({value = [], ...props})=>{
    const [state, dispatch] = useStateReducer({});

    return <Provider value={[state, dispatch]} {...props} />;
};

const useStateContext = () => {
    return useContext(StateContext);
};
export { StateProvider, useStateContext };