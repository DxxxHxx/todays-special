import useSearchParamsOption from "@/hooks/bookmark/useSearchParamsOption";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OPTIONS = [
  { id: 1, value: "all", text: "전체" },
  { id: 2, value: "bookmarked", text: "즐겨찾기" },
];

export default function StatusFilter() {
  const { handleOptionChange, option } = useSearchParamsOption();
  return (
    <div className="ml-auto w-[180px] mb-10">
      <Select onValueChange={handleOptionChange} value={option}>
        <SelectTrigger aria-label="select" className="w-full">
          <SelectValue placeholder="-- 전체 or 즐겨찾기 --" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>-- 전체 or 즐겨찾기 --</SelectLabel>
            {OPTIONS.map((option) => (
              <SelectItem key={option.id} value={option.value}>
                {option.text}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
