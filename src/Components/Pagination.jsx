import React from "react";

const Pagination = ({ links, handlePageChange }) => {
  return (
    <nav className="flex justify-center mt-4">
      <ul className="inline-flex items-center">
        {links.map((link, index) => (
          <li key={index}>
            <button
              onClick={() => handlePageChange(link.url)}
              disabled={!link.url || link.active}
              className={`${
                link.active
                  ? "bg-[#2481ce] text-white"
                  : "bg-gray-200 text-gray-700"
              } px-3 py-1 mx-1 rounded`}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
