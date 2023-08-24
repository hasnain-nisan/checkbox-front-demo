import { Slider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setPriceRange } from '../redux/reducres/FilterSlice';

const PriceRange = () => {

    const dispatch = useDispatch()
    const price_range = useSelector((state) => state.filter.searchAttributes?.price_range)

    const setMaxMinValue = (value) => {
        dispatch(setPriceRange(value))
    }

    return (
        <div className='mt-5'>
            <div className='flex items-center justify-between cursor-pointer'>
                <h3 className="text-md font-bold mb-2">
                    Price range ({price_range?.currency_symbol})
                </h3>
            </div>
            <div 
                className={'block'}
            >
                <Slider max={price_range?.max_price} min={price_range?.min_price} range onChange={(value) => setMaxMinValue(value)} />
            </div>
        </div>
    )
}

export default PriceRange