import Info from '../../components/Info';
import { useInfo } from '../../customHooks/useInfo';
import rating from '../../img/rating.jpg'
import tripadvisor from '../../img/tripadvisor.png'

const Home = () => {
  const {isInfoOpen, setIsInfoOpen, handleInfo} = useInfo()

  return (
    <div className="flex-1">
      <div className="grid gap-6 xs:gap-8 md:gap-6 lg:gap-8 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
        <div className="bg-white rounded-lg shadow-2xl max-w-full max-h-full mx-auto w-full h-full p-4">
          <div className="p-4 text-center">
            <h1 className="font-bold md:text-lg">Leigh on Sea</h1>
            <p className="pt-1 text-sm md:text-base">SS9 4RY</p>
            <p className="pt-1 text-sm md:text-base">Tue - Sun | 17:00 - 21:00</p>
            <button className='font-bold pt-1 hover:text-gray-700' onClick={handleInfo}>Click here for More Info</button>
            <h1 className='mt-4 text-lg'>Tel:</h1>
            <p className="text-lg md:text-2xl mb-4">+44 1702 523245</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-2xl max-w-full max-h-full mx-auto w-full h-full flex items-center justify-center p-4">
          <img className='p-4' alt="Food Hygiene Rating: 5/5 (Very Good)" src={rating}>
          </img>
        </div>
        <div className="bg-white rounded-lg shadow-2xl max-w-full max-h-full mx-auto w-full h-full p-4 flex flex-col">
          <img className='p-4' alt="Food Hygiene Rating: 5/5 (Very Good)" src={tripadvisor}>
          </img>
          <div className='flex flex-col md:flex-row justify-center items-center'>
            <div className='flex mb-2 md:mb-0 items-center'>
              <div className='bg-green-600 w-4 h-4 sm:w-5 sm:h-5 rounded-full mr-[0.1rem]'></div>
              <div className='bg-green-600 w-4 h-4 sm:w-5 sm:h-5 rounded-full mr-[0.1rem]'></div>
              <div className='bg-green-600 w-4 h-4 sm:w-5 sm:h-5 rounded-full mr-[0.1rem]'></div>
              <div className='bg-green-600 w-4 h-4 sm:w-5 sm:h-5 rounded-full mr-[0.1rem]'></div>
              <div className='bg-white border-2 border-green-600 w-4 h-4 sm:w-5 sm:h-5 rounded-full'></div>
            </div>
            <div className='font-semibold ml-2'>18 Reviews</div>
          </div>
          <p className='ml-2 mb-2 text-sm mt-4 md:text-base text-center'>#12 of 19 Quick Bites in Leigh-on Sea</p>
          <a className='font-bold mt-4 text-base md:text-lg bg-emerald-300 rounded-full hover:bg-emerald-400 shadow-md text-center' 
            href='https://www.tripadvisor.co.uk/Restaurant_Review-g1138967-d5815554-Reviews-Ho_s_Kitchen-Leigh_on_Sea_Southend_on_Sea_Essex_England.html#REVIEWS' target='_blank'>
            See reviews here
          </a>
        </div>
        <div className="bg-white rounded-lg shadow-2xl max-w-full max-h-full mx-auto w-full h-full p-4 flex">
          <div className="p-4 text-center">
            <h1 className="font-bold text-lg">Order faster next time</h1>
            <p className="pt-2 text-sm sm:text-base">Your favourite baskets can be loaded to re-order what your favourite combinations.</p>
            <p className="pt-2 text-sm sm:text-base"> Just click <b>save</b> during checkout.</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-2xl max-w-full max-h-full mx-auto w-full h-full p-4">
          <div className="p-4 text-center">
            <h1 className="font-bold text-lg">Recent Orders</h1>
            <p className="pt-2 text-sm sm:text-base">There is no order to be shown here.</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-2xl max-w-full max-h-full mx-auto w-full h-full p-4">
          <div className="p-4 text-center">
            <h1 className="font-bold text-lg">Select from your saved dishes</h1>
            <p className="pt-2 text-sm sm:text-base">Your saved dishes can be added to your basket to make it easier to order what you like.</p>
          </div>
        </div>
      </div>
      <div>
      {isInfoOpen && 
        <div className='hidden lg:flex max-w-2xl h-fit z-[999] top-40 absolute shadow-2xl'>
          <Info setIsInfoOpen={setIsInfoOpen}/>
        </div>
        }
      </div>
    </div>
  );
}
 
export default Home;