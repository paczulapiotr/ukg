import { Input, Typography } from "antd";
import styles from "./NumberSection.module.scss";

type Props = {};

const NumberSection = ({}: Props) => {
  return (
    <div className={styles["grid-container"]}>
      <>
        <Typography>LVs:</Typography>
        <Input placeholder="LVs" />
      </>
      <>
        <Typography>LVd:</Typography>
        <Input placeholder="LVd" />
      </>
      <>
        <Typography>IVSs:</Typography>
        <Input placeholder="IVSs" />
      </>
      <>
        <Typography>IVSd:</Typography>
        <Input placeholder="IVSd" />
      </>
      <>
        <Typography>LVPWs:</Typography>
        <Input placeholder="LVPWs" />
      </>
      <>
        <Typography>LVPWd:</Typography>
        <Input placeholder="LVPWd" />
      </>
    </div>
  );
};

export default NumberSection;
