import { useSearchParams } from "react-router-dom";
import Button from "../common/Button";

export default function LecturesLimit() {
  // 여기서 이제 컨트롤하는거지
  const [searchParams, setSearchPrams] = useSearchParams();
  const limitPointArr = ["4", "8", "12"];
  searchParams.set("limit", "4");

  const handleClickLimit = (limitPoint: string) => {
    searchParams.set("limit", limitPoint);
    searchParams.set("page", "1");
    setSearchPrams(searchParams);
  };

  return (
    <div className="limit">
      {limitPointArr.map((limitPoint, i) => (
        <Button
          key={i}
          scheme="like"
          size="small"
          onClick={() => handleClickLimit(limitPoint)}
        >
          {limitPoint}개씩
        </Button>
      ))}
    </div>
  );
}
