import { useContext } from "react";

import { useQueryClient } from "react-query";
import ScheduleModal from "./ScheduleModal";
import { DragAndDropContext } from "../../context/DragAndDrop";
import { ScheduledLectureFormat, formatStartEnd } from "../../utils/format";
import { fetchUpdateScheduled } from "../../api/scheduled.api";
import TableCell from "./TableCell";

interface Props {
  schedule: string[][];
  scheduledLectures?: ScheduledLectureFormat[];
}

export interface UpdateProps {
  startAt: string;
  endAt: string;
  weekDayID: number;
  lectureID: number;
}

export default function TableContents({ schedule, scheduledLectures }: Props) {
  const {
    handleDragOver,
    handleDrop,
    isOpen,
    onClose,
    dropData,
    dragingPoint,
  } = useContext(DragAndDropContext);
  const [dragingDayIndex, dragingHourIndex] = dragingPoint;
  const queryClient = useQueryClient();
  const handleClick = async (event: any) => {
    try {
      const minute = event.target.value;
      const [startAt, endAt] = formatStartEnd(dropData, minute);
      const data = {
        startAt: startAt,
        endAt: endAt,
        weekDayID: dropData.weekDayID,
        lectureID: dropData.lectureID,
      };
      await fetchUpdateScheduled(data);
      queryClient.invalidateQueries("schedules");
      onClose();
    } catch (error) {
      alert(error);
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <ScheduleModal
          isOpen={isOpen}
          onClose={onClose}
          isSchedule={false}
          handleClick={handleClick}
        />
      )}

      <tbody>
        {Array.from({ length: 18 }).map((_, hourIndex) => (
          <tr key={hourIndex}>
            <td>{`${hourIndex + 6}:00`}</td>
            {schedule[hourIndex].map((lecture, dayIndex) => (
              <td
                key={`${dayIndex},${hourIndex}`}
                onDragOver={handleDragOver}
                onDrop={handleDrop(hourIndex + 6, dayIndex + 1)}
                title={`${dayIndex},${hourIndex}`}
                className={
                  dayIndex === dragingDayIndex && hourIndex === dragingHourIndex
                    ? "draging"
                    : "hold"
                }
              >
                <TableCell
                  scheduledLectures={
                    scheduledLectures === undefined ? [] : scheduledLectures
                  }
                  hourIndex={hourIndex}
                  dayIndex={dayIndex}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </>
  );
}
