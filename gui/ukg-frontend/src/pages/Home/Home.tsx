import { useAuth } from "@/auth/AuthProvider/useAuth";
import { Flex, Typography } from "antd";

const Home = () => {
  const {
    auth: { user },
  } = useAuth();
  return (
    <Flex justify="center">
      <Typography.Text>{`Witaj ${user?.fullName}!`}</Typography.Text>
    </Flex>
  );
};

export default Home;
