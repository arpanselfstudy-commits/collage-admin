interface TableProps<T extends Record<string, any>> {
  headers: string[]; // Display names for table headers
  rows: T[]; // Array of row objects, keys must match headers
}

function Table<T extends Record<string, any>>({ headers, rows }: TableProps<T>) {
  if (!rows.length) return <p>No data available.</p>;

  return (
    <div className="dash-table-outer-wrap mt-5">
      <table className="custom-table">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i}>{header.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td key={colIndex}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
