import React from "react";

const Image = React.memo(({ src, alt }) => {
	return <img src={src} alt={alt || ""} />;
});

export default Image;
