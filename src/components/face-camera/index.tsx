/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef, useState } from 'react';
import { FaceMesh } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';
import { Button } from '../ui/button';
import { Camera as CameraIcon, RefreshCcw } from 'lucide-react';

interface SmartFaceCameraProps {
  onPhotoTaken?: (dataUrl: string) => void;
}

const SmartFaceCamera = ({ onPhotoTaken }: SmartFaceCameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const [feedback, setFeedback] = useState(
    'Centralize o rosto dentro do círculo'
  );
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current!;
    const overlayElement = overlayRef.current!;
    const overlayCtx = overlayElement.getContext('2d')!;

    const faceMesh = new FaceMesh({
      locateFile: file =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6,
    });

    faceMesh.onResults((results: any) => {
      if (!overlayElement || !overlayCtx) return;

      overlayCtx.save();
      overlayCtx.clearRect(0, 0, overlayElement.width, overlayElement.height);

      const radius = overlayElement.width * 0.35;
      overlayCtx.beginPath();
      overlayCtx.arc(
        overlayElement.width / 2,
        overlayElement.height / 2,
        radius,
        0,
        2 * Math.PI
      );
      overlayCtx.lineWidth = 4;
      overlayCtx.strokeStyle = 'rgba(255,255,255,0.5)';
      overlayCtx.stroke();

      // Face detection + feedback
      if (results.multiFaceLandmarks?.length > 0) {
        const face = results.multiFaceLandmarks[0];
        const xVals = face.map((p: any) => p.x);
        const yVals = face.map((p: any) => p.y);
        const minX = Math.min(...xVals);
        const maxX = Math.max(...xVals);
        const minY = Math.min(...yVals);
        const maxY = Math.max(...yVals);

        const faceCenterX = (minX + maxX) / 2;
        const faceCenterY = (minY + maxY) / 2;
        const faceSize = Math.max(maxX - minX, maxY - minY);

        const sizeMin = 0.25;
        const sizeMax = 0.45;

        let msg = 'Perfeito! Mantenha essa posição 👍';
        if (faceCenterX < 0.4) msg = 'Mova o rosto um pouco para a direita 👉';
        else if (faceCenterX > 0.6)
          msg = 'Mova o rosto um pouco para a esquerda 👈';
        else if (faceCenterY < 0.35) msg = 'Abaixe um pouco o rosto 👇';
        else if (faceCenterY > 0.65) msg = 'Levante um pouco o rosto ☝️';
        else if (faceSize < sizeMin) msg = 'Aproxime-se da câmera 🔍';
        else if (faceSize > sizeMax) msg = 'Afaste-se um pouco 📏';

        setFeedback(msg);
      } else {
        setFeedback(
          'Rosto não detectado — centralize o rosto dentro do círculo 👤'
        );
      }

      overlayCtx.restore();
    });

    const resizeCanvas = () => {
      overlayElement.width = videoElement.videoWidth;
      overlayElement.height = videoElement.videoHeight;
    };

    const cam = new Camera(videoElement, {
      onFrame: async () => {
        await faceMesh.send({ image: videoElement });
      },
      width: 720,
      height: 720,
    });

    videoElement.onloadedmetadata = resizeCanvas;
    cam.start();

    return () => {
      cam.stop();
    };
  }, []);

  const takePhoto = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const offCanvas = document.createElement('canvas');
    offCanvas.width = video.videoWidth;
    offCanvas.height = video.videoHeight;
    const ctx = offCanvas.getContext('2d')!;
    ctx.drawImage(video, 0, 0, offCanvas.width, offCanvas.height);

    const data = offCanvas.toDataURL('image/jpeg');
    setPhoto(data);
  };

  return (
    <div className="flex flex-col p2 bg-gree-400 justify-center w-full max-w-md mx-auto ">
      <div className="flex border-lime-500 justify-center items-center w-full h-[8vh]">
        <p className="text-sm  text-center text-muted-foreground">
          Encaixe seu rosto no círculo abaixo e clique em “Tirar foto”:
        </p>
      </div>
      <div className="flex relative h-[75vh] w-full bg-blue-600 aspect-square bg-black overflow-hidden">
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full object-cover ${photo ? 'hidden' : ''}`}
          autoPlay
          playsInline
          muted
        />

        <canvas
          ref={overlayRef}
          className={`absolute inset-0 w-full h-full ${photo ? 'hidden' : ''}`}
          width={720}
          height={720}
        />

        {photo && (
          <img
            src={photo}
            alt="Captured"
            className="absolute inset-0 object-cover w-full h-full"
          />
        )}

        <div className="absolute bottom-4 left-0 right-0 flex justify-center z-50">
          {!photo ? (
            <Button onClick={takePhoto} className="w-56">
              <CameraIcon className="w-4 h-4 mr-2" /> Tirar Foto
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={() => setPhoto(null)}
              className="w-56"
            >
              <RefreshCcw className="w-4 h-4 mr-2" /> Tirar Outra
            </Button>
          )}
        </div>
      </div>
      <div className="flex bg-fuchsia-500 justify-center items-center w-full h-[8vh]">
        {!photo && (
          <p className="text-sm text-center text-muted-foreground">
            {feedback}
          </p>
        )}

        {photo && onPhotoTaken && (
          <Button onClick={() => onPhotoTaken(photo)} className="w-56">
            Usar esta
          </Button>
        )}
      </div>
    </div>
  );
};

export default SmartFaceCamera;
