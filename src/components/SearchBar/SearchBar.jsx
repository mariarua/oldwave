import styles from "./SearchBar.module.css";
import Search from "../../assets/icon-search-bar.svg";
import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/user";

const options = [
  { value: "Carros", label: "Carros" },
  { value: "Motos", label: "Motos" },
  { value: "Ropa", label: "Ropa" },
  { value: "Deporte", label: "Deporte" },
  { value: "Muebles", label: "Muebles" },
  { value: "Computadores", label: "Computadores" },
  { value: "Celulares", label: "Celulares" },
  { value: "TV, Audio y foto", label: "TV, Audio y foto" },
  { value: "Electrodomésticos", label: "Electrodomésticos" },
];

function SearchBar({ onSearch: handleSearch }) {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const user = useUser();

  const onChange = (event) => {
    setInputValue(event.target.value);
  };

  const onSearch = () => {
    handleSearch(inputValue);
  };

  const handleEnter = (event) => {
    if (event.key === "Enter" && inputValue !== "") {
      onSearch();
    }
  };

  const handleOrderRedirect = () => {
    if (user.name) return navigate("/orders");
    return navigate("login");
  };

  return (
    <div data-testid="search">
      <div className={styles.search_box}>
        <div className={styles.search_bar}>
          <img
            className={styles.search_icon}
            src={Search}
            alt="Icono de buscar"
          ></img>
          <input
            className={styles.search_input}
            placeholder="Estoy buscando..."
            value={inputValue}
            onChange={onChange}
            onKeyDown={handleEnter}
            data-testid="search-input"
          ></input>
          <Dropdown />
        </div>

        <button
          className={styles.search_button}
          onClick={onSearch}
          data-testid="search-button"
        >
          Buscar
        </button>
        <button className={styles.filter_button} onClick={handleOrderRedirect}>
          Compras
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
