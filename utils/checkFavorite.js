export default function checkFavorite(favorites, story) {
    //check if favorites array id is the same as the story if so we will put it in our favorites 
    return favorites.some(favorite => favorite.id === story.id)
}