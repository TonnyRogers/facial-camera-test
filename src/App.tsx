import { Toaster } from 'sonner';
import './index.css';
import { TitlePage } from './components/title-page';
import { ResponsiveContainer } from './components/layouts';
import FaceCamera from './components/face-camera';
import { Button } from './components/ui/button';
import { useState } from 'react';

function App() {
  const [showCamera, setShowCamera] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  return (
    <main>
      <Toaster
        richColors
        closeButton
        position="bottom-center"
        duration={5000}
      />
      <>
        <div className="flex flex-col h-screen bg-background">
          <TitlePage bgVariant="white">
            <h3 className="text-lg font-semibold">
              Para sua segurança, vamos fazer uma verificação facial antes de
              continuar. Vamos lá?
            </h3>
          </TitlePage>
          <ResponsiveContainer maxWidth="desktop" padding="md">
            <div className="p-4 rounded-md bg-background-cream">
              <p>
                Confira o nome de quem fará o reconhecimento facial:{' '}
                <span className="font-semibold">Antoniel Amaral.</span>
              </p>
            </div>
            <p className="mt-14">Leia as orientações abaixo:</p>
            {/* <InstructionsCarousel items={items} /> */}

            {photo && (
              <img
                src={photo}
                alt="Captured"
                className="object-cover w-40 h-40"
              />
            )}

            <Button
              onClick={() => setShowCamera(true)}
              className="w-full mt-16 md:w-64"
            >
              Iniciar avaliação
            </Button>
          </ResponsiveContainer>
          <div
            className={`bg-red-500 fixed w-full h-full z-50 ${showCamera ? '' : 'hidden'}`}
          >
            <FaceCamera
              onPhotoTaken={url => {
                setPhoto(url);
                setShowCamera(false);
              }}
            />
          </div>
        </div>
      </>
    </main>
  );
}

export default App;
