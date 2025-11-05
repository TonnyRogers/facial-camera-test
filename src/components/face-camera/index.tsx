/* eslint-disable @typescript-eslint/no-explicit-any */
//  import { useEffect, useRef, useState } from 'react';
//  import { FaceMesh } from '@mediapipe/face_mesh';
//  import { Camera } from '@mediapipe/camera_utils';
//  import { Button } from '../ui/button';
//  import { Camera as CameraIcon, RefreshCcw } from 'lucide-react';

//  interface SmartFaceCameraProps {
//    onPhotoTaken?: (dataUrl: string) => void;
//  }

//  const SmartFaceCamera = ({ onPhotoTaken }: SmartFaceCameraProps) => {
//    const videoRef = useRef<HTMLVideoElement>(null);
//    const overlayRef = useRef<HTMLCanvasElement>(null);
//    const [feedback, setFeedback] = useState(
//      'Centralize o rosto dentro do círculo'
//    );
//    const [photo, setPhoto] = useState<string | null>(null);

//    useEffect(() => {
//      const videoElement = videoRef.current!;
//      const overlayElement = overlayRef.current!;
//      const overlayCtx = overlayElement.getContext('2d')!;

//      const faceMesh = new FaceMesh({
//        locateFile: file =>
//          `https:cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
//      });

//      faceMesh.setOptions({
//        maxNumFaces: 1,
//        refineLandmarks: true,
//        minDetectionConfidence: 0.6,
//        minTrackingConfidence: 0.6,
//      });

//      faceMesh.onResults((results: any) => {
//        overlayCtx.save();
//        overlayCtx.clearRect(0, 0, overlayElement.width, overlayElement.height);

//        overlayCtx.beginPath();
//        const radius = overlayElement.width * 0.35;
//        overlayCtx.arc(
//          overlayElement.width / 2,
//          overlayElement.height / 2,
//          radius,
//          0,
//          2 * Math.PI
//        );
//        overlayCtx.lineWidth = 4;
//        overlayCtx.strokeStyle = 'rgba(255,255,255,0.5)';
//        overlayCtx.stroke();

//        if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
//          const face = results.multiFaceLandmarks[0];
//          const xVals = face.map((p: any) => p.x);
//          const yVals = face.map((p: any) => p.y);
//          const minX = Math.min(...xVals);
//          const maxX = Math.max(...xVals);
//          const minY = Math.min(...yVals);
//          const maxY = Math.max(...yVals);

//          const faceCenterX = (minX + maxX) / 2;
//          const faceCenterY = (minY + maxY) / 2;
//          const faceSize = Math.max(maxX - minX, maxY - minY);

//          const sizeMin = 0.25;
//          const sizeMax = 0.45;

//          if (faceCenterX < 0.4)
//            setFeedback('Mova o rosto um pouco para a direita');
//          else if (faceCenterX > 0.6)
//            setFeedback('Mova o rosto um pouco para a esquerda');
//          else if (faceCenterY < 0.35) setFeedback('Abaixe um pouco o rosto');
//          else if (faceCenterY > 0.65) setFeedback('Levante um pouco o rosto');
//          else if (faceSize < sizeMin)
//            setFeedback('Aproxime-se um pouco da câmera');
//          else if (faceSize > sizeMax)
//            setFeedback('Afaste-se um pouco da câmera');
//          else setFeedback('Perfeito! Mantenha essa posição 👍');
//        }

//        overlayCtx.restore();
//      });

//      const cam = new Camera(videoElement, {
//        onFrame: async () => {
//          await faceMesh.send({ image: videoElement });
//        },
//        width: 720,
//        height: 720,
//      });

//      cam.start();

//      return () => {
//        cam.stop();
//      };
//    }, []);

//    const takePhoto = () => {
//      if (!videoRef.current) return;

//      const video = videoRef.current;
//      const offCanvas = document.createElement('canvas');
//      offCanvas.width = video.videoWidth;
//      offCanvas.height = video.videoHeight;
//      const ctx = offCanvas.getContext('2d')!;
//      ctx.drawImage(video, 0, 0, offCanvas.width, offCanvas.height);

//      const data = offCanvas.toDataURL('image/jpeg');
//      setPhoto(data);
//    };

//    return (
//      <div className="flex flex-col items-center justify-center flex-1 w-full h-full max-w-md mx-auto space-y-4 ">
//        {!photo && (
//          <div className="flex justify-center mt-4 text-sm text-center text-muted-foreground">
//            <p className="w-[80%] text-left">
//              Encaixe seu rosto no círculo abaixo e clique em ”Tirar foto”:
//            </p>
//          </div>
//        )}
//        <div className="relative flex flex-1 w-full h-full overflow-hidden bg-black aspect-square">
//          <video
//            ref={videoRef}
//            className={`absolute inset-0 w-full h-full object-cover ${
//              photo ? 'hidden' : ''
//            }`}
//            autoPlay
//            playsInline
//            muted
//          />

//          <canvas
//            ref={overlayRef}
//            className={`absolute inset-0 w-full h-full ${photo ? 'hidden' : ''}`}
//            width={720}
//            height={720}
//          />

//          {photo && (
//            <img
//              src={photo}
//              alt="Captured"
//              className="absolute inset-0 object-cover w-full h-full"
//            />
//          )}

//          <div className="absolute z-50 flex items-center justify-center w-full gap-4 bottom-4">
//            {!photo ? (
//              <Button onClick={takePhoto} className="w-60">
//                <CameraIcon className="w-4 h-4 mr-2" /> Tirar Foto
//              </Button>
//            ) : (
//              <Button variant="secondary" onClick={() => setPhoto(null)}>
//                <RefreshCcw className="w-4 h-4 mr-2" /> Tirar Outra
//              </Button>
//            )}
//          </div>
//        </div>

//        {!photo && (
//          <p className="text-sm text-center text-muted-foreground">{feedback}</p>
//        )}

//        {photo && onPhotoTaken && (
//          <Button onClick={() => onPhotoTaken(photo)} className="w-60">
//            Usar esta
//          </Button>
//        )}
//      </div>
//    );
//  };

//  export default SmartFaceCamera;

import { useRef, useState, useEffect } from 'react';
import { FaceMesh, FACEMESH_TESSELATION } from '@mediapipe/face_mesh';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Button } from '@/components/ui/button';

declare global {
  interface Window {
    FaceMesh: typeof FaceMesh;
  }
}

export default function FacialCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [faceMesh, setFaceMesh] = useState<FaceMesh | null>(null);
  const [loading, setLoading] = useState(false);
  const [alignmentMsg, setAlignmentMsg] = useState(
    'Posicione o rosto no centro'
  );

  // Initialize FaceMesh
  useEffect(() => {
    const mesh = new FaceMesh({
      locateFile: file =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    mesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    setFaceMesh(mesh);
  }, []);

  // Start camera (for iOS, must be triggered by user)
  const startCamera = async () => {
    setLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });

      const videoElement = videoRef.current!;
      videoElement.srcObject = stream;
      await videoElement.play();

      const mesh = faceMesh!;
      mesh.onResults(onResults);

      const processFrame = async () => {
        if (!videoElement.paused && !videoElement.ended) {
          await mesh.send({ image: videoElement });
          requestAnimationFrame(processFrame);
        }
      };

      processFrame();
      setIsCameraActive(true);
    } catch (err) {
      console.error('Camera start error:', err);
      alert('Não foi possível acessar a câmera. Verifique as permissões.');
    } finally {
      setLoading(false);
    }
  };

  // Face detection + alignment feedback
  const onResults = (results: any) => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const video = videoRef.current!;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
      const landmarks = results.multiFaceLandmarks[0];
      drawConnectors(ctx, landmarks, FACEMESH_TESSELATION, {
        color: 'rgba(0,255,0,0.2)',
        lineWidth: 0.8,
      });
      drawLandmarks(ctx, landmarks, {
        color: '#00FF00',
        lineWidth: 0.5,
      });

      // Calculate alignment guidance
      const xs = landmarks.map((p: any) => p.x);
      const ys = landmarks.map((p: any) => p.y);
      const avgX = xs.reduce((a: number, b: number) => a + b) / xs.length;
      const avgY = ys.reduce((a: number, b: number) => a + b) / ys.length;

      // Face width (distance between temples)
      const faceWidth =
        Math.abs(landmarks[234].x - landmarks[454].x) * canvas.width;

      // Check alignment
      let msg = 'Perfeito! Mantenha-se assim 😊';
      if (avgX < 0.4) msg = 'Mova-se um pouco para a direita 👉';
      else if (avgX > 0.6) msg = 'Mova-se um pouco para a esquerda 👈';
      else if (avgY < 0.35) msg = 'Abaixe um pouco o rosto 👇';
      else if (avgY > 0.65) msg = 'Levante um pouco o rosto ☝️';
      else if (faceWidth < 120) msg = 'Aproxime-se da câmera 🔍';
      else if (faceWidth > 250) msg = 'Afaste-se um pouco 📏';

      setAlignmentMsg(msg);
    } else {
      setAlignmentMsg('Rosto não detectado — centralize seu rosto na tela 🧠');
    }

    ctx.restore();
  };

  // Capture photo (without mesh)
  const capturePhoto = () => {
    const video = videoRef.current!;
    const offCanvas = document.createElement('canvas');
    offCanvas.width = video.videoWidth;
    offCanvas.height = video.videoHeight;
    const ctx = offCanvas.getContext('2d')!;
    ctx.drawImage(video, 0, 0, offCanvas.width, offCanvas.height);
    const photoData = offCanvas.toDataURL('image/png');
    setCapturedPhoto(photoData);
  };

  const resetPhoto = () => setCapturedPhoto(null);

  // Responsive canvas adjustment
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && videoRef.current) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
      {!isCameraActive && !capturedPhoto && (
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Toque abaixo para permitir o uso da câmera frontal
          </p>
          <Button onClick={startCamera} disabled={loading}>
            {loading ? 'Iniciando câmera...' : 'Iniciar câmera'}
          </Button>
        </div>
      )}

      {isCameraActive && !capturedPhoto && (
        <div className="relative w-full max-w-sm aspect-square">
          <video
            ref={videoRef}
            className="absolute inset-0 object-cover w-full h-full rounded-lg"
            playsInline
            muted
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none rounded-lg"
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <Button onClick={capturePhoto}>Capturar Foto</Button>
          </div>
          <div className="absolute top-2 left-0 right-0 text-center">
            <p className="text-white text-sm bg-black/40 inline-block px-3 py-1 rounded-full">
              {alignmentMsg}
            </p>
          </div>
        </div>
      )}

      {capturedPhoto && (
        <div className="flex flex-col items-center space-y-4">
          <img
            src={capturedPhoto}
            alt="Foto capturada"
            className="object-cover w-80 h-80 rounded-lg shadow-lg"
          />
          <div className="flex gap-4">
            <Button variant="secondary" onClick={resetPhoto}>
              Tirar outra
            </Button>
            <Button onClick={() => alert('Foto confirmada!')}>Confirmar</Button>
          </div>
        </div>
      )}
    </div>
  );
}
