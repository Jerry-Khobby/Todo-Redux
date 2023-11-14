
import './App.css';
import  MainPage from "./component/Main"
import  store from "./states/store"
import { Provider } from 'react-redux';


const App=()=> {
  return (
  <Provider store={store}>
    <div className="App">
    <MainPage/>
    </div>
    </Provider>
  );
}

export default App;
