import {useReducer} from "react"

function App() {

/**
 * 
 * useReducer is nothing but unification of reducer and state maintaince logic so you dont have to call reducer and set state like 
 * instead of this const [state, dispatch] = useReducer(reducer, {names: ["Pravin"], name: ""});
 * 
 * code would be 
 * 
 * 
 * function dispatch(action){
 *  * const [state, setState] = useState({names: ["Pravin"], name: ""})
 *  const state = reducer(action); 
 *  setState(state)
 * }
 * 
 * when you create a form and want to store name, email address, address etc; you have to create state variable for each and call setState for all 
 * and when you want to reset you have to call multiple setState 
 * 
 * if you have option to give length and width and area, changing one can change area so changing length should call two setState 
 * 
 * here it is not common to make one state because if you make that you will have to make a wrapper and that wrapper will check your field and update that field in state 
 * and this is called useReducer here in react
 * 
 * issue with dependent state: 
 * 
 * const handleResize = (newWidth, newHeight) => {
 * setWidth(newWidth);
 * setHeight(newHeight);
 * setArea(newWidth * newHeight); // Multiple state updates
 * 
 * ----------------------------------------------------------------
 * now issue is that:
 * While React batches state updates within the same synchronous execution context (like within a function call or event handler), these updates are processed asynchronously.
 * This means that React schedules state updates to happen after the current function completes.
 * -----------------------------
 * const [count, setCount] = useState(0);const [doubleCount, setDoubleCount] = useState(0);
 * const increment = () => {
 *    setCount(count + 1); // Update count
 *    setDoubleCount(count * 2); // Update doubleCount based on count
 * };
 * -----------------------------
 * 
 * React's state updates are processed asynchronously within the same event handler or function call. 
 * In React, state updates are usually asynchronous. 
 * This means that when you call a state update function like setState in a functional component or this.setState in a class component, React doesn't immediately update the state variable. 
 * Instead, it schedules an update to happen later, after the current function or event handler completes.
 * It takes note of all setStates and execute them asynchronously but they are executed synchronously i.e  each setState function is called one after the other. 
 * But since they are asynchronous, after current function finishes executing, React processes the queued state updates.
 */ 

  const reducer = (state, action)=>{
    if(action.type === "add_user"){
      return {
        names: [...state.names, action.name],
      }
    }
    if(action.type === "update_name"){
      return {
        names: state.names,
        name: action.name
      }
    }
    throw Error("Unknown action.");
  }

  const [state, dispatch] = useReducer(reducer, {names: ["Pravin"], name: ""});

  return (
    <div className="App">
      <button onClick={()=>dispatch({type: "add_user", name: "Harish"})}> Add User </button>
      <ul>
     {state.names.map((el, index)=><li key = {index}>{el}</li>)}
     </ul>
    </div>
  );
}

export default App;

