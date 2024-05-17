import React, { ReactNode } from "react";
import { Schedule } from "./MyTimeTable";
import { days } from "../utils/timeTable";

export default function TableHeader() {
  return (
    <thead>
      <tr>
        <th>시간</th>
        {days.map((day, index) => (
          <th key={index}>{day}</th>
        ))}
      </tr>
    </thead>
  );
}
