import {
  validateData,
  validateDate,
  validateEmail,
  validateNumber,
  validateNumberPositive,
  validateString,
} from "../src/validator";

describe("Validator functions", () => {
  describe("validateDate", () => {
    it("should return true for valid date strings", () => {
      expect(validateDate("2023-01-01")).toBe(true);
      expect(validateDate("2020-02-29")).toBe(true); // leap year
      expect(validateDate("1999-12-31")).toBe(true);
    });

    it("should return false for invalid date strings", () => {
      expect(validateDate("01-01-2023")).toBe(false); // wrong format
      expect(validateDate("2023/01/01")).toBe(false); // wrong format
      expect(validateDate("2023-13-01")).toBe(false); // invalid month
      expect(validateDate("2023-01-32")).toBe(false); // invalid day
      expect(validateDate("abc")).toBe(false);
      expect(validateDate("")).toBe(false);
    });
  });

  describe("validateEmail", () => {
    it("should return true for valid email addresses", () => {
      expect(validateEmail("test@example.com")).toBe(true);
      expect(validateEmail("user.name@domain.co.uk")).toBe(true);
      expect(validateEmail("user+tag@example.com")).toBe(true);
    });

    it("should return false for invalid email addresses", () => {
      expect(validateEmail("test@")).toBe(false);
      expect(validateEmail("@example.com")).toBe(false);
      expect(validateEmail("test@example")).toBe(false);
      expect(validateEmail("test.example.com")).toBe(false);
      expect(validateEmail("")).toBe(false);
    });
  });

  describe("validateNumber", () => {
    it("should return true for number values", () => {
      expect(validateNumber(0)).toBe(true);
      expect(validateNumber(42)).toBe(true);
      expect(validateNumber(-10)).toBe(true);
      expect(validateNumber(3.14)).toBe(true);
    });

    it("should return false for non-number values", () => {
      expect(validateNumber("42")).toBe(false);
      expect(validateNumber(null)).toBe(false);
      expect(validateNumber(undefined)).toBe(false);
      expect(validateNumber({})).toBe(false);
      expect(validateNumber([])).toBe(false);
    });
  });

  describe("validateNumberPositive", () => {
    it("should return true for positive number values", () => {
      expect(validateNumberPositive(0)).toBe(true);
      expect(validateNumberPositive(42)).toBe(true);
      expect(validateNumberPositive(3.14)).toBe(true);
    });

    it("should return false for negative numbers", () => {
      expect(validateNumberPositive(-1)).toBe(false);
      expect(validateNumberPositive(-3.14)).toBe(false);
    });

    it("should return false for non-number values", () => {
      expect(validateNumberPositive("42")).toBe(false);
      expect(validateNumberPositive(null)).toBe(false);
      expect(validateNumberPositive(undefined)).toBe(false);
    });
  });

  describe("validateString", () => {
    it("should return true for string values", () => {
      expect(validateString("hello")).toBe(true);
      expect(validateString("123")).toBe(true);
    });

    it("should return false for non-string values", () => {
      expect(validateString(123)).toBe(false);
      expect(validateString(null)).toBe(false);
      expect(validateString(undefined)).toBe(false);
      expect(validateString({})).toBe(false);
      expect(validateString([])).toBe(false);
      expect(validateString("")).toBe(false);
    });
  });

  describe("validateData", () => {
    it("should validate number type", () => {
      expect(validateData(42, "number")).toBe(true);
      expect(validateData("42", "number")).toBe(false);
    });

    it("should validate string type", () => {
      expect(validateData("hello", "string")).toBe(true);
      expect(validateData(123, "string")).toBe(false);
    });

    it("should validate numberPositive type", () => {
      expect(validateData(42, "numberPositive")).toBe(true);
      expect(validateData(-42, "numberPositive")).toBe(false);
    });

    it("should validate date type", () => {
      expect(validateData("2023-01-01", "date")).toBe(true);
      expect(validateData("01/01/2023", "date")).toBe(false);
    });

    it("should validate email type", () => {
      expect(validateData("test@example.com", "email")).toBe(true);
      expect(validateData("invalid-email", "email")).toBe(false);
    });

    it("should throw error for unsupported data type", () => {
      expect(() => validateData("test", "unknown" as any)).toThrow(
        "Type de données non pris en charge: unknown"
      );
    });
  });
});
