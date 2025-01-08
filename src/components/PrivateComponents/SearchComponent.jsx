import { ConfigProvider, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import axios from "axios";
import { useSelector } from "react-redux";
import UserItem from "./User/UserItem";
import { useNavigate } from "react-router-dom";
import AntdInputComponent from "../BasicComponents/AntdInputComponent";
import { search_theme_config } from "../../data/utils/inputThemes";

const SearchComponent = ({ onCloseDrawer }) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [lastSearchs, setLastSearchs] = useState([]);
  const [query, setQuery] = useState("");

  const [users, setUsers] = useState([]);

  const token = useSelector((state) => state.authSlice.token);

  useEffect(() => {
    if (query.trim() === "") {
      setUsers([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      const searchUsers = async () => {
        try {
          const response = await axios.post(
            "http://localhost:8002/user/search",
            {
              query,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          setUsers(response.data.users);
        } catch (error) {
          console.error("Error al buscar usuarios", error);
        }
      };

      searchUsers();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const selectUser = (userData) => {
    navigate(`/user/${userData._id}`);
    setQuery("");
    setUsers([]);
    onCloseDrawer();
  };

  return (
    <div className="search-component-container">
      <div className="search-component-input-container">
        <AntdInputComponent
          theme={theme}
          style={{ border: "none", boxShadow: "none", padding: "7px 10px" }}
          placeholder={"Search"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          theme_config={search_theme_config}
        />
      </div>
      <div className="search-component-results-container">
        {lastSearchs.length === 0 && query.trim() === "" ? (
          <>
            <span className="search-component-empty-ttl ">Recientes</span>
            <div className="search-component-empty-container">
              <span>No hay busquedas recientes.</span>
            </div>
          </>
        ) : (
          <>
            {users.length === 0 ? (
              <>
                {lastSearchs.length === 0 ? (
                  <></>
                ) : (
                  <>
                    <div>Busquedas recientess...</div>
                  </>
                )}
              </>
            ) : (
              <>
                {users.map((item) => (
                  <UserItem userData={item} onSelectUser={selectUser} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
