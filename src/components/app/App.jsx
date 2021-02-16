// /* eslint-disable max-len */
import React, { useReducer } from 'react';


const initialState = {
  color: 'red',
  before: [],
  after: []
};

function reducer(state, action) {
  switch(action.type) {
    case 'COLOR_CHANGE': {
      const before = [...state.before, state.color];
      return { color: action.payload, before };
    }
  
    
    // --------------------------------------------

    case 'COLOR_UNDO':
      return { color: action.payload };

      // --------------------------------------------

    case 'COLOR_REDO':
      return { color: action.payload };

  }
}
// --------------------------------------------

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const record = ({ target }) => {

    dispatch({
      type: (target.id),
      payload: target.value
    });
  };

  return (
    <>

      {/* ---------------------------------------------------- */}

    
      {/* <button onClick={ undo }>undo</button>

      <button onClick={redo}>redo</button>
      */}
      <label htmlFor="COLOR_CHANGE">
        Current Color
      </label>
      
      {/* ---------------------------------------------------- */}


      <input 
        id="COLOR_CHANGE" 
        type="color"
        value={state.color}
        onChange={record}      
      /> 

      {/* ---------------------------------------------------- */}

      <div data-testid="frig"
        style={{
          backgroundColor: state.color,
          width: '10rem',
          height: '10rem' }}>
      </div>
    </>
  );
}

export default App;
