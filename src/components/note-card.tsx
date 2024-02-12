const NoteCard = () => {
  return (
    <button className="outline-none focus-visible:ring-2 focus-visible:ring-lime-400 relative text-left rounded-md bg-slate-800 overflow-hidden p-5 space-y-6 hover:ring-2 hover:ring-slate-600">
      <span className="text-sm font-medium text-slate-300">2 days ago</span>
      <p className="text-sm leading-6 text-slate-400">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta possimus
        voluptate totam! Nobis, molestias cum officiis esse saepe mollitia eum
        tempora ratione tempore necessitatibus, possimus deserunt, ex temporibus
        provident aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Dicta possimus voluptate totam! Nobis, molestias cum officiis esse
        saepe mollitia eum tempora ratione tempore necessitatibus, possimus
        deserunt, ex temporibus provident aliquam.
      </p>
      <div className="absolute left-0 bottom-0 h-1/2 right-0 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"></div>
    </button>
  );
};

export default NoteCard;
