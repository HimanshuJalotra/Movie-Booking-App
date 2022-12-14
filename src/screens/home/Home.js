import React, { useState } from "react";
import Header from '../../common/header/Header'
import './Home.css'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
// import Filter from './Filter';

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Details from '../details/Details';
import { Route } from "react-router-dom";
import { NavLink } from "react-router-dom";


export default function Home() {
  const [data,setData] = useState({
    title:"",
    artists:"",
    genre:"",
    duration:"",
    relDate:"",
    rating:"",
    plot:"",
    posterUrl:"",
    videoUrl:""
  })


  const fetchDetails = function(id){
    moviesData.map((item)=>{
      if(id===item.id){
        let title = item.title;
        let artistsName = item.artists;
        let genreName = item.genres;
        let dur = item.duration;
        let rel = item.release_date;
        let rat = item.critics_rating;
        let dsc = item.storyline;
        let posterUrl = item.poster_url;
        let vdurl = item.trailer_url;    
        
        setData({...data,title:title,artists:artistsName,genre:genreName,
        duration:dur,relDate:rel,rating:rat,plot:dsc,posterUrl:posterUrl,videoUrl:vdurl})
        console.log(data);
      }
    })
  }

  const [show,setShow] = useState(false);
  const loader = function(){
    setShow(true);
  }

  const [genres, setGenres] = React.useState("Action");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenres(event.target.value);
  }
  const [artists, setArtists] = React.useState("Marlon Brando");

  const artistHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArtists(event.target.value);
  };

  function closed(){
   setShow(false)
  }


  return (
    <div>
      <Header/>

      {/* Upcoming movies  */}

      <div className="upcoming">
      <div className="up-heading">
          <p>Upcoming Movies</p>
        </div>

        <ImageList sx={{ width: "100%", height: 390 }}>
      <ImageListItem key="Subheader" cols={6}>
    
      </ImageListItem>
      {moviesData.map((item) => (

        <ImageListItem key={item.poster_url} onClick={loader.bind(this)}  >
          <img
            src={`${item.poster_url}?w=248&fit=crop&auto=format`}
            srcSet={`${item.poster_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
            onClick={fetchDetails.bind(this,item.id)}
            

          />
          <ImageListItemBar
            title={item.title}
            subtitle={item.author}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
              >
              </IconButton>
            }
          />
        </ImageListItem>

      ))}

    </ImageList>

      </div>
      {/* {show && <NavLink style={{textDecoration:"none",color:"black"}} onClick={closed.bind("this")}><h3 style={{marginLeft:"31px",marginTop:"15px"}}> X Close</h3></NavLink>} */}
      {show && <Button size="small" variant="outlined" style={{width:"120px",height:"40px",marginLeft:"31px",marginTop:"15px"}} onClick={closed.bind("this")}>close</Button>}
      {show && <Details data={data}/>}
      <div className="released">

      <div className="left-div">
        <ImageList sx={{ width:"100%", height: 440 }}>
      <ImageListItem key="Subheader" cols={4}>
      </ImageListItem>
      {moviesData.map((item) => (
        <ImageListItem key={item.poster_url}>
          <img
            src={`${item.poster_url}?w=248&fit=crop&auto=format`}
            srcSet={`${item.poster_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={"Release Date "+item.release_date}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
              >
              </IconButton>
            }
          />
        </ImageListItem>
      ))}


    </ImageList>
        </div>

        {/* Filter Form  */}

        <div className="right-div">
         
        <Card sx={{ minWidth: "100%", minHeight: "440px" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Find Movies By
          </Typography>
          <br />
          <TextField required id="filled-required" label="Movie Name" variant="standard" style={{width:"80%"}} />
          <br />
          <br />
          <TextField id="outlined-select-currency" select label="Genres" value={genres} onChange={handleChange} style={{width:"80%"}} >
            {genresArr.map((option) => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <br />
          <br />
          <TextField
            id="outlined-select-currency"
            select
            label="Artists"
            value={artists}
            onChange={artistHandleChange}
            style={{width:"80%"}}
          >
            {artistsArr.map((option) => (
              <MenuItem key={option.first_name} value={option.first_name}>
                {option.first_name+option.last_name}
              </MenuItem>
            ))}
          </TextField>
          <br />
          <br />
          <label htmlFor="startDate">Release Date Start</label>
          <br/>
          <input type="date" name="startDate" id="startDate" style={{width:"80%",height:"25px"}} />
          <br />
          <br/>
          <label htmlFor="endDate">Release Date End</label>
          <br/>
          <input type="date" name="endDate" id="endDate" style={{width:"80%",height:"25px"}}/>
          <br />
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" style={{width:"50px",marginLeft:"10px"}}>APPLY</Button>
        </CardActions>
      </Card>

        </div>

      </div>
    </div>
  )
}

//  Api 

let moviesData = [
  {
      id: "M1",
      title: "The Yashfather",
      storyline: "A chilling portrait of the Corleone family's rise and near fall from power in America along with balancing the story of the Sicilian clan's ugly crime business in which they are engaged.",
      genres: [
          "Crime",
          "Drama"
      ],
      duration: 177,
      poster_url: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
      trailer_url: "https://www.youtube.com/watch/?v=sY1S34973zA",
      wiki_url: "https://en.wikipedia.org/wiki/The_Godfather",
      release_date: "1972-03-15T00:00:00+05:30",
      censor_board_rating: "R",
      critics_rating: 9.2,
      status: "PUBLISHED",
      artists: [
          {
              "id": "A1",
              "first_name": "Marlon",
              "last_name": "Brando",
              "role_type": "ACTOR",
              "profile_description": "Marlon Brando Jr. was an American actor and film director. He is credited with bringing realism to film acting and helping to popularize the Stanislavski system of acting having studied with Stella Adler in the 1940s. Regarded for his cultural influence on 20th century film, Brando's Academy Award-winning performances include that of Terry Malloy in On the Waterfront (1954) and Don Vito Corleone in The Godfather (1972). Brando was an activist for many causes, notably the civil rights movement and various Native American movements.",
              "profile_url": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Marlon_Brando_%28cropped%29.jpg",
              "wiki_url": "https://en.wikipedia.org/wiki/Marlon_Brando"
          },
          {
              "id": "A2",
              "first_name": "Al",
              "last_name": "Pacino",
              "role_type": "ACTOR",
              "profile_description": "Alfredo James Pacino is an American actor and filmmaker. Pacino has had a career spanning over five decades, during which time he has received numerous accolades and honors both competitive and honorary, among them an Academy Award, two Tony Awards, two Primetime Emmy Awards, a British Academy Film Award, four Golden Globe Awards, the Lifetime Achievement Award from the American Film Institute, the Golden Globe Cecil B. DeMille Award, and the National Medal of Arts. He is also one of few performers to have won a competitive Oscar, an Emmy, and a Tony Award for acting, dubbed the 'Triple Crown of Acting'.",
              "profile_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Al_Pacino.jpg/220px-Al_Pacino.jpg",
              "wiki_url": "https://en.wikipedia.org/wiki/Al_Pacino"
          }
      ]
  },
  {
      id: "M2",
      title: "The Dark Anurag",
      storyline: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      genres: [
          "Action",
          "Crime",
          "Drama"
      ],
      duration: 152,
      poster_url: "https://upload.wikimedia.org/wikipedia/commons/3/30/Tom_Hardy_Locke_Premiere.jpg",
      trailer_url: "https://www.youtube.com/watch?v=_PZpmTj1Q8Q",
      wiki_url: "https://en.wikipedia.org/wiki/The_Dark_Knight_(film)",
      release_date: "2008-07-18T00:00:00+05:30",
      censor_board_rating: "PG-13",
      critics_rating: 9.0,
      status: "PUBLISHED",
      artists: [
          {
              "id": "A3",
              "first_name": "Christian",
              "last_name": "Bale",
              "role_type": "ACTOR",
              "profile_description": "Christian Charles Philip Bale is an English actor and producer. He has starred both in blockbuster films and smaller projects from independent producers and art houses. Born in Haverfordwest, Wales, to English parents, he first caught the public eye at the age of 13, when he was cast in the starring role of Steven Spielberg's Empire of the Sun. After a string of semi-successful feature films, he portrayed Wall Street banker and serial killer Patrick Bateman in American Psycho to widespread critical acclaim. His reputation for going great lengths to portray characters in films was first noted in the psychological thriller The Machinist, where he lost 28.5 kg to play the main lead. Within six months he gained 45 kg to star as Batman in Christopher Nolan's Batman Begins",
              "profile_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Christian_Bale_2014_%28cropped%29.jpg/1024px-Christian_Bale_2014_%28cropped%29.jpg",
              "wiki_url": "https://en.wikipedia.org/wiki/Christian_Bale"
          },
          {
              "id": "A4",
              "first_name": "Heath",
              "last_name": "Ledger",
              "role_type": "ACTOR",
              "profile_description": "Heath Andrew Ledger was an Australian actor and director. After performing roles in several Australian television and film productions during the 1990s, Ledger left for the United States in 1998 to further develop his film career. His work comprised nineteen films, including Brokeback Mountain and The Dark Knight. Ledger received numerous posthumous accolades for his critically acclaimed performance in the film The Dark Knight, including the Academy Award for Best Supporting Actor and Best Actor International Award at the 2008 Australian Film Institute Awards",
              "profile_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Heath_Ledger_%28Berlin_Film_Festival_2006%29_revised.jpg/1024px-Heath_Ledger_%28Berlin_Film_Festival_2006%29_revised.jpg",
              "wiki_url": "https://en.wikipedia.org/wiki/Heath_Ledger"
          }
      ]
  },
  {
      id: "M3",
      title: "Inception",
      storyline: "A thief, who steals corporate secrets through the use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.",
      genres: [
          "Action",
          "Adventure",
          "Sci-Fi"
      ],
      duration: 148,
      poster_url: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
      trailer_url: "https://www.youtube.com/watch?v=8hP9D6kZseM",
      wiki_url: "https://en.wikipedia.org/wiki/Inception",
      release_date: "2010-07-16T00:00:00+05:30",
      censor_board_rating: "PG-13",
      critics_rating: 8.8,
      status: "PUBLISHED",
      artists: [
          {
              "id": "A5",
              "first_name": "Leonardo",
              "last_name": "DiCaprio",
              "role_type": "ACTOR",
              "profile_description": "Leonardo Wilhelm DiCaprio is an American actor and film producer. DiCaprio began his career by appearing in television commercials in the late 1980s. He next had recurring roles in various television series, such as the soap opera Santa Barbara and the sitcom Growing Pains. DiCaprio's portrayals of Howard Hughes in The Aviator (2004) and Hugh Glass in The Revenant won him the Golden Globe Award for Best Actor ?????????????????? Motion Picture Drama. His performance as Jordan Belfort in The Wolf of Wall Street won him the Golden Globe award for Best Actor ?????????????????? Motion Picture Musical or Comedy. He also won the Academy Award for Best Actor and BAFTA Award for his performance in The Revenant. DiCaprio is the founder of his own production company, Appian Way Productions.",
              "profile_url": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Leonardo_DiCaprio_visited_Goddard_Saturday_to_discuss_Earth_science_with_Piers_Sellers_%2826105091624%29_cropped.jpg",
              "wiki_url": "https://en.wikipedia.org/wiki/Leonardo_DiCaprio"
          },
          {
              "id": "A6",
              "first_name": "Joseph",
              "last_name": "Gordon-Levitt",
              "role_type": "ACTOR",
              "profile_description": "Joseph Leonard Gordon-Levitt is an American actor, filmmaker, singer, and entrepreneur. As a child, Gordon-Levitt appeared in many films and TV series. He took a break from acting to study at Columbia University, but dropped out in 2004 to pursue acting again. He has since starred in  films like (500) Days of Summer, Inception, The Dark Knight Rises, G.I. Joe: The Rise of Cobra and others. For his leading performances in (500) Days of Summer and 50/50, he was nominated for the Golden Globe Award for Best Actor ?????????????????? Motion Picture Musical or Comedy.",
              "profile_url": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Joseph_Gordon-Levitt_2013.jpg",
              "wiki_url": "https://en.wikipedia.org/wiki/Joseph_Gordon-Levitt"
          }
      ]
  },
  {
      id: "M4",
      title: "Interstellar",
      storyline: "A team of explorers travel beyond this galaxy through a newly discovered wormhole to discover whether mankind has a future among the stars.",
      genres: [
          "Adventure",
          "Drama",
          "Sci-Fi"
      ],
      duration: 169,
      poster_url: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
      trailer_url: "https://www.youtube.com/watch?v=2LqzF5WauAw",
      wiki_url: "https://en.wikipedia.org/wiki/Interstellar_(film)",
      release_date: "2014-11-07T00:00:00+05:30",
      censor_board_rating: "PG-13",
      critics_rating: 8.6,
      status: "PUBLISHED",
      artists: [
          {
              "id": "A7",
              "first_name": "Matthew",
              "last_name": "McConaughey",
              "role_type": "ACTOR",
              "profile_description": "Matthew David McConaughey is an American actor, producer, model, writer and director. McConaughey achieved ample success in 2013 and 2014. In 2013, McConaughey portrayed Ron Woodroof, a cowboy diagnosed with AIDS in the biographical film Dallas Buyers Club, which earned him the Academy Award, Critics' Choice Movie Award, Golden Globe Award, and Screen Actors Guild Award, all for Best Actor, among other awards and nominations. In 2014, he starred as Rust Cohle in the first season of HBO's crime drama anthology series True Detective, for which he won the Critics' Choice Television Award and TCA Award, and was nominated for the Primetime Emmy Award, Golden Globe Award, and Screen Actors Guild Award.",
              "profile_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Matthew_McConaughey_-_Goldene_Kamera_2014_-_Berlin.jpg/1024px-Matthew_McConaughey_-_Goldene_Kamera_2014_-_Berlin.jpg",
              "wiki_url": "https://en.wikipedia.org/wiki/Matthew_McConaughey"
          },
          {
              "id": "A8",
              "first_name": "Anne",
              "last_name": "Hathaway",
              "role_type": "ACTOR",
              "profile_description": "Anne Jacqueline Hathaway is an American actress and singer. One of the world's highest-paid actresses in 2015, she has received multiple awards, including an Academy Award, a Golden Globe, a British Academy Film Award, and an Emmy. Her films have earned $6.4 billion worldwide, and she appeared in the Forbes Celebrity 100 in 2009.",
              "profile_url": "https://upload.wikimedia.org/wikipedia/commons/b/bd/Anne_Hathaway_in_2017.png",
              "wiki_url": "https://en.wikipedia.org/wiki/Anne_Hathaway"
          }
      ]
  },
  {
      id: "M5",
      title: "Shahid",
      storyline: "Shahid Azmi becomes an unlikely champion of human rights, particularly for India's Muslim minority.",
      genres: [
          "Biography",
          "Crime",
          "Drama"
      ],
      duration: 129,
      poster_url: "https://upload.wikimedia.org/wikipedia/en/c/cd/Shahid_Poster_%282013%29.jpg",
      trailer_url: "https://www.youtube.com/watch?v=XiQXmIn7qbI",
      wiki_url: "https://en.wikipedia.org/wiki/Shahid_(film)",
      release_date: "2013-10-18T00:00:00+05:30",
      censor_board_rating: "NR",
      critics_rating: 8.6,
      status: "PUBLISHED",
      artists: [
          {
              "id": "A9",
              "first_name": "Rajkummar",
              "last_name": "Rao",
              "role_type": "ACTOR",
              "profile_description": "Rajkummar Rao, also known as Rajkumar Yadav, is an Indian actor. He has established a career in Hindi cinema and is the recipient of several awards, including a National Film Award, three Filmfare Awards, and an Asia Pacific Screen Award. He is cited in the media as one of the most talented actors of his generation.",
              "profile_url": "https://en.wikipedia.org/wiki/Rajkummar_Rao#/media/File:Rajkummar_Rao_World_Premiere_Newton_Zoopalast_Berlinale_2017_02.jpg",
              "wiki_url": "https://en.wikipedia.org/wiki/Rajkummar_Rao"
          },
          {
              "id": "A10",
              "first_name": "Prabhleen",
              "last_name": "Sandhu",
              "role_type": "ACTOR",
              "profile_description": "Prabhleen Sandhu is a Punjabi film actress who rose to fame with the Indian soap on periodic freedom struggle on COLORS Mohe Rang De as Kranti, dons a different look and role in Zee TV new show, Aapki Antara as Vidya, a middle-class wife, who has trouble adjusting with the illegitimate child of her husband.",
              "profile_url": "https://upload.wikimedia.org/wikipedia/commons/e/e7/Prabhleen_Sandhu_%28cropped%29.jpg",
              "wiki_url": "https://en.wikipedia.org/wiki/Prabhleen_Sandhu"
          }
      ]
  },
  {
      id: "M6",
      title: "Annabelle: Creation",
      storyline: "12 years after the tragic death of their little girl, a dollmaker and his wife welcome a nun and several girls from a shuttered orphanage into their home, where they soon become the target of the dollmaker's possessed creation, Annabelle.",
      genres: [
          "Horror",
          "Suspense"
      ],
      duration: 109,
      poster_url: "https://upload.wikimedia.org/wikipedia/en/0/08/Annabelle_Creation.jpg",
      trailer_url: "https://www.youtube.com/watch?v=KisPhy7T__Q",
      wiki_url: "https://en.wikipedia.org/wiki/Annabelle:_Creation",
      release_date: "2017-08-11T00:00:00+05:30",
      censor_board_rating: "R",
      critics_rating: 6.6,
      status: "PUBLISHED",
      artists: [
          {
              "id": "A14",
              "first_name": "Anthony",
              "last_name": "LaPaglia",
              "role_type": "ACTOR",
              "profile_description": "Anthony M. LaPaglia is an Australian actor. He played the role of Joe in the coming of age comedy Empire Records and John in the film Autumn In New York, as well as FBI agent Jack Malone on the American TV series Without a Trace, for which he won a Golden Globe Award for Best Actor ?????????????????? Television Series Drama. He also appeared in 8 episodes of Frasier as Daphne Moon's alcoholic brother Simon.",
              "profile_url": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Anthony_LaPaglia_and_Gia_Carides_at_the_Man_of_Steel_premiere_in_Sydney_%289123807673%29.jpg",
              "wiki_url": "https://en.wikipedia.org/wiki/Anthony_LaPaglia"
          }
      ]
  },
  
]


const genresArr = [
  {
      id: 1,
      name: "Action"
  },
  {
      id: 2,
      name: "Sci-Fi"
  },
  {
      id: 3,
      name: "Drama"
  }
]


const artistsArr = [
  {
      "id": "A1",
      "first_name": "Marlon",
      "last_name": "Brando",
      "role_type": "ACTOR",
      "profile_description": "Marlon Brando Jr. was an American actor and film director. He is credited with bringing realism to film acting and helping to popularize the Stanislavski system of acting having studied with Stella Adler in the 1940s. Regarded for his cultural influence on 20th century film, Brando's Academy Award-winning performances include that of Terry Malloy in On the Waterfront (1954) and Don Vito Corleone in The Godfather (1972). Brando was an activist for many causes, notably the civil rights movement and various Native American movements.",
      "profile_url": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Marlon_Brando_%28cropped%29.jpg",
      "wiki_url": "https://en.wikipedia.org/wiki/Marlon_Brando"
  },
  {
      "id": "A2",
      "first_name": "Al",
      "last_name": "Pacino",
      "role_type": "ACTOR",
      "profile_description": "Alfredo James Pacino is an American actor and filmmaker. Pacino has had a career spanning over five decades, during which time he has received numerous accolades and honors both competitive and honorary, among them an Academy Award, two Tony Awards, two Primetime Emmy Awards, a British Academy Film Award, four Golden Globe Awards, the Lifetime Achievement Award from the American Film Institute, the Golden Globe Cecil B. DeMille Award, and the National Medal of Arts. He is also one of few performers to have won a competitive Oscar, an Emmy, and a Tony Award for acting, dubbed the 'Triple Crown of Acting'.",
      "wiki_url": "https://en.wikipedia.org/wiki/Pedro_Pascal"
  },
  {
      "id": "A3",
      "first_name": "Christian",
      "last_name": "Bale",
      "role_type": "ACTOR",
      "profile_description": "Christian Charles Philip Bale is an English actor and producer. He has starred both in blockbuster films and smaller projects from independent producers and art houses. Born in Haverfordwest, Wales, to English parents, he first caught the public eye at the age of 13, when he was cast in the starring role of Steven Spielberg's Empire of the Sun. After a string of semi-successful feature films, he portrayed Wall Street banker and serial killer Patrick Bateman in American Psycho to widespread critical acclaim. His reputation for going great lengths to portray characters in films was first noted in the psychological thriller The Machinist, where he lost 28.5 kg to play the main lead. Within six months he gained 45 kg to star as Batman in Christopher Nolan's Batman Begins",
      "profile_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Christian_Bale_2014_%28cropped%29.jpg/1024px-Christian_Bale_2014_%28cropped%29.jpg",
      "wiki_url": "https://en.wikipedia.org/wiki/Christian_Bale"
  },
  {
      "id": "A4",
      "first_name": "Heath",
      "last_name": "Ledger",
      "role_type": "ACTOR",
      "profile_description": "Heath Andrew Ledger was an Australian actor and director. After performing roles in several Australian television and film productions during the 1990s, Ledger left for the United States in 1998 to further develop his film career. His work comprised nineteen films, including Brokeback Mountain and The Dark Knight. Ledger received numerous posthumous accolades for his critically acclaimed performance in the film The Dark Knight, including the Academy Award for Best Supporting Actor and Best Actor International Award at the 2008 Australian Film Institute Awards",
      "profile_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Heath_Ledger_%28Berlin_Film_Festival_2006%29_revised.jpg/1024px-Heath_Ledger_%28Berlin_Film_Festival_2006%29_revised.jpg",
      "wiki_url": "https://en.wikipedia.org/wiki/Heath_Ledger"
  },
  {
      "id": "A5",
      "first_name": "Leonardo",
      "last_name": "DiCaprio",
      "role_type": "ACTOR",
      "profile_description": "Leonardo Wilhelm DiCaprio is an American actor and film producer. DiCaprio began his career by appearing in television commercials in the late 1980s. He next had recurring roles in various television series, such as the soap opera Santa Barbara and the sitcom Growing Pains. DiCaprio's portrayals of Howard Hughes in The Aviator (2004) and Hugh Glass in The Revenant won him the Golden Globe Award for Best Actor ?????????????????? Motion Picture Drama. His performance as Jordan Belfort in The Wolf of Wall Street won him the Golden Globe award for Best Actor ?????????????????? Motion Picture Musical or Comedy. He also won the Academy Award for Best Actor and BAFTA Award for his performance in The Revenant. DiCaprio is the founder of his own production company, Appian Way Productions.",
      "profile_url": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Leonardo_DiCaprio_visited_Goddard_Saturday_to_discuss_Earth_science_with_Piers_Sellers_%2826105091624%29_cropped.jpg",
      "wiki_url": "https://en.wikipedia.org/wiki/Leonardo_DiCaprio"
  },
  {
      "id": "A6",
      "first_name": "Joseph",
      "last_name": "Gordon-Levitt",
      "role_type": "ACTOR",
      "profile_description": "Joseph Leonard Gordon-Levitt is an American actor, filmmaker, singer, and entrepreneur. As a child, Gordon-Levitt appeared in many films and TV series. He took a break from acting to study at Columbia University, but dropped out in 2004 to pursue acting again. He has since starred in  films like (500) Days of Summer, Inception, The Dark Knight Rises, G.I. Joe: The Rise of Cobra and others. For his leading performances in (500) Days of Summer and 50/50, he was nominated for the Golden Globe Award for Best Actor ?????????????????? Motion Picture Musical or Comedy.",
      "profile_url": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Joseph_Gordon-Levitt_2013.jpg",
      "wiki_url": "https://en.wikipedia.org/wiki/Joseph_Gordon-Levitt"
  },
  {
      "id": "A7",
      "first_name": "Matthew",
      "last_name": "McConaughey",
      "role_type": "ACTOR",
      "profile_description": "Matthew David McConaughey is an American actor, producer, model, writer and director. McConaughey achieved ample success in 2013 and 2014. In 2013, McConaughey portrayed Ron Woodroof, a cowboy diagnosed with AIDS in the biographical film Dallas Buyers Club, which earned him the Academy Award, Critics' Choice Movie Award, Golden Globe Award, and Screen Actors Guild Award, all for Best Actor, among other awards and nominations. In 2014, he starred as Rust Cohle in the first season of HBO's crime drama anthology series True Detective, for which he won the Critics' Choice Television Award and TCA Award, and was nominated for the Primetime Emmy Award, Golden Globe Award, and Screen Actors Guild Award.",
      "profile_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Matthew_McConaughey_-_Goldene_Kamera_2014_-_Berlin.jpg/1024px-Matthew_McConaughey_-_Goldene_Kamera_2014_-_Berlin.jpg",
      "wiki_url": "https://en.wikipedia.org/wiki/Matthew_McConaughey"
  },
  {
      "id": "A8",
      "first_name": "Anne",
      "last_name": "Hathaway",
      "role_type": "ACTRESS",
      "profile_description": "Anne Jacqueline Hathaway is an American actress and singer. One of the world's highest-paid actresses in 2015, she has received multiple awards, including an Academy Award, a Golden Globe, a British Academy Film Award, and an Emmy. Her films have earned $6.4 billion worldwide, and she appeared in the Forbes Celebrity 100 in 2009.",
      "profile_url": "https://upload.wikimedia.org/wikipedia/commons/b/bd/Anne_Hathaway_in_2017.png",
      "wiki_url": "https://en.wikipedia.org/wiki/Anne_Hathaway"
  },
  {
      "id": "A9",
      "first_name": "Rajkummar",
      "last_name": "Rao",
      "role_type": "ACTOR",
      "profile_description": "Rajkummar Rao, also known as Rajkumar Yadav, is an Indian actor. He has established a career in Hindi cinema and is the recipient of several awards, including a National Film Award, three Filmfare Awards, and an Asia Pacific Screen Award. He is cited in the media as one of the most talented actors of his generation.",
      "profile_url": "https://en.wikipedia.org/wiki/Rajkummar_Rao#/media/File:Rajkummar_Rao_World_Premiere_Newton_Zoopalast_Berlinale_2017_02.jpg",
      "wiki_url": "https://en.wikipedia.org/wiki/Rajkummar_Rao"
  },
  {
      "id": "A10",
      "first_name": "KayKay",
      "last_name": "Menon",
      "role_type": "ACTOR",
      "profile_description": "Kay Kay Menon is an Indian film, stage and television actor who works predominantly in Hindi cinema, and also in Gujarati, Tamil and Telugu cinema. He has also won the award for best actor for the film Shoonya from Festival of Arab and Asian cinema",
      "profile_url": "https://upload.wikimedia.org/wikipedia/commons/a/ac/Kay_Kay_Menon_at_libas_store.jpg",
      "wiki_url": "https://en.wikipedia.org/wiki/Kay_Kay_Menon"
  }
];
