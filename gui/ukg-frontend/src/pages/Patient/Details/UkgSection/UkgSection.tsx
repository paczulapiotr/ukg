import { useState } from "react";
import Readonly from "./Readonly";
import AddForm from "./AddForm";

type Props = { id: string };

const UkgSection = ({ id }: Props) => {
  const [addState, setAddState] = useState(false);

  return addState ? (
    <AddForm id={id} onCancel={() => setAddState(false)} />
  ) : (
    <Readonly id={id} addNew={() => setAddState(true)} />
  );
};

export default UkgSection;
