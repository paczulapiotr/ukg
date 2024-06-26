import { formLayout, formStyle } from "@/common/form";
import Container from "@/components/common/Container";
import { PatientForm } from "@/models";
import { Divider, Flex, Form, Typography } from "antd";
import FormItems from "../Upsert/FormItems";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import styles from "./Details.module.scss";
import useGetPatient from "@/queries/useGetPatient";
import UkgSection from "./UkgSection/UkgSection";

const Details = () => {
  const [form] = Form.useForm<PatientForm>();
  const { id } = useParams<{ id: string }>();
  const { data: patient, isLoading } = useGetPatient(id);

  const patientForm: PatientForm | undefined =
    patient == null
      ? undefined
      : {
          BirthdayDate: dayjs(patient.birthday),
          FirstName: patient.firstName,
          LastName: patient.lastName,
          Pesel: patient.pesel,
          ID: patient.id,
        };

  return (
    <Flex vertical flex={1}>
      {isLoading ? (
        <Typography.Text>{"Ładowanie..."}</Typography.Text>
      ) : (
        <>
          <section>
            <Form
              {...formLayout}
              className={styles.readonly}
              initialValues={patientForm}
              disabled={true}
              form={form}
              name="add-patient"
              style={formStyle}
            >
              <Container name={"details"}>
                <FormItems readonly />
              </Container>
            </Form>
            <Divider />
          </section>
          <UkgSection id={id!} />
        </>
      )}
    </Flex>
  );
};

export default Details;
