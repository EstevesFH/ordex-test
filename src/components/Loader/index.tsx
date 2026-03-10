import * as S from './styles'

interface LoaderProps {
  fullPage?: boolean
}

const Loader = ({ fullPage = false }: LoaderProps) => {
  return (
    <S.LoaderContainer $fullPage={fullPage}>
      <S.Spinner />
    </S.LoaderContainer>
  )
}

export { Loader }
