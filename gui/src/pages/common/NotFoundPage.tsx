import { Button, Flex, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Flex justify="center" flex={1}>
      <Result
        status="404"
        title="404"
        subTitle="Przepraszamy, strona, której szukasz, nie istnieje."
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            {"Wróć"}
          </Button>
        }
      />
    </Flex>
  );
};

export default NotFoundPage;
