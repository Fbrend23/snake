import { initSnake, moveSnake, drawSnake } from "./snake.js";
import { generateFood, drawFood } from "./food.js";
import { handleDirectionChange } from "./controls.js";
// import { checkCollision, checkWallCollision } from "./collision.js";
// import { drawScore } from "./score.js";

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

function startGame() {
  document.getElementById("StartGamu").textContent =""; //Efface le message d'instruction de départ
  console.log(snake) //log pour les erreurs
  snake = initSnake(box); //initilisation du snake
  food = generateFood(box, canvas);
  draw();
  gameInterval = setInterval(draw, gameSpeed); // Stockage de l'identifiant de l'intervalle
  
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface le canvas
  moveSnake(snake, direction, box);
  drawSnake(ctx, snake, box);
  drawFood(ctx, food, box)
}

