var canvas;
var gl;

function start() {
  canvas = document.getElementById("glcanvas");

  initWebGL(canvas);      // Initialize the GL context

  // Only continue if WebGL is available and working

  if (gl) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Set clear color to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);      // Near things obscure far things
  
    initShaders();
    initBuffers();

    setInterval(drawScene, 15)
  }
}

//
// initWebGL
//
// Initialize WebGL, returning the GL context or null if
// WebGL isn't available or could not be initialized.
//
function initWebGL() {
  gl = null;

  try {
    gl = canvas.getContext("experimental-webgl");
  }
  catch(e) {
  }

  // If we don't have a GL context, give up now

  if (!gl) {
    alert("Unable to initialize WebGL. Your browser may not support it.");
  }
}

function initShaders() {
	var fragmentShader = getShader(gl, "shader-fs");
	var vertexShader = getShader(gl, "shader-vs");

	console.log(fragmentShader, vertexShader)
	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
		console.log("unable tp initialize shaderProgram");
	}

	gl.useProgram(shaderProgram);

	vertextPositionAttribute = gl.getAttribLocation(shaderProgram,"aVertexPosition");
	gl.enableVertexAttribArray(vertextPositionAttribute);
}

function getShader(gl, id, type) {
	var shaderScript, theSource, currentChild, shader;

	shaderScript = document.getElementById(id);


	if(!shaderScript)
		return null;

	theSource = shaderScript.text;

	if(!type){
		if(shaderScript.type === "x-shader/x-fragment"){
			type = gl.FRAGMENT_SHADER;
		}
		else if (shaderScript.type === "x-shader/x-vertex"){
			type = gl.VERTEX_SHADER;
		}
		else{
			return null;
		}
}
	shader = gl.createShader(type);

	gl.shaderSource(shader, theSource);

	gl.compileShader(shader);
	console.log(shader)
	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
		console.log("Error compiling the shaders")
		gl.deleteShader(shader);
		return null;
}

	return shader;
}

var horizAspect = 480/640;

function initBuffers() {
	squareVerticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

	var vertices = [
	1.0, 1.0, 0.0,
	-1.0, 1.0, 0.0,
	1.0, -1.0, 0.0,
	-1.0, -1.0, 0.0
	];

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

}

function drawScene() {
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	perspectiveMatrix = makePerspective(45, 640.0/480.0, 0.1, 100.0);

	loadIdentity();
	mvTranslate([-0.0, 0.0, -6.0])

	gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer)

	gl.vertexAttribPointer(vertextPositionAttribute, 3, gl.FLOAT, false, 0, 0);
	setMatrixUniforms();
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

function loadIdentity() {
  mvMatrix = Matrix.I(4);
}

function multMatrix(m) {
  mvMatrix = mvMatrix.x(m);
}

function mvTranslate(v) {
  multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}

function setMatrixUniforms() {
  var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
  gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

  var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
  gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
}

window.onload = function() {
	start();
}
