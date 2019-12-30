        import * as THREE from '../build/three.module.js';
		import Stats from './jsm/libs/stats.module.js';
		import { OrbitControls } from './jsm/controls/OrbitControls.js';
		import { Water } from './jsm/objects/Water.js';
		import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
		import { RGBELoader } from './jsm/loaders/RGBELoader.js';
		import {OBJLoader2} from './jsm/loaders/OBJLoader2.js';
		import {MTLLoader} from './jsm/loaders/MTLLoader.js';
		import {MtlObjBridge} from './jsm/loaders/obj2/bridge/MtlObjBridge.js';

		var container, stats,clock;
		var camera, scene, renderer, light,ambient_light;
		var controls, water;
		var mixer,mesh,mesh2,mesh3,mesh4,mesh5;

		init();
		animate();

	function init() {

		container = document.getElementById( 'container' );

		//

		renderer = new THREE.WebGLRenderer({ antialias: true });
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				//
				clock = new THREE.Clock();
				scene = new THREE.Scene();

				//

				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 2000000 );
				camera.position.set( -1000, 250, 150 );

				//

				light = new THREE.DirectionalLight( 0xffffff, 0.8 );
				scene.add( light );
				ambient_light = new THREE.AmbientLight( 0xffffff, 0.8 );
				scene.add( ambient_light );

		// Water
		{ 
			var waterGeometry = new THREE.PlaneBufferGeometry( 10000000, 10000000 );

			water = new Water(
			waterGeometry,
					{
						textureWidth: 1920,
						textureHeight: 1080,
						waterNormals: new THREE.TextureLoader().load( 'textures/water/waternormals.jpg', function ( texture ) {

							texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

						} ),
						alpha: 1.0,
						sunDirection: light.position.clone().normalize(),
						sunColor: 0xffffff,
						waterColor: 0x001e0f,
						distortionScale: 3.7,
						fog: scene.fog !== undefined
					}
			);

			water.rotation.x = - Math.PI / 2;

			scene.add( water );
		}
		// Skybox
		{ 
		var aCubeMap = THREE.ImageUtils.loadTextureCube([
		  'textures/sky/px.jpg',
		  'textures/sky/nx.jpg',
		  'textures/sky/py.jpg',
		  'textures/sky/ny.jpg',
		  'textures/sky/pz.jpg',
		  'textures/sky/nz.jpg'
		]);
		aCubeMap.format = THREE.RGBFormat;

		var aShader = THREE.ShaderLib['cube'];
		aShader.uniforms['tCube'].value = aCubeMap;

		var aSkyBoxMaterial = new THREE.ShaderMaterial({
		  fragmentShader: aShader.fragmentShader,
		  vertexShader: aShader.vertexShader,
		  uniforms: aShader.uniforms,
		  depthWrite: false,
		  side: THREE.BackSide
		});

		var aSkybox = new THREE.Mesh(new THREE.BoxGeometry(1000000, 1000000, 1000000),aSkyBoxMaterial);
		
		scene.add(aSkybox);
	}
		// Load Static Models
		{
			// Object 1
  			const mtlLoader = new MTLLoader();
  			mtlLoader.load('models/obj/hot_ballon/Air_Balloon.mtl', (mtlParseResult) => {
    		const materials =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
			const objLoader = new OBJLoader2();
			objLoader.addMaterials(materials);
    		objLoader.load('models/obj/hot_ballon/Air_Balloon.obj', (root) => {
				root.scale.set(30,30,30);
				root.position.set(500,500,1000);
				mesh = root;
				scene.add(root);
 			   });
		  });
			// Object 2
		  const mtlLoader2 = new MTLLoader();
  			mtlLoader2.load('models/obj/Airplane/Airplane.mtl', (mtlParseResult2) => {
    		const materials2 =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult2);
			const objLoader2 = new OBJLoader2();
			objLoader2.addMaterials(materials2);
    		objLoader2.load('models/obj/Airplane/Airplane.obj', (root2) => {
				//root2.scale.set(-10,-10,-10);
				root2.rotation.x = -190;
				root2.position.set(1000,5000,1000);
				mesh2 = root2;
				scene.add(root2);
			  });
		  });
		  // Object 3
		  const mtlLoader3 = new MTLLoader();
  			mtlLoader3.load('models/obj/Airplane2/Airplane.mtl', (mtlParseResult3) => {
    		const materials3 =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult3);
			const objLoader3 = new OBJLoader2();
			objLoader3.addMaterials(materials3);
    		objLoader3.load('models/obj/Airplane2/Airplane.obj', (root3) => {
				root3.rotation.set(250,0,270);
				root3.position.set(5000,5000,5000);
				mesh3 = root3;
				scene.add(root3);
			  });
		  });
		  // Object 4
		  const mtlLoader4 = new MTLLoader();
  			mtlLoader4.load('models/obj/Cruisership 2012/Cruiser_2012.mtl', (mtlParseResult4) => {
    		const materials4 =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult4);
			const objLoader4 = new OBJLoader2();
			objLoader4.addMaterials(materials4);
    		objLoader4.load('models/obj/Cruisership 2012/Cruiser 2012.obj', (root4) => {
				root4.scale.set(2,2,2);
				root4.position.set(800,-5,800);
				mesh4 = root4;
				scene.add(root4);
			  });
		  });
		  // Object 5
		  const mtlLoader5 = new MTLLoader();
  			mtlLoader5.load('models/obj/Small Tropical Island/Small_Tropical_Island.mtl', (mtlParseResult5) => {
    		const materials5 =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult5);
			const objLoader5 = new OBJLoader2();
			objLoader5.addMaterials(materials5);
    		objLoader5.load('models/obj/Small Tropical Island/Small Tropical Island.obj', (root5) => {
				root5.scale.set(40,40,40);
				root5.position.set(40000,-5,0);
				mesh5 = root5;
				scene.add(root5);
			  });
		  });
		}

		
		// Load Animated Models
		{ 
		new RGBELoader()
		.setDataType( THREE.UnsignedByteType )
		.setPath( 'textures/equirectangular/' )
		.load( 'pedestrian_overpass_2k.hdr', function ( texture ) {

		var options = {
		minFilter: texture.minFilter,
		magFilter: texture.magFilter
		};				
		var loader = new GLTFLoader().setPath( 'models/gltf/shark/' );
		loader.load( 'shark.gltf', function ( gltf ) {

		gltf.scene.traverse( function ( child ) {


		} );

		mixer = new THREE.AnimationMixer( gltf.scene );
		var action = mixer.clipAction( gltf.animations[ 0 ] );
		action.play();

		gltf.scene.scale.set(40,40,40)
		gltf.scene.position.y = -40;

		scene.add( gltf.scene );
							
		} );
		} );

		}
		
		//Control
		{ 
				controls = new OrbitControls( camera, renderer.domElement );
				controls.maxPolarAngle = Math.PI * 0.495;
				controls.target.set( 0, 10, 0 );
				controls.minDistance = 40.0;
				controls.maxDistance = 4000.0;
				controls.update();

				//Stats(FPS)

				stats = new Stats();
				container.appendChild( stats.dom );

				window.addEventListener( 'resize', onWindowResize, false );

			}
		}

	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	}

	function animate() {
		requestAnimationFrame( animate );

		var delta = clock.getDelta();

		if ( mixer ) mixer.update( delta );

		render( scene, camera );

		stats.update();

		}
			
	function render() {

		var time = performance.now() * 0.001;

		mesh.rotation.y += 0.01;
		mesh.position.x += 1;
		mesh2.position.x += 10;
		mesh3.position.z -= 20;
		mesh4.position.x -= 2;

		water.material.uniforms[ 'time' ].value += 1.0 / 60.0;

		renderer.render( scene, camera );

		}