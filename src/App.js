import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])



  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: "https://github.com.br",
      techs: ["node", "vue", "angular"]
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    try {
      await api.delete(`repositories/${id}`);
      const repositoryIndex = repositories.findIndex(repository => repository.id === id);

      if (repositoryIndex < 0) {
        return
      }
      repositories.splice(repositoryIndex, 1);
      setRepositories([...repositories]);

    } catch (error) {
      console.log(error);
    }


  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))
        }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div >
  );
}

export default App;
