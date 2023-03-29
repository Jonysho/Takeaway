import { navItems } from "../utils/navItems"; 
import { cards } from '../utils/cards'
import PageNav from "../components/PageNav";
import CardLayout from "../components/CardLayout";

const Home = () => {
    return (
        <CardLayout cards={cards} />
      );
}
 
export default Home;