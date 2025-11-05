/* eslint-disable @typescript-eslint/no-explicit-any */
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
         `https:cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
     });

     faceMesh.setOptions({
       maxNumFaces: 1,
       refineLandmarks: true,
       minDetectionConfidence: 0.6,
       minTrackingConfidence: 0.6,
     });

     faceMesh.onResults((results: any) => {
       overlayCtx.save();
       overlayCtx.clearRect(0, 0, overlayElement.width, overlayElement.height);

       overlayCtx.beginPath();
       const radius = overlayElement.width * 0.35;
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

       if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
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

         if (faceCenterX < 0.4)
           setFeedback('Mova o rosto um pouco para a direita');
         else if (faceCenterX > 0.6)
           setFeedback('Mova o rosto um pouco para a esquerda');
         else if (faceCenterY < 0.35) setFeedback('Abaixe um pouco o rosto');
         else if (faceCenterY > 0.65) setFeedback('Levante um pouco o rosto');
         else if (faceSize < sizeMin)
           setFeedback('Aproxime-se um pouco da câmera');
         else if (faceSize > sizeMax)
           setFeedback('Afaste-se um pouco da câmera');
         else setFeedback('Perfeito! Mantenha essa posição 👍');
       }

       overlayCtx.restore();
     });

     const cam = new Camera(videoElement, {
       onFrame: async () => {
         await faceMesh.send({ image: videoElement });
       },
       width: 720,
       height: 720,
     });

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
     <div className="flex flex-col items-center justify-center flex-1 w-full h-full max-w-md mx-auto space-y-4 ">
       {!photo && (
         <div className="flex justify-center mt-4 text-sm text-center text-muted-foreground">
           <p className="w-[80%] text-left">
             Encaixe seu rosto no círculo abaixo e clique em ”Tirar foto”:
           </p>
         </div>
       )}
       <div className="relative flex flex-1 w-full h-full overflow-hidden bg-black aspect-square">
         <video
           ref={videoRef}
           className={`absolute inset-0 w-full h-full object-cover ${
             photo ? 'hidden' : ''
           }`}
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

         <div className="absolute z-50 flex items-center justify-center w-full gap-4 bottom-4">
           {!photo ? (
             <Button onClick={takePhoto} className="w-60">
               <CameraIcon className="w-4 h-4 mr-2" /> Tirar Foto
             </Button>
           ) : (
             <Button variant="secondary" onClick={() => setPhoto(null)}>
               <RefreshCcw className="w-4 h-4 mr-2" /> Tirar Outra
             </Button>
           )}
         </div>
       </div>

       {!photo && (
         <p className="text-sm text-center text-muted-foreground">{feedback}</p>
       )}

       {photo && onPhotoTaken && (
         <Button onClick={() => onPhotoTaken(photo)} className="w-60">
           Usar esta
         </Button>
       )}
     </div>
   );
 };

 export default SmartFaceCamera;
