import React from "react";

export default function Main(props) {
  return (
    <React.Fragment>
      <h2>Поиск/Последние</h2>
      <div>
        <input type="search" placeholder="Поиск..." />
      </div>
      <div>
          <h3>Последние книги</h3>
          <img src="https://gw.alipayobjects.com/zos/rmsportal/WmQeylAyWUNKmQIyoQGH.png" alt="" />
      </div>
    </React.Fragment>
  );
};
