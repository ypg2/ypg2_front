import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import Button from "../common/Button";

export default function LecturesLimit() {
  const [searchParams, setSearchParams] = useSearchParams();
  const limitPointArr = ["4", "8", "12"];

  if (!searchParams.get("limit")) {
    searchParams.set("limit", "4");
    setSearchParams(searchParams);
  }

  const handleClickLimit = (limitPoint: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("limit", limitPoint);
    newSearchParams.set("page", "1");
    setSearchParams(newSearchParams);
  };

  return (
    <LecturesLimitStyle>
      {limitPointArr.map((limitPoint, i) => (
        <Button
          key={i}
          scheme={
            searchParams.get("limit") === String(limitPoint)
              ? "primary"
              : "normal"
          }
          size="small"
          onClick={() => handleClickLimit(limitPoint)}
        >
          {limitPoint}개씩
        </Button>
      ))}
    </LecturesLimitStyle>
  );
}

const LecturesLimitStyle = styled.div`
  display: flex;
  gap: 10px;
`;
