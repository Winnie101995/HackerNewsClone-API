//store is way for us to get our state and dispatch actions
//heart of state management library
function createStore(reducer) {

    let currentState = reducer(undefined, {});
    return {
        getState: () => currentState,
        dispatch: action => {
           currentState = reducer(currentState, action)
        }
    }
    
}
const initialState = {
    favorites: []
}
function favoritesReducer(state = initialState, action) {
    //we can use a sswtich function to determine what we do with the state
    switch (action.type) {
        case "ADD_FAVORITE":
            {
                const addedFavorite = action.payload.favorite;
                const favorites = [...state.favorites, addedFavorite];
                return { favorites };
        
            }    case "REMOVE_FAVORITE": {
            const removedFavorite = action.payload.favorite;
            const favorites = state.favorites.filter(favorite => favorite.id !== removedFavorite.id);
            return { favorites };
           }
        default:
            return state;
        
    }
}
//payload provides data
//const action = { type: "ADD_FAVORITE", payload: { favorite: { title: "story1", id: 1 } } }

const store = createStore(favoritesReducer);
//adds favourite 
// store.dispatch(action);
// //shows current state
// console.log(store.getState())


export default store;