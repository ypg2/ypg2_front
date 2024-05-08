import styled from "styled-components";
import {
  ScheduledLectureFormat,
  calculateHowLong,
  calculateStartPoint,
} from "../utils/format";
import { useContext } from "react";
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
  const { handleDragStart } = useContext(DragAndDropContext);

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
            onDragStart={handleDragStart({
              howLong: calculateHowLong(lecture),
              lectureID: lecture.lectureID,
              weekDayID: 0,
              startAt: 0,
            })}
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
`;
