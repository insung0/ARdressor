const video = document.getElementById('video')
var clothes = new Image()
clothes.src = 'bustier.png'


Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: true },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
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
    
    canvas.getContext('2d').drawImage(clothes, box.x + box.width/2 - clothes.width/2, box.y + box.height)
  }, 100)
})
