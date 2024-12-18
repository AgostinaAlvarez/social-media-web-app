import { ConfigProvider, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import axios from "axios";
import { useSelector } from "react-redux";
import UserItem from "./User/UserItem";
import { useNavigate } from "react-router-dom";

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
        <ConfigProvider
          theme={{
            token: {
              colorTextPlaceholder:
                theme === "dark" ? "rgb(189, 189, 189)" : "rgb(99, 99, 99)",
              colorBgContainer:
                theme === "dark"
                  ? "rgba(54,54,54,255)"
                  : "rgba(239,239,239,255)",
            },
          }}
        >
          <Input
            style={{
              border: "none",
              boxShadow: "none",
              color: theme === "dark" ? "white" : "black",
              padding: "7px 10px",
            }}
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </ConfigProvider>
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
