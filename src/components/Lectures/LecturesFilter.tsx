import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/querystring";
import Button from "../common/Button";
import useCategory from "../../hooks/useCategory";

export default function LecturesFiliter() {
  const { categoryNameArr } = useCategory();

  const [searchParams, setSearchParams] = useSearchParams();
  // 여기서는 그냥 query만 변경되도록
  const handleClickCategory = (i: number) => {
    if (i === 0) {
      searchParams.delete(QUERYSTRING.CATEGORY_ID);
    } else {
      searchParams.set(QUERYSTRING.CATEGORY_ID, i.toString());
    }
    setSearchParams(searchParams);
  };

  return (
    <LecturesFiliterStyle>
      {categoryNameArr.map((categoryName, i) => (
        <Button
          key={i}
          size="small"
          scheme="normal"
          onClick={() => handleClickCategory(i)}
        >
          {categoryName}
        </Button>
      ))}
    </LecturesFiliterStyle>
  );
}

const LecturesFiliterStyle = styled.div`
  display: flex;
  gap: 10px;
`;
