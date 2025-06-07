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

export default function StatusFilter() {
  const { handleOptionChange, option } = useSearchParamsOption();
  return (
    <div className="ml-auto w-[180px] mb-10">
      <Select onValueChange={handleOptionChange} value={option}>
        <SelectTrigger aria-label="select" className="w-full">
          <SelectValue placeholder="-- 전체 or 북마크 --" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>-- 전체 or 북마크 --</SelectLabel>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="bookmarked">북마크</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
