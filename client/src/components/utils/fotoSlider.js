import Slider from "react-slick";
import { Card, CardMedia } from "@mui/material";

function FotoSlider({ fotos, descricao}) {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, 
  };

  return (
    <Slider {...settings} style={{ width: '100%', height: { xs: '300px', sm: '400px', md: '400px', lg: '400px', xl: '500px' }}}>
      {fotos.map((photo, index) => (
        <Card key={index} sx={{ boxSizing: 'border-box', height: '100%' }}>
          <CardMedia component="img" image={photo} alt={descricao} 
          sx={{ width: '100%', height: { xs: '300px', sm: '400px', md: '400px', lg: '400px', xl: '500px' } ,objectFit: 'cover' }}/>
          
        </Card>
      ))}
    </Slider>
  );
}

export default FotoSlider;