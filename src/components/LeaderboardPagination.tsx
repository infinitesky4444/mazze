import React, { useState } from 'react';
import data from '../data/leaderboard.json';
import { LeaderboardItem } from './LeaderboardItem';

const itemsPerPage = 25;
const pageNeighbours = 2;

const LeaderboardPagination: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const visiblePages = totalPages > 5 ? 5 : totalPages;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getPaginationRange = (): number[] => {
    const maxLeft = Math.max(1, currentPage - pageNeighbours);
    const maxRight = Math.min(totalPages, currentPage + pageNeighbours);
    const range: number[] = [];

    for (let i = maxLeft; i <= maxRight; i++) {
      range.push(i);
    }

    return range;
  };

  const renderPagination = () => {
    return (
      <div className=''>
        <ul className='flex bg-transparent'>
          <li className='py-0 border-none me-auto'>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className='h-10 px-5 text-green-600 transition-colors duration-150 rounded-l-lg hover:bg-gray-700'
            >
              Previous
            </button>
          </li>

          {getPaginationRange().map((page) => (
            <li className='py-0 border-none'>
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                style={{ backgroundColor: currentPage === page ? 'rgba(255, 162, 0, 0.2)' : 'transparent' }}
                className='h-10 px-5 text-green-600 transition-colors duration-150'
              >
                {page}
              </button>
            </li>
          ))}

          <li className='py-0 border-none ms-auto'>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className='h-10 px-5 text-green-600 transition-colors duration-150 rounded-r-lg hover:bg-gray-700'
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div>
        {currentItems.map((item) => (
          <LeaderboardItem item={item} />
        ))}

      </div>
      {renderPagination()}
    </>
  );
};

export default LeaderboardPagination;