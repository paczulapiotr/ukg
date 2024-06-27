import { Button, message } from "antd";
import React, { useState } from "react";
import fileDownload from "js-file-download";
import instance from "@/services/api";

type Props = {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  url: string;
  fileName: string;
};

const DownloadButton = ({ icon, children, url, fileName }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const onDownload = async () => {
    try {
      setIsLoading(true);
      const response = await instance.get(url, {
        headers: { Accept: "application/pdf" },
        responseType: "blob",
      });
      fileDownload(response.data, `${fileName}.pdf`);
      message.success("Plik został pobrany");
    } catch (error) {
      console.error(error);
      message.error("Wystąpił błąd podczas pobierania pliku");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      icon={icon}
      loading={isLoading}
      disabled={isLoading}
      onClick={onDownload}
    >
      {children}
    </Button>
  );
};

export default DownloadButton;
