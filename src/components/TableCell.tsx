import styled from "styled-components";
import { ScheduledLectureFormat } from "../utils/format";

interface Props {
  scheduledLectures?: ScheduledLectureFormat[];
  hourIndex: number;
  dayIndex: number;
}

interface TableCellProps {
  howLong: number;
  startPoint: number;
}

export default function TableCell({
  scheduledLectures,
  hourIndex,
  dayIndex,
}: Props) {
  const calculateStartPoint = (lecture: ScheduledLectureFormat) => {
    const startMinutes = lecture.startMinutes;
    const startPoint = startMinutes === 0 ? 0 : 50;

    return startPoint;
  };

  const calculateHowLong = (lecture: ScheduledLectureFormat) => {
    const endMinutes = lecture.endMinutes;
    const endHour = lecture.endHour;
    const startMinutes = lecture.startMinutes;
    const startHour = lecture.startHour;

    const howLong =
      endMinutes - startMinutes === 0
        ? endHour - startHour
        : endMinutes - startMinutes > 0
        ? endHour - startHour + 0.5
        : endHour - startHour - 0.5;

    return howLong;
  };

  return (
    <>
      {scheduledLectures?.map((lecture) => {
        return lecture.startHour === hourIndex + 6 &&
          lecture.weekDayID === dayIndex + 1 ? (
          <TableCellStyled
            howLong={calculateHowLong(lecture)}
            startPoint={calculateStartPoint(lecture)}
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
  height: ${(props) => 50 * props.howLong}px;
  top: ${(props) => props.startPoint}%;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
