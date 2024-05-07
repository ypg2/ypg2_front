import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  handleDragStart: any;
  handleDragOver: any;
  handleDrop: any;
  handleDragLeave: any;
  handleDropDelete: any;
  isOpen: boolean;
  onClose: () => void;
  dropData: UpdateProps;
  dropDataDelete: DeleteProps;
}
export interface UpdateProps {
  howLong: number;
  lectureID: number;
  weekDayID: number;
  startAt: number;
}
export interface DeleteProps {
  howLong: number;
  lectureID: number;
}

export const state = {
  handleDragStart: () => () => {},
  handleDragOver: () => {},
  handleDrop: () => () => {},
  handleDropDelete: () => {},
  handleDragLeave: () => {},
  isOpen: false,
  onClose: () => {},
  dropData: {
    howLong: 0,
    lectureID: 0,
    weekDayID: 0,
    startAt: 0,
  },
  dropDataDelete: {
    howLong: 0,
    lectureID: 0,
  },
};

const drops = {
  weekDayID: 0,
  howLong: 0,
  lectureID: 0,
  startAt: 0,
};
const dropsDelete = {
  howLong: 0,
  lectureID: 0,
};

export const DragAndDropContext = createContext<State>(state);

export const DragAndDropProvider = ({ children }: Props) => {
  const handleDragStart =
    (data: UpdateProps) => (event: React.DragEvent<HTMLLIElement>) => {
      event.dataTransfer?.setData("text/plain", JSON.stringify(data));
    };

  const handleDragOver = (event: any) => {
    event.preventDefault(); // 드롭 가능 영역으로 설정
  };

  const [dropData, setDropData] = useState<UpdateProps>(drops);
  const [dropDataDelete, setDropDataDelete] =
    useState<DeleteProps>(dropsDelete);
  const handleDrop = (startAt: number, dayIndex: number) => (event: any) => {
    event.preventDefault();
    onOpen();
    const getDropData = JSON.parse(event.dataTransfer.getData("text/plain"));
    getDropData.startAt = startAt;
    getDropData.weekDayID = dayIndex;
    setDropData(getDropData);
  };

  const handleDropDelete = (event: any) => {
    event.preventDefault();
    const getDropData = JSON.parse(event.dataTransfer.getData("text/plain"));
    setDropDataDelete(getDropData);
  };

  const handleDragLeave = (event: any) => {
    event.preventDefault();
  };

  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <DragAndDropContext.Provider
      value={{
        handleDragStart,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleDropDelete,
        isOpen,
        onClose,
        dropData,
        dropDataDelete,
      }}
    >
      {children}
    </DragAndDropContext.Provider>
  );
};
