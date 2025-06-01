import BlogListDrawer from "@/components/map/BlogDrawer";
import useMap from "@/hooks/useMap";

export default function RecommendMapPage() {
  // const { ref, blogs, handleBlogListPagination, pageInfoObj, menu } = useMap();

  const { ref, menu, blogList } = useMap();

  console.log("rerender");

  return (
    <div className="absolute top-0 left-0 flex items-end w-full h-screen -z-10">
      <div className="flex flex-col w-full text-center h-10/12">
        <div>
          <h1 className="text-xs">
            * 가장 최근 추천 받은 메뉴를 기반해 인기순 5곳이 표시됩니다. *
          </h1>
          <span>현재 추천 메뉴 : {menu ?? "없음"}</span>
        </div>
        <div className="relative grow">
          <div
            ref={ref}
            className="w-full h-full mx-auto border-2 rounded-2xl"
          ></div>
          <BlogListDrawer
            BlogList={blogList}
            // handleBlogListPagination={handleBlogListPagination}
            // pageInfoObj={pageInfoObj}
          />
        </div>
      </div>
    </div>
  );
}
