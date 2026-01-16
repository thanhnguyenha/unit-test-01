import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
  min-height: 100vh;
  background: #0f0f0f;
  flex: 1;
`;

export const Header = styled.div`
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  color: #ffffff;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
`;

export const SearchAndFilter = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 12px 16px;
  border: 2px solid #2a2a2a;
  border-radius: 8px;
  font-size: 16px;
  background: #1a1a1a;
  color: #ffffff;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #666;
  }
`;

export const FilterSelect = styled.select`
  padding: 12px 16px;
  border: 2px solid #2a2a2a;
  border-radius: 8px;
  font-size: 16px;
  background: #1a1a1a;
  color: #ffffff;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  option {
    background: #1a1a1a;
    color: #ffffff;
  }
`;

export const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

export const MovieCard = styled.div`
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
  }
`;

export const MoviePoster = styled.div`
  width: 100%;
  height: 280px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 48px;
  font-weight: 700;
`;

export const MovieInfo = styled.div`
  padding: 16px;
`;

export const MovieTitle = styled.h3`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MovieMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #b0b0b0;
`;

export const Rating = styled.span`
  color: #ffd700;
  font-weight: 600;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 32px;
`;

export const PageButton = styled.button<{ $isActive?: boolean; $disabled?: boolean }>`
  padding: 8px 16px;
  border: 2px solid ${(props) => (props.$isActive ? '#667eea' : '#2a2a2a')};
  border-radius: 8px;
  background: ${(props) => (props.$isActive ? '#667eea' : '#1a1a1a')};
  color: ${(props) => (props.$isActive ? '#ffffff' : '#b0b0b0')};
  font-size: 14px;
  font-weight: ${(props) => (props.$isActive ? '600' : '400')};
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;
  opacity: ${(props) => (props.$disabled ? '0.5' : '1')};

  &:hover:not(:disabled) {
    border-color: #667eea;
    color: #ffffff;
  }
`;

export const ResultsCount = styled.p`
  color: #b0b0b0;
  font-size: 14px;
  margin-bottom: 16px;
`;
