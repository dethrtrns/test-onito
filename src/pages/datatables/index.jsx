import { Flex, Loader, Overlay, Skeleton } from "@mantine/core";
import React, { useEffect, useState } from "react";
import Datatables from "@/components/Datatables";

const Users = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <>
      {loading && (
        <Overlay
          pos={"absolute"}
          bg={"gray"}
          opacity={0}
          blur={5}
          sx={{
            display: "flex",
            height: "100vh",
            width: "100vw",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Loader
            color='teal'
            size='xl'
            variant='bars'
          />
        </Overlay>
      )}
      <Flex
        sx={{
          visibility: loading ? "hidden" : "visible",
          background:
            "url(https://www.onito.io/assets/img/onito-onlyname-logo-removebg.png)",
          backgroundColor: "lightcyan",
          backgroundBlendMode: "luminosity",
          transition: "all 2s linear",
        }}
        miw={"100vw"}
        mih={"100vh"}
        justify={"center"}>
        <Datatables />
      </Flex>
    </>
  );
};

export default Users;
