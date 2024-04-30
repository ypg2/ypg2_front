import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/querystring";
import Button from "../common/Button";
import { useEffect, useState } from "react";
import { formatSlicePagination } from "../../utils/format";
import styled from "styled-components";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";

interface IPagination {
  totalSize: number;
}

export default function LecturesPagination({ totalSize }: IPagination) {
  const [sliceStart, setSliceStart] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [limit, setLimit] = useState<string | null>("4");
  const [currentPage, setCurrentPage] = useState(1);
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

  useEffect(() => {
    if (searchParams.get(QUERYSTRING.PAGE)) {
      setCurrentPage(Number(searchParams.get(QUERYSTRING.PAGE)));
    } else {
      setCurrentPage(1);
    }
  }, [searchParams.get(QUERYSTRING.PAGE)]);

  return (
    <LecturesPaginationStyle>
      <Button scheme="normal" size="small" onClick={handleClickBack}>
        <GoTriangleLeft />
      </Button>
      {slicedPaginationArr.map((pagenation, _i) => (
        <Button
          key={_i}
          size="small"
          scheme={currentPage === pagenation ? "primary" : "normal"}
          onClick={() => handleClickPagenation(_i + sliceStart + 1)}
        >
          {pagenation}
        </Button>
      ))}
      <Button scheme="normal" size="small" onClick={handleClickFront}>
        <GoTriangleRight />
      </Button>
    </LecturesPaginationStyle>
  );
}

const LecturesPaginationStyle = styled.div`
  display: flex;
  gap: 5px;
`;
