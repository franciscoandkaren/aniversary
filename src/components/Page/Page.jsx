import React from "react";
import "./Page.css";

const Page = ({
  content,
  flipping,
  pageNumber,
  totalPages,
  isActive,
  children,
}) => {
  return (
    <div
      className={`page ${flipping ? "flipping" : ""} ${
        isActive ? "active" : ""
      }`}
    >
      <div className="page-3d-effect">
        <div className="page-front">
          <div className="page-content">
            {content && (
              <>
                <h2>{content.title}</h2>
                <p>{content.content}</p>
              </>
            )}
            {children}
            {/* <div className="page-number">
              {pageNumber}/{totalPages}
            </div> */}
          </div>
          <div className="page-edge-light"></div>
        </div>
        <div className="page-back"></div>
      </div>
    </div>
  );
};

export default Page;