import React, { useState, useEffect } from 'react';
import { Image } from 'poizon-design';

interface DetailApp {
  url: string;
  children: JSX.Element;
}

export function PreviewImage(props: DetailApp) {
  const { children, url } = props;
  const [child, setChild] = useState<JSX.Element>();
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  useEffect(() => {
    const childEle = React.cloneElement(children, {
      ...children.props,
      onClick: () => {
        showModal();
      },
    });
    setChild(childEle);
  }, [children, children.props]);

  return (
    <>
      {child}
      <Image
        width={200}
        className="hidden"
        src={url}
        preview={{
          visible,
          src: url,
          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
      />
    </>
  );
}
