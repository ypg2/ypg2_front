import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/querystring";
import Button from "../common/Button";

export default function LecturesFiliter() {
  const categoryNameArr = [
    "전체",
    "가",
    "나",
    "다",
    "라",
    "마",
    "바",
    "사",
    "아",
    "자",
  ];

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
    <div className="categoryNav">
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
    </div>
  );
}
