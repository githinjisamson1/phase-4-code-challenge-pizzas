import "./searchForm.css";
import { useGlobalPizzasContext } from "../../context/pizzasContext";

const SearchForm = () => {
  const { searchTerm, setSearchTerm } = useGlobalPizzasContext();

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
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
