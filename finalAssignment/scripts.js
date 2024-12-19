const imageArray = [
    { image: "img/img6.jpg" },
    { image: "img/img1.jpg" },
    { image: "img/img3.jpg" },
    { image: "img/img2.jpg" },
    { image: "img/img6.jpg" },
    { image: "img/img2.jpg" },
    { image: "img/img4.jpg" },
    { image: "img/img5.jpg" },
    { image: "img/img3.jpg" },
    { image: "img/img1.jpg" },
    { image: "img/img4.jpg" },
    { image: "img/img5.jpg" }
];

let flippedCards = [];
let matchedCards = [];
let points = 0;
let timeLeft = 30;
let timeCountdown;


function updateTime() {
    document.getElementById("time").innerHTML = `Tid: <span><b>${timeLeft}</b>s</span>`;

    if (timeLeft <= 0) {
        clearInterval(timeCountdown);
        alert("You lost! You ran out of time!");
        resetGame();
    } else {
        timeLeft--;
    }
}


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function createCards(imageArray, imageContainer) {
    imageArray.forEach(image => {

        const img = document.createElement('img');
        const hiddenImg = document.createElement('img');
        const li = document.createElement('li');
        const backViewDiv = document.createElement('div');
        const frontViewDiv = document.createElement('div');

        backViewDiv.className = "view back-view";
        frontViewDiv.className = "view front-view";
        li.className = "card";
        img.src = image.image;
        img.className = "img-back";
        hiddenImg.src = "img/qmark.png";
        hiddenImg.className = "img-front";
        backViewDiv.style.display = "none";

        imageContainer.appendChild(li);
        li.appendChild(frontViewDiv);
        frontViewDiv.appendChild(hiddenImg);
        li.appendChild(backViewDiv);
        backViewDiv.appendChild(img);

        li.addEventListener('click', function () {
            if (flippedCards.length === 2) return;

            if (flippedCards.includes(li)) return;

            frontViewDiv.style.display = "none";
            backViewDiv.style.display = "block";

            flippedCards.push(li);

            if (flippedCards.length === 2) {
                const firstCardBackImage = flippedCards[0].querySelector('.back-view img');
                const secondCardBackImage = flippedCards[1].querySelector('.back-view img');

                if (firstCardBackImage.src === secondCardBackImage.src) {
                    matchedCards.push(flippedCards[0], flippedCards[1]);
                    flippedCards = [];

                    points++;
                    document.getElementById("points").innerHTML = "Poäng: " + points;

                    if (matchedCards.length === imageArray.length) {
                        clearInterval(timeCountdown); 
                        setTimeout(() => {
                            alert("You win!");
                        }, 500);
                        
                    }
                } else {
                    setTimeout(() => {
                        flippedCards[0].querySelector('.front-view').style.display = "block";
                        flippedCards[0].querySelector('.back-view').style.display = "none";
                        flippedCards[1].querySelector('.front-view').style.display = "block";
                        flippedCards[1].querySelector('.back-view').style.display = "none";

                        flippedCards = [];
                    }, 1000);
                }
            }
        });
    });
}


function resetGame() {
    shuffle(imageArray);

    flippedCards = [];
    matchedCards = [];
    points = 0;

    
    timeLeft = parseInt(document.getElementById("timeSelect").value);
    document.getElementById("points").innerHTML = "Poäng: " + points;
    document.getElementById("time").innerHTML = `Tid: <span><b>${timeLeft}</b>s</span>`;

    const imageContainer = document.getElementById("cards");
    imageContainer.innerHTML = "";
    createCards(imageArray, imageContainer);

    
    if (timeCountdown) {
        clearInterval(timeCountdown);
    }
    timeCountdown = setInterval(updateTime, 1000);
}


const imageContainer = document.getElementById("cards");
shuffle(imageArray);
createCards(imageArray, imageContainer);


document.getElementById("resetButton").addEventListener('click', resetGame);


timeLeft = parseInt(document.getElementById("timeSelect").value);
timeCountdown = setInterval(updateTime, 1000);
