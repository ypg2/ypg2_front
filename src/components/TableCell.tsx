import styled from "styled-components";
import {
  ScheduledLectureFormat,
  calculateHowLong,
  calculateStartPoint,
} from "../utils/format";
import React, { useContext, useState } from "react";
import { DragAndDropContext } from "../context/DragAndDrop";

interface Props {
  scheduledLectures: ScheduledLectureFormat[];
  hourIndex: number;
  dayIndex: number;
}

interface TableCellProps {
  howlong: number;
  startpoint: number;
}

export default function TableCell({
  scheduledLectures,
  hourIndex,
  dayIndex,
}: Props) {
  const { handleDragStart, isDraging } = useContext(DragAndDropContext);
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

  return (
    <>
      {scheduledLectures?.map((lecture, i) => {
        return lecture.startHour === hourIndex + 6 &&
          lecture.weekDayID === dayIndex + 1 ? (
          <TableCellStyled
            key={i}
            howlong={calculateHowLong(lecture)}
            startpoint={calculateStartPoint(lecture)}
            draggable={true}
            onDragStart={handleDragStartWrapper(lecture)}
          >
            {lecture.title}
          </TableCellStyled>
        ) : null;
      })}
    </>
  );
}

const TableCellStyled = styled.div<TableCellProps>`
  width: 100%;
  position: absolute;
  background-color: gainsboro;
  height: ${(props) => 50 * props.howlong}px;
  top: ${(props) => props.startpoint}%;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
`;
