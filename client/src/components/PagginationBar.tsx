import { MouseEventHandler } from "react";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function PaginationBar({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationBarProps) {
  const pages = getVisiblePages(currentPage, totalPages);
  return (
    <nav
      className="pagination flex justify-center"
      role="navigation"
      aria-label="pagination"
    >
      <button
        className="pagination-previous px-4 py-2 mr-2 border rounded-md bg-white text-gray-500 hover:bg-gray-100"
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &#x25C0;
      </button>
      <button
        className="pagination-next px-4 py-2 ml-2 border rounded-md bg-white text-gray-500 hover:bg-gray-100"
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &#x25B6;
      </button>
      <ul className="pagination-list flex items-center">
        {pages.map((page) => (
          <li key={page}>
            <PageButton
              page={page}
              currentPage={currentPage}
              onClick={() => onPageChange(page as number)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface PageButtonProps {
  page: number | string;
  currentPage: number;
  onClick: MouseEventHandler;
}

function PageButton({ page, currentPage, onClick }: PageButtonProps) {
  if (page === currentPage) {
    return (
      <button
        className="pagination-link px-4 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600"
        aria-label={`Page ${page}`}
        aria-current="page"
      >
        {page}
      </button>
    );
  }
  if (page === "<" || page === ">") {
    return <span className="pagination-ellipsis">&hellip;</span>;
  }
  return (
    <button
      className="pagination-link px-4 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-100"
      aria-label={`Go to page ${page}`}
      onClick={onClick}
    >
      {page}
    </button>
  );
}

function getVisiblePages(current: number, total: number) {
  if (total <= 7) {
    return range(total);
  }
  if (current < 5) {
    return [...range(5), ">", total];
  }
  if (current > total - 4) {
    return [1, "<", ...range(5, total - 4)];
  }
  return [1, "<", current - 1, current, current + 1, ">", total];
}

function range(count: number, start = 1) {
  return Array.from(new Array(count), (_, i) => i + start);
}

export default PaginationBar;
