import React, { useState } from "react";
import axios from "axios";

const LinkPreview = () => {
  const [link, setLink] = useState("");
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const fetchPreview = async () => {
    setError(null);
    try {
      const { data } = await axios.get("http://localhost:8002/api/preview", {
        params: { url: link },
      });
      setPreview(data);
    } catch (err) {
      setError("No se pudo obtener la vista previa del enlace.");
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Ingresa una URL"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <button
        onClick={fetchPreview}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Obtener vista previa
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {preview && (
        <div className="mt-4 border rounded p-4">
          {preview.images?.[0] && (
            <img
              src={preview.images[0]}
              alt={preview.title}
              className="w-full h-48 object-cover rounded"
            />
          )}
          <h2 className="text-xl font-bold mt-2">{preview.title}</h2>
          <p className="text-gray-600">{preview.description}</p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline mt-2 block"
          >
            Visitar sitio
          </a>
        </div>
      )}
    </div>
  );
};

export default LinkPreview;

/*
Test data:


5. Entretenimiento general: "Somehow spent 3 hours on YouTube watching people restore old gadgets. How do I always fall into these random rabbit holes? 😂 #InternetAdventures"

6. Humor sobre programación: "Why do programmers prefer dark mode? Because light attracts bugs. 🐛😎 #ProgrammerHumor #DadJokesForCoders"

7. Más sobre series: "Is it just me, or are TV show cliffhangers basically legalized emotional damage? 😭 Stranger Things really got me this season. #SeriesAddict"

8. Sobre películas y libros: "Is there a movie adaptation that’s actually better than the book? (Don’t say The Shining… I already know that one!) Let’s argue! 🎥📚 #BookToMovie"

9. Sobre gaming: "Gaming at 2 AM hits different… until you realize you have to be up at 7 for work. Worth it, though. 🎮✨ #LateNightGaming"

1. Sobre programación: "Finally learned how to use Git properly. Feels like I’ve unlocked a cheat code for life. 🖥️✨ #CodingJourney"

2. Sobre películas: "There’s nothing better than rewatching your favorite movie and catching details you missed the first time. Today was The Dark Knight and… it just gets better. 🎬🔥 #MovieNight"

3. Sobre series: "Breaking Bad rerun for the 5th time. Walter White and Jesse Pinkman still make the best chaotic duo. Iconic. 📺 #TVClassics"

4. Sobre libros: "Reading before bed is the best form of self-care. Currently lost in the world of The Name of the Wind and loving every second. 📚✨ #BookLove"



8. Sobre series: "Can we all agree that some shows deserve at least two more seasons? I’m still not over Firefly being canceled. 🚀😭 #SaveOurShows"

9. Sobre libros: "There’s something magical about old bookstores. Found a hidden gem today that smells like paper, ink, and nostalgia. 📚❤️ #BookstoreAdventures"

10. Sobre videojuegos: "Finally finished Red Dead Redemption 2. That ending hit like a train. One of the most beautiful games ever made. 🎮🏞️ #GamingLife"




3. On series: Binge-watching an entire season in one day feels like an achievement. It’s the modern equivalent of finishing a marathon.

4. On books: Reading a book you can’t put down is like discovering a new world. You lose track of time, and before you know it, hours have passed.

5. On entertainment in general: Sometimes the best days are the ones spent indoors, surrounded by stories, whether it’s books, movies, or games.

6. On programming humor: Debugging feels like trying to find a needle in a haystack that you accidentally set on fire.

7. On movies: There’s something timeless about movies with practical effects. They age so much better than overdone CGI.

8. On series: Rewatching older shows is like revisiting an old friend. The nostalgia always hits differently.

9. On books: A good book has the power to make you forget where you are. You’re not just reading words; you’re living the story.






*/
