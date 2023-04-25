
import ReactDOM from 'react-dom/client';
import CycloOpedia from './Components/Cyclo/CyclOpedia';
import CycloOpediaFunc from './Components/Cyclo/CyclOpediaFunc';
import Header from './Components/Layout/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <>
     <Header/>
     <div className="container row">
       <div className="col-6">
         <span className='h1 text-warning'>Class Component</span>
          <CycloOpedia></CycloOpedia>
       </div>
       <div className="col-6">
         <span className='h1 text-warning'>Func Component</span>
          <CycloOpediaFunc></CycloOpediaFunc>
       </div>
     </div>
</>
 
);
