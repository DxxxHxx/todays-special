export default function ChatLoading() {
  return (
    <div className="flex items-start gap-2 justify-start">
      <span className="text-2xl">😋</span>
      <div className="flex items-center justify-center p-5 ">
        <div className="flex space-x-2 animate-pulse">
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
