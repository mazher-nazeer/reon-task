import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ComposedChart } from 'recharts';
import { fetchData, selectChartData } from '../redux/dataSlice';
import { Link } from 'react-router-dom';

const ChartPage = ({ history }) => {
    const dispatch = useDispatch();
    const chartData = useSelector(selectChartData);
    const [axis, setAxis] = useState(1);
    const [color, setColor] = useState('red');
    const [chartType, setChartType] = useState('line');

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    const handleAxisChange = (value) => setAxis(value);
    const handleColorChange = (value) => setColor(value);
    const handleChartTypeChange = (value) => setChartType(value);

    const handleSeeTable = () => {
        history.push('/table');
    };

    return (
        <div>
            <h1>Chart Page</h1>

            <div>
                <select onChange={(e) => handleAxisChange(e.target.value)} value={axis}>
                    <option value={1}>Axis 1</option>
                    <option value={2}>Axis 2</option>
                    <option value={3}>Axis 3</option>
                    <option value={4}>Axis 4</option>
                </select>
                <select onChange={(e) => handleColorChange(e.target.value)} value={color}>
                    <option value="blue">Blue</option>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="brown">Brown</option>
                    <option value="purple">Purple</option>
                </select>
                <select onChange={(e) => handleChartTypeChange(e.target.value)} value={chartType}>
                    <option value="line">Line</option>
                    <option value="bar">Bar</option>
                </select>
            </div>
            {chartData && chartData.data && chartData.meta ? (
                <ComposedChart width={800} height={400} data={chartData.data}>
                    <XAxis dataKey="date" />
                    <YAxis yAxisId={axis} orientation="left" />
                    <YAxis yAxisId={axis} orientation="right" />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid stroke="#f5f5f5" />
                    {chartData.meta.map((meta) => {
                        const fieldData = meta.field;
                        if (meta.chartType === chartType) {
                            if (chartType === 'line') {
                                return <Line key={fieldData} type="monotone" dataKey={fieldData} stroke={color} yAxisId={axis} />;
                            } else if (chartType === 'bar') {
                                return <Bar key={fieldData} dataKey={fieldData} fill={color} yAxisId={axis} />;
                            }
                        }
                        return null;
                    })}
                </ComposedChart>
            ) : (
                <p>Loading...</p>
            )}
            <nav className='navigation'>
                <ul><li>
                    <Link to="/table" target='_blank' >View Table Page in a new window</Link>

                </li></ul>
            </nav>        </div>
    );
};

export default ChartPage;
