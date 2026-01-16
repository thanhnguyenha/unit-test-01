'use client';

import styled from 'styled-components';

const SidebarContainer = styled.aside`
  width: 250px;
  min-height: 100vh;
  background: #1a1a1a;
  padding: 24px 0;
  overflow-y: auto;
`;

const SidebarTitle = styled.h2`
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  padding: 0 24px;
  margin-bottom: 24px;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li<{ $isActive: boolean }>`
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${(props) => (props.$isActive ? '#667eea' : 'transparent')};
  color: ${(props) => (props.$isActive ? '#ffffff' : '#b0b0b0')};
  font-weight: ${(props) => (props.$isActive ? '600' : '400')};
  border-left: 3px solid ${(props) => (props.$isActive ? '#764ba2' : 'transparent')};

  &:hover {
    background: ${(props) => (props.$isActive ? '#667eea' : '#2a2a2a')};
    color: #ffffff;
  }
`;

interface MovieSidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const MovieSidebar = ({ activeCategory, onCategoryChange }: MovieSidebarProps) => {
  const categories = [
    { id: 'cinema', label: 'Phim chiếu rạp' },
    { id: 'series', label: 'Phim bộ' },
    { id: 'tv', label: 'Tivi' },
    { id: 'music', label: 'MV ca nhạc' },
  ];

  return (
    <SidebarContainer>
      <SidebarTitle>Danh Mục</SidebarTitle>
      <MenuList>
        {categories.map((category) => (
          <MenuItem
            key={category.id}
            $isActive={activeCategory === category.id}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.label}
          </MenuItem>
        ))}
      </MenuList>
    </SidebarContainer>
  );
};
