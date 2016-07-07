if (!Detector.webgl) Detector.addGetWebGLMessage();

var container, stats;
var views, scene, renderer;

//var mesh, group1, group2, group3;
var light;
var mouseX, mouseY;
var windowWidth, windowHeight;

// Max
var labelGroup;
var systemGroup;
var fleetGroup;
var controls;
var controls1;
var labelVisibility;
var systemVisibility;
var factionMaterials;



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
    fov: 45
	}, {
    left: 0.8,
    bottom: 0.75,
    width: 0.20,
    height: 0.25,
    background: new THREE.Color().setRGB(0.0, 0.0, 0.0),
    eye: [7500, 16500, 6000],
    up: [0, 1, 0],
    fov: 45
}];

init();
animate();

function init() {
	
	container = document.getElementById('container');
	
	// Variablen und Container initialisieren
	labelGroup = new THREE.Object3D();
	systemGroup = new THREE.Object3D();
	fleetGroup = new THREE.Object3D();
	labelVisibility = true;
	systemVisibility=true;
	fleetVisibility=true;
	
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

	createCustomGrid(8,10);
	//alert('1/5');
	
	createLabels();
	scene.add(labelGroup);
	//alert('2/5');
	
	//createSystems();
    //createSystems_1();
    createSystems_2();
	//createSystems_3();
	scene.add(systemGroup);
	createSidebarList();
	//alert('3/5');
	
	createFleets();
	scene.add(fleetGroup);
	//alert('4/5');

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);

    controls = new THREE.OrbitControls(views[0].camera, renderer.domElement);
    controls1 = new THREE.OrbitControls(views[1].camera, renderer.domElement);
    initControlProperties();

	//var fog = new THREE.Fog( 0x000000, 1, 15000 );
    //scene.fog = fog;
    renderer.setClearColor( 0xcccccc);
	
	//alert('5/5');
	
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
    controls.minAzimuthAngle = -Math.PI / 2; // radians // Gegen den Uhrzeigersinn
	controls.maxAzimuthAngle = Math.PI / 2; // radians // Uhrzeigersinn
    controls.maxPolarAngle = Math.PI / 2;
    controls.rotateSpeed = 0.25;
	controls.zoomSpeed = Math.PI / 2;
    //controls.panSpeed=0.01;
	//views[0].camera.position.set(offsetX, offsetX*2, offsetZ);
	//views[0].camera.lookAt(new THREE.Vector3(offsetX, 0, offsetZ));
	//cameraLookDownAt(views[0].camera,5000,5000,5000);
	cameraLookDownAt(controls, views[0].camera,750,2000,750);
	
    // Controls of small window
    
    controls1.enableZoom = false;
    controls1.enablePan = false;
    controls1.enableRotate = false;
	cameraLookDownAt(controls1, views[1].camera,offsetX,offsetX*2,offsetZ);
	//controls1.zoomSpeed = 0.75;
    //views[1].camera.position.set(offsetX, offsetX*2, offsetZ);
    //views[1].camera.lookAt(new THREE.Vector3(offsetX, 0, offsetZ));
}


function createCustomGrid(rows, cols)
{
	
	/*    var gridScale = 7500;
    var gridHelper = new THREE.GridHelper(gridScale, 1500, 0x48b0b0, 0x48b0b0);
    gridHelper.position.y = 0;
    gridHelper.position.x = (gridScale);
    gridHelper.position.z = (gridScale);
    scene.add(gridHelper);*/
	
	var group = new THREE.Object3D(); //create an empty container
	var orangeMaterial = new THREE.LineBasicMaterial( { color: 0xfe5b00,fog:false } );
	var blueMaterial = new THREE.LineBasicMaterial( { color: 0x3399ff,fog:false } );

	for (var i=0; i<= rows;i++){
		var geometry = new THREE.Geometry();
		geometry.vertices.push( new THREE.Vector3( 0, 0, i*1500 ) );
		geometry.vertices.push( new THREE.Vector3( 15000 , 0, i*1500 ) );
		if(i % 2 ==0|i==0||i==rows){
			var line = new THREE.Line(geometry, blueMaterial);
			group.add(line);
		}
		else{
			var line = new THREE.Line(geometry, orangeMaterial);
			group.add(line);
		}
	}
	
	for (var i=0; i<= cols;i++){
	   var geometry = new THREE.Geometry();
		geometry.vertices.push( new THREE.Vector3( i*1500, 0,0  ) );
		geometry.vertices.push( new THREE.Vector3(   i*1500, 0,12000 ) );
		if(i % 2 ==0|i==0||i==cols){
			var line = new THREE.Line(geometry, blueMaterial);
			group.add(line);
		}else{
			var line = new THREE.Line(geometry, orangeMaterial);
			group.add(line);
		}
	}
	scene.add(group);
}

function createLabels(){
	var currentQuadrant=-1;
	var currentSector=-1;
	for (i = 0; i < systemList.systems.length; i++) 
	{
		if (currentQuadrant!=systemList.systems[i].quadrantId)
		{
			var pX = (((parseInt(systemList.systems[i].quadrantX)-1) * 30) * 50)+750;
			var pZ = (((parseInt(systemList.systems[i].quadrantY)-1) * 30) * 50)+750;
			var pY = +500;
			var label = makeTextSprite(systemList.systems[i].quadrantName, pX, pY, pZ,{spritescale:400,hAlign:"center",textColor: {r:255, g:69, b:0, a:0.5}});
			labelGroup.add(label);
			currentQuadrant=systemList.systems[i].quadrantId;
		}
		
		if(currentSector!=systemList.systems[i].sectorId){
			var pX = (((parseInt(systemList.systems[i].quadrantX)-1) * 30) * 50)+1500;
			var pZ = (((parseInt(systemList.systems[i].quadrantY)-1) * 30) * 50)+1500;
			var pY = +1000;
			var label = makeTextSprite(systemList.systems[i].sectorName+"-Sektor", pX, pY, pZ,{spritescale:800,textColor: {r:30, g:144, b:255, a:0.5}});
			labelGroup.add(label);
			currentSector=systemList.systems[i].sectorId;
		}
	}
}

function createSystems() {

    // create the particle variables
    var particles = new THREE.Geometry();

    var pMaterial = new THREE.PointsMaterial({
        color: 0xCC0000,
        size: 150,
        transparent: true,
		alphaTest: 0.5
    });

    // Similar for quality 0 and 1
    for (i = 0; i < systemList.systems.length; i++) {
        // create a particle with position
		
        var pX = (parseInt(systemList.systems[i].systemX) + parseInt(systemList.systems[i].quadrantX-1)*30) * 50;
        var pZ = (parseInt(systemList.systems[i].systemY) + parseInt(systemList.systems[i].quadrantY-1)*30) * 50;
        var pY = 0;
        particle = new THREE.Vector3(pX, pY, pZ);

        // add it to the geometry
        particles.vertices.push(particle);

        var label = makeTextSprite(systemList.systems[i].systemName, pX, pY, pZ+50,{spritescale:200});
        systemGroup.add(label);
    }

    // create the particle system
    var particleSystem = new THREE.Points(
        particles,
        pMaterial);

    // add it to the scene
    systemGroup.add(particleSystem);
}

function createFleets() {

    // create the particle variables
    var particles = new THREE.Geometry();

    // instantiate a loader
    var loader = new THREE.TextureLoader();

    //allow cross origin loading
    loader.crossOrigin = '';

    // Load Texture
	//var imagePath = fleetList.fleets[i].fleetImage;
    var particleTexture = loader.load("midway.png");
    var pMaterial = new THREE.PointsMaterial({
        map: particleTexture,
        transparent: true,
		alphaTest: 0.5,
        size: 200,
       // color: 0xCC0000
    });

    // Similar for quality 0 and 1
    for (i = 0; i < fleetList.fleets.length; i++) {
        // create a particle with position
        var pX = (parseInt(fleetList.fleets[i].systemX) + parseInt(fleetList.fleets[i].quadrantX-1)*30) * 50+75;
        var pZ = (parseInt(fleetList.fleets[i].systemY) + parseInt(fleetList.fleets[i].quadrantY-1)*30) * 50-75;
        var pY = +150;
        particle = new THREE.Vector3(pX, pY, pZ);

        // add it to the geometry
        particles.vertices.push(particle);

        var label = makeTextSprite(fleetList.fleets[i].fleetName, pX, pY, pZ+50,{spritescale:100});
        fleetGroup.add(label);
		
		var orangeMaterial = new THREE.LineBasicMaterial( { color: 0xfe5b00   ,   transparent: true,
		alphaTest: 0.5 } );
		var geometry = new THREE.Geometry();
		geometry.vertices.push( new THREE.Vector3( pX-75, 5, pZ+75 ) );
		geometry.vertices.push( new THREE.Vector3( pX, pY-5, pZ ) );
		var line = new THREE.Line(geometry, orangeMaterial);
		fleetGroup.add(line);		
    }

    // create the particle system
    var particleSystem = new THREE.Points(
        particles,
        pMaterial);

    // add it to the scene
    fleetGroup.add(particleSystem);
}

function createSystems_1() {

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
    transparent: true,
        size: 300,
        color: 0xCC0000
    });

    // Similar for quality 0 and 1
    for (i = 0; i < systemList.systems.length; i++) {
        // create a particle with position
        var pX = parseInt(systemList.systems[i].systemX) + parseInt(systemList.systems[i].quadrantX) * 1500;
        var pZ = parseInt(systemList.systems[i].systemY) + parseInt(systemList.systems[i].quadrantY) * 1500;
        var pY = 0;
        particle = new THREE.Vector3(pX, pY, pZ);

        // add it to the geometry
        particles.vertices.push(particle);

        var label = makeTextSprite(systemList.systems[i].systemName, pX, pY, pZ);
        systemGroup.add(label);
    }

    // create the particle system
    var particleSystem = new THREE.Points(
        particles,
        pMaterial);

    // add it to the scene
    systemGroup.add(particleSystem);
}

function createSystems_2() {
   
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
    for (i = 0; i < systemList.systems.length; i++) {
        // create a new mesh with
        // sphere geometry - we will cover
        // the sphereMaterial next!
        var sphere = new THREE.Mesh(

            new THREE.SphereGeometry(
                radius,
                segments,
                rings),

            sphereMaterial);
	
        var pX = (parseInt(systemList.systems[i].systemX) + parseInt(systemList.systems[i].quadrantX-1)*30) * 50;
        var pZ = (parseInt(systemList.systems[i].systemY) + parseInt(systemList.systems[i].quadrantY-1)*30) * 50;
        var pY = 0;

        sphere.position.x = pX;
        sphere.position.z = pZ;
        sphere.position.y = pY;

        // add the sphere to the scene
        sphere.updateMatrix();
        total.merge(sphere.geometry, sphere.matrix);

        var label = makeTextSprite(systemList.systems[i].systemName, pX, pY + 75, pZ,{spritescale:200});
        systemGroup.add(label);
    }

    var mesh = new THREE.Mesh(total, new THREE.MeshLambertMaterial({
        color: 0xCC0000
    }))
    systemGroup.add(mesh);
}

function createSystems_3() {
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
    for (i = 0; i < systemList.systems.length; i++) {
        // create a new mesh with
        // sphere geometry - we will cover
        // the sphereMaterial next!
        var sphere = new THREE.Mesh(

            new THREE.SphereGeometry(
                radius,
                segments,
                rings),

            sphereMaterial);

       var pX = (parseInt(systemList.systems[i].systemX) + parseInt(systemList.systems[i].quadrantX-1)*30) * 50;
        var pZ = (parseInt(systemList.systems[i].systemY) + parseInt(systemList.systems[i].quadrantY-1)*30) * 50;
        var pY = 0;

        sphere.position.x = pX;
        sphere.position.z = pZ;
        sphere.position.y = pY;

        // add the sphere to the scene
        systemGroup.add(sphere);

        var label = makeTextSprite(systemList.systems[i].systemName, pX, pY + 75, pZ,{spritescale:200});
        systemGroup.add(label);
    }
    //scene.add(group);
}

function createSidebarList() {
    // Add list items to right sidebar
    var quadrantId = -1;
    var sectorId = -1;
    var mainList = document.getElementById("list");
    var quadrantList;
    var quadrantListItem;
    var sectorList;
    var sectorListItem;

    // Iterate through systems
    for (i = 0; i < systemList.systems.length; i++) {

        // Add new quadrant to sector
        if (quadrantId != systemList.systems[i].quadrantId) {

            // Prevent if i==0
            if (quadrantListItem != null) {
                quadrantListItem.appendChild(quadrantList);
                sectorList.appendChild(quadrantListItem);
            }
            quadrantListItem = document.createElement("li");
            quadrantList = document.createElement("ul");
            quadrantListItem.appendChild(document.createTextNode(systemList.systems[i].quadrantName + "-Quadrant"));
            setNodeAttributes(
                quadrantListItem,
                "quadrant-" + systemList.systems[i].quadrantId,
                (((parseInt(systemList.systems[i].quadrantX)-1) * 30) * 50) + 750,
                (((parseInt(systemList.systems[i].quadrantY)-1) * 30) * 50) + 750,
                "2000",
                '{"icon":"glyphicon glyphicon-folder-open"}');

            // Set new Id for quadrant
            quadrantId = systemList.systems[i].quadrantId;


        }

        // Add new sector to mainList
        if (sectorId != systemList.systems[i].sectorId) {
            // Prevent if i==0
            if (sectorListItem != null) {
                sectorListItem.appendChild(sectorList);
                mainList.appendChild(sectorListItem);
            }
            sectorListItem = document.createElement("li");
            sectorList = document.createElement("ul");
            sectorListItem.appendChild(document.createTextNode(systemList.systems[i].sectorName+"-Sektor"));
            setNodeAttributes(
                sectorListItem,
                "sector-" + systemList.systems[i].sectorId,
                (30 * (parseInt(systemList.systems[i].quadrantX)-1) * 50) + 1500,
                (30 * (parseInt(systemList.systems[i].quadrantY)-1) * 50) + 1500,
                "4000",
                '{"icon":"glyphicon glyphicon-folder-open"}');

            // Set new Id for sector
            sectorId = systemList.systems[i].sectorId;

        }

        //Add current system to quadrant
        var systemListItem = document.createElement("li");
        systemListItem.appendChild(document.createTextNode(systemList.systems[i].systemName+"-System"));
        setNodeAttributes(
            systemListItem,
            "system-" + systemList.systems[i].systemId,
            (parseInt(systemList.systems[i].systemX) + (parseInt(systemList.systems[i].quadrantX)-1)*30) * 50,
            (parseInt(systemList.systems[i].systemY) + (parseInt(systemList.systems[i].quadrantY)-1)*30) * 50,
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

	var spriteScale = parameters.hasOwnProperty("spritescale") ?
        parameters["spritescale"] : 200;
	
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
        //tx = textWidth;
		x = x + textWidth/2;
    else if (hAlign == "right")
        tx = 0;

    // text color.  Note that we have to do this AFTER the round-rect as it also uses the "fillstyle" of the canvas
    context.fillStyle = getCanvasColor(textColor);
    context.fillText(message, cx - tx, cy + ty);

    // canvas contents will be used for a texture
    var texture = new THREE.Texture(canvas)
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
    });
    var sprite = new THREE.Sprite(spriteMaterial);

    // we MUST set the scale to 2:1.  The canvas is already at a 2:1 scale,
    // but the sprite itself is square: 1.0 by 1.0
    // Note also that the size of the scale factors controls the actual size of the text-label
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
	cameraLookDownAt(controls, views[0].camera, dataX, distance, dataY)
});

function toggleLabelVisibility()
{
	if (labelVisibility) {
		scene.remove(labelGroup);
		labelVisibility=false;
		alert('Labels aus');
	}
	else{
		scene.add(labelGroup);
		labelVisibility=true;
		alert('Labels an');
	}
	
}

function toggleFleetVisibility()
{
	if(fleetVisibility)
	{
		scene.remove(fleetGroup);
		fleetVisibility=false;
		alert('Flotten aus');
	}
	else{
		scene.add(fleetGroup);
		fleetVisibility=true;
		alert('Flotten an');
	}
}

function toggleSystemVisibility()
{
	if (systemVisibility) {
		scene.remove(systemGroup);
		systemVisibility=false;
		alert('Systeme aus');
	}
	else{
		scene.add(systemGroup);
		systemVisibility=true;
		alert('Systeme an');
	}
	
}

function resetControls() {
    controls.reset();
}

function toggleRotation() {
    if (controls.enableRotate == true) {
        controls.enableRotate = false;
        alert('Rotation aus');
    } else {
        controls.enableRotate = true;
        alert('Rotation an');
    }
}

function cameraLookDownAt(controls,camera, x, y, z) {
    camera.position.set(x, y, z);
	camera.lookAt(new THREE.Vector3(x, 0, z));
	controls.target.set( x, 0, z );
}

$(function() {
	$('#jstree').jstree({
		"core": {
			"multiple": false,
			"animation": 1
		}
	});
});