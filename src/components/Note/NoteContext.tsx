import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { IMainState, INote } from '../../interface';
import useNoteDB from '../../hooks/useNoteDB';

const defaultContextValue = {
  notes: [],
};

export const NoteContext = React.createContext<{
  notes: INote[] | undefined;
}>(defaultContextValue);

const NoteContextContainer = ({ children }: { children: any }) => {
  const client = useSelector((state: IMainState) => state.client);
  const { notes } = useNoteDB(client.id);
  React.useEffect(() => {}, []);
  return (
    <NoteContext.Provider
      value={{
        notes,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContextContainer;
