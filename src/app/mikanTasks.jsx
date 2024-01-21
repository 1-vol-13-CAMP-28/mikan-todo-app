"use client";

import * as THREE from "three";
import {useEffect} from "react";
import {getCurrentStack} from "three/nodes";

export function MikanTasks(props) {
    useEffect(() => {
        // init
        const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
        camera.position.z = 1;

        const scene = new THREE.Scene();

        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const material = new THREE.MeshNormalMaterial();

        const mesh = new THREE.Mesh(geometry, material);
        //scene.add(mesh);


        var kotatuTexture = new THREE.TextureLoader().load('./image/Kotatu.png', (texture) => {
            const w = 0.8;
            const h = texture.image.height / (texture.image.width / w);

            const geometry = new THREE.PlaneGeometry(w, h);
            const material = new THREE.MeshPhongMaterial(
                {
                    map: texture,
                    opacity: 1.0,
                    transparent: true
                }
            );

            const plane = new THREE.Mesh(geometry, material);
            plane.scale.set(w, h, 1);
            plane.renderOrder = 1;
            plane.position.set(0, -0.2, 0);

            scene.add(plane);
        });

        var light = new THREE.AmbientLight(0xffffff, 3);
        scene.add(light);

        // tasks
        const tasks = props.tasks
        const taskMeshes = [];
        let taskCount = 0;
        for (const task of tasks) {
            console.log("add task", task)
            getTaskMesh(task).then((mesh) => {
                taskMeshes.push({
                    id: task.id,
                    mesh: mesh
                });
                console.info("add task mesh", mesh, taskCount)
                mesh.translateY(0.5 - taskCount * 0.25);
                scene.add(mesh);
                taskCount++;
            });
        }

        const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setAnimationLoop(animation);
        renderer.setClearColor(0x000000, 0);
        document.getElementById("task-canvas").appendChild(renderer.domElement);

        // animation
        function animation(time) {
            mesh.rotation.x = time / 1000;
            mesh.rotation.y = time / 1000;
            renderer.render(scene, camera);
        }
    }, [])

    return <div className="task-canvas"></div>;
}

function getTaskPicture(task) {
    switch (task.visual) {
        case "important":
            return "./image/mikans/mikan_important.png";
        case "bad":
            return "./image/mikans/mikan_bad_template.png";
    }
    return "./image/mikans/mikan_normal.png";
}

async function getTaskMesh(task) {
    return new Promise((resolve, reject) => {
        new THREE.TextureLoader().load(getTaskPicture(task), (mikanTexture) => {
            const w = 0.6;
            const h = mikanTexture.image.height / (mikanTexture.image.width / w) * 0.9;

            const geometry = new THREE.PlaneGeometry(w, h);
            const material = new THREE.MeshPhongMaterial(
                {
                    map: mikanTexture,
                    opacity: 1.0,
                    transparent: true
                }
            );

            const plane = new THREE.Mesh(geometry, material);
            plane.scale.set(w, h, 1);
            plane.renderOrder = 1;
            plane.position.set(0, -0.01, 0);

            resolve(plane);
        });
    });
}