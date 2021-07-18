import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeLoginStatus, LogginStatus } from "../redux/action";
import { signOut } from "../database/authenticate";
import { IMainState } from "../interface";
import NoteHeader from "../components/Note/NoteHeader";
import "../styles/Note/note.global.css";
import NoteContextContainer from "../components/Note/NoteContext";
import NoteBody from "../components/Note/NoteBody";

function Note() {
  return (
    <div className="notes-page">
      <div className="container-fluid">
        <NoteContextContainer>
          <NoteHeader />
          <NoteBody />
        </NoteContextContainer>
      </div>
    </div>
  );
}

export default Note;
