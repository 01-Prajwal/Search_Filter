import axios from 'axios'
import { useEffect, useState } from 'react';
import './App.css';
import logo from './Images/logo.png'
import Search from './Components/Search';
import Table from './Components/Table/Table';
import Pagination from './Components/Pagination/Pagination';
import Sort from './Components/Sort/Sort';
import Genre from './Components/Genre/Genre';
const base_url = process.env.REACT_APP_API_URL;
function App() {
  const [obj, setObj] = useState({})
  const [sort, setSort] = useState({ sort: 'rating', order: 'desc' })
  const [filterGenre, setFilterGenre] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        // const url = `${base_url}?page=${page}&sort=${sort.sort},${sort.order}&genre=${filterGenre.toString()}&search=${search}`
        const url = `http://search-filter-rho.vercel.app/?page=${page}&sort=${sort.sort},${sort.order
          }&genre=${filterGenre.toString()}&search=${search}`;
        const { data } = await axios.get(url);
        setObj(data);

      } catch (error) {
        console.log(error);

      }
    }
    getAllMovies()
    console.log(obj);
  }, [sort, filterGenre, page, search])
  return (
    < >
      <div className="wrapper">
        <div className="container">
          <div className="head">
            <img src={logo} alt="" />
            <Search setSearch={(search) => setSearch(search)} />
          </div>
          <div className="body">
            <div className="table-container">
              <Table movies={obj.movies ? obj.movies : []} />
              <Pagination
                page={page}
                limit={obj.limit ? obj.limit : 0}
                total={obj.total ? obj.total : 0}
                setPage={(page) => setPage(page)}
              />
            </div>
            <div className="filter_container">
            <Sort sort={sort} setSort={(sort) => setSort(sort)} />
            <Genre
              filterGenre={filterGenre}
              genres={obj.genres ? obj.genres : []}
              setFilterGenre={(genre) => setFilterGenre(genre)}
            />

          </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
