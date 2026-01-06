import React, { useEffect } from "react";
import api from "../api/axios";

export default function Home() {
  useEffect(() => {
    const testApi = async () => {
      try {
        const res = await api.get("/team/me");
        console.log("API working ✅", res.data);
      } catch (err) {
        console.log("API error (expected if not logged in)", err.message);
      }
    };

    testApi();
  }, []);

  return (
    <div className="p-10 text-2xl font-bold">
      Home Page – API Test
    </div>
  );
}
