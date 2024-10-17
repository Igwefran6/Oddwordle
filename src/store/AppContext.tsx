import { createContext, Dispatch, useReducer, ReactNode } from "react";
import SecureLocalStorage from "../utils/SecureLocalStorage";

interface StateType {
  achivements: {
    totalPoints: number;
    highestPointInOneGame: number;
    cardTypes: {
      canDoBetter: boolean; // user gets 20 percent or 10 percent of question correct when playing 5/5 or 10/10 respectively >= 4 words difficulty
      dumbass: boolean; // user gets 0 percent of question correct when playing 5/5 or 10/10 >= 4 words difficulty
      gotAllQuestion: boolean; // user gets 100 percent of question correct when playing 10/10 >= 4 words difficulty
      highIQ: boolean; // user gets 100 percent of question correct when playing 10/10 >= 8 words difficulty
      impossiblePlayer: boolean; // user gets 100 percent of question correct when playing 10/10 >= 12 words difficulty
      smard: boolean; // user gets 80 percent of question correct when playing 5/5 or 10/10 >= 4 words difficulty
      smartAss: boolean; // user gets 80 percent of question correct when playing 5/5 or 10/10 >= 6 words difficulty
      TopTenPercent: boolean; // user gets 80 percent of question correct when playing 5/5 or 10/10 >= 8 words difficulty
      TopOnePercent: boolean; // user gets 80 percent of question correct when playing 5/5 or 10/10 >= 10 words difficulty
    };
  };
  attempts: 5 | 10;
  credits: number;
  clickedIndices: number[];
  currentWord: string;
  difficulty: number; // character count 4 to 12
  initialUserSetWord: string[];
  sharedToday: boolean;
  userSetWord: string[];
}

type ActionType =
  | { type: "STORE_USER_DATA"; payload: { key: string; data: string } }
  | { type: "GET_USER_DATA"; payload: { key: string } };

const initialState: StateType = {
  achivements: {
    totalPoints: 0,
    highestPointInOneGame: 0,
    cardTypes: {
      canDoBetter: false, // user gets 20 percent or 10 percent of question correct when playing 5/5 or 10/10 respectively >= 4 words difficulty
      dumbass: false, // user gets 0 percent of question correct when playing 5/5 or 10/10 >= 4 words difficulty
      gotAllQuestion: false, // user gets 100 percent of question correct when playing 10/10 >= 4 words difficulty
      highIQ: false, // user gets 100 percent of question correct when playing 10/10 >= 8 words difficulty
      impossiblePlayer: false, // user gets 100 percent of question correct when playing 10/10 >= 12 words difficulty
      smard: false, // user gets 80 percent of question correct when playing 5/5 or 10/10 >= 4 words difficulty
      smartAss: false, // user gets 80 percent of question correct when playing 5/5 or 10/10 >= 6 words difficulty
      TopTenPercent: false, // user gets 80 percent of question correct when playing 5/5 or 10/10 >= 8 words difficulty
      TopOnePercent: false, // user gets 80 percent of question correct when playing 5/5 or 10/10 >= 10 words difficulty
    },
  },
  attempts: 5,
  credits: 0,
  clickedIndices: [],
  currentWord: "",
  difficulty: 4, // character count 4 to 12
  initialUserSetWord: [],
  sharedToday: false,
  userSetWord: [],
};

function Reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "GET_USER_DATA":
      return SecureLocalStorage.retrieveData(action.payload.key);
    case "STORE_USER_DATA":
      SecureLocalStorage.saveData(action.payload.key, initialState);
      return state;
    default:
      return state;
  }
}

interface ContextType {
  state: StateType;
  dispatch: Dispatch<ActionType>;
}

const ContextProvider = createContext<ContextType | undefined>(undefined);

interface AppContextProps {
  children: ReactNode;
}

function AppContext({ children }: AppContextProps) {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <ContextProvider.Provider value={{ state, dispatch }}>
      {children}
    </ContextProvider.Provider>
  );
}

export { AppContext, ContextProvider };
export type { ContextType };
