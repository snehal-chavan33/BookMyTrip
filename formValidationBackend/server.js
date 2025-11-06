const http = require("http");

const server = http.createServer((req, res) => {
  // Enable CORS (for React frontend)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight check for CORS
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // Handle POST /api/book
  if (req.method === "POST" && req.url === "/api/book") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();

      // Security: Prevent too large body (DOS protection)
      if (body.length > 1e6) {
        req.socket.destroy();
      }
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        const { name, email, phone, destination, date, travelers, request } = data;

        let errors = {};

        // ====== VALIDATION RULES ======
        // Name
        if (!name || name.trim() === "")
          errors.name = "Name is required.";
        else if (name.length < 3)
          errors.name = "Name must be at least 3 characters long.";
        else if (!/^[A-Za-z\s]+$/.test(name))
          errors.name = "Name can contain only letters and spaces.";

        // Email
        if (!email || !/^\S+@\S+\.\S+$/.test(email))
          errors.email = "Enter a valid email address.";

        // Phone
        if (!phone)
          errors.phone = "Phone number is required.";
        else if (!/^[0-9]{10}$/.test(phone))
          errors.phone = "Phone number must be exactly 10 digits.";

        // Destination
        if (!destination || destination.trim() === "")
          errors.destination = "Destination is required.";
        else if (destination.length < 3)
          errors.destination = "Destination name must be at least 3 characters.";
        else if (!/^[A-Za-z\s]+$/.test(destination))
          errors.destination = "Destination must contain only letters.";

        // Date
        if (!date)
          errors.date = "Please select a travel date.";
        else {
          const selectedDate = new Date(date);
          const today = new Date();
          if (isNaN(selectedDate.getTime()))
            errors.date = "Invalid date format.";
          else if (selectedDate < today)
            errors.date = "Travel date cannot be in the past.";
        }

        // Travelers
        if (!travelers)
          errors.travelers = "Please specify the number of travelers.";
        else if (isNaN(travelers) || travelers < 1)
          errors.travelers = "Travelers must be at least 1.";
        else if (travelers > 20)
          errors.travelers = "Maximum 20 travelers are allowed.";

        // Optional Request Message
        if (request && request.length > 200)
          errors.request = "Request message should not exceed 200 characters.";

        // ====== RESPONSE HANDLING ======
        res.setHeader("Content-Type", "application/json");

        // Validation errors
        if (Object.keys(errors).length > 0) {
          res.statusCode = 400; // Bad Request
          return res.end(
            JSON.stringify({
              success: false,
              status: 400,
              message: "Validation failed.",
              errors,
            })
          );
        }

        // Success
        res.statusCode = 201; // Created
        res.end(
          JSON.stringify({
            success: true,
            status: 201,
            message: "Booking submitted successfully!",
            data: { name, email, phone, destination, date, travelers },
          })
        );
      } catch (error) {
        // Handle JSON parsing errors or runtime errors
        console.error("Error:", error.message);
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            success: false,
            status: 500,
            message: "Internal server error. Please try again later.",
            error: error.message,
          })
        );
      }
    });
  } else {
    // Wrong route
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        success: false,
        status: 404,
        message: "Route not found.",
      })
    );
  }
});

// Start server
server.listen(5000, () => console.log(" Server running on port 5000"));
