import styled from "styled-components";
import {
  ScheduledLectureFormat,
  calculateHowLong,
  calculateStartPoint,
} from "../utils/format";
import React, { useContext } from "react";
import { DragAndDropContext } from "../context/DragAndDrop";
import { isCanPaintSchedule } from "../utils/scheduling";
import { randomColor } from "../style/theme";

export interface Props {
  scheduledLectures: ScheduledLectureFormat[];
  hourIndex: number;
  dayIndex: number;
}

interface TableCellProps {
  howlong: number;
  startpoint: number;
  backgroundColor: string;
}

export default function TableCell({
  scheduledLectures,
  hourIndex,
  dayIndex,
}: Props) {
  // dayIndex,hourIndex,dragingPoint를 통해 해결할 수 있을듯
  // dayIndex가 동일하고 hourIndex에서 howLong만큼 범위의 내에 있으면 해당 TableCellStyled는 안보이게함
  const { handleDragStart, dragingPoint } = useContext(DragAndDropContext);

  const handleDragStartWrapper = (lecture: ScheduledLectureFormat) => {
    return (event: React.DragEvent<HTMLDivElement>) => {
      handleDragStart({
        howLong: calculateHowLong(lecture),
        lectureID: lecture.lectureID,
        weekDayID: 0,
        startAt: 0,
      })(event);
    };
  };
  if (!scheduledLectures) {
    return null;
  }
  // 조건이 해당 isCanPaintSchedule

  return (
    <>
      {scheduledLectures.map((lecture, i) => {
        return (
          isCanPaintSchedule(lecture, dayIndex, hourIndex, dragingPoint) && (
            <TableCellStyled
              key={i}
              howlong={calculateHowLong(lecture)}
              startpoint={calculateStartPoint(lecture)}
              draggable={true}
              onDragStart={handleDragStartWrapper(lecture)}
              backgroundColor={randomColor()}
            >
              {lecture.title}
            </TableCellStyled>
          )
        );
      })}
    </>
  );
}

const TableCellStyled = styled.div<TableCellProps>`
  width: 100%;
  position: absolute;
  background-color: ${(props) => props.backgroundColor};
  height: ${(props) => 50 * props.howlong}px;
  top: ${(props) => props.startpoint}%;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
`;
