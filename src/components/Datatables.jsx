import { Loader } from "@mantine/core";
import React, { useEffect, useState } from "react";

const Datatables = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Load jQuery library from CDN
    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });

    const loadJQuery = () =>
      loadScript("https://code.jquery.com/jquery-3.6.0.min.js");

    const loadDatatables = () =>
      loadScript(
        "https://cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js"
      );

    const loadStyles = () => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdn.datatables.net/responsive/2.2.9/css/responsive.dataTables.min.css";
      document.head.appendChild(link);
    };

    Promise.all([loadJQuery(), loadDatatables()]).then(() => {
      loadStyles();

      // Fetch users data from API endpoint
      fetch("/api/get")
        .then((response) => response.json())
        .then((data) => {
          setUsers(
            data.map((user) => ({
              ...user,
              age: user.age || "NA",
              sex: user.sex || "NA",
              mobile: user.mobile || "NA",
              address: user.address || "NA",
              govtId: user.govtId || "NA",
              gaurdian: user.gaurdian || "NA",
              nationality: user.nationality || "NA",
            }))
          );
        })
        .catch((error) => {
          console.error("Error fetching users data: ", error);
        });
    });
  }, []);

  useEffect(() => {
    // Initialize Datatables table when users data is available and in a browser environment
    if (users.length > 0 && window.jQuery && typeof window !== "undefined") {
      const waitForLibrary = setInterval(() => {
        if (window.jQuery.fn.DataTable) {
          clearInterval(waitForLibrary);
          window.jQuery("#usersTable").DataTable({
            retrieve: true,
            data: users,
            columns: [
              { title: "Name", data: "name" },
              { title: "Age/Sex", data: (row) => `${row.age}/${row.sex}` },
              { title: "Mobile", data: "mobile" },
              { title: "Address", data: "address" },
              { title: "Govt ID", data: "govtId" },
              { title: "Guardian Details", data: "gaurdian" },
              { title: "Nationality", data: "nationality" },
            ],
          });
        }
      }, 100);
    }
  }, [users]);

  return (
    <table
      id='usersTable'
      className='table table-striped table-bordered dt-responsive nowrap responsive glassmorphism'></table>
  );
};

export default Datatables;
