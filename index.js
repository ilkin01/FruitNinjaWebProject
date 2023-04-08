// Start Game Button -> Start (Fruit Ninja) Game

// Weather API Link 

// http://api.weatherapi.com/v1/current.json?key=e21494d17def4b2fb59163047230604&q=Baku&aqi=no


let startgamebtn = document.getElementById("startgameid");
let loadingdiv = document.getElementById("loadingid");
let loadingContainer = document.getElementById("LoadingContainer");
let menuContainer = document.getElementById("MenuContainer");
let settingContainer = document.getElementById("settingContainer");
let soundImage = document.getElementById("soundimage");
let soundImage2 = document.getElementById("soundimage2");
var audio = document.getElementById("audio");
let classicContainer = document.getElementById("classicContainer");
let cuttingFruitSound = document.getElementById("cuttingaudio");
let countDownAudio = document.getElementById("countDownAudio");
let gameOverAudio = document.getElementById("gameOverAudio");
let game_score_in_html = document.getElementById("game_score");
let cutting_fruit_audio = document.getElementById("cuttingfruitaudio");
let bomb_audio = document.getElementById("bombaudio");
let first_attempt = document.getElementById("first_attempt");
let scoreSection = document.getElementById("scoreSection");
let second_attempt = document.getElementById("second_attempt");
let third_attempt = document.getElementById("third_attempt");
let backgroundaudioeffect = document.getElementById("backgroundaudioeffect");
let wrongattempt = document.getElementById("wrongattempt");
let weatherContainer = document.getElementById("weatherContainer");
let aboutWeather = document.getElementById("aboutWeather");
const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');
let total_score = 0;
let local_total_score = 0;
let FruitArray = [];
let BombArray = [];
let mouseX = 0;
let mouseY = 0;
var fruits = [1, 2, 3];
var bombs = [1];
let preX = 0;
var gameOverCounter = 0;
let preY = 0;
let isClicked = false;
let animationId;
let linesArr = [];
let isGameStarted = true;
let isGameEnd = false;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
menuContainer.style.display = "none";
settingContainer.style.display = "none";
classicContainer.style.display = "none";






function StartGameButton() {
    startgamebtn.style.display = "none";
    loadingdiv.style.display = "flex";
    setTimeout(MainMenu, 3000);
}

console.log(window.innerHeight);

function AudioPause() {
    cuttingFruitSound.play();
}

function SoundOffFunc() {
    cuttingFruitSound.play();
    soundImage.style.display = "none";
    soundImage2.style.display = "block";
    audio.pause();

}

function SoundOnFunc() {
    cuttingFruitSound.play();
    soundImage.style.display = "block";
    soundImage2.style.display = "none";
    audio.play();
}

function BackFunc() {
    cuttingFruitSound.play();
    settingContainer.style.display = "none";
    loadingContainer.style.display = "none";
    menuContainer.style.display = "flex";
}


function MainMenu() {
    loadingContainer.style.display = "none";
    audio.play();
    menuContainer.style.display = "flex";
}



function SettingFunc() {
    cuttingFruitSound.play();
    menuContainer.style.display = "none";
    settingContainer.style.display = "block";
}



function ClassicFunc() {
    cuttingFruitSound.play();
    audio.pause()
    menuContainer.style.display = "none";
    classicContainer.style.display = "block";
    GetCurrentWeather();
    CountDownEffect();
    setTimeout(() => {
        backgroundaudioeffect.play();
        animate();
        displayFruit();
        displayBomb();
    }, 7000)
}



function GetCurrentWeather(){
    // let url = "https://reqres.in/api/users";
    // // $.get(url,function(response,status){
    // //     console.log(response);
    // //     console.log(status);
    // //     $(".container").text(JSON.stringify(response.data));
    // //     $(".container").append(`Status : ${status}`);
    // // })
    let url = "http://api.weatherapi.com/v1/current.json?key=e21494d17def4b2fb59163047230604&q=Baku&aqi=no";
    $.ajax({
        type: "GET",
        url: "http://api.weatherapi.com/v1/current.json?key=e21494d17def4b2fb59163047230604&q=Baku&aqi=no",
        success: function(response) {
          // handle response data here
          aboutWeather.innerHTML = `${response.location.name}, ${response.current.temp_c}°C  ${response.current.condition.text}`;  
        },
        error: function(xhr, status, error) {
          // handle error here
          console.log("Error: " + error);
        }
      });


}



function CountDownEffect(){
    const countDownContainer = document.getElementById('countDownContainer');
    let currentSecond = 3;
    let timerInterval = setInterval(() => {
        countDownContainer.innerHTML = ``;
        audio.pause();
        countDownAudio.play();
        countDownContainer.innerHTML = `<h1>${currentSecond}</h1>`;
        currentSecond -= 1;
        if (currentSecond < 0) {
            clearInterval(timerInterval);
            countDownContainer.innerHTML = ``;
        }
    }, 1200)
}


function GameOverEffect(){
    const gameOverContainer = document.getElementById("gameOverContainer");
    let curSecond = 3;
    let timeInterval = setInterval(() => {
        cancelAnimationFrame(animationId);
        gameOverContainer.innerHTML = ``;
        gameOverAudio.play();
        gameOverContainer.style.width = window.innerWidth;
        gameOverContainer.style.height = window.innerHeight;
        backgroundaudioeffect.pause();
        gameOverContainer.innerHTML = `<h1 style=" font-family: 'Righteous', cursive;font-size: 100px;color:orangered;">GAME OVER</h1>`;
        curSecond -= 1;
        if (curSecond < 0) {
            clearInterval(timeInterval);
            location.reload();
        }

    }, 1000);
}



function createFruitAndCheckIfFruitIsCutted() {
    for (let i = 0; i < FruitArray.length; i++) {
        FruitArray[i].draw();
        FruitArray[i].updateFruitPosition();
        let distance = Math.hypot(mouseX - FruitArray[i].x, mouseY - FruitArray[i].y);
        if (distance - FruitArray[i].size < 1) {
            total_score++;
            game_score_in_html.innerHTML = total_score;
            FruitArray.splice(i, 1);
            i--;
            return;
        }
        // if(FruitArray[i].y > window.innerHeight + 200){
        //     counter++;
        //     if (counter > 2) {
        //         GameOverEffect();
        //     }
        // }
        if (FruitArray[i].y > window.innerHeight + 50) {
            FruitArray.splice(i, 1);
            i--;
            gameOverCounter++;
            if (gameOverCounter == 1) {
                wrongattempt.play();
                first_attempt.style.width = "62px";
                first_attempt.style.height = "62px";
                first_attempt.style.transition = "1s";
                first_attempt.src = `images/X_Red.png`;
            }
            if (gameOverCounter == 2) {
                wrongattempt.play();
                second_attempt.style.width = "63px";
                second_attempt.style.height = "62px";
                second_attempt.style.transition = "1s";
                second_attempt.src = `images/X_Red.png`;
            }
            if (gameOverCounter == 3) {
                wrongattempt.play();
                third_attempt.style.width = "62px";
                third_attempt.style.height = "62px";
                third_attempt.style.transition = "1s";
                third_attempt.src = `images/X_Red.png`;
                GameOverEffect();
            }
        }
    }
}



function displayBomb() {
    let time = setInterval(() => {
        let number = 0;
        let indexOfFruit = bombs[number];
        for (let index = 0; index < indexOfFruit; index++) {
            BombArray.push(new Bomb())
        }
    }, 7000)
}


function displayFruit() {
    let time = setInterval(() => {
        let number = Math.floor((Math.random() * 2) + 0);
        let indexOfFruit = fruits[number];
        for (let index = 0; index < indexOfFruit; index++) {
            FruitArray.push(new Fruit())
        }
    }, 2500)
};



function Fruit() {
    this.x = Math.floor(Math.random() * window.innerWidth);
    this.y = Math.floor(window.innerHeight);
    this.size = Math.floor((Math.random() * 40) + 35);
    // Generate Random Color (For Fruit)
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    this.color = `#${randomColor}`;
    this.speedY = 9.6;
    this.speedX = -0.7;
    this.updateFruitPosition = () => {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.speedY -= .1;
    }
    this.draw = () => {
        context.fillStyle = this.color;
        context.beginPath();
        context.lineWidth = 5;
        context.strokeStyle = 'white';
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.stroke();
        context.fill();
    }
}



function Bomb() {
    this.x = Math.floor(Math.random() * window.innerWidth);
    this.y = Math.floor(window.innerHeight);
    this.size = Math.floor((Math.random() * 33) + 33);
    this.color = "black";
    this.speedY = 9.6;
    this.speedX = 0.7;
    this.updateBombPosition = () => {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.speedY -= .1;
    }
    this.drawBomb = () => {
        context.fillStyle = this.color;
        context.beginPath();
        context.lineWidth = 10;
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.strokeStyle = 'red';
        context.stroke();
        context.fill();
    }
}


function animate() {
    context.fillStyle = 'rgba(24,28,31,.5)';
    context.clearRect(0, 0, canvas.width, canvas.height);
    createFruitAndCheckIfFruitIsCutted();
    createBombAndCheckIfBombIsCutted();
    createKnife();
    animationId = requestAnimationFrame(animate);
}



function createBombAndCheckIfBombIsCutted() {
    for (let i = 0; i < BombArray.length; i++) {
        BombArray[i].drawBomb();
        BombArray[i].updateBombPosition();
        let distanceBomb = Math.hypot(mouseX - BombArray[i].x, mouseY - BombArray[i].y);
        if (distanceBomb - BombArray[i].size < 1) {
            bomb_audio.play();
            GameOverEffect();
            BombArray.splice(i, 1);
            i--;
            return;
        }
    }
}



// Mouse Effect


function createKnife() {
    for (let i = 0; i < linesArr.length; i++) {
        context.strokeStyle = "white";
        context.beginPath();
        context.moveTo(linesArr[i].x, linesArr[i].y);
        context.lineTo(linesArr[i].pMouseX, linesArr[i].pMouseY);
        context.stroke();
        context.lineWidth = 8;
        context.closePath();
    }
    if (linesArr.length > 4) {
        // cutting_fruit_audio.play();
        linesArr.shift();
        linesArr.shift();

    }
}
canvas.addEventListener('mousedown', (e) => {
    preX = mouseX;
    preY = mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    isClicked = true;
});
canvas.addEventListener('mousemove', (e) => {
    if (isClicked) {
        cutting_fruit_audio.play();
        preX = mouseX;
        preY = mouseY;
        mouseX = e.clientX;
        mouseY = e.clientY;
        linesArr.push({ x: mouseX, y: mouseY, pMouseX: preX, pMouseY: preY })
    }
})
canvas.addEventListener('mouseup', () => {
    mouseX = 0;
    mouseY = 0;
    linesArr = [];
    isClicked = false;
});
canvas.addEventListener('mouseout', () => {
    mouseX = 0;
    mouseY = 0;
    linesArr = [];
    isClicked = false;
});