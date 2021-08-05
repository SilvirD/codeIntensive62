class Films {
  constructor(
    filmName,
    imageURL,
    banner,
    releaseYear,
    description,
    filmStatus,
    genre,
    country,
    directors,
    actors,
    view,
    vote,
    age,
    href,
    time,
    comment_ids
  ) {
    this.filmName = filmName;
    this.imageURL = imageURL;
    this.banner = banner;
    this.releaseYear = releaseYear;
    this.description = description;
    this.filmStatus = filmStatus;
    this.genre = genre;
    this.country = country;
    this.directors = directors;
    this.actors = actors;
    this.view = view;
    this.vote = vote;
    this.age = age;
    this.href = href;
    this.time = time;
    this.comment_ids = comment_ids;
  }
}
export default Films;
