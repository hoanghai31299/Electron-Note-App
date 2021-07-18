import { doc } from 'prettier';
import React from 'react';
import { db } from '../database';
import { NOTE_COLLECTION } from '../database/users';
import { INote } from '../interface';

function useNoteDB(author: string) {
  const [notes, setNotes] = React.useState<INote[]>([]);
  React.useEffect(() => {
    console.log({ author });
    const unSubcribe = db
      .collection(NOTE_COLLECTION)
      .where('author', '==', author)
      // .orderBy('updatedAt', 'desc')
      .onSnapshot((snap) => {
        let documents: INote[] = [];
        if (snap.empty) console.log('empty');
        snap.forEach((note) => {
          const noteData: INote = note.data() as INote;
          documents.push({ ...noteData });
          console.log(note.data());
        });
        setNotes(documents);
      });
    return unSubcribe();
  }, [author]);
  return { notes };
}

export default useNoteDB;
