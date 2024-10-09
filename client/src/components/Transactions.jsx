import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Transactions({ month }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set to 10 to ensure at least 10 rows per page

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://roxiler-assignment-backend.vercel.app/api/transactions`, {
        params: { month, search }
      });
      setData(data.transactions); // Store fetched transactions in state
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert('Error loading data');
      setLoading(false); // Ensure loading state is reset
    }
  };

  useEffect(() => {
    getData(); // Fetch data when month or search changes
  }, [month, search]);

  // Calculate the current items to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage; // Index of the last item on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Index of the first item on the current page
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem); // Get current items based on pagination

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Handle Next and Previous page logic
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <input 
        type="text" 
        placeholder="Search" 
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1); // Reset to first page on search
        }} 
        className="search-input"
      />
      <table className="transactions-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {loading ? <tr><td colSpan="7">Loading...</td></tr> : currentItems.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{parseFloat(transaction.price).toFixed(2)}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              <td><img src={transaction.image} alt="Product Image" style={{ width: '80px' }} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={handlePrevious} disabled={currentPage === 1} className="page-btn">Previous</button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button 
            key={index + 1} 
            onClick={() => paginate(index + 1)} 
            className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNext} disabled={currentPage === totalPages} className="page-btn">Next</button>
      </div>
    </>
  );
}

export default Transactions;
