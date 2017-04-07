/*global  THREE:true*/

class AutoRotation {

	start() {


		const container = document.createElement('div');
		document.body.appendChild(container);

		const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
		camera.position.z = 80;


		const scene = new THREE.Scene();
		const ambient = new THREE.AmbientLight(0xffffff, 1.0);
		scene.add(ambient);


		const keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
		keyLight.position.set(-100, 0, 100);

		const fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
		fillLight.position.set(100, 0, 100);

		const backLight = new THREE.DirectionalLight(0xffffff, 1.0);
		backLight.position.set(100, 0, -100).normalize();

		scene.add(keyLight);
		scene.add(fillLight);
		scene.add(backLight);

// const fileName = 'female-croupier-2013-03-26';
// const fileName='f';
		const fileName = 'lowp_cola';
// const fileName = 'deodorants';
// const fileName = 'savon';

		const mtlLoader = new THREE.MTLLoader();

		mtlLoader.setBaseUrl('assets/');
		mtlLoader.setPath('assets/');
		mtlLoader.load(`${fileName}.mtl`, (materials) => {

			materials.preload();

			const objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath('assets/');
			objLoader.load(
				`${fileName}.obj`,
				(object) => {

					if (object.children) {
						object.children.forEach((c) => c.geometry.center());
					}


					const axis = new THREE.Vector3(0.5, 1, 0.3);
					scene.add(object);

					const renderer = new THREE.WebGLRenderer();
					renderer.setPixelRatio(window.devicePixelRatio);
					renderer.setSize(window.innerWidth, window.innerHeight);
					renderer.setClearColor(new THREE.Color("hsl(0, 0%, 10%)"));

					container.appendChild(renderer.domElement);

					let fok = 0;
					setInterval(() => {
						object.rotateOnAxis(axis, 0.026);
						camera.position.z = 80 + Math.sin(fok) * 50;
						fok = fok + 0.03;
						if (fok > 360) fok = 0;
						renderer.render(scene, camera);
					}, 10);


					// setInterval(() => {
					// 	const m=object.children[0].material;
					// 	// m.map = THREE.ImageUtils.loadTexture( 'flower.png' );
					// 	m.needsUpdate = true ;
					// 	// m.wireframe=true;
					// 	m.map.wrapS=THREE.RepeatWrapping;
					// 	m.map.offset.x=Math.random()*20;
					// 	m.map.offset.y=10;
					// 	m.map.repeat.x=2;
					// 	m.map.repeat.y=2;
					// }, 2000);

					let c = 0;
					setInterval(() => {
						const m = object.children[0].material;
						// m.map = THREE.ImageUtils.loadTexture( 'flower.png' );
						m.needsUpdate = true;
						// m.wireframe=true;
						// m.map.wrapS=THREE.RepeatWrapping;
						if (m.map) {
							// m.map.offset.x = c;
							// c += 0.005;
							// m.map.offset.y = c;
							// m.map.scale.x=2000;
							// m.map.scale.y=2000;
							//  m.map.repeat.x=1+c;
							//  m.map.repeat.y=1+c;
						}

					}, 1000);


				});

		});


	}

}

export default AutoRotation;