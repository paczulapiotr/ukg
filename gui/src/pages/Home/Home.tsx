import { useAuth } from "@/auth/AuthProvider/useAuth";
import { Flex, Typography } from "antd";
import DoctorSvg from "@/assets/doctor.svg";

const Home = () => {
  const {
    auth: { user },
  } = useAuth();
  return (
    <Flex justify="center" vertical align="center">
      <Typography.Title
        level={1}
      >{`Witaj ${user?.fullName}!`}</Typography.Title>
      <img src={DoctorSvg} width={400} />
    </Flex>
  );
};

export default Home;
