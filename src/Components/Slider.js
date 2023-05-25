import React, { useEffect, useState } from 'react';
import { data } from './data'
import { FaQuoteRight } from 'react-icons/fa';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';


const Slider = () => {
    const [customers, setCustomers] = useState(data);
    const [index, setIndex] = useState(0);

    // To set slider in other not to show empty or error if we are at the end of the array
    useEffect(() => {
        let lastIndex = customers.length - 1;
        if (index < 0) {
            setIndex(lastIndex)
        }
        if (index > lastIndex) {
            setIndex(0);
        }
    }, [index, customers]);

    // automatic rotate/slider
    useEffect(() => {
        let slider = setInterval(() => {
            setIndex(index - 1);
        }, 4000);
        return () => clearInterval(slider)
    }, [index]);

    return (
        <section className='section'>
            <div className='title'>
                <h2>
                    <span>/</span>Reviews
                </h2>
            </div>
            <div className='section-center'>
                {customers.map((customer, customerIndex) => {
                    const { id, image, name, title, quote } = customer;
                    // console.log(customer)
                    // nextSlide, activeSlide is from css
                    // To make slider show active slides & if slider is -1 sho last slide 
                    //without this the active slide wont display
                    let people = 'nextSlide';
                    if (customerIndex === index) {
                        people = 'activeSlide';
                    }
                    if (customerIndex === index - 1 ||
                        (index === 0 && customerIndex === customers.length - 1)) {
                        people = 'lastSlide'
                    }
                    return (
                        //the classname people was taken from line 22
                        <article key={id} className={people}>
                            <img src={image} alt={name} className='person-img' />
                            <h4>{name}</h4>
                            <p className='title'>{title}</p>
                            <p className='text'>{quote}</p>
                            <FaQuoteRight className='icon' />
                        </article >
                    );
                })}
                <button className='prev' onClick={() => setIndex(index - 1)}>
                    <FaAngleDoubleLeft />
                </button>
                <button className='next' onClick={() => setIndex(index - 1)}>
                    <FaAngleDoubleRight />
                </button>
            </div>
        </section>
    )
}

export default Slider
