import BlogListDrawer from "@/components/map/BlogDrawer";
import useMap from "@/hooks/useMap";
import { motion } from "framer-motion";

export default function RecommendMapPage() {
  const { ref, blogs, handleBlogListPagination, pageInfoObj, menu } = useMap();

  return (
    <div className="absolute top-0 left-0 w-full h-screen -z-10 flex items-end">
      <div className="h-10/12 w-full  text-center">
        <div>
          <h1 className="text-xs">
            * 가장 최근 추천 받은 메뉴를 기반해 인기순 5곳이 표시됩니다. *
          </h1>
          <span>현재 추천 메뉴 : {menu}</span>
        </div>
        <div className="relative h-[calc(100%-48px)]">
          <motion.div
            ref={ref}
            className="w-full rounded-2xl h-full  border-2 mx-auto"
          ></motion.div>
          <BlogListDrawer
            BlogList={blogs}
            handleBlogListPagination={handleBlogListPagination}
            pageInfoObj={pageInfoObj}
          />
        </div>
      </div>
    </div>
  );
}
