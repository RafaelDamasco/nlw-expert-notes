import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner';

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void;
}

let speechRecognition: SpeechRecognition | null = null;

const NewNoteCard = ({ onNoteCreated }: NewNoteCardProps) => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [content, setContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleStartEditor = () => {
    setShouldShowOnboarding(false);
  };

  const handleContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (e.target.value === '') {
      setShouldShowOnboarding(true);
    }
  };

  const handleSaveNote = (e: FormEvent) => {
    e.preventDefault();

    if (content === '') return;
    onNoteCreated(content);
    setContent('');
    setShouldShowOnboarding(true);
    toast.success('Nota criada');
  };

  const handleStartRecording = () => {
    const isSpeechRecognitionAPIAvailable =
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

    if (!isSpeechRecognitionAPIAvailable) {
      alert(
        'Unfortunately your browser does not support the recording API, try use Chrome or Edge'
      );
      return;
    }
    setIsRecording(true);
    setShouldShowOnboarding(false);

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = 'en-US';

    speechRecognition.continuous = true;

    speechRecognition.maxAlternatives = 1;

    speechRecognition.interimResults = true;

    speechRecognition.onresult = (e) => {
      const transcription = Array.from(e.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, '');

      setContent(transcription);
    };
    speechRecognition.onerror = (e) => {
      console.log(e);
    };

    speechRecognition.start();
  };
  const handleStopRecording = () => {
    setIsRecording(false);

    if (speechRecognition !== null) {
      speechRecognition.stop();
    }
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md bg-slate-700 p-5 flex flex-col gap-3 text-left hover:ring-2 outline-none hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">Add note</span>
        <p className="text-sm leading-6 text-slate-400">
          Record an audio note that will be converted to text automatically
        </p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="overflow-hidden inset-0 md:inset-auto fixed md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:h-[60vh] md:-translate-y-1/2 md:max-w-[640px] w-full bg-slate-700 md:rounded-md flex flex-col">
          <Dialog.Close className="absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>
          <form className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Add note
              </span>
              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  start{' '}
                  <button
                    type="button"
                    onClick={handleStartRecording}
                    className="font-medium text-lime-400 hover:underline"
                  >
                    recording an audio note
                  </button>{' '}
                  or if you prefer,{' '}
                  <button
                    type="button"
                    className="font-medium text-lime-400 hover:underline"
                    onClick={handleStartEditor}
                  >
                    just use text.
                  </button>
                </p>
              ) : (
                <textarea
                  autoFocus
                  value={content}
                  onChange={handleContentChanged}
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                ></textarea>
              )}
            </div>
            {isRecording ? (
              <button
                type="button"
                onClick={handleStopRecording}
                className="bg-slate-900 flex items-center justify-center gap-2 w-full py-4 text-center font-medium text-sm text-slate-300 outline-none hover:text-slate-100"
              >
                <div className="rounded-full bg-red-500 size-3 animate-pulse" />
                Recording (click to stop)
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveNote}
                className="bg-lime-400 w-full py-4 text-center font-medium text-sm text-lime-950 outline-none hover:bg-lime-500"
              >
                Save note
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NewNoteCard;
