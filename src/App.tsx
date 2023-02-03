import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [data, setData] = useState<string[] | null>(null);

    useEffect(() => {
        getSkins()
            .then((data) => setData(data))
            .catch(console.error);
    }, []);

    return (
        <div className="bg-neutral-900 text-slate-100 min-h-screen min-w-full py-16 px-0 sm:px-16 flex flex-wrap justify-center">
            {data === null
                ? "Loading..."
                : data.map((name) => (
                      <div className="m-4 p-4 flex flex-col rounded-lg bg-neutral-800 shadow-lg w-72 sm:w-96">
                          <div className="flex items-center">
                              <img
                                  className="w-24 sm:w-36 h-24 sm:h-36"
                                  src={`https://www.gimkit.com/assets/map/characters/skins/${name}/preview.png`}
                                  alt=""
                              />
                              <a
                                  target="_blank"
                                  className="text-blue-500 underline ml-8"
                                  href={`https://www.gimkit.com/assets/map/characters/skins/${name}/spritesheet.png`}
                              >
                                  spritesheet
                              </a>
                          </div>
                          <span className="text-white text-base sm:text-xl font-medium mt-2">
                              <pre>{name}</pre>
                          </span>
                      </div>
                  ))}
        </div>
    );
}

const getSkins = async () =>
    (await axios.get("/.netlify/functions/list-skins")).data;

export default App;
