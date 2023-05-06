import {
  Autocomplete,
  Button,
  Flex,
  Group,
  Kbd,
  Notification,
  Select,
  SimpleGrid,
  Text,
  TextInput,
  Transition,
  UnstyledButton,
  createStyles,
} from "@mantine/core";
import {
  IconCheck,
  IconExclamationCircle,
  IconSend,
} from "@tabler/icons-react";
import * as Yup from "yup";
import React, { useState } from "react";
import { useForm, yupResolver } from "@mantine/form";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer"),
  sex: Yup.string().required("Sex is required"),
  mobile: Yup.string().test(
    "is-valid",
    "Mobile number must be a valid Indian mobile number",
    function (value) {
      const { createError } = this;
      if (!value || value.trim() === "") {
        return true; // Field is optional, no validation needed
      }
      const mobileNumberRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
      return mobileNumberRegex.test(value) || createError();
    }
  ),
  emergencyContact: Yup.string().test(
    "is-valid",
    "Mobile number must be a valid Indian mobile number",
    function (value) {
      const { createError } = this;
      if (!value || value.trim() === "") {
        return true; // Field is optional, no validation needed
      }
      const mobileNumberRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
      return mobileNumberRegex.test(value) || createError();
    }
  ),
  idType: Yup.string(),
  govtId: Yup.string().when("idType", {
    is: "Aadhar",
    then: (schema) =>
      schema.test(
        "is-valid",
        "Aadhar number must be 12 digits",
        function (value) {
          const { createError } = this;
          if (!value || value.trim() === "") {
            return true; // Field is optional, no validation needed
          }
          return /^\d{12}$/.test(value) || createError();
        }
      ),
    otherwise: (schema) =>
      schema.test(
        "is-valid",
        "PAN number must be 10 alphanumeric characters",
        function (value) {
          const { createError } = this;
          if (!value || value.trim() === "") {
            return true; // Field is optional, no validation needed
          }
          return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value) || createError();
        }
      ),
  }),
});

const useStyles = createStyles((theme) => ({
  glassmorphism: {
    backgroundColor: "rgba( 255,255,255, 0.5)",
    backdropFilter: "blur(10px)",
    webkitBackdropFilter: "blur(10px)",
    borderRadius: "10px",
    border: "1px solid rgba( 255,255,255, 0.5)",
  },
}));

const RegistrationForm = ({ onClose }) => {
  const { classes } = useStyles();
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const form = useForm({
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
    validateInputOnBlur: true,
    validate: yupResolver(schema),
    initialValues: {
      name: "",
      age: "",
      sex: "",
      mobile: undefined,
      idType: undefined,
      govtId: undefined,
      gaurdianLabel: undefined,
      gaurdianName: undefined,
      email: undefined,
      emergencyContact: undefined,
      address: undefined,
      state: undefined,
      city: undefined,
      country: undefined,
      pincode: undefined,
      occupation: undefined,
      religion: undefined,
      maritalStatus: undefined,
      bloodGroup: undefined,
      nationality: undefined,
    },

    transformValues: (values) => {
      values.gaurdian = values.gaurdianName
        ? `${values.gaurdianLabel} ${values.gaurdianName}`
        : undefined;
      delete values.gaurdianLabel;
      delete values.gaurdianName;
      return {
        ...values,
      };
    },
  });

  const submitForm = async (values) => {
    try {
      setLoading(true);

      const res = await fetch("api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      setSubmitError(null);
      setNotify(true);
      form.reset();
      console.log(data);
    } catch (error) {
      // TODO: Handle error display to the user
      setSubmitError(`${error}`);
      setNotify(true);
      console.error("Error submitting form: ", error);
    } finally {
      setTimeout(() => {
        setNotify(false);
      }, 2000);
      // setSubmitError(null);
      setLoading(false);
    }
  };

  return (
    <Flex
      direction={"column"}
      w={"100%"}
      h={"100%"}>
      <form
        onSubmit={form.onSubmit((values) => {
          // console.log("values subbed");
          // form.reset;
          submitForm(values);
        })}>
        <Text
          underline
          fw={"bold"}>
          Personal Details
        </Text>
        <SimpleGrid
          breakpoints={[
            { minWidth: "xs", cols: 2 },
            { minWidth: "md", cols: 3 },
            { minWidth: 1200, cols: 4 },
          ]}>
          <TextInput
            disabled={loading}
            data-autofocus
            label='Name'
            required
            placeholder='Enter Name'
            {...form.getInputProps("name")}
          />
          <TextInput
            disabled={loading}
            label='Date of Birth or Age'
            required
            placeholder='Enter Age in Years'
            {...form.getInputProps("age")}
          />
          <Select
            disabled={loading}
            label='Sex'
            required
            placeholder='Select your Sex'
            data={["Male", "Female"]}
            clearable
            {...form.getInputProps("sex")}
          />
          <TextInput
            disabled={loading}
            label='Mobile'
            placeholder='Enter Mobile'
            clearErrorsOnChange
            {...form.getInputProps("mobile")}
          />
          <Flex align={"flex-end"}>
            <Select
              disabled={loading}
              w={"40%"}
              label='Govt Issued ID'
              placeholder='Select ID Type'
              data={["Aadhar", "PAN"]}
              {...form.getInputProps("idType")}
            />
            <TextInput
              display={"flex"}
              mb={form.errors.govtId ? "calc(-0.625rem / 2)" : 0}
              //   label='Id Number'
              disabled={!form.values.idType || loading}
              placeholder={
                form.values.idType
                  ? `Enter ${form.values.idType} Number`
                  : "Choose ID Type"
              }
              {...form.getInputProps("govtId")}
            />
          </Flex>
        </SimpleGrid>
        <Text
          underline
          fw={"bold"}>
          Contact Details
        </Text>

        <SimpleGrid
          breakpoints={[
            { minWidth: "xs", cols: 2 },
            { minWidth: "md", cols: 3 },
            { minWidth: 1200, cols: 4 },
          ]}>
          <Flex align={"flex-end"}>
            <Select
              disabled={loading}
              w={"45%"}
              label='Gaurdian Details'
              placeholder='Label'
              data={["Mr.", "Mrs."]}
              {...form.getInputProps("gaurdianLabel")}
            />
            <TextInput
              disabled={
                (!form.values.gaurdian && !form.values.gaurdianLabel) || loading
              }
              placeholder={
                form.values.gaurdianLabel
                  ? "Enter Gaudian Name"
                  : "First select Label"
              }
              {...form.getInputProps("gaurdianName")}
            />
          </Flex>
          <TextInput
            disabled={loading}
            label='Email'
            placeholder='Enter Email'
            {...form.getInputProps("email")}
          />
          <TextInput
            disabled={loading}
            label='Emergency Contact Number'
            placeholder='Enter Emergency No'
            {...form.getInputProps("emergencyContact")}
          />
        </SimpleGrid>
        <Text
          underline
          fw={"bold"}>
          Address Details
        </Text>

        <SimpleGrid
          breakpoints={[
            { minWidth: "xs", cols: 2 },
            { minWidth: "md", cols: 3 },
            { minWidth: 1200, cols: 4 },
          ]}>
          <TextInput
            disabled={loading}
            label='Address'
            placeholder='Enter Address'
            {...form.getInputProps("address")}
          />
          <Autocomplete
            disabled={loading}
            label='State'
            placeholder='Select or Enter State'
            data={[
              "Uttar Pradesh",
              "Bangalore",
              "Mumbai",
              "Pune",
              "Delhi",
              "Gujrat",
            ]}
            {...form.getInputProps("state")}
          />
          <Autocomplete
            disabled={loading}
            label='City'
            placeholder='Select or Enter City'
            data={[
              "Kanpur",
              "Lucknow",
              "Agra",
              "Mathura",
              "Prajagraj",
              "Rampur",
            ]}
            {...form.getInputProps("city")}
          />
          <Select
            disabled={loading}
            clearable
            label='Country'
            placeholder='India'
            data={["India"]}
            {...form.getInputProps("country")}
          />
          <TextInput
            disabled={loading}
            label='Pincode'
            placeholder='Enter Area Pincode'
            {...form.getInputProps("pincode")}
          />
        </SimpleGrid>
        <Text
          underline
          fw={"bold"}>
          Other Details
        </Text>

        <SimpleGrid
          breakpoints={[
            { minWidth: "xs", cols: 2 },
            { minWidth: "md", cols: 3 },
            { minWidth: 1200, cols: 4 },
          ]}>
          <TextInput
            disabled={loading}
            label='Occupation'
            placeholder='Enter Occupation'
            {...form.getInputProps("occupation")}
          />
          <Autocomplete
            disabled={loading}
            label='Religion'
            placeholder='Select or Enter Religion'
            data={["Hindu", "Jain", "Muslim", "Christian", "Sikh"]}
            {...form.getInputProps("religion")}
          />
          <Select
            disabled={loading}
            clearable
            label='Marital Status'
            placeholder='Select Marital Status'
            data={["Single", "Married", "Divorced", "Widowed"]}
            {...form.getInputProps("maritalStatus")}
          />
          <Select
            disabled={loading}
            clearable
            label='Blood Group'
            placeholder='Select Blood Group'
            data={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
            {...form.getInputProps("bloodGroup")}
          />
          <Select
            disabled={loading}
            clearable
            label='Nationality'
            placeholder='Indian'
            data={["Indian"]}
            {...form.getInputProps("nationality")}
          />
        </SimpleGrid>
        <Transition
          mounted={notify}
          duration={800}
          exitDuration={500}
          timingFunction='ease-in'
          transition={"slide-down"}>
          {(styles) => (
            <Notification
              onClose={() => setNotify(false)}
              style={{
                ...styles,
                position: "absolute",
                bottom: 10,
                left: 5,
                zIndex: 300,
              }}
              icon={
                submitError ? (
                  <IconExclamationCircle color='red' />
                ) : (
                  <IconCheck />
                )
              }
              // withBorder
              color={submitError ? "dark" : "teal"}
              radius='md'
              title={
                submitError
                  ? "Submition Failed! Try Again."
                  : "Registration Successful!"
              }>
              {submitError ? submitError : "Thanks for joining us!"}
            </Notification>
          )}
        </Transition>
        <Group
          position='right'
          p={20}>
          <UnstyledButton
            onClick={onClose}
            p={5}
            sx={{
              borderRadius: 5,
              color: "black",
              fontWeight: "500",
              "&:hover": {
                zoom: 1.02,
                color: "whitesmoke",
                backgroundColor: "rgba(252, 3, 3,1)",
                textTransform: "uppercase",
              },
            }}
            bg={"rgba(179,105,156,0.6)"}
            disabled={loading}
            className={classes.glassmorphism}>
            Cancel
            <Kbd
              ml={2}
              bg={"rgba(252, 3, 3)"}
              c={"black"}
              size='lg'>
              Esc
            </Kbd>
          </UnstyledButton>
          <Button
            loading={loading}
            type='submit'
            // c={"dark"}
            variant='gradient'
            gradient={{ from: "#be4c46", to: "#f9be0b" }}
            leftIcon={<IconSend />}
            rightIcon={
              <>
                <Kbd>⌘</Kbd> + <Kbd>s</Kbd>
              </>
            }
            // color='teal'
          >
            SUBMIT
          </Button>
        </Group>
      </form>
    </Flex>
  );
};

export default RegistrationForm;
