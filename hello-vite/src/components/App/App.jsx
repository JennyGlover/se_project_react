import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import defaultClothingItems from '../../utils/utils';

function App(){
    
    return (
      <div className="App">
        <Header />
        <Main defaultClothingItems={defaultClothingItems}/>
        <Footer />
      </div>
    );
}

export default App;