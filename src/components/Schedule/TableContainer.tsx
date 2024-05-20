import styled from "styled-components";
import { FaRegTrashCan } from "react-icons/fa6";

import { useContext, useEffect } from "react";

import { useQueryClient } from "react-query";
import { DragAndDropContext } from "../../context/DragAndDrop";
import { fetchDeleteScheduled } from "../../api/scheduled.api";
import { theme } from "../../style/theme";
import { SCHEDULE_CACHE_KEY } from "../../constants/cachekey";
import { SCHEDULE_DELETE_ERROR } from "../../constants/alertmention";

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
      queryClient.invalidateQueries(SCHEDULE_CACHE_KEY);
      alert(SCHEDULE_DELETE_ERROR.REMOVE);
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

    h2 {
      color: ${theme.color.primary};
    }
  }
`;
