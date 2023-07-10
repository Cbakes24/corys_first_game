const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30

const worldElem = document.querySelector("[data-world]");

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)


let lastTime
function update(time) {
    if(lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(update)
        return
    }

    const delta = time - lastTime
    // console.log(delta)

    lastTime = time
    window.requestAnimationFrame(update)
}
window.requestAnimationFrame(update)

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
