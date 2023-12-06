import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SummuryCard from '../components/SummuryCard';

const Dashboard = () => {

    const [summuryCard, setSummuryCard] = useState([]);

    const getSummuryCards = async () => {

        try {
            const res = await axios.get('reseller/dashboard/summary');
            setSummuryCard(res.data.data)
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSummuryCards()
    }, [])

  return (
    <div>
        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 p-5">
            {
                summuryCard.map((card, index) => {
                    return <SummuryCard card={card} key={index}/>
                })
            }
        </section>
    </div>
  )
}

export default Dashboard