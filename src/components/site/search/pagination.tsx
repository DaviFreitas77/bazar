import { RiArrowRightDoubleFill } from "react-icons/ri";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

interface PaginationSearchProps {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
}
export function Pagination({ currentPage, totalPages, nextPage, prevPage }: PaginationSearchProps) {
  return (
    <div className="w-full flex justify-center mt-6">
      <div className="flex gap-4 items-center">
        <button onClick={prevPage} disabled={currentPage === 1} className={`px-3 py-1 rounded-md border border-gray-200 transition cursor-pointer ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}>
          <MdKeyboardDoubleArrowLeft color="black" />
        </button>
        <span className="text-sm">
          Página {currentPage} de {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages} className={`px-3 py-1 rounded-md border border-gray-200 transition cursor-pointer ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}>
          <RiArrowRightDoubleFill />
        </button>
      </div>
    </div>
  );
}
