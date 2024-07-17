import { AutoComplete, Form, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { UkgExaminationForm } from "../../models";
import styles from "./Input.module.scss";
import classNames from "classnames";

export type OptionType = {
  label: React.ReactNode;
  value?: string | number | null;
};

type Props = {
  name: keyof UkgExaminationForm;
  required?: boolean;
  onSearch?: (value: string) => void;
  options?: OptionType[];
};

const AutocompleteInput = ({ name, onSearch, options, required }: Props) => {
  const { t } = useTranslation("form");

  return (
    <>
      <Typography.Text className={classNames(styles.label, "focusable")}>{`${t(
        name
      )}:`}</Typography.Text>
      <Form.Item
        name={name}
        className={classNames(styles.input, "focusable")}
        required={required}
        rules={[{ required, message: t(`${name}_error`) }]}
      >
        <AutoComplete
          placeholder={t(name)}
          options={options}
          onSearch={onSearch}
        />
      </Form.Item>
    </>
  );
};

export default AutocompleteInput;
