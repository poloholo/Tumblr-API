const form = document.getElementById('query-form');

//test input field
const query = document.getElementById('query');
const list = document.getElementById('list-data');

const randomStuffs = ["Cat", "sports", "Food", "cars", "birds", "travel", "landscape", "nba", "art", "ikea", "forest", "architecture", "malaysia"]

let masonry = new Masonry(list, {
    itemSelector: 'li',
});

//set on submit
form.onsubmit = function(event) {
    event.preventDefault();

    // get value in input field
    const queryTerm = query.value;
    console.log(queryTerm);

    getTaggedPhotos(queryTerm);
}

function getTaggedPhotos(tagName){

fetch ('https://api.tumblr.com/v2/tagged?tag=' + tagName + '&api_key=W6tUYgagknwWu9XnFWAghyIxakp8QpmEhd9Hw7IgeUbrjKLuTA')
    .then(function(response) {
        return response.json();
    })
    .then(function(result){

        // clear list
        list.innerHTML = '';

        const items = result.response;
            let masonry;

        // for each item, add image to list
        for(let i = 0; i < items.length; i++){
            const item = items[i];

            //initialize
                masonry = new Masonry(list, {
                itemSelector: 'li',
            });

            //run layout
            masonry.layout();

            if(item.photos != undefined){
              // create li and img to append
              const altSizes = item.photos[0].alt_sizes
              const imgSrc = altSizes[altSizes.length - 3].url;

              const img = document.createElement('img');
              img.src = imgSrc ;
              img.onload = function(){
                  masonry.layout();
              }

              const li = document.createElement('li');
              li.appendChild(img);
            //   li.innerHTML = imgSrc;

              list.appendChild(li);
            }
        }
    })

}

// function taggedResult(){
//     var winner;
//                 if(gameresult == "TRUE"){ // when user Wins!
//                     if (playerNo == PLAYER1)
//                     winner= person1;
//                     else winner= person2;
//                     document.getElementById("resultmessage").innerHTML = winner +" WINS!";
//                     score[playerNo-1] ++;
//                     document.getElementById("score").innerHTML = person1 + " : " + score[0] + "<br>" + person2 + " : " + score[1];
//                 }
//                 else // maybe Lose!
//                      document.getElementById("resultmessage").innerHTML = "LOSE!";
                 
// }

let randomIndex = Math.floor(Math.random() * randomStuffs.length)
let randomedTag = randomStuffs[randomIndex]

getTaggedPhotos(randomedTag)

setTimeout (function(){}, 5000)