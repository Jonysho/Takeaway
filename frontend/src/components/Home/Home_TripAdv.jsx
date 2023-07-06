import tripadvisor from '../../img/tripadvisor.png'

const Home_TripAdv = ({rating}) => {
    const green = []
    for (let i = 0; i < rating; i ++) {
        green.push(i);
    }
    const white = []
    for (let i = 0; i < 5 - rating; i ++) {
        white.push(i);
    }

    return ( 
        <>
            <div className='mx-6'>
                <img className='p-4' alt="Food Hygiene Rating: 5/5 (Very Good)" src={tripadvisor}/>
            </div>
            <div className='flex flex-col md:flex-row justify-center items-center'>
                <div className='flex mb-2 md:mb-0 items-center'>
                {green.map(x => (
                    <div key={x} className='bg-green-600 w-4 h-4 sm:w-5 sm:h-5 rounded-full mr-[0.1rem]'></div>
                ))}
                {white.map(y => (
                    <div key={y} className='bg-white border-2 border-green-600 w-4 h-4 sm:w-5 sm:h-5 rounded-full'></div>
                ))}
                </div>
                <div className='font-semibold ml-2'>18 Reviews</div>
            </div>
            <p className='ml-2 mb-2 text-sm mt-4 md:text-base text-center'>#12 of 19 Quick Bites in Leigh-on Sea</p>
            <a className='font-bold mt-4 mx-2 text-base md:text-lg bg-emerald-300 rounded-full hover:bg-emerald-400 shadow-md text-center' 
                href='https://www.tripadvisor.co.uk/Restaurant_Review-g1138967-d5815554-Reviews-Ho_s_Kitchen-Leigh_on_Sea_Southend_on_Sea_Essex_England.html#REVIEWS' 
                target='_blank'
            > See reviews here </a>
        </>        
    );
}
 
export default Home_TripAdv;