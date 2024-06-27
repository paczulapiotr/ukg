import { Button, message } from "antd";
import React, { useState } from "react";
import { save } from "@tauri-apps/api/dialog";
import { writeBinaryFile } from "@tauri-apps/api/fs";
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
        responseType: "blob",
      });
      const blob = response.data;
      const reader = new FileReader();
      reader.readAsArrayBuffer(blob);

      const loadPromise = new Promise((resolve) => {
        reader.onloadend = async () => {
          const buffer = reader.result;

          // Use Tauri's save dialog to get path
          const path = await save({
            defaultPath: fileName,
          });

          if (!path) {
            resolve(false);
          } else {
            // Use Tauri's writeFile API to save the PDF
            await writeBinaryFile(path, buffer as ArrayBuffer);
            resolve(true);
          }
        };
      });

      const result = await loadPromise;
      if (result) {
        message.success("Plik został pobrany");
      }
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
