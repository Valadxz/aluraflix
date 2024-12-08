import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled from 'styled-components';
import { Pagination, Navigation } from 'swiper';
import { CardVideo } from '../CardVideo';
import { useContext } from 'react';
import { Contexto } from '../../Contexto';

const StyledSwiper = styled(Swiper)`
 
  border-radius: 10px; 

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s ease-in-out;
    margin: 0 5px; 
  }

  .swiper-slide:hover {
    transform: scale(1.1); 
  }

  .swiper-pagination-bullet {
    background: ${({ theme }) => theme.texto}; 
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: ${({ theme }) => theme.texto}; 
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 1.5rem;
  }
`;

const StyledCardVideo = styled(CardVideo)`
  width: 300px; 
  height: 400px; 
  background-color: ${({ theme }) => theme.primero}; 
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); 
`;

export function Carrucel({ artista_id, color }) {
    const datos = useContext(Contexto);

    // Filtrar videos por artista
    const videos = datos.videos.filter((dato) => `${dato.artista}` === `${artista_id}`);

    return (
        <StyledSwiper
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 4,
                },
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
        >
            {
                videos.map((video) => (
                    <SwiperSlide key={video.id}>
                        <StyledCardVideo 
                            videoId={video.id} 
                            src={video.link_imagen} 
                            color={color} 
                        />
                    </SwiperSlide>
                ))
            }
        </StyledSwiper>
    );
}
