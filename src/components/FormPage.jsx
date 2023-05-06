import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./FormPage.module.css";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  age: Yup.string()
    .required("Age is required")
    .test("positive", "Age must be a positive integer", (value) => {
      if (!value) {
        return true; // Allow empty value to be handled by the 'required' validation
      }
      return /^[1-9][0-9]*$/.test(value); // Checks if the value is a positive integer
    }),
  sex: Yup.string().required("Sex is required"),
  mobile: Yup.string().test(
    "is-valid-indian-mobile",
    "Mobile number must be a valid Indian mobile number",
    (value) => {
      if (!value) {
        // allow empty value
        return true;
      }
      return /^(?:\+91|0)?[6-9]\d{9}$/.test(value);
    }
  ),
  emergencyContact: Yup.string().test(
    "is-valid-indian-mobile",
    "Must be a valid Indian mobile number",
    (value) => {
      if (!value) {
        // allow empty value
        return true;
      }
      return /^(?:\+91|0)?[6-9]\d{9}$/.test(value);
    }
  ),
  idType: Yup.string(),
  govtId: Yup.string().when("idType", {
    is: "Aadhar",
    then: (schema) =>
      schema.matches(/^\d{12}$/, "Aadhar number must be 12 digits"),
    otherwise: (schema) =>
      schema.matches(
        /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
        "PAN number must be 10 alphanumeric characters"
      ),
  }),
});

export default function FormPage({ onClose }) {
  const { register, handleSubmit, formState, watch, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  const onSubmit = async (data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "")
    );
    if (filteredData.gaurdianLabel && filteredData.gaurdianName) {
      filteredData.gaurdian =
        filteredData.gaurdianLabel + " " + filteredData.gaurdianName;
      delete filteredData.gaurdianLabel;
      delete filteredData.gaurdianName;
    }
    try {
      const response = await fetch("api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredData),
      });
      const responseData = await response.json();
      console.log(responseData);
      reset(); // Reset the form fields
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className={styles.formContainer}
      onSubmit={handleSubmit(onSubmit)}>
      <h3>Personal Details</h3>
      <section className={styles.formSection}>
        <label
          data-autofocus
          className={`${styles.formLabel} ${styles.required}`}>
          Name:
          <input
            placeholder='Enter Name'
            required
            className={`${styles.formInput}`}
            {...register("name")}
          />
          {errors.name && (
            <span className={styles.formError}>{errors.name.message}</span>
          )}
        </label>
        <label className={styles.formContainer}>
          Age:
          <input
            placeholder='Enter Age'
            className={styles.formInput}
            {...register("age")}
          />
          {errors.age && (
            <span className={styles.formError}>{errors.age.message}</span>
          )}
        </label>
        <label className={styles.formContainer}>
          Sex:
          <select
            className={styles.formSelect}
            {...register("sex")}>
            <option value=''>Select Sex</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
          {errors.sex && (
            <span className={styles.formError}>{errors.sex.message}</span>
          )}
        </label>
        <label className={styles.formContainer}>
          Mobile:
          <input
            placeholder='Enter Mobile No'
            className={styles.formInput}
            {...register("mobile")}
          />
          {errors.mobile && (
            <span className={styles.formError}>{errors.mobile.message}</span>
          )}
        </label>
        <label className={styles.formContainer}>
          ID Type:
          <select
            className={styles.formSelect}
            {...register("idType")}>
            <option value=''>Select ID Type</option>
            <option value='Aadhar'>Aadhar</option>
            <option value='PAN'>PAN</option>
          </select>
        </label>
        <label className={styles.formContainer}>
          Govt Id:
          <input
            placeholder='Enter Govt ID No.'
            className={styles.formInput}
            {...register("govtId", { nullable: true })}
            disabled={!watch("idType")}
          />
          {errors.govtId && (
            <span className={styles.formError}>{errors.govtId.message}</span>
          )}
        </label>
      </section>
      <h3>Contact Details</h3>
      <section className={styles.formSection}>
        <label className={styles.formContainer}>
          Gaurdian Details:
          <select
            className={styles.formSelect}
            {...register("gaurdianLabel")}>
            <option value=''>Select Label</option>
            <option value='Mr.'>Mr.</option>
            <option value='Mrs.'>Mrs.</option>
          </select>
        </label>
        <label className={styles.formContainer}>
          Gaurdian Name:
          <input
            placeholder='Enter Gaurdian Name'
            className={styles.formInput}
            {...register("gaurdianName")}
            disabled={!watch("gaurdianLabel")}
          />
        </label>
        <label className={`${styles.formLabel} ${styles.required}`}>
          Email:
          <input
            placeholder='Enter Email'
            className={`${styles.formInput}`}
            {...register("email")}
          />
        </label>
        <label className={styles.formContainer}>
          Emergency Contact Number:
          <input
            placeholder='Enter Emergency No'
            className={styles.formInput}
            {...register("emergencyContact")}
          />
          {errors.emergencyContact && (
            <span className={styles.formError}>
              {errors.emergencyContact.message}
            </span>
          )}
        </label>
      </section>
      <h3>Address Details</h3>
      <section className={styles.formSection}>
        <label className={styles.formContainer}>
          Address:
          <input
            placeholder='Enter Address'
            className={styles.formInput}
            {...register("address")}
          />
        </label>
        <label className={styles.formContainer}>
          State:
          <input
            placeholder='Enter State'
            className={styles.formInput}
            {...register("state")}
            list='stateList'
          />
          <datalist id='stateList'>
            <option value='Uttar Pradesh' />
            <option value='Bangalore' />
            <option value='Mumbai' />
            <option value='Pune' />
            <option value='Delhi' />
            <option value='Gujrat' />
          </datalist>
        </label>
        <label className={styles.formContainer}>
          City:
          <input
            placeholder='Enter City'
            className={styles.formInput}
            {...register("city")}
            list='cityList'
          />
          <datalist id='cityList'>
            <option value='Kanpur' />
            <option value='Lucknow' />
            <option value='Agra' />
            <option value='Mathura' />
            <option value='Prajagraj' />
            <option value='Rampur' />
          </datalist>
        </label>
        <label className={styles.formContainer}>
          Country:
          <select
            className={styles.formSelect}
            {...register("country")}>
            <option value='India'>India</option>
          </select>
        </label>
        <label className={styles.formContainer}>
          Pincode:
          <input
            placeholder='Enter Pincode'
            className={styles.formInput}
            {...register("pincode")}
          />
        </label>
      </section>
      <section>
        <h3>Other Details</h3>
        <div className={styles.formSection}>
          <label className={styles.formContainer}>
            Occupation:
            <input
              placeholder='Enter Occupation'
              className={styles.formInput}
              {...register("occupation")}
            />
          </label>
          <label className={styles.formContainer}>
            Religion:
            <input
              placeholder='Enter Religion'
              className={styles.formInput}
              {...register("religion")}
              list='religionOptions'
            />
            <datalist id='religionOptions'>
              <option value='Hindu' />
              <option value='Jain' />
              <option value='Muslim' />
              <option value='Christian' />
              <option value='Sikh' />
            </datalist>
          </label>
          <label className={styles.formContainer}>
            Marital Status:
            <select
              className={styles.formSelect}
              {...register("maritalStatus")}>
              <option value=''>Select Marital Status</option>
              <option value='Single'>Single</option>
              <option value='Married'>Married</option>
              <option value='Divorced'>Divorced</option>
              <option value='Widowed'>Widowed</option>
            </select>
          </label>
          <label className={styles.formContainer}>
            Blood Group:
            <select
              className={styles.formSelect}
              {...register("bloodGroup")}>
              <option value=''>Select Blood Group</option>
              <option value='A+'>A+</option>
              <option value='A-'>A-</option>
              <option value='B+'>B+</option>
              <option value='B-'>B-</option>
              <option value='AB+'>AB+</option>
              <option value='AB-'>AB-</option>
              <option value='O+'>O+</option>
              <option value='O-'>O-</option>
            </select>
          </label>
          <label className={styles.formContainer}>
            Nationality:
            <select
              className={styles.formSelect}
              {...register("nationality")}>
              <option value=''>Select Nationality</option>
              <option value='Indian'>Indian</option>
            </select>
          </label>
        </div>
      </section>
      <div className={styles.buttonContainer}>
        <button
          type='button'
          onClick={onClose}
          className={styles.cancelButton}>
          CANCEL
          <br />
          {"(esc)"}
        </button>
        <button
          type='submit'
          className={styles.submitButton}>
          SUBMIT
          <br />
          {"(⌘ s)"}
        </button>
      </div>
    </form>
  );
}
