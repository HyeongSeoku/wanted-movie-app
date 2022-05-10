export namespace componentsData {
  interface INavProps {
    id: string
    title: string
    icon: React.JSXElementConstructor
    path: string
  }
}

export namespace ApiResData {
  interface ISearchMovieData {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
  }
}
