import { usePageIndexStore } from "@/store/history/usePageIndexStore";
import { HistoryType } from "@/types/type/history";
import { useSearchParams } from "react-router-dom";

const useSearchParamsOption = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const option = (searchParams.get("status") as HistoryType) ?? "all";
  const resetPageIndex = usePageIndexStore((s) => s.resetPage);

  const handleOptionChange = (option: HistoryType) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("status", option);
    setSearchParams(newSearchParams);
    resetPageIndex();
  };

  return { option, handleOptionChange };
};
export default useSearchParamsOption;
