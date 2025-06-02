import HistoryList from "@/components/common/history/HistoryList";
import StatusFilter from "@/components/common/history/StatusFilter";

export default function HistoryPage() {
  return (
    <div className="m-auto max-w-2/3">
      <StatusFilter />
      <HistoryList />
    </div>
  );
}
