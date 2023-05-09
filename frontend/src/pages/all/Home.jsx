import CardLayout from "../../components/cards/CardLayout";

const Home = () => {
    const randomCards = [];

    for (let i = 0; i < 12; i++) {
      randomCards.push({
        title: `Card ${i}`,
        src: `https://picsum.photos/300/300?random=${i}`,
      });
    }

    return (
        <CardLayout cards={randomCards} />
      );
}
 
export default Home;