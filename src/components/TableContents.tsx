import { ScheduledLectureFormat } from "../utils/format";
import TableCell from "./TableCell";

interface Props {
  schedule: string[][];
  scheduledLectures?: ScheduledLectureFormat[];
}

export default function TableContents({ schedule, scheduledLectures }: Props) {
  return (
    <tbody>
      {Array.from({ length: 18 }).map((_, hourIndex) => (
        <tr key={hourIndex}>
          <td>{`${hourIndex + 6}:00`}</td>
          {schedule[hourIndex].map((lecture, dayIndex) => (
            <td key={dayIndex}>
              <TableCell
                scheduledLectures={scheduledLectures}
                hourIndex={hourIndex}
                dayIndex={dayIndex}
              />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
