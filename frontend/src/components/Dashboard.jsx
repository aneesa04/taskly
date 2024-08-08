import React, { useContext, useEffect } from "react";
import axios from "axios";
import { ErrComponent, TaskDetail, Tasks } from ".";

import { GlobalState } from "../context/GlobalState";

function dashboard() {
  //add loader

  const {
    giveAccess,
    seTGiveAccess,
    setTasks,
    setUser,
    refetch,
    setRefetch,
    setShowErr,
    showErr,
  } = useContext(GlobalState);

  
  useEffect(() => {
    if (refetch) {
      async function fetchData() {
        try {
          const res = await axios.get("http://localhost:3000/api/dashboard", {
            withCredentials: true,
          });

          if (res.data?.status === "success") {
            seTGiveAccess(true);
            setUser(res.data.user);
            setTasks(res.data.tasks);
            setShowErr(false)
          }
        } catch (err) {
          setShowErr({status:true, message: err.message})
          
        }
        setRefetch(false);
      }
      fetchData();
    }
  }, [refetch]);

  if (showErr.status) return <ErrComponent message={showErr.message} />;
  if(refetch){
    return <div className="flex items-center justify-center w-full"><span class="main-loader"></span> </div>
  }

  return (
    giveAccess &&
    !refetch && (
      <div className="lg:flex w-screen min-h-svh space-y-3 ">
        <Tasks />
        <TaskDetail />
      </div>
    )
  );
}

export default dashboard;
