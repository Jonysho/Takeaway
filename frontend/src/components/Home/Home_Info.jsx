import { useStatus } from "../../customHooks/useStatus";

const Home_Info = ({openModal}) => {
    const status = useStatus()
    return ( 
        <div className="p-4 text-center">
            <h1 className="font-bold md:text-lg">Status: {status}</h1>
            <p className="pt-1 text-sm md:text-base">Leigh on Sea (SS9 4RY)</p>
            <h1 className='mt-3 text-lg'>Tel:</h1>
            <p className="text-lg md:text-2xl mb-4">+44 1702 523245</p>
            <button className='font-bold pt-1 hover:underline' onClick={openModal}>MORE INFO</button>
        </div>
     );
}
 
export default Home_Info;