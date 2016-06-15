if (!Detector.webgl) Detector.addGetWebGLMessage();

var container, stats;
var views, scene, renderer;

//var mesh, group1, group2, group3;
var light;
var mouseX, mouseY;

// Max

var controls;
var controls1;

var windowWidth, windowHeight;

var views = [{
    left: 0,
    bottom: 0,
    //width: 1.0,
    //height: 1.0,
    width: 0.80,
    height: 1.0,
    background: new THREE.Color().setRGB(0.0, 0.0, 0.0),
    eye: [0, 2000, 0],
    up: [0, 1, 0],
    fov: 45,
    updateCamera: function(camera, scene, mouseX, mouseY) {
        //camera.position.x += mouseX * 0.05;
        //camera.position.x = Math.max( Math.min( camera.position.x, 2000 ), -2000 );
        //camera.lookAt( scene.position );
    }
}, {
    left: 0.8,
    bottom: 0.75,
    width: 0.20,
    height: 0.25,
    background: new THREE.Color().setRGB(0.0, 0.0, 0.0),
    eye: [7500, 16500, 6000],
    up: [0, 1, 0],
    fov: 45,
    updateCamera: function(camera, scene, mouseX, mouseY) {
        //camera.position.y -= mouseX * 0.05;
        //camera.position.y = Math.max( Math.min( camera.position.y, 1600 ), -1600 );
        //camera.lookAt( scene.position );
    }
}];

init();
animate();

function init() {

    container = document.getElementById('container');

    // Viewports for scene
    for (var ii = 0; ii < views.length; ++ii) {

        var view = views[ii];
        camera = new THREE.PerspectiveCamera(view.fov, window.innerWidth / window.innerHeight, 1, 450000);
        camera.position.x = view.eye[0];
        camera.position.y = view.eye[1];
        camera.position.z = view.eye[2];
        camera.up.x = view.up[0];
        camera.up.y = view.up[1];
        camera.up.z = view.up[2];
        view.camera = camera;
    }

    scene = new THREE.Scene();

    // lights
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);
    light = new THREE.AmbientLight(0xFFFFFF, 0.2);
    scene.add(light);


    createSystems();
    //createSystems_1();
    //createSystems_2();
    //createSystems_3();
    createSidebarList();
	
	createCustomGrid();
	


	// line = new THREE.Line( geometry, material, THREE.LinePieces );
	//scene.add( line );

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);

    controls = new THREE.OrbitControls(views[0].camera, renderer.domElement);
    controls1 = new THREE.OrbitControls(views[1].camera, renderer.domElement);
    initControlProperties();

    //scene.fog = new THREE.FogExp2( 0x000000, 0.000045 );
    //renderer.setClearColor( 0xcccccc);
}

function initControlProperties() {
    //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
    var offsetX = 7500;
	var offsetZ = 6000;
	
    // Controls of main window
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.enableRotate = false;
    controls.minDistance = 0;
    controls.maxDistance = offsetX*2+1500;
    controls.minPolarAngle = 0; // radians
    controls.minAzimuthAngle = -Math.PI / 2; // radians
    controls.maxAzimuthAngle = Math.PI / 2; // radians
    controls.maxPolarAngle = Math.PI / 2;
    controls.rotateSpeed = 0.25;
    //controls.panSpeed=0.01;

    // Controls of small window
    //controls1.zoomSpeed = 0.75;
    controls1.enableZoom = false;
    controls1.enablePan = false;
    controls1.enableRotate = false;
    views[1].camera.position.set(offsetX, offsetX*2, offsetZ);
    views[1].camera.lookAt(new THREE.Vector3(offsetX, 0, offsetZ));
}


function createCustomGrid()
{
	
	/*    var gridScale = 7500;
    var gridHelper = new THREE.GridHelper(gridScale, 1500, 0x48b0b0, 0x48b0b0);
    gridHelper.position.y = 0;
    gridHelper.position.x = (gridScale);
    gridHelper.position.z = (gridScale);
    scene.add(gridHelper);*/
	
	var group = new THREE.Object3D(); //create an empty container
	var orangeMaterial = new THREE.LineBasicMaterial( { color: 0xfe5b00 } );
	var blueMaterial = new THREE.LineBasicMaterial( { color: 0x3399ff } );

	for (var i=0; i<= 8;i++)
	{
		var geometry = new THREE.Geometry();
		geometry.vertices.push( new THREE.Vector3( 0, 0, i*1500 ) );
		geometry.vertices.push( new THREE.Vector3( 15000 , 0, i*1500 ) );
			if(i % 2 ==0|i==0||i==8)
		{
			var line = new THREE.Line(geometry, blueMaterial);
			group.add(line);
		}
		else
		{
			var line = new THREE.Line(geometry, orangeMaterial);
			group.add(line);
		}
		 
		 
	}
	
		for (var i=0; i<= 10;i++)
	{
		   var geometry = new THREE.Geometry();
		geometry.vertices.push( new THREE.Vector3( i*1500, 0,0  ) );
		geometry.vertices.push( new THREE.Vector3(   i*1500, 0,12000 ) );
				if(i % 2 ==0|i==0||i==10)
		{
			var line = new THREE.Line(geometry, blueMaterial);
			group.add(line);
		}
		else
		{
			var line = new THREE.Line(geometry, orangeMaterial);
			group.add(line);
		}
	}
	scene.add(group);
}

function createSystems() {

    var arraySize = 125;

    // create the particle variables
    var particles = new THREE.Geometry();

    var pMaterial = new THREE.PointsMaterial({
        color: 0xCC0000,
        size: 150
    });

    // Similar for quality 0 and 1
    for (i = 0; i < arraySize; i++) {
        // create a particle with position
        var pX = (data.systeme[i].x + (30 * data.systeme[i].quadrant_x)) * 50;
        var pY = 0;
        var pZ = (data.systeme[i].y + (30 * data.systeme[i].quadrant_y)) * 50;
        particle = new THREE.Vector3(pX, pY, pZ);

        // add it to the geometry
        particles.vertices.push(particle);

        var label = makeTextSprite(data.systeme[i].name, pX, pY + 75, pZ);
        scene.add(label);
    }

    // create the particle system
    var particleSystem = new THREE.Points(
        particles,
        pMaterial);

    // add it to the scene
    scene.add(particleSystem);

}

function createSystems_1() {

    var arraySize = 125;

    // create the particle variables
    var particles = new THREE.Geometry();

    // instantiate a loader
    var loader = new THREE.TextureLoader();

    //allow cross origin loading
    loader.crossOrigin = '';

    // Load Texture
    var particleTexture = loader.load("http://threejs.org/examples/textures/sprites/ball.png");
    var pMaterial = new THREE.PointsMaterial({
        map: particleTexture,
        transparent: false,
        size: 300,
        color: 0xCC0000
    });

    // Similar for quality 0 and 1
    for (i = 0; i < arraySize; i++) {
        // create a particle with position
        var pX = (data.systeme[i].x + (30 * data.systeme[i].quadrant_x)) * 50;
        var pY = 0;
        var pZ = (data.systeme[i].y + (30 * data.systeme[i].quadrant_y)) * 50;
        particle = new THREE.Vector3(pX, pY, pZ);

        // add it to the geometry
        particles.vertices.push(particle);

        var label = makeTextSprite(data.systeme[i].name, pX, pY + 75, pZ);
        scene.add(label);
    }

    // create the particle system
    var particleSystem = new THREE.Points(
        particles,
        pMaterial);

    // add it to the scene
    scene.add(particleSystem);
}

function createSystems_2() {
    var arraySize = 125;
    var total = new THREE.Geometry();

    // Uses sphere geometry
    var radius = 50;
    var segments = 24;
    var rings = segments;
    // create the sphere's material
    var sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0xCC0000
    });

    // Create system spheres
    for (i = 0; i < arraySize; i++) {
        // create a new mesh with
        // sphere geometry - we will cover
        // the sphereMaterial next!
        var sphere = new THREE.Mesh(

            new THREE.SphereGeometry(
                radius,
                segments,
                rings),

            sphereMaterial);

        sphere.position.x = (data.systeme[i].x + (30 * data.systeme[i].quadrant_x)) * 50;
        sphere.position.z = (data.systeme[i].y + (30 * data.systeme[i].quadrant_y)) * 50;
        sphere.position.y = 0;

        // add the sphere to the scene
        sphere.updateMatrix();
        total.merge(sphere.geometry, sphere.matrix);

        var label = makeTextSprite(data.systeme[i].name, sphere.position.x, sphere.position.y + 75, sphere.position.z + 0);
        scene.add(label);
    }

    var mesh = new THREE.Mesh(total, new THREE.MeshLambertMaterial({
        color: 0xCC0000
    }))
    scene.add(mesh);
}

function createSystems_3() {
    var arraySize = 125;
    var group = new THREE.Object3D(); //create an empty container

    // Uses sphere geometry
    var radius = 50;
    var segments = 24;
    var rings = segments;
    // create the sphere's material
    var sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0xCC0000
    });

    // Create system spheres
    for (i = 0; i < arraySize; i++) {
        // create a new mesh with
        // sphere geometry - we will cover
        // the sphereMaterial next!
        var sphere = new THREE.Mesh(

            new THREE.SphereGeometry(
                radius,
                segments,
                rings),

            sphereMaterial);

        sphere.position.x = (data.systeme[i].x + (30 * data.systeme[i].quadrant_x)) * 50;
        sphere.position.z = (data.systeme[i].y + (30 * data.systeme[i].quadrant_y)) * 50;
        sphere.position.y = 0;

        // add the sphere to the scene
        group.add(sphere);

        var label = makeTextSprite(data.systeme[i].name, sphere.position.x, sphere.position.y + 75, sphere.position.z + 0);
        scene.add(label);
    }

    scene.add(group);

}

function createSidebarList() {
    // Add list items to right sidebar
    var quadrantId = -1;
    var sektorId = -1;
    var mainList = document.getElementById("list");
    var quadrantList;
    var quadrantListItem;
    var sectorList;
    var sectorListItem;

    // Iterate through systems
    for (i = 0; i < 125; i++) {

        // Add new quadrant to sector
        if (quadrantId != data.systeme[i].quadrant_id) {

            // Prevent if i==0
            if (quadrantListItem != null) {
                quadrantListItem.appendChild(quadrantList);
                sectorList.appendChild(quadrantListItem);
            }
            quadrantListItem = document.createElement("li");
            quadrantList = document.createElement("ul");
            quadrantListItem.appendChild(document.createTextNode("Quadrant: " + data.systeme[i].quadrant_id));
            setNodeAttributes(
                quadrantListItem,
                "quadrant-" + data.systeme[i].quadrant_id,
                (((30 * data.systeme[i].quadrant_x)) * 50) + 750,
                (((30 * data.systeme[i].quadrant_y)) * 50) + 750,
                "2000",
                '{"icon":"glyphicon glyphicon-folder-open"}');

            // Set new Id for quadrant
            quadrantId = data.systeme[i].quadrant_id;


        }

        // Add new sector to mainList
        if (sektorId != data.systeme[i].sektor_id) {
            // Prevent if i==0
            if (sectorListItem != null) {
                sectorListItem.appendChild(sectorList);
                mainList.appendChild(sectorListItem);
            }
            sectorListItem = document.createElement("li");
            sectorList = document.createElement("ul");
            sectorListItem.appendChild(document.createTextNode("Sektor: " + data.systeme[i].sektor_id));
            setNodeAttributes(
                sectorListItem,
                "sector-" + data.systeme[i].sektor_id,
                ((30 * data.systeme[i].quadrant_x) * 50) + 1500,
                ((30 * data.systeme[i].quadrant_y) * 50) + 1500,
                "4000",
                '{"icon":"glyphicon glyphicon-folder-open"}');

            // Set new Id for sector
            sektorId = data.systeme[i].sektor_id;

        }

        //Add current system to quadrant
        var systemListItem = document.createElement("li");
        systemListItem.appendChild(document.createTextNode(data.systeme[i].name));
        setNodeAttributes(
            systemListItem,
            "system-" + data.systeme[i].id,
            ((data.systeme[i].x + (30 * data.systeme[i].quadrant_x)) * 50),
            ((data.systeme[i].y + (30 * data.systeme[i].quadrant_y)) * 50),
            "1000",
            '{"icon":"glyphicon glyphicon-globe"}');
        quadrantList.appendChild(systemListItem);
    }

    // Add the remaining ones
    quadrantListItem.appendChild(quadrantList);
    sectorList.appendChild(quadrantListItem);
    sectorListItem.appendChild(sectorList);
    mainList.appendChild(sectorListItem);

}

function setNodeAttributes(node, id, dataX, dataY, distance, icon) {
    node.setAttribute("id", id);
    node.setAttribute("data-x", dataX);
    node.setAttribute("data-y", dataY);
    node.setAttribute("cam", distance);
    node.setAttribute("data-jstree", icon);
}


function getCanvasColor(color) {
    return "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
}


function makeTextSprite(message, x, y, z, parameters) {
    if (parameters === undefined) parameters = {};

    var fontface = parameters.hasOwnProperty("fontface") ?
        parameters["fontface"] : "Arial";

    var fontsize = parameters.hasOwnProperty("fontsize") ?
        parameters["fontsize"] : 50;

    var borderThickness = parameters.hasOwnProperty("borderThickness") ?
        parameters["borderThickness"] : 4;

    var borderColor = parameters.hasOwnProperty("borderColor") ?
        parameters["borderColor"] : {
            r: 0,
            g: 0,
            b: 0,
            a: 1.0
        };

    var fillColor = parameters.hasOwnProperty("fillColor") ?
        parameters["fillColor"] : undefined;

    var textColor = parameters.hasOwnProperty("textColor") ?
        parameters["textColor"] : {
            r: 255,
            g: 255,
            b: 255,
            a: 1.0
        };

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
    canvas.width = base * 2;
    canvas.height = base;

    context.font = fontsize + "px " + fontface;
    context.textBaseline = "alphabetic";
    context.textAlign = "left";

    // get size data (height depends only on font size)
    var metrics = context.measureText(message);
    var textWidth = metrics.width;

    // find the center of the canvas and the half of the font width and height
    // we do it this way because the sprite's position is the CENTER of the sprite
    var cx = canvas.width / 2;
    var cy = canvas.height / 2;
    var tx = textWidth / 2.0;
    var ty = fontsize / 2.0;

    // then adjust for the justification
    if (vAlign == "bottom")
        ty = 0;
    else if (vAlign == "top")
        ty = fontsize;

    if (hAlign == "left")
        tx = textWidth;
    else if (hAlign == "right")
        tx = 0;

    // text color.  Note that we have to do this AFTER the round-rect as it also uses the "fillstyle" of the canvas
    context.fillStyle = getCanvasColor(textColor);
    context.fillText(message, cx - tx, cy + ty);

    // canvas contents will be used for a texture
    var texture = new THREE.Texture(canvas)
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial({
        map: texture
    });
    var sprite = new THREE.Sprite(spriteMaterial);

    // we MUST set the scale to 2:1.  The canvas is already at a 2:1 scale,
    // but the sprite itself is square: 1.0 by 1.0
    // Note also that the size of the scale factors controls the actual size of the text-label
    var spriteScale = 200;
    sprite.scale.set(spriteScale * 2, spriteScale, 1);

    // set the sprite's position.  Note that this position is in the CENTER of the sprite
    sprite.position.set(x, y, z);

    return sprite;
}

function updateSize() {

    if (windowWidth != window.innerWidth || windowHeight != window.innerHeight) {

        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;

        renderer.setSize(windowWidth, windowHeight);
    }
}


function animate() {

    render();
    stats.update();

    requestAnimationFrame(animate);

    // required if controls.enableDamping = true, or if controls.autoRotate = true
    controls.update();
}

function render() {

    updateSize();

    for (var ii = 0; ii < views.length; ++ii) {

        view = views[ii];
        camera = view.camera;

        view.updateCamera(camera, scene, mouseX, mouseY);

        var left = Math.floor(windowWidth * view.left);
        var bottom = Math.floor(windowHeight * view.bottom);
        var width = Math.floor(windowWidth * view.width);
        var height = Math.floor(windowHeight * view.height);
        renderer.setViewport(left, bottom, width, height);
        renderer.setScissor(left, bottom, width, height);
        renderer.setScissorTest(true);
        renderer.setClearColor(view.background);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.render(scene, camera);
    }
}

// Move camera to position on click
$('#jstree').on("select_node.jstree", function(e, data) {
    var dataX = parseInt(data.node.li_attr["data-x"]);
    var dataY = parseInt(data.node.li_attr["data-y"]);
    var distance = parseInt(data.node.li_attr["cam"]);
    views[0].camera.position.set(dataX, distance, dataY);
    controls.target = new THREE.Vector3(dataX, 0, dataY);
});

function resetControls() {
    controls.reset();
}

function toggleRotation() {
    if (controls.enableRotate == true) {
        controls.enableRotate = false;
        alert('Rotation off');
    } else {
        controls.enableRotate = true;
        alert('Rotation on');
    }
}

function cameraLookDownAt(camera, x, y, z) {
    camera.position.set(x, y, z);
    camera.lookAt(new THREE.Vector3(x, 0, z));
}