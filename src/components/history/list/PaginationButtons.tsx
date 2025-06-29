import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Pages {
  currentPage: number;
  totalPage: number;
}

interface PaginationHandler {
  next: () => void;
  prev: () => void;
}

export default function PaginationButtons({
  pages,
  paginationHandler,
}: {
  pages: Pages;
  paginationHandler: PaginationHandler;
}) {
  // 최소 1보장
  const currentPage = Math.max(pages.currentPage, 1);
  const totalPage = Math.max(pages.totalPage, 1);
  return (
    <div className="flex items-center justify-center mt-3 gap-x-5 md:justify-end">
      <Button
        aria-label="navigate previous page"
        className="w-1/3 md:w-1/7"
        disabled={pages.currentPage <= 1}
        onClick={paginationHandler.prev}
      >
        <ChevronLeft className="size-6" />
      </Button>
      <span>
        {currentPage} / {totalPage}
      </span>
      <Button
        aria-label="navigate next page"
        disabled={pages.currentPage === pages.totalPage}
        className="w-1/3 md:w-1/7"
        onClick={paginationHandler.next}
      >
        <ChevronRight className="size-6" />
      </Button>
    </div>
  );
}
