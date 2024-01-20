import "./searchForm.css";
import { useGlobalPizzasContext } from "../../context/pizzasContext";

const SearchForm = () => {
  // provide PizzasContext
  const { searchTerm, setSearchTerm } = useGlobalPizzasContext();

  // handleChange
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    // console.log(searchTerm);
  };

  // handleSubmit
  const handleSubmit = (e) => {
    // prevent page refresh
    e.preventDefault();
  };

  return (
    <div className="search-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search-term"
          id="search-term"
          value={searchTerm}
          onChange={(e) => {
            handleSearchTermChange(e);
          }}
          placeholder="Search your favorite pizza"
        />
      </form>
    </div>
  );
};

export default SearchForm;
