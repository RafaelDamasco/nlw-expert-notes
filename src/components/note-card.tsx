import * as Dialog from '@radix-ui/react-dialog';
import { formatDistanceToNow } from 'date-fns';
import { X } from 'lucide-react';
interface NoteCardProps {
  note: { date: Date; content: string };
}

const NoteCard = ({ note }: NoteCardProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex flex-col gap-3 outline-none focus-visible:ring-2 focus-visible:ring-lime-400 relative text-left rounded-md bg-slate-800 overflow-hidden p-5 hover:ring-2 hover:ring-slate-600">
        <span className="text-sm font-medium text-slate-300">
          {formatDistanceToNow(note.date, { addSuffix: true })}
        </span>
        <p className="text-sm leading-6 text-slate-400">{note.content}</p>
        <div className="absolute left-0 bottom-0 h-1/2 right-0 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"></div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="overflow-hidden fixed left-1/2 top1/2 -translate-x-1/2 h-[60vh] -translate-y-1/2 max-w-[640px] w-full bg-slate-700 rounded-md flex flex-col">
          <Dialog.Close className="absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>
          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-300">
              {formatDistanceToNow(note.date, { addSuffix: true })}
            </span>
            <p className="text-sm leading-6 text-slate-400">{note.content}</p>
          </div>

          <button
            type="button"
            className="bg-slate-800 group w-full py-4 text-center font-medium text-sm text-slate-300 outline-none"
          >
            Would you like to{' '}
            <span className="text-red-400 group-hover:underline">
              delete this note
            </span>
            ?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NoteCard;
