$(document).ready(function() {
  initialize();
   
});

//canvas
function getPosition(mouseEvent, sigCanvas) {
    var rect = sigCanvas.getBoundingClientRect();
    return {
      X: mouseEvent.clientX - rect.left,
      Y: mouseEvent.clientY - rect.top
    };
}
function initialize() {
  
  var sigCanvas = document.getElementById("mycanvas");
  var context = sigCanvas.getContext("2d");
  var color = document.querySelector('input[type="color"]')
  context.strokeStyle = color.value;
  context.lineJoin = "round";
  context.lineWidth = 10;

 

  
  var is_touch_device = 'ontouchstart' in document.documentElement;

  if (is_touch_device) {
    
    var drawer = {
      isDrawing: false,
      touchstart: function(coors) {
        context.beginPath();
        context.moveTo(coors.x, coors.y);
        this.isDrawing = true;
      },
      touchmove: function(coors) {
        if (this.isDrawing) {
          context.lineTo(coors.x, coors.y);
          context.stroke();
        }
      },
      touchend: function(coors) {
        if (this.isDrawing) {
          this.touchmove(coors);
          this.isDrawing = false;
        }
      }
    };

    
    function draw(event) {

     
      var coors = {
        x: event.targetTouches[0].pageX,
        y: event.targetTouches[0].pageY
      };

     
      var obj = sigCanvas;

      if (obj.offsetParent) {
        
        do {
          coors.x -= obj.offsetLeft;
          coors.y -= obj.offsetTop;
        }
       
        while ((obj = obj.offsetParent) != null);
      }

      
      drawer[event.type](coors);
    }

    
    sigCanvas.addEventListener('touchstart', draw, false);
    sigCanvas.addEventListener('touchmove', draw, false);
    sigCanvas.addEventListener('touchend', draw, false);

    sigCanvas.addEventListener('touchmove', function(event) {
      event.preventDefault();
    }, false);
  } else {

    
    $("#mycanvas").mousedown(function(mouseEvent) {
      var position = getPosition(mouseEvent, sigCanvas);
      context.moveTo(position.X, position.Y);
      context.beginPath();

      
      $(this).mousemove(function(mouseEvent) {
        drawLine(mouseEvent, sigCanvas, context);
      }).mouseup(function(mouseEvent) {
        finishDrawing(mouseEvent, sigCanvas, context);
      }).mouseout(function(mouseEvent) {
        finishDrawing(mouseEvent, sigCanvas, context);
      });
    });

  }
}


function drawLine(mouseEvent, sigCanvas, context) {

  var position = getPosition(mouseEvent, sigCanvas);

  context.lineTo(position.X, position.Y);
  context.stroke();
}


function finishDrawing(mouseEvent, sigCanvas, context) {
  
  drawLine(mouseEvent, sigCanvas, context);

  context.closePath();

  
  $(sigCanvas).unbind("mousemove")
    .unbind("mouseup")
    .unbind("mouseout");
}


window.onload = function() {
    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("darkside");
    ctx.drawImage(img, 120, 120);
}
   

                               

function ShowColor(){
    
  document.getElementById("Colorbtn1").focus();
  document.getElementById("Colorbtn1").click();
  var color = document.getElementById("Colorbtn1").value;
  return color;
    
}

function ChangeColor(){
    
    var inputcolour = document.getElementById("Colorbtn1").value;
    document.getElementById("mycanvas").style.backgroundColor = inputcolour;
}
function ShowColor1(){
    
  document.getElementById("Colorbtn2").focus();
  document.getElementById("Colorbtn2").click();
  var color = document.getElementById("Colorbtn2").value;
  return color;
    
}
var button = document.getElementById('btn-download');
button.addEventListener('click', function (e) {
    var dataURL = canvas.toDataURL('image/png');
    button.href = dataURL;
});

