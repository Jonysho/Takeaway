const CardLayout = ({ cards }) => {
    //Cards = Arr [ Object {Ttitle: String, Src: Image URL} ]
    return (
      <div className="flex-1">
        <div className="grid gap-6 xs:gap-8 md:gap-6 lg:gap-8 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          {cards.map((card, index) => {
            return (
            <div key={index} className="bg-white rounded-lg shadow-2xl max-w-full max-h-full mx-auto">
              {/* <h2 className="text-xl font-bold mb-2">{card.title}</h2> */}
              <img className="rounded-lg object-cover w-auto h-auto flex-grow-0 flex-shrink-0" src={card.src} alt={card.title} />
            </div>)
          })}
        </div>
      </div>
    );
  };
  
  export default CardLayout;