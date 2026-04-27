export const requiredAddressFields = [
  { id: "firstName", errId: "firstNameErr", message: "First name" },
  { id: "lastName", errId: "lastNameErr", message: "Last name" },
  { id: "email", errId: "emailErr", message: "Email" },
  { id: "phone", errId: "phoneErr", message: "Phone number" },
  { id: "street", errId: "streetErr", message: "Street name" },
  { id: "house", errId: "houseErr", message: "House number" },
  { id: "city", errId: "cityErr", message: "City name" },
  { id: "zip", errId: "zipErr", message: "Zip" },
];

export const requiredCardFields = [
  {
    id: "cardNum",
    errId: "cardNumErr",
    message: "Valid card number",
    validate: (value) => value.replace(/\s/g, "").length === 16,
  },
  {
    id: "expiry",
    errId: "expiryErr",
    message: "Valid expiry",
    validate: (value) => {
      const [mm, yy] = value.split("/");
      if (!mm || !yy) return false;

      const currentYear = new Date().getFullYear() % 100;
      return parseInt(yy) >= currentYear;
    },
  },
  {
    id: "cvv",
    errId: "cvvErr",
    message: "Valid CVV",
    validate: (value) => value.length >= 3,
  },
  {
    id: "cardName",
    errId: "cardErr",
    message: "Card name",
    validate: (value) => value !== "",
  },
];
