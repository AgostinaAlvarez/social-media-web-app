import { Avatar, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { UserOutlined } from "@ant-design/icons";
import { postDateTranform } from "../../../data/utils/dates";
import SkeletonTest from "../../../components/PrivateComponents/Feed/SkeletonTest";
import SkeletonPostFeed from "../../../components/PrivateComponents/Skeletons/SkeletonPostFeed";
import { AntDesignOutlined } from "@ant-design/icons";
import { FaRegBookmark, FaRegComment, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FeedForYou = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoadign] = useState(true);

  useEffect(() => {
    console.log("feed en base a las recomendaciones");
    setTimeout(() => {
      setLoadign(false);
    }, 4000);
  }, []);

  const tester_feed_data = [
    {
      user: {
        id: "676b02b1939f435716993ef8",
        username: "Aric",
        name: "Aric",
        lastname: "Nightshade",
        avatar: "",
      },
      post: {
        id: "6772c6c075bc0944b24f2245",
        content:
          "Ayer grabé una colaboración increíble con un amigo baterista. 🥁🔥 ¡El groove que logramos es puro fuego!",
        createdAt: "2024-10-16T18:02:30.511000",
        related_categories: ["Music", "Creative Inspiration", "Fashion Trends"],
      },
    },
    {
      user: {
        id: "76c12a4b5d104232983ff456",
        username: "Luna",
        name: "Luna",
        lastname: "Skye",
        avatar: "",
      },
      post: {
        id: "98d5b6f07c293445af7c3456",
        content:
          "¿Sabías que la Gran Pirámide de Giza estuvo cubierta de piedra caliza blanca pulida? ¡Debe haber brillado como un faro bajo el sol!",
        createdAt: "2024-12-20T12:45:00.000000",
        related_categories: ["History", "Art and culture", "Education"],
      },
    },
    {
      user: {
        id: "56d93b7f903cb3227a1bcf12",
        username: "Marco",
        name: "Marco",
        lastname: "Blaze",
        avatar: "",
      },
      post: {
        id: "123abc456def789ghi",
        content:
          "¡El partido de anoche fue una locura! 🏀🔥 Los últimos 30 segundos definieron todo. #AdrenalinaPura",
        createdAt: "2024-12-18T21:15:45.800000",
        related_categories: ["Sports", "Entertainment", "Fitness"],
      },
    },
    {
      user: {
        id: "34a2efb762fc4821937ade67",
        username: "Sophie",
        name: "Sophie",
        lastname: "Hart",
        avatar: "",
      },
      post: {
        id: "cb1d2e3f456g7h8i9j",
        content:
          "Hoy experimenté con nuevas recetas veganas. 🌱✨ Este curry de garbanzos es mi nuevo favorito. 🥘",
        createdAt: "2024-12-15T17:00:00.000000",
        related_categories: ["Food", "Health and Wellness", "Mindfulness"],
      },
    },
    {
      user: {
        id: "ab12cd34ef56gh78ij90",
        username: "Leo",
        name: "Leo",
        lastname: "Frost",
        avatar: "",
      },
      post: {
        id: "1234abcd5678efgh9012",
        content:
          "Las nuevas tendencias en inteligencia artificial son impresionantes. 🚀 Estoy trabajando en un proyecto de aprendizaje profundo. 🤖",
        createdAt: "2024-12-14T09:30:00.000000",
        related_categories: [
          "AI and Machine Learning",
          "Technology",
          "Creative Inspiration",
        ],
      },
    },
    {
      user: {
        id: "987xyz654wvu321tsrq",
        username: "Ella",
        name: "Ella",
        lastname: "Greenwood",
        avatar: "",
      },
      post: {
        id: "bcde2345fghi6789jklm",
        content:
          "Exploré un sendero nuevo este fin de semana. 🌲🗻 ¡La vista desde la cima era espectacular!",
        createdAt: "2024-12-13T14:22:00.000000",
        related_categories: [
          "Outdoor Activities",
          "Adventure Sports",
          "Travel",
        ],
      },
    },
    {
      user: {
        id: "poi098mlk765nqws432",
        username: "Max",
        name: "Max",
        lastname: "Wilder",
        avatar: "",
      },
      post: {
        id: "mnopqrstuvwx34567890",
        content:
          "¿Debería invertir en criptomonedas este año? 🤔 He estado investigando blockchain y parece prometedor.",
        createdAt: "2024-12-10T11:15:00.000000",
        related_categories: [
          "Cryptocurrency and Blockchain",
          "Business and Finance",
          "Technology",
        ],
      },
    },
    {
      user: {
        id: "cd12ef34gh56ij78kl90",
        username: "Grace",
        name: "Grace",
        lastname: "Sun",
        avatar: "",
      },
      post: {
        id: "12345klmnopqrs6789tu",
        content:
          "Recientemente, me fascina aprender sobre las constelaciones y la mitología detrás de ellas. 🌌✨",
        createdAt: "2024-12-08T20:10:00.000000",
        related_categories: [
          "Space and Astronomy",
          "Philosophy",
          "Art and culture",
        ],
      },
    },
    {
      user: {
        id: "ef12gh34ij56kl78mn90",
        username: "Noah",
        name: "Noah",
        lastname: "Rivera",
        avatar: "",
      },
      post: {
        id: "abcdef123456ghijkl789",
        content:
          "Descubrí una joya de librería en el centro. 📚 Me llevé tres clásicos para mi colección. ¿Recomendaciones?",
        createdAt: "2024-12-06T13:40:00.000000",
        related_categories: [
          "Literature",
          "Art and culture",
          "Urban Exploration",
        ],
      },
    },
    {
      user: {
        id: "gh12ij34kl56mn78op90",
        username: "Emily",
        name: "Emily",
        lastname: "Stone",
        avatar: "",
      },
      post: {
        id: "ghijklmnop1234567890qr",
        content:
          "¿Es posible equilibrar mindfulness con las exigencias del día a día? 🌱💡 Estoy intentando nuevas técnicas. #Bienestar",
        createdAt: "2024-12-04T08:15:00.000000",
        related_categories: [
          "Mindfulness",
          "Health and Wellness",
          "Spirituality",
        ],
      },
    },
    {
      user: {
        id: "ij12kl34mn56op78qr90",
        username: "Jake",
        name: "Jake",
        lastname: "Hale",
        avatar: "",
      },
      post: {
        id: "mnopqr123456stuv7890wx",
        content:
          "Estoy probando un simulador de vuelo en VR. 🛩️ ¡Es increíblemente realista!",
        createdAt: "2024-12-02T18:05:00.000000",
        related_categories: [
          "Virtual Reality and Augmented Reality",
          "Gaming",
          "Technology",
        ],
      },
    },
    {
      user: {
        id: "kl12mn34op56qr78st90",
        username: "Zoe",
        name: "Zoe",
        lastname: "Light",
        avatar: "",
      },
      post: {
        id: "qrstuv123456wxyz7890ab",
        content:
          "¿Alguien más emocionado por los próximos lanzamientos de anime este invierno? 🎬❄️ ¡Se vienen grandes historias!",
        createdAt: "2024-11-30T21:00:00.000000",
        related_categories: [
          "Anime and comics",
          "Entertainment",
          "Creative Inspiration",
        ],
      },
    },
    {
      user: {
        id: "mn12op34qr56st78uv90",
        username: "Hannah",
        name: "Hannah",
        lastname: "Brooks",
        avatar: "",
      },
      post: {
        id: "stuvwx123456yzab7890cd",
        content:
          "Planificando la decoración para mi fiesta de cumpleaños. 🎉✨ ¿Ideas para un tema creativo?",
        createdAt: "2024-11-29T17:25:00.000000",
        related_categories: [
          "Event Planning",
          "DIY Projects",
          "Creative Inspiration",
        ],
      },
    },
    {
      user: {
        id: "op12qr34st56uv78wx90",
        username: "Sam",
        name: "Sam",
        lastname: "Carter",
        avatar: "",
      },
      post: {
        id: "vwxyz123456abcde7890fg",
        content:
          "Últimamente he estado viendo documentales sobre filosofía existencialista. 🧠 Profundamente inspirador.",
        createdAt: "2024-11-27T10:00:00.000000",
        related_categories: ["Philosophy", "Psychology", "Education"],
      },
    },
    {
      user: {
        id: "qr12st34uv56wx78yz90",
        username: "Olivia",
        name: "Olivia",
        lastname: "Moor",
        avatar: "",
      },
      post: {
        id: "abcdefg123456hijkl7890",
        content:
          "Adoptamos un cachorro y ya es el rey de la casa. 🐶❤️ ¿Consejos para entrenarlo?",
        createdAt: "2024-11-25T14:45:00.000000",
        related_categories: [
          "Pet Care",
          "Family Activities",
          "Simple Family Moments",
        ],
      },
    },
  ];

  const skeleton_render = Array(10).fill(null);

  return (
    <>
      <div className="feed-for-you-container">
        {loading ? (
          skeleton_render.map((_, index) => <SkeletonPostFeed />)
        ) : (
          <>
            {tester_feed_data.map((item, index) => (
              <div
                className="post-container"
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/post");
                }}
              >
                <div className="post-header">
                  <div className="post-header-user-data-container">
                    <Avatar icon={<UserOutlined />} />
                    <div className="post-header-user-data">
                      <div className="post-header-user-data-name">
                        <span className="info-name-lbl">
                          {item.user.name} {item.user.lastname}
                        </span>
                        <span className="info-username-lbl">
                          @{item.user.username}
                        </span>
                      </div>
                      <span className="post-header-date info-date-lbl">
                        {postDateTranform(item.post.createdAt)}
                      </span>
                    </div>
                  </div>
                  <BsThreeDots />
                </div>
                <p className="post-content">{item.post.content}</p>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="post-content-footer-stats-item">
                    <FaRegComment />
                    <span>10</span>
                  </div>
                  <div className="post-content-footer-stats-item">
                    <FaRegHeart />
                    <span>10</span>
                  </div>
                  <div className="post-content-footer-stats-item">
                    <FaRegBookmark />
                    <span>10</span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default FeedForYou;
