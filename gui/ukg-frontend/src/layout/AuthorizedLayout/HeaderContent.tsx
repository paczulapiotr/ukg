import { Button, Flex, Typography } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";

const zoomOptions = [0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3];
const zoomMaxOpt = zoomOptions.length - 1;
const zoomLocalStorageKey = "zoom";

let defaultZoom = Number.parseInt(
  localStorage.getItem(zoomLocalStorageKey) ?? "2"
);

if (isNaN(defaultZoom)) {
  defaultZoom = 2;
}

const setApplicationZoom = (zoom: number) => {
  // @ts-expect-error
  document.body.style.zoom = zoom;
};

const HeaderContent = () => {
  const [zoom, setZoom] = useState(defaultZoom);
  const [zoomVisible, setZoomVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setApplicationZoom(zoomOptions[zoom]);
  }, []);

  const changeZoom = (zoomDiff: number) => {
    if (zoom + zoomDiff >= 0 && zoom + zoomDiff <= zoomMaxOpt) {
      const newZoom = zoom + zoomDiff;
      setZoom(newZoom);
      setApplicationZoom(zoomOptions[newZoom]);
      localStorage.setItem(zoomLocalStorageKey, String(newZoom));
    }

    setZoomVisible(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setZoomVisible(false);
    }, 2000);
  };

  return (
    <Flex flex={1} justify="flex-end">
      <Typography.Text
        hidden={!zoomVisible}
        style={{ marginRight: "1rem" }}
      >{`Powiększenie ${zoomOptions[zoom] * 100}%`}</Typography.Text>
      <Button
        icon={<PlusOutlined />}
        size="small"
        onClick={() => changeZoom(1)}
        type="text"
      />
      <Button
        icon={<MinusOutlined />}
        size="small"
        onClick={() => changeZoom(-1)}
        type="text"
      />
    </Flex>
  );
};

export default HeaderContent;
