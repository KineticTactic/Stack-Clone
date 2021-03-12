import * as THREE from "https://unpkg.com/three/build/three.module.js";

export default class Box {
    constructor(scene, pos = new THREE.Vector3(), size = new THREE.Vector3(1, 1, 1)) {
        // this.pos = pos;
        this.size = size;
        this.height = 0;

        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshPhongMaterial({ color: Math.random() * 0xffffff });
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.mesh.position.set(pos.x, pos.y, pos.z);
        this.mesh.scale.set(this.size.x, this.size.y, this.size.z);

        scene.add(this.mesh);
    }

    pos() {
        return this.mesh.position;
    }

    setColor(color) {
        this.material.color.setHex(color);
    }

    setPos(x, y, z) {
        this.mesh.position.set(x, y, z);
    }

    setSize(x, y, z) {
        this.size = new THREE.Vector3(x, y, z);
        this.mesh.scale.set(this.size.x, this.size.y, this.size.z);
    }

    setPositionYPlane(pos) {
        this.mesh.position.set(pos.x, this.mesh.position.y, pos.y);
    }
}
