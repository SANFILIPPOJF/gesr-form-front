import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Titre } from './components/titre';
import { Connexion } from './components/connexion';

export interface User {
  cp: string;
  password: string;
}

const App =  () => {
  const [page, setPage] = useState<String>("connexion")
  const [user, setUser] = useState<User>({
    cp: "",
    password: ""
});
  return (
    <div className="App">
      <Titre></Titre>
      {page === "connexion" && <Connexion setUser={setUser} user={user}></Connexion>}
    </div>
  );
}
export default App;
