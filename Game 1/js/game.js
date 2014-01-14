/* 
 * WebGL-Game-Dev-From-Scratch
 * 
 * @author Joshua Lawson - josh@sphyrix.net
 * 
 * The purpose of this project is to create mutiple small games for learning purposes,
 * the games will differ in some way and each game will slowly have more features such as sound
 * and different WebGL features. 
 * 
 * Game 1 - A galaga replica in 3D
 */

//WebGL Variables
var scene, camera, renderer;

//Game Variables
var player = {
    alive: true,
    object: false
};

var bullets = new Array();

var speed = 5;

function init(){
    // Create the scene and set the scene size.
    scene = new THREE.Scene();
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
    
    //Create a renderer and add it to the DOM
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);
    
    // Create a camera, zoom it out from the model a bit, and add it to the scene.
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
    camera.position.z = 100;
    //scene.add(camera);
    
    // Create an event listener that resizes the renderer with the browser window.
    window.addEventListener('resize', function() {
      var WIDTH = window.innerWidth,
          HEIGHT = window.innerHeight;
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
    });
    
    // Set the background color of the scene.
    //renderer.setClearColor(0x333F47, 1);
 
    // Create a light, set its position, and add it to the scene.
    var ambient = new THREE.AmbientLight( 0x101030 );
    scene.add( ambient );

    var directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, 0, 1 ).normalize();
    scene.add( directionalLight );
    
    // Load in the mesh and add it to the scene.
    
    // model
    var loader = new THREE.OBJMTLLoader();
    loader.load( 'models/player/player.obj', 'models/player/player.mtl', function ( object ) {
            player.object = object;
            player.object.position.y = -40;
            scene.add( object );

    } );
    
    window.addEventListener( "keydown", KeyDown, true);
    window.addEventListener( "keyup", KeyUp, true);
    //To use enter the axis length
    //debugaxis(50);
    loop();
};

function loop(){
    
    requestAnimationFrame(loop);
    
    for (index = 0; index < bullets.length; index++) 
    {
        bullets[index].position.y += 0.2 * speed;
        if(bullets[index].position.y > 20){
            scene.remove(bullets[index]);
            bullets.splice(index, 1);
        }
    }
    
    // Render the scene.
    renderer.render(scene, camera);
    
};

function shoot(){
    var num = bullets.length;

    bullets[num] = new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 10), new THREE.MeshNormalMaterial());
    bullets[num].position.x = player.object.position.x;
    bullets[num].position.y = player.object.position.y + 7;
    scene.add(bullets[num]);
    
};

function KeyDown(e){
    switch(e.keyCode)
    {
        /*case 38: 
                player.object.position.y += 0.2;
                break;
        case 40: 
                player.object.position.y -= 0.2; 
                break;*/
        case 39:
                player.object.position.x += 0.1 * speed;
                
                if(player.object.rotation.y < 30*(Math.PI/180))
                {
                    player.object.rotation.y += 10*(Math.PI/180);
                }
                
                break;
        case 37: 
                player.object.position.x -= 0.1 * speed;
                if(player.object.rotation.y > -Math.abs(30*(Math.PI/180)))
                {
                    player.object.rotation.y -= 10*(Math.PI/180);
                }
                break;
                
        case 32:
                shoot();
                break;
        
        
    };
};

function KeyUp(e){
    switch(e.keyCode)
    {
        case 39:
        case 37: 
                player.object.rotation.y = 0;
                break;
        
        
    };
};

var debugaxis = function(axisLength){
    //Shorten the vertex function
    function v(x,y,z){ 
            return new THREE.Vertex(new THREE.Vector3(x,y,z)); 
    }
    
    //Create axis (point1, point2, colour)
    function createAxis(p1, p2, color){
            var line, lineGeometry = new THREE.Geometry(),
            lineMat = new THREE.LineBasicMaterial({color: color, lineWidth: 1});
            lineGeometry.vertices.push(p1, p2);
            line = new THREE.Line(lineGeometry, lineMat);
            scene.add(line);
    }
    
    createAxis(v(-axisLength, 0, 0), v(axisLength, 0, 0), 0xFF0000);
    createAxis(v(0, -axisLength, 0), v(0, axisLength, 0), 0x00FF00);
    createAxis(v(0, 0, -axisLength), v(0, 0, axisLength), 0x0000FF);
};
