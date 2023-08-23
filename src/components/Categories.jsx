import axios from 'axios';
import { useEffect, useState } from 'react'
import { Dropdown, Space } from 'antd';
import {FaCaretDown} from 'react-icons/fa'
import { setCategorySlug } from '../redux/reducres/FilterSlice';
import { useDispatch, useSelector } from 'react-redux';

const Categories = () => {
    const [items, setItems] = useState([]);
    const category_slug = useSelector(state => state.filter.category_slug)
    const dispatch = useDispatch()

    const convertItems = (array) => {
        let options = array.map((category, index) => {
            return {
                "key": index + 1,
                "label": category.name,
                "children": getChildren(category.childrenCategories, index + 1),
                "onTitleClick": function(){
                    console.log(category.slug);
                    dispatch(setCategorySlug(category.slug))
                },
            }
        })
        setItems(options);
    }

    const getChildren = (array, index) => {
        let options = array.map((arr, index1) => {
            return {
                "key": index + "-" + index1 + 1,
                "label": arr.name,
                "onClick": function(){
                    console.log(arr.slug);
                    dispatch(setCategorySlug(arr.slug))
                },
            }
        })
        return options;
    }

    const getCategories = async () => {
        try {
            const response = await axios.get('categories/all');
            convertItems(response.data.data)
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }

    useEffect(() => {
        getCategories()
        console.log(category_slug);
    }, [category_slug])


    return (
        <Dropdown
            menu={{
                items,
            }}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space className='border-2 border-gray-500 p-2 rounded-md'>
                    Categories
                    <FaCaretDown/>
                </Space>
            </a>
        </Dropdown>
    )
}

export default Categories