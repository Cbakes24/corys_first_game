let character = document.getElementById("character");
let block = document.getElementById("block");


let jump = () => {
    if(character.classList !== "animate") {
        character.classList.add("animate")
    }
    setTimeout(() => {
        character.classList.remove("animate")
    }, 500)
}


let checkDead = setInterval(() => {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'))
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'))

    if(characterTop >= 130 && blockLeft > 0 && blockLeft < 20 ){
        block.style.animation = "none"
        block.style.display = "none"
        alert('You Fuggin Lost')

    }

}, 10)
