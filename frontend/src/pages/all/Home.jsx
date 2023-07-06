import { useState } from 'react';
import Home_Dish from '../../components/Home/Home_Dish';
import Home_Fav from '../../components/Home/Home_Fav';
import Home_Hygiene from '../../components/Home/Home_Hygiene';
import Home_Info from '../../components/Home/Home_Info';
import Home_Recent from '../../components/Home/Home_Recent';
import Home_TripAdv from '../../components/Home/Home_TripAdv';
import InfoModal from '../../components/Modal/InfoModal';
import ModalBase from '../../components/Modal/ModalBase';


const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
      setModalOpen(false);
  };

  const items = [
    { component: <Home_Info openModal={openModal}/>, className: "max-w-full max-h-full mx-auto w-full h-full p-4" },
    { component: <Home_Hygiene />, className: "flex items-center justify-center p-4" },
    { component: <Home_TripAdv rating={4}/>, className: "flex flex-col p-4" },
    { component: <Home_Fav />, className: "flex p-4" },
    { component: <Home_Recent />, className: "p-4" },
    { component: <Home_Dish />, className: "p-4" }
  ];

  return (
    <div className="flex-1 w-full">
      <div className="grid gap-6 xs:gap-8 md:gap-6 lg:gap-8 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div key={index} className={`bg-white rounded-lg shadow-2xl ${item.className}`}>
              {item.component}
            </div>
          ))}
      </div>
      <ModalBase isOpen={isModalOpen} onClose={closeModal}>
        <InfoModal closeModal={closeModal}/>
      </ModalBase>
    </div>
  );
}
 
export default Home;