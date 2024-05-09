import styled from "styled-components";
import { FaRegTrashCan } from "react-icons/fa6";
import { DragAndDropContext } from "../context/DragAndDrop";
import { useContext, useEffect } from "react";

import { useQueryClient } from "react-query";
import { fetchDeleteScheduled } from "../api/scheduled.api";

interface Props {
  children: React.ReactNode;
}
export default function TableContainer({ children }: Props) {
  const { handleDropDelete, handleDragOver, dropDataDelete } =
    useContext(DragAndDropContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    const deleteSchedule = async () => {
      await fetchDeleteScheduled(dropDataDelete.lectureID);
      queryClient.invalidateQueries("schedules");
      alert("삭제되었습니다.");
    };
    if (dropDataDelete.lectureID) {
      deleteSchedule();
    }
  }, [dropDataDelete]);

  return (
    <StyledTableContainer>
      <div className="header">
        <h2>내 시간표</h2>
        <h2 onDrop={handleDropDelete} onDragOver={handleDragOver}>
          <FaRegTrashCan />
        </h2>
      </div>

      <table>{children}</table>
    </StyledTableContainer>
  );
}
const StyledTableContainer = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
  }
`;
