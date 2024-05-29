import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Wrapper = styled.div`
  .react-checkbox-tree {
    ol {
      font-family: 'Poppins', Arial, Helvetica, sans-serif;
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 150%;
      color: ${theme.colors.neutral80};
    }

    li.rct-node.rct-node-parent.rct-node-expanded {
      font-weight: 600;
    }

    input {
      &:focus {
        outline: none;
      }
      &:active {
        outline: none;
      }
    }

    .rct-text {
      display: flex;
      flex-direction: row;
      gap: 8px;
      align-items: center;
      margin-bottom: ${theme.spacings.spacing05};

      button {
        order: 3;
      }

      label {
        display: flex;
        flex-direction: row;
        gap: 8px;
        align-items: center;
        order: 1;
      }

      span.rct-node-clickable {
        order: 2;
        display: flex;
        flex-direction: row;
        gap: 8px;

        &:hover,
        &:active,
        &:focus {
          background: transparent !important;
        }
      }
    }

    ol li.rct-node > ol > li.rct-node-parent {
      > span > span.rct-node-clickable > span.rct-node-icon,
      .rct-icon.rct-icon-leaf,
      ol > li > span > span.rct-node-clickable > span.rct-node-icon {
        display: none;
      }
    }

    ol
      > li.rct-node.rct-node-parent
      > ol
      > li.rct-node.rct-node-leaf
      > span
      > span.rct-node-clickable
      > span.rct-node-icon {
      display: none;
    }

    label:hover {
      background: transparent !important;
    }

    span.rct-collapse {
      display: none;
    }

    .rct-title {
      color: ${theme.colors.neutral80};
      padding: 0;
    }

    .rct-node-icon,
    .rct-checkbox {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }

    .rct-collapse {
      padding: 0;
    }

    .rct-disabled > .rct-text > label {
      cursor: not-allowed;
      opacity: 1;
    }

    .rct-checkbox * {
      display: inline-block;
      margin: 0;
      width: 24px;
      height: 24px;
    }
    .rct-collapse * {
      display: inline-block;
      margin: 0;
      width: 16px;
      height: 16px;
    }

    .rct-node-icon * {
      display: inline-block;
      margin: 0;
      width: 20px;
      height: 20px;
    }
  }
`;
