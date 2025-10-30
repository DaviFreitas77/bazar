interface PaginationSearchProps {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
}
export function PaginationSearch({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
}: PaginationSearchProps) {
  return (
    <div className="w-full flex justify-center mt-6">
      <div className="flex gap-4 items-center">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Anterior
        </button>
        <span className="text-sm">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
