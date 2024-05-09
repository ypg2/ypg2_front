import React, { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
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

interface State {
  handleDragStart: (
    data: UpdateProps
  ) => (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (
    event: React.DragEvent<HTMLTableCellElement>
  ) => void | ((event: React.DragEvent<HTMLHeadElement>) => void);
  handleDrop: (
    startAt: number,
    dayIndex: number
  ) => (
    event: React.DragEvent<HTMLTableCellElement>
  ) => void | ((event: React.DragEvent<HTMLHeadingElement>) => void);
  handleDropDelete: (event: React.DragEvent<HTMLTableCellElement>) => void;
  isOpen: boolean;
  onClose: () => void;
  dropData: UpdateProps;
  dropDataDelete: DeleteProps;
  isDraging: boolean;
}

export const state = {
  handleDragStart: () => () => {},
  handleDragOver: () => {},
  handleDrop: () => () => {},
  handleDropDelete: () => {},
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
  isDraging: false,
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
  const [dropData, setDropData] = useState<UpdateProps>(drops);
  const [dropDataDelete, setDropDataDelete] =
    useState<DeleteProps>(dropsDelete);
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };
  const [isDraging, setIsDraging] = useState(false);

  const handleDragStart =
    (data: UpdateProps) => (event: React.DragEvent<HTMLDivElement>) => {
      event.dataTransfer?.setData("text/plain", JSON.stringify(data));
    };

  const handleDragOver = (
    event:
      | React.DragEvent<HTMLTableCellElement>
      | React.DragEvent<HTMLHeadElement>
  ) => {
    event.preventDefault(); // 드롭 가능 영역으로 설정
    setIsDraging(true);
  };

  const handleDrop =
    (startAt: number, dayIndex: number) =>
    (event: React.DragEvent<HTMLTableCellElement>) => {
      onOpen();
      event.stopPropagation();
      const getDropData = JSON.parse(event.dataTransfer.getData("text/plain"));
      getDropData.startAt = startAt;
      getDropData.weekDayID = dayIndex;
      setDropData(getDropData);
      setIsDraging(false);
    };

  const handleDropDelete = (event: React.DragEvent<HTMLHeadElement>) => {
    event.preventDefault();
    const getDropData = JSON.parse(event.dataTransfer.getData("text/plain"));
    setDropDataDelete(getDropData);
  };

  return (
    <DragAndDropContext.Provider
      value={{
        handleDragStart,
        handleDragOver,
        handleDrop,
        handleDropDelete,
        isOpen,
        onClose,
        dropData,
        dropDataDelete,
        isDraging,
      }}
    >
      {children}
    </DragAndDropContext.Provider>
  );
};
