import * as THREE from 'three'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 10

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const cuadGeometry = new THREE.PlaneGeometry(1, 1)
const cuadMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
const cuad = new THREE.Mesh(cuadGeometry, cuadMaterial)
cuad.name = 'cuad'

// Adjusting the pivot to the bottom center of the square
const cua = new THREE.Group()
cua.add(cuad)
cuad.position.set(0, 0.5, 0)
cua.position.set(0, -0.5, 0)


const cirGeometry = new THREE.CircleGeometry(0.5, 32)
const cirMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
const cir = new THREE.Mesh(cirGeometry, cirMaterial)

const pendulumAngle = (t) => Math.cos(Math.PI * t) * (Math.PI / 12)
const mainCuadrantAngle = (t) => -pendulumAngle(t)
const hoursNeedleAngle = (t) => -2 * Math.PI * t / (60 * 60 * 12)
const minutesNeedleAngle = (t) => -2 * Math.PI * t / (60 * 60)
const secondsNeedleAngle = (t) => -2 * Math.PI * t / 60


const clock = new THREE.Group()
scene.add(clock)

const pendulum = cua.clone()
pendulum.scale.set(0.2, 4, 0)
pendulum.position.set(0, -4, 0)

clock.add(pendulum)

const mainCuadrant = cir.clone()
mainCuadrant.position.set(0, -4.5, 0)
clock.add(mainCuadrant)

const hoursNeedle = cua.clone()
hoursNeedle.getObjectByName('cuad').material = new THREE.MeshBasicMaterial({ color: 0x000000 })
hoursNeedle.scale.set(0.1, 0.3, 0)
hoursNeedle.position.set(0, 0, 0)
mainCuadrant.add(hoursNeedle)

const minutesNeedle = cua.clone()
minutesNeedle.getObjectByName('cuad').material = new THREE.MeshBasicMaterial({ color: 0x000000 })
minutesNeedle.scale.set(0.05, 0.4, 0)
minutesNeedle.position.set(0, 0, 0)
mainCuadrant.add(minutesNeedle)

const secondsNeedleCuadrant = new THREE.Group()
secondsNeedleCuadrant.position.set(0, -0.25, 0)
mainCuadrant.add(secondsNeedleCuadrant)

const secondsCuadrant = cir.clone()
secondsCuadrant.material = new THREE.MeshBasicMaterial({ color: 0x000000 })
secondsCuadrant.scale.set(0.25, 0.25, 0)
secondsNeedleCuadrant.add(secondsCuadrant)

const secondsNeedle = cua.clone()
secondsNeedle.getObjectByName('cuad').material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
secondsNeedle.scale.set(0.02, 0.1, 0)
secondsNeedle.rotation.z = secondsNeedleAngle(0)
secondsNeedle.position.set(0, 0, 0)
secondsNeedleCuadrant.add(secondsNeedle)

var c = new THREE.Clock()
render()
function render() {
    requestAnimationFrame(render)
    const t = c.getElapsedTime()
    clock.rotation.z = pendulumAngle(t)
    mainCuadrant.rotation.z = mainCuadrantAngle(t)   
    hoursNeedle.rotation.z = hoursNeedleAngle(t)
    minutesNeedle.rotation.z = minutesNeedleAngle(t)
    secondsNeedle.rotation.z = secondsNeedleAngle(t)
    renderer.render(scene, camera)
}



