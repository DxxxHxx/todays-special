import HistoryList from "@/components/history/list/HistoryList";
import StatusFilter from "@/components/history/StatusFilter";

export default function HistoryPage() {
  return (
    <div className="w-full m-auto md:max-w-2/3">
      <StatusFilter />
      <HistoryList />
    </div>
  );
}
