import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/querystring";
import Button from "../common/Button";
import { useEffect, useState } from "react";
import { formatSlicePagination } from "../../utils/format";

interface IPagination {
  totalSize: number;
}

export default function LecturesPagination({ totalSize }: IPagination) {
  const [sliceStart, setSliceStart] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [limit, setLimit] = useState<string | null>("4");
  const queryStringLimit = searchParams.get(QUERYSTRING.LIMIT);

  const handleClickPagenation = (i: number) => {
    searchParams.set(QUERYSTRING.PAGE, i.toString());
    setSearchParams(searchParams);
  };
  const handleClickBack = () => {
    setSliceStart((current) => (current - 5 < 0 ? 0 : current - 5));
  };
  const handleClickFront = () => {
    setSliceStart((current) =>
      current + 5 >= paginationLength ? current : current + 5
    );
  };

  const paginationLength = Math.ceil(totalSize / Number(limit));
  const paginationArr = Array.from(
    { length: paginationLength },
    (_, i) => i + 1
  );

  const slicedPaginationArr = formatSlicePagination(sliceStart, paginationArr);

  useEffect(() => {
    const currentLimit = queryStringLimit === null ? "4" : queryStringLimit;
    setLimit(currentLimit);
    setSliceStart(0);
  }, [queryStringLimit]);

  return (
    <div className="pagenation">
      <Button scheme="normal" size="small" onClick={handleClickBack}>
        뒤
      </Button>
      {slicedPaginationArr.map((pagenation, _i) => (
        <Button
          key={_i}
          size="small"
          scheme="primary"
          onClick={() => handleClickPagenation(_i + sliceStart + 1)}
        >
          {pagenation}
        </Button>
      ))}
      <Button scheme="normal" size="small" onClick={handleClickFront}>
        앞
      </Button>
    </div>
  );
}
