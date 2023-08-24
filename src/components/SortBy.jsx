import { Dropdown, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { setSortBy } from '../redux/reducres/FilterSlice'

const SortBy = () => {

    const dispatch = useDispatch()
    const searchAttributes = useSelector((state) => state.filter.searchAttributes)
    const [items, setItems] = useState([]);



    const convertItems = () => {
        if(searchAttributes?.sort_by){
            let options = [];
            Object.keys(searchAttributes?.sort_by).forEach(function(key, index) {
                let opt = {
                    "key": index + 1,
                    "label": key,
                    "onClick": function(){
                        dispatch(setSortBy(searchAttributes?.sort_by[key]))
                    },
                }
                options.push(opt);
            });
            setItems(options)
        }
    }

    useEffect(() => {
        convertItems()
    }, [searchAttributes])

    return (
        <Dropdown
            menu={{
                items,
            }}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space className='border-2 border-gray-500 p-2 rounded-md cursor-pointer'>
                    Sort By
                    <FaCaretDown/>
                </Space>
            </a>
        </Dropdown>
    )
}

export default SortBy