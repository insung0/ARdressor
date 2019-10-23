const video = document.getElementById('video')
var clothes = new Image()
clothes.src = 'bustier.png'
srcX = 10
srcY = 10
srcW = 400
srcH = 330
dstW = 0
dstH = 0
dstX = 360
dstY = 280
magnifierX = 200
magnifierY = 200

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('models'),
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: true },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

function btn_suit_click(){
  srcX = 50
  srcY = 70
  srcW = 350
  srcH = 500
  magnifierX = 130
  magnifierY = 160
  clothes.src = 'suit.png'
}

function btn_bustier_click(){
  srcX = 10
  srcY = 10
  srcW = 400
  srcH = 330
  magnifierX = 200
  magnifierY = 200
  clothes.src = 'bustier.png'
}

function btn_blue_suit_click(){
  srcX = 30
  srcY = 30
  srcW = 280
  srcH = 400
  magnifierX = 110
  magnifierY = 150
  clothes.src = 'blue_suit.png'
}


video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    const box = resizedDetections.box
    
    resize(box)
    canvas.getContext('2d').drawImage(clothes, srcX, srcY, srcW, srcH, dstX, dstY, dstW , dstH)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    
  }, 100)
})

function resize(box){
  dstX = lerp(dstX, box.x + box.width/2 - dstW/2, 0.3)
  dstY = lerp(dstY, box.y + box.height, 0.3)
  dstW = lerp(dstW, srcW*(box.width/magnifierX), 0.3)
  dstH = lerp(dstH, srcH *(box.height/magnifierY), 0.3)
}

function lerp (start, end, amt){
  return (1-amt)*start+amt*end
}