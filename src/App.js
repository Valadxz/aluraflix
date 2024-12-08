import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Error404 } from "./pages/Error404";
import { Cabecera } from "./components/Cabecera";
import { ThemeProvider } from "styled-components";
import { temaClaro } from "./components/UI/Temas";
import { EstilosGlobales } from "./EstilosGlobales";
import { PieDePagina } from "./components/Footer";

import { Video } from "./pages/Video";
import { VideoPage } from "./pages/VideoPage";
import { VideoList } from "./pages/VideoList";
import { EditarVideo } from "./pages/EditarVideo";

import { Artista } from "./pages/Artista";
import { EditarArtista } from "./pages/EditarArtista";
import { ArtistaList } from "./pages/ArtistaList";


function App() {
    return (
        <ThemeProvider theme={temaClaro}>
            <EstilosGlobales />
            <Router>
                <Cabecera />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/video" element={<Video />} />
                    <Route path="/videoList" element={<VideoList />} />
                    <Route path="/video/:id" element={<EditarVideo />} />
                    <Route path="/videoView/:videoId" element={<VideoPage />} /> 
                    <Route path="/artista" element={<Artista />} />
                    <Route path="/artistaList" element={<ArtistaList />} />
                    <Route path="/artista/:id" element={<EditarArtista />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
                <PieDePagina />
            </Router>
        </ThemeProvider>
    );
}

export default App;
