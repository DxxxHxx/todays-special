import { HistoryType } from "@/types/type/history";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useSearchParamsOption = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [option, setOption] = useState<HistoryType>(
    () => (searchParams.get("status") as HistoryType) ?? "all"
  );

  const handleOptionChange = (option: HistoryType) => setOption(option);
  useEffect(() => {
    setSearchParams({ status: option });
  }, [option, setSearchParams]);

  return { option, handleOptionChange };
};
export default useSearchParamsOption;
