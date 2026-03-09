import * as S from './styles'

interface LoaderProps {
  fullPage?: boolean
}

const Loader = ({ fullPage = false }: LoaderProps) => {
  return (
    <S.LoaderContainer>
      <S.Wrapper $fullPage={fullPage}>
        <S.Spinner />
      </S.Wrapper>
    </S.LoaderContainer>
  )
}

export { Loader }
