import { initSnake, moveSnake, drawSnake } from "./snake.js";
import { generateFood, drawFood } from "./food.js";
import { handleDirectionChange } from "./controls.js";
import { checkCollision, drawGameOver, /*checkWallCollision*/ } from "./collision.js";
import { drawScore } from "./score.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; //Taille d'un carré pour le serpent et la pomme
const gameSpeed = 200;
let snake;
let food;
let direction = "RIGHT"; // Direction initial du serpent
let score = 0;
let gameInterval; // Variable pour stocker l'identifiant de l'intervalle


//Lancer le jeu avec Espace ou gère les directions du serpent
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !gameInterval) {
    startGame();
  } else {
    direction = handleDirectionChange(event, direction);
  }
});

//Affiche le message d'instruction de départ
ctx.font = "20px Arial";
ctx.fillStyle = "black";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("Appuyez sur Espace pour jouer", canvas.width / 2, canvas.height / 2);

//Fonction pour lancer le jeu
function startGame() {
  
  document.getElementById("StartGamu").textContent =""; //Efface le message d'instruction de départ

  snake = initSnake(box); //initilisation du snake
  food = generateFood(box, canvas, snake);

  draw();
  gameInterval = setInterval(draw, gameSpeed); // Stockage de l'identifiant de l'intervalle
  
}

function draw() {
  /// console.log("Longueur du serpent :", snake.length);
  /// console.log("Position de la tête :", snake[0]);
  /// console.log("Position de la nourriture :", food);

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface le canvas

  if(checkCollision(snake) /*|| checkWallCollision(snake, canvas, box)*/){
    clearInterval(gameInterval); // Arrête le jeu
    drawGameOver(ctx, canvas, score); // Affiche le message de fin de jeu
    gameInterval = null; // Réinitialise l'identifiant de l'intervalle
    score = 0; // Réinitialise le score
    return;
  }
  moveSnake(snake, direction, box);

  /// console.log("Le serpent mange ! Taille avant = ", snake.length);

  //Vérifie si le serpent mange de la nourriture
  if (snake[0].x === food.x && snake[0].y === food.y) {
    food = generateFood(box, canvas, snake);
    score++;
    console.log(score);
    /// console.log("Taille après = ", snake.length);
  }else{
    snake.pop(); //Supprime la queue si le serpent ne mange rien pour simuler le déplacement
  }
  
  drawScore(score);
  drawFood(ctx, food, box)
  drawSnake(ctx, snake, box);
}

