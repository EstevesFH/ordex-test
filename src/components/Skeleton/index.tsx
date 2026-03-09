import React from 'react'
import styled, { keyframes } from 'styled-components'

interface SkeletonProps {
  width?: string
  height?: string
  borderRadius?: string
  variant?: 'text' | 'rectangular' | 'circular'
  count?: number
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '4px',
  variant = 'rectangular',
  count = 1
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'text':
        return { height: '16px', borderRadius: '4px' }
      case 'circular':
        return { width: height, borderRadius: '50%' }
      case 'rectangular':
      default:
        return { borderRadius }
    }
  }

  const variantStyles = getVariantStyles()

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonBox
          key={index}
          style={{
            width,
            height,
            ...variantStyles,
          }}
        />
      ))}
    </>
  )
}

export default Skeleton

// ========================================
// COMPONENTES PRÉ-CONFIGURADOS
// ========================================

export const SkeletonCard: React.FC = () => (
  <CardContainer>
    <Skeleton width="100%" height="120px" borderRadius="8px" />
    <div>
      <Skeleton width="70%" height="20px" />
      <Skeleton width="90%" height="16px" />
      <Skeleton width="50%" height="14px" />
    </div>
  </CardContainer>
)

export const SkeletonTable: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <TableContainer>
    <Skeleton width="100%" height="40px" borderRadius="8px" />
    {Array.from({ length: rows }).map((_, index) => (
      <TableRow key={index}>
        <Skeleton width="15%" height="16px" />
        <Skeleton width="25%" height="16px" />
        <Skeleton width="20%" height="16px" />
        <Skeleton width="30%" height="16px" />
        <Skeleton width="10%" height="16px" />
      </TableRow>
    ))}
  </TableContainer>
)

export const SkeletonList: React.FC<{ items?: number }> = ({ items = 3 }) => (
  <ListContainer>
    {Array.from({ length: items }).map((_, index) => (
      <ListItem key={index}>
        <Skeleton variant="circular" height="48px" />
        <div style={{ flex: 1 }}>
          <Skeleton width="60%" height="18px" />
          <Skeleton width="80%" height="14px" />
        </div>
        <Skeleton width="80px" height="32px" borderRadius="6px" />
      </ListItem>
    ))}
  </ListContainer>
)

// ========================================
// STYLED COMPONENTS
// ========================================

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`

const SkeletonBox = styled.div`
  background: linear-gradient(
    90deg,
    #f0f0f0 0%,
    #f8f8f8 50%,
    #f0f0f0 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
  margin-bottom: 8px;
`

const CardContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const TableContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const TableRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
`

const ListContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`

const ListItem = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }
`
