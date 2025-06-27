import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import supabase from "@/supabase/client";
import { RecommendHistory } from "@/types/interface/recommend";
import triggerToast from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const tableHeadList = [
  { id: 1, text: "메뉴 명" },
  { id: 2, text: "추가 일" },
  { id: 3, text: "즐겨찾기" },
  { id: 4, text: "주변 식당 찾기" },
];

export default function HistoryTable({
  menus,
  listTitle,
}: {
  menus: RecommendHistory[] | undefined;
  listTitle: string;
}) {
  return (
    <Table className="w-full h-[321px]">
      <TableCaption>{listTitle}</TableCaption>
      <TableHeader>
        <TableRow className="flex justify-between">
          {tableHeadList.map((item) => (
            <TableHead key={item.id} className="table-col">
              {item.text}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {menus?.length === 0 || menus === undefined ? (
          <h1 className="my-5 text-center">결과 없음</h1>
        ) : (
          <>
            {menus?.map((menu) => (
              <TableRow key={menu.id} className="flex justify-between">
                <TableCell className="table-col">{menu.menu_name}</TableCell>
                <TableCell className="table-col">
                  {new Date(menu.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="table-col">
                  <BookmarkBtn {...menu} />
                </TableCell>
                <TableCell className="table-col">
                  <SearchPlaceButton menu={menu.menu_name} />
                </TableCell>
              </TableRow>
            ))}
          </>
        )}
      </TableBody>
    </Table>
  );
}

const BookmarkBtn = ({
  id,
  is_bookmarked,
  menu_name,
}: Pick<RecommendHistory, "id" | "is_bookmarked" | "menu_name">) => {
  const [newBookmarkStatus, setNewBookmarkStatus] =
    useState<boolean>(is_bookmarked);

  const bookmark = useBookmarkMumation(id, is_bookmarked);
  return (
    <Button
      onClick={async () => {
        const res = await bookmark.mutateAsync();

        setNewBookmarkStatus(res);

        triggerToast(
          `${menu_name}이(가) 즐겨찾기${
            newBookmarkStatus ? "에서 삭제되었습니다." : "에 추가되었습니다."
          }`
        );
      }}
      variant={"outline"}
      className={`save-button`}
    >
      <Star
        className={`size-4 ${
          newBookmarkStatus ? "fill-yellow-400 stroke-0" : ""
        }`}
      />
      즐겨찾기
    </Button>
  );
};

const SearchPlaceButton = ({ menu }: { menu: string }) => {
  return (
    <Link to={`/map?menu=${menu.trim()}`}>
      <Button variant={"destructive"} className="text-xs">
        내 주변 찾아보기
      </Button>
    </Link>
  );
};

const useBookmarkMumation = (recommandId: string, isBookmarked: boolean) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await supabase
        .from("recommendations")
        .update({ is_bookmarked: !isBookmarked })
        .eq("id", recommandId)
        .order("created_at", { ascending: false })
        .select("*");

      return data?.[0]?.is_bookmarked;
    },
    onSuccess: (isBookmarked) => {
      ["my-menu-history", "hitory-max-page"].forEach((queryKey) =>
        queryClient.invalidateQueries({
          queryKey: [queryKey],
        })
      );

      return isBookmarked;
    },
    onError: () => {
      triggerToast("북마크 상태 변경에 실패했습니다.");
    },
  });
};
