import useMap from "@/hooks/useMap";

export default function RecommendMapPage() {
  const ref = useMap();
  return (
    <div>
      <div ref={ref} className="w-[500px] h-[500px] border-2 m-auto"></div>
    </div>
  );
}
