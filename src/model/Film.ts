export default interface Film {
    filmId: string;
    title: string;
    episode_id: number; 
    opening_crawl: string;
    director: string; 
    producer: string;
    release_date: string; 
    species: string[]; 
    starships: string[];  
    vehicles: string[];  
    characters: string[]; 
    planets: string[]; 
    url: string; 
    created: String; 
    edited: string; 
}