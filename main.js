console.log(window.Redux);
const { createStore } = window.Redux;

// state
// reducer
// store

const initialState = JSON.parse(localStorage.getItem('hobby_list')) || [];

const hobbyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_HOBBY':
      const newList = [...state];
      newList.push(action.payload)
      return newList;
    default:
      return state;
  }
}

const store = createStore(hobbyReducer);

const renderHobbyList = (hobbyList) => {
  if (!Array.isArray(hobbyList) || hobbyList.length === 0) return;
  const ulElement = document.querySelector('#hobbyListID');
  if (!ulElement) return;
  // reset previous content of ul
  ulElement.innerHTML = '';

  for (const hobby of hobbyList) {
    const liElement = document.createElement('li');
    liElement.textContent = hobby;
    ulElement.appendChild(liElement);
  }
}

// RENDER INITIAL HOBBY LIST
const initialHobbyList = store.getState();
console.log(initialHobbyList);
renderHobbyList(initialHobbyList);

// HANDLE FORM SUBMIT
const  hobbyFromElement = document.querySelector('#hobbyFrom');
if (hobbyFromElement) {
  const handleFormSubmit = e => {
    // prevent browser from reloading
    e.preventDefault();
    const hobbyTextElement = hobbyFromElement.querySelector('#hobbyText');
    if (!hobbyTextElement) return;
    const action = {
      type: 'ADD_HOBBY',
      payload: hobbyTextElement.value
    }
    store.dispatch(action);

    // reset from
    hobbyFromElement.reset();
  };

  hobbyFromElement.addEventListener('submit', handleFormSubmit);
}

store.subscribe(() => {
  console.log('STATE UPDATE: ', store.getState());
  const newHobbyList = store.getState();
  renderHobbyList(newHobbyList);
  localStorage.setItem('hobby_list', JSON.stringify(newHobbyList));
});
