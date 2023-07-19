import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js";

const dinoElem = document.querySelector("[data-dino]");
const JUMP_SPEED = 0.45;
const GRAVITY = 0.001;
// we have 2 animations frames for our dino, left step and right step
const DINO_FRAME_COUNT = 3;
// every frame should last 100ms so the animation changes 10 times persecond
const FRAME_TIME = 100;

let isJumping;
let dinoFrame;
let currentFrameTime;
let yVelocity
export function setupDino() {
  isJumping = false;
  dinoFrame = 0;
  currentFrameTime = 0;
  yVelocity = 0
  setCustomProperty(dinoElem, "--bottom", 0)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
}

export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta, speedScale);
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoElem.source = `images/Ayla-run2.png`;
    return;
  }

  if (currentFrameTime >= FRAME_TIME) {
    // this will loop the animation so if here were 10 dino animaitons and we are on animaiton 15
    // 15 % 10 so we should be using animaiton 5 when on the 15th animaiton
    // dinoFame +1 takes us to the next dino frame
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
    dinoElem.src = `images/Ayla-run${dinoFrame}.png`;
    currentFrameTime -= FRAME_TIME;
  }
  // as the speedScale goes up for the game difficulty the jump speed of the dino needs to go up as well
  currentFrameTime += delta * speedScale;
}

function handleJump(delta, speedScale) {
  if (!isJumping) return;

  incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)
    // this will make sure that the dinos jump doesnt end up going below the ground, stops at 0 sets isJumping to false. so back to running
    if(getCustomProperty(dinoElem, "--bottom") <= 0 ) {
        setCustomProperty(dinoElem, "--bottom", 0)
        isJumping = false
    }
    //  keeps gravity with frame rate of screen
    yVelocity -= GRAVITY * delta 
}

function onJump(e) {
    if(e.code !== "Space" || isJumping) return
    yVelocity = JUMP_SPEED
    isJumping = true
}
