import * as THREE from "https://unpkg.com/three/build/three.module.js";
import Box from "./Box.js";

const X_DIR = 0;
const Z_DIR = 1;

export default class BoxManager {
    constructor(scene) {
        this.boxes = [];
        this.scene = scene;

        this.ground = new Box(this.scene, new THREE.Vector3(0, -5, 0), new THREE.Vector3(2, 10, 2));
        this.ground.setColor(0xddddddd);

        this.t = 0;
        this.dt = 0.1;

        this.currentDirection = X_DIR;
        this.currentBoxPosition = new THREE.Vector3(0, 0.25, 0);
        this.currentBoxSize = new THREE.Vector3(2, 0.5, 2);

        this.addBox();
        this.currentBoxPosition.y += 0.5;
        // this.plop();
    }

    addBox() {
        this.boxes.unshift(
            new Box(
                this.scene,
                new THREE.Vector3(
                    this.currentBoxPosition.x,
                    this.currentBoxPosition.y,
                    this.currentBoxPosition.z
                ),
                new THREE.Vector3(
                    this.currentBoxSize.x,
                    this.currentBoxSize.y,
                    this.currentBoxSize.z
                )
            )
        );
    }

    plop() {
        this.currentBoxPosition.y += 0.5;

        let box0 = this.boxes[0];
        let box1 = this.boxes[1];

        // Calculate Next box's position and scale -----------------------------------
        if (this.currentDirection === X_DIR) {
            this.currentBoxPosition.x = (box0.pos().x - box1.pos().x) / 2 + box1.pos().x;
            this.currentBoxSize.x = overlap(
                box1.pos().x - box1.size.x / 2,
                box1.pos().x + box1.size.x / 2,
                box0.pos().x - box0.size.x / 2,
                box0.pos().x + box0.size.x / 2
            );
        } else {
            this.currentBoxPosition.z = (box0.pos().z - box1.pos().z) / 2 + box1.pos().z;
            this.currentBoxSize.z = overlap(
                box1.pos().z - box1.size.z / 2,
                box1.pos().z + box1.size.z / 2,
                box0.pos().z - box0.size.z / 2,
                box0.pos().z + box0.size.z / 2
            );
        }

        this.currentBoxPosition.x = (box0.pos().x - box1.pos().x) / 2 + box1.pos().x;
        this.currentBoxPosition.z = (box0.pos().z - box1.pos().z) / 2 + box1.pos().z;

        // "Cut" the top box ---------------------------------------------------------
        box0.setPos(
            (box0.pos().x - box1.pos().x) / 2 + box1.pos().x,
            box0.pos().y,
            (box0.pos().z - box1.pos().z) / 2 + box1.pos().z
        );
        box0.setSize(
            box0.size.x - (box0.size.x - this.currentBoxSize.x),
            box0.size.y,
            box0.size.z - (box0.size.z - this.currentBoxSize.z)
        );

        // Check if Game Over --------------------------------------------------------
        if (this.currentBoxSize.x === 0 || this.currentBoxSize.z === 0) {
            console.log("GAME OVER MUAHAHAHA");
        }

        this.currentDirection = this.currentDirection === X_DIR ? Z_DIR : X_DIR;

        this.addBox();
    }

    update() {
        this.t += this.dt;

        if (this.currentDirection === X_DIR) {
            this.boxes[0].setPositionYPlane(
                new THREE.Vector2(Math.sin(this.t), this.boxes[0].mesh.position.z)
            );
        } else {
            this.boxes[0].setPositionYPlane(
                new THREE.Vector2(this.boxes[0].mesh.position.x, Math.sin(this.t))
            );
        }
    }
}

function overlap(min1, max1, min2, max2) {
    return Math.max(0, Math.min(max1, max2) - Math.max(min1, min2));
}
