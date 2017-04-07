/*global  THREE:true*/

class MouseControll {

	start() {

		const container = document.getElementById('root');
		container.addEventListener('wheel', (e) => {
			console.log('whee');
			e.preventDefault();
		});
		const width = container.offsetWidth;
		const height = container.offsetHeight;

		const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
		camera.position.z = 80;
		camera.position.y = 50;
		camera.lookAt(new THREE.Vector3(0, 0, 0));

		const scene = new THREE.Scene();
		const ambient = new THREE.AmbientLight(0xffffff, 1.0);
		scene.add(ambient);


		const keyLight = new THREE.DirectionalLight(new THREE.Color(0xff0000), 1.0);
		keyLight.position.set(-100, 0, 100);
		keyLight.lookAt(0, 0, 0);

		const fillLight = new THREE.DirectionalLight(new THREE.Color(0x0000ff), 0.75);
		fillLight.position.set(100, 0, 100);
		fillLight.lookAt(0, 0, 0);


		scene.add(keyLight);
		scene.add(fillLight);

		const fileName = 'lowp_cola';

		const mtlLoader = new THREE.MTLLoader();

		mtlLoader.setBaseUrl(`${this.baseUrl}assets/`);
		mtlLoader.setPath(`${this.baseUrl}assets/`);
		mtlLoader.load(`${fileName}.mtl`, (materials) => {

			materials.preload();

			const objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath(`${this.baseUrl}assets/`);
			objLoader.load(
				`${fileName}.obj`,
				(object) => {

					if (object.children) {
						object.children.forEach((c) => c.geometry.center());
					}


					const axisY = new THREE.Vector3(0, 1, 0);
					const axisX = new THREE.Vector3(1, 0, 0);
					const axisZ = new THREE.Vector3(0, 0, 1);

					scene.add(object);

					const renderer = new THREE.WebGLRenderer();
					renderer.setPixelRatio(window.devicePixelRatio);
					renderer.setSize(width, height);
					renderer.setClearColor(new THREE.Color(0xffffff));

					container.appendChild(renderer.domElement);


					let mousedown = false;
					let mx = 0;
					let my = 0;
					container.addEventListener("mousedown", (e) => {
						mx = e.x;
						my = e.y;
						mousedown = true;
					});
					container.addEventListener("mouseup", (e) => {
						mousedown = false;
					});
					container.addEventListener("mousemove", (e) => {

						if (mousedown) {
							object.rotateOnAxis(axisY, (e.x - mx) / 100);
							// object.rotateOnAxis(axisX, (e.y-my)/100);
							// object.rotateOnAxis(axisZ, (e.y-my)/100);
							mx = e.x;
							my = e.y;
						}
					});
					container.addEventListener("wheel", (e) => {

						camera.position.z = camera.position.z + e.deltaY / 20;
						camera.position.y = camera.position.y + e.deltaY / 30;
					});

					setInterval(() => {

						renderer.render(scene, camera);
					}, 10);


					renderer.render(scene, camera);

				});

		});


	}

}

export default MouseControll;
