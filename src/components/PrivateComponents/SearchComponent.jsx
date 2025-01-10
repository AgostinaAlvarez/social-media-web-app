import { ConfigProvider, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import axios from "axios";
import { useSelector } from "react-redux";
import UserItem from "./User/UserItem";
import { useNavigate } from "react-router-dom";
import AntdInputComponent from "../BasicComponents/AntdInputComponent";
import { search_theme_config } from "../../data/utils/inputThemes";
import { search_recent, search_users } from "../../../tester_data";
import DeleteSearchHistoryModal from "./Search/DeleteSearchHistoryModal";

const SearchComponent = ({ onCloseDrawer }) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [lastSearchs, setLastSearchs] = useState(search_recent);

  const [query, setQuery] = useState("");

  const [users, setUsers] = useState([]);

  const token = useSelector((state) => state.authSlice.token);

  useEffect(() => {
    if (query.trim() === "") {
      setUsers([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      /*
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
      */
      function filterUsers(users, searchString) {
        const query = searchString.trim().toLowerCase(); // Eliminar espacios y convertir a minúsculas

        const result = users.filter(
          (user) =>
            user.username.toLowerCase().includes(query) ||
            user.name.toLowerCase().includes(query)
        );
        setUsers(result);
      }

      //searchUsers();
      filterUsers(search_users, query);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const selectUser = (userData) => {
    navigate(`/user/${userData._id}`);
    setQuery("");
    setUsers([]);
    onCloseDrawer();
  };

  ///DELETE HISTORY MODAL
  const [isDeleteSearchHistoryModalOpen, setIsDeleteSearchHistoryModalOpen] =
    useState(false);
  const showDeleteSearchHistoryModal = () => {
    setIsDeleteSearchHistoryModalOpen(true);
  };

  return (
    <>
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
          {lastSearchs.length !== 0 && query.trim() === "" ? (
            <>
              <div
                style={{
                  width: "100%",
                  //backgroundColor: "pink",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "6px 20px",
                  paddingTop: "10px",
                  boxSizing: "border-box",
                }}
              >
                <span style={{ fontWeight: 500 }}>Recientes</span>
                <span onClick={showDeleteSearchHistoryModal}>Borrar todo</span>
              </div>
              {lastSearchs.map((item) => (
                <UserItem userData={item} onSelectUser={selectUser} />
              ))}
            </>
          ) : (
            <>
              {lastSearchs.length === 0 && query.trim() === "" ? (
                <>
                  <span className="search-component-empty-ttl ">Recientes</span>
                  <div className="search-component-empty-container">
                    <span>No hay busquedas recientes.</span>
                  </div>
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
      <DeleteSearchHistoryModal
        handleAction={() => {
          setLastSearchs([]);
          setIsDeleteSearchHistoryModalOpen(false);
        }}
        isModalOpen={isDeleteSearchHistoryModalOpen}
        setIsModalOpen={setIsDeleteSearchHistoryModalOpen}
      />
    </>
  );
};

export default SearchComponent;
