import { useEffect, useRef } from "react";

const useFixedScroll = <T>(...deps: T[]) => {
  const anchoringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!anchoringRef.current) return;

    anchoringRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [deps]);

  return anchoringRef;
};
export default useFixedScroll;
