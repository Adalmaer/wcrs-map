if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

			var container, stats;

			var views, scene, renderer;

			//var mesh, group1, group2, group3;
			var	light;

			var mouseX = 0, mouseY = 0;
			
			// Max
			var controls;
			var controls1;
			var raycaster;
			var DESCENDER_ADJUST = 1.28;
			var sphere_max;
			//var mouse = new THREE.Vector2(), INTERSECTED;

			var windowWidth, windowHeight;

			var views = [
				{
					left: 0,
					bottom: 0,
					//width: 1.0,
					//height: 1.0,
					width: 0.80,
					height: 1.0,
					background: new THREE.Color().setRGB( 0.0, 0.0, 0.0 ),
					//eye: [ 0, 300, 1800 ],
					eye: [ 0, 2000, 0 ],
					up: [ 0, 1, 0 ],
					//fov: 30,
					fov: 45,
					updateCamera: function ( camera, scene, mouseX, mouseY ) {
					  //camera.position.x += mouseX * 0.05;
					  //camera.position.x = Math.max( Math.min( camera.position.x, 2000 ), -2000 );
					  //camera.lookAt( scene.position );
					}
				},
				/*{
					left: 0.5,
					bottom: 0,
					width: 0.5,
					height: 0.5,
					background: new THREE.Color().setRGB( 0.7, 0.5, 0.5 ),
					eye: [ 0, 1800, 0 ],
					up: [ 0, 0, 1 ],
					fov: 45,
					updateCamera: function ( camera, scene, mouseX, mouseY ) {
					  camera.position.x -= mouseX * 0.05;
					  camera.position.x = Math.max( Math.min( camera.position.x, 2000 ), -2000 );
					  camera.lookAt( camera.position.clone().setY( 0 ) );
					}
				},*/
				{
					left: 0.8,
					bottom: 0.75,
					width: 0.20,
					height: 0.25,
					background: new THREE.Color().setRGB( 0.0, 0.0, 0.0 ),
					eye: [ 7500,19000,7500 ],
					up: [ 0, 1, 0 ],
					//fov: 60,
					fov: 45,
					updateCamera: function ( camera, scene, mouseX, mouseY ) {
					  //camera.position.y -= mouseX * 0.05;
					  //camera.position.y = Math.max( Math.min( camera.position.y, 1600 ), -1600 );
					  //camera.lookAt( scene.position );
					}
				}
			];

			init();
			animate();

			function getCanvasColor ( color ) {
	return "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
}
			
			function init() {

				container = document.getElementById( 'container' );

				for (var ii =  0; ii < views.length; ++ii ) {

					var view = views[ii];
					camera = new THREE.PerspectiveCamera( view.fov, window.innerWidth / window.innerHeight, 1, 100000 );
					camera.position.x = view.eye[ 0 ];
					camera.position.y = view.eye[ 1 ];
					camera.position.z = view.eye[ 2 ];
					camera.up.x = view.up[ 0 ];
					camera.up.y = view.up[ 1 ];
					camera.up.z = view.up[ 2 ];
					view.camera = camera;
				}
				
				scene = new THREE.Scene();

				// lights
				light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 1, 1, 1 );
				scene.add( light );
				
				light = new THREE.AmbientLight( 0xFFFFFF,0.2 ); 
				scene.add( light );
				
				// create the sphere's material
				var sphereMaterial =  new THREE.MeshLambertMaterial({color: 0xCC0000});
	
				var radius = 50;
				var segments = 24;
				var rings = 24;
		
		
		
		
		
		//var total = new THREE.Geometry();

		var sphere1 = new THREE.Mesh(

					  new THREE.SphereGeometry(
						100,
						segments,
						rings),

					  sphereMaterial);
					  
					   sphere1.position.x =0;
					 sphere1.position.z = 0;
					 sphere1.position.y = 0;
		scene.add(sphere1);
		


  
  

		// Create system spheres
		for (i=0;i<120;i++)
				{
				
				// create a new mesh with
				// sphere geometry - we will cover
				// the sphereMaterial next!
					var sphere = new THREE.Mesh(

					  new THREE.SphereGeometry(
						radius,
						segments,
						rings),

					  sphereMaterial);
					 
					 sphere.position.x = (data.systeme[i].x+(30*data.systeme[i].quadrant_x))*50;
					sphere.position.z = (data.systeme[i].y+(30*data.systeme[i].quadrant_y))*50;
					 sphere.position.y = 0; 
				  
					// add the sphere to the scene
					scene.add(sphere);
					//sphere.updateMatrix();
					//total.merge(sphere.geometry, sphere.matrix);
					
					var label = makeTextSprite(data.systeme[i].name, sphere.position.x, sphere.position.y+75,sphere.position.z+0);
					scene.add( label );
		
				}
				
				var quadrantId;
				var sektorId;
				var mainul = document.getElementById("list");
				var quaul;
				var sekul;
				
				// Add list items to right sidebar
				for (i=0;i<120;i++){
					

					
						quadrantId = data.systeme[i].quadrant_id;
						
						var li = document.createElement("li");
						li.appendChild(document.createTextNode(data.systeme[i].quadrant_id));
						//li.setAttribute("id", "qua-"+data.systeme[i].quadrantId);
						li.setAttribute("id", "qua-"+data.systeme[i].quadrant_id);
						li.setAttribute("data-jstree",'{"icon":"glyphicon glyphicon-folder-open"}');
						
						
						var quaul = document.createElement("ul");
						
						
							
						while (data.systeme[i].quadrant_id==quadrantId) {
							var sysli = document.createElement("li");
							sysli.appendChild(document.createTextNode(data.systeme[i].name));
							sysli.setAttribute("id", "sys-"+data.systeme[i].id);
							sysli.setAttribute("data-x",data.systeme[i].x );
							sysli.setAttribute("data-y",data.systeme[i].y );
							sysli.setAttribute("data-jstree",'{"icon":"glyphicon glyphicon-globe"}');
							quaul.appendChild(sysli);
							i++;
						}
						
						li.appendChild(quaul);
						mainul.appendChild(li);
				
				
				}
				
				//var mesh = new THREE.Mesh(total, sphereMaterial)
				//scene.add(mesh);
				

				var gridScale = 7500;
				var gridHelper = new THREE.GridHelper( gridScale, 1500, 0x48b0b0, 0x48b0b0 );
				gridHelper.position.y = 0;
				gridHelper.position.x = (gridScale);
				gridHelper.position.z = (gridScale);
				scene.add( gridHelper );				
				
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				stats = new Stats();
				container.appendChild( stats.dom );

				//document.addEventListener( 'mousemove', onDocumentMouseMove, false );

				// Max
				controls = new THREE.OrbitControls( views[0].camera, renderer.domElement );
				controls1 = new THREE.OrbitControls( views[1].camera, renderer.domElement );
				//controls1.target.set(6000, 0, 6000);
				//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
				controls.enableDamping = true;
				controls.dampingFactor = 0.25;
				
				controls.enableZoom = true;
				controls.enablePan = true;
				controls.enableRotate = true;
				
				controls.minDistance = 0;
				controls.maxDistance = 20000;
				controls.maxPolarAngle = Math.PI/2; 
				
				controls.rotateSpeed = 0.25;
				//controls1.zoomSpeed = 0.75;
				
				//controls.panSpeed=0.01;
				controls1.enableZoom = false;
				controls1.enablePan = false;
				controls1.enableRotate = false;
				
				views[1].camera.position.set(7500,19000,7500);
				views[1].camera.lookAt(new THREE.Vector3(7500,0,7500));
					
						
				//scene.fog = new THREE.FogExp2( 0x000000, 0.000045 );
				//renderer.setClearColor( 0xcccccc);
				
			}
			
			


			function makeTextSprite( message, x, y, z, parameters )
			{
				if ( parameters === undefined ) parameters = {};
				
				var fontface = parameters.hasOwnProperty("fontface") ? 
					parameters["fontface"] : "Arial";
				
				var fontsize = parameters.hasOwnProperty("fontsize") ? 
					parameters["fontsize"] : 50;
				
				var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
					parameters["borderThickness"] : 4;
				
				var borderColor = parameters.hasOwnProperty("borderColor") ?
					parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
				
				var fillColor = parameters.hasOwnProperty("fillColor") ?
					parameters["fillColor"] : undefined;

				var textColor = parameters.hasOwnProperty("textColor") ?
					parameters["textColor"] : { r:255, g:255, b:255, a:1.0 };

				var radius = parameters.hasOwnProperty("radius") ?
							parameters["radius"] : 6;

				var vAlign = parameters.hasOwnProperty("vAlign") ?
									parameters["vAlign"] : "center";

				var hAlign = parameters.hasOwnProperty("hAlign") ?
									parameters["hAlign"] : "center";

				var canvas = document.createElement('canvas');
				var context = canvas.getContext('2d');
				
				var base = 256;
				// set a large-enough fixed-size canvas 
				canvas.width = base*2;
				canvas.height = base;
				
				context.font = fontsize + "px " + fontface;
				context.textBaseline = "alphabetic";
				context.textAlign = "left";
				
				// get size data (height depends only on font size)
				var metrics = context.measureText( message );
				var textWidth = metrics.width;
				
				// find the center of the canvas and the half of the font width and height
				// we do it this way because the sprite's position is the CENTER of the sprite
				var cx = canvas.width / 2;
				var cy = canvas.height / 2;
				var tx = textWidth/ 2.0;
				var ty = fontsize / 2.0;

				// then adjust for the justification
				if ( vAlign == "bottom")
					ty = 0;
				else if (vAlign == "top")
					ty = fontsize;
				
				if (hAlign == "left")
					tx = textWidth;
				else if (hAlign == "right")
					tx = 0;
				
				// text color.  Note that we have to do this AFTER the round-rect as it also uses the "fillstyle" of the canvas
				context.fillStyle = getCanvasColor(textColor);
				context.fillText( message, cx - tx, cy + ty);
			   
				// canvas contents will be used for a texture
				var texture = new THREE.Texture(canvas) 
				texture.needsUpdate = true;

				var spriteMaterial = new THREE.SpriteMaterial( { map: texture } );
				var sprite = new THREE.Sprite( spriteMaterial );
				
				// we MUST set the scale to 2:1.  The canvas is already at a 2:1 scale,
				// but the sprite itself is square: 1.0 by 1.0
				// Note also that the size of the scale factors controls the actual size of the text-label
				var spriteScale = 175;
				sprite.scale.set(spriteScale*2,spriteScale,1);
				
				// set the sprite's position.  Note that this position is in the CENTER of the sprite
				sprite.position.set(x, y, z);
				
				return sprite;	
			}

			function onDocumentMouseMove( event ) {
				event.preventDefault();
				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			}

			function updateSize() {

				if ( windowWidth != window.innerWidth || windowHeight != window.innerHeight ) {

					windowWidth  = window.innerWidth;
					windowHeight = window.innerHeight;

					renderer.setSize ( windowWidth, windowHeight );
				}
			}


			function animate() {

				render();
				stats.update();

				requestAnimationFrame( animate );
				
				// required if controls.enableDamping = true, or if controls.autoRotate = true
				controls.update(); 
			}

			function render() {

				updateSize();

				for ( var ii = 0; ii < views.length; ++ii ) {

					view = views[ii];
					camera = view.camera;

					view.updateCamera( camera, scene, mouseX, mouseY );

					var left   = Math.floor( windowWidth  * view.left );
					var bottom = Math.floor( windowHeight * view.bottom );
					var width  = Math.floor( windowWidth  * view.width );
					var height = Math.floor( windowHeight * view.height );
					renderer.setViewport( left, bottom, width, height );
					renderer.setScissor( left, bottom, width, height );
					renderer.setScissorTest( true );
					renderer.setClearColor( view.background );

					camera.aspect = width / height;
					camera.updateProjectionMatrix();
										
					renderer.render( scene, camera );
				}
			}