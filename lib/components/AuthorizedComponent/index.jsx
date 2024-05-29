import PropTypes from 'prop-types';
import useAuthStore from '../../hooks/zustand/auth.store';

export const AuthorizedComponent = ({ menuId, children }) => {
  const { userAuth } = useAuthStore();
  const authMenus = userAuth?.userData?.user?.menus || [];
  const isAuthorized = authMenus.some((item) => item.menu_id === menuId);

  if (!isAuthorized) return null;

  return children;
};

AuthorizedComponent.propTypes = {
  menuId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
