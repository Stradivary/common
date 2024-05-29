import styled from 'styled-components';

export const BreadcrumbsContainer = styled.nav`
  width: 100%;
`;

export const BreadcrumbsWrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 6px;
  align-items: center;
  width: max-content;

  ${({ theme }) => theme.responsive.mobile`
			gap: ${theme.spacings.spacing02}
		`}
`;

export const BreadcrumbsItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.spacing03};

  ${({ theme }) => theme.responsive.mobile`
			gap: ${theme.spacings.spacing02}
		`}

  & > div > p {
    ${({ theme }) => theme.responsive.mobile`
			font-size: 1.2rem;
		`}

    &:hover {
      text-decoration: underline;
      text-underline-offset: 3px;
      text-decoration-color: ${({ theme, isEllipsis }) =>
        isEllipsis ? theme.colors.blue80 : 'inherit'};
    }

    &:active {
      color: ${({ theme, isDisabled }) =>
        isDisabled ? `${theme.colors.neutral40}` : `${theme.colors.blue80}`};
    }
  }
`;

export const ItemWrapper = styled.div`
  cursor: ${({ isDisabled }) => (isDisabled ? 'auto' : 'pointer')};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.spacing02};

  position: relative;
`;

export const DropdownWrapper = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: max-content;
  z-index: 99;

  #select-breadcrumbs-dropdown > div[class*='ControlWrapper-commons-service'] {
    display: none;
  }
`;
