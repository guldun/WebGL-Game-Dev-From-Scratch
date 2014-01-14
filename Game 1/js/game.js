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
            player.object.position.y = 0;
            scene.add( object );

    } );
    
    window.addEventListener( "keydown", KeyDown, true);
    
    loop();
};

function loop(){
    
    requestAnimationFrame(loop);
 
    // Render the scene.
    renderer.render(scene, camera);
    
};

function KeyDown(e){
    switch(e.keyCode)
    {
        case 38: 
                player.object.position.y += 0.5;
                break;
        case 40: 
                player.object.position.y -= 0.5; 
                break;
        case 39:
                player.object.position.x += 0.5;
                break;
        case 37: 
                player.object.position.x -= 0.5;
                break;
        
        
    };
};

