import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { BlogListItem } from "@/types/interface/map/blogList";
import { ChevronLeft, ChevronRight, UtensilsCrossed, X } from "lucide-react";
import { Button } from "../ui/button";

export default function BlogListDrawer({
  BlogList,
  handleBlogListPagination,
  pageInfoObj,
}: {
  BlogList: BlogListItem[];
  handleBlogListPagination: {
    next: () => void;
    prev: () => void;
  };
  pageInfoObj: {
    maxPage: number;
    currentPage: number;
  };
}) {
  return (
    <Drawer>
      <DrawerTrigger className="absolute top-15 left-5">
        <Button>맛집 더 보기</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="relative">
          <DrawerTitle className="text-center text-2xl my-2">
            우리동네 맛집 관련 포스트
          </DrawerTitle>
          <DrawerClose className="ml-auto absolute right-5">
            <X className="cursor-pointer" />
          </DrawerClose>
        </DrawerHeader>
        <ul className="px-5 py-3 overflow-y-auto">
          {BlogList?.map((blog) => (
            <li
              className="my-3 border hover:bg-accent rounded-2xl"
              key={blog.link}
            >
              <a
                href={blog.link}
                target="_blank"
                className="flex justify-start p-4 items-center gap-x-3 "
              >
                <UtensilsCrossed />
                <h1 dangerouslySetInnerHTML={{ __html: blog.title }}></h1>
              </a>
            </li>
          ))}
        </ul>
        <DrawerFooter>
          <div className=" m-auto md:m-0 flex items-center gap-x-2">
            <Button
              className="hover:bg-muted-foreground bg-accent-foreground  "
              disabled={pageInfoObj.currentPage === 1}
              onClick={() => handleBlogListPagination.prev()}
            >
              <ChevronLeft className="size-7 " />
            </Button>
            <span>
              {pageInfoObj.currentPage} / {pageInfoObj.maxPage}
            </span>
            <Button
              className="hover:bg-muted-foreground bg-accent-foreground  "
              disabled={pageInfoObj.currentPage === pageInfoObj.maxPage}
              onClick={() => handleBlogListPagination.next()}
            >
              <ChevronRight className="size-7 " />
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
