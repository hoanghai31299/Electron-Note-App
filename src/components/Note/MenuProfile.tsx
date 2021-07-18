import React from 'react';
import { FaUser, FaUserFriends } from 'react-icons/fa';
import { GoSignOut } from 'react-icons/go';
import { useSelector } from 'react-redux';
import { signOut } from '../../database/authenticate';
import { IMainState } from '../../interface';
function MenuProfile({ open }: { open: boolean }) {
  const client = useSelector((state: IMainState) => state.client);

  const handleSignout = () => {
    signOut();
  };
  return (
    <div className={`menu-profile ${open && 'open'}`}>
      <div className="self-info p-4 d-flex flex-column justify-content-center align-items-center">
        <div className="avatar avatar-md mb-2">
          <img
            src={client?.photoURL}
            alt="avatar"
            className="w-100 cursor-pointer"
          />
        </div>
        <span className="name mb-1">
          {client?.displayName || 'Không có tên'}
        </span>
        <span className="email mb-1">{client?.email || 'Không có email'}</span>
      </div>
      <ul className="list-group">
        <li className="list-group-item cursor-pointer d-flex align-items-center">
          <FaUserFriends />
          <span className="ml-3">Bạn bè</span>
        </li>
        <li className="list-group-item cursor-pointer d-flex align-items-center">
          <FaUser />
          <span className="ml-3">Cập nhật tài khoản</span>
        </li>
        <li
          className="list-group-item cursor-pointer d-flex align-items-center"
          onClick={handleSignout}
        >
          <GoSignOut />
          <span className="ml-3">Đăng xuất</span>
        </li>
      </ul>
    </div>
  );
}

export default MenuProfile;
