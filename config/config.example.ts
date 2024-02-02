const config = {
    db: "bill-Buddy",
    port: parseInt(process.env.PORT ?? "4000"),
    baseURL:
      process.env.SERVER_BASE_URL || `http://localhost:${process.env.PORT}`,
  };
  
  export default config;
