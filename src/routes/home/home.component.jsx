import { Outlet }  from 'react-router-dom';
import Directoy from '../../components/directory/directory.component';

const Home = () => {

  return (
    <div>
      <div className="categories-container">
        <Directoy />
        <Outlet />
      </div>
    </div>
  );
}

export default Home;