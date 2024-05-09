import { useEffect, useState } from "react";
import { Category } from "../models/category.model";
import { fetchCategory } from "../api/category.api";

export default function useCategory() {
  const [categoryNameArr, setCategoryNameArr] = useState<string[]>(["전체"]);

  useEffect(() => {
    fetchCategory().then((categories) => {
      const categoryTitles = categories.map(
        (category: Category) => category.categoryTitle
      );
      setCategoryNameArr(["전체", ...categoryTitles]);
    });
  }, []);

  return { categoryNameArr };
}
