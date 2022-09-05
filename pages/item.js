import Story from '../components/Stories.js';
import Comment from '../components/Comment.js';
import view from '../utils/view.js';
import baseUrl from '../utils/baseUrl.js'

export default async function Item() {
let story = null;
let hasComments = false;
let hasError = false;
    try { 
        story = await getStory();
        hasComments = story.comments.length > 0;
    } catch (error) {
        // hasError = true;
        console.error(error);
       
        //alert('Error Fetching Story');
    }
    // console.log(story.comments)

    if (hasError) {
        view.innerHTML = `<div class="error">Error fetching story </div>`
    }
    
    view.innerHTML = `<div> 
    ${Story(story)}
    </div>  
    <hr/>
    ${hasComments ? story.comments.map(comment => Comment(comment)).join('')
     : 'No comment'}`   
    
}

async function getStory() {
    //get id url 
    const storyId = window.location.hash.split('?=')[1];
    //console.log(storyId);
   // route -> /item/:itemId
    const response = await fetch(`${baseUrl}/item/${storyId}`);
    const storyIdData = await response.json();
    //console.log(storyIdData)
    return storyIdData;
 
}

