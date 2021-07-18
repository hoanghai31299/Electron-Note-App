import React, { FC } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { IMainState } from '../../interface';
import LogoPaiir from '../Common/LogoPaiir';

import '../../styles/Note/note_header.global.css';
import MenuProfile from './MenuProfile';
import useOutsideClick from '../../hooks/useOutsideClick';

const NoteHeader = () => {
  const client = useSelector((state: IMainState) => state.client);
  const [selfMenu, setSelfMenu] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  useOutsideClick(wrapperRef, () => setSelfMenu(false));
  return (
    <div className="header-container">
      <nav className="note-header row pt-2 pb-2">
        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-5 d-flex align-items-center">
          <div className="icon-hamburger cursor-pointer">
            <GiHamburgerMenu size={24} />
          </div>
          <div
            className="ml-3 d-flex align-items-center logo-paiir"
            title="Đi tới note của bạn"
          >
            <LogoPaiir className="cursor-pointer" size="md" />
            <span className="ml-2">PAIIR</span>
          </div>
        </div>
        <div className="search-bar col-lg-6 col-md-6 col-sm-5 col-xs-0 d-flex align-items-center position-relative">
          <div className="icon-search">
            <AiOutlineSearch size={24} />
          </div>
          <input
            className="form-control search-input pl-5"
            placeholder="Tìm kiếm"
          />
        </div>
        <div className="col-lg-3 col-md-3 col-sm-4 col-xs-5 d-flex justify-content-end">
          <div ref={wrapperRef} className="avatar">
            <img
              onClick={() => setSelfMenu(!selfMenu)}
              src={client?.photoURL}
              alt="avatar"
              className="w-100 cursor-pointer"
            />
            <MenuProfile open={selfMenu} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NoteHeader;
