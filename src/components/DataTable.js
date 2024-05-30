import { InboxOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const Datatable = ({ source, columns }) => {
  const [pagination, setPagination] = useState({
    activePage: 1,
    pageSize: Math.ceil(source.length / 10) || 1,
    itemsPerPage: 10,
  });

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageSize: Math.ceil(source.length / prevState.itemsPerPage) || 1,
    }));
  }, [source]);

  const setPage = (page) => {
    setPagination((prevState) => ({
      ...prevState,
      activePage: page,
    }));
  };

  const handleChangeItemsPerPage = (e) => {
    const itemsPerPage = parseInt(e.target.value);
    setPagination({
      activePage: 1,
      pageSize: Math.ceil(source.length / itemsPerPage) || 1,
      itemsPerPage,
    });
  };

  const goToPreviousPage = () => {
    if (pagination.activePage > 1) {
      setPage(pagination.activePage - 1);
    }
  };

  const goToNextPage = () => {
    if (pagination.activePage < pagination.pageSize) {
      setPage(pagination.activePage + 1);
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-1000">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
            <tr>
              {columns.map((column, index) => (
                <th scope="col" className="px-6 py-3" key={index}>
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {source.length === 0 ? (
              <tr className="bg-white border-b hover:bg-gray-50">
                <td
                  className="bg-white border-b hover:bg-gray-50 p-4"
                  colSpan={columns.length}
                >
                  <span className="flex gap-2 items-center w-full justify-center text-xl">
                    <InboxOutlined />
                    no data
                  </span>
                </td>
              </tr>
            ) : (
              source
                .slice(
                  pagination.itemsPerPage * (pagination.activePage - 1),
                  pagination.itemsPerPage * pagination.activePage
                )
                .map((row, index) => (
                  <tr
                    className="bg-white border-b border-b-gray-100 hover:bg-gray-50"
                    key={index}
                  >
                    {columns.map((column, cellIndex) => (
                      <td scope="col" className="px-6 py-4" key={cellIndex}>
                        {row[column.dataIndex]?.render
                          ? row[column.dataIndex].render(row)
                          : row[column.dataIndex] || column.render(row)}
                      </td>
                    ))}
                  </tr>
                ))
            )}
          </tbody>
        </table>
        <br />
      </div>
      <div className="md:flex items-center gap-2 md:justify-end mt-2">
        <div className="flex">
          <button
            onClick={goToPreviousPage}
            className={`border rounded-md px-2 p-1 inline-block mr-2 ${
              pagination.activePage === 1 ? "disabled opacity-40" : ""
            }`}
            disabled={pagination.activePage === 1}
          >
            Previous
          </button>
          <div className="md:w-auto w-95 overflow-x-auto flex">
            {Array.from({ length: pagination.pageSize }).map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`border rounded-md px-3 p-1 inline-block mr-2 ${
                  pagination.activePage === index + 1
                    ? "active  text-white bg-blue-500"
                    : ""
                }`}
                disabled={index + 1 === pagination.activePage}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={goToNextPage}
            className={`border rounded-md px-2 p-1 inline-block ${
              pagination.activePage === pagination.pageSize
                ? "disabled opacity-40"
                : ""
            }`}
            disabled={pagination.activePage === pagination.pageSize}
          >
            Next
          </button>
        </div>

        <div className="mt-2 md:mt-0">
          <label className="mr-2 m">Show per page:</label>
          <select
            className="p-2 border rounded-md"
            value={pagination.itemsPerPage}
            onChange={handleChangeItemsPerPage}
          >
            {[5, 10, 20, 50].map((perPage, index) => (
              <option key={index} value={perPage}>
                {perPage}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Datatable;
