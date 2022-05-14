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

  interface IAdditionalData {
    totalResults: number
    lastPageNumber: number
  }
}

export namespace SearchInputModule {
  interface ISearchInput {
    searchWord: string
    setSearchWord: React.Dispatch<React.SetStateAction<string>>
  }
}

export namespace SearchModule {
  interface ISearchMovieList {
    title: string
    year: number[]
    imdbID: string
    type: string
    poster: string
    bookmarked: boolean
  }
  interface ISearchMovieCard {
    title: string
    year: number[]
    imdbID: string
    type: string
    poster: string
    bookmarked: boolean
  }
}

export namespace ModalModule {
  interface IModalData {
    title: string
    year: number[]
    imdbID: string
    type: string
    poster: string
    bookmarked: boolean
  }
}

export namespace movieCardModule {
  interface IMovieCardData {
    title: string
    year: number[]
    imdbID: string
    type: string
    poster: string
    bookmarked: boolean
  }
}

export namespace BookMarkModule {
  interface IBookMarkModule {
    title: string
    year: number[]
    imdbID: string
    type: string
    poster: string
    bookmarked?: boolean
  }
}

export namespace LocalStorageModule {
  interface ILocalStorageData {
    title: string
    year: number[]
    imdbID: string
    type: string
    poster: string
  }
}
