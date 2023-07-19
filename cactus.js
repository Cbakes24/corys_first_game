import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const SPEED = 0.05
const CACTUS_INTERVAL_MIN = 500
const CACTUS_INTERVAL_MAX = 2000
const worldElem = document.querySelector("[data-world]")


let nextCactusTime
export function setupCactus() {
    nextCactusTime = CACTUS_INTERVAL_MIN
}

export function updateCactus(delta, speedScale) {
    document.querySelectorAll("[data-cactus").forEach(cactus => {
        incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)
        if(getCustomProperty(cactus, "--left" <= -100)) {
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

function createCactus() {
    const cactus = document.createElement("img")
    cactus.dataset.cactus = true 
    cactus.src = "images/cactus.png"
    // using class list will use all the styles from our CSS class for cactus
    cactus.classList.add("cactus")
    setCustomProperty(cactus, "--left", 100)
    worldElem.append(cactus)
}


function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
