import { Password } from "../Password";

describe("Password", () => {
  describe("create", () => {
    describe("正常系", () => {
      it.each([
        ["最小文字数のパスワード", "12345678"],
        ["より長いパスワード", "123456789012"]
      ])("%s", (_, password) => {
        const passwordVO = Password.create(password);
        expect(passwordVO.toString()).toBe(password);
      });
    });

    describe("異常系", () => {
      it.each([
        ["空文字", "", "パスワードは必須です"],
        ["文字列が含まれる", "password123", "パスワードは数字のみで入力してください"],
        ["記号が含まれる", "123!456", "パスワードは数字のみで入力してください"],
        ["8文字未満", "123", "パスワードは8文字以上で入力してください"]
      ])("%s", (_, password, expectedError) => {
        expect(() => {
          Password.create(password);
        }).toThrow(expectedError);
      });
    });
  });
}); 