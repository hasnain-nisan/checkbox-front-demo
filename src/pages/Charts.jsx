import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {faker} from '@faker-js/faker';
import axios from 'axios';
import { DatePicker, Select, Space } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
    const [data, setData] = useState(null);
    const [year, setYear] = useState(new Date().getFullYear());
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    const handleDateChange = (dates, dateStrings) => {
        setYear(dateStrings);
    };

    const getData = () => {
        axios.get('reseller/dashboard/charts', {
            params: {
                year
            }
        })
            .then(response => {
                // Handle the successful response
                console.log(response);
                setData(response.data.data);
            })
            .catch(error => {
                // Handle any errors
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        getData()
    }, [year])

    
    return (
        <div className="container mx-auto p-10">
            <Space className='flex justify-end'>
                <DatePicker onChange={(dates, dateStrings) => handleDateChange(dates, dateStrings)}
                    picker="year" 
                />
            </Space>

            {data ? (
                <Bar options={options} data={data} className="mt-5" />
            ) : (
                <div>Select year</div>
            )}
        </div>
    )
}

export default Charts