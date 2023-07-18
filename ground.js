import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const SPEED = 0.03
const groundElems = document.querySelectorAll("[data-ground]")
export function setupGround() {
    // repeating out ground
    setCustomProperty(groundElems[0], "--left", 0)
    setCustomProperty(groundElems[1], "--left", 300)
}
export function updateGround(delta, speedScale) {
    groundElems.forEach(ground => {
        // --left is a custom property from our css
        // using -1 because the ground will move backwards to give the dino the appearance of moving forwards
        incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1)

        if (getCustomProperty(ground, "--left") <= -300) {
            incrementCustomProperty(ground, "--left", 600)
        }
    })
}
