import { createPortal } from "react-dom";

function LoadingSpinner() {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-99">
      <div className="w-24 h-24 border-8 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>,
    document.getElementById("root")! // portal target
  );
}

export default LoadingSpinner;
