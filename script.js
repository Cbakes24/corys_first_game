import {setupGround, updateGround} from "./ground.js"
import { updateDino, setupDino } from "./dino.js"
import { updateCactus, setupCactus } from "./cactus.js"


const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
// how fast the ground speed will increase bigger the number the faster the ground gradually moves
const SPEED_SCALE_INCREASE = .00001
const worldElem = document.querySelector("[data-world]");
const scoreElem = document.querySelector("[data-score]");
const startScreenElem = document.querySelector("[data-start-screen]");

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, {once: true})

setupGround()

let lastTime
let speedScale 
let score
function update(time) {
    if(lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(update)
        return
    }

    const delta = time - lastTime
    // console.log(delta)

    updateGround(delta, speedScale)
    updateDino(delta, speedScale)
    updateCactus(delta, speedScale)
    updateSpeedScale(delta)
    updateScore(delta)

    lastTime = time
    window.requestAnimationFrame(update)
}

function updateSpeedScale(delta) {
    speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
    score += delta * .01
    scoreElem.textContent = Math.floor(score)

}
function handleStart() {
    lastTime = null
    speedScale = 1
    score = 0
    setupGround()
    setupDino()
    setupCactus()
    startScreenElem.classList.add("hide")
    window.requestAnimationFrame(update)
}


function setPixelToWorldScale() {
    let worldToPixelScale
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH
    } else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT
    }

    worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
    worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}





  






// let character = document.getElementById("character");
// let block = document.getElementById("block");


// let jump = () => {
//     if(character.classList !== "animate") {
//         character.classList.add("animate")
//     }
//     setTimeout(() => {
//         character.classList.remove("animate")
//     }, 500)
// }


// let checkDead = setInterval(() => {
//     let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'))
//     let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'))

//     if(characterTop >= 130 && blockLeft > 0 && blockLeft < 20 ){
//         block.style.animation = "none"
//         block.style.display = "none"
//         alert('You Fuggin Lost')

//     }

// }, 10)
