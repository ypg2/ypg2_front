import { useContext } from "react";
import { ScheduledLectureFormat, formatStartEnd } from "../utils/format";
import TableCell from "./TableCell";
import { DragAndDropContext } from "../context/DragAndDrop";
import { fetchUpdateScheduled } from "../api/scheduled.api";
import { useQueryClient } from "react-query";
import ScheduleModal from "./ScheduleModal";

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
  const { handleDragOver, handleDrop, isOpen, onClose, dropData } =
    useContext(DragAndDropContext);
  const queryClient = useQueryClient();

  const handleClick = async (event: any) => {
    const minute = event.target.value;
    try {
      const [startAt, endAt] = formatStartEnd(dropData, minute);
      const data = {
        startAt: startAt,
        endAt: endAt,
        weekDayID: dropData.weekDayID,
        lectureID: dropData.lectureID,
      };
      console.log(data);
      await fetchUpdateScheduled(data);
      queryClient.invalidateQueries("schedules");
      onClose();
    } catch (error: any) {
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
                key={dayIndex}
                onDragOver={handleDragOver}
                onDrop={handleDrop(hourIndex + 6, dayIndex + 1)}
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
