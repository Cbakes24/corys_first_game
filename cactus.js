import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const SPEED = 0.03
const CACTUS_INTERVAL_MIN = 500
const CACTUS_INTERVAL_MAX = 2000
const worldElem = document.querySelector("[data-world]")


let nextCactusTime
export function setupCactus() {
    nextCactusTime = CACTUS_INTERVAL_MIN
    // removes all cactus when you start a game so if you lose the cactus that hits youi dissapears
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        cactus.remove()
    })
}

export function updateCactus(delta, speedScale) {
   
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        // makeLeonSkinnier(cactus)
        incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)
        if(getCustomProperty(cactus, "--left") <= -100) {
            cactus.remove()
        }
    })

    if(nextCactusTime <= 0) {
        createCactus()
        nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN, 
            // dividing by speedscales makes sure the cactus' spawn faster as the game moves faster
                                            CACTUS_INTERVAL_MAX) / speedScale
    }
    // this makes the ccactus creation time smaller until it hits 0 then creates a new cactus
    nextCactusTime -= delta
}

export function getCactusRects() {
    return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
        return cactus.getBoundingClientRect()
    })
}

function createCactus() {
    const cactus = document.createElement("img")
    cactus.dataset.cactus = true 
    cactus.src = "images/Leon_Pineapple1.png"
    // using class list will use all the styles from our CSS class for cactus
    cactus.classList.add("cactus")
    setCustomProperty(cactus, "--left", 100)
    worldElem.append(cactus)
}

// function makeLeonSkinnier(cactus) {
//     const currentWidth = cactus.getBoundingClientRect().width; // Get the current width
//     const newWidth = currentWidth - 50; // Reduce the width by 50 pixels
  
//     // Set the new width with the 'px' unit
//    cactus.style.width = newWidth + 'px';
//   }

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
