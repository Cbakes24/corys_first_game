
const dinoElem = document.querySelector("[data-dino]")
const JUMP_SPEED = .45
const GRAVITY = .011
// we have 2 animations frames for our dino, left step and right step
const DINO_FRAME_COUNT = 2
// every frame should last 100ms so the animation changes 10 times persecond
const FRAME_TIME = 100

let isJumping
let dinoFrame 
let currentFrameTime
export function setupDino() {
 isJumping = false
 dinoFrame = 0
 currentFrameTime = 0
}

export function updateDino(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump()
}

function handleRun(delta, speedScale) {
    if( isJumping) {
        dinoElem.source = `images/dino-stationary.png`
        return
    }

    if(currentFrameTime >= FRAME_TIME) {
        // this will loop the animation so if here were 10 dino animaitons and we are on animaiton 15
        // 15 % 10 so we should be using animaiton 5 when on the 15th animaiton
        // dinoFame +1 takes us to the next dino frame
        dinoFrame  = (dinoFrame + 1) % DINO_FRAME_COUNT
        dinoElem.src = `images/dino-run-${dinoFrame}.png`
        currentFrameTime -= FRAME_TIME
    }
    // as the speedScale goes up for the game difficulty the jump speed of the dino needs to go up as well
    currentFrameTime += delta * speedScale
}

function handleJump() {

}
