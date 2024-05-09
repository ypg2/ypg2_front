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
  dragingPoint: number[];
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
  dragingPoint: [],
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
  const [dragingPoint, setDragingPoint] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };
  const [isDraging, setIsDraging] = useState(false);
  const [] = useState();
  const handleDragStart =
    (data: UpdateProps) => (event: React.DragEvent<HTMLDivElement>) => {
      event.dataTransfer?.setData("text/plain", JSON.stringify(data));
    };

  const handleDragOver = (
    event:
      | React.DragEvent<HTMLTableCellElement>
      | React.DragEvent<HTMLHeadElement>
  ) => {
    event.preventDefault();
    const dragPoint = event.currentTarget.title
      .split(`,`)
      .map((item) => Number(item));
    setDragingPoint(dragPoint);
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
      setDragingPoint([-1, -1]);
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
        dragingPoint,
      }}
    >
      {children}
    </DragAndDropContext.Provider>
  );
};
