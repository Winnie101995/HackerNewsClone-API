import Story from '../components/Stories.js';
import view from '../utils/view.js';
import baseUrl from '../utils/baseUrl.js';
import checkFavorite from '../utils/checkFavorite.js';
import store from '../store.js';
// allows us to see items on the browser
export default async function Stories(path) {
    //only when we await this can we get our data
    const { favorites } = store.getState();
    console.log(favorites);
    const stories = await getStories(path);
    //console.log(newsData)
    const hasStories = stories.length > 0;
    view.innerHTML = `<div>
       ${hasStories ? stories.map((story, i) => Story({
           ...story, index: i + 1, isFavorite: 
    checkFavorite(favorites, story) })).join('') : 'No Stories'}
    </div>`
        //`<div> ${path}</div>`;
    //click to remove favourite 
    document.querySelectorAll('.favorite').forEach(favoriteButton => {
        favoriteButton.addEventListener('click', async function() {
            const story = JSON.parse(this.dataset.story);
            const isFavorited = checkFavorite(favorites, story);
            store.dispatch({type: isFavorited ? "REMOVE_FAVORITE": "ADD_FAVORITE", payload: {favorite: story}})
            await Stories(path);
        });
    });

}

async function getStories(path) {
    // (Top News ) -> /news (path)
    const isHomeRoute = path === '/';
    // (New news) -> /newest 
    const isNewRoute = path === '/new';
    //(Ask news) -> /ask
    const isAskRoute = path === '/ask';
    // (show news) -> /show 
    const isShowRoute = path === '/show';
    if (isHomeRoute) {
        path = '/news';
    } else if (isNewRoute) {
        path = '/newest';
    } else if (isAskRoute) {
        path = '/ask';    
    } else {
        path = '/show';
    }
    const response = await fetch(`${baseUrl}${path}`);
    const stories = await response.json();
    
    return stories;

    
}