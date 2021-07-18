import React from "react";
import { NoteContext } from "./NoteContext";

function NoteBody() {
  const { notes } = React.useContext(NoteContext);
  return (
    <div>
      {notes?.map((note) => {
        return <span>{note.title}</span>;
      })}
    </div>
  );
}

export default NoteBody;
