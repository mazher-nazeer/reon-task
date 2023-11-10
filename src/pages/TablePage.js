import React, { useEffect } from 'react';
import { useTable } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, selectChartData } from '../redux/dataSlice';
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom';

const TablePage = () => {
    const dispatch = useDispatch();
    const chartData = useSelector(selectChartData);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    const columns = React.useMemo(
        () => [
            { Header: 'Name', accessor: 'name' },
            { Header: 'Date', accessor: 'date' },
            { Header: 'Avg', accessor: 'avg' },
            { Header: 'Total', accessor: 'total' },
        ],
        []
    );

    const data = React.useMemo(() => (chartData && chartData.data ? chartData.data : []), [chartData]);

    return (
        <div>
            <h1>Table Page</h1>
            <div className="right-aligned">
            <DownloadButton data={data} />

            </div>
            <div className="table-section">

                <Table columns={columns} data={data} />
            </div>
            
            <nav className='navigation'>
                <ul><li>
                    <Link to="/" target='_blank' >View Chart Page in a new window </Link>

                </li></ul>
            </nav>

        </div>
    );
};

const DownloadButton = ({ data }) => {
    const headers = [
        { label: 'Name', key: 'name' },
        { label: 'Date', key: 'date' },
        { label: 'Avg', key: 'avg' },
        { label: 'Total', key: 'total' },
    ];


    return (
        <CSVLink data={data} headers={headers} filename={'table_data.csv'}>
            Download Data
        </CSVLink>
        
    );
};

const Table = ({ columns, data }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
        <table {...getTableProps()} style={{ width: '96%', borderCollapse: 'collapse', margin: '2%' }}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()} style={{ borderBottom: '2px solid black', background: 'aliceblue' }}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} style={{ borderBottom: '1px solid black' }}>
                            {row.cells.map((cell) => (
                                <td {...cell.getCellProps()} style={{ padding: '10px', border: 'solid 1px gray', background: 'lightgray' }}>
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TablePage;
