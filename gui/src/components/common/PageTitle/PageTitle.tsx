import { Button, Flex, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

type Props = { title: string; returnTo: string };

const PageTitle = ({ title, returnTo }: Props) => {
  const navigate = useNavigate();

  return (
    <Flex gap={"1rem"} justify="flex-start">
      {returnTo ? (
        <Button
          shape="circle"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(returnTo)}
        />
      ) : null}
      <Typography.Title level={4} style={{ margin: 0 }}>
        {title}
      </Typography.Title>
    </Flex>
  );
};

export default PageTitle;
