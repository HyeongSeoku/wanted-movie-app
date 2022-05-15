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
    bookMark: boolean
  }
  interface ISearchMovieCard {
    title: string
    year: number[]
    imdbID: string
    type: string
    poster: string
    bookMark: boolean
  }
}

export namespace ModalModule {
  interface IModalData {
    title: string
    year: number[]
    imdbID: string
    type: string
    poster: string
    bookMark: boolean
  }
}

export namespace movieCardModule {
  interface IMovieCardData {
    title: string
    year: number[]
    imdbID: string
    type: string
    poster: string
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

  interface IBookMarkCardData {
    title: string
    year: number[]
    imdbID: string
    type: string
    poster: string
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
